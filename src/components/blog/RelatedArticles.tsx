"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlogPost } from "@/lib/blog";
import { BlogCard } from "./BlogCard";

interface RelatedArticlesProps {
  articles: BlogPost[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-black py-16 sm:py-24 border-t border-neutral-900 selection:bg-[#EEF35F] selection:text-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-heading text-white">
              Related Articles
            </h2>
          </div>

          <Link
            href="/blog"
            className="text-xs font-semibold text-neutral-400 hover:text-white transition-colors inline-flex items-center gap-1.5 group"
          >
            <span>View all articles</span>
            <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, idx) => (
            <BlogCard key={article.id} article={article} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default RelatedArticles;
