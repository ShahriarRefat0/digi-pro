"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Download, ShieldCheck, Zap, RefreshCw } from "lucide-react";

export function ProductDetailClient({ slug }: { slug: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 bg-black text-white"
    >
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.15 }}
        className="text-3xl sm:text-4xl font-extrabold font-heading text-white mb-3 capitalize"
      >
        {slug.replace(/-/g, " ")}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.2 }}
        className="text-sm sm:text-base text-neutral-400 mb-8 max-w-2xl leading-relaxed"
      >
        Instant digital download package with full commercial licensing, source files, and lifetime asset updates.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.25 }}
        className="flex flex-wrap items-center gap-4 pb-8 border-b border-neutral-900"
      >
        <button className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#EEF35F] px-8 text-sm font-bold text-black transition-all hover:bg-[#e5ea4e] hover:shadow-[0_0_25px_rgba(238,243,95,0.3)] active:scale-95 shadow-lg shadow-[#EEF35F]/20">
          <Download className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
          <span>Download Asset</span>
        </button>
        <button className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-neutral-800 bg-neutral-900 px-8 text-sm font-semibold text-white transition-all hover:bg-neutral-800 hover:border-neutral-700 hover:text-[#EEF35F] active:scale-95">
          <span>Preview Files</span>
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 text-xs text-neutral-400"
      >
        <div className="flex items-center gap-2">
          <Zap className="size-4 text-[#EEF35F]" />
          <span>Instant ZIP Delivery</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-4 text-[#EEF35F]" />
          <span>Commercial License Included</span>
        </div>
        <div className="flex items-center gap-2">
          <RefreshCw className="size-4 text-[#EEF35F]" />
          <span>Free Future Updates</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
