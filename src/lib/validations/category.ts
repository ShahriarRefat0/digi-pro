import { z } from "zod";

export const CategorySchema = z.object({
  name: z.string().min(2, "Category name must be at least 2 characters").max(100),
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must contain only lowercase letters, numbers, and hyphens")
    .optional()
    .or(z.literal("")),
  description: z.string().max(500, "Description cannot exceed 500 characters").optional().default(""),
  image: z.string().optional().default(""),
  parentId: z.string().nullable().optional().default(null),
  isActive: z.boolean().default(true),
  showInNavbar: z.boolean().default(true),
  sortOrder: z.coerce.number().int().default(0),
});

export const UpdateCategorySchema = CategorySchema.partial();

export type CategorySchemaType = z.infer<typeof CategorySchema>;
export type UpdateCategorySchemaType = z.infer<typeof UpdateCategorySchema>;
