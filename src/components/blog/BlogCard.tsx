"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  CalendarDays,
  Clock3,
  User,
  ArrowUpRight,
  Tag,
  Code2,
} from "lucide-react";
import { BlogPost } from "@/lib/blog";

interface BlogCardProps {
  article: BlogPost;
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
      {/* Top Visual Mockup / Thumbnail */}
      <Link
        href={`/blog/${article.slug}`}
        className="relative h-48 w-full p-6 flex flex-col justify-between overflow-hidden select-none transition-transform duration-300"
        style={{ backgroundColor: "#F0FDFA" }}
      >
        {/* Subtle Ambient Radial Highlight */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 80% 20%, #0F766E 0%, transparent 65%)`,
          }}
        />

        {/* Top bar with category badge */}
        <div className="relative z-10 flex items-center justify-between">
          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-slate-800 bg-white/90 backdrop-blur-md border border-slate-200 px-2.5 py-0.5 rounded-full shadow-xs">
            <Tag className="size-3 text-[#0F766E]" />
            <span>{article.category}</span>
          </span>

          <span className="text-[10px] font-mono text-slate-600 bg-white/90 backdrop-blur-md border border-slate-200 px-2 py-0.5 rounded">
            {article.readTime}
          </span>
        </div>

        {/* Center Mockup Code Chip */}
        <div className="relative z-10 my-auto">
          <div className="rounded-xl border border-slate-200 bg-white/95 backdrop-blur-sm p-3.5 shadow-sm group-hover:border-[#0F766E]/40 transition-colors">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500 mb-1.5">
              <Code2 className="size-3 text-[#0F766E]" />
              <span>{article.tags[0] || "Code"}.architecture</span>
            </div>
            <p className="font-mono text-xs text-slate-800 line-clamp-1 font-semibold">
              {article.title}
            </p>
          </div>
        </div>

        {/* Bottom Tag Pills */}
        <div className="relative z-10 flex items-center gap-1.5 overflow-hidden">
          {article.tags.slice(0, 2).map((t) => (
            <span
              key={t}
              className="text-[9px] font-mono text-slate-600 bg-white/80 border border-slate-200/80 px-2 py-0.5 rounded"
            >
              #{t}
            </span>
          ))}
        </div>
      </Link>

      {/* Body Content */}
      <div className="p-6 flex flex-col flex-1 bg-white justify-between">
        <div>
          {/* Article Title */}
          <Link href={`/blog/${article.slug}`}>
            <h3 className="text-lg font-bold text-slate-900 font-heading leading-snug group-hover:text-[#0F766E] transition-colors line-clamp-2">
              {article.title}
            </h3>
          </Link>

          {/* Description Excerpt */}
          <p className="mt-2.5 text-xs text-slate-600 leading-relaxed line-clamp-3 font-normal">
            {article.description}
          </p>
        </div>

        {/* Footer Info */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3 text-[11px] text-slate-500">
            <div className="flex items-center gap-1">
              <User className="size-3 text-slate-400" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <CalendarDays className="size-3 text-slate-400" />
              <span>{article.date}</span>
            </div>
          </div>

          <Link
            href={`/blog/${article.slug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-800 group-hover:text-[#0F766E] transition-colors"
          >
            <span>Read</span>
            <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default BlogCard;
