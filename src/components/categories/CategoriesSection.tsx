"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  Globe2,
  PanelsTopLeft,
  Rocket,
  Code2,
  ShoppingCart,
  Blocks,
  Sparkles,
  Palette,
  Box,
  Clapperboard,
  Smartphone,
  Zap,
  BookOpen,
  Layers3,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { DIGITAL_CATEGORIES, DigitalCategory } from "@/lib/categories";

const ICON_MAP = {
  Globe2,
  PanelsTopLeft,
  Rocket,
  Code2,
  ShoppingCart,
  Blocks,
  Sparkles,
  Palette,
  Box,
  Clapperboard,
  Smartphone,
  Zap,
  BookOpen,
  Layers3,
};

export function CategoriesSection() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(4);
  const [direction, setDirection] = React.useState<"left" | "right">("right");
  const [isPaused, setIsPaused] = React.useState(false);

  // Responsive items count per view
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalCategories = DIGITAL_CATEGORIES.length;
  const maxIndex = Math.max(0, Math.ceil(totalCategories / itemsPerPage) - 1);

  // Ensure index remains valid when resizing
  React.useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [itemsPerPage, maxIndex, currentIndex]);

  const handleNext = React.useCallback(() => {
    setDirection("right");
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const handlePrev = React.useCallback(() => {
    setDirection("left");
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Subtle auto-scroll (paused on hover)
  React.useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, handleNext]);

  // Calculate visible items for current page
  const visibleCategories = React.useMemo(() => {
    const start = currentIndex * itemsPerPage;
    return DIGITAL_CATEGORIES.slice(start, start + itemsPerPage);
  }, [currentIndex, itemsPerPage]);

  return (
    <section
      className="py-16 sm:py-24 border-b border-neutral-900 bg-black selection:bg-[#EEF35F] selection:text-black overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-heading text-white">
              Explore Digital Products
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-neutral-400 max-w-xl font-normal">
              Discover ready-to-use digital products designed to help you build, design, and create faster.
            </p>
          </div>

          {/* Right Action: View All Link + Carousel Buttons */}
          <div className="flex items-center gap-4 sm:gap-6 self-start md:self-end">
            <Link
              href="/products"
              className="text-xs font-semibold text-neutral-400 hover:text-white transition-colors inline-flex items-center gap-1.5 group"
            >
              <span>View all categories</span>
              <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous categories"
                className="size-8 rounded-full border border-neutral-800 bg-neutral-950 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-600 hover:bg-neutral-900 transition-colors active:scale-95 cursor-pointer"
              >
                <ArrowLeft className="size-4" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next categories"
                className="size-8 rounded-full border border-neutral-800 bg-neutral-950 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-600 hover:bg-neutral-900 transition-colors active:scale-95 cursor-pointer"
              >
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Content */}
        <div className="relative min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{
                opacity: 0,
                x: direction === "right" ? 24 : -24,
              }}
              animate={{ opacity: 1, x: 0 }}
              exit={{
                opacity: 0,
                x: direction === "right" ? -24 : 24,
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              {visibleCategories.map((cat, idx) => {
                const Icon = ICON_MAP[cat.icon] || Globe2;
                return (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: idx * 0.05 }}
                    whileHover={{ y: -5, transition: { duration: 0.2, ease: "easeOut" } }}
                    className="h-full"
                  >
                    <Link
                      href={`/products?category=${cat.slug}`}
                      className="group flex flex-col justify-between h-full rounded-2xl border border-neutral-800 bg-neutral-950 p-6 transition-colors duration-200 hover:border-neutral-700 hover:bg-neutral-900/80 hover:shadow-xl hover:shadow-black/70 relative"
                    >
                      <div>
                        {/* Colored Icon Badge */}
                        <div
                          className={`size-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 border ${cat.color}`}
                        >
                          <Icon className="size-6" />
                        </div>

                        {/* Title & Product Count */}
                        <div className="flex items-center justify-between mb-2 gap-2">
                          <h3 className="font-bold text-sm text-white group-hover:text-[#EEF35F] transition-colors font-heading">
                            {cat.name}
                          </h3>
                          <span className="text-[10px] font-mono font-medium text-neutral-400 bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded-full shrink-0">
                            {cat.productCount}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                          {cat.description}
                        </p>
                      </div>

                      {/* Micro arrow indicator on hover */}
                      <div className="mt-5 flex justify-end">
                        <span className="text-neutral-600 group-hover:text-[#EEF35F] transition-colors text-xs inline-flex items-center gap-1">
                          <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Pagination Dots */}
        {maxIndex > 0 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? "right" : "left");
                  setCurrentIndex(idx);
                }}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx
                    ? "w-7 bg-[#EEF35F]"
                    : "w-2 bg-neutral-800 hover:bg-neutral-600"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default CategoriesSection;
