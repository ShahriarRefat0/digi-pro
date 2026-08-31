"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProductCard, ProductItem } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Filter, Sparkles } from "lucide-react";

const ALL_PRODUCTS: ProductItem[] = [
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
  {
    id: "7",
    title: "SaaS Rocket - Full-Stack Next.js 16 Kit",
    category: "Templates & Boilerplates",
    price: "$79",
    rating: 4.9,
    reviews: 156,
    authorName: "Alex Rivers",
    badge: "Top Rated",
    canvasBg: "#FDF2F8",
    tags: ["Next.js", "Supabase", "Stripe"],
  },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white selection:bg-[#EEF35F] selection:text-black">
      <Navbar />

      <main className="flex-1 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 w-full bg-black">
        {/* Animated Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-neutral-900"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-950 px-3.5 py-1 text-xs font-semibold text-[#EEF35F] mb-3">
              <Sparkles className="size-3.5 text-[#EEF35F]" />
              <span>Explore Marketplace</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-heading text-white">
              All Digital Assets & Resources
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Showing {ALL_PRODUCTS.length} curated premium items with instant
              digital download.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 text-xs border-neutral-800 bg-neutral-950 text-white hover:bg-neutral-900 hover:text-white"
            >
              <Filter className="size-3.5 text-[#EEF35F]" />
              Filter & Sort
            </Button>
          </div>
        </motion.div>

        {/* Staggered Products Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-10">
          {ALL_PRODUCTS.map((prod, idx) => (
            <ProductCard key={prod.id} product={prod} index={idx} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
