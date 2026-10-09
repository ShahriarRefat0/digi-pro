"use client";

import * as React from "react";
import LogoLoop, { LogoItem } from "@/components/LogoLoop";
import {
  Baby,
  Heart,
  Sparkles,
  ShieldCheck,
  Truck,
  Droplet,
  Milk,
  Sun,
  Smile,
  Award,
  Clock,
  ThumbsUp,
} from "lucide-react";

// Helper to create category pill node
function createCategoryPill(
  icon: React.ReactNode,
  label: string,
  href: string = "/products"
): LogoItem {
  return {
    node: (
      <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border border-[#e2e8e3] bg-white text-[#29332D] shadow-xs hover:border-[#7C9473] hover:bg-[#FAF7F0] transition-all cursor-pointer select-none">
        <span className="flex size-4 items-center justify-center shrink-0">
          {icon}
        </span>
        <span className="text-[13px] font-medium text-[#29332D] tracking-tight whitespace-nowrap">
          {label}
        </span>
      </div>
    ),
    title: label,
    href,
  };
}

// Row 1: Baby & Mom Categories
export const CATEGORY_ROW_1: LogoItem[] = [
  createCategoryPill(<Baby className="size-4 text-[#7C9473]" />, "Newborn Essentials", "/products?category=Baby+Essentials"),
  createCategoryPill(<Heart className="size-4 text-[#F3E1DD]" />, "Maternal Care", "/products?category=Maternal+Care"),
  createCategoryPill(<Droplet className="size-4 text-[#7C9473]" />, "Baby Bath & Skincare", "/products?category=Baby+Essentials"),
  createCategoryPill(<Milk className="size-4 text-[#7C9473]" />, "Feeding & Nursing", "/products?category=Maternal+Care"),
  createCategoryPill(<Sun className="size-4 text-amber-500" />, "Diapering & Wipes", "/products?category=Baby+Essentials"),
  createCategoryPill(<Smile className="size-4 text-[#7C9473]" />, "Postpartum Wellness", "/products?category=Maternal+Care"),
  createCategoryPill(<Sparkles className="size-4 text-[#7C9473]" />, "Gentle Organic Oils", "/products?category=Baby+Essentials"),
];

// Row 2: Customer Trust & Service Indicators
export const CATEGORY_ROW_2: LogoItem[] = [
  createCategoryPill(<ShieldCheck className="size-4 text-[#7C9473]" />, "100% Dermatologist Safe", "/about"),
  createCategoryPill(<Truck className="size-4 text-[#7C9473]" />, "Cash on Delivery in BD", "/contact"),
  createCategoryPill(<Award className="size-4 text-amber-500" />, "Authentic Products Guarantee", "/about"),
  createCategoryPill(<Clock className="size-4 text-[#7C9473]" />, "Fast Nationwide Delivery", "/contact"),
  createCategoryPill(<ThumbsUp className="size-4 text-[#7C9473]" />, "25,000+ Happy Caregivers", "/about"),
  createCategoryPill(<Baby className="size-4 text-[#7C9473]" />, "Pediatrician Recommended", "/about"),
];

export function TechStackLoopSection() {
  return (
    <section className="relative overflow-hidden py-14 sm:py-20 bg-[#FAF7F0]/60 text-[#29332D] border-b border-[#e2e8e3]">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#29332D] font-heading">
          Trusted Care for Baby &amp; Mother
        </h2>
        <p className="text-xs sm:text-sm text-[#536358] mt-2 max-w-xl mx-auto">
          Explore curated categories &amp; dermatologist-tested products for your family
        </p>
      </div>

      {/* 2-Row Marquee Loop */}
      <div className="space-y-3.5">
        {/* Row 1: Leftward */}
        <LogoLoop
          logos={CATEGORY_ROW_1}
          speed={36}
          direction="left"
          logoHeight={38}
          gap={14}
          pauseOnHover
          fadeOut
          fadeOutColor="#FAF7F0"
          ariaLabel="Category loop row 1"
        />

        {/* Row 2: Rightward */}
        <LogoLoop
          logos={CATEGORY_ROW_2}
          speed={30}
          direction="right"
          logoHeight={38}
          gap={14}
          pauseOnHover
          fadeOut
          fadeOutColor="#FAF7F0"
          ariaLabel="Category loop row 2"
        />
      </div>
    </section>
  );
}

export default TechStackLoopSection;
