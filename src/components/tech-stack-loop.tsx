"use client";

import * as React from "react";
import LogoLoop, { LogoItem } from "@/components/LogoLoop";
import {
  BookOpen,
  Image as ImageIcon,
  Palette,
  Box,
  Sparkles,
  MessageSquare,
  TrendingUp,
  Layout,
  Mic,
  Dumbbell,
  Rocket,
  Gamepad2,
  Disc,
  GraduationCap,
  Video,
  Feather,
  Dices
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

// Row 1: Notion, Textures, Procreate, 3D Models, Hypnosis, Manga, Investing, Mockups, Music
export const CATEGORY_ROW_1: LogoItem[] = [
  createCategoryPill(
    <span className="text-xs font-black font-mono border border-white/60 px-1 rounded-[3px] text-white">N</span>,
    "Notion Templates"
  ),
  createCategoryPill(<ImageIcon className="size-4 text-[#38BDF8]" />, "Textures"),
  createCategoryPill(<Palette className="size-4 text-[#F472B6]" />, "Procreate"),
  createCategoryPill(<Box className="size-4 text-[#FB923C]" />, "3D Models"),
  createCategoryPill(<Sparkles className="size-4 text-[#C084FC]" />, "Hypnosis"),
  createCategoryPill(<MessageSquare className="size-4 text-[#FB7185]" />, "Manga"),
  createCategoryPill(<TrendingUp className="size-4 text-[#4ADE80]" />, "Investing"),
  createCategoryPill(<Layout className="size-4 text-[#60A5FA]" />, "Mockups"),
  createCategoryPill(<Mic className="size-4 text-[#F43F5E]" />, "Music"),
  createCategoryPill(<Palette className="size-4 text-[#A78BFA]" />, "Digital Art"),
  createCategoryPill(<Sparkles className="size-4 text-[#FDE047]" />, "Animation"),
];

// Row 2: Fitness, Sci-Fi, VRChat, Ableton, Certification Exams, VJ Loops, Workout, Poetry, Board Games
export const CATEGORY_ROW_2: LogoItem[] = [
  createCategoryPill(<Dumbbell className="size-4 text-[#22C55E]" />, "Fitness"),
  createCategoryPill(<Rocket className="size-4 text-[#FBBF24]" />, "Sci-Fi"),
  createCategoryPill(<Gamepad2 className="size-4 text-[#A855F7]" />, "VRChat"),
  createCategoryPill(<Disc className="size-4 text-[#F97316]" />, "Ableton"),
  createCategoryPill(<GraduationCap className="size-4 text-[#60A5FA]" />, "Certification Exams"),
  createCategoryPill(<Video className="size-4 text-[#2DD4BF]" />, "VJ Loops"),
  createCategoryPill(<Dumbbell className="size-4 text-[#EAB308]" />, "Workout Program"),
  createCategoryPill(<Feather className="size-4 text-[#C084FC]" />, "Poetry"),
  createCategoryPill(<Dices className="size-4 text-[#38BDF8]" />, "Board Games"),
  createCategoryPill(<Rocket className="size-4 text-[#EC4899]" />, "Game Assets"),
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

      {/* 5-Row Marquee Loop */}
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
