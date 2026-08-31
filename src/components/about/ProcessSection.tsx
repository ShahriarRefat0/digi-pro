"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Search, PenTool, Code2, TrendingUp, Sparkles } from "lucide-react";
import { APPROACH_STEPS } from "@/lib/about";

const STEP_ICONS = {
  Search: Search,
  PenTool: PenTool,
  Code2: Code2,
  TrendingUp: TrendingUp,
};

export function ProcessSection() {
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
            <span>Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading text-white">
            From Idea to Launch
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-neutral-400 font-normal">
            A repeatable 4-step framework powering our internal assets and custom projects.
          </p>
        </motion.div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {APPROACH_STEPS.map((step, idx) => {
            const Icon = STEP_ICONS[step.icon] || Code2;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: idx * 0.08, ease: "easeOut" }}
                whileHover={{ y: -6, transition: { duration: 0.2, ease: "easeOut" } }}
                className="group rounded-3xl border border-neutral-800 bg-neutral-950 p-6 sm:p-7 transition-colors duration-200 hover:border-neutral-700 hover:bg-neutral-900/50 relative"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs font-mono font-bold text-[#EEF35F] bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded-full">
                    {step.number}
                  </span>
                  <div className="size-9 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 flex items-center justify-center group-hover:text-[#EEF35F] group-hover:border-[#EEF35F]/30 transition-all">
                    <Icon className="size-4.5" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white font-heading group-hover:text-[#EEF35F] transition-colors mb-2">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
                  {step.description}
                </p>

                {/* Connector arrow on desktop */}
                {idx < APPROACH_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 text-neutral-700 font-mono text-base pointer-events-none">
                    &rarr;
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ProcessSection;
