"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import {
  CalendarDays,
  Clock3,
  User,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { JournalArticle } from "@/types/journal";

interface FeaturedArticleProps {
  article: JournalArticle;
}

export function FeaturedArticle({ article }: FeaturedArticleProps) {
  if (!article) return null;

  return (
    <section className="relative overflow-hidden bg-white py-12 sm:py-16 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="group relative rounded-3xl border border-slate-200 bg-slate-50/50 overflow-hidden shadow-md transition-all duration-300 hover:border-[#A8CFB2]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
            {/* Left Cover Image */}
            <div className="lg:col-span-6 relative overflow-hidden min-h-[300px] sm:min-h-[360px] lg:min-h-[420px] bg-[#F2F8F3] border-b lg:border-b-0 lg:border-r border-slate-200">
              {article.coverImage ? (
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-[#F2F8F3]">
                  <Sparkles className="size-12 text-[#2D5536] mb-3 opacity-60" />
                  <span className="text-sm font-semibold font-heading text-[#2D5536]">
                    Careproff Featured Journal
                  </span>
                </div>
              )}

              {/* Ambient Badge Overlay */}
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#A8CFB2]/50 bg-white/90 backdrop-blur-md px-3.5 py-1 text-xs font-bold text-[#2D5536] shadow-sm">
                  <ShieldCheck className="size-3.5" />
                  <span>Dermatologist Approved Tips</span>
                </span>
              </div>
            </div>

            {/* Right Column: Article Details */}
            <div className="lg:col-span-6 p-8 sm:p-12 lg:p-14 flex flex-col justify-between bg-white">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className="inline-flex items-center rounded-full border border-[#A8CFB2]/50 bg-[#F2F8F3] px-3.5 py-1 text-xs font-bold text-[#1C3A22]">
                    Featured Article
                  </span>
                  <span className="text-xs font-mono font-medium text-slate-600 bg-slate-100 border border-slate-200 px-3 py-0.5 rounded-full">
                    {article.category}
                  </span>
                </div>

                <Link href={`/care-journal/${article.slug}`}>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-heading text-slate-900 group-hover:text-[#2D5536] transition-colors leading-tight">
                    {article.title}
                  </h2>
                </Link>

                <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  {article.description}
                </p>

                {/* Tags */}
                {article.tags && article.tags.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-md"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Metadata and CTA Button */}
              <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <User className="size-3.5 text-slate-500" />
                    <span className="font-medium text-slate-700">
                      {article.author || "Careproff Care Team"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CalendarDays className="size-3.5 text-slate-400" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock3 className="size-3.5 text-slate-400" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <Link
                  href={`/care-journal/${article.slug}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#A8CFB2] px-6 py-2.5 text-xs font-bold text-[#1C3A22] transition-all hover:brightness-95 active:scale-95 shrink-0 shadow-sm"
                >
                  <span>Read Article</span>
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default FeaturedArticle;
