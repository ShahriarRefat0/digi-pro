"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Code2, Package, ArrowRight } from "lucide-react";

export function ContactCTA() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="relative rounded-3xl border border-[#CCFBF1] bg-gradient-to-b from-[#F0FDFA] via-white to-slate-50 p-8 sm:p-14 text-center shadow-md overflow-hidden"
        >
          {/* Ambient Glow */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="size-[400px] rounded-full bg-radial from-[#0F766E]/10 via-transparent to-transparent blur-3xl"
            />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading text-slate-900">
              Have an idea in mind?
            </h2>

            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Tell us what you&apos;re building and let&apos;s figure out the next step.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/products"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#0F766E] px-8 text-sm font-bold text-white transition-all hover:bg-[#115E59] active:scale-95 shadow-md shadow-[#0F766E]/20"
              >
                <Package className="size-4" />
                <span>Explore Products</span>
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/products"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-8 text-sm font-semibold text-slate-800 transition-all hover:bg-slate-100 hover:border-slate-300 hover:text-[#0F766E] active:scale-95 shadow-xs"
              >
                <Package className="size-4" />
                <span>Explore Products</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ContactCTA;
