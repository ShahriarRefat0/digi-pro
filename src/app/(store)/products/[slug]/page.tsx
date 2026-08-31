import * as React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProductDetailClient } from "./product-detail-client";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="min-h-screen flex flex-col bg-black text-white selection:bg-[#EEF35F] selection:text-black">
      <Navbar />

      <main className="flex-1 mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 w-full bg-black">
        <ProductDetailClient slug={slug} />
      </main>

      <Footer />
    </div>
  );
}
