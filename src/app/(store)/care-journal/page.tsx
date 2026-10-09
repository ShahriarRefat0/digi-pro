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
import { getPublishedJournals, getFeaturedJournal } from "@/lib/journals/journal.repository";

export const metadata: Metadata = {
  title: "Care Journal — Trusted Guidance for Better Baby & Mother Care | Careoffbd.com",
  description:
    "Helpful care tips, product guides, and practical advice for mothers, parents, and caregivers from Careoffbd.com pediatric & maternal care experts.",
};

export default async function CareJournalPage() {
  const [featured, allArticles] = await Promise.all([
    getFeaturedJournal(),
    getPublishedJournals(),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#29332D] selection:bg-[#7C9473]/20 selection:text-[#29332D]">
      {/* 1. Navbar */}
      <Navbar />

      {/* Main Journal Page Content */}
      <main className="flex-1 bg-[#FAF7F0]">
        {/* 2. Journal Hero */}
        <BlogHero />

        {/* 3. Featured Article */}
        {featured && <FeaturedArticle article={featured} />}

        {/* 4 & 5. Category Filter & Journal Article Grid */}
        <BlogGrid articles={allArticles} />

        {/* 6. Newsletter / CTA */}
        <BlogCTA />
      </main>

      {/* 7. Footer */}
      <Footer />
    </div>
  );
}
