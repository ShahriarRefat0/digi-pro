"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { JournalArticle } from "@/types/journal";

interface RelatedArticlesProps {
  articles: JournalArticle[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="bg-slate-50 py-16 border-t border-slate-200">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-8">
          <BookOpen className="size-5 text-[#0F766E]" />
          <h3 className="text-xl font-bold font-heading text-slate-900">
            More Care Articles You Might Like
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {articles.slice(0, 3).map((art) => (
            <div
              key={art.id}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-xs hover:border-[#0F766E]/40 hover:shadow-md transition-all group"
            >
              <div>
                {art.coverImage && (
                  <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-3 bg-slate-50">
                    <Image
                      src={art.coverImage}
                      alt={art.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                <span className="text-[10px] font-mono font-bold text-[#0F766E] bg-teal-50 px-2 py-0.5 rounded-full inline-block mb-1.5 border border-teal-100">
                  {art.category}
                </span>
                <Link href={`/care-journal/${art.slug}`}>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#0F766E] transition-colors line-clamp-2 leading-snug">
                    {art.title}
                  </h4>
                </Link>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>{art.readTime}</span>
                <Link
                  href={`/care-journal/${art.slug}`}
                  className="inline-flex items-center gap-1 font-semibold text-slate-800 group-hover:text-[#0F766E] transition-colors"
                >
                  <span>Read</span>
                  <ArrowUpRight className="size-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RelatedArticles;
