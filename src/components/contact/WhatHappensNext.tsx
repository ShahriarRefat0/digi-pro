"use client";

import * as React from "react";
import { motion } from "motion/react";
import { MessageSquare, Search, ArrowRight } from "lucide-react";
import { NEXT_STEPS } from "@/lib/contact";

const ICON_MAP = {
  MessageSquare: MessageSquare,
  Search: Search,
  ArrowRight: ArrowRight,
};

export function WhatHappensNext() {
  return (
    <section className="relative overflow-hidden bg-black py-20 sm:py-24 border-b border-neutral-900 selection:bg-[#EEF35F] selection:text-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-heading text-white">
            What Happens Next?
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-neutral-400 font-normal">
            A simple and transparent process from your first message to project execution.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {NEXT_STEPS.map((step, idx) => {
            const Icon = ICON_MAP[step.icon] || MessageSquare;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.45, delay: idx * 0.1, ease: "easeOut" }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group rounded-3xl border border-neutral-800 bg-neutral-950 p-6 sm:p-8 transition-colors hover:border-neutral-700 hover:bg-neutral-900/50 relative"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs font-mono font-bold text-[#EEF35F] bg-neutral-900 border border-neutral-800 px-3 py-1 rounded-full">
                    {step.number}
                  </span>
                  <div className="size-10 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 flex items-center justify-center group-hover:text-[#EEF35F] group-hover:border-[#EEF35F]/30 transition-all">
                    <Icon className="size-5" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white font-heading group-hover:text-[#EEF35F] transition-colors mb-2">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
                  {step.description}
                </p>

                {/* Desktop connector arrow */}
                {idx < NEXT_STEPS.length - 1 && (
                  <div className="hidden md:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 text-neutral-700 font-mono text-base pointer-events-none">
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

export default WhatHappensNext;
