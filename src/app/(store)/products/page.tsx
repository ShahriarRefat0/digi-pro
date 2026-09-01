import * as React from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { getPublishedProducts } from "@/lib/products/product.repository";
import { Package } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Discover Digital Products — DigiForge",
  description: "Browse curated premium digital assets, templates, UI kits, and developer tools.",
};

export default async function ProductsPage() {
  const products = await getPublishedProducts();

  return (
    <div className="min-h-screen flex flex-col bg-black text-white selection:bg-[#EEF35F] selection:text-black">
      <Navbar />

      <main className="flex-1 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 w-full bg-black">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-neutral-900">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-heading text-white">
              All Digital Assets &amp; Resources
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Showing {products.length} curated premium items with instant digital download.
            </p>
          </div>
        </div>

        {/* Products Grid or Empty State */}
        {products.length === 0 ? (
          <div className="rounded-3xl border border-neutral-800 bg-neutral-950 p-16 text-center mt-10">
            <div className="size-14 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#EEF35F] mx-auto mb-4">
              <Package className="size-7" />
            </div>
            <h2 className="text-xl font-bold font-heading text-white">
              Products are coming soon.
            </h2>
            <p className="text-xs text-neutral-400 mt-1 max-w-md mx-auto">
              Our creators are finalizing new developer boilerplates and digital kits. Check back shortly.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-10">
            {products.map((prod, idx) => (
              <ProductCard
                key={prod.id}
                product={{
                  id: prod.id,
                  name: prod.name,
                  slug: prod.slug,
                  category: prod.category,
                  price: prod.price,
                  badge: prod.featured ? "Featured" : undefined,
                  authorName: "DigiForge",
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
