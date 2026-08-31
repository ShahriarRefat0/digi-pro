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
  ProductServiceSection,
  SimpleStats,
  AudienceSection,
  ProcessSection,
  AboutCTA,
} from "@/components/about";

export const metadata: Metadata = {
  title: "About — Building Digital Products That Help People Build Better",
  description:
    "We create practical digital products and provide development services that help creators, developers, and businesses turn ideas into reality.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white selection:bg-[#EEF35F] selection:text-black">
      {/* 1. Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1 bg-black">
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

        {/* 8. Products vs Services Relationship */}
        <ProductServiceSection />

        {/* 9. Neutral Stats */}
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
