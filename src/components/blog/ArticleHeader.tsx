"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ChevronRight,
  CalendarDays,
  Clock3,
  Share2,
  Check,
  Tag,
  ArrowLeft,
} from "lucide-react";
import { BlogPost } from "@/lib/blog";

interface ArticleHeaderProps {
  article: BlogPost;
}

export function ArticleHeader({ article }: ArticleHeaderProps) {
  const [copied, setCopied] = React.useState(false);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative overflow-hidden bg-slate-50 py-12 sm:py-16 border-b border-slate-200">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div
          className="size-[500px] rounded-full blur-3xl opacity-20"
          style={{
            background: `radial-gradient(circle, #0F766E 0%, transparent 70%)`,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 mb-8"
        >
          <Link
            href="/"
            className="hover:text-slate-900 transition-colors"
          >
            Home
          </Link>
          <ChevronRight className="size-3.5 text-slate-400" />
          <Link
            href="/blog"
            className="hover:text-slate-900 transition-colors"
          >
            Blog
          </Link>
          <ChevronRight className="size-3.5 text-slate-400" />
          <span className="text-slate-600 font-mono">{article.category}</span>
        </motion.div>

        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="mb-6"
        >
          <Link
            href="/blog"
            className="group inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#0F766E] transition-colors"
          >
            <ArrowLeft className="size-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
            <span>Back to all articles</span>
          </Link>
        </motion.div>

        {/* Category Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="inline-flex items-center gap-1.5 rounded-full border border-[#CCFBF1] bg-[#F0FDFA] px-3.5 py-1 text-xs font-semibold text-[#0F766E] mb-4"
        >
          <Tag className="size-3" />
          <span>{article.category}</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading text-slate-900 leading-tight"
        >
          {article.title}
        </motion.h1>

        {/* Description Excerpt */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal"
        >
          {article.description}
        </motion.p>

        {/* Author & Metadata Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-[#F0FDFA] border border-[#CCFBF1] flex items-center justify-center text-xs font-bold text-[#0F766E] shrink-0">
              {article.author.charAt(0)}
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">{article.author}</p>
              <p className="text-[11px] text-slate-500 font-mono">
                {article.authorRole}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <CalendarDays className="size-3.5 text-slate-400" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock3 className="size-3.5 text-slate-400" />
              <span>{article.readTime}</span>
            </div>
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700 transition-colors hover:border-slate-300 hover:text-[#0F766E] cursor-pointer shadow-xs"
            >
              {copied ? (
                <>
                  <Check className="size-3 text-emerald-600" />
                  <span className="text-emerald-600">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="size-3" />
                  <span>Share</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ArticleHeader;
