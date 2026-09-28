"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Package, Code2, ArrowRight } from "lucide-react";

export function ProductServiceSection() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading text-slate-900">
            Ready-Made or Built for You
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-500 font-normal">
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
            className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-slate-50/50 p-8 sm:p-10 transition-all duration-300 hover:border-[#0F766E]/40 hover:bg-white hover:shadow-xl"
          >
            <div>
              <div className="size-14 rounded-2xl bg-[#F0FDFA] border border-[#CCFBF1] text-[#0F766E] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Package className="size-7" />
              </div>

              <span className="text-[10px] font-mono font-medium text-slate-600 uppercase tracking-widest bg-white border border-slate-200 px-2.5 py-1 rounded-full shadow-xs">
                Self-Serve Catalog
              </span>

              <h3 className="text-2xl font-bold text-slate-900 font-heading mt-4 mb-3 group-hover:text-[#0F766E] transition-colors">
                Need Something Ready to Use?
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Explore our collection of digital products designed to help you start faster. Instant ZIP downloads with source files, Figma components, and commercial licensing included.
              </p>
            </div>

            <div className="mt-10 pt-6 border-t border-slate-200">
              <Link
                href="/products"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#0F766E] px-8 text-sm font-bold text-white transition-all hover:bg-[#115E59] active:scale-95 shadow-sm shadow-[#0F766E]/20"
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
            className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-slate-50/50 p-8 sm:p-10 transition-all duration-300 hover:border-[#0F766E]/40 hover:bg-white hover:shadow-xl"
          >
            <div>
              <div className="size-14 rounded-2xl bg-white border border-slate-200 text-[#0F766E] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-xs">
                <Code2 className="size-7" />
              </div>

              <span className="text-[10px] font-mono font-medium text-slate-600 uppercase tracking-widest bg-white border border-slate-200 px-2.5 py-1 rounded-full shadow-xs">
                Custom Development
              </span>

              <h3 className="text-2xl font-bold text-slate-900 font-heading mt-4 mb-3 group-hover:text-[#0F766E] transition-colors">
                Need Something Custom?
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Have a unique idea or business requirement? We can build a solution specifically for you. From high-converting landing pages to complete full-stack web applications.
              </p>
            </div>

            <div className="mt-10 pt-6 border-t border-slate-200">
              <Link
                href="/services"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-8 text-sm font-semibold text-slate-800 transition-all hover:bg-slate-100 hover:border-slate-300 hover:text-[#0F766E] active:scale-95 shadow-xs"
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
