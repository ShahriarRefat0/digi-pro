"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  List,
  Check,
  Copy,
  Layers,
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
            className="relative h-64 sm:h-80 w-full rounded-2xl p-8 mb-12 flex flex-col justify-between overflow-hidden border border-neutral-800 shadow-2xl"
            style={{ backgroundColor: article.canvasBg }}
          >
            <div
              className="absolute inset-0 opacity-40 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 75% 25%, ${article.accentColor} 0%, transparent 65%)`,
              }}
            />

            <div className="relative z-10 flex items-center justify-between">
              <span className="text-xs font-mono text-white/90 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full">
                {article.category} Core Guide
              </span>
              <span className="text-xs font-mono text-neutral-300 bg-black/60 backdrop-blur-md px-3 py-1 rounded">
                {article.readTime}
              </span>
            </div>

            {/* Centered Mockup Graphic */}
            <div className="relative z-10 my-auto">
              <div className="max-w-md mx-auto rounded-xl border border-white/15 bg-black/80 backdrop-blur-md p-4 shadow-xl">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-neutral-400 mb-1">
                  <Terminal className="size-3.5 text-[#EEF35F]" />
                  <span>{article.slug}.ts</span>
                </div>
                <p className="font-mono text-xs text-white font-semibold line-clamp-1">
                  {article.title}
                </p>
              </div>
            </div>

            <div className="relative z-10 flex items-center gap-2">
              {article.tags.map((t) => (
                <span
                  key={t}
                  className="text-[10px] font-mono text-neutral-300 bg-black/50 px-2.5 py-0.5 rounded"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>

          {/* Article Sections */}
          <div className="space-y-12 text-neutral-300 leading-relaxed font-normal">
            {article.sections.map((sec, idx) => (
              <section
                key={idx}
                id={sec.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                className="scroll-mt-24"
              >
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-heading text-white mb-4">
                  {sec.heading}
                </h2>

                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                  {sec.content}
                </p>

                {/* Optional Callout Alert */}
                {sec.callout && (
                  <div className="my-6 rounded-2xl border-l-4 border-[#EEF35F] bg-neutral-950 border-r border-t border-b border-neutral-800/80 p-5 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    <p className="font-medium text-white flex items-center gap-2 mb-1">
                      <Lightbulb className="size-4 text-[#EEF35F]" />
                      <span>Key Takeaway</span>
                    </p>
                    <p className="text-neutral-400">{sec.callout}</p>
                  </div>
                )}

                {/* Optional Code Snippet Block */}
                {sec.codeSnippet && (
                  <div className="my-6 rounded-2xl border border-neutral-800 bg-neutral-950 overflow-hidden shadow-xl">
                    <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-900 border-b border-neutral-800 text-xs font-mono text-neutral-400">
                      <div className="flex items-center gap-2">
                        <Code2 className="size-3.5 text-[#EEF35F]" />
                        <span>{sec.codeSnippet.language}</span>
                      </div>
                      <button
                        onClick={() =>
                          handleCopyCode(sec.codeSnippet!.code, idx)
                        }
                        className="inline-flex items-center gap-1 hover:text-white transition-colors"
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
                    <pre className="p-4 sm:p-5 overflow-x-auto text-xs sm:text-sm font-mono text-neutral-200 leading-relaxed selection:bg-[#EEF35F] selection:text-black">
                      <code>{sec.codeSnippet.code}</code>
                    </pre>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Tags List */}
          <div className="mt-14 pt-8 border-t border-neutral-900 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-neutral-500 mr-2">
              Tagged with:
            </span>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono text-neutral-400 bg-neutral-950 border border-neutral-800 px-3 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Product & Service Subtle Crossover CTA */}
          <div className="mt-14 rounded-3xl border border-neutral-800 bg-gradient-to-b from-neutral-950 to-neutral-900/60 p-8 sm:p-10 shadow-2xl">
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mb-2">
              Accelerate Your Product Development
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mb-6">
              Whether you need instant pre-built templates or a tailored engineering team to build your next feature, we have you covered.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/products"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#EEF35F] px-6 text-xs font-bold text-black transition-all hover:bg-[#e5ea4e] active:scale-95 shadow-md shadow-[#EEF35F]/20"
              >
                <span>Explore Digital Products</span>
                <ArrowRight className="size-3.5" />
              </Link>

              <Link
                href="/services"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-neutral-800 bg-neutral-900 px-6 text-xs font-semibold text-white transition-all hover:bg-neutral-800 hover:border-neutral-700 hover:text-[#EEF35F]"
              >
                <span>View Our Services</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Table of Contents (Desktop) */}
        <div className="hidden lg:block lg:col-span-4 sticky top-24 space-y-6">
          {article.tableOfContents && article.tableOfContents.length > 0 && (
            <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6 shadow-md">
              <div className="flex items-center gap-2 text-xs font-bold font-mono text-white uppercase tracking-wider mb-4 pb-3 border-b border-neutral-900">
                <List className="size-4 text-[#EEF35F]" />
                <span>Table of Contents</span>
              </div>
              <ul className="space-y-2.5 text-xs text-neutral-400">
                {article.tableOfContents.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="block transition-colors hover:text-white hover:underline underline-offset-4 line-clamp-1"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Quick Creator Box */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6 shadow-md">
            <p className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider mb-3">
              Written By
            </p>
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-xs font-bold text-[#EEF35F]">
                {article.author.charAt(0)}
              </div>
              <div>
                <p className="text-xs font-bold text-white">{article.author}</p>
                <p className="text-[11px] text-neutral-400">
                  {article.authorRole}
                </p>
              </div>
            </div>
            <p className="mt-3 text-xs text-neutral-400 leading-relaxed">
              We build production-grade web applications, digital products, and design systems for forward-thinking developers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleContent;
