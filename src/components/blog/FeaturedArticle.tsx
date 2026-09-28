"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  CalendarDays,
  Clock3,
  User,
  ArrowUpRight,
  Code2,
} from "lucide-react";
import { BlogPost } from "@/lib/blog";

interface FeaturedArticleProps {
  article: BlogPost;
}

export function FeaturedArticle({ article }: FeaturedArticleProps) {
  return (
    <section className="relative overflow-hidden bg-white py-12 sm:py-16 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="group relative rounded-3xl border border-slate-200 bg-slate-50/50 overflow-hidden shadow-md transition-all duration-300 hover:border-[#0F766E]/40"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
            {/* Left Visual: Technical Code & Mockup Canvas */}
            <div
              className="lg:col-span-6 relative p-8 sm:p-12 flex items-center justify-center overflow-hidden min-h-[320px] lg:min-h-[420px] border-b lg:border-b-0 lg:border-r border-slate-200"
              style={{ backgroundColor: "#F0FDFA" }}
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-radial from-[#0F766E]/10 via-transparent to-slate-100/60 pointer-events-none" />

              {/* Floating Technical Window Card */}
              <div className="relative z-10 w-full max-w-md rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-md p-6 shadow-xl transition-transform duration-300 group-hover:scale-[1.02]">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="size-2.5 rounded-full bg-rose-400" />
                    <div className="size-2.5 rounded-full bg-amber-400" />
                    <div className="size-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-mono text-slate-500">
                    <Code2 className="size-3 text-[#0F766E]" />
                    <span>AppRouter.architecture.ts</span>
                  </div>
                  <div className="size-2.5" />
                </div>

                <div className="space-y-2 font-mono text-xs text-slate-700">
                  <p className="text-slate-400">// Next.js Scalable Architecture</p>
                  <p>
                    <span className="text-[#0F766E] font-bold">export async function</span>{" "}
                    <span className="text-blue-600">loadServerBoundary</span>() {`{`}
                  </p>
                  <p className="pl-4 text-emerald-700">
                    const data = await fetchDataset();
                  </p>
                  <p className="pl-4 text-slate-700">
                    return <span className="text-purple-700">&lt;ServerComponent /&gt;</span>;
                  </p>
                  <p>{`}`}</p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-500">Standard: 2026 Core</span>
                  <span className="text-[#0F766E] font-bold">100% Production</span>
                </div>
              </div>
            </div>

            {/* Right Column: Article Details */}
            <div className="lg:col-span-6 p-8 sm:p-12 lg:p-14 flex flex-col justify-between bg-white">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className="inline-flex items-center rounded-full border border-[#CCFBF1] bg-[#F0FDFA] px-3 py-0.5 text-xs font-semibold text-[#0F766E]">
                    Featured Article
                  </span>
                  <span className="text-xs font-mono font-medium text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full">
                    {article.category}
                  </span>
                </div>

                <Link href={`/blog/${article.slug}`}>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-heading text-slate-900 group-hover:text-[#0F766E] transition-colors leading-tight">
                    {article.title}
                  </h2>
                </Link>

                <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  {article.description}
                </p>

                {/* Tags */}
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
              </div>

              {/* Metadata and CTA Button */}
              <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <User className="size-3.5 text-slate-500" />
                    <span className="font-medium text-slate-700">
                      {article.author}
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
                  href={`/blog/${article.slug}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0F766E] px-6 py-2.5 text-xs font-bold text-white transition-all hover:bg-[#115E59] active:scale-95 shrink-0 shadow-xs"
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
