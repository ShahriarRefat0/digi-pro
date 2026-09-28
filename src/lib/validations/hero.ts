import { z } from "zod";

/**
 * Validate CTA link to prevent XSS / unsafe protocols like javascript:, data:
 */
const safeLinkSchema = z
  .string()
  .trim()
  .refine(
    (val) => {
      if (!val) return true;
      const lower = val.toLowerCase();
      if (lower.startsWith("javascript:") || lower.startsWith("data:") || lower.startsWith("vbscript:")) {
        return false;
      }
      // Allow relative internal paths starting with /
      if (val.startsWith("/")) return true;
      // Allow absolute http/https URLs
      try {
        const url = new URL(val);
        return url.protocol === "http:" || url.protocol === "https:";
      } catch {
        return false;
      }
    },
    { message: "Must be a valid internal path (e.g. /products) or safe URL (https://...)" }
  );

export const HeroButtonSchema = z.object({
  enabled: z.boolean().default(true),
  text: z.string().trim().max(60, "Button text must be 60 characters or less"),
  link: safeLinkSchema,
});

export const HeroImageSchema = z.object({
  url: z
    .string()
    .trim()
    .min(1, "Image URL is required")
    .refine(
      (val) => {
        if (!val) return false;
        if (val.startsWith("/")) return true;
        try {
          const url = new URL(val);
          return url.protocol === "http:" || url.protocol === "https:" || url.protocol === "blob:";
        } catch {
          return false;
        }
      },
      { message: "Must be a valid absolute or relative image URL" }
    ),
  key: z.string().min(1, "R2 object key is required"),
});

export const BaseHeroSlideObject = z.object({
  eyebrow: z.string().trim().max(100, "Eyebrow must be 100 characters or less").optional().default(""),
  title: z.string().trim().min(2, "Title must be at least 2 characters").max(120, "Title must be 120 characters or less"),
  description: z.string().trim().max(500, "Description must be 500 characters or less").optional().default(""),
  desktopImage: HeroImageSchema,
  mobileImage: HeroImageSchema,
  primaryButton: HeroButtonSchema,
  secondaryButton: HeroButtonSchema,
  order: z.number().int().min(0, "Order must be 0 or greater").default(1),
  isActive: z.boolean().default(true),
  startDate: z.string().nullable().optional(),
  endDate: z.string().nullable().optional(),
});

function checkStartEndDate(data: { startDate?: string | null; endDate?: string | null }): boolean {
  if (data.startDate && data.endDate) {
    const start = new Date(data.startDate).getTime();
    const end = new Date(data.endDate).getTime();
    if (!isNaN(start) && !isNaN(end)) {
      return end >= start;
    }
  }
  return true;
}

export const HeroSlideSchema = BaseHeroSlideObject.refine(checkStartEndDate, {
  message: "End date must be on or after start date",
  path: ["endDate"],
});

export const UpdateHeroSlideSchema = BaseHeroSlideObject.partial().refine(checkStartEndDate, {
  message: "End date must be on or after start date",
  path: ["endDate"],
});
