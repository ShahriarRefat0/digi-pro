"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Sparkles, BadgeCheck, Lightbulb, RefreshCw } from "lucide-react";
import { PHILOSOPHY_PRINCIPLES } from "@/lib/about";

const ICON_MAP = {
  Sparkles: Sparkles,
  BadgeCheck: BadgeCheck,
  Lightbulb: Lightbulb,
  RefreshCw: RefreshCw,
};

export function Philosophy() {
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
            <span>Core Values</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading text-white">
            Built With Purpose
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-neutral-400 font-normal">
            The foundational beliefs that guide our product engineering and client engagements.
          </p>
        </motion.div>

        {/* 4 Principles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PHILOSOPHY_PRINCIPLES.map((item, idx) => {
            const Icon = ICON_MAP[item.icon] || Sparkles;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: idx * 0.08, ease: "easeOut" }}
                whileHover={{ y: -6, transition: { duration: 0.2, ease: "easeOut" } }}
                className="group rounded-3xl border border-neutral-800 bg-neutral-950 p-6 sm:p-7 transition-colors duration-200 hover:border-neutral-700 hover:bg-neutral-900/50 hover:shadow-xl"
              >
                <div className="size-11 rounded-2xl bg-[#EEF35F]/10 border border-[#EEF35F]/20 text-[#EEF35F] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Icon className="size-5" />
                </div>

                <h3 className="text-lg font-bold text-white font-heading group-hover:text-[#EEF35F] transition-colors mb-2">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Philosophy;
