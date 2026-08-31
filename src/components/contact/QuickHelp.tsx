"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Package, Code2, CircleHelp, ArrowRight } from "lucide-react";
import { QUICK_HELP_ITEMS } from "@/lib/contact";

const ICON_MAP = {
  Package: Package,
  Code2: Code2,
  CircleHelp: CircleHelp,
};

export function QuickHelp() {
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
            Looking for something else?
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-neutral-400 font-normal">
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
                className="group flex flex-col justify-between rounded-3xl border border-neutral-800 bg-neutral-950 p-6 sm:p-8 transition-colors hover:border-neutral-700 hover:bg-neutral-900/50"
              >
                <div>
                  <div className="size-12 rounded-2xl bg-neutral-900 border border-neutral-800 text-[#EEF35F] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white font-heading group-hover:text-[#EEF35F] transition-colors mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-neutral-900">
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#EEF35F] hover:underline underline-offset-4"
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
