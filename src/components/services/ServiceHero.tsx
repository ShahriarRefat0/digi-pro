"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Terminal, CheckCircle2 } from "lucide-react";

export function ServiceHero() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 sm:py-28 lg:py-32 border-b border-slate-200">
      {/* Background Radial Ambient Spotlight */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.7, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="size-[650px] rounded-full bg-radial from-[#0F766E]/10 via-slate-50 to-slate-50 blur-3xl"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 text-center lg:text-left">

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading text-slate-900 leading-[1.08]"
            >
              Let&apos;s Build Something{" "}
              <span className="text-[#0F766E] underline decoration-[#0F766E]/40 decoration-wavy underline-offset-8">
                Great.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed mx-auto lg:mx-0 font-normal"
            >
              From modern websites to scalable backend systems, we build digital solutions tailored to your needs.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-4"
            >
              <a
                href="#services-grid"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#0F766E] px-8 text-sm font-bold text-white transition-all hover:bg-[#115E59] active:scale-95 shadow-md shadow-[#0F766E]/20"
              >
                <span>Explore Services</span>
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>

              <Link
                href="/products"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-8 text-sm font-semibold text-slate-800 transition-all hover:bg-slate-100 hover:border-slate-300 hover:text-[#0F766E] active:scale-95 shadow-xs"
              >
                <span>View Digital Products</span>
              </Link>
            </motion.div>

            {/* Quick trust metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="mt-10 pt-8 border-t border-slate-200 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-600"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-[#0F766E]" />
                <span>Next.js 16 &amp; TypeScript</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-[#0F766E]" />
                <span>Clean Scalable Architecture</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-[#0F766E]" />
                <span>Production Ready</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Code Window Developer Visual with subtle floating motion */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center"
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="w-full max-w-md rounded-2xl border border-slate-200 bg-white shadow-lg overflow-hidden backdrop-blur-sm transition-all hover:border-slate-300"
            >
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50">
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-rose-400" />
                  <div className="size-3 rounded-full bg-amber-400" />
                  <div className="size-3 rounded-full bg-emerald-400" />
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-600">
                  <Terminal className="size-3 text-[#0F766E]" />
                  <span>service.config.ts</span>
                </div>
                <div className="size-3" />
              </div>

              {/* Code Contents */}
              <div className="p-5 font-mono text-xs leading-relaxed text-slate-700 space-y-2">
                <p className="text-slate-400">// Initialize custom engineering workflow</p>
                <p>
                  <span className="text-[#0F766E] font-bold">const</span> project = <span className="text-blue-600">createDigitalSolution</span>({`{`}
                </p>
                <p className="pl-4">
                  client: <span className="text-emerald-700">&quot;Modern Business&quot;</span>,
                </p>
                <p className="pl-4">
                  stack: [<span className="text-emerald-700">&quot;Next.js&quot;</span>, <span className="text-emerald-700">&quot;TypeScript&quot;</span>, <span className="text-emerald-700">&quot;Tailwind&quot;</span>],
                </p>
                <p className="pl-4">
                  delivery: <span className="text-purple-700">&quot;Production Ready&quot;</span>,
                </p>
                <p className="pl-4">
                  qualityScore: <span className="text-[#0F766E] font-bold">100</span>,
                </p>
                <p>{`});`}</p>
                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">Status: Active</span>
                  <span className="inline-flex items-center gap-1.5 text-emerald-600 font-semibold">
                    <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                    Ready for Deployment
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ServiceHero;
