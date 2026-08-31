"use client";

import * as React from "react";
import { motion } from "motion/react";
import { MessageSquare, Code2, Rocket } from "lucide-react";
import { PROCESS_STEPS } from "@/lib/services";

const ICON_MAP = {
  MessageSquare: MessageSquare,
  Code2: Code2,
  Rocket: Rocket,
};

export function ProcessSteps() {
  return (
    <section className="relative overflow-hidden bg-black py-20 sm:py-28 border-b border-neutral-900 selection:bg-[#EEF35F] selection:text-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-950 px-3.5 py-1 text-xs font-semibold text-[#EEF35F] mb-3">
            <span>Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading text-white">
            Simple Process
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-neutral-400">
            A transparent and efficient path from initial conversation to final deployment.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative">
          {PROCESS_STEPS.map((step, idx) => {
            const Icon = ICON_MAP[step.icon] || MessageSquare;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.12, ease: "easeOut" }}
                whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
                className="group relative rounded-2xl border border-neutral-800 bg-neutral-950 p-8 transition-colors duration-300 hover:border-neutral-700 hover:bg-neutral-900/50 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.9),0_0_25px_rgba(238,243,95,0.06)]"
              >
                {/* Step Number Badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono font-bold text-[#EEF35F] bg-neutral-900 border border-neutral-800 px-3 py-1 rounded-full group-hover:border-[#EEF35F]/40 transition-colors">
                    {step.number}
                  </span>
                  <div className="size-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 group-hover:text-[#EEF35F] group-hover:border-[#EEF35F]/30 group-hover:scale-110 transition-all duration-300">
                    <Icon className="size-5" />
                  </div>
                </div>

                {/* Step Title */}
                <h3 className="text-xl font-bold text-white font-heading mb-2.5 group-hover:text-[#EEF35F] transition-colors">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
                  {step.description}
                </p>

                {/* Subtle connector accent on desktop */}
                {idx < PROCESS_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-20 text-neutral-700 font-mono text-lg pointer-events-none">
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

export default ProcessSteps;
