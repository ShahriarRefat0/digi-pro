import * as React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Star, Filter } from "lucide-react";

const ALL_PRODUCTS = [
  {
    id: "1",
    title: "NovaUI Pro - Complete Design System",
    category: "UI Kits",
    price: "$49.00",
    rating: "4.9",
    reviews: 128,
    downloads: "2.4k",
    badge: "Bestseller",
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
  },
  {
    id: "4",
    title: "Apex Glyphs - 1,400+ Vector Icons",
    category: "Icons",
    price: "$19.00",
    rating: "4.9",
    reviews: 210,
    downloads: "4.1k",
    badge: "Popular",
  },
  {
    id: "5",
    title: "MonoFont Pro - Variable Coding Typeface",
    category: "Fonts",
    price: "$24.00",
    rating: "5.0",
    reviews: 45,
    downloads: "820",
    badge: "Featured",
  },
  {
    id: "6",
    title: "SaaS Rocket - Full-Stack Next.js 16 Kit",
    category: "Templates",
    price: "$79.00",
    rating: "4.9",
    reviews: 156,
    downloads: "3.2k",
    badge: "Top Rated",
  },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex-1 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="secondary" className="text-xs font-semibold">
                Explore Marketplace
              </Badge>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight font-heading">
              All Digital Assets & Resources
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              Showing {ALL_PRODUCTS.length} curated premium items with instant
              digital download.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs">
              <Filter className="size-3.5" />
              Filter & Sort
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
          {ALL_PRODUCTS.map((prod) => (
            <div
              key={prod.id}
              className="group relative flex flex-col rounded-2xl border bg-card overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl"
            >
              <div className="relative h-44 w-full bg-gradient-to-br from-primary/10 via-muted to-muted/80 flex items-center justify-center p-6 border-b">
                <div className="size-16 rounded-2xl bg-background/80 backdrop-blur-md flex items-center justify-center shadow-lg border border-border/50 text-foreground font-black text-lg">
                  {prod.category.slice(0, 2).toUpperCase()}
                </div>
                <div className="absolute top-3 left-3">
                  <Badge variant="secondary" className="text-[10px] font-bold">
                    {prod.badge}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-background/90 px-2 py-0.5 rounded-full text-[11px] font-bold border">
                  <Star className="size-3 text-amber-500 fill-amber-500" />
                  <span>{prod.rating}</span>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
                  <span>{prod.category}</span>
                  <span className="flex items-center gap-1 font-mono text-[11px]">
                    <Download className="size-3" />
                    {prod.downloads}
                  </span>
                </div>

                <h2 className="font-bold text-sm text-foreground mb-4 leading-snug group-hover:text-primary transition-colors">
                  {prod.title}
                </h2>

                <div className="flex items-center justify-between pt-3 border-t mt-auto">
                  <span className="text-base font-extrabold text-foreground font-heading">
                    {prod.price}
                  </span>
                  <Button
                    size="sm"
                    className="rounded-xl px-4 text-xs font-semibold gap-1.5"
                  >
                    <Download className="size-3.5" />
                    Get Asset
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
