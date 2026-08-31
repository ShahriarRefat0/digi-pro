"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Cpu, Blocks, Code2, Globe2 } from "lucide-react";
import { NEUTRAL_STATS } from "@/lib/about";

const STAT_ICONS = {
  Cpu: Cpu,
  Blocks: Blocks,
  Code2: Code2,
  Globe2: Globe2,
};

export function SimpleStats() {
  return (
    <section className="relative overflow-hidden bg-black py-16 sm:py-20 border-b border-neutral-900 selection:bg-[#EEF35F] selection:text-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {NEUTRAL_STATS.map((stat, idx) => {
            const Icon = STAT_ICONS[stat.icon] || Code2;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.45, delay: idx * 0.08, ease: "easeOut" }}
                whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
                className="group rounded-2xl border border-neutral-800 bg-neutral-950 p-6 transition-colors duration-200 hover:border-neutral-700 hover:bg-neutral-900/50"
              >
                <div className="size-10 rounded-xl bg-[#EEF35F]/10 border border-[#EEF35F]/20 text-[#EEF35F] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="size-5" />
                </div>
                <h4 className="text-base font-bold text-white font-heading group-hover:text-[#EEF35F] transition-colors">
                  {stat.title}
                </h4>
                <p className="text-xs text-neutral-400 mt-1 font-mono">
                  {stat.subtitle}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default SimpleStats;
