"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface StatCardProps {
  value: string;
  description: string;
  href: string;
}

const STATS_DATA: StatCardProps[] = [
  {
    value: "90%",
    description: "reduction in deployment time",
    href: "/products",
  },
  {
    value: "99.99%",
    description: "reliability",
    href: "/services",
  },
  {
    value: "86%",
    description: "faster than VPN",
    href: "/pricing",
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
              <rect
                width="1600"
                height="1600"
                fill="url(#ringMaskGrad)"
              />
            </mask>
          </defs>

          <g mask="url(#ringMask)">
            {/* Concentric Circle 1 - Innermost */}
            <circle
              cx="800"
              cy="800"
              r="170"
              stroke="#ffffff"
              strokeWidth="1"
              strokeOpacity="0.09"
            />
            {/* Concentric Circle 2 */}
            <circle
              cx="800"
              cy="800"
              r="290"
              stroke="#ffffff"
              strokeWidth="1"
              strokeOpacity="0.08"
            />
            {/* Concentric Circle 3 */}
            <circle
              cx="800"
              cy="800"
              r="430"
              stroke="#ffffff"
              strokeWidth="1"
              strokeOpacity="0.07"
            />
            {/* Concentric Circle 4 */}
            <circle
              cx="800"
              cy="800"
              r="580"
              stroke="#ffffff"
              strokeWidth="1"
              strokeOpacity="0.06"
            />
            {/* Concentric Circle 5 */}
            <circle
              cx="800"
              cy="800"
              r="740"
              stroke="#ffffff"
              strokeWidth="1"
              strokeOpacity="0.05"
            />
            {/* Concentric Circle 6 */}
            <circle
              cx="800"
              cy="800"
              r="910"
              stroke="#ffffff"
              strokeWidth="1"
              strokeOpacity="0.04"
            />
            {/* Concentric Circle 7 - Outermost */}
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
        {/* Section Heading matching screenshot */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-normal tracking-tight text-white font-heading leading-tight">
            Powerful security
            <br />
            deployed in minutes
          </h2>
        </div>

        {/* 3 Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {STATS_DATA.map((item, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col justify-between rounded-2xl sm:rounded-[20px] border border-white/10 bg-[#1c1d1d]/85 backdrop-blur-sm p-8 sm:p-9 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-[#202222]/90 hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_35px_rgba(238,243,95,0.06)] min-h-[250px] sm:min-h-[280px]"
            >
              {/* Top Big Metric Number */}
              <div>
                <span className="block text-5xl sm:text-[58px] font-normal tracking-tight text-white font-heading">
                  {item.value}
                </span>

                {/* Subtext description */}
                <p className="mt-3.5 text-xs sm:text-[13px] text-neutral-300 font-normal leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Bottom Pill CTA Button */}
              <div className="mt-8 pt-2">
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-[#252727] px-4 py-1.5 text-xs font-medium text-neutral-200 transition-all duration-200 hover:border-white/25 hover:bg-[#2c2f2f] hover:text-white group-hover:border-white/20 active:scale-95"
                >
                  <span>Learn more</span>
                  <ChevronRight className="size-3 text-neutral-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-white" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsSection;
