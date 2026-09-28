"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  List,
  Check,
  Copy,
  Lightbulb,
  ArrowRight,
  Code2,
  Terminal,
} from "lucide-react";
import { BlogPost } from "@/lib/blog";

interface ArticleContentProps {
  article: BlogPost;
}

export function ArticleContent({ article }: ArticleContentProps) {
  const [copiedCodeIdx, setCopiedCodeIdx] = React.useState<number | null>(null);

  const handleCopyCode = (code: string, idx: number) => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(code);
      setCopiedCodeIdx(idx);
      setTimeout(() => setCopiedCodeIdx(null), 2000);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left / Main Column: Article Reading Body */}
        <div className="lg:col-span-8 max-w-3xl">
          {/* Large Hero Artwork Banner */}
          <div
            className="relative h-64 sm:h-80 w-full rounded-2xl p-8 mb-12 flex flex-col justify-between overflow-hidden border border-slate-200 shadow-sm"
            style={{ backgroundColor: "#F0FDFA" }}
          >
            <div
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 75% 25%, #0F766E 0%, transparent 65%)`,
              }}
            />

            <div className="relative z-10 flex items-center justify-between">
              <span className="text-xs font-mono font-medium text-slate-800 bg-white/90 backdrop-blur-md border border-slate-200 px-3 py-1 rounded-full shadow-xs">
                {article.category} Core Guide
              </span>
              <span className="text-xs font-mono text-slate-600 bg-white/90 backdrop-blur-md border border-slate-200 px-3 py-1 rounded">
                {article.readTime}
              </span>
            </div>

            {/* Centered Mockup Graphic */}
            <div className="relative z-10 my-auto">
              <div className="max-w-md mx-auto rounded-xl border border-slate-200 bg-white/95 backdrop-blur-md p-4 shadow-sm">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 mb-1">
                  <Terminal className="size-3.5 text-[#0F766E]" />
                  <span>{article.slug}.ts</span>
                </div>
                <p className="font-mono text-xs text-slate-900 font-semibold line-clamp-1">
                  {article.title}
                </p>
              </div>
            </div>

            <div className="relative z-10 flex items-center gap-2">
              {article.tags.map((t) => (
                <span
                  key={t}
                  className="text-[10px] font-mono text-slate-600 bg-white/80 border border-slate-200/80 px-2.5 py-0.5 rounded"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>

          {/* Article Sections */}
          <div className="space-y-12 text-slate-700 leading-relaxed font-normal">
            {article.sections.map((sec, idx) => (
              <section
                key={idx}
                id={sec.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                className="scroll-mt-24"
              >
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-heading text-slate-900 mb-4">
                  {sec.heading}
                </h2>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {sec.content}
                </p>

                {/* Optional Callout Alert */}
                {sec.callout && (
                  <div className="my-6 rounded-2xl border-l-4 border-[#0F766E] bg-[#F0FDFA] border-r border-t border-b border-[#CCFBF1] p-5 text-xs sm:text-sm text-slate-800 leading-relaxed">
                    <p className="font-medium text-slate-900 flex items-center gap-2 mb-1">
                      <Lightbulb className="size-4 text-[#0F766E]" />
                      <span>Key Takeaway</span>
                    </p>
                    <p className="text-slate-600">{sec.callout}</p>
                  </div>
                )}

                {/* Optional Code Snippet Block */}
                {sec.codeSnippet && (
                  <div className="my-6 rounded-2xl border border-slate-200 bg-slate-900 text-slate-100 overflow-hidden shadow-sm">
                    <div className="flex items-center justify-between px-4 py-2.5 bg-slate-800 border-b border-slate-700 text-xs font-mono text-slate-300">
                      <div className="flex items-center gap-2">
                        <Code2 className="size-3.5 text-[#14B8A6]" />
                        <span>{sec.codeSnippet.language}</span>
                      </div>
                      <button
                        onClick={() =>
                          handleCopyCode(sec.codeSnippet!.code, idx)
                        }
                        className="inline-flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
                      >
                        {copiedCodeIdx === idx ? (
                          <>
                            <Check className="size-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="size-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-4 sm:p-5 overflow-x-auto text-xs sm:text-sm font-mono text-slate-200 leading-relaxed">
                      <code>{sec.codeSnippet.code}</code>
                    </pre>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Tags List */}
          <div className="mt-14 pt-8 border-t border-slate-200 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-slate-500 mr-2">
              Tagged with:
            </span>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono text-slate-600 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Product & Service Subtle Crossover CTA */}
          <div className="mt-14 rounded-3xl border border-[#CCFBF1] bg-gradient-to-b from-[#F0FDFA] to-white p-8 sm:p-10 shadow-sm">
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 mb-2">
              Accelerate Your Product Development
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mb-6 font-normal">
              Whether you need instant pre-built templates or a tailored engineering team to build your next feature, we have you covered.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/products"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#0F766E] px-6 text-xs font-bold text-white transition-all hover:bg-[#115E59] active:scale-95 shadow-xs"
              >
                <span>Explore Digital Products</span>
                <ArrowRight className="size-3.5" />
              </Link>

              <Link
                href="/services"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 text-xs font-semibold text-slate-800 transition-all hover:bg-slate-100 hover:border-slate-300 hover:text-[#0F766E] shadow-xs"
              >
                <span>View Our Services</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Table of Contents (Desktop) */}
        <div className="hidden lg:block lg:col-span-4 sticky top-24 space-y-6">
          {article.tableOfContents && article.tableOfContents.length > 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold font-mono text-slate-900 uppercase tracking-wider mb-4 pb-3 border-b border-slate-100">
                <List className="size-4 text-[#0F766E]" />
                <span>Table of Contents</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-600">
                {article.tableOfContents.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="block transition-colors hover:text-[#0F766E] hover:underline underline-offset-4 line-clamp-1"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Quick Creator Box */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <p className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-3">
              Written By
            </p>
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-[#F0FDFA] border border-[#CCFBF1] flex items-center justify-center text-xs font-bold text-[#0F766E]">
                {article.author.charAt(0)}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">{article.author}</p>
                <p className="text-[11px] text-slate-500">
                  {article.authorRole}
                </p>
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-600 leading-relaxed font-normal">
              We build production-grade web applications, digital products, and design systems for forward-thinking developers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleContent;
