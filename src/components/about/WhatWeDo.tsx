"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Package, Code2, BookOpen, ArrowRight } from "lucide-react";

const WHAT_WE_DO_CARDS = [
  {
    title: "Digital Products",
    description:
      "Ready-to-use templates, starter kits, UI resources, and developer tools designed to save weeks of development time.",
    icon: Package,
    cta: "Explore Products",
    href: "/products",
    badge: "Instant Access",
  },
  {
    title: "Development Services",
    description:
      "Custom websites, applications, APIs, and e-commerce solutions built around your specific business requirements.",
    icon: Code2,
    cta: "View Services",
    href: "/services",
    badge: "Tailored Engineering",
  },
  {
    title: "Knowledge",
    description:
      "Practical articles, architectural guides, and tutorials covering modern development, design, and digital products.",
    icon: BookOpen,
    cta: "Read the Blog",
    href: "/blog",
    badge: "Free Guides",
  },
];

export function WhatWeDo() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading text-slate-900">
            What We Do
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-500 font-normal">
            We focus on practical digital solutions that save time and make building easier.
          </p>
        </motion.div>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {WHAT_WE_DO_CARDS.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
                className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-slate-50/50 p-8 transition-all duration-300 hover:border-[#0F766E]/40 hover:bg-white hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="size-12 rounded-2xl bg-[#F0FDFA] border border-[#CCFBF1] text-[#0F766E] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <Icon className="size-6" />
                    </div>
                    <span className="text-[10px] font-mono font-medium text-slate-600 bg-white border border-slate-200 px-2.5 py-0.5 rounded-full shadow-xs">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 font-heading group-hover:text-[#0F766E] transition-colors">
                    {card.title}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {card.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200/80">
                  <Link
                    href={card.href}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-800 transition-all duration-200 hover:bg-[#0F766E] hover:text-white hover:border-[#0F766E] active:scale-95 shadow-xs"
                  >
                    <span>{card.cta}</span>
                    <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
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

export default WhatWeDo;
