import { ObjectId } from "mongodb";

export type ProductCategory =
  | "Web Templates"
  | "Website Templates"
  | "UI Kits"
  | "SaaS Starters"
  | "Starter Kits"
  | "Developer Tools"
  | "E-commerce"
  | "Web Components"
  | "AI Tools"
  | "Design Assets"
  | "3D Assets"
  | "Motion & Animation"
  | "Mobile UI"
  | "Productivity"
  | "E-books & Guides"
  | "Digital Assets";

export type ProductStatus = "published" | "draft";

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  "Web Templates",
  "UI Kits",
  "SaaS Starters",
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
];

// MongoDB Document Schema
export interface ProductDocument {
  _id?: ObjectId;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  price: number;
  category: string;
  thumbnail: string;
  images: string[];
  features: string[];
  included: string[];
  technologies: string[];
  requirements: string[];
  demoUrl?: string;
  documentationUrl?: string;
  purchaseUrl?: string;
  version: string;
  status: ProductStatus;
  featured: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Client Serialized Product Entity (with id as string)
export interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  price: number;
  category: ProductCategory;
  thumbnail: string;
  images: string[];
  features: string[];
  included: string[];
  technologies: string[];
  requirements: string[];
  demoUrl?: string;
  documentationUrl?: string;
  purchaseUrl?: string;
  version: string;
  status: ProductStatus;
  featured: boolean;
  tags: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProductInput {
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  price: number;
  category: ProductCategory;
  thumbnail?: string;
  images?: string[];
  features?: string[];
  included?: string[];
  technologies?: string[];
  requirements?: string[];
  demoUrl?: string;
  documentationUrl?: string;
  purchaseUrl?: string;
  version?: string;
  status: ProductStatus;
  featured?: boolean;
  tags?: string[];
}

export type UpdateProductInput = Partial<CreateProductInput>;
