"use client";

import * as React from "react";
import { motion } from "motion/react";
import { HeartHandshake, Baby, ShieldCheck, Sparkles, Smile } from "lucide-react";

export function BlogHero() {
  const categoryPills = [
    { label: "Baby Care", icon: Baby },
    { label: "Newborn Care", icon: Sparkles },
    { label: "Mother Care", icon: HeartHandshake },
    { label: "Baby Skin Care", icon: ShieldCheck },
    { label: "Postpartum Care", icon: Smile },
  ];

  return (
    <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-24 border-b border-slate-200">
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
        {/* Brand Tagline Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50/80 px-4 py-1 text-xs font-semibold text-[#0F766E] mb-6 shadow-2xs"
        >
          <ShieldCheck className="size-4 text-[#0F766E]" />
          <span>Careproff Educational Journal</span>
        </motion.div>

        {/* Hero Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
          className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading text-slate-900 leading-[1.12]"
        >
          Trusted Guidance for{" "}
          <span className="text-[#0F766E] underline decoration-[#0F766E]/30 decoration-wavy underline-offset-8">
            Better Baby &amp; Mother Care
          </span>
        </motion.h1>

        {/* Supporting Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2, ease: "easeOut" }}
          className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed mx-auto font-normal"
        >
          Helpful care tips, product guides, and practical advice for mothers, parents, and caregivers.
        </motion.p>

        {/* Floating Category Pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-2.5 text-xs text-slate-600"
        >
          {categoryPills.map((pill) => {
            const IconComponent = pill.icon;
            return (
              <span
                key={pill.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 font-medium text-slate-700 shadow-2xs transition-colors hover:border-[#0F766E]/40"
              >
                <IconComponent className="size-3.5 text-[#0F766E]" />
                <span>{pill.label}</span>
              </span>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default BlogHero;
