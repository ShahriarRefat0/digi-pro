"use client";

import * as React from "react";
import { motion } from "motion/react";
import { TECHNOLOGIES_DATA } from "@/lib/services";
import { Cpu } from "lucide-react";

export function TechnologyList() {
  return (
    <section className="relative overflow-hidden bg-black py-20 sm:py-28 border-b border-neutral-900 selection:bg-[#EEF35F] selection:text-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-950 px-3.5 py-1 text-xs font-semibold text-[#EEF35F] mb-3">
            <Cpu className="size-3.5 text-[#EEF35F]" />
            <span>Tech Stack</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading text-white">
            Technologies I Work With
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-neutral-400">
            Battle-tested industry frameworks, modern runtimes, and accessible UI tooling.
          </p>
        </motion.div>

        {/* Technologies Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {TECHNOLOGIES_DATA.map((tech, idx) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: idx * 0.05, ease: "easeOut" }}
              whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
              className="group rounded-2xl border border-neutral-800 bg-neutral-950 p-5 transition-colors duration-200 hover:border-neutral-700 hover:bg-neutral-900/60"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-sm text-white group-hover:text-[#EEF35F] transition-colors">
                  {tech.name}
                </h3>
                <span className="text-[10px] font-mono font-medium text-neutral-500 bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded">
                  {tech.category}
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-normal">
                {tech.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TechnologyList;
