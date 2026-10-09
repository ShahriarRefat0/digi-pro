"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth/session";
import { CategorySchema, UpdateCategorySchema } from "@/lib/validations/category";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
} from "@/lib/categories/category.repository";
import { Category } from "@/types/category";

export interface ActionResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  fieldErrors?: Record<string, string>;
}

async function requireAdminAuth(): Promise<boolean> {
  const session = await getSession();
  return Boolean(session && session.role === "admin");
}

function revalidateCategoryPaths() {
  try {
    revalidatePath("/");
    revalidatePath("/products");
    revalidatePath("/care-journal");
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/categories");
    revalidatePath("/dashboard/products");
  } catch (err) {
    console.error("Error revalidating category paths:", err);
  }
}

/**
 * Server Action: Get all categories for Admin / Storefront
 */
export async function getCategoriesAction(): Promise<ActionResult<Category[]>> {
  try {
    const categories = await getCategories();
    return { success: true, data: categories };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to fetch categories." };
  }
}

/**
 * Server Action: Create a new Category
 */
export async function createCategoryAction(rawData: unknown): Promise<ActionResult<Category>> {
  try {
    const isAuth = await requireAdminAuth();
    if (!isAuth) {
      return { success: false, error: "Unauthorized. Admin privileges required." };
    }

    const validation = CategorySchema.safeParse(rawData);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        const path = issue.path[0];
        if (path) fieldErrors[path.toString()] = issue.message;
      });
      return { success: false, error: "Validation failed.", fieldErrors };
    }

    const category = await createCategory(validation.data);
    revalidateCategoryPaths();

    return { success: true, data: category };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to create category." };
  }
}

/**
 * Server Action: Update an existing Category
 */
export async function updateCategoryAction(
  id: string,
  rawData: unknown
): Promise<ActionResult<Category>> {
  try {
    const isAuth = await requireAdminAuth();
    if (!isAuth) {
      return { success: false, error: "Unauthorized. Admin privileges required." };
    }

    const validation = UpdateCategorySchema.safeParse(rawData);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        const path = issue.path[0];
        if (path) fieldErrors[path.toString()] = issue.message;
      });
      return { success: false, error: "Validation failed.", fieldErrors };
    }

    const updated = await updateCategory(id, validation.data);
    if (!updated) {
      return { success: false, error: "Category not found or update failed." };
    }

    revalidateCategoryPaths();
    return { success: true, data: updated };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to update category." };
  }
}

/**
 * Server Action: Toggle Category Active Status
 */
export async function toggleCategoryActiveAction(
  id: string,
  isActive: boolean
): Promise<ActionResult<Category>> {
  try {
    const isAuth = await requireAdminAuth();
    if (!isAuth) {
      return { success: false, error: "Unauthorized. Admin privileges required." };
    }

    const updated = await updateCategory(id, { isActive });
    if (!updated) {
      return { success: false, error: "Category not found." };
    }

    revalidateCategoryPaths();
    return { success: true, data: updated };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to toggle active status." };
  }
}

/**
 * Server Action: Toggle Category Navbar Visibility
 */
export async function toggleCategoryNavbarAction(
  id: string,
  showInNavbar: boolean
): Promise<ActionResult<Category>> {
  try {
    const isAuth = await requireAdminAuth();
    if (!isAuth) {
      return { success: false, error: "Unauthorized. Admin privileges required." };
    }

    const updated = await updateCategory(id, { showInNavbar });
    if (!updated) {
      return { success: false, error: "Category not found." };
    }

    revalidateCategoryPaths();
    return { success: true, data: updated };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to toggle navbar visibility." };
  }
}

/**
 * Server Action: Delete a Category
 */
export async function deleteCategoryAction(id: string): Promise<ActionResult> {
  try {
    const isAuth = await requireAdminAuth();
    if (!isAuth) {
      return { success: false, error: "Unauthorized. Admin privileges required." };
    }

    const result = await deleteCategory(id);
    if (!result.success) {
      return { success: false, error: result.message || "Cannot delete category." };
    }

    revalidateCategoryPaths();
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to delete category." };
  }
}
