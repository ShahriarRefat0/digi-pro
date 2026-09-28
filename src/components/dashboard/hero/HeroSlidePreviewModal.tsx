"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Smartphone, Monitor, ArrowRight, Sparkles } from "lucide-react";
import { HeroSlide } from "@/types/hero";

interface HeroSlidePreviewModalProps {
  open: boolean;
  onClose: () => void;
  slide: Partial<HeroSlide>;
}

export function HeroSlidePreviewModal({
  open,
  onClose,
  slide,
}: HeroSlidePreviewModalProps) {
  const [device, setDevice] = React.useState<"desktop" | "mobile">("desktop");

  if (!open) return null;

  const currentImg =
    device === "desktop"
      ? slide.desktopImage?.url || slide.mobileImage?.url || "/images/placeholder.webp"
      : slide.mobileImage?.url || slide.desktopImage?.url || "/images/placeholder.webp";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F766E] bg-[#F0FDFA] border border-[#CCFBF1] px-2.5 py-1 rounded-full">
              Live Preview
            </span>
            <h3 className="text-base font-bold text-slate-900 font-heading truncate max-w-xs sm:max-w-md">
              {slide.title || "Untitled Slide"}
            </h3>
          </div>

          <div className="flex items-center gap-3">
            {/* Viewport Switcher */}
            <div className="flex items-center rounded-xl bg-slate-200/80 p-1 border border-slate-300/50">
              <button
                type="button"
                onClick={() => setDevice("desktop")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-semibold transition-all cursor-pointer ${
                  device === "desktop"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Monitor className="size-3.5" />
                <span className="hidden sm:inline">Desktop</span>
              </button>
              <button
                type="button"
                onClick={() => setDevice("mobile")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-semibold transition-all cursor-pointer ${
                  device === "mobile"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Smartphone className="size-3.5" />
                <span className="hidden sm:inline">Mobile</span>
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="size-8 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        {/* Modal Body - Preview Container */}
        <div className="p-6 overflow-y-auto bg-slate-100 flex justify-center items-center flex-1">
          <div
            className={`transition-all duration-300 overflow-hidden bg-white border border-slate-200 shadow-lg rounded-3xl ${
              device === "desktop" ? "w-full max-w-4xl" : "w-[375px]"
            }`}
          >
            {/* Mock Header */}
            <div className="px-4 py-3 border-b border-slate-100 bg-white flex items-center justify-between text-[11px] text-slate-600 font-mono">
              <div className="flex items-center gap-1.5">
                <div className="size-2.5 rounded-full bg-rose-400" />
                <div className="size-2.5 rounded-full bg-amber-400" />
                <div className="size-2.5 rounded-full bg-emerald-400" />
              </div>
              <span>careproff.com ({device})</span>
              <span>Light Mode</span>
            </div>

            {/* Hero Render Preview */}
            <div className="relative overflow-hidden bg-gradient-to-b from-[#F0FDFA]/40 via-white to-slate-50 p-6 sm:p-10">
              {device === "desktop" ? (
                /* Desktop Layout */
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[340px]">
                  <div className="lg:col-span-7 space-y-4">
                    {slide.eyebrow && (
                      <div className="inline-flex items-center gap-2 rounded-full border border-[#CCFBF1] bg-[#F0FDFA] px-3.5 py-1 text-xs font-semibold text-[#0F766E]">
                        <Sparkles className="size-3.5" />
                        <span>{slide.eyebrow}</span>
                      </div>
                    )}

                    <h1 className="text-3xl font-extrabold tracking-tight font-heading text-slate-900 leading-tight">
                      {slide.title || "Pure Care for Your Little One"}
                    </h1>

                    {slide.description && (
                      <p className="text-sm text-slate-600 leading-relaxed font-normal">
                        {slide.description}
                      </p>
                    )}

                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      {slide.primaryButton?.enabled && (
                        <span className="inline-flex items-center gap-2 rounded-xl bg-[#0F766E] px-5 py-2.5 text-xs font-bold text-white shadow-sm">
                          {slide.primaryButton.text || "Shop Now"}
                          <ArrowRight className="size-3.5" />
                        </span>
                      )}
                      {slide.secondaryButton?.enabled && (
                        <span className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-800 shadow-xs">
                          {slide.secondaryButton.text || "Learn More"}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="lg:col-span-5 relative aspect-4/3 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-xs">
                    {currentImg ? (
                      <Image
                        src={currentImg}
                        alt="Hero preview"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-slate-400">
                        No image uploaded
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* Mobile Layout */
                <div className="space-y-4 text-left">
                  <div className="relative aspect-16/10 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-xs">
                    {currentImg ? (
                      <Image
                        src={currentImg}
                        alt="Hero mobile preview"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-slate-400">
                        No image uploaded
                      </div>
                    )}
                  </div>

                  {slide.eyebrow && (
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-[#CCFBF1] bg-[#F0FDFA] px-3 py-0.5 text-[11px] font-semibold text-[#0F766E]">
                      <Sparkles className="size-3" />
                      <span>{slide.eyebrow}</span>
                    </div>
                  )}

                  <h2 className="text-xl font-extrabold tracking-tight font-heading text-slate-900 leading-snug">
                    {slide.title || "Pure Care for Your Little One"}
                  </h2>

                  {slide.description && (
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {slide.description}
                    </p>
                  )}

                  <div className="pt-2 space-y-2">
                    {slide.primaryButton?.enabled && (
                      <span className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F766E] px-4 py-2.5 text-xs font-bold text-white shadow-xs">
                        {slide.primaryButton.text || "Shop Now"}
                        <ArrowRight className="size-3.5" />
                      </span>
                    )}
                    {slide.secondaryButton?.enabled && (
                      <span className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-800 shadow-xs">
                        {slide.secondaryButton.text || "Learn More"}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
