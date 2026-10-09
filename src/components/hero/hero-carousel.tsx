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
      ? "inline-flex items-center justify-center gap-2 rounded-2xl bg-[#7C9473] px-6 py-3.5 text-xs sm:text-sm font-bold text-white transition-all duration-200 hover:bg-[#5A7052] hover:scale-[1.02] active:scale-95 shadow-md shadow-[#7C9473]/20 min-h-[48px]"
      : "inline-flex items-center justify-center gap-2 rounded-2xl border border-[#e2e8e3] bg-white px-6 py-3.5 text-xs sm:text-sm font-semibold text-[#29332D] transition-all duration-200 hover:bg-[#FAF7F0] hover:border-[#7C9473] hover:scale-[1.02] active:scale-95 shadow-xs min-h-[48px]";

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
      className="relative min-h-[65vh] lg:min-h-[70vh] w-full bg-gradient-to-b from-[#FAF7F0] via-white to-[#F0F4EE]/40 border-b border-[#e2e8e3] overflow-hidden flex flex-col justify-center focus:outline-none"
    >
      {/* Background Soft Glow Accents */}
      <div className="absolute top-0 right-1/4 size-96 rounded-full bg-[#FAF7F0] blur-3xl pointer-events-none opacity-80" />
      <div className="absolute bottom-0 left-10 size-80 rounded-full bg-[#F3E1DD]/30 blur-3xl pointer-events-none" />

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
              <div className="hidden lg:block relative aspect-16/10 sm:aspect-4/3 rounded-3xl overflow-hidden border border-[#e2e8e3] bg-white p-2 shadow-xl shadow-[#7C9473]/10 group">
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
              <div className="lg:hidden relative aspect-16/10 rounded-2xl overflow-hidden border border-[#e2e8e3] bg-white p-1.5 shadow-md">
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
                <div className="inline-flex items-center gap-2 rounded-full border border-[#7C9473]/30 bg-[#FAF7F0] px-4 py-1 text-xs font-semibold text-[#7C9473] shadow-2xs">
                  <Sparkles className="size-3.5 text-[#7C9473]" />
                  <span>{currentSlide.eyebrow}</span>
                </div>
              )}

              {/* Headline Title */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading text-[#29332D] leading-[1.12]">
                {currentSlide.title}
              </h1>

              {/* Description */}
              {currentSlide.description && (
                <p className="text-sm sm:text-base text-[#536358] leading-relaxed max-w-xl font-normal">
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
          <div className="mt-10 flex items-center justify-between pt-4 border-t border-[#e2e8e3]">
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
                      ? "w-8 bg-[#7C9473]"
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
                className="size-10 rounded-full border border-[#e2e8e3] bg-white flex items-center justify-center text-[#29332D] hover:text-[#7C9473] hover:border-[#7C9473] hover:bg-[#FAF7F0] transition-all cursor-pointer shadow-xs active:scale-95"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                aria-label="Next Hero Slide"
                onClick={handleNext}
                className="size-10 rounded-full border border-[#e2e8e3] bg-white flex items-center justify-center text-[#29332D] hover:text-[#7C9473] hover:border-[#7C9473] hover:bg-[#FAF7F0] transition-all cursor-pointer shadow-xs active:scale-95"
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
