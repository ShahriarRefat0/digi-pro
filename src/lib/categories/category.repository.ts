import { ObjectId, Filter } from "mongodb";
import { getDatabase } from "@/lib/mongodb";
import {
  Category,
  CategoryDocument,
  CreateCategoryInput,
  UpdateCategoryInput,
} from "@/types/category";
import { ProductDocument } from "@/types/product";

const CATEGORIES_COLLECTION = "categories";
const PRODUCTS_COLLECTION = "products";

let indexesEnsured = false;

/**
 * Ensure MongoDB indexes for optimal performance and slug uniqueness
 */
export async function ensureCategoryIndexes(): Promise<void> {
  if (indexesEnsured) return;
  try {
    const db = await getDatabase();
    const col = db.collection<CategoryDocument>(CATEGORIES_COLLECTION);

    await Promise.allSettled([
      col.createIndex({ slug: 1 }, { unique: true }),
      col.createIndex({ isActive: 1 }),
      col.createIndex({ showInNavbar: 1 }),
      col.createIndex({ sortOrder: 1 }),
      col.createIndex({ parentId: 1 }),
    ]);
    indexesEnsured = true;
  } catch (err) {
    console.error("Error creating category indexes in MongoDB:", err);
  }
}

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function serializeCategory(doc: CategoryDocument): Category {
  return {
    id: doc._id ? doc._id.toString() : "",
    name: doc.name,
    slug: doc.slug,
    description: doc.description || "",
    image: doc.image || "",
    parentId: doc.parentId || null,
    isActive: Boolean(doc.isActive),
    showInNavbar: Boolean(doc.showInNavbar),
    sortOrder: typeof doc.sortOrder === "number" ? doc.sortOrder : 0,
    createdAt: doc.createdAt ? doc.createdAt.toISOString() : new Date().toISOString(),
    updatedAt: doc.updatedAt ? doc.updatedAt.toISOString() : new Date().toISOString(),
  };
}

export interface GetCategoriesOptions {
  search?: string;
  activeOnly?: boolean;
  navbarOnly?: boolean;
}

/**
 * Get categories list sorted by sortOrder
 */
export async function getCategories(
  options: GetCategoriesOptions = {}
): Promise<Category[]> {
  try {
    await ensureCategoryIndexes();
    const db = await getDatabase();
    const filter: Filter<CategoryDocument> = {};

    if (options.activeOnly) {
      filter.isActive = true;
    }
    if (options.navbarOnly) {
      filter.isActive = true;
      filter.showInNavbar = true;
    }
    if (options.search && options.search.trim()) {
      const regex = new RegExp(options.search.trim(), "i");
      filter.$or = [{ name: regex }, { slug: regex }, { description: regex }];
    }

    const docs = await db
      .collection<CategoryDocument>(CATEGORIES_COLLECTION)
      .find(filter)
      .sort({ sortOrder: 1, createdAt: -1 })
      .toArray();

    return docs.map(serializeCategory);
  } catch (error) {
    console.error("Error fetching categories from MongoDB:", error);
    return [];
  }
}

/**
 * Get active navbar categories for storefront header
 */
export async function getNavbarCategories(): Promise<Category[]> {
  return getCategories({ navbarOnly: true });
}

/**
 * Get single category by ID
 */
export async function getCategoryById(id: string): Promise<Category | null> {
  if (!id || !ObjectId.isValid(id)) return null;
  try {
    const db = await getDatabase();
    const doc = await db
      .collection<CategoryDocument>(CATEGORIES_COLLECTION)
      .findOne({ _id: new ObjectId(id) });

    if (!doc) return null;
    return serializeCategory(doc);
  } catch (error) {
    console.error(`Error fetching category by ID (${id}):`, error);
    return null;
  }
}

/**
 * Get category by Slug
 */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  if (!slug) return null;
  try {
    await ensureCategoryIndexes();
    const db = await getDatabase();
    const doc = await db
      .collection<CategoryDocument>(CATEGORIES_COLLECTION)
      .findOne({ slug: slug.toLowerCase().trim() });

    if (!doc) return null;
    return serializeCategory(doc);
  } catch (error) {
    console.error(`Error fetching category by slug (${slug}):`, error);
    return null;
  }
}

/**
 * Helper to prevent circular parent-child relationships
 */
async function isCircularParent(categoryId: string, targetParentId: string): Promise<boolean> {
  if (categoryId === targetParentId) return true;
  let currentParentId: string | null = targetParentId;

  while (currentParentId) {
    if (currentParentId === categoryId) return true;
    const parent = await getCategoryById(currentParentId);
    if (!parent || !parent.parentId) break;
    currentParentId = parent.parentId;
  }

  return false;
}

/**
 * Create a new Category
 */
export async function createCategory(input: CreateCategoryInput): Promise<Category> {
  await ensureCategoryIndexes();
  const db = await getDatabase();

  const slug = input.slug?.trim() ? generateSlug(input.slug) : generateSlug(input.name);
  
  // Check slug uniqueness
  const existing = await getCategoryBySlug(slug);
  if (existing) {
    throw new Error(`A category with slug "${slug}" already exists.`);
  }

  const now = new Date();
  const doc: CategoryDocument = {
    name: input.name.trim(),
    slug,
    description: (input.description || "").trim(),
    image: (input.image || "").trim(),
    parentId: input.parentId || null,
    isActive: input.isActive ?? true,
    showInNavbar: input.showInNavbar ?? true,
    sortOrder: typeof input.sortOrder === "number" ? input.sortOrder : 0,
    createdAt: now,
    updatedAt: now,
  };

  const result = await db
    .collection<CategoryDocument>(CATEGORIES_COLLECTION)
    .insertOne(doc);

  return serializeCategory({ ...doc, _id: result.insertedId });
}

/**
 * Update an existing Category
 */
export async function updateCategory(
  id: string,
  input: UpdateCategoryInput
): Promise<Category | null> {
  if (!id || !ObjectId.isValid(id)) return null;

  await ensureCategoryIndexes();
  const db = await getDatabase();

  const existingCat = await getCategoryById(id);
  if (!existingCat) {
    throw new Error("Category not found");
  }

  const updateData: Partial<CategoryDocument> = {
    updatedAt: new Date(),
  };

  if (input.name !== undefined) updateData.name = input.name.trim();

  if (input.slug !== undefined && input.slug.trim()) {
    const newSlug = generateSlug(input.slug);
    if (newSlug !== existingCat.slug) {
      const slugOwner = await getCategoryBySlug(newSlug);
      if (slugOwner && slugOwner.id !== id) {
        throw new Error(`A category with slug "${newSlug}" already exists.`);
      }
      updateData.slug = newSlug;
    }
  }

  if (input.parentId !== undefined) {
    if (input.parentId && input.parentId !== existingCat.parentId) {
      const targetParent = await getCategoryById(input.parentId);
      if (!targetParent) {
        throw new Error("Selected parent category does not exist.");
      }
      const circular = await isCircularParent(id, input.parentId);
      if (circular) {
        throw new Error("Cannot select a child category as its parent (circular reference).");
      }
    }
    updateData.parentId = input.parentId || null;
  }

  if (input.description !== undefined) updateData.description = input.description.trim();
  if (input.image !== undefined) updateData.image = input.image.trim();
  if (input.isActive !== undefined) updateData.isActive = Boolean(input.isActive);
  if (input.showInNavbar !== undefined) updateData.showInNavbar = Boolean(input.showInNavbar);
  if (input.sortOrder !== undefined) updateData.sortOrder = Number(input.sortOrder) || 0;

  const result = await db
    .collection<CategoryDocument>(CATEGORIES_COLLECTION)
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateData },
      { returnDocument: "after" }
    );

  if (!result) return null;
  return serializeCategory(result as CategoryDocument);
}

/**
 * Delete category with safety checks (prevent deleting if linked products or child categories exist)
 */
export async function deleteCategory(id: string): Promise<{ success: boolean; message?: string }> {
  if (!id || !ObjectId.isValid(id)) {
    return { success: false, message: "Invalid category ID." };
  }

  try {
    const db = await getDatabase();
    const category = await getCategoryById(id);
    if (!category) {
      return { success: false, message: "Category not found." };
    }

    // Check 1: Child categories referencing parentId === id
    const childCatCount = await db
      .collection<CategoryDocument>(CATEGORIES_COLLECTION)
      .countDocuments({ parentId: id });

    if (childCatCount > 0) {
      return {
        success: false,
        message: `Cannot delete "${category.name}". It has ${childCatCount} subcategory/subcategories linked to it. Please reassign or delete subcategories first.`,
      };
    }

    // Check 2: Linked products with category name or slug
    const catNameRegex = new RegExp(`^${category.name}$`, "i");
    const catSlugRegex = new RegExp(`^${category.slug}$`, "i");

    const linkedProductsCount = await db
      .collection<ProductDocument>(PRODUCTS_COLLECTION)
      .countDocuments({
        $or: [
          { category: catNameRegex as any },
          { categorySlug: catSlugRegex as any },
        ],
      });

    if (linkedProductsCount > 0) {
      return {
        success: false,
        message: `Cannot delete "${category.name}". It is currently assigned to ${linkedProductsCount} product(s). Please reassign those products first.`,
      };
    }

    const result = await db
      .collection<CategoryDocument>(CATEGORIES_COLLECTION)
      .deleteOne({ _id: new ObjectId(id) });

    return {
      success: result.deletedCount > 0,
      message: result.deletedCount > 0 ? "Category deleted successfully." : "Failed to delete category.",
    };
  } catch (error: any) {
    console.error(`Error deleting category (${id}):`, error);
    return { success: false, message: error.message || "Database error during deletion." };
  }
}

/**
 * Seed initial default categories if collection is completely empty
 */
export async function seedInitialCategoriesIfEmpty(): Promise<void> {
  try {
    await ensureCategoryIndexes();
    const db = await getDatabase();
    const count = await db.collection<CategoryDocument>(CATEGORIES_COLLECTION).countDocuments({});
    if (count > 0) return;

    const initialCategories: CreateCategoryInput[] = [
      {
        name: "Baby Essentials",
        slug: "baby-essentials",
        description: "Dermatologist-tested skincare, gentle baby lotion, and daily care essentials.",
        isActive: true,
        showInNavbar: true,
        sortOrder: 1,
      },
      {
        name: "Maternal Care",
        slug: "maternal-care",
        description: "Pregnancy comfort, stretch mark oils, and nursing care for mothers.",
        isActive: true,
        showInNavbar: true,
        sortOrder: 2,
      },
      {
        name: "Bath & Hygiene",
        slug: "bath-hygiene",
        description: "Tear-free baby washes, moisturizing balms, and organic soaps.",
        isActive: true,
        showInNavbar: true,
        sortOrder: 3,
      },
      {
        name: "Diapers & Wipes",
        slug: "diapers-wipes",
        description: "Hypoallergenic wipes, rash creams, and organic cotton diapers.",
        isActive: true,
        showInNavbar: true,
        sortOrder: 4,
      },
      {
        name: "Feeding & Nursing",
        slug: "feeding-nursing",
        description: "BPA-free bottles, nursing pads, and essential feeding accessories.",
        isActive: true,
        showInNavbar: true,
        sortOrder: 5,
      },
      {
        name: "Postpartum Recovery",
        slug: "postpartum-recovery",
        description: "Gentle healing balms, support belts, and maternal recovery items.",
        isActive: true,
        showInNavbar: true,
        sortOrder: 6,
      },
    ];

    for (const cat of initialCategories) {
      await createCategory(cat);
    }
  } catch (err) {
    console.error("Error seeding initial categories:", err);
  }
}
