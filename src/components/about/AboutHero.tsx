"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Package, Code2, Layers } from "lucide-react";

export function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-black py-20 sm:py-28 lg:py-32 border-b border-neutral-900 selection:bg-[#EEF35F] selection:text-black">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.7, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="size-[650px] rounded-full bg-radial from-neutral-900/60 via-black to-black blur-3xl"
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
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading text-white leading-[1.08]"
            >
              Building Digital Products That Help People{" "}
              <span className="text-[#EEF35F] underline decoration-[#EEF35F]/40 decoration-wavy underline-offset-8">
                Build Better.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2, ease: "easeOut" }}
              className="mt-6 text-base sm:text-lg text-neutral-400 max-w-2xl leading-relaxed mx-auto lg:mx-0 font-normal"
            >
              We create practical digital products and provide development services that help creators, developers, and businesses turn ideas into reality.
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
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#EEF35F] px-8 text-sm font-bold text-black transition-all hover:bg-[#e5ea4e] hover:shadow-[0_0_25px_rgba(238,243,95,0.35)] active:scale-95 shadow-lg shadow-[#EEF35F]/20"
              >
                <span>Explore Products</span>
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/services"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-neutral-800 bg-neutral-950 px-8 text-sm font-semibold text-white transition-all hover:bg-neutral-900 hover:border-neutral-700 hover:text-[#EEF35F] active:scale-95"
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
              className="w-full max-w-md rounded-2xl border border-neutral-800 bg-neutral-950 p-6 shadow-2xl relative overflow-hidden backdrop-blur-sm"
            >
              {/* Subtle ambient light inside card */}
              <div className="absolute inset-0 bg-radial from-[#EEF35F]/10 via-transparent to-transparent pointer-events-none" />

              <div className="relative z-10 flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="size-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#EEF35F]">
                    <Layers className="size-4.5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white">DigiForge Platform</h3>
                    <p className="text-[10px] font-mono text-neutral-400">v2.4 Core Edition</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                  Independent
                </span>
              </div>

              {/* Stacked Preview Pills */}
              <div className="relative z-10 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between rounded-xl bg-neutral-900/80 border border-neutral-800/80 p-3">
                  <div className="flex items-center gap-2">
                    <Package className="size-4 text-[#EEF35F]" />
                    <span className="text-white">Ready-made Resources</span>
                  </div>
                  <span className="text-neutral-500 text-[11px]">Instant ZIP</span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-neutral-900/80 border border-neutral-800/80 p-3">
                  <div className="flex items-center gap-2">
                    <Code2 className="size-4 text-[#EEF35F]" />
                    <span className="text-white">Custom Engineering</span>
                  </div>
                  <span className="text-neutral-500 text-[11px]">Tailored</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-900 flex items-center justify-between text-[11px] text-neutral-400">
                <span>Built for developers & creators</span>
                <span className="text-[#EEF35F] font-bold">100% Practical</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutHero;
