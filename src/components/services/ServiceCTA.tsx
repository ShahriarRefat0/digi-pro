"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { MessageSquare, ArrowRight, Sparkles } from "lucide-react";

export function ServiceCTA() {
  return (
    <section className="relative overflow-hidden bg-black py-20 sm:py-28 selection:bg-[#EEF35F] selection:text-black">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 24 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative rounded-3xl border border-neutral-800 bg-gradient-to-b from-neutral-950 via-neutral-950 to-neutral-900/60 p-8 sm:p-14 text-center shadow-2xl overflow-hidden"
        >
          {/* Subtle Ambient Radial Highlight */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="size-[400px] rounded-full bg-radial from-[#EEF35F]/15 via-transparent to-transparent blur-3xl"
            />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900 px-3.5 py-1 text-xs font-semibold text-[#EEF35F] mb-5">
              <Sparkles className="size-3.5" />
              <span>Direct Collaboration</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading text-white">
              Have a Project in Mind?
            </h2>

            <p className="mt-4 text-sm sm:text-base text-neutral-400 leading-relaxed font-normal">
              Let&apos;s discuss your idea and find the right solution for your project. From quick landing pages to full-scale SaaS platforms.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="mailto:contact@example.com?subject=New%20Project%20Inquiry"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#EEF35F] px-8 text-sm font-bold text-black transition-all hover:bg-[#e5ea4e] hover:shadow-[0_0_25px_rgba(238,243,95,0.3)] active:scale-95 shadow-lg shadow-[#EEF35F]/20"
              >
                <MessageSquare className="size-4" />
                <span>Start a Project</span>
              </Link>

              <Link
                href="/products"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full border border-neutral-800 bg-neutral-950 px-8 text-sm font-semibold text-white transition-all hover:bg-neutral-900 hover:border-neutral-700 hover:text-[#EEF35F] active:scale-95"
              >
                <span>Explore Digital Products</span>
                <ArrowRight className="size-4 text-neutral-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[#EEF35F]" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ServiceCTA;
