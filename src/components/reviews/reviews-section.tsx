"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { Star, ShieldCheck, Sparkles, Heart } from "lucide-react";
import { ReviewItem } from "./drift-wall";

// Dynamically import DriftWall with SSR disabled
const DriftWall = dynamic(() => import("./drift-wall"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 size-full bg-black flex items-center justify-center">
      <div className="size-8 rounded-full border-2 border-[#EEF35F] border-t-transparent animate-spin" />
    </div>
  ),
});

const REVIEWS_DATA: ReviewItem[] = [
  {
    id: "1",
    name: "Christian Trummer",
    role: "CTO & Indie Maker",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    content:
      "We evaluated several competing asset marketplaces. DigiPro was clearly the easiest to integrate. We launched our SaaS boilerplate in minutes.",
    rating: 5,
  },
  {
    id: "2",
    name: "Cameron Perry",
    role: "Staff Site Reliability Engineer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    content:
      "I was waiting for the ball to drop, it was almost too easy. The UI kits and 3D icon sets just worked like absolute magic.",
    rating: 5,
  },
  {
    id: "3",
    name: "Neel Parecha",
    role: "Design Lead @ AuraLabs",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    content:
      "Our team speeds are 3x faster than before. The design tokens, variable fonts, and Next.js 16 components are crafted to perfection.",
    rating: 5,
  },
  {
    id: "4",
    name: "Elena Rostova",
    role: "Senior Product Designer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    content:
      "It took me 20 minutes to ship a high-converting landing page. Clean code, beautiful Figma files, and lifetime updates included.",
    rating: 5,
  },
  {
    id: "5",
    name: "Luis Zaldivar",
    role: "SRE Manager",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    content:
      "We got set up in literally 30 minutes. DigiPro has easily scaled our most complex workflows. Even our senior engineers love it.",
    rating: 5,
  },
  {
    id: "6",
    name: "Paul Guthrie",
    role: "Full-Stack Developer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    content:
      "We've invested heavily in design systems, and DigiPro is hands-down the most flexible and modern library we have ever purchased.",
    rating: 5,
  },
  {
    id: "7",
    name: "Alex Rivers",
    role: "Founder, SaaSkit",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    content:
      "The instant ZIP downloads and commercial licensing give us complete peace of mind. Truly built for modern creators and builders.",
    rating: 5,
  },
  {
    id: "8",
    name: "Sarah Jenkins",
    role: "Creative Director",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    content:
      "Astonishing attention to detail! The neon icons, 3D renders, and responsive web starters saved us hundreds of engineering hours.",
    rating: 5,
  },
  {
    id: "9",
    name: "Marcus Thorne",
    role: "3D Motion Artist",
    avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&auto=format&fit=crop&q=80",
    content:
      "The high-resolution textures and GLTF exports are flawless. It is rare to find digital assets with this level of craft.",
    rating: 5,
  },
  {
    id: "10",
    name: "Nicoletta Rossi",
    role: "Frontend Engineer",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    content:
      "Superb developer experience. React 19 and Tailwind 4 integration out of the box with zero configuration headache.",
    rating: 5,
  },
];

export function ReviewsSection() {
  return (
    <section className="relative w-full overflow-hidden bg-black py-20 sm:py-28 border-b border-neutral-900 selection:bg-[#EEF35F] selection:text-black">
      {/* Section Header */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center mb-8 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading text-white">
          Trusted by builders, designers, and founders
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 mt-2 max-w-xl mx-auto">
          See what world-class developers and creative teams have to say about our premium digital assets.
        </p>
      </div>

      {/* Drift Wall Container */}
      <div className="relative w-full h-[520px] sm:h-[600px] overflow-hidden">
        {/* Background 3D DriftWall Review Stream */}
        <div className="absolute inset-0 size-full">
          <DriftWall
            items={REVIEWS_DATA}
            columns={5}
            tileWidth={270}
            tileHeight={175}
            gap={18}
            tilt={14}
            turn={-12}
            perspective={1100}
            depth={80}
            speed={28}
            direction="up"
            variance={0.35}
            parallax={0.45}
            lift={45}
            fade={0.65}
            dim={0.55}
            overlayColor="#000000"
            radius={16}
            pauseOnHover={true}
          />
        </div>

        {/* Center Vignette & Fog Overlays */}
        <div className="absolute inset-0 bg-radial-[at_50%_50%] from-black/20 via-black/60 to-black pointer-events-none" />

        {/* Center Floating Rating Badge (Matching the uploaded design) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 px-4">
          <div className="pointer-events-auto group relative flex items-center gap-5 sm:gap-6 rounded-2xl border border-neutral-800/90 bg-black/90 backdrop-blur-xl px-7 py-4.5 sm:px-8 sm:py-5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9),0_0_30px_rgba(238,243,95,0.15)] transition-all hover:scale-105 hover:border-neutral-700">
            {/* Big Rating Number */}
            <div className="text-4xl sm:text-5xl font-black font-heading text-white tracking-tight">
              4.9
            </div>

            {/* Middle: Stars & Subtitle */}
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-4 sm:size-4.5 fill-[#EEF35F] text-[#EEF35F]"
                  />
                ))}
              </div>
              <span className="text-[11px] sm:text-xs font-mono font-medium text-neutral-400 mt-1 tracking-tight">
                Based on 2,800+ creator reviews
              </span>
            </div>

            {/* Right: Badge Emblem */}
            <div className="hidden sm:flex size-10 rounded-xl bg-[#EEF35F]/10 border border-[#EEF35F]/30 items-center justify-center text-[#EEF35F] shrink-0">
              <Sparkles className="size-5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReviewsSection;
