import * as React from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  AboutHero,
  OurStory,
  WhatWeDo,
  Philosophy,
  BentoThinking,
  TechnologySection,
  SimpleStats,
  AudienceSection,
  ProcessSection,
  AboutCTA,
} from "@/components/about";

export const metadata: Metadata = {
  title: "About Careoffbd.com — Bangladesh's Trusted Baby & Mother Care Store",
  description:
    "We provide safe, dermatologist-tested baby care, maternity essentials, and women's personal care products in Bangladesh.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#29332D] selection:bg-[#7C9473]/20 selection:text-[#29332D]">
      {/* 1. Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1 bg-[#FAF7F0]">
        {/* 2. Hero */}
        <AboutHero />

        {/* 3. Our Story & Timeline */}
        <OurStory />

        {/* 4. What We Do */}
        <WhatWeDo />

        {/* 5. Philosophy */}
        <Philosophy />

        {/* 6. Bento Thinking */}
        <BentoThinking />

        {/* 7. Technology Stack */}
        <TechnologySection />

        {/* 8. Neutral Stats */}
        <SimpleStats />

        {/* 10. Who We Build For */}
        <AudienceSection />

        {/* 11. 4-Step Process */}
        <ProcessSection />

        {/* 12. Final CTA */}
        <AboutCTA />
      </main>

      {/* 13. Footer */}
      <Footer />
    </div>
  );
}
