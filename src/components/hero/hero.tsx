"use client"

import * as React from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import {
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
    <section className="relative min-h-[82vh] lg:min-h-[88vh] w-full flex items-center justify-center overflow-hidden bg-black text-white border-b border-neutral-900 selection:bg-[#EEF35F] selection:text-black">
      {/* 3D Antigravity Particle Background */}
      <Antigravity
        count={320}
        color="#EEF35F"
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
        {/* Main Heading */}
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl leading-[1.08] text-white max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700">
          Digital assets to accelerate your{" "}
          <span className="bg-gradient-to-r from-white via-[#EEF35F] to-[#EEF35F] bg-clip-text text-transparent underline decoration-[#EEF35F]/40 decoration-wavy underline-offset-8">
            next big idea.
          </span>
        </h1>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-5 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <Link
            href="/products"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#EEF35F] px-8 text-sm font-bold text-black transition-all hover:bg-[#e5ea4e] hover:scale-105 active:scale-95 shadow-lg shadow-[#EEF35F]/20"
          >
            <span>Browse Marketplace</span>
          </Link>

          <Link
            href="/dashboard/products/new"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-neutral-800 bg-neutral-950/80 px-8 text-sm font-semibold text-white transition-all hover:bg-neutral-900 hover:border-neutral-700 hover:scale-105 active:scale-95 backdrop-blur-sm"
          >
            <span>Start Selling</span>
            <ArrowRight className="size-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero
