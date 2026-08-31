"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Rocket,
  Code2,
  SlidersHorizontal,
  ArrowRight,
} from "lucide-react";

interface ValuePropCard {
  number: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const VALUE_PROPS: ValuePropCard[] = [
  {
    number: "01",
    title: "Build Faster",
    description:
      "Start with ready-made digital products instead of building everything from scratch.",
    cta: "Explore Products",
    href: "/products",
    icon: Rocket,
  },
  {
    number: "02",
    title: "Modern Stack",
    description:
      "Built with modern technologies and development practices for reliable digital products.",
    cta: "Explore Technology",
    href: "/about",
    icon: Code2,
  },
  {
    number: "03",
    title: "Make It Yours",
    description:
      "Customize templates, starter kits, and resources to fit your project and workflow.",
    cta: "View Products",
    href: "/products",
    icon: SlidersHorizontal,
  },
];

export function StatsSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#151616] py-28 sm:py-36 border-b border-neutral-900 selection:bg-[#EEF35F] selection:text-black">
      {/* Dynamic Ambient Glow & Concentric Rings Background */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        {/* Soft Radial Ambient Spotlight tailored to #151616 */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(38, 40, 40, 0.6) 0%, rgba(26, 28, 28, 0.4) 45%, rgba(21, 22, 22, 0.95) 85%, #151616 100%)",
          }}
        />

        {/* High-definition Concentric SVG Rings */}
        <svg
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[1600px] max-w-none opacity-80"
          viewBox="0 0 1600 1600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Mask to smoothly fade rings towards edges */}
            <radialGradient
              id="ringMaskGrad"
              cx="50%"
              cy="50%"
              r="50%"
              fx="50%"
              fy="50%"
            >
              <stop offset="0%" stopColor="#fff" stopOpacity="1" />
              <stop offset="45%" stopColor="#fff" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#fff" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
            <mask id="ringMask">
              <rect width="1600" height="1600" fill="url(#ringMaskGrad)" />
            </mask>
          </defs>

          <g mask="url(#ringMask)">
            {/* Concentric Circles */}
            <circle
              cx="800"
              cy="800"
              r="170"
              stroke="#ffffff"
              strokeWidth="1"
              strokeOpacity="0.09"
            />
            <circle
              cx="800"
              cy="800"
              r="290"
              stroke="#ffffff"
              strokeWidth="1"
              strokeOpacity="0.08"
            />
            <circle
              cx="800"
              cy="800"
              r="430"
              stroke="#ffffff"
              strokeWidth="1"
              strokeOpacity="0.07"
            />
            <circle
              cx="800"
              cy="800"
              r="580"
              stroke="#ffffff"
              strokeWidth="1"
              strokeOpacity="0.06"
            />
            <circle
              cx="800"
              cy="800"
              r="740"
              stroke="#ffffff"
              strokeWidth="1"
              strokeOpacity="0.05"
            />
            <circle
              cx="800"
              cy="800"
              r="910"
              stroke="#ffffff"
              strokeWidth="1"
              strokeOpacity="0.04"
            />
            <circle
              cx="800"
              cy="800"
              r="1090"
              stroke="#ffffff"
              strokeWidth="1"
              strokeOpacity="0.03"
            />
          </g>
        </svg>

        {/* Top and Bottom edge fade into #151616 */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#151616] via-transparent to-[#151616] opacity-90" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-16 sm:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-white font-heading leading-tight">
            Built for people who build
          </h2>

          <p className="mt-3.5 text-xs sm:text-sm text-neutral-400 font-normal leading-relaxed max-w-xl mx-auto">
            Practical digital products designed to help you start faster, build better, and customize with confidence.
          </p>
        </motion.div>

        {/* 3 Value Proposition Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {VALUE_PROPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: idx * 0.1, ease: "easeOut" }}
                whileHover={{ y: -6, transition: { duration: 0.2, ease: "easeOut" } }}
                className="group relative flex flex-col justify-between rounded-2xl sm:rounded-[22px] border border-white/10 bg-[#1c1d1d]/90 backdrop-blur-md p-8 sm:p-9 transition-colors duration-300 hover:border-white/25 hover:bg-[#202222]/95 hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_35px_rgba(238,243,95,0.08)] min-h-[300px] sm:min-h-[320px]"
              >
                {/* Top: Big Typographic Number & Icon */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="block text-5xl sm:text-[58px] font-normal tracking-tight text-white font-heading group-hover:text-[#EEF35F] transition-colors duration-300">
                      {item.number}
                    </span>
                    <div className="size-11 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#EEF35F] group-hover:scale-110 group-hover:bg-[#EEF35F]/10 group-hover:border-[#EEF35F]/20 transition-all">
                      <Icon className="size-5" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white font-heading group-hover:text-[#EEF35F] transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2.5 text-xs sm:text-[13px] text-neutral-300 font-normal leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Pill CTA Button */}
                <div className="mt-8 pt-4 border-t border-white/5">
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#252727] px-4 py-2 text-xs font-semibold text-neutral-200 transition-all duration-200 hover:border-[#EEF35F]/40 hover:bg-[#EEF35F] hover:text-black group-hover:border-white/20 active:scale-95 shadow-sm"
                  >
                    <span>{item.cta}</span>
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

export default StatsSection;
