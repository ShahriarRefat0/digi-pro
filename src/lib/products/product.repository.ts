import { ObjectId, Filter } from "mongodb";
import { getDatabase } from "@/lib/mongodb";
import {
  Product,
  ProductDocument,
  CreateProductInput,
  UpdateProductInput,
  ProductCategory,
  ProductImageItem,
} from "@/types/product";

const PRODUCTS_COLLECTION = "products";

let indexesEnsured = false;

/**
 * Ensure MongoDB indexes for optimal performance and slug uniqueness
 */
export async function ensureProductIndexes(): Promise<void> {
  if (indexesEnsured) return;
  try {
    const db = await getDatabase();
    const col = db.collection<ProductDocument>(PRODUCTS_COLLECTION);

    await Promise.allSettled([
      col.createIndex({ slug: 1 }, { unique: true }),
      col.createIndex({ status: 1 }),
      col.createIndex({ category: 1 }),
      col.createIndex({ featured: 1 }),
      col.createIndex({ createdAt: -1 }),
    ]);
    indexesEnsured = true;
  } catch (err) {
    console.error("Error creating product indexes in MongoDB:", err);
  }
}

function resolveThumbnailUrl(thumb: any): string {
  if (!thumb) return "";
  if (typeof thumb === "string") return thumb;
  if (typeof thumb === "object" && thumb.url) return thumb.url;
  return "";
}

function resolveThumbnailPublicId(thumb: any, directPid?: string): string | undefined {
  if (directPid) return directPid;
  if (typeof thumb === "object" && thumb?.publicId) return thumb.publicId;
  return undefined;
}

function resolveGalleryUrls(images: any): string[] {
  if (!Array.isArray(images)) return [];
  return images
    .map((img) => {
      if (typeof img === "string") return img;
      if (typeof img === "object" && img?.url) return img.url;
      return null;
    })
    .filter((url): url is string => Boolean(url));
}

function resolveGalleryItems(images: any, imagePublicIds: string[] = []): ProductImageItem[] {
  if (!Array.isArray(images)) return [];
  return images.map((img, idx) => {
    if (typeof img === "object" && img?.url) {
      return { url: img.url, publicId: img.publicId || imagePublicIds[idx] };
    }
    return { url: typeof img === "string" ? img : "", publicId: imagePublicIds[idx] };
  });
}

function serializeProduct(doc: ProductDocument): Product {
  const thumbUrl = resolveThumbnailUrl(doc.thumbnail);
  const thumbPid = resolveThumbnailPublicId(doc.thumbnail, doc.thumbnailPublicId);
  const galleryUrls = resolveGalleryUrls(doc.images);
  const galleryItems = resolveGalleryItems(doc.images, doc.imagePublicIds || []);

  const categoryName = (doc.category || "Web Templates") as ProductCategory;
  const categorySlug =
    doc.categorySlug ||
    categoryName
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-");

  return {
    id: doc._id ? doc._id.toString() : "",
    name: doc.name,
    slug: doc.slug,
    shortDescription: doc.shortDescription,
    description: doc.description,
    price: typeof doc.price === "number" ? doc.price : Number(doc.price) || 0,
    category: categoryName,
    categorySlug,
    thumbnail: thumbUrl || "/images/placeholder.webp",
    thumbnailPublicId: thumbPid,
    images: galleryUrls,
    galleryItems,
    imagePublicIds: Array.isArray(doc.imagePublicIds) ? doc.imagePublicIds : [],
    features: Array.isArray(doc.features) ? doc.features : [],
    technologies: Array.isArray(doc.technologies) ? doc.technologies : [],
    included: Array.isArray(doc.included) ? doc.included : [],
    requirements: Array.isArray(doc.requirements) ? doc.requirements : [],
    demoUrl: doc.demoUrl || "",
    documentationUrl: doc.documentationUrl || "",
    purchaseUrl: doc.purchaseUrl || "",
    version: doc.version || "1.0.0",
    status: doc.status === "published" ? "published" : "draft",
    featured: Boolean(doc.featured),
    tags: Array.isArray(doc.tags) ? doc.tags : [],
    createdAt: doc.createdAt ? doc.createdAt.toISOString() : new Date().toISOString(),
    updatedAt: doc.updatedAt ? doc.updatedAt.toISOString() : new Date().toISOString(),
  };
}

export interface GetProductsOptions {
  search?: string;
  status?: "all" | "published" | "draft";
  category?: string;
  limit?: number;
  skip?: number;
  sort?: Record<string, 1 | -1>;
}

/**
 * Get all products with optional filters, search, and sorting (for admin and public)
 */
export async function getProducts(options: GetProductsOptions = {}): Promise<Product[]> {
  try {
    await ensureProductIndexes();
    const db = await getDatabase();
    const filter: Filter<ProductDocument> = {};

    if (options.status && options.status !== "all") {
      filter.status = options.status;
    }

    if (options.category) {
      const cat = options.category.toLowerCase().replace(/[-_]/g, " ");
      filter.$or = [
        { category: new RegExp(`^${options.category}$`, "i") },
        { category: new RegExp(cat, "i") },
        { categorySlug: options.category.toLowerCase() },
      ];
    }

    if (options.search && options.search.trim()) {
      const regex = new RegExp(options.search.trim(), "i");
      filter.$or = [
        { name: regex },
        { shortDescription: regex },
        { description: regex },
        { tags: regex },
      ];
    }

    const sortOptions = options.sort || { updatedAt: -1 };
    let query = db
      .collection<ProductDocument>(PRODUCTS_COLLECTION)
      .find(filter)
      .sort(sortOptions);

    if (options.skip) query = query.skip(options.skip);
    if (options.limit) query = query.limit(options.limit);

    const docs = await query.toArray();
    return docs.map(serializeProduct);
  } catch (error) {
    console.error("Error fetching products from MongoDB:", error);
    return [];
  }
}

/**
 * Get published products for public store
 */
export async function getPublishedProducts(
  options: Omit<GetProductsOptions, "status"> = {}
): Promise<Product[]> {
  return getProducts({ ...options, status: "published" });
}

/**
 * Get featured products for homepage (status = published AND featured = true)
 */
export async function getFeaturedProducts(limit: number = 6): Promise<Product[]> {
  try {
    await ensureProductIndexes();
    const db = await getDatabase();
    let docs = await db
      .collection<ProductDocument>(PRODUCTS_COLLECTION)
      .find({ status: "published", featured: true })
      .sort({ updatedAt: -1 })
      .limit(limit)
      .toArray();

    // If fewer featured products exist than the limit, fill remaining slots with published products
    if (docs.length < limit) {
      const existingIds = docs.map((d) => d._id).filter(Boolean);
      const additional = await db
        .collection<ProductDocument>(PRODUCTS_COLLECTION)
        .find({
          status: "published",
          ...(existingIds.length > 0 ? { _id: { $nin: existingIds } } : {}),
        })
        .sort({ updatedAt: -1 })
        .limit(limit - docs.length)
        .toArray();

      docs = [...docs, ...additional];
    }

    return docs.slice(0, limit).map(serializeProduct);
  } catch (error) {
    console.error("Error fetching featured products from MongoDB:", error);
    return [];
  }
}

/**
 * Get single product by MongoDB ObjectId
 */
export async function getProductById(id: string): Promise<Product | null> {
  if (!id || !ObjectId.isValid(id)) return null;

  try {
    const db = await getDatabase();
    const doc = await db
      .collection<ProductDocument>(PRODUCTS_COLLECTION)
      .findOne({ _id: new ObjectId(id) });

    if (!doc) return null;
    return serializeProduct(doc);
  } catch (error) {
    console.error(`Error fetching product by ID (${id}):`, error);
    return null;
  }
}

/**
 * Get single product by URL slug
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!slug) return null;

  try {
    await ensureProductIndexes();
    const db = await getDatabase();
    const doc = await db
      .collection<ProductDocument>(PRODUCTS_COLLECTION)
      .findOne({ slug: slug.toLowerCase().trim() });

    if (!doc) return null;
    return serializeProduct(doc);
  } catch (error) {
    console.error(`Error fetching product by slug (${slug}):`, error);
    return null;
  }
}

/**
 * Search products
 */
export async function searchProducts(
  queryText: string,
  limit: number = 10
): Promise<Product[]> {
  if (!queryText.trim()) return [];
  return getProducts({
    search: queryText,
    status: "published",
    limit,
  });
}

/**
 * Create a new product in MongoDB
 */
export async function createProduct(input: CreateProductInput): Promise<Product> {
  await ensureProductIndexes();
  const db = await getDatabase();

  const now = new Date();
  const cleanSlug = input.slug.toLowerCase().trim();
  const categoryName = input.category;
  const categorySlug =
    input.categorySlug ||
    categoryName
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-");

  const thumbUrl = resolveThumbnailUrl(input.thumbnail);
  const thumbPid = resolveThumbnailPublicId(input.thumbnail, input.thumbnailPublicId);
  const galleryUrls = resolveGalleryUrls(input.images);
  const imagePublicIds = input.imagePublicIds || [];

  const newDoc: ProductDocument = {
    name: input.name.trim(),
    slug: cleanSlug,
    shortDescription: input.shortDescription.trim(),
    description: input.description.trim(),
    price: typeof input.price === "number" ? input.price : Number(input.price) || 0,
    category: categoryName,
    categorySlug,
    thumbnail: thumbPid ? { url: thumbUrl, publicId: thumbPid } : thumbUrl,
    thumbnailPublicId: thumbPid,
    images: galleryUrls.map((url, i) =>
      imagePublicIds[i] ? { url, publicId: imagePublicIds[i] } : url
    ),
    imagePublicIds,
    features: (input.features || []).map((f) => f.trim()).filter(Boolean),
    technologies: (input.technologies || []).map((t) => t.trim()).filter(Boolean),
    included: (input.included || []).map((i) => i.trim()).filter(Boolean),
    requirements: (input.requirements || []).map((r) => r.trim()).filter(Boolean),
    demoUrl: (input.demoUrl || "").trim(),
    documentationUrl: (input.documentationUrl || "").trim(),
    purchaseUrl: (input.purchaseUrl || "").trim(),
    version: (input.version || "1.0.0").trim(),
    status: input.status,
    featured: Boolean(input.featured),
    tags: (input.tags || []).map((t) => t.trim().toLowerCase()).filter(Boolean),
    createdAt: now,
    updatedAt: now,
  };

  const result = await db
    .collection<ProductDocument>(PRODUCTS_COLLECTION)
    .insertOne(newDoc);

  return serializeProduct({ ...newDoc, _id: result.insertedId });
}

/**
 * Update an existing product by ObjectId
 */
export async function updateProduct(
  id: string,
  input: UpdateProductInput
): Promise<Product | null> {
  if (!id || !ObjectId.isValid(id)) return null;

  await ensureProductIndexes();
  const db = await getDatabase();

  const updateData: Partial<ProductDocument> = {
    updatedAt: new Date(),
  };

  if (input.name !== undefined) updateData.name = input.name.trim();
  if (input.slug !== undefined) updateData.slug = input.slug.toLowerCase().trim();
  if (input.shortDescription !== undefined) updateData.shortDescription = input.shortDescription.trim();
  if (input.description !== undefined) updateData.description = input.description.trim();
  if (input.price !== undefined) {
    updateData.price = typeof input.price === "number" ? input.price : Number(input.price) || 0;
  }
  if (input.category !== undefined) {
    updateData.category = input.category;
    updateData.categorySlug = input.category
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-");
  }
  if (input.thumbnail !== undefined) {
    const thumbUrl = resolveThumbnailUrl(input.thumbnail);
    const thumbPid = resolveThumbnailPublicId(input.thumbnail, input.thumbnailPublicId);
    updateData.thumbnail = thumbPid ? { url: thumbUrl, publicId: thumbPid } : thumbUrl;
    updateData.thumbnailPublicId = thumbPid;
  }
  if (input.images !== undefined) {
    const galleryUrls = resolveGalleryUrls(input.images);
    const imagePublicIds = input.imagePublicIds || [];
    updateData.images = galleryUrls.map((url, i) =>
      imagePublicIds[i] ? { url, publicId: imagePublicIds[i] } : url
    );
    updateData.imagePublicIds = imagePublicIds;
  }
  if (input.features !== undefined) {
    updateData.features = input.features.map((f) => f.trim()).filter(Boolean);
  }
  if (input.technologies !== undefined) {
    updateData.technologies = input.technologies.map((t) => t.trim()).filter(Boolean);
  }
  if (input.included !== undefined) {
    updateData.included = input.included.map((i) => i.trim()).filter(Boolean);
  }
  if (input.requirements !== undefined) {
    updateData.requirements = input.requirements.map((r) => r.trim()).filter(Boolean);
  }
  if (input.demoUrl !== undefined) updateData.demoUrl = input.demoUrl.trim();
  if (input.documentationUrl !== undefined) updateData.documentationUrl = input.documentationUrl.trim();
  if (input.purchaseUrl !== undefined) updateData.purchaseUrl = input.purchaseUrl.trim();
  if (input.version !== undefined) updateData.version = input.version.trim();
  if (input.status !== undefined) updateData.status = input.status;
  if (input.featured !== undefined) updateData.featured = Boolean(input.featured);
  if (input.tags !== undefined) {
    updateData.tags = input.tags.map((t) => t.trim().toLowerCase()).filter(Boolean);
  }

  const result = await db
    .collection<ProductDocument>(PRODUCTS_COLLECTION)
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateData },
      { returnDocument: "after" }
    );

  if (!result) return null;
  return serializeProduct(result as ProductDocument);
}

/**
 * Delete product by ObjectId
 */
export async function deleteProduct(id: string): Promise<boolean> {
  if (!id || !ObjectId.isValid(id)) return false;

  try {
    const db = await getDatabase();
    const result = await db
      .collection<ProductDocument>(PRODUCTS_COLLECTION)
      .deleteOne({ _id: new ObjectId(id) });

    return result.deletedCount > 0;
  } catch (error) {
    console.error(`Error deleting product (${id}):`, error);
    return false;
  }
}

export interface DashboardProductStats {
  total: number;
  published: number;
  drafts: number;
  featured: number;
}

/**
 * Get aggregate counts for dashboard metrics
 */
export async function getDashboardProductStats(): Promise<DashboardProductStats> {
  try {
    await ensureProductIndexes();
    const db = await getDatabase();
    const col = db.collection<ProductDocument>(PRODUCTS_COLLECTION);

    const [total, published, drafts, featured] = await Promise.all([
      col.countDocuments({}),
      col.countDocuments({ status: "published" }),
      col.countDocuments({ status: "draft" }),
      col.countDocuments({ featured: true }),
    ]);

    return { total, published, drafts, featured };
  } catch (error) {
    console.error("Error fetching dashboard product stats:", error);
    return { total: 0, published: 0, drafts: 0, featured: 0 };
  }
}

