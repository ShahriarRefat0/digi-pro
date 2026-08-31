"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Sparkles,
  CalendarDays,
  Clock3,
  User,
  ArrowUpRight,
  Code2,
  Terminal,
} from "lucide-react";
import { BlogPost } from "@/lib/blog";

interface FeaturedArticleProps {
  article: BlogPost;
}

export function FeaturedArticle({ article }: FeaturedArticleProps) {
  return (
    <section className="relative overflow-hidden bg-black py-12 sm:py-16 border-b border-neutral-900 selection:bg-[#EEF35F] selection:text-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="group relative rounded-3xl border border-neutral-800 bg-neutral-950 overflow-hidden shadow-2xl transition-all duration-300 hover:border-neutral-700"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
            {/* Left Visual: Technical Code & Mockup Canvas */}
            <div
              className="lg:col-span-6 relative p-8 sm:p-12 flex items-center justify-center overflow-hidden min-h-[320px] lg:min-h-[420px] border-b lg:border-b-0 lg:border-r border-neutral-800"
              style={{ backgroundColor: article.canvasBg }}
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-radial from-[#EEF35F]/10 via-transparent to-black/60 pointer-events-none" />

              {/* Floating Technical Window Card */}
              <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/15 bg-black/80 backdrop-blur-md p-6 shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="size-2.5 rounded-full bg-rose-500/80" />
                    <div className="size-2.5 rounded-full bg-amber-500/80" />
                    <div className="size-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-mono text-neutral-400">
                    <Code2 className="size-3 text-[#EEF35F]" />
                    <span>AppRouter.architecture.ts</span>
                  </div>
                  <div className="size-2.5" />
                </div>

                <div className="space-y-2 font-mono text-xs text-neutral-300">
                  <p className="text-neutral-500">// Next.js Scalable Architecture</p>
                  <p>
                    <span className="text-[#EEF35F]">export async function</span>{" "}
                    <span className="text-blue-400">loadServerBoundary</span>() {`{`}
                  </p>
                  <p className="pl-4 text-emerald-400">
                    const data = await fetchDataset();
                  </p>
                  <p className="pl-4 text-neutral-300">
                    return <span className="text-purple-400">&lt;ServerComponent /&gt;</span>;
                  </p>
                  <p>{`}`}</p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-neutral-400">Standard: 2026 Core</span>
                  <span className="text-[#EEF35F] font-bold">100% Production</span>
                </div>
              </div>
            </div>

            {/* Right Column: Article Details */}
            <div className="lg:col-span-6 p-8 sm:p-12 lg:p-14 flex flex-col justify-between bg-neutral-950">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-[#EEF35F]/30 bg-[#EEF35F]/10 px-3 py-0.5 text-xs font-semibold text-[#EEF35F]">
                    <Sparkles className="size-3" />
                    <span>Featured Article</span>
                  </div>
                  <span className="text-xs font-mono font-medium text-neutral-400 bg-neutral-900 border border-neutral-800 px-2.5 py-0.5 rounded-full">
                    {article.category}
                  </span>
                </div>

                <Link href={`/blog/${article.slug}`}>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-heading text-white group-hover:text-[#EEF35F] transition-colors leading-tight">
                    {article.title}
                  </h2>
                </Link>

                <p className="mt-4 text-sm sm:text-base text-neutral-400 leading-relaxed font-normal">
                  {article.description}
                </p>

                {/* Tags */}
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono text-neutral-400 bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded-md"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Metadata and CTA Button */}
              <div className="mt-10 pt-6 border-t border-neutral-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-xs text-neutral-400">
                  <div className="flex items-center gap-1.5">
                    <User className="size-3.5 text-neutral-400" />
                    <span className="font-medium text-neutral-300">
                      {article.author}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CalendarDays className="size-3.5 text-neutral-500" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock3 className="size-3.5 text-neutral-500" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <Link
                  href={`/blog/${article.slug}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#EEF35F] px-6 py-2.5 text-xs font-bold text-black transition-all hover:bg-[#e5ea4e] hover:shadow-[0_0_20px_rgba(238,243,95,0.3)] active:scale-95 shrink-0"
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
