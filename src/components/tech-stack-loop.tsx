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
      <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border border-slate-200 bg-white text-slate-800 shadow-xs hover:border-teal-300 hover:bg-teal-50/40 transition-all cursor-pointer select-none">
        <span className="flex size-4 items-center justify-center shrink-0">
          {icon}
        </span>
        <span className="text-[13px] font-medium text-slate-800 tracking-tight whitespace-nowrap">
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
  createCategoryPill(<Globe2 className="size-4 text-[#0F766E]" />, "Web Templates", "/products?category=web-templates"),
  createCategoryPill(<PanelsTopLeft className="size-4 text-[#6366F1]" />, "UI Kits", "/products?category=ui-kits"),
  createCategoryPill(<Rocket className="size-4 text-[#10B981]" />, "SaaS Starters", "/products?category=saas-starters"),
  createCategoryPill(<Code2 className="size-4 text-[#F59E0B]" />, "Developer Tools", "/products?category=developer-tools"),
  createCategoryPill(<ShoppingCart className="size-4 text-[#F97316]" />, "E-commerce", "/products?category=e-commerce"),
  createCategoryPill(<Blocks className="size-4 text-[#06B6D4]" />, "Web Components", "/products?category=web-components"),
  createCategoryPill(<Sparkles className="size-4 text-[#0F766E]" />, "AI Tools", "/products?category=ai-tools"),
  createCategoryPill(<Palette className="size-4 text-[#EC4899]" />, "Design Assets", "/products?category=design-assets"),
];

// Row 2: 3D Assets, Motion & Animation, Mobile UI, Productivity, E-books & Guides, Digital Assets
export const CATEGORY_ROW_2: LogoItem[] = [
  createCategoryPill(<Box className="size-4 text-[#8B5CF6]" />, "3D Assets", "/products?category=3d-assets"),
  createCategoryPill(<Clapperboard className="size-4 text-[#D946EF]" />, "Motion & Animation", "/products?category=motion-animation"),
  createCategoryPill(<Smartphone className="size-4 text-[#14B8A6]" />, "Mobile UI", "/products?category=mobile-ui"),
  createCategoryPill(<Zap className="size-4 text-[#84CC16]" />, "Productivity", "/products?category=productivity"),
  createCategoryPill(<BookOpen className="size-4 text-[#0284C7]" />, "E-books & Guides", "/products?category=ebooks-guides"),
  createCategoryPill(<Layers3 className="size-4 text-[#A855F7]" />, "Digital Assets", "/products?category=digital-assets"),
  createCategoryPill(<Globe2 className="size-4 text-[#0F766E]" />, "Web Templates", "/products?category=web-templates"),
  createCategoryPill(<PanelsTopLeft className="size-4 text-[#6366F1]" />, "UI Kits", "/products?category=ui-kits"),
];

export function TechStackLoopSection() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-50 text-slate-900 border-b border-slate-200">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 font-heading">
          Unlimited possibilities
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-xl mx-auto">
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
          fadeOutColor="#FAFAF8"
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
          fadeOutColor="#FAFAF8"
          ariaLabel="Category loop row 2"
        />
      </div>
    </section>
  );
}

export default TechStackLoopSection;
