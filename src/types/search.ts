export type SearchResultType = "product" | "service" | "blog" | "page";

export interface SearchResultItem {
  id: string;
  type: SearchResultType;
  title: string;
  description: string;
  href: string;
  category?: string;
  price?: number;
  icon?: string;
  thumbnail?: string;
  date?: string;
  tags?: string[];
  score?: number;
}

export interface GroupedSearchResults {
  products: SearchResultItem[];
  services: SearchResultItem[];
  blogs: SearchResultItem[];
  pages: SearchResultItem[];
  totalCount: number;
}

export interface StaticPageItem {
  id: string;
  title: string;
  description: string;
  href: string;
  keywords: string[];
  icon: string;
}
