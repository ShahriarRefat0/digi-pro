"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Package, Code2, CircleHelp, ArrowRight, LucideIcon } from "lucide-react";
import { QUICK_HELP_ITEMS } from "@/lib/contact";

const ICON_MAP: Record<string, LucideIcon> = {
  Package: Package,
  Code2: Code2,
  CircleHelp: CircleHelp,
};

export function QuickHelp() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-heading text-slate-900">
            Looking for something else?
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-500 font-normal">
            Quick shortcuts to our catalog, service offerings, and knowledge base.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {QUICK_HELP_ITEMS.map((item, idx) => {
            const Icon = ICON_MAP[item.icon] || Package;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.45, delay: idx * 0.08, ease: "easeOut" }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-slate-50/50 p-6 sm:p-8 transition-all hover:border-[#0F766E]/40 hover:bg-white hover:shadow-md"
              >
                <div>
                  <div className="size-12 rounded-2xl bg-[#F0FDFA] border border-[#CCFBF1] text-[#0F766E] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 font-heading group-hover:text-[#0F766E] transition-colors mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-200">
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F766E] hover:underline underline-offset-4"
                  >
                    <span>{item.cta}</span>
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default QuickHelp;
