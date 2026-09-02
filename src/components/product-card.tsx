"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Star, ArrowRight, Package } from "lucide-react";

export interface ProductItem {
  id: string;
  name?: string;
  title?: string;
  slug?: string;
  creator?: {
    name: string;
    avatar?: string;
  };
  authorName?: string;
  authorAvatar?: string;
  category: string;
  price: string | number;
  rating?: string | number;
  reviews?: number;
  downloads?: string;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
  canvasBg?: string;
  coverImage?: string;
  thumbnail?: string;
  tags?: string[];
}

export function ProductCard({
  product,
  index = 0,
}: {
  product: ProductItem;
  index?: number;
}) {
  const title = product.name || product.title || "Digital Product";
  const authorName =
    product.creator?.name || product.authorName || "DigiForge";
  const slug = product.slug || product.id;
  const formattedPrice =
    typeof product.price === "number" ? `$${product.price}` : product.price;

  const imageSrc = product.thumbnail || product.coverImage;
  const hasValidImage =
    Boolean(imageSrc) &&
    typeof imageSrc === "string" &&
    imageSrc.trim() !== "" &&
    (imageSrc.startsWith("http://") ||
      imageSrc.startsWith("https://") ||
      imageSrc.startsWith("data:") ||
      imageSrc.startsWith("/images/"));

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
      whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
      className="group relative flex flex-col rounded-2xl border border-neutral-800 bg-neutral-950 overflow-hidden transition-all duration-300 hover:border-neutral-700 hover:shadow-2xl hover:shadow-black/90"
    >
      {/* Full-Width Image Visual Panel */}
      <Link
        href={`/products/${slug}`}
        className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-900 select-none block"
      >
        {hasValidImage ? (
          <Image
            src={imageSrc!}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="size-full flex flex-col items-center justify-center bg-gradient-to-br from-neutral-900 to-neutral-950 p-6 text-center">
            <div className="size-12 rounded-2xl border border-neutral-800 bg-neutral-900 flex items-center justify-center text-[#EEF35F] mb-2 shadow-inner">
              <Package className="size-6" />
            </div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400">
              {product.category}
            </span>
          </div>
        )}

        {/* Subtle Vignette & Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

        {/* Category Pill Badge (Top Left) */}
        <div className="absolute top-3 left-3 z-10">
          <span className="rounded-full bg-black/70 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono font-semibold uppercase tracking-wider text-[#EEF35F] border border-white/10 shadow-sm">
            {product.category}
          </span>
        </div>

        {/* Optional Featured / Custom Badge (Top Right) */}
        {product.badge && (
          <div className="absolute top-3 right-3 z-10">
            <span className="rounded-full bg-[#EEF35F] px-2.5 py-0.5 text-[10px] font-bold text-black shadow-md shadow-[#EEF35F]/20">
              {product.badge}
            </span>
          </div>
        )}
      </Link>

      {/* Middle Body Information */}
      <div className="p-5 flex flex-col flex-1 bg-neutral-950 text-white justify-between">
        <div>
          {/* Title */}
          <Link href={`/products/${slug}`}>
            <h3 className="text-base sm:text-lg font-bold text-white leading-snug group-hover:text-[#EEF35F] transition-colors line-clamp-2 font-heading">
              {title}
            </h3>
          </Link>

          {/* Creator / Author */}
          <div className="mt-3 flex items-center gap-2">
            <div className="size-6 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[10px] font-bold text-[#EEF35F] shrink-0 overflow-hidden">
              {authorName.charAt(0)}
            </div>
            <span className="text-xs font-medium text-neutral-300">
              {authorName}
            </span>
          </div>
        </div>

        {/* Rating */}
        <div className="mt-4 flex items-center gap-1.5 text-xs text-white">
          <Star className="size-3.5 fill-[#EEF35F] text-[#EEF35F]" />
          <span className="font-semibold">{product.rating || "5.0"}</span>
          <span className="text-neutral-400 font-normal">
            ({product.reviews || 48})
          </span>
        </div>
      </div>

      {/* Footer / Price Tag Ribbon */}
      <div className="border-t border-neutral-900 bg-black px-5 py-3.5 flex items-center justify-between">
        {/* Price Tag */}
        <div className="relative inline-flex items-center">
          <div
            className="bg-[#EEF35F] text-black font-black text-sm sm:text-base px-3.5 py-1.5 flex items-center justify-center font-mono tracking-tight"
            style={{
              clipPath:
                "polygon(0 0, 100% 0, calc(100% - 9px) 50%, 100% 100%, 0 100%)",
              paddingRight: "1.25rem",
            }}
          >
            {formattedPrice}
          </div>
        </div>

        {/* Quick View Link */}
        <Link
          href={`/products/${slug}`}
          className="text-xs font-semibold text-neutral-400 hover:text-white inline-flex items-center gap-1 transition-colors group/view"
        >
          <span>View</span>
          <ArrowRight className="size-3.5 transition-transform group-hover/view:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
}

export default ProductCard;
