import * as React from "react";
import Link from "next/link";
import { Flame, Package } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { TechStackLoopSection } from "@/components/tech-stack-loop";
import { CategoriesSection } from "@/components/categories";
import { ProductCard } from "@/components/product-card";
import { ReviewsSection } from "@/components/reviews";
import { StatsSection } from "@/components/stats-section";
import { FAQSection } from "@/components/faq";
import { getFeaturedProducts } from "@/lib/products/product.repository";

export const dynamic = "force-dynamic";

export default async function Home() {
  const featuredProducts = await getFeaturedProducts(6);

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

        {/* Featured Products Section (Real MongoDB Data) */}
        <section className="py-16 sm:py-24 bg-black">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
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
            </div>

            {featuredProducts.length === 0 ? (
              <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-12 text-center">
                <Package className="size-8 text-neutral-600 mx-auto mb-3" />
                <p className="text-sm font-semibold text-neutral-300">
                  No featured products available yet.
                </p>
                <p className="text-xs text-neutral-500 mt-1">
                  Mark products as &ldquo;Feature on Homepage&rdquo; from your Admin Dashboard to showcase them here.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {featuredProducts.map((prod, idx) => (
                  <ProductCard
                    key={prod.id}
                    product={{
                      id: prod.id,
                      name: prod.name,
                      slug: prod.slug,
                      category: prod.category,
                      price: prod.price,
                      badge: "Featured",
                      authorName: "DigiForge",
                    }}
                    index={idx}
                  />
                ))}
              </div>
            )}
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
