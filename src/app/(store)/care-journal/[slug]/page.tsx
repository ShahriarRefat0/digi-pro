import * as React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  ArticleHeader,
  ArticleContent,
  RelatedArticles,
  BlogCTA,
} from "@/components/blog";
import { RelatedProducts } from "@/components/blog/RelatedProducts";
import { getJournalBySlug, getPublishedJournals } from "@/lib/journals/journal.repository";
import { getProducts } from "@/lib/products/product.repository";
import { Product } from "@/types/product";

interface JournalDetailProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: JournalDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getJournalBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found | Careoffbd.com Care Journal",
    };
  }

  return {
    title: `${article.title} | Careoffbd.com Care Journal`,
    description: article.description,
    openGraph: {
      title: article.seoTitle || article.title,
      description: article.seoDescription || article.description,
      images: article.coverImage ? [article.coverImage] : [],
    },
  };
}

export default async function JournalDetailPage({ params }: JournalDetailProps) {
  const { slug } = await params;
  const article = await getJournalBySlug(slug);

  if (!article || article.status !== "published") {
    notFound();
  }

  const allArticles = await getPublishedJournals();
  const relatedArticles = allArticles.filter(
    (a) => a.id !== article.id && a.category === article.category
  );

  // Fetch mentioned or category-related products
  let relatedProducts: Product[] = [];
  try {
    const productsRes = await getProducts({ limit: 6, status: "published" });
    if (productsRes && productsRes.length > 0) {
      if (article.relatedProductIds && article.relatedProductIds.length > 0) {
        relatedProducts = productsRes.filter(
          (p: Product) =>
            article.relatedProductIds?.includes(p.id) || article.relatedProductIds?.includes(p.slug)
        );
      }
      if (relatedProducts.length === 0) {
        // Fallback to first 3 published products
        relatedProducts = productsRes.slice(0, 3);
      }
    }
  } catch (err) {
    console.error("Error fetching related products for article:", err);
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#29332D] selection:bg-[#7C9473]/20 selection:text-[#29332D]">
      <Navbar />

      <main className="flex-1 bg-[#FAF7F0]">
        <ArticleHeader article={article} />
        <ArticleContent article={article} />
        <RelatedProducts products={relatedProducts} />
        <RelatedArticles articles={relatedArticles} />
        <BlogCTA />
      </main>

      <Footer />
    </div>
  );
}
