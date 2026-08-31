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
      className="group flex flex-col justify-between rounded-2xl border border-neutral-800 bg-neutral-950 overflow-hidden transition-colors duration-300 hover:border-neutral-700 hover:shadow-2xl hover:shadow-black/70"
    >
      {/* Top Visual Mockup / Thumbnail */}
      <Link
        href={`/blog/${article.slug}`}
        className="relative h-48 w-full p-6 flex flex-col justify-between overflow-hidden select-none transition-transform duration-300"
        style={{ backgroundColor: article.canvasBg }}
      >
        {/* Subtle Ambient Radial Highlight */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 80% 20%, ${article.accentColor} 0%, transparent 65%)`,
          }}
        />

        {/* Top bar with category badge */}
        <div className="relative z-10 flex items-center justify-between">
          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-white/90 bg-black/60 backdrop-blur-md border border-white/10 px-2.5 py-0.5 rounded-full">
            <Tag className="size-3 text-[#EEF35F]" />
            <span>{article.category}</span>
          </span>

          <span className="text-[10px] font-mono text-neutral-400 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded">
            {article.readTime}
          </span>
        </div>

        {/* Center Mockup Code Chip */}
        <div className="relative z-10 my-auto">
          <div className="rounded-xl border border-white/10 bg-black/70 backdrop-blur-sm p-3.5 shadow-lg group-hover:border-white/20 transition-colors">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-400 mb-1.5">
              <Code2 className="size-3 text-[#EEF35F]" />
              <span>{article.tags[0] || "Code"}.architecture</span>
            </div>
            <p className="font-mono text-xs text-neutral-200 line-clamp-1 font-semibold">
              {article.title}
            </p>
          </div>
        </div>

        {/* Bottom Tag Pills */}
        <div className="relative z-10 flex items-center gap-1.5 overflow-hidden">
          {article.tags.slice(0, 2).map((t) => (
            <span
              key={t}
              className="text-[9px] font-mono text-neutral-300/80 bg-black/40 px-2 py-0.5 rounded"
            >
              #{t}
            </span>
          ))}
        </div>
      </Link>

      {/* Body Content */}
      <div className="p-6 flex flex-col flex-1 bg-neutral-950 justify-between">
        <div>
          {/* Article Title */}
          <Link href={`/blog/${article.slug}`}>
            <h3 className="text-lg font-bold text-white font-heading leading-snug group-hover:text-[#EEF35F] transition-colors line-clamp-2">
              {article.title}
            </h3>
          </Link>

          {/* Description Excerpt */}
          <p className="mt-2.5 text-xs text-neutral-400 leading-relaxed line-clamp-3 font-normal">
            {article.description}
          </p>
        </div>

        {/* Footer Info */}
        <div className="mt-6 pt-4 border-t border-neutral-900 flex items-center justify-between">
          <div className="flex items-center gap-3 text-[11px] text-neutral-400">
            <div className="flex items-center gap-1">
              <User className="size-3 text-neutral-500" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <CalendarDays className="size-3 text-neutral-500" />
              <span>{article.date}</span>
            </div>
          </div>

          <Link
            href={`/blog/${article.slug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-white group-hover:text-[#EEF35F] transition-colors"
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
