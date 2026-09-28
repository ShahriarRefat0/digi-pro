"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Layers, ArrowRight } from "lucide-react";
import { SERVICES_DATA } from "@/lib/services";
import { ServiceCard } from "./ServiceCard";

export function ServiceGrid() {
  return (
    <section
      id="services-grid"
      className="relative overflow-hidden bg-white py-20 sm:py-28 border-b border-slate-200"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading text-slate-900">
              What I Can Help You Build
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-xl">
              Practical development services for modern digital products and businesses.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/products"
              className="text-xs font-semibold text-slate-600 hover:text-[#0F766E] transition-colors inline-flex items-center gap-1.5 group"
            >
              <span>Need ready-made templates instead?</span>
              <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>

        {/* Concept Banner: Products vs Services Distinction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="mb-12 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="size-10 rounded-xl bg-[#F0FDFA] border border-[#CCFBF1] flex items-center justify-center text-[#0F766E] shrink-0">
              <Layers className="size-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">
                Looking for ready-made digital downloads?
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Explore our digital products for instant UI kits, boilerplates, and 3D icons, or hire custom development below.
              </p>
            </div>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-xl bg-white border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-800 transition-colors hover:bg-[#0F766E] hover:text-white hover:border-[#0F766E] shrink-0 shadow-xs"
          >
            Explore Digital Products &rarr;
          </Link>
        </motion.div>

        {/* 5 Services Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {SERVICES_DATA.map((service, idx) => (
            <ServiceCard key={service.id} service={service} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServiceGrid;
