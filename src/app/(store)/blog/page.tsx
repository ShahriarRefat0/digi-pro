import * as React from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  BlogHero,
  FeaturedArticle,
  BlogGrid,
  BlogCTA,
} from "@/components/blog";
import { BLOG_POSTS, getFeaturedArticle } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Insights for Building Better Digital Products",
  description:
    "Practical ideas, architectural tutorials, and insights about modern Next.js, React, Node.js, and scalable web development.",
};

export default function BlogPage() {
  const featured = getFeaturedArticle();
  const allArticles = BLOG_POSTS;

  return (
    <div className="min-h-screen flex flex-col bg-black text-white selection:bg-[#EEF35F] selection:text-black">
      {/* 1. Navbar */}
      <Navbar />

      {/* Main Blog Page Content */}
      <main className="flex-1 bg-black">
        {/* 2. Blog Hero */}
        <BlogHero />

        {/* 3. Featured Article */}
        <FeaturedArticle article={featured} />

        {/* 4 & 5. Category Filter & Blog Article Grid */}
        <BlogGrid articles={allArticles} />

        {/* 6. Newsletter / CTA */}
        <BlogCTA />
      </main>

      {/* 7. Footer */}
      <Footer />
    </div>
  );
}
