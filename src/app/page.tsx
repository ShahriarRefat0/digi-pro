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
import { getActiveHeroSlides } from "@/lib/hero/hero.repository";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [featuredProductsResult, heroSlides] = await Promise.all([
    getFeaturedProducts(6),
    getActiveHeroSlides(),
  ]);

  const featuredProducts = featuredProductsResult.slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#29332D] selection:bg-[#7C9473] selection:text-white">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Page Content */}
      <main className="flex-1 bg-white">
        {/* Dynamic Hero Banner Section */}
        <Hero slides={heroSlides} />

        {/* Baby & Mom Care Category Trust Loop */}
        <TechStackLoopSection />

        {/* Interactive Category Carousel Section */}
        <CategoriesSection />

        {/* Featured Products Section (Real MongoDB Data) */}
        <section className="py-16 sm:py-24 bg-[#FAF7F0]/30 border-b border-[#e2e8e3]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#7C9473]/30 bg-[#FAF7F0] px-3.5 py-1 text-xs font-semibold text-[#7C9473] mb-3">
                  <Flame className="size-3.5 text-[#7C9473] fill-[#7C9473]" />
                  <span>Dermatologist Approved Essentials</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-heading text-[#29332D]">
                  Featured Baby &amp; Mother Care
                </h2>
              </div>
              <Link
                href="/products"
                className="text-xs font-semibold text-[#536358] hover:text-[#7C9473] transition-colors inline-flex items-center gap-1 group"
              >
                <span>Browse all products</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
              </Link>
            </div>

            {featuredProducts.length === 0 ? (
              <div className="rounded-2xl border border-[#e2e8e3] bg-white p-12 text-center shadow-xs">
                <Package className="size-8 text-[#536358] mx-auto mb-3" />
                <p className="text-sm font-semibold text-[#29332D]">
                  No featured products available yet.
                </p>
                <p className="text-xs text-[#536358] mt-1">
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
                      thumbnail: prod.thumbnail,
                      badge: "Featured",
                      authorName: "Careoffbd Essentials",
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
