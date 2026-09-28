import * as React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroFallback() {
  return (
    <section className="relative min-h-[70vh] lg:min-h-[75vh] w-full bg-gradient-to-b from-[#F0FDFA]/30 via-slate-50 to-slate-50 border-b border-slate-200 overflow-hidden flex flex-col items-center justify-center text-center px-4 py-20 sm:py-28">
      {/* Background Soft Glow Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 size-96 rounded-full bg-teal-100/40 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#CCFBF1] bg-[#F0FDFA] px-4 py-1 text-xs font-semibold text-[#0F766E] shadow-2xs">
          <Sparkles className="size-3.5 text-[#0F766E]" />
          <span>Careproff Essentials</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-heading text-slate-900 leading-[1.08]">
          Pure, Safe &amp; Gentle Care for Every{" "}
          <span className="bg-gradient-to-r from-slate-900 via-[#0F766E] to-[#0F766E] bg-clip-text text-transparent underline decoration-[#0F766E]/30 decoration-wavy underline-offset-8">
            Mother &amp; Little One.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
          Explore our thoughtfully curated collection of baby skin care, newborn essentials, and maternal care products.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/products"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#0F766E] px-8 text-sm font-bold text-white transition-all hover:bg-[#115E59] hover:scale-105 active:scale-95 shadow-md shadow-teal-900/10"
          >
            <span>Shop Products</span>
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/about"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-8 text-sm font-semibold text-slate-800 transition-all hover:bg-slate-50 hover:border-slate-300 hover:scale-105 active:scale-95 shadow-xs"
          >
            <span>Our Philosophy</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
