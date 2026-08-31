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
import { getArticleBySlug, getRelatedArticles, BLOG_POSTS } from "@/lib/blog";

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found — Blog",
    };
  }

  return {
    title: `${article.title} — DigiForge Blog`,
    description: article.description,
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(article.slug, 3);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white selection:bg-[#EEF35F] selection:text-black">
      {/* 1. Navbar */}
      <Navbar />

      {/* Main Article Container */}
      <main className="flex-1 bg-black">
        {/* 2. Article Header */}
        <ArticleHeader article={article} />

        {/* 3. Article Content (TOC, Formatted prose, code blocks, and crossover CTA) */}
        <ArticleContent article={article} />

        {/* 4. Related Articles */}
        <RelatedArticles articles={relatedArticles} />

        {/* 5. Newsletter / CTA */}
        <BlogCTA />
      </main>

      {/* 6. Footer */}
      <Footer />
    </div>
  );
}
