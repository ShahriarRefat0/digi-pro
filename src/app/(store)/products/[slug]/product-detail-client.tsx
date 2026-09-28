"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import {
  ExternalLink,
  ShieldCheck,
  Zap,
  RefreshCw,
  Check,
  ArrowLeft,
  BookOpen,
  Code,
  FileCheck,
  Terminal,
} from "lucide-react";
import { Product } from "@/types/product";

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const allImages = React.useMemo(() => {
    const list: string[] = [];
    const isValidUrl = (url?: string) =>
      Boolean(url) &&
      (url!.startsWith("http://") ||
        url!.startsWith("https://") ||
        url!.startsWith("data:"));

    if (isValidUrl(product.thumbnail)) {
      list.push(product.thumbnail);
    }
    if (product.images && product.images.length > 0) {
      product.images.forEach((img) => {
        if (isValidUrl(img) && !list.includes(img)) list.push(img);
      });
    }
    return list;
  }, [product.thumbnail, product.images]);

  const [activeImage, setActiveImage] = React.useState<string | null>(
    allImages[0] || null
  );

  const isValidHttpUrl = (url?: string): boolean => {
    if (!url || typeof url !== "string") return false;
    const trimmed = url.trim();
    return trimmed.startsWith("http://") || trimmed.startsWith("https://");
  };

  const hasDemoUrl = isValidHttpUrl(product.demoUrl);
  const hasDocsUrl = isValidHttpUrl(product.documentationUrl);
  const hasPurchaseUrl = isValidHttpUrl(product.purchaseUrl);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-10 pb-16 lg:pb-0"
    >
      {/* Back Link */}
      <div>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors group"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to all products</span>
        </Link>
      </div>

      {/* Main Product Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left 2 Cols: Details & Overview */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="rounded-full border border-teal-100 bg-teal-50 px-3 py-1 text-xs font-mono text-[#0F766E] font-semibold">
                {product.category}
              </span>
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-mono text-slate-500">
                v{product.version}
              </span>
              {product.featured && (
                <span className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">
                  Featured Asset
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-slate-900 tracking-tight leading-tight">
              {product.name}
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              {product.shortDescription}
            </p>
          </div>

          {/* Product Media Display */}
          {activeImage && activeImage !== "/images/placeholder.webp" && (
            <div className="space-y-3">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <Image
                  src={activeImage}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              {/* Multi-image thumbnail strip */}
              {allImages.length > 1 && (
                <div className="flex gap-2.5 overflow-x-auto pb-2">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImage(img)}
                      className={`relative aspect-[16/10] h-14 shrink-0 rounded-lg overflow-hidden border transition-all cursor-pointer ${
                        activeImage === img
                          ? "border-[#0F766E] ring-2 ring-[#0F766E]/20"
                          : "border-slate-200 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`Preview ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Description Section */}
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <h2 className="text-sm font-mono font-semibold uppercase tracking-wider text-slate-500">
              Overview &amp; Architecture
            </h2>
            <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              {product.description}
            </div>
          </div>

          {/* Key Features List */}
          {product.features && product.features.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h2 className="text-sm font-mono font-semibold uppercase tracking-wider text-slate-500">
                Key Highlights
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-white p-3.5 text-xs text-slate-800 shadow-xs"
                  >
                    <div className="size-4 rounded-full bg-teal-50 text-[#0F766E] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="size-3" />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* What's Included */}
          {product.included && product.included.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h2 className="text-sm font-mono font-semibold uppercase tracking-wider text-slate-500">
                What&apos;s Included in this Package
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.included.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white p-3.5 text-xs text-slate-800 shadow-xs"
                  >
                    <FileCheck className="size-4 text-[#0F766E] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Requirements */}
          {product.requirements && product.requirements.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h2 className="text-sm font-mono font-semibold uppercase tracking-wider text-slate-500">
                System Requirements
              </h2>
              <div className="flex flex-wrap gap-2">
                {product.requirements.map((req, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-mono text-slate-700 shadow-xs"
                  >
                    <Terminal className="size-3.5 text-slate-400" />
                    <span>{req}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Technologies Badges */}
          {product.technologies && product.technologies.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-slate-200">
              <h2 className="text-sm font-mono font-semibold uppercase tracking-wider text-slate-500">
                Built With
              </h2>
              <div className="flex flex-wrap gap-2">
                {product.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1 text-xs font-mono text-slate-700 shadow-xs"
                  >
                    <Code className="size-3 text-[#0F766E]" />
                    <span>{tech}</span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right 1 Col: Purchase Card & Action Buttons */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-lg space-y-6 sticky top-24">
            {/* Price Header */}
            <div>
              <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                Lifetime Access
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-4xl font-extrabold font-mono text-slate-900">
                  ৳{product.price}
                </span>
                <span className="text-xs text-slate-500 font-mono">BDT</span>
              </div>
            </div>

            {/* Action Buttons with Strict Conditional Rendering */}
            <div className="space-y-2.5">
              {/* Buy Now (Direct link to external checkout) */}
              <a
                href={hasPurchaseUrl ? product.purchaseUrl : "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#0F766E] px-8 text-sm font-bold text-white hover:bg-[#115E59] transition-all shadow-md shadow-teal-900/10 active:scale-95 text-center cursor-pointer"
              >
                <span>Buy Now &rarr;</span>
              </a>

              {/* Live Demo (Render ONLY if demoUrl exists) */}
              {hasDemoUrl && (
                <a
                  href={product.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex h-10 items-center justify-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-6 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                >
                  <ExternalLink className="size-3.5 text-[#0F766E]" />
                  <span>Live Demo</span>
                </a>
              )}

              {/* Documentation (Render ONLY if documentationUrl exists) */}
              {hasDocsUrl && (
                <a
                  href={product.documentationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex h-10 items-center justify-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-6 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                >
                  <BookOpen className="size-3.5 text-slate-400" />
                  <span>Documentation</span>
                </a>
              )}
            </div>

            {/* Guarantees */}
            <div className="space-y-3 pt-5 border-t border-slate-100 text-xs text-slate-500">
              <div className="flex items-center gap-2.5">
                <Zap className="size-4 text-[#0F766E] shrink-0" />
                <span>Instant digital file delivery</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="size-4 text-[#0F766E] shrink-0" />
                <span>Commercial license included</span>
              </div>
              <div className="flex items-center gap-2.5">
                <RefreshCw className="size-4 text-[#0F766E] shrink-0" />
                <span>Free future updates &amp; patches</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Purchase Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3.5 lg:hidden shadow-lg flex items-center justify-between gap-4">
        <div>
          <span className="text-[10px] text-slate-500 font-mono uppercase block">Price</span>
          <span className="text-xl font-bold font-mono text-slate-900">৳{product.price}</span>
        </div>
        <a
          href={hasPurchaseUrl ? product.purchaseUrl : "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#0F766E] px-6 text-xs font-bold text-white hover:bg-[#115E59] transition-all shadow-md shadow-teal-900/10"
        >
          <span>Buy Now &rarr;</span>
        </a>
      </div>
    </motion.div>
  );
}

export default ProductDetailClient;
