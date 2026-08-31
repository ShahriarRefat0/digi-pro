"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Flame,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { TechStackLoopSection } from "@/components/tech-stack-loop";
import { CategoriesSection } from "@/components/categories";
import { ProductCard, ProductItem } from "@/components/product-card";
import { ReviewsSection } from "@/components/reviews";
import { StatsSection } from "@/components/stats-section";
import { FAQSection } from "@/components/faq";

const FEATURED_PRODUCTS: ProductItem[] = [
  {
    id: "1",
    title: "The Forgotten Frontier Journal",
    category: "Guides & Survival",
    price: "$37",
    rating: 4.6,
    reviews: 64,
    authorName: "Silas Mercer",
    badge: "Bestseller",
    canvasBg: "#FBF5D5",
    tags: ["PDF", "Printable", "Audiobook"],
  },
  {
    id: "2",
    title: "NovaUI Pro - Complete Design System",
    category: "UI Kits & Figma",
    price: "$49",
    rating: 4.9,
    reviews: 128,
    authorName: "Elena Rostova",
    badge: "Popular",
    canvasBg: "#EBF4FF",
    tags: ["Figma", "React", "Tailwind"],
  },
  {
    id: "3",
    title: "Hyper3D - 120+ Isometric Tech Icons",
    category: "3D Assets & Models",
    price: "$29",
    rating: 5.0,
    reviews: 94,
    authorName: "Marcus Thorne",
    badge: "Hot",
    canvasBg: "#FFF1EB",
    tags: ["Blender", "GLTF", "PNG"],
  },
  {
    id: "4",
    title: "Aura Minimalist Portfolio & Blog",
    category: "Next.js Templates",
    price: "$39",
    rating: 4.8,
    reviews: 62,
    authorName: "DevKits Studio",
    badge: "New",
    canvasBg: "#ECFDF5",
    tags: ["Next.js 16", "TypeScript", "MDX"],
  },
  {
    id: "5",
    title: "Apex Glyphs - 1,400+ Vector Icons",
    category: "Icons & SVGs",
    price: "$19",
    rating: 4.9,
    reviews: 210,
    authorName: "VectorForge",
    badge: "Popular",
    canvasBg: "#FEF3C7",
    tags: ["SVG", "Figma", "IconJar"],
  },
  {
    id: "6",
    title: "MonoFont Pro - Variable Coding Typeface",
    category: "Typography & Fonts",
    price: "$24",
    rating: 5.0,
    reviews: 45,
    authorName: "TypeFoundry X",
    badge: "Featured",
    canvasBg: "#F5F3FF",
    tags: ["OTF", "TTF", "WOFF2"],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white selection:bg-[#EEF35F] selection:text-black">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Page Content */}
      <main className="flex-1 bg-black">
        {/* Hero Banner Section */}
        <Hero />

        {/* Logo Loop - Digital Product Tools & Ecosystem */}
        <TechStackLoopSection />

        {/* Digital Products Interactive Carousel Section */}
        <CategoriesSection />

        {/* Featured Products */}
        <section className="py-16 sm:py-24 bg-black">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12"
            >
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-950 px-3.5 py-1 text-xs font-semibold text-[#EEF35F] mb-3">
                  <Flame className="size-3.5 text-[#EEF35F] fill-[#EEF35F]" />
                  <span>Curated Drops</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-heading text-white">
                  Top Trending Digital Assets
                </h2>
              </div>
              <Link
                href="/products"
                className="text-xs font-semibold text-neutral-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
              >
                <span>Browse all products</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURED_PRODUCTS.map((prod, idx) => (
                <ProductCard key={prod.id} product={prod} index={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* Impact & Performance Stats Section */}
        <StatsSection />

        {/* Creator Reviews DriftWall Section */}
        <ReviewsSection />

        {/* Interactive FAQ Section */}
        <FAQSection />
      </main>

      {/* Interactive Footer */}
      <Footer />
    </div>
  );
}
