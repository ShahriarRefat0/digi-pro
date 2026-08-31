"use client"

import * as React from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
} from "lucide-react"

// Dynamically import Antigravity 3D canvas with SSR disabled
const Antigravity = dynamic(() => import("./antigravity"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 size-full bg-black" />,
})

export function Hero() {
  return (
    <section className="relative min-h-[82vh] lg:min-h-[88vh] w-full flex items-center justify-center overflow-hidden bg-black text-white border-b border-neutral-900">
      {/* 3D Antigravity Particle Background */}
      <Antigravity
        count={320}
        color="#FF90E8"
        particleShape="capsule"
        particleSize={1.8}
        magnetRadius={14}
        ringRadius={8}
        waveSpeed={0.5}
        waveAmplitude={1.2}
        pulseSpeed={2.5}
        autoAnimate={true}
      />

      {/* Subtle radial gradient overlay for text readability */}
      <div className="absolute inset-0 bg-radial-[at_50%_50%] from-black/40 via-black/70 to-black pointer-events-none" />

      {/* Hero Foreground Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32 text-center flex flex-col items-center">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-950/90 px-4 py-1.5 text-xs font-semibold text-neutral-200 mb-8 backdrop-blur-md shadow-lg shadow-black/50 animate-in fade-in slide-in-from-bottom-3 duration-500">
          <Sparkles className="size-3.5 text-[#FF90E8]" />
          <span>Curated marketplace for designers & developers</span>
          <span className="flex size-1.5 rounded-full bg-[#FF90E8] animate-pulse" />
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl leading-[1.08] text-white max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700">
          Digital assets to accelerate your{" "}
          <span className="bg-gradient-to-r from-white via-[#FF90E8] to-[#FF90E8] bg-clip-text text-transparent underline decoration-[#FF90E8]/40 decoration-wavy underline-offset-8">
            next big idea.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-7 max-w-2xl text-base sm:text-lg lg:text-xl text-neutral-400 leading-relaxed animate-in fade-in slide-in-from-bottom-5 duration-700">
          Explore high-performance UI kits, 3D icon sets, custom fonts, and
          Next.js starters handcrafted with precision for modern creators.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-5 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <Link
            href="/products"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#FF90E8] px-8 text-sm font-bold text-black transition-all hover:bg-[#ff7be3] hover:scale-105 active:scale-95 shadow-lg shadow-[#FF90E8]/20"
          >
            <Sparkles className="size-4" />
            <span>Browse Marketplace</span>
          </Link>

          <Link
            href="/admin/products"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-neutral-800 bg-neutral-950/80 px-8 text-sm font-semibold text-white transition-all hover:bg-neutral-900 hover:border-neutral-700 hover:scale-105 active:scale-95 backdrop-blur-sm"
          >
            <span>Start Selling</span>
            <ArrowRight className="size-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Quick Proof Badges */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-medium text-neutral-400 border-t border-neutral-800/60 pt-8 w-full max-w-2xl animate-in fade-in duration-1000">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-4 text-[#FF90E8]" />
            <span>Instant Digital Delivery</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-[#FF90E8]" />
            <span>Commercial License</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="size-4 text-[#FF90E8]" />
            <span>Lifetime Asset Updates</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
