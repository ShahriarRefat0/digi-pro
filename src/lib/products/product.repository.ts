import { ObjectId, Filter } from "mongodb";
import { getDatabase } from "@/lib/mongodb";
import {
  Product,
  ProductDocument,
  CreateProductInput,
  UpdateProductInput,
  ProductCategory,
} from "@/types/product";

const PRODUCTS_COLLECTION = "products";

function serializeProduct(doc: ProductDocument): Product {
  return {
    id: doc._id ? doc._id.toString() : "",
    name: doc.name,
    slug: doc.slug,
    shortDescription: doc.shortDescription,
    description: doc.description,
    price: Number(doc.price) || 0,
    category: doc.category as ProductCategory,
    thumbnail: doc.thumbnail || "/images/placeholder.webp",
    images: Array.isArray(doc.images) ? doc.images : [],
    features: Array.isArray(doc.features) ? doc.features : [],
    included: Array.isArray(doc.included) ? doc.included : [],
    technologies: Array.isArray(doc.technologies) ? doc.technologies : [],
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
    const db = await getDatabase();
    const filter: Filter<ProductDocument> = {};

    if (options.status && options.status !== "all") {
      filter.status = options.status;
    }

    if (options.category && options.category !== "All") {
      filter.category = options.category;
    }

    if (options.search && options.search.trim() !== "") {
      const searchRegex = new RegExp(options.search.trim(), "i");
      filter.$or = [
        { name: searchRegex },
        { slug: searchRegex },
        { category: searchRegex },
        { shortDescription: searchRegex },
      ];
    }

    const sortOptions = options.sort || { updatedAt: -1 };
    const query = db.collection<ProductDocument>(PRODUCTS_COLLECTION).find(filter).sort(sortOptions);

    if (options.skip) query.skip(options.skip);
    if (options.limit) query.limit(options.limit);

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
export async function getPublishedProducts(options: Omit<GetProductsOptions, "status"> = {}): Promise<Product[]> {
  return getProducts({ ...options, status: "published" });
}

/**
 * Get featured products for homepage (status = published AND featured = true)
 */
export async function getFeaturedProducts(limit: number = 6): Promise<Product[]> {
  try {
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
 * Create a new product in MongoDB
 */
export async function createProduct(input: CreateProductInput): Promise<Product> {
  const db = await getDatabase();

  const now = new Date();
  const newDoc: ProductDocument = {
    name: input.name.trim(),
    slug: input.slug.toLowerCase().trim(),
    shortDescription: input.shortDescription.trim(),
    description: input.description.trim(),
    price: Number(input.price) || 0,
    category: input.category,
    thumbnail: input.thumbnail || "/images/placeholder.webp",
    images: input.images || [],
    features: input.features || [],
    included: input.included || [],
    technologies: input.technologies || [],
    requirements: input.requirements || [],
    demoUrl: input.demoUrl || "",
    documentationUrl: input.documentationUrl || "",
    purchaseUrl: input.purchaseUrl || "",
    version: input.version || "1.0.0",
    status: input.status,
    featured: Boolean(input.featured),
    tags: input.tags || [],
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

  const db = await getDatabase();
  const updateData: Partial<ProductDocument> = {
    ...input,
    updatedAt: new Date(),
  };

  if (updateData.slug) {
    updateData.slug = updateData.slug.toLowerCase().trim();
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
 * Delete a product by ObjectId
 */
export async function deleteProduct(id: string): Promise<boolean> {
  if (!id || !ObjectId.isValid(id)) return false;

  try {
    const db = await getDatabase();
    const result = await db
      .collection<ProductDocument>(PRODUCTS_COLLECTION)
      .deleteOne({ _id: new ObjectId(id) });

    return result.deletedCount === 1;
  } catch (error) {
    console.error(`Error deleting product (${id}):`, error);
    return false;
  }
}

/**
 * Get live product metrics for the dashboard
 */
export async function getDashboardProductStats(): Promise<{
  total: number;
  published: number;
  drafts: number;
}> {
  try {
    const db = await getDatabase();
    const collection = db.collection<ProductDocument>(PRODUCTS_COLLECTION);

    const [total, published, drafts] = await Promise.all([
      collection.countDocuments({}),
      collection.countDocuments({ status: "published" }),
      collection.countDocuments({ status: "draft" }),
    ]);

    return { total, published, drafts };
  } catch (error) {
    console.error("Error getting dashboard product stats:", error);
    return { total: 0, published: 0, drafts: 0 };
  }
}
