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
  title: "About Careproff — Digital Products for Maternal & Baby Care",
  description:
    "We create practical digital products and provide care resources that help families and caregivers nurture with confidence.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-teal-100 selection:text-teal-900">
      {/* 1. Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1 bg-slate-50">
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
