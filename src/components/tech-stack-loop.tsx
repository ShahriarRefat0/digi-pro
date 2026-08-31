"use client";

import * as React from "react";
import LogoLoop, { LogoItem } from "@/components/LogoLoop";
import {
  SiFigma,
  SiBlender,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiSupabase,
  SiStripe,
  SiVercel,
  SiGithub,
  SiWebflow,
  SiNodedotjs,
  SiThreedotjs,
  SiGraphql,
  SiStorybook,
  SiPrisma,
  SiPostgresql,
  SiMongodb,
  SiVite,
  SiAstro,
  SiSass,
} from "react-icons/si";
import { Sparkles } from "lucide-react";

export const DIGITAL_PRODUCT_LOGOS_ROW_1: LogoItem[] = [
  {
    node: (
      <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border bg-card/70 hover:bg-card text-foreground shadow-2xs transition-all hover:border-primary/50 group">
        <SiFigma className="size-5 text-[#F24E1E] transition-transform group-hover:scale-110" />
        <span className="text-xs font-bold tracking-tight">Figma Kits</span>
      </div>
    ),
    title: "Figma Design Kits",
    href: "https://figma.com",
  },
  {
    node: (
      <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border bg-card/70 hover:bg-card text-foreground shadow-2xs transition-all hover:border-primary/50 group">
        <SiNextdotjs className="size-5 text-foreground transition-transform group-hover:scale-110" />
        <span className="text-xs font-bold tracking-tight">
          Next.js 16 Starters
        </span>
      </div>
    ),
    title: "Next.js Boilerplates",
    href: "https://nextjs.org",
  },
  {
    node: (
      <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border bg-card/70 hover:bg-card text-foreground shadow-2xs transition-all hover:border-primary/50 group">
        <SiBlender className="size-5 text-[#EA7600] transition-transform group-hover:scale-110" />
        <span className="text-xs font-bold tracking-tight">
          Blender 3D Assets
        </span>
      </div>
    ),
    title: "Blender 3D Assets",
    href: "https://blender.org",
  },
  {
    node: (
      <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border bg-card/70 hover:bg-card text-foreground shadow-2xs transition-all hover:border-primary/50 group">
        <SiReact className="size-5 text-[#61DAFB] transition-transform group-hover:scale-110" />
        <span className="text-xs font-bold tracking-tight">
          React Components
        </span>
      </div>
    ),
    title: "React UI Kits",
    href: "https://react.dev",
  },
  {
    node: (
      <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border bg-card/70 hover:bg-card text-foreground shadow-2xs transition-all hover:border-primary/50 group">
        <SiTailwindcss className="size-5 text-[#06B6D4] transition-transform group-hover:scale-110" />
        <span className="text-xs font-bold tracking-tight">Tailwind CSS</span>
      </div>
    ),
    title: "Tailwind CSS Blocks",
    href: "https://tailwindcss.com",
  },
  {
    node: (
      <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border bg-card/70 hover:bg-card text-foreground shadow-2xs transition-all hover:border-primary/50 group">
        <SiFramer className="size-5 text-[#0055FF] transition-transform group-hover:scale-110" />
        <span className="text-xs font-bold tracking-tight">
          Framer Templates
        </span>
      </div>
    ),
    title: "Framer Templates",
    href: "https://framer.com",
  },
  {
    node: (
      <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border bg-card/70 hover:bg-card text-foreground shadow-2xs transition-all hover:border-primary/50 group">
        <SiTypescript className="size-5 text-[#3178C6] transition-transform group-hover:scale-110" />
        <span className="text-xs font-bold tracking-tight">TypeScript</span>
      </div>
    ),
    title: "TypeScript",
    href: "https://www.typescriptlang.org",
  },
  {
    node: (
      <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border bg-card/70 hover:bg-card text-foreground shadow-2xs transition-all hover:border-primary/50 group">
        <SiWebflow className="size-5 text-[#4353FF] transition-transform group-hover:scale-110" />
        <span className="text-xs font-bold tracking-tight">Webflow Sites</span>
      </div>
    ),
    title: "Webflow Sites",
    href: "https://webflow.com",
  },
  {
    node: (
      <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border bg-card/70 hover:bg-card text-foreground shadow-2xs transition-all hover:border-primary/50 group">
        <SiStorybook className="size-5 text-[#FF4785] transition-transform group-hover:scale-110" />
        <span className="text-xs font-bold tracking-tight">Storybook Kits</span>
      </div>
    ),
    title: "Storybook Kits",
    href: "https://storybook.js.org",
  },
  {
    node: (
      <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border bg-card/70 hover:bg-card text-foreground shadow-2xs transition-all hover:border-primary/50 group">
        <SiAstro className="size-5 text-[#FF5D01] transition-transform group-hover:scale-110" />
        <span className="text-xs font-bold tracking-tight">Astro Themes</span>
      </div>
    ),
    title: "Astro Themes",
    href: "https://astro.build",
  },
];

export const DIGITAL_PRODUCT_LOGOS_ROW_2: LogoItem[] = [
  {
    node: (
      <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border bg-card/70 hover:bg-card text-foreground shadow-2xs transition-all hover:border-primary/50 group">
        <SiThreedotjs className="size-5 text-foreground transition-transform group-hover:scale-110" />
        <span className="text-xs font-bold tracking-tight">
          Three.js 3D Web
        </span>
      </div>
    ),
    title: "Three.js Experiences",
    href: "https://threejs.org",
  },
  {
    node: (
      <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border bg-card/70 hover:bg-card text-foreground shadow-2xs transition-all hover:border-primary/50 group">
        <SiSupabase className="size-5 text-[#3ECF8E] transition-transform group-hover:scale-110" />
        <span className="text-xs font-bold tracking-tight">Supabase Auth</span>
      </div>
    ),
    title: "Supabase Starters",
    href: "https://supabase.com",
  },
  {
    node: (
      <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border bg-card/70 hover:bg-card text-foreground shadow-2xs transition-all hover:border-primary/50 group">
        <SiStripe className="size-5 text-[#635BFF] transition-transform group-hover:scale-110" />
        <span className="text-xs font-bold tracking-tight">
          Stripe Payments
        </span>
      </div>
    ),
    title: "Stripe Ready Templates",
    href: "https://stripe.com",
  },
  {
    node: (
      <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border bg-card/70 hover:bg-card text-foreground shadow-2xs transition-all hover:border-primary/50 group">
        <SiVercel className="size-5 text-foreground transition-transform group-hover:scale-110" />
        <span className="text-xs font-bold tracking-tight">
          1-Click Vercel Deploy
        </span>
      </div>
    ),
    title: "Vercel Deployable",
    href: "https://vercel.com",
  },
  {
    node: (
      <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border bg-card/70 hover:bg-card text-foreground shadow-2xs transition-all hover:border-primary/50 group">
        <SiPrisma className="size-5 text-[#2D3748] dark:text-white transition-transform group-hover:scale-110" />
        <span className="text-xs font-bold tracking-tight">Prisma ORM</span>
      </div>
    ),
    title: "Prisma Starters",
    href: "https://prisma.io",
  },
  {
    node: (
      <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border bg-card/70 hover:bg-card text-foreground shadow-2xs transition-all hover:border-primary/50 group">
        <SiNodedotjs className="size-5 text-[#5FA04E] transition-transform group-hover:scale-110" />
        <span className="text-xs font-bold tracking-tight">
          Node.js API Starters
        </span>
      </div>
    ),
    title: "Node.js Starters",
    href: "https://nodejs.org",
  },
  {
    node: (
      <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border bg-card/70 hover:bg-card text-foreground shadow-2xs transition-all hover:border-primary/50 group">
        <SiVite className="size-5 text-[#646CFF] transition-transform group-hover:scale-110" />
        <span className="text-xs font-bold tracking-tight">Vite Bundles</span>
      </div>
    ),
    title: "Vite Bundles",
    href: "https://vitejs.dev",
  },
  {
    node: (
      <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border bg-card/70 hover:bg-card text-foreground shadow-2xs transition-all hover:border-primary/50 group">
        <SiSass className="size-5 text-[#CC6699] transition-transform group-hover:scale-110" />
        <span className="text-xs font-bold tracking-tight">
          SCSS & CSS Kits
        </span>
      </div>
    ),
    title: "SCSS Kits",
    href: "https://sass-lang.com",
  },
  {
    node: (
      <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border bg-card/70 hover:bg-card text-foreground shadow-2xs transition-all hover:border-primary/50 group">
        <SiPostgresql className="size-5 text-[#4169E1] transition-transform group-hover:scale-110" />
        <span className="text-xs font-bold tracking-tight">Postgres DB</span>
      </div>
    ),
    title: "Postgres Database",
    href: "https://postgresql.org",
  },
  {
    node: (
      <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border bg-card/70 hover:bg-card text-foreground shadow-2xs transition-all hover:border-primary/50 group">
        <SiMongodb className="size-5 text-[#47A248] transition-transform group-hover:scale-110" />
        <span className="text-xs font-bold tracking-tight">
          MongoDB Schemas
        </span>
      </div>
    ),
    title: "MongoDB Schemas",
    href: "https://mongodb.com",
  },
  {
    node: (
      <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border bg-card/70 hover:bg-card text-foreground shadow-2xs transition-all hover:border-primary/50 group">
        <SiGithub className="size-5 text-foreground transition-transform group-hover:scale-110" />
        <span className="text-xs font-bold tracking-tight">GitHub Repos</span>
      </div>
    ),
    title: "GitHub Repositories",
    href: "https://github.com",
  },
  {
    node: (
      <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border bg-card/70 hover:bg-card text-foreground shadow-2xs transition-all hover:border-primary/50 group">
        <SiGraphql className="size-5 text-[#E10098] transition-transform group-hover:scale-110" />
        <span className="text-xs font-bold tracking-tight">
          GraphQL Schemas
        </span>
      </div>
    ),
    title: "GraphQL Schemas",
    href: "https://graphql.org",
  },
];

export function TechStackLoopSection() {
  return (
    <section className="relative overflow-hidden py-14 border-y border-border/40 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full border bg-background/80 px-3 py-1 text-xs font-semibold text-muted-foreground mb-2 shadow-2xs">
          <Sparkles className="size-3.5 text-primary" />
          <span>Supported Platforms & File Formats</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold font-heading text-foreground">
          Built for Industry-Standard Tools & Frameworks
        </h2>
        <p className="text-xs text-muted-foreground mt-1 max-w-md mx-auto">
          Every asset is built with clean layer hierarchies, typed component
          contracts, and seamless exports.
        </p>
      </div>

      <div className="space-y-4">
        {/* Row 1: Leftward infinite loop */}
        <LogoLoop
          logos={DIGITAL_PRODUCT_LOGOS_ROW_1}
          speed={45}
          direction="left"
          logoHeight={36}
          gap={24}
          pauseOnHover
          scaleOnHover
          fadeOut
          ariaLabel="Digital tools and frameworks row 1"
        />

        {/* Row 2: Rightward infinite loop */}
        <LogoLoop
          logos={DIGITAL_PRODUCT_LOGOS_ROW_2}
          speed={40}
          direction="right"
          logoHeight={36}
          gap={24}
          pauseOnHover
          scaleOnHover
          fadeOut
          ariaLabel="Digital tools and frameworks row 2"
        />
      </div>
    </section>
  );
}
export default TechStackLoopSection;
