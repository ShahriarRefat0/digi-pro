"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Star, ArrowRight, Package, ShoppingBag } from "lucide-react";

import { useCart } from "@/context/CartContext";

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
  const { addToCart, buyNow } = useCart();
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
      className="group relative flex flex-col rounded-2xl border border-[#e2e8e3] bg-white overflow-hidden transition-all duration-300 hover:border-[#7C9473] hover:shadow-md"
    >
      {/* Full-Width Image Visual Panel */}
      <Link
        href={`/products/${slug}`}
        className="relative aspect-[16/10] w-full overflow-hidden bg-[#FAF7F0] select-none block"
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
          <div className="size-full flex flex-col items-center justify-center bg-gradient-to-br from-[#FAF7F0] to-[#F0F4EE] p-6 text-center">
            <div className="size-12 rounded-2xl border border-[#7C9473]/30 bg-white flex items-center justify-center text-[#7C9473] mb-2 shadow-xs">
              <Package className="size-6" />
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#536358]">
              {product.category}
            </span>
          </div>
        )}

        {/* Category Pill Badge (Top Left) */}
        <div className="absolute top-3 left-3 z-10">
          <span className="rounded-full bg-white/90 backdrop-blur-md px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#7C9473] border border-[#7C9473]/30 shadow-xs">
            {product.category}
          </span>
        </div>

        {/* Optional Featured / Custom Badge (Top Right) */}
        {product.badge && (
          <div className="absolute top-3 right-3 z-10">
            <span className="rounded-full bg-[#F3E1DD] px-2.5 py-0.5 text-[10px] font-bold text-[#29332D] shadow-xs border border-[#F3E1DD]">
              {product.badge}
            </span>
          </div>
        )}
      </Link>

      {/* Middle Body Information */}
      <div className="p-5 flex flex-col flex-1 bg-white text-[#29332D] justify-between">
        <div>
          {/* Title */}
          <Link href={`/products/${slug}`}>
            <h3 className="text-base sm:text-lg font-bold text-[#29332D] leading-snug group-hover:text-[#7C9473] transition-colors line-clamp-2 font-heading">
              {title}
            </h3>
          </Link>

          {/* Brand/Category */}
          <div className="mt-2.5 flex items-center gap-2">
            <div className="size-6 rounded-full bg-[#FAF7F0] border border-[#7C9473]/30 flex items-center justify-center text-[10px] font-bold text-[#7C9473] shrink-0 overflow-hidden">
              {authorName.charAt(0)}
            </div>
            <span className="text-xs font-medium text-[#536358]">
              {authorName}
            </span>
          </div>
        </div>

        {/* Rating */}
        <div className="mt-4 flex items-center gap-1.5 text-xs text-[#29332D]">
          <Star className="size-3.5 fill-amber-400 text-amber-400" />
          <span className="font-semibold text-[#29332D]">{product.rating || "4.9"}</span>
          <span className="text-[#536358] font-normal">
            ({product.reviews || 126})
          </span>
        </div>
      </div>

      {/* Footer / Price Tag Ribbon & Dual CTAs */}
      <div className="border-t border-[#e2e8e3] bg-[#FAF7F0] px-4 py-3 flex items-center justify-between gap-2">
        {/* Price Tag */}
        <div className="flex items-baseline shrink-0">
          <span className="text-base sm:text-lg font-bold text-[#29332D] tracking-tight font-heading">
            {formattedPrice}
          </span>
        </div>

        {/* Both Add to Cart & Buy Now Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() =>
              addToCart({
                id: product.id,
                name: title,
                slug,
                thumbnail: imageSrc,
                price: product.price,
                category: product.category,
              })
            }
            className="inline-flex h-8 items-center justify-center gap-1 rounded-lg border border-[#e2e8e3] bg-white px-2.5 text-xs font-bold text-[#29332D] hover:border-[#7C9473] hover:text-[#7C9473] transition-all active:scale-95 shadow-xs cursor-pointer"
          >
            <ShoppingBag className="size-3.5" />
            <span className="hidden sm:inline">Add</span>
          </button>

          <button
            type="button"
            onClick={() =>
              buyNow({
                id: product.id,
                name: title,
                slug,
                thumbnail: imageSrc,
                price: product.price,
                category: product.category,
              })
            }
            className="inline-flex h-8 items-center justify-center gap-1 rounded-lg bg-[#7C9473] px-2.5 text-xs font-bold text-white hover:bg-[#5A7052] transition-all active:scale-95 shadow-xs cursor-pointer shrink-0"
          >
            <span>Buy Now</span>
            <ArrowRight className="size-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;

