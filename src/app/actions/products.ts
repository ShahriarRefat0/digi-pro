"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth/session";
import { ProductSchema, UpdateProductSchema } from "@/lib/validations/product";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getProductBySlug,
} from "@/lib/products/product.repository";
import { Product, CreateProductInput, UpdateProductInput } from "@/types/product";
import {
  deleteCloudinaryImage,
  deleteMultipleCloudinaryImages,
} from "@/lib/cloudinary";

export interface ActionResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  fieldErrors?: Record<string, string>;
}

/**
 * Helper to ensure user is an authenticated administrator
 */
async function requireAuth(): Promise<boolean> {
  const session = await getSession();
  return Boolean(session && session.role === "admin");
}

function revalidateProductPaths(slug?: string) {
  try {
    revalidatePath("/");
    revalidatePath("/products");
    if (slug) {
      revalidatePath(`/products/${slug}`);
    }
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/products");
  } catch (err) {
    console.error("Error during path revalidation:", err);
  }
}

/**
 * Server Action: Create a new product
 */
export async function createProductAction(rawData: unknown): Promise<ActionResult<Product>> {
  try {
    const isAuth = await requireAuth();
    if (!isAuth) {
      return { success: false, error: "Unauthorized. Please sign in as an administrator." };
    }

    const validationResult = ProductSchema.safeParse(rawData);
    if (!validationResult.success) {
      const fieldErrors: Record<string, string> = {};
      validationResult.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        if (field && !fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      });
      const firstError = validationResult.error.issues?.[0]?.message || "Invalid product data";
      return { success: false, error: firstError, fieldErrors };
    }

    const data = validationResult.data as CreateProductInput;

    // Check slug collision
    const existing = await getProductBySlug(data.slug);
    if (existing) {
      return {
        success: false,
        error: `A product with slug "${data.slug}" already exists. Please choose a unique URL slug.`,
        fieldErrors: { slug: "This URL slug is already taken. Please enter a unique slug." },
      };
    }

    const newProduct = await createProduct(data);
    revalidateProductPaths(newProduct.slug);

    return { success: true, data: newProduct };
  } catch (error: any) {
    console.error("Error in createProductAction:", error);
    if (error.code === 11000) {
      return {
        success: false,
        error: "A product with this URL slug already exists. Please choose a unique slug.",
        fieldErrors: { slug: "Slug already exists in MongoDB database." },
      };
    }
    return { success: false, error: error.message || "Failed to create product." };
  }
}

/**
 * Server Action: Update an existing product
 */
export async function updateProductAction(
  id: string,
  rawData: unknown
): Promise<ActionResult<Product>> {
  try {
    const isAuth = await requireAuth();
    if (!isAuth) {
      return { success: false, error: "Unauthorized. Please sign in as an administrator." };
    }

    const validationResult = UpdateProductSchema.safeParse(rawData);
    if (!validationResult.success) {
      const fieldErrors: Record<string, string> = {};
      validationResult.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        if (field && !fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      });
      const firstError = validationResult.error.issues?.[0]?.message || "Invalid product data";
      return { success: false, error: firstError, fieldErrors };
    }

    const data = validationResult.data as UpdateProductInput;

    const existingProduct = await getProductById(id);
    if (!existingProduct) {
      return { success: false, error: "Product not found." };
    }

    if (data.slug) {
      const existingWithSlug = await getProductBySlug(data.slug);
      if (existingWithSlug && existingWithSlug.id !== id) {
        return {
          success: false,
          error: `A product with slug "${data.slug}" already exists. Please choose a unique URL slug.`,
          fieldErrors: { slug: "This URL slug is already taken by another product." },
        };
      }
    }

    const updated = await updateProduct(id, data);
    if (!updated) {
      return { success: false, error: "Product not found or update failed." };
    }

    // Cleanup replaced thumbnail if publicId changed
    if (
      existingProduct.thumbnailPublicId &&
      data.thumbnailPublicId &&
      existingProduct.thumbnailPublicId !== data.thumbnailPublicId
    ) {
      deleteCloudinaryImage(existingProduct.thumbnailPublicId).catch((err) =>
        console.error("Failed to delete replaced thumbnail from Cloudinary:", err)
      );
    }

    // Cleanup removed gallery images
    if (existingProduct.imagePublicIds && existingProduct.imagePublicIds.length > 0) {
      const remainingPublicIds = new Set(data.imagePublicIds || []);
      const removedPublicIds = existingProduct.imagePublicIds.filter(
        (pid) => !remainingPublicIds.has(pid)
      );
      if (removedPublicIds.length > 0) {
        deleteMultipleCloudinaryImages(removedPublicIds).catch((err) =>
          console.error("Failed to delete removed gallery images from Cloudinary:", err)
        );
      }
    }

    revalidateProductPaths(existingProduct.slug);
    if (updated.slug !== existingProduct.slug) {
      revalidateProductPaths(updated.slug);
    }

    return { success: true, data: updated };
  } catch (error: any) {
    console.error(`Error in updateProductAction (${id}):`, error);
    if (error.code === 11000) {
      return {
        success: false,
        error: "A product with this URL slug already exists. Please choose a unique slug.",
        fieldErrors: { slug: "Slug already exists in MongoDB database." },
      };
    }
    return { success: false, error: error.message || "Failed to update product." };
  }
}

/**
 * Server Action: Delete a product and its associated Cloudinary assets
 */
export async function deleteProductAction(id: string): Promise<ActionResult> {
  try {
    const isAuth = await requireAuth();
    if (!isAuth) {
      return { success: false, error: "Unauthorized. Please sign in as an administrator." };
    }

    const product = await getProductById(id);
    if (!product) {
      return { success: false, error: "Product not found." };
    }

    // Collect Cloudinary asset IDs to clean up
    const assetsToDelete: string[] = [];
    if (product.thumbnailPublicId) {
      assetsToDelete.push(product.thumbnailPublicId);
    }
    if (product.imagePublicIds && product.imagePublicIds.length > 0) {
      assetsToDelete.push(...product.imagePublicIds);
    }

    const success = await deleteProduct(id);
    if (!success) {
      return { success: false, error: "Failed to delete product from database." };
    }

    // Safely cleanup Cloudinary assets in the background
    if (assetsToDelete.length > 0) {
      deleteMultipleCloudinaryImages(assetsToDelete).catch((err) =>
        console.error("Failed to cleanup Cloudinary assets for deleted product:", err)
      );
    }

    revalidateProductPaths(product.slug);
    return { success: true };
  } catch (error: any) {
    console.error(`Error in deleteProductAction (${id}):`, error);
    return { success: false, error: error.message || "Failed to delete product." };
  }
}

/**
 * Server Action: Toggle product published / draft status
 */
export async function toggleProductStatusAction(id: string): Promise<ActionResult<{ status: string }>> {
  try {
    const isAuth = await requireAuth();
    if (!isAuth) {
      return { success: false, error: "Unauthorized." };
    }

    const current = await getProductById(id);
    if (!current) {
      return { success: false, error: "Product not found." };
    }

    const newStatus = current.status === "published" ? "draft" : "published";
    const updated = await updateProduct(id, { status: newStatus });

    if (!updated) {
      return { success: false, error: "Failed to update product status." };
    }

    revalidateProductPaths(updated.slug);
    return { success: true, data: { status: newStatus } };
  } catch (error: any) {
    console.error(`Error toggling product status (${id}):`, error);
    return { success: false, error: error.message || "Status toggle failed." };
  }
}

/**
 * Server Action: Toggle product featured flag
 */
export async function toggleFeaturedProductAction(id: string): Promise<ActionResult<{ featured: boolean }>> {
  try {
    const isAuth = await requireAuth();
    if (!isAuth) {
      return { success: false, error: "Unauthorized." };
    }

    const current = await getProductById(id);
    if (!current) {
      return { success: false, error: "Product not found." };
    }

    const newFeatured = !current.featured;
    const updated = await updateProduct(id, { featured: newFeatured });

    if (!updated) {
      return { success: false, error: "Failed to update featured status." };
    }

    revalidateProductPaths(updated.slug);
    return { success: true, data: { featured: newFeatured } };
  } catch (error: any) {
    console.error(`Error toggling featured status (${id}):`, error);
    return { success: false, error: error.message || "Featured toggle failed." };
  }
}
