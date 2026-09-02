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
      className="space-y-10"
    >
      {/* Back Link */}
      <div>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors group"
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
              <span className="rounded-full border border-neutral-800 bg-neutral-900 px-3 py-1 text-xs font-mono text-[#EEF35F]">
                {product.category}
              </span>
              <span className="rounded-full border border-neutral-800 bg-neutral-950 px-3 py-1 text-xs font-mono text-neutral-400">
                v{product.version}
              </span>
              {product.featured && (
                <span className="rounded-full border border-[#EEF35F]/30 bg-[#EEF35F]/10 px-3 py-1 text-xs font-semibold text-[#EEF35F]">
                  Featured Asset
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight">
              {product.name}
            </h1>

            <p className="mt-4 text-base sm:text-lg text-neutral-300 leading-relaxed">
              {product.shortDescription}
            </p>
          </div>

          {/* Product Media Display */}
          {activeImage && activeImage !== "/images/placeholder.webp" && (
            <div className="space-y-3">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 shadow-xl">
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
                          ? "border-[#EEF35F] ring-2 ring-[#EEF35F]/30"
                          : "border-neutral-800 opacity-60 hover:opacity-100"
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
          <div className="space-y-3 pt-4 border-t border-neutral-900">
            <h2 className="text-sm font-mono font-semibold uppercase tracking-wider text-neutral-400">
              Overview &amp; Architecture
            </h2>
            <div className="text-sm text-neutral-300 leading-relaxed whitespace-pre-line bg-neutral-950/60 rounded-2xl border border-neutral-800/80 p-6">
              {product.description}
            </div>
          </div>

          {/* Key Features List */}
          {product.features && product.features.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-neutral-900">
              <h2 className="text-sm font-mono font-semibold uppercase tracking-wider text-neutral-400">
                Key Highlights
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 rounded-xl border border-neutral-800 bg-neutral-950 p-3.5 text-xs text-neutral-200"
                  >
                    <div className="size-4 rounded-full bg-[#EEF35F]/10 text-[#EEF35F] flex items-center justify-center shrink-0 mt-0.5">
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
            <div className="space-y-4 pt-4 border-t border-neutral-900">
              <h2 className="text-sm font-mono font-semibold uppercase tracking-wider text-neutral-400">
                What&apos;s Included in this Package
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.included.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 rounded-xl border border-neutral-800 bg-neutral-950 p-3.5 text-xs text-neutral-200"
                  >
                    <FileCheck className="size-4 text-[#EEF35F] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Requirements */}
          {product.requirements && product.requirements.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-neutral-900">
              <h2 className="text-sm font-mono font-semibold uppercase tracking-wider text-neutral-400">
                System Requirements
              </h2>
              <div className="flex flex-wrap gap-2">
                {product.requirements.map((req, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-950 px-3.5 py-2 text-xs font-mono text-neutral-300"
                  >
                    <Terminal className="size-3.5 text-neutral-400" />
                    <span>{req}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Technologies Badges */}
          {product.technologies && product.technologies.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-neutral-900">
              <h2 className="text-sm font-mono font-semibold uppercase tracking-wider text-neutral-400">
                Built With
              </h2>
              <div className="flex flex-wrap gap-2">
                {product.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 rounded-full border border-neutral-800 bg-neutral-900 px-3.5 py-1 text-xs font-mono text-neutral-200"
                  >
                    <Code className="size-3 text-[#EEF35F]" />
                    <span>{tech}</span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right 1 Col: Purchase Card & Action Buttons */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-neutral-800 bg-neutral-950 p-6 sm:p-7 shadow-2xl space-y-6 sticky top-24">
            {/* Price Header */}
            <div>
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                Lifetime Access
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-4xl font-extrabold font-mono text-white">
                  ${product.price}
                </span>
                <span className="text-xs text-neutral-500 font-mono">USD</span>
              </div>
            </div>

            {/* Action Buttons with Strict Conditional Rendering */}
            <div className="space-y-2.5">
              {/* Buy Now (Direct link to external checkout) */}
              <a
                href={hasPurchaseUrl ? product.purchaseUrl : "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#EEF35F] px-8 text-sm font-bold text-black hover:bg-[#e5ea4e] hover:shadow-[0_0_25px_rgba(238,243,95,0.3)] transition-all shadow-lg shadow-[#EEF35F]/20 active:scale-95 text-center cursor-pointer"
              >
                <span>Buy Now &rarr;</span>
              </a>

              {/* Live Demo (Render ONLY if demoUrl exists) */}
              {hasDemoUrl && (
                <a
                  href={product.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex h-10 items-center justify-center gap-2 rounded-full border border-neutral-800 bg-neutral-900 px-6 text-xs font-semibold text-neutral-200 hover:bg-neutral-800 hover:text-white transition-colors"
                >
                  <ExternalLink className="size-3.5 text-[#EEF35F]" />
                  <span>Live Demo</span>
                </a>
              )}

              {/* Documentation (Render ONLY if documentationUrl exists) */}
              {hasDocsUrl && (
                <a
                  href={product.documentationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex h-10 items-center justify-center gap-2 rounded-full border border-neutral-800 bg-neutral-900 px-6 text-xs font-semibold text-neutral-200 hover:bg-neutral-800 hover:text-white transition-colors"
                >
                  <BookOpen className="size-3.5 text-neutral-400" />
                  <span>Documentation</span>
                </a>
              )}
            </div>

            {/* Guarantees */}
            <div className="space-y-3 pt-5 border-t border-neutral-900 text-xs text-neutral-400">
              <div className="flex items-center gap-2.5">
                <Zap className="size-4 text-[#EEF35F] shrink-0" />
                <span>Instant digital file delivery</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="size-4 text-[#EEF35F] shrink-0" />
                <span>Commercial license included</span>
              </div>
              <div className="flex items-center gap-2.5">
                <RefreshCw className="size-4 text-[#EEF35F] shrink-0" />
                <span>Free future updates &amp; patches</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductDetailClient;
