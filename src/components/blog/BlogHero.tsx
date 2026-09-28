"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Terminal, Code2, Layers, Box } from "lucide-react";

export function BlogHero() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 sm:py-24 border-b border-slate-200">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="size-[600px] rounded-full bg-radial from-[#0F766E]/10 via-slate-50 to-slate-50 blur-3xl"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">

        {/* Hero Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading text-slate-900 leading-[1.12]"
        >
          Insights for Building{" "}
          <span className="text-[#0F766E] underline decoration-[#0F766E]/40 decoration-wavy underline-offset-8">
            Better Digital Products
          </span>
        </motion.h1>

        {/* Supporting Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2, ease: "easeOut" }}
          className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed mx-auto font-normal"
        >
          Practical ideas, tutorials, and architectural insights about modern web development, design systems, and digital assets.
        </motion.p>

        {/* Subtle Floating Technical Visual Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-600"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 font-mono text-[11px] shadow-xs">
            <Code2 className="size-3.5 text-[#0F766E]" />
            Next.js 16
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 font-mono text-[11px] shadow-xs">
            <Terminal className="size-3.5 text-[#0F766E]" />
            TypeScript &amp; Architecture
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 font-mono text-[11px] shadow-xs">
            <Layers className="size-3.5 text-[#0F766E]" />
            Design Systems
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 font-mono text-[11px] shadow-xs">
            <Box className="size-3.5 text-[#0F766E]" />
            Digital Assets
          </span>
        </motion.div>
      </div>
    </section>
  );
}

export default BlogHero;
