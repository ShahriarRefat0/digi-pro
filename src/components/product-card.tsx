"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Star, ArrowRight, Package, ShoppingBag } from "lucide-react";

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
  const title = product.name || product.title || "Care Product";
  const authorName =
    product.creator?.name || product.authorName || "Careproff Essentials";
  const slug = product.slug || product.id;
  const formattedPrice =
    typeof product.price === "number" ? `৳${product.price}` : (product.price.toString().startsWith("৳") ? product.price : `$${product.price}`);

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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
      whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
      className="group relative flex flex-col rounded-2xl border border-gray-200 bg-white overflow-hidden transition-all duration-300 hover:border-teal-200 hover:shadow-md"
    >
      {/* Full-Width Image Visual Panel */}
      <Link
        href={`/products/${slug}`}
        className="relative aspect-[16/10] w-full overflow-hidden bg-slate-50 select-none block"
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
          <div className="size-full flex flex-col items-center justify-center bg-gradient-to-br from-teal-50/50 to-slate-100 p-6 text-center">
            <div className="size-12 rounded-2xl border border-teal-200 bg-white flex items-center justify-center text-[#0F766E] mb-2 shadow-xs">
              <Package className="size-6" />
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">
              {product.category}
            </span>
          </div>
        )}

        {/* Category Pill Badge (Top Left) */}
        <div className="absolute top-3 left-3 z-10">
          <span className="rounded-full bg-white/90 backdrop-blur-md px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#0F766E] border border-teal-200 shadow-xs">
            {product.category}
          </span>
        </div>

        {/* Optional Featured / Custom Badge (Top Right) */}
        {product.badge && (
          <div className="absolute top-3 right-3 z-10">
            <span className="rounded-full bg-[#0F766E] px-2.5 py-0.5 text-[10px] font-bold text-white shadow-xs">
              {product.badge}
            </span>
          </div>
        )}
      </Link>

      {/* Middle Body Information */}
      <div className="p-5 flex flex-col flex-1 bg-white text-gray-900 justify-between">
        <div>
          {/* Title */}
          <Link href={`/products/${slug}`}>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug group-hover:text-[#0F766E] transition-colors line-clamp-2 font-heading">
              {title}
            </h3>
          </Link>

          {/* Brand/Category */}
          <div className="mt-2.5 flex items-center gap-2">
            <div className="size-6 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center text-[10px] font-bold text-[#0F766E] shrink-0 overflow-hidden">
              {authorName.charAt(0)}
            </div>
            <span className="text-xs font-medium text-gray-600">
              {authorName}
            </span>
          </div>
        </div>

        {/* Rating */}
        <div className="mt-4 flex items-center gap-1.5 text-xs text-gray-900">
          <Star className="size-3.5 fill-amber-400 text-amber-400" />
          <span className="font-semibold text-gray-900">{product.rating || "4.9"}</span>
          <span className="text-gray-500 font-normal">
            ({product.reviews || 126})
          </span>
        </div>
      </div>

      {/* Footer / Price Tag Ribbon & CTA */}
      <div className="border-t border-gray-100 bg-[#FAFAF8] px-5 py-3.5 flex items-center justify-between">
        {/* Price Tag */}
        <div className="flex items-baseline gap-1.5">
          <span className="text-lg font-bold text-gray-900 tracking-tight font-heading">
            {formattedPrice}
          </span>
        </div>

        {/* Add to Cart / View CTA */}
        <Link
          href={`/products/${slug}`}
          className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg bg-[#0F766E] px-3 text-xs font-bold text-white transition-all hover:bg-[#115E59] active:scale-95 shadow-xs"
        >
          <ShoppingBag className="size-3.5" />
          <span>Add to Cart</span>
        </Link>
      </div>
    </motion.div>
  );
}

export default ProductCard;

