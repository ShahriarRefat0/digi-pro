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
  loading: () => <div className="absolute inset-0 size-full bg-slate-50" />,
})

export function Hero() {
  return (
    <section className="relative min-h-[82vh] lg:min-h-[88vh] w-full flex items-center justify-center overflow-hidden bg-slate-50 text-slate-900 border-b border-slate-200 selection:bg-teal-100 selection:text-teal-900">
      {/* 3D Antigravity Particle Background */}
      <Antigravity
        count={320}
        color="#0F766E"
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
      <div className="absolute inset-0 bg-radial-[at_50%_50%] from-slate-50/40 via-slate-50/70 to-slate-50 pointer-events-none" />

      {/* Hero Foreground Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32 text-center flex flex-col items-center">
        {/* Main Heading */}
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl leading-[1.08] text-slate-900 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700">
          Digital products to elevate your{" "}
          <span className="bg-gradient-to-r from-slate-900 via-[#0F766E] to-[#0F766E] bg-clip-text text-transparent underline decoration-[#0F766E]/40 decoration-wavy underline-offset-8">
            maternal &amp; baby care.
          </span>
        </h1>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-5 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <Link
            href="/products"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#0F766E] px-8 text-sm font-bold text-white transition-all hover:bg-[#115E59] hover:scale-105 active:scale-95 shadow-lg shadow-teal-900/10"
          >
            <span>Browse Products</span>
          </Link>

          <Link
            href="/products"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white/90 px-8 text-sm font-semibold text-slate-800 transition-all hover:bg-slate-100 hover:border-slate-400 hover:scale-105 active:scale-95 backdrop-blur-sm shadow-xs"
          >
            <span>Explore Collections</span>
            <ArrowRight className="size-4 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero
