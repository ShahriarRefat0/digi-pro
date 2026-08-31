"use client";

import * as React from "react";
import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { BENTO_STATEMENTS } from "@/lib/about";

export function BentoThinking() {
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading text-white">
            Technology Should Make Things Easier
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-neutral-400 font-normal">
            Short, deliberate standards that direct our software design decisions.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {BENTO_STATEMENTS.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.45, delay: idx * 0.06, ease: "easeOut" }}
              whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
              className="group rounded-2xl border border-neutral-800 bg-neutral-950 p-6 sm:p-7 transition-colors duration-200 hover:border-neutral-700 hover:bg-neutral-900/60"
            >
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="size-4 text-[#EEF35F]" />
                <h3 className="text-base font-bold text-white font-heading group-hover:text-[#EEF35F] transition-colors">
                  {item.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BentoThinking;
