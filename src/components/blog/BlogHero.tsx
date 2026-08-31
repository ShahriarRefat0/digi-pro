"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Sparkles, Terminal, Code2, Layers, Box } from "lucide-react";

export function BlogHero() {
  return (
    <section className="relative overflow-hidden bg-black py-20 sm:py-24 border-b border-neutral-900 selection:bg-[#EEF35F] selection:text-black">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="size-[600px] rounded-full bg-radial from-neutral-900/60 via-black to-black blur-3xl"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Category Pill */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-950 px-3.5 py-1 text-xs font-semibold text-[#EEF35F] mb-6 shadow-sm"
        >
          <Sparkles className="size-3.5 text-[#EEF35F]" />
          <span>The Developer & Creator Journal</span>
        </motion.div>

        {/* Hero Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading text-white leading-[1.12]"
        >
          Insights for Building{" "}
          <span className="text-[#EEF35F] underline decoration-[#EEF35F]/40 decoration-wavy underline-offset-8">
            Better Digital Products
          </span>
        </motion.h1>

        {/* Supporting Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2, ease: "easeOut" }}
          className="mt-6 text-base sm:text-lg text-neutral-400 max-w-2xl leading-relaxed mx-auto font-normal"
        >
          Practical ideas, tutorials, and architectural insights about modern web development, design systems, and digital assets.
        </motion.p>

        {/* Subtle Floating Technical Visual Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3 text-xs text-neutral-400"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-800 bg-neutral-950 px-3 py-1 font-mono text-[11px]">
            <Code2 className="size-3.5 text-[#EEF35F]" />
            Next.js 16
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-800 bg-neutral-950 px-3 py-1 font-mono text-[11px]">
            <Terminal className="size-3.5 text-[#EEF35F]" />
            TypeScript & Architecture
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-800 bg-neutral-950 px-3 py-1 font-mono text-[11px]">
            <Layers className="size-3.5 text-[#EEF35F]" />
            Design Systems
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-800 bg-neutral-950 px-3 py-1 font-mono text-[11px]">
            <Box className="size-3.5 text-[#EEF35F]" />
            Digital Assets
          </span>
        </motion.div>
      </div>
    </section>
  );
}

export default BlogHero;
