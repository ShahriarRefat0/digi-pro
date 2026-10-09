import * as React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { getPublishedProducts } from "@/lib/products/product.repository";
import { getCategories } from "@/lib/categories/category.repository";
import { Package, Sparkles, Filter, Check } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Discover Baby & Mother Care Essentials — Careoffbd.com",
  description: "Browse curated premium baby care, maternity care, and women's personal-care products in Bangladesh.",
};

interface ProductsPageProps {
  searchParams: Promise<{ category?: string; search?: string }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolvedParams = await searchParams;
  const selectedCategory = resolvedParams.category?.trim() || "";
  const searchQuery = resolvedParams.search?.trim() || "";

  const [categories, products] = await Promise.all([
    getCategories({ activeOnly: true }),
    getPublishedProducts({
      category: selectedCategory || undefined,
      search: searchQuery || undefined,
    }),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#29332D] selection:bg-[#7C9473]/20 selection:text-[#29332D]">
      <Navbar />

      <main className="flex-1 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 w-full">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-[#29332D]/10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#7C9473]/30 bg-[#7C9473]/10 px-3.5 py-1 text-xs font-semibold text-[#7C9473] mb-3">
              <Sparkles className="size-3.5" />
              <span>Careoffbd.com Collection</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-heading text-[#29332D]">
              {selectedCategory ? `${selectedCategory} Catalog` : "Baby & Mother Care Catalog"}
            </h1>
            <p className="text-xs sm:text-sm text-[#29332D]/70 mt-1">
              Showing {products.length} dermatologist-tested and mom-approved essential products.
            </p>
          </div>
        </div>

        {/* Dynamic Category Filter Pills */}
        {categories.length > 0 && (
          <div className="flex items-center gap-2.5 overflow-x-auto py-6 scrollbar-none whitespace-nowrap">
            <Link
              href="/products"
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 ${
                !selectedCategory
                  ? "bg-[#7C9473] text-white shadow-xs"
                  : "border border-[#29332D]/10 bg-white text-[#29332D]/70 hover:border-[#7C9473] hover:text-[#29332D]"
              }`}
            >
              <span>All Items</span>
            </Link>

            {categories.map((cat) => {
              const isSelected =
                selectedCategory.toLowerCase() === cat.slug.toLowerCase() ||
                selectedCategory.toLowerCase() === cat.name.toLowerCase();

              return (
                <Link
                  key={cat.id}
                  href={`/products?category=${encodeURIComponent(cat.slug || cat.name)}`}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 ${
                    isSelected
                      ? "bg-[#7C9473] text-white shadow-xs"
                      : "border border-[#29332D]/10 bg-white text-[#29332D]/70 hover:border-[#7C9473] hover:text-[#29332D]"
                  }`}
                >
                  {isSelected && <Check className="size-3.5" />}
                  <span>{cat.name}</span>
                </Link>
              );
            })}
          </div>
        )}

        {/* Products Grid or Empty State */}
        {products.length === 0 ? (
          <div className="rounded-3xl border border-[#29332D]/10 bg-white p-16 text-center mt-6 shadow-sm">
            <div className="size-14 rounded-2xl bg-[#7C9473]/10 border border-[#7C9473]/20 flex items-center justify-center text-[#7C9473] mx-auto mb-4">
              <Package className="size-7" />
            </div>
            <h2 className="text-xl font-bold font-heading text-[#29332D]">
              No products found for this category
            </h2>
            <p className="text-xs text-[#29332D]/70 mt-1 max-w-md mx-auto">
              We couldn&apos;t find any published products under &ldquo;{selectedCategory}&rdquo;. Try browsing another category or return to all products.
            </p>
            <div className="mt-6">
              <Link
                href="/products"
                className="inline-flex h-10 items-center justify-center rounded-full bg-[#7C9473] px-6 text-xs font-bold text-white hover:bg-[#6b8262] transition-colors"
              >
                View All Products
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-4">
            {products.map((prod, idx) => (
              <ProductCard
                key={prod.id}
                product={{
                  id: prod.id,
                  name: prod.name,
                  slug: prod.slug,
                  category: prod.category,
                  price: prod.price,
                  thumbnail: prod.thumbnail,
                  badge: prod.featured ? "Featured" : undefined,
                  authorName: "Careoffbd",
                }}
                index={idx}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

