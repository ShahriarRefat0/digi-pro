"use client";

import * as React from "react";
import LogoLoop, { LogoItem } from "@/components/LogoLoop";
import {
  Globe2,
  PanelsTopLeft,
  Rocket,
  Code2,
  ShoppingCart,
  Blocks,
  Sparkles,
  Palette,
  Box,
  Clapperboard,
  Smartphone,
  Zap,
  BookOpen,
  Layers3,
} from "lucide-react";

// Helper to create category pill node
function createCategoryPill(
  icon: React.ReactNode,
  label: string,
  href: string = "/products"
): LogoItem {
  return {
    node: (
      <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border border-neutral-800 bg-neutral-950 text-white shadow-xs hover:border-neutral-600 hover:bg-neutral-900 transition-all cursor-pointer select-none">
        <span className="flex size-4 items-center justify-center shrink-0">
          {icon}
        </span>
        <span className="text-[13px] font-medium text-white tracking-tight whitespace-nowrap">
          {label}
        </span>
      </div>
    ),
    title: label,
    href,
  };
}

// Row 1: Web Templates, UI Kits, SaaS Starters, Developer Tools, E-commerce, Web Components, AI Tools, Design Assets
export const CATEGORY_ROW_1: LogoItem[] = [
  createCategoryPill(<Globe2 className="size-4 text-[#38BDF8]" />, "Web Templates", "/products?category=web-templates"),
  createCategoryPill(<PanelsTopLeft className="size-4 text-[#818CF8]" />, "UI Kits", "/products?category=ui-kits"),
  createCategoryPill(<Rocket className="size-4 text-[#34D399]" />, "SaaS Starters", "/products?category=saas-starters"),
  createCategoryPill(<Code2 className="size-4 text-[#FBBF24]" />, "Developer Tools", "/products?category=developer-tools"),
  createCategoryPill(<ShoppingCart className="size-4 text-[#FB923C]" />, "E-commerce", "/products?category=e-commerce"),
  createCategoryPill(<Blocks className="size-4 text-[#22D3EE]" />, "Web Components", "/products?category=web-components"),
  createCategoryPill(<Sparkles className="size-4 text-[#EEF35F]" />, "AI Tools", "/products?category=ai-tools"),
  createCategoryPill(<Palette className="size-4 text-[#F472B6]" />, "Design Assets", "/products?category=design-assets"),
];

// Row 2: 3D Assets, Motion & Animation, Mobile UI, Productivity, E-books & Guides, Digital Assets
export const CATEGORY_ROW_2: LogoItem[] = [
  createCategoryPill(<Box className="size-4 text-[#A78BFA]" />, "3D Assets", "/products?category=3d-assets"),
  createCategoryPill(<Clapperboard className="size-4 text-[#E879F9]" />, "Motion & Animation", "/products?category=motion-animation"),
  createCategoryPill(<Smartphone className="size-4 text-[#2DD4BF]" />, "Mobile UI", "/products?category=mobile-ui"),
  createCategoryPill(<Zap className="size-4 text-[#A3E635]" />, "Productivity", "/products?category=productivity"),
  createCategoryPill(<BookOpen className="size-4 text-[#38BDF8]" />, "E-books & Guides", "/products?category=ebooks-guides"),
  createCategoryPill(<Layers3 className="size-4 text-[#C084FC]" />, "Digital Assets", "/products?category=digital-assets"),
  createCategoryPill(<Globe2 className="size-4 text-[#38BDF8]" />, "Web Templates", "/products?category=web-templates"),
  createCategoryPill(<PanelsTopLeft className="size-4 text-[#818CF8]" />, "UI Kits", "/products?category=ui-kits"),
];

export function TechStackLoopSection() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24 bg-black text-white border-b border-neutral-900">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white font-heading">
          Unlimited possibilities
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 mt-2 max-w-xl mx-auto">
          Discover the best-selling products and services
        </p>
      </div>

      {/* 2-Row Marquee Loop */}
      <div className="space-y-3.5">
        {/* Row 1: Leftward */}
        <LogoLoop
          logos={CATEGORY_ROW_1}
          speed={38}
          direction="left"
          logoHeight={38}
          gap={14}
          pauseOnHover
          fadeOut
          fadeOutColor="#000000"
          ariaLabel="Category loop row 1"
        />

        {/* Row 2: Rightward */}
        <LogoLoop
          logos={CATEGORY_ROW_2}
          speed={32}
          direction="right"
          logoHeight={38}
          gap={14}
          pauseOnHover
          fadeOut
          fadeOutColor="#000000"
          ariaLabel="Category loop row 2"
        />
      </div>
    </section>
  );
}

export default TechStackLoopSection;
