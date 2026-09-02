import { getDatabase } from "@/lib/mongodb";
import { ProductDocument } from "@/types/product";
import { SERVICES_DATA } from "@/lib/services";
import { BLOG_POSTS } from "@/lib/blog";
import { STATIC_PAGES } from "./pages";
import { GroupedSearchResults, SearchResultItem } from "@/types/search";

const PRODUCTS_COLLECTION = "products";

export interface SearchOptions {
  limitPerCategory?: {
    products?: number;
    services?: number;
    blogs?: number;
    pages?: number;
  };
}

function calculateRelevanceScore(
  query: string,
  title: string,
  categoryOrTags: string[] = [],
  description: string = "",
  keywords: string[] = []
): number {
  const q = query.toLowerCase().trim();
  if (!q) return 0;

  const t = title.toLowerCase().trim();
  let score = 0;

  // 1. Exact title match
  if (t === q) {
    score += 100;
  }
  // 2. Starts with title match
  else if (t.startsWith(q)) {
    score += 60;
  }
  // 3. Title contains query word or substring
  else if (t.includes(q)) {
    score += 40;
  }

  // 4. Keyword matches (e.g. for static pages)
  for (const kw of keywords) {
    const k = kw.toLowerCase();
    if (k === q) score += 35;
    else if (k.startsWith(q) || k.includes(q)) score += 20;
  }

  // 5. Category or tag matches
  for (const item of categoryOrTags) {
    const it = item.toLowerCase();
    if (it === q) score += 30;
    else if (it.startsWith(q) || it.includes(q)) score += 15;
  }

  // 6. Description match
  if (description.toLowerCase().includes(q)) {
    score += 10;
  }

  return score;
}

export async function searchAll(
  query: string,
  options: SearchOptions = {}
): Promise<GroupedSearchResults> {
  const cleanQuery = (query || "").trim();
  if (!cleanQuery) {
    return {
      products: [],
      services: [],
      blogs: [],
      pages: [],
      totalCount: 0,
    };
  }

  const limits = {
    products: options.limitPerCategory?.products ?? 5,
    services: options.limitPerCategory?.services ?? 3,
    blogs: options.limitPerCategory?.blogs ?? 3,
    pages: options.limitPerCategory?.pages ?? 3,
  };

  // 1. Products (from MongoDB - ONLY status: "published")
  let matchedProducts: SearchResultItem[] = [];
  try {
    const db = await getDatabase();
    const searchRegex = new RegExp(cleanQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");

    const docs = await db
      .collection<ProductDocument>(PRODUCTS_COLLECTION)
      .find(
        {
          status: "published",
          $or: [
            { name: searchRegex },
            { slug: searchRegex },
            { category: searchRegex },
            { shortDescription: searchRegex },
            { tags: searchRegex },
            { technologies: searchRegex },
          ],
        },
        {
          projection: {
            _id: 1,
            name: 1,
            slug: 1,
            shortDescription: 1,
            category: 1,
            price: 1,
            thumbnail: 1,
            tags: 1,
            technologies: 1,
          },
        }
      )
      .toArray();

    matchedProducts = docs
      .map((doc) => {
        const categoryAndTags = [
          doc.category || "",
          ...(Array.isArray(doc.tags) ? doc.tags : []),
          ...(Array.isArray(doc.technologies) ? doc.technologies : []),
        ];
        const score = calculateRelevanceScore(
          cleanQuery,
          doc.name,
          categoryAndTags,
          doc.shortDescription || ""
        );

        return {
          id: doc._id?.toString() || doc.slug,
          type: "product" as const,
          title: doc.name,
          description: doc.shortDescription || "",
          href: `/products/${doc.slug}`,
          price: Number(doc.price) || 0,
          thumbnail:
            (typeof doc.thumbnail === "object" && doc.thumbnail && "url" in doc.thumbnail
              ? (doc.thumbnail as any).url
              : typeof doc.thumbnail === "string"
              ? doc.thumbnail
              : "") || "/images/placeholder.webp",
          tags: doc.tags || [],
          score,
        };
      })
      .filter((item) => (item.score || 0) > 0)
      .sort((a, b) => (b.score || 0) - (a.score || 0));
  } catch (error) {
    console.error("Error searching MongoDB products:", error);
    matchedProducts = [];
  }

  // 2. Services (from SERVICES_DATA)
  const matchedServices: SearchResultItem[] = SERVICES_DATA.map((service) => {
    const tagsAndTech = [
      ...(service.technologies || []),
      ...(service.features || []),
    ];
    const score = calculateRelevanceScore(
      cleanQuery,
      service.title,
      tagsAndTech,
      service.description
    );

    return {
      id: service.id,
      type: "service" as const,
      title: service.title,
      description: service.description,
      href: `/services`,
      category: "Engineering Service",
      icon: service.icon,
      tags: service.technologies || [],
      score,
    };
  })
    .filter((item) => (item.score || 0) > 0)
    .sort((a, b) => (b.score || 0) - (a.score || 0));

  // 3. Blog (from BLOG_POSTS)
  const matchedBlogs: SearchResultItem[] = BLOG_POSTS.map((post) => {
    const categoryAndTags = [post.category, ...(post.tags || [])];
    const score = calculateRelevanceScore(
      cleanQuery,
      post.title,
      categoryAndTags,
      post.description
    );

    return {
      id: post.id,
      type: "blog" as const,
      title: post.title,
      description: post.description,
      href: `/blog/${post.slug}`,
      category: post.category,
      date: post.date,
      tags: post.tags || [],
      score,
    };
  })
    .filter((item) => (item.score || 0) > 0)
    .sort((a, b) => (b.score || 0) - (a.score || 0));

  // 4. Static Pages (from STATIC_PAGES)
  const matchedPages: SearchResultItem[] = STATIC_PAGES.map((page) => {
    const score = calculateRelevanceScore(
      cleanQuery,
      page.title,
      [],
      page.description,
      page.keywords
    );

    return {
      id: page.id,
      type: "page" as const,
      title: page.title,
      description: page.description,
      href: page.href,
      category: "Navigation Page",
      icon: page.icon,
      score,
    };
  })
    .filter((item) => (item.score || 0) > 0)
    .sort((a, b) => (b.score || 0) - (a.score || 0));

  const totalCount =
    matchedProducts.length +
    matchedServices.length +
    matchedBlogs.length +
    matchedPages.length;

  return {
    products: matchedProducts.slice(0, limits.products),
    services: matchedServices.slice(0, limits.services),
    blogs: matchedBlogs.slice(0, limits.blogs),
    pages: matchedPages.slice(0, limits.pages),
    totalCount,
  };
}
