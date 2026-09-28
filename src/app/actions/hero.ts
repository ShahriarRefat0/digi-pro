"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth/session";
import { HeroSlideSchema, UpdateHeroSlideSchema } from "@/lib/validations/hero";
import {
  createHeroSlide,
  updateHeroSlide,
  deleteHeroSlide,
  getHeroSlideById,
  toggleHeroSlide,
  reorderHeroSlides,
} from "@/lib/hero/hero.repository";
import { deleteFromR2 } from "@/lib/r2";
import { HeroSlide, CreateHeroSlideInput, UpdateHeroSlideInput } from "@/types/hero";

export interface ActionResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  fieldErrors?: Record<string, string>;
}

/**
 * Helper to check admin authentication for all server actions
 */
async function requireAuth(): Promise<boolean> {
  const session = await getSession();
  return Boolean(session && session.role === "admin");
}

function revalidateHeroPaths() {
  try {
    revalidatePath("/");
    revalidatePath("/dashboard/hero");
  } catch (err) {
    console.error("Error during hero path revalidation:", err);
  }
}

/**
 * Server Action: Create a new hero slide
 */
export async function createHeroSlideAction(rawData: unknown): Promise<ActionResult<HeroSlide>> {
  try {
    const isAuth = await requireAuth();
    if (!isAuth) {
      return { success: false, error: "Unauthorized. Admin credentials required." };
    }

    const validationResult = HeroSlideSchema.safeParse(rawData);
    if (!validationResult.success) {
      const fieldErrors: Record<string, string> = {};
      validationResult.error.issues.forEach((issue) => {
        const field = issue.path.join(".") || "root";
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      });
      const firstError = validationResult.error.issues?.[0]?.message || "Invalid hero slide data";
      return { success: false, error: firstError, fieldErrors };
    }

    const data = validationResult.data as CreateHeroSlideInput;
    const newSlide = await createHeroSlide(data);

    revalidateHeroPaths();
    return { success: true, data: newSlide };
  } catch (error: any) {
    console.error("Error in createHeroSlideAction:", error);
    return { success: false, error: error.message || "Failed to create hero slide." };
  }
}

/**
 * Server Action: Update an existing hero slide
 */
export async function updateHeroSlideAction(
  id: string,
  rawData: unknown
): Promise<ActionResult<HeroSlide>> {
  try {
    const isAuth = await requireAuth();
    if (!isAuth) {
      return { success: false, error: "Unauthorized. Admin credentials required." };
    }

    const existingSlide = await getHeroSlideById(id);
    if (!existingSlide) {
      return { success: false, error: "Hero slide not found." };
    }

    const validationResult = UpdateHeroSlideSchema.safeParse(rawData);
    if (!validationResult.success) {
      const fieldErrors: Record<string, string> = {};
      validationResult.error.issues.forEach((issue) => {
        const field = issue.path.join(".") || "root";
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      });
      const firstError = validationResult.error.issues?.[0]?.message || "Invalid hero slide data";
      return { success: false, error: firstError, fieldErrors };
    }

    const data = validationResult.data as UpdateHeroSlideInput;
    const updated = await updateHeroSlide(id, data);
    if (!updated) {
      return { success: false, error: "Failed to update hero slide in database." };
    }

    // Safely delete replaced images from R2 AFTER successful database update
    if (
      data.desktopImage?.key &&
      existingSlide.desktopImage?.key &&
      data.desktopImage.key !== existingSlide.desktopImage.key
    ) {
      deleteFromR2(existingSlide.desktopImage.key).catch((err) =>
        console.error("Failed to delete replaced desktop image from R2:", err)
      );
    }

    if (
      data.mobileImage?.key &&
      existingSlide.mobileImage?.key &&
      data.mobileImage.key !== existingSlide.mobileImage.key
    ) {
      deleteFromR2(existingSlide.mobileImage.key).catch((err) =>
        console.error("Failed to delete replaced mobile image from R2:", err)
      );
    }

    revalidateHeroPaths();
    return { success: true, data: updated };
  } catch (error: any) {
    console.error(`Error in updateHeroSlideAction (${id}):`, error);
    return { success: false, error: error.message || "Failed to update hero slide." };
  }
}

/**
 * Server Action: Delete a hero slide and clean up its associated R2 objects
 */
export async function deleteHeroSlideAction(id: string): Promise<ActionResult> {
  try {
    const isAuth = await requireAuth();
    if (!isAuth) {
      return { success: false, error: "Unauthorized. Admin credentials required." };
    }

    const existingSlide = await getHeroSlideById(id);
    if (!existingSlide) {
      return { success: false, error: "Hero slide not found." };
    }

    const success = await deleteHeroSlide(id);
    if (!success) {
      return { success: false, error: "Failed to delete hero slide from database." };
    }

    // Clean up associated R2 objects after DB record is removed
    if (existingSlide.desktopImage?.key) {
      deleteFromR2(existingSlide.desktopImage.key).catch((err) =>
        console.error("Failed to delete desktop image from R2:", err)
      );
    }
    if (existingSlide.mobileImage?.key) {
      deleteFromR2(existingSlide.mobileImage.key).catch((err) =>
        console.error("Failed to delete mobile image from R2:", err)
      );
    }

    revalidateHeroPaths();
    return { success: true };
  } catch (error: any) {
    console.error(`Error in deleteHeroSlideAction (${id}):`, error);
    return { success: false, error: error.message || "Failed to delete hero slide." };
  }
}

/**
 * Server Action: Toggle hero slide active/inactive status
 */
export async function toggleHeroSlideAction(id: string): Promise<ActionResult<{ isActive: boolean }>> {
  try {
    const isAuth = await requireAuth();
    if (!isAuth) {
      return { success: false, error: "Unauthorized." };
    }

    const updated = await toggleHeroSlide(id);
    if (!updated) {
      return { success: false, error: "Failed to toggle hero slide status." };
    }

    revalidateHeroPaths();
    return { success: true, data: { isActive: updated.isActive } };
  } catch (error: any) {
    console.error(`Error in toggleHeroSlideAction (${id}):`, error);
    return { success: false, error: error.message || "Status toggle failed." };
  }
}

/**
 * Server Action: Reorder hero slides
 */
export async function reorderHeroSlidesAction(orderedIds: string[]): Promise<ActionResult> {
  try {
    const isAuth = await requireAuth();
    if (!isAuth) {
      return { success: false, error: "Unauthorized." };
    }

    const success = await reorderHeroSlides(orderedIds);
    if (!success) {
      return { success: false, error: "Failed to reorder hero slides." };
    }

    revalidateHeroPaths();
    return { success: true };
  } catch (error: any) {
    console.error("Error in reorderHeroSlidesAction:", error);
    return { success: false, error: error.message || "Failed to reorder hero slides." };
  }
}
