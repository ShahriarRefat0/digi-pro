"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { HeroSlide } from "@/types/hero";

interface HeroCarouselProps {
  slides: HeroSlide[];
}

export function HeroCarousel({ slides }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);

  // Touch swipe handling for mobile
  const [touchStart, setTouchStart] = React.useState<number | null>(null);
  const [touchEnd, setTouchEnd] = React.useState<number | null>(null);

  // Respect prefers-reduced-motion
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const totalSlides = slides.length;

  const handleNext = React.useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const handlePrev = React.useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Autoplay timer (5.5 seconds), pauses on hover or reduced motion
  React.useEffect(() => {
    if (totalSlides <= 1 || isHovered || prefersReducedMotion) return;

    const interval = setInterval(() => {
      handleNext();
    }, 5500);

    return () => clearInterval(interval);
  }, [totalSlides, isHovered, prefersReducedMotion, handleNext]);

  // Touch handlers
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      handlePrev();
    } else if (e.key === "ArrowRight") {
      handleNext();
    }
  };

  if (totalSlides === 0) return null;

  const currentSlide = slides[currentIndex];

  const renderCtaButton = (
    btn?: { enabled: boolean; text: string; link: string },
    isPrimary: boolean = true
  ) => {
    if (!btn || !btn.enabled || !btn.text) return null;

    const isExternal = btn.link.startsWith("http://") || btn.link.startsWith("https://");

    const baseClasses = isPrimary
      ? "inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0F766E] px-6 py-3.5 text-xs sm:text-sm font-bold text-white transition-all duration-200 hover:bg-[#115E59] hover:scale-[1.02] active:scale-95 shadow-md shadow-teal-900/10 min-h-[48px]"
      : "inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-xs sm:text-sm font-semibold text-slate-800 transition-all duration-200 hover:bg-slate-50 hover:border-slate-300 hover:scale-[1.02] active:scale-95 shadow-xs min-h-[48px]";

    if (isExternal) {
      return (
        <a
          href={btn.link}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClasses}
        >
          <span>{btn.text}</span>
          {isPrimary && <ArrowRight className="size-4" />}
        </a>
      );
    }

    return (
      <Link href={btn.link} className={baseClasses}>
        <span>{btn.text}</span>
        {isPrimary && <ArrowRight className="size-4" />}
      </Link>
    );
  };

  return (
    <section
      role="region"
      aria-label="Homepage Featured Banner Carousel"
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className="relative min-h-[70vh] lg:min-h-[75vh] w-full bg-gradient-to-b from-[#F0FDFA]/30 via-slate-50 to-slate-50 border-b border-slate-200 overflow-hidden flex flex-col justify-center focus:outline-none"
    >
      {/* Background Soft Glow Accents */}
      <div className="absolute top-0 right-1/4 size-96 rounded-full bg-teal-100/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 size-80 rounded-full bg-emerald-100/30 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id || currentIndex}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: prefersReducedMotion ? 0.1 : 0.4, ease: "easeOut" }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          >
            {/* Desktop & Mobile Image composition */}
            <div className="lg:col-span-6 lg:order-2">
              {/* Desktop Image */}
              <div className="hidden lg:block relative aspect-16/10 sm:aspect-4/3 rounded-3xl overflow-hidden border border-slate-200/80 bg-white p-2 shadow-xl shadow-teal-900/5 group">
                <div className="relative size-full rounded-2xl overflow-hidden bg-slate-100">
                  <Image
                    src={currentSlide.desktopImage.url || currentSlide.mobileImage.url}
                    alt={currentSlide.title || "Hero banner"}
                    fill
                    priority={currentIndex === 0}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Mobile Image */}
              <div className="lg:hidden relative aspect-16/10 rounded-2xl overflow-hidden border border-slate-200 bg-white p-1.5 shadow-md">
                <div className="relative size-full rounded-xl overflow-hidden bg-slate-100">
                  <Image
                    src={currentSlide.mobileImage.url || currentSlide.desktopImage.url}
                    alt={currentSlide.title || "Hero banner"}
                    fill
                    priority={currentIndex === 0}
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Left Content Column */}
            <div className="lg:col-span-6 lg:order-1 space-y-5 text-left">
              {/* Eyebrow Badge */}
              {currentSlide.eyebrow && (
                <div className="inline-flex items-center gap-2 rounded-full border border-[#CCFBF1] bg-[#F0FDFA] px-4 py-1 text-xs font-semibold text-[#0F766E] shadow-2xs">
                  <Sparkles className="size-3.5 text-[#0F766E]" />
                  <span>{currentSlide.eyebrow}</span>
                </div>
              )}

              {/* Headline Title */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading text-slate-900 leading-[1.12]">
                {currentSlide.title}
              </h1>

              {/* Description */}
              {currentSlide.description && (
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl font-normal">
                  {currentSlide.description}
                </p>
              )}

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                {renderCtaButton(currentSlide.primaryButton, true)}
                {renderCtaButton(currentSlide.secondaryButton, false)}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation & Controls */}
        {totalSlides > 1 && (
          <div className="mt-10 flex items-center justify-between pt-4 border-t border-slate-200/60">
            {/* Pagination Dots */}
            <div className="flex items-center gap-2" role="tablist" aria-label="Hero slides">
              {slides.map((s, idx) => (
                <button
                  key={s.id || idx}
                  type="button"
                  role="tab"
                  aria-selected={currentIndex === idx}
                  aria-label={`Go to slide ${idx + 1}`}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === idx
                      ? "w-8 bg-[#0F766E]"
                      : "w-2.5 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous Hero Slide"
                onClick={handlePrev}
                className="size-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:text-[#0F766E] hover:border-teal-200 hover:bg-[#F0FDFA] transition-all cursor-pointer shadow-xs active:scale-95"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                aria-label="Next Hero Slide"
                onClick={handleNext}
                className="size-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:text-[#0F766E] hover:border-teal-200 hover:bg-[#F0FDFA] transition-all cursor-pointer shadow-xs active:scale-95"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
