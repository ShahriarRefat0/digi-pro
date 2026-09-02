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

export const ProductSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters").trim(),
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase alphanumeric and hyphens only")
    .trim(),
  shortDescription: z.string().min(5, "Short description is required").trim(),
  description: z.string().min(10, "Detailed description is required").trim(),
  price: z.coerce.number().min(0, "Price must be greater than or equal to 0"),
  category: z.enum(ProductCategoriesEnum),
  thumbnail: z.string().min(1, "Thumbnail image URL is required").trim(),
  images: z.array(z.string()).default([]),
  features: z.array(z.string()).default([]),
  included: z.array(z.string()).default([]),
  technologies: z.array(z.string()).default([]),
  requirements: z.array(z.string()).default([]),
  demoUrl: z.string().optional().or(z.literal("")),
  documentationUrl: z.string().optional().or(z.literal("")),
  purchaseUrl: z.string().optional().or(z.literal("")),
  version: z.string().default("1.0.0"),
  status: z.enum(["published", "draft"]).default("draft"),
  featured: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
});

export const UpdateProductSchema = ProductSchema.partial();

export type ProductFormValues = z.infer<typeof ProductSchema>;
