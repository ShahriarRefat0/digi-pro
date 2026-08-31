"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Package, Code2, ArrowRight, Sparkles } from "lucide-react";

export function ProductServiceSection() {
  return (
    <section className="relative overflow-hidden bg-black py-20 sm:py-28 border-b border-neutral-900 selection:bg-[#EEF35F] selection:text-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-950 px-3.5 py-1 text-xs font-semibold text-[#EEF35F] mb-3">
            <Sparkles className="size-3.5" />
            <span>The Platform Model</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading text-white">
            Ready-Made or Built for You
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-neutral-400 font-normal">
            Choose the approach that fits your project timeline, technical scope, and team requirements.
          </p>
        </motion.div>

        {/* Two Side-by-Side Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Ready-Made Products */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
            className="group flex flex-col justify-between rounded-3xl border border-neutral-800 bg-neutral-950 p-8 sm:p-10 transition-colors duration-300 hover:border-neutral-700 hover:bg-neutral-900/40 hover:shadow-2xl"
          >
            <div>
              <div className="size-14 rounded-2xl bg-[#EEF35F]/10 border border-[#EEF35F]/20 text-[#EEF35F] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Package className="size-7" />
              </div>

              <span className="text-[10px] font-mono font-medium text-neutral-400 uppercase tracking-widest bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded-full">
                Self-Serve Catalog
              </span>

              <h3 className="text-2xl font-bold text-white font-heading mt-4 mb-3 group-hover:text-[#EEF35F] transition-colors">
                Need Something Ready to Use?
              </h3>

              <p className="text-sm text-neutral-400 leading-relaxed font-normal">
                Explore our collection of digital products designed to help you start faster. Instant ZIP downloads with source files, Figma components, and commercial licensing included.
              </p>
            </div>

            <div className="mt-10 pt-6 border-t border-neutral-900">
              <Link
                href="/products"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#EEF35F] px-8 text-sm font-bold text-black transition-all hover:bg-[#e5ea4e] hover:shadow-[0_0_20px_rgba(238,243,95,0.3)] active:scale-95 shadow-md shadow-[#EEF35F]/20"
              >
                <span>Explore Products</span>
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          {/* Card 2: Custom Engineering */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
            className="group flex flex-col justify-between rounded-3xl border border-neutral-800 bg-neutral-950 p-8 sm:p-10 transition-colors duration-300 hover:border-neutral-700 hover:bg-neutral-900/40 hover:shadow-2xl"
          >
            <div>
              <div className="size-14 rounded-2xl bg-neutral-900 border border-neutral-800 text-[#EEF35F] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Code2 className="size-7" />
              </div>

              <span className="text-[10px] font-mono font-medium text-neutral-400 uppercase tracking-widest bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded-full">
                Custom Development
              </span>

              <h3 className="text-2xl font-bold text-white font-heading mt-4 mb-3 group-hover:text-[#EEF35F] transition-colors">
                Need Something Custom?
              </h3>

              <p className="text-sm text-neutral-400 leading-relaxed font-normal">
                Have a unique idea or business requirement? We can build a solution specifically for you. From high-converting landing pages to complete full-stack web applications.
              </p>
            </div>

            <div className="mt-10 pt-6 border-t border-neutral-900">
              <Link
                href="/services"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-neutral-800 bg-neutral-900 px-8 text-sm font-semibold text-white transition-all hover:bg-neutral-800 hover:border-neutral-700 hover:text-[#EEF35F] active:scale-95"
              >
                <span>Explore Services</span>
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ProductServiceSection;
