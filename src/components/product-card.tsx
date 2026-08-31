"use client";

import * as React from "react";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";

export interface ProductItem {
  id: string;
  title: string;
  creator?: {
    name: string;
    avatar?: string;
  };
  authorName?: string;
  authorAvatar?: string;
  category: string;
  price: string;
  rating: string | number;
  reviews: number;
  downloads?: string;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
  canvasBg?: string;
  coverImage?: string;
  tags?: string[];
}

export function ProductCard({ product }: { product: ProductItem }) {
  const authorName =
    product.creator?.name || product.authorName || "Silas Mercer";
  const canvasBg = product.canvasBg || "#FBF6EA";
  const slug = product.id || "1";

  return (
    <div className="group relative flex flex-col rounded-2xl border border-neutral-800 bg-neutral-950 overflow-hidden transition-all duration-300 hover:border-neutral-700 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/70">
      {/* Top Visual Panel with Artwork / 3D Book Cover Canvas */}
      <Link
        href={`/products/${slug}`}
        className="relative h-72 w-full flex items-center justify-center p-6 overflow-hidden select-none"
        style={{ backgroundColor: canvasBg }}
      >
        {/* Floating Book / Cover Mockup with depth and shadow */}
        <div className="relative w-36 h-52 sm:w-40 sm:h-56 rounded-sm bg-neutral-900 shadow-2xl transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-1 border border-black/20 overflow-hidden flex flex-col justify-between p-3.5 text-center text-white">
          {/* Subtle vintage inner border */}
          <div className="absolute inset-1.5 border border-[#C5A059]/40 pointer-events-none rounded-[1px]" />
          {/* Spine shadow effect */}
          <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-gradient-to-r from-black/50 to-transparent pointer-events-none" />

          {/* Book Header */}
          <div className="relative z-10 space-y-1 mt-1">
            <span className="block text-[8px] uppercase tracking-widest text-[#E6C687] font-serif">
              {product.category}
            </span>
            <div className="h-px w-6 bg-[#C5A059]/50 mx-auto" />
          </div>

          {/* Book Centerpiece Title */}
          <div className="relative z-10 my-auto px-1">
            <h4 className="font-serif text-xs sm:text-sm font-bold uppercase tracking-wider text-[#F5E6C8] leading-tight drop-shadow-sm">
              {product.title}
            </h4>
            <p className="mt-1 text-[7px] text-neutral-300/80 italic font-serif line-clamp-2">
              Curated Master Edition
            </p>
          </div>

          {/* Book Footer */}
          <div className="relative z-10 mb-1">
            <span className="text-[8px] font-mono text-[#E6C687]/90 tracking-tighter">
              {authorName}
            </span>
          </div>
        </div>

        {/* Optional Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 rounded-full bg-black/80 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-bold text-white border border-white/10">
            {product.badge}
          </span>
        )}
      </Link>

      {/* Middle Body Information */}
      <div className="p-5 flex flex-col flex-1 bg-black text-white">
        {/* Title */}
        <Link href={`/products/${slug}`}>
          <h3 className="text-base sm:text-lg font-bold text-white leading-snug group-hover:text-[#FF90E8] transition-colors line-clamp-2">
            {product.title}
          </h3>
        </Link>

        {/* Creator / Author */}
        <div className="mt-3 flex items-center gap-2">
          <div className="size-6 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-[10px] font-bold text-white shrink-0 overflow-hidden">
            {authorName.charAt(0)}
          </div>
          <Link
            href={`/products?creator=${encodeURIComponent(authorName)}`}
            className="text-xs font-medium text-neutral-300 hover:text-white underline underline-offset-4 decoration-neutral-600 hover:decoration-white transition-colors"
          >
            {authorName}
          </Link>
        </div>

        {/* Rating */}
        <div className="mt-2.5 flex items-center gap-1.5 text-xs text-white">
          <Star className="size-3.5 fill-white text-white" />
          <span className="font-semibold">{product.rating}</span>
          <span className="text-neutral-400 font-normal">
            ({product.reviews})
          </span>
        </div>
      </div>

      {/* Footer / Price Tag Ribbon */}
      <div className="border-t border-neutral-900 bg-black px-5 py-3.5 flex items-center justify-between">
        {/* Iconic Pink Ribbon Price Tag */}
        <div className="relative inline-flex items-center">
          <div
            className="bg-[#FF90E8] text-black font-extrabold text-sm sm:text-base px-3.5 py-1.5 flex items-center justify-center font-mono tracking-tight"
            style={{
              clipPath:
                "polygon(0 0, 100% 0, calc(100% - 9px) 50%, 100% 100%, 0 100%)",
              paddingRight: "1.25rem",
            }}
          >
            {product.price}
          </div>
        </div>

        {/* Quick View Link */}
        <Link
          href={`/products/${slug}`}
          className="text-xs font-semibold text-neutral-400 hover:text-white inline-flex items-center gap-1 transition-colors"
        >
          <span>View</span>
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
