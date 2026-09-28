"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Package, Code2, Layers } from "lucide-react";

export function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 sm:py-28 lg:py-32 border-b border-slate-200 selection:bg-teal-100 selection:text-teal-900">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.7, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="size-[650px] rounded-full bg-radial from-teal-100/60 via-slate-50 to-slate-50 blur-3xl"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading text-slate-900 leading-[1.08]"
            >
              Building Digital Products That Help People{" "}
              <span className="text-[#0F766E] underline decoration-[#0F766E]/40 decoration-wavy underline-offset-8">
                Care Better.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2, ease: "easeOut" }}
              className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed mx-auto lg:mx-0 font-normal"
            >
              We create practical digital products and provide care resources that help families, caregivers, and experts nurture with confidence.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3, ease: "easeOut" }}
              className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-4"
            >
              <Link
                href="/products"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#0F766E] px-8 text-sm font-bold text-white transition-all hover:bg-[#115E59] active:scale-95 shadow-md shadow-teal-900/10"
              >
                <span>Explore Products</span>
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/services"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-8 text-sm font-semibold text-slate-800 transition-all hover:bg-slate-100 hover:border-slate-400 hover:text-[#0F766E] active:scale-95 shadow-xs"
              >
                <span>View Our Services</span>
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Floating Digital Product Mockup Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center"
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-lg relative overflow-hidden backdrop-blur-sm"
            >
              {/* Subtle ambient light inside card */}
              <div className="absolute inset-0 bg-radial from-teal-50/50 via-transparent to-transparent pointer-events-none" />

              <div className="relative z-10 flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="size-9 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#0F766E]">
                    <Layers className="size-4.5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">Careproff Platform</h3>
                    <p className="text-[10px] font-mono text-slate-500">v2.4 Core Edition</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  Independent
                </span>
              </div>

              {/* Stacked Preview Pills */}
              <div className="relative z-10 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between rounded-xl bg-slate-50 border border-slate-200 p-3">
                  <div className="flex items-center gap-2">
                    <Package className="size-4 text-[#0F766E]" />
                    <span className="text-slate-800">Ready-made Resources</span>
                  </div>
                  <span className="text-slate-500 text-[11px]">Instant Download</span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-slate-50 border border-slate-200 p-3">
                  <div className="flex items-center gap-2">
                    <Code2 className="size-4 text-[#0F766E]" />
                    <span className="text-slate-800">Custom Services</span>
                  </div>
                  <span className="text-slate-500 text-[11px]">Tailored Care</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Built for families &amp; caregivers</span>
                <span className="text-[#0F766E] font-bold">100% Verified</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutHero;
