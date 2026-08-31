import * as React from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  ContactHero,
  ContactInfo,
  ContactForm,
  WhatHappensNext,
  QuickHelp,
  ContactCTA,
} from "@/components/contact";

export const metadata: Metadata = {
  title: "Contact Us — Let's Talk About Your Project",
  description:
    "Have a question about a digital product or need custom development built for you? We'd love to hear what you're working on.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white selection:bg-[#EEF35F] selection:text-black">
      {/* 1. Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 bg-black">
        {/* 2. Hero */}
        <ContactHero />

        {/* 3. Main Form & Info Section */}
        <section className="py-20 sm:py-28 border-b border-neutral-900 bg-black">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Left Column: Contact Information */}
              <div className="lg:col-span-5">
                <ContactInfo />
              </div>

              {/* Right Column: Interactive Form */}
              <div className="lg:col-span-7">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* 4. What Happens Next Workflow */}
        <WhatHappensNext />

        {/* 5. Quick Help Section */}
        <QuickHelp />

        {/* 6. Final CTA */}
        <ContactCTA />
      </main>

      {/* 7. Footer */}
      <Footer />
    </div>
  );
}
