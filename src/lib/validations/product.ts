import { z } from "zod";

export const ProductCategoriesEnum = [
  "Web Templates",
  "Website Templates",
  "UI Kits",
  "SaaS Starters",
  "Starter Kits",
  "Developer Tools",
  "E-commerce",
  "Web Components",
  "AI Tools",
  "Design Assets",
  "3D Assets",
  "Motion & Animation",
  "Mobile UI",
  "Productivity",
  "E-books & Guides",
  "Digital Assets",
] as const;

export const isValidHttpUrl = (val?: string): boolean => {
  if (!val || val.trim() === "") return true;
  try {
    const url = new URL(val.trim());
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

export const urlOptionalSchema = z
  .string()
  .trim()
  .optional()
  .refine(isValidHttpUrl, {
    message: "Must be a valid URL starting with http:// or https://",
  });

export const BaseProductSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Product name must be at least 2 characters")
    .max(120, "Product name cannot exceed 120 characters"),
  slug: z
    .string()
    .trim()
    .min(2, "Slug must be at least 2 characters")
    .max(120, "Slug cannot exceed 120 characters")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase alphanumeric with single hyphens (e.g. saas-starter-kit)"
    ),
  shortDescription: z
    .string()
    .trim()
    .min(5, "Short description must be at least 5 characters")
    .max(300, "Short description cannot exceed 300 characters"),
  description: z
    .string()
    .trim()
    .min(10, "Detailed description must be at least 10 characters"),
  price: z.coerce
    .number({ message: "Price must be a valid number" })
    .min(0, "Price must be greater than or equal to 0"),
  category: z.enum(ProductCategoriesEnum, {
    message: "Please select a valid product category",
  }),
  categorySlug: z.string().optional(),
  thumbnail: z
    .union([
      z.string().trim(),
      z.object({
        url: z.string().trim(),
        publicId: z.string().optional(),
      }),
    ])
    .optional()
    .default(""),
  thumbnailPublicId: z.string().optional().or(z.literal("")),
  images: z
    .array(
      z.union([
        z.string().trim(),
        z.object({
          url: z.string().trim(),
          publicId: z.string().optional(),
        }),
      ])
    )
    .default([]),
  imagePublicIds: z.array(z.string()).default([]),
  features: z.array(z.string().trim()).default([]),
  technologies: z.array(z.string().trim()).default([]),
  included: z.array(z.string().trim()).default([]),
  requirements: z.array(z.string().trim()).default([]),
  demoUrl: urlOptionalSchema,
  documentationUrl: urlOptionalSchema,
  purchaseUrl: urlOptionalSchema,
  version: z
    .string()
    .trim()
    .default("1.0.0")
    .refine(
      (val) => !val || /^[0-9]+(\.[0-9]+)*(-[a-zA-Z0-9.]+)?$/.test(val),
      { message: "Version must follow semver format (e.g. 1.0.0)" }
    ),
  status: z.enum(["published", "draft"]).default("draft"),
  featured: z.boolean().default(false),
  tags: z.array(z.string().trim().toLowerCase()).default([]),
});

export const ProductSchema = BaseProductSchema.superRefine((data, ctx) => {
  // Stricter validations when publishing
  if (data.status === "published") {
    const thumbUrl =
      typeof data.thumbnail === "object"
        ? data.thumbnail.url
        : data.thumbnail;
    if (!thumbUrl || thumbUrl.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "A thumbnail image is required to publish the product.",
        path: ["thumbnail"],
      });
    }

    if (!data.purchaseUrl || data.purchaseUrl.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Purchase / Checkout URL is required for published products.",
        path: ["purchaseUrl"],
      });
    } else if (!isValidHttpUrl(data.purchaseUrl)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Purchase / Checkout URL must be a valid URL starting with http:// or https://",
        path: ["purchaseUrl"],
      });
    }
  }
});

export const UpdateProductSchema = BaseProductSchema.partial();

export type ProductFormValues = z.infer<typeof ProductSchema>;
