import * as React from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Download,
  Star,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Flame,
  Layers,
  Box,
  Smile,
  Layout,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { TechStackLoopSection } from "@/components/tech-stack-loop";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const FEATURED_PRODUCTS = [
  {
    id: "1",
    title: "NovaUI Pro - Complete Design System",
    category: "UI Kits",
    price: "$49.00",
    rating: "4.9",
    reviews: 128,
    downloads: "2.4k",
    badge: "Bestseller",
    badgeVariant: "default" as const,
    gradient: "from-blue-600/20 via-indigo-600/10 to-purple-600/20",
    tags: ["Figma", "React", "Tailwind"],
  },
  {
    id: "2",
    title: "Hyper3D - 120+ Isometric Tech Icons",
    category: "3D Assets",
    price: "$29.00",
    rating: "5.0",
    reviews: 94,
    downloads: "1.8k",
    badge: "Hot",
    badgeVariant: "destructive" as const,
    gradient: "from-amber-600/20 via-orange-600/10 to-rose-600/20",
    tags: ["Blender", "PNG", "GLTF"],
  },
  {
    id: "3",
    title: "Aura Minimalist Portfolio & Blog",
    category: "Templates",
    price: "$39.00",
    rating: "4.8",
    reviews: 62,
    downloads: "950",
    badge: "New",
    badgeVariant: "secondary" as const,
    gradient: "from-emerald-600/20 via-teal-600/10 to-cyan-600/20",
    tags: ["Next.js 16", "TypeScript", "MDX"],
  },
];

const POPULAR_CATEGORIES = [
  {
    name: "UI Kits & Systems",
    count: "140+ Items",
    icon: Layers,
    description: "Production ready Figma & React design systems",
    color: "text-blue-500 bg-blue-500/10",
  },
  {
    name: "3D Illustrations & Icons",
    count: "85+ Packs",
    icon: Box,
    description: "High-resolution 3D renders, GLTF & OBJ assets",
    color: "text-amber-500 bg-amber-500/10",
  },
  {
    name: "Vector & Glyphs",
    count: "320+ Packs",
    icon: Smile,
    description: "Pixel-perfect SVGs, animated web icons",
    color: "text-emerald-500 bg-emerald-500/10",
  },
  {
    name: "Web & SaaS Starters",
    count: "90+ Templates",
    icon: Layout,
    description: "Full-stack Next.js, Tailwind, and Auth boilerplates",
    color: "text-purple-500 bg-purple-500/10",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Page Content */}
      <main className="flex-1">
        {/* Hero Banner Section */}
        <Hero />

        {/* Logo Loop - Digital Product Tools & Ecosystem */}
        <TechStackLoopSection />

        {/* Popular Categories Grid */}
        <section className="py-16 border-b border-border/40 bg-muted/20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
              <div>
                <Badge
                  variant="secondary"
                  className="mb-2 text-xs font-semibold"
                >
                  Categories
                </Badge>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-heading">
                  Explore by Creative Discipline
                </h2>
              </div>
              <Link
                href="/products"
                className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
              >
                View all categories &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {POPULAR_CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                return (
                  <Link
                    key={cat.name}
                    href="/products"
                    className="group relative rounded-2xl border bg-card p-5 transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg"
                  >
                    <div
                      className={`size-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${cat.color}`}
                    >
                      <Icon className="size-6" />
                    </div>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                        {cat.name}
                      </h3>
                      <span className="text-[10px] font-mono font-medium text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                        {cat.count}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {cat.description}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Flame className="size-4 text-rose-500 fill-rose-500" />
                  <Badge
                    variant="destructive"
                    className="text-[10px] font-bold"
                  >
                    Curated Drops
                  </Badge>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-heading">
                  Top Trending Digital Assets
                </h2>
              </div>
              <Link
                href="/products"
                className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
              >
                Browse all products &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURED_PRODUCTS.map((prod) => (
                <div
                  key={prod.id}
                  className="group relative flex flex-col rounded-2xl border bg-card overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl"
                >
                  {/* Thumbnail / Graphic preview */}
                  <div
                    className={`relative h-48 w-full bg-gradient-to-br ${prod.gradient} flex items-center justify-center p-6 border-b border-border/40`}
                  >
                    <div className="size-20 rounded-2xl bg-background/80 backdrop-blur-md flex items-center justify-center shadow-lg border border-border/50 text-foreground font-black text-xl group-hover:scale-105 transition-transform">
                      {prod.category.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="absolute top-3 left-3">
                      <Badge
                        variant={prod.badgeVariant}
                        className="text-[10px] font-bold"
                      >
                        {prod.badge}
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-background/90 backdrop-blur-md px-2 py-0.5 rounded-full text-[11px] font-bold text-foreground border shadow-2xs">
                      <Star className="size-3 text-amber-500 fill-amber-500" />
                      <span>{prod.rating}</span>
                      <span className="text-[10px] text-muted-foreground font-normal">
                        ({prod.reviews})
                      </span>
                    </div>
                  </div>

                  {/* Body info */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
                      <span className="font-medium">{prod.category}</span>
                      <span className="flex items-center gap-1 font-mono text-[11px]">
                        <Download className="size-3 text-muted-foreground" />
                        {prod.downloads}
                      </span>
                    </div>

                    <h3 className="font-bold text-sm text-foreground mb-3 leading-snug group-hover:text-primary transition-colors">
                      {prod.title}
                    </h3>

                    <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
                      {prod.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-muted-foreground">
                          License price
                        </span>
                        <span className="text-base font-extrabold text-foreground font-heading">
                          {prod.price}
                        </span>
                      </div>

                      <Button
                        size="sm"
                        className="rounded-xl px-4 text-xs font-semibold gap-1.5 shadow-xs"
                      >
                        <Download className="size-3.5" />
                        Get Asset
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Interactive Footer */}
      <Footer />
    </div>
  );
}
