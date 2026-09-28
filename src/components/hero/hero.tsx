import * as React from "react";
import { HeroSlide } from "@/types/hero";
import { HeroCarousel } from "./hero-carousel";
import { HeroFallback } from "./hero-fallback";

interface HeroProps {
  slides?: HeroSlide[];
}

export function Hero({ slides = [] }: HeroProps) {
  if (slides && slides.length > 0) {
    return <HeroCarousel slides={slides} />;
  }

  return <HeroFallback />;
}

export default Hero;
