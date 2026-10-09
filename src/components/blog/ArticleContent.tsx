"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Lightbulb, Heart, ShieldCheck, Sparkles } from "lucide-react";
import { JournalArticle } from "@/types/journal";

interface ArticleContentProps {
  article: JournalArticle;
}

export function ArticleContent({ article }: ArticleContentProps) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Large Cover Image Banner */}
      {article.coverImage && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden border border-slate-200 shadow-md mb-10 bg-slate-50"
        >
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            priority
            className="object-cover"
          />
        </motion.div>
      )}

      {/* Main Body Content */}
      <div className="prose prose-slate max-w-none space-y-6 text-slate-700 leading-relaxed">
        {article.content ? (
          <div className="whitespace-pre-line text-base sm:text-lg text-slate-700 leading-relaxed font-sans space-y-4">
            {article.content}
          </div>
        ) : (
          <p className="text-slate-500 italic">No article content available.</p>
        )}
      </div>

      {/* Care Guarantee Callout Box */}
      <div className="mt-12 p-6 rounded-2xl border border-[#A8CFB2]/50 bg-[#F2F8F3] flex items-start gap-4 shadow-xs">
        <div className="size-10 rounded-full bg-white border border-[#A8CFB2]/50 flex items-center justify-center text-[#2D5536] shrink-0 mt-0.5 shadow-2xs">
          <ShieldCheck className="size-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-900 font-heading">
            Careproff Quality &amp; Safety Assurance
          </h4>
          <p className="mt-1 text-xs text-slate-600 leading-relaxed">
            All educational information provided in the Careproff Journal is reviewed by pediatric and maternal wellness specialists. For specific medical concerns regarding your baby or personal recovery, please consult your qualified healthcare provider.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ArticleContent;
