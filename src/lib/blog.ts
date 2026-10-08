import { JOURNAL_CATEGORIES, JournalCategory, JournalArticle } from "@/types/journal";
import { getPublishedJournals, getFeaturedJournal, getJournalBySlug } from "@/lib/journals/journal.repository";

export interface ArticleSection {
  heading: string;
  content: string;
  codeSnippet?: {
    language: string;
    code: string;
  };
  callout?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: JournalCategory;
  author: string;
  authorRole: string;
  authorAvatar?: string;
  date: string;
  readTime: string;
  featured?: boolean;
  tags: string[];
  canvasBg?: string;
  accentColor?: string;
  coverImage?: string;
  sections?: ArticleSection[];
  content?: string;
}

export const BLOG_CATEGORIES = JOURNAL_CATEGORIES;
export type BlogCategory = JournalCategory;

export async function fetchPublishedArticles(): Promise<JournalArticle[]> {
  return await getPublishedJournals();
}

export async function fetchFeaturedArticle(): Promise<JournalArticle | null> {
  return await getFeaturedJournal();
}

export async function fetchArticleBySlug(slug: string): Promise<JournalArticle | null> {
  return await getJournalBySlug(slug);
}
