"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Code2, Palette, Lightbulb, Building2 } from "lucide-react";
import { AUDIENCE_ITEMS } from "@/lib/about";

const AUDIENCE_ICONS = {
  Code2: Code2,
  Palette: Palette,
  Lightbulb: Lightbulb,
  Building2: Building2,
};

export function AudienceSection() {
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
            Built For People Who Build
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-neutral-400 font-normal">
            Whether you are solo coding or launching an enterprise venture, our ecosystem supports your workflow.
          </p>
        </motion.div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {AUDIENCE_ITEMS.map((item, idx) => {
            const Icon = AUDIENCE_ICONS[item.icon] || Code2;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: idx * 0.08, ease: "easeOut" }}
                whileHover={{ y: -6, transition: { duration: 0.2, ease: "easeOut" } }}
                className="group rounded-3xl border border-neutral-800 bg-neutral-950 p-6 sm:p-7 transition-colors duration-200 hover:border-neutral-700 hover:bg-neutral-900/50"
              >
                <div className="size-11 rounded-2xl bg-neutral-900 border border-neutral-800 text-[#EEF35F] flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-[#EEF35F]/10 group-hover:border-[#EEF35F]/20 transition-all">
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

export default AudienceSection;
