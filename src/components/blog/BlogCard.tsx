"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { CalendarDays, Clock3, User, ArrowUpRight, Tag, Heart } from "lucide-react";
import { JournalArticle } from "@/types/journal";

interface BlogCardProps {
  article: JournalArticle;
  index?: number;
}

export function BlogCard({ article, index = 0 }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: "easeOut" }}
      whileHover={{ y: -6, transition: { duration: 0.22, ease: "easeOut" } }}
      className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all duration-300 hover:border-[#0F766E]/40 hover:shadow-lg"
    >
      {/* Top Image / Visual Cover */}
      <Link
        href={`/care-journal/${article.slug}`}
        className="relative h-48 w-full overflow-hidden bg-teal-50 block select-none"
      >
        {article.coverImage ? (
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-teal-50">
            <Heart className="size-8 text-[#0F766E] mb-2 opacity-50" />
            <span className="text-xs font-bold text-[#0F766E] font-heading">
              Careproff Care Journal
            </span>
          </div>
        )}

        {/* Category & Read Time Badges */}
        <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-slate-800 bg-white/95 backdrop-blur-md border border-slate-200 px-2.5 py-0.5 rounded-full shadow-xs">
            <Tag className="size-3 text-[#0F766E]" />
            <span>{article.category}</span>
          </span>

          <span className="text-[10px] font-mono text-slate-700 bg-white/95 backdrop-blur-md border border-slate-200 px-2 py-0.5 rounded-full font-semibold">
            {article.readTime}
          </span>
        </div>
      </Link>

      {/* Body Content */}
      <div className="p-6 flex flex-col flex-1 bg-white justify-between">
        <div>
          {/* Article Title */}
          <Link href={`/care-journal/${article.slug}`}>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 font-heading leading-snug group-hover:text-[#0F766E] transition-colors line-clamp-2">
              {article.title}
            </h3>
          </Link>

          {/* Description Excerpt */}
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 font-normal">
            {article.description}
          </p>
        </div>

        {/* Footer Info */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3 text-[11px] text-slate-500">
            <div className="flex items-center gap-1">
              <User className="size-3 text-slate-400" />
              <span className="truncate max-w-[100px]">{article.author || "Careproff Care Team"}</span>
            </div>
            <div className="flex items-center gap-1">
              <CalendarDays className="size-3 text-slate-400" />
              <span>{article.date}</span>
            </div>
          </div>

          <Link
            href={`/care-journal/${article.slug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-800 group-hover:text-[#0F766E] transition-colors shrink-0"
          >
            <span>Read Article</span>
            <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default BlogCard;
