import * as React from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  ServiceHero,
  ServiceGrid,
  ProcessSteps,
  TechnologyList,
  ServiceCTA,
} from "@/components/services";

export const metadata: Metadata = {
  title: "Services — Custom Web & API Development",
  description:
    "Modern, responsive websites, scalable backend systems, e-commerce solutions, and UI development tailored to your digital product needs.",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white selection:bg-[#EEF35F] selection:text-black">
      {/* 1. Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 bg-black">
        {/* 2. Hero Section */}
        <ServiceHero />

        {/* 3. Services Grid */}
        <ServiceGrid />

        {/* 4. Simple "How It Works" Section */}
        <ProcessSteps />

        {/* 5. Technologies Section */}
        <TechnologyList />

        {/* 6. Final CTA Section */}
        <ServiceCTA />
      </main>

      {/* 7. Footer */}
      <Footer />
    </div>
  );
}
