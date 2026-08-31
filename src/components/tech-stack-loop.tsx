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
  Dices,
  Code2,
  Camera,
  Scissors,
  Music,
  Folder,
  Leaf,
  PenTool,
  Globe,
  ShoppingCart,
  ShieldCheck,
  Laptop,
  Headphones,
  Brain,
  Briefcase,
  PieChart,
  Play,
  Coins,
  Cloud,
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

// Row 3: Programming, KDP Interior, Stock Photos, Printables, Jazz, Windows, Ebook, Photography, Sustainability
export const CATEGORY_ROW_3: LogoItem[] = [
  createCategoryPill(<Code2 className="size-4 text-[#F97316]" />, "Programming"),
  createCategoryPill(<BookOpen className="size-4 text-[#34D399]" />, "KDP Interior"),
  createCategoryPill(<Camera className="size-4 text-[#FACC15]" />, "Stock Photos"),
  createCategoryPill(<Scissors className="size-4 text-[#EC4899]" />, "Printables"),
  createCategoryPill(<Music className="size-4 text-[#38BDF8]" />, "Jazz"),
  createCategoryPill(<Folder className="size-4 text-[#FB923C]" />, "Windows"),
  createCategoryPill(<BookOpen className="size-4 text-[#818CF8]" />, "Ebook"),
  createCategoryPill(<Camera className="size-4 text-[#FBBF24]" />, "Photography"),
  createCategoryPill(<Leaf className="size-4 text-[#4ADE80]" />, "Sustainability"),
  createCategoryPill(<Code2 className="size-4 text-[#06B6D4]" />, "Developer Tools"),
];

// Row 4: After Effects, Photoshop, Illustrator, UI Kits, Code Snippets, Website Themes, eCommerce, Cyber Security, Laptop & Gear
export const CATEGORY_ROW_4: LogoItem[] = [
  createCategoryPill(
    <span className="text-[10px] font-black text-[#C084FC] border border-[#C084FC]/50 px-1 py-0.5 rounded leading-none">Ae</span>,
    "After Effects"
  ),
  createCategoryPill(
    <span className="text-[10px] font-black text-[#38BDF8] border border-[#38BDF8]/50 px-1 py-0.5 rounded leading-none">Ps</span>,
    "Photoshop"
  ),
  createCategoryPill(
    <span className="text-[10px] font-black text-[#FB923C] border border-[#FB923C]/50 px-1 py-0.5 rounded leading-none">Ai</span>,
    "Illustrator"
  ),
  createCategoryPill(<Layout className="size-4 text-[#34D399]" />, "UI Kits"),
  createCategoryPill(<Code2 className="size-4 text-[#F472B6]" />, "Code Snippets"),
  createCategoryPill(<Globe className="size-4 text-[#60A5FA]" />, "Website Themes"),
  createCategoryPill(<ShoppingCart className="size-4 text-[#FACC15]" />, "eCommerce"),
  createCategoryPill(<ShieldCheck className="size-4 text-[#818CF8]" />, "Cyber Security"),
  createCategoryPill(<Laptop className="size-4 text-[#F472B6]" />, "Laptop & Gear"),
  createCategoryPill(<PenTool className="size-4 text-[#2DD4BF]" />, "Figma Plugins"),
];

// Row 5: Ebooks, Audiobooks, Self Improvement, Design Assets, Business, Marketing, YouTube Resources, Finance, Cloud Services
export const CATEGORY_ROW_5: LogoItem[] = [
  createCategoryPill(<BookOpen className="size-4 text-[#2DD4BF]" />, "Ebooks"),
  createCategoryPill(<Headphones className="size-4 text-[#FACC15]" />, "Audiobooks"),
  createCategoryPill(<Brain className="size-4 text-[#EC4899]" />, "Self Improvement"),
  createCategoryPill(<Palette className="size-4 text-[#38BDF8]" />, "Design Assets"),
  createCategoryPill(<Briefcase className="size-4 text-[#34D399]" />, "Business"),
  createCategoryPill(<PieChart className="size-4 text-[#F97316]" />, "Marketing"),
  createCategoryPill(<Play className="size-4 text-[#A855F7]" />, "YouTube Resources"),
  createCategoryPill(<Coins className="size-4 text-[#FACC15]" />, "Finance"),
  createCategoryPill(<Cloud className="size-4 text-[#38BDF8]" />, "Cloud Services"),
  createCategoryPill(<TrendingUp className="size-4 text-[#4ADE80]" />, "Crypto & Web3"),
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

        {/* Row 3: Leftward */}
        <LogoLoop
          logos={CATEGORY_ROW_3}
          speed={35}
          direction="left"
          logoHeight={38}
          gap={14}
          pauseOnHover
          fadeOut
          fadeOutColor="#000000"
          ariaLabel="Category loop row 3"
        />

        {/* Row 4: Rightward */}
        <LogoLoop
          logos={CATEGORY_ROW_4}
          speed={29}
          direction="right"
          logoHeight={38}
          gap={14}
          pauseOnHover
          fadeOut
          fadeOutColor="#000000"
          ariaLabel="Category loop row 4"
        />

        {/* Row 5: Leftward */}
        <LogoLoop
          logos={CATEGORY_ROW_5}
          speed={33}
          direction="left"
          logoHeight={38}
          gap={14}
          pauseOnHover
          fadeOut
          fadeOutColor="#000000"
          ariaLabel="Category loop row 5"
        />
      </div>
    </section>
  );
}

export default TechStackLoopSection;
