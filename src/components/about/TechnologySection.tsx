"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Cpu } from "lucide-react";

interface TechItem {
  name: string;
  category: string;
  description: string;
}

const TECHNOLOGIES_DATA: TechItem[] = [
  { name: "Next.js 16", category: "Framework", description: "React 19 App Router & Server Components" },
  { name: "TypeScript 5", category: "Language", description: "Strict static typing and safe schemas" },
  { name: "Tailwind CSS v4", category: "Styling", description: "Utility-first CSS styling engine" },
  { name: "MongoDB", category: "Database", description: "Flexible document database" },
  { name: "Cloudflare R2", category: "Storage", description: "S3-compatible object storage" },
  { name: "Lucide Icons", category: "UI Assets", description: "Clean vector iconography" },
  { name: "Framer Motion", category: "Animation", description: "Smooth layout transitions" },
  { name: "Zod", category: "Validation", description: "Runtime schema validation" },
];

export function TechnologySection() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 sm:py-28 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#CCFBF1] bg-[#F0FDFA] px-3.5 py-1 text-xs font-semibold text-[#0F766E] mb-3">
            <Cpu className="size-3.5" />
            <span>Tech Standards</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading text-slate-900">
            Built With Modern Technology
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-500 font-normal">
            We use modern technologies and tools to create fast, scalable, and maintainable digital experiences.
          </p>
        </motion.div>

        {/* Tech Stack Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {TECHNOLOGIES_DATA.map((tech, idx) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: idx * 0.05, ease: "easeOut" }}
              whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
              className="group rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:border-[#0F766E]/40 hover:shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-sm text-slate-900 group-hover:text-[#0F766E] transition-colors">
                  {tech.name}
                </h3>
                <span className="text-[10px] font-mono font-medium text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                  {tech.category}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-normal">
                {tech.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TechnologySection;
