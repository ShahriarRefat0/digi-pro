export const JOURNAL_CATEGORIES = [
  "All",
  "Baby Care",
  "Newborn Care",
  "Baby Skin Care",
  "Baby Bath & Hygiene",
  "Diaper & Rash Care",
  "Mother Care",
  "Pregnancy Care",
  "Postpartum Care",
  "Product Guides",
  "Health & Safety",
  "Seasonal Care",
] as const;

export type JournalCategory = (typeof JOURNAL_CATEGORIES)[number];

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  category: JournalCategory;
  author: string;
  authorRole: string;
  authorAvatar?: string;
  date: string;
  readTime: string;
  featured: boolean;
  status: "published" | "draft";
  tags: string[];
  coverImage: string;
  relatedProductIds?: string[];
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateJournalInput {
  title: string;
  slug?: string;
  description: string;
  content: string;
  category: JournalCategory;
  author?: string;
  authorRole?: string;
  readTime?: string;
  featured?: boolean;
  status?: "published" | "draft";
  tags?: string[];
  coverImage?: string;
  relatedProductIds?: string[];
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: string;
}

export interface UpdateJournalInput extends Partial<CreateJournalInput> {}
