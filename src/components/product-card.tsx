"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Star, ArrowRight } from "lucide-react";

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
  const canvasBg = product.canvasBg || "#181919";
  const slug = product.slug || product.id;
  const formattedPrice =
    typeof product.price === "number" ? `$${product.price}` : product.price;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
      whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
      className="group relative flex flex-col rounded-2xl border border-neutral-800 bg-neutral-950 overflow-hidden transition-colors duration-300 hover:border-neutral-700 hover:shadow-2xl hover:shadow-black/80"
    >
      {/* Top Visual Panel */}
      <Link
        href={`/products/${slug}`}
        className="relative h-72 w-full flex items-center justify-center p-6 overflow-hidden select-none"
        style={{ backgroundColor: canvasBg }}
      >
        {/* Floating Book / Cover Mockup */}
        <div className="relative w-36 h-52 sm:w-40 sm:h-56 rounded-sm bg-neutral-900 shadow-2xl transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-1 border border-neutral-800 overflow-hidden flex flex-col justify-between p-3.5 text-center text-white">
          {/* Subtle inner border */}
          <div className="absolute inset-1.5 border border-[#EEF35F]/30 pointer-events-none rounded-[1px]" />
          {/* Spine shadow effect */}
          <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-gradient-to-r from-black/50 to-transparent pointer-events-none" />

          {/* Header */}
          <div className="relative z-10 space-y-1 mt-1">
            <span className="block text-[8px] uppercase tracking-widest text-[#EEF35F] font-mono">
              {product.category}
            </span>
            <div className="h-px w-6 bg-[#EEF35F]/40 mx-auto" />
          </div>

          {/* Centerpiece Title */}
          <div className="relative z-10 my-auto px-1">
            <h4 className="font-heading text-xs sm:text-sm font-bold uppercase tracking-wider text-white leading-tight drop-shadow-sm line-clamp-3">
              {title}
            </h4>
            <p className="mt-1 text-[8px] font-mono text-neutral-400">
              DigiForge Edition
            </p>
          </div>

          {/* Footer */}
          <div className="relative z-10 mb-1">
            <span className="text-[8px] font-mono text-neutral-400 tracking-tighter">
              {authorName}
            </span>
          </div>
        </div>

        {/* Optional Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 rounded-full bg-black/80 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-bold text-[#EEF35F] border border-white/10">
            {product.badge}
          </span>
        )}
      </Link>

      {/* Middle Body Information */}
      <div className="p-5 flex flex-col flex-1 bg-black text-white">
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

        {/* Rating */}
        <div className="mt-2.5 flex items-center gap-1.5 text-xs text-white">
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
