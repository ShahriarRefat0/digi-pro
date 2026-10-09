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
  ShoppingCart,
  Plus,
  Minus,
} from "lucide-react";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addToCart, buyNow } = useCart();
  const [quantity, setQuantity] = React.useState<number>(1);

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

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

  const cartProduct = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    thumbnail: product.thumbnail,
    price: product.price,
    category: product.category,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-10 pb-20 lg:pb-0"
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
              <span className="rounded-full border border-[#7C9473]/30 bg-[#7C9473]/10 px-3 py-1 text-xs font-semibold text-[#7C9473]">
                {product.category}
              </span>
              {product.version && (
                <span className="rounded-full border border-[#29332D]/10 bg-white px-3 py-1 text-xs text-[#29332D]/70">
                  v{product.version}
                </span>
              )}
              {product.featured && (
                <span className="rounded-full border border-[#F3E1DD] bg-[#F3E1DD]/50 px-3 py-1 text-xs font-semibold text-[#29332D]">
                  Careoff Special
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[#29332D] tracking-tight leading-tight">
              {product.name}
            </h1>

            <p className="mt-4 text-base sm:text-lg text-[#29332D]/80 leading-relaxed">
              {product.shortDescription}
            </p>
          </div>

          {/* Product Media Display */}
          {activeImage && activeImage !== "/images/placeholder.webp" && (
            <div className="space-y-3">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[#29332D]/10 bg-white shadow-sm">
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
                          ? "border-[#7C9473] ring-2 ring-[#7C9473]/20"
                          : "border-[#29332D]/10 opacity-60 hover:opacity-100"
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
          <div className="space-y-3 pt-4 border-t border-[#29332D]/10">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#29332D]/60 font-heading">
              Overview &amp; Product Details
            </h2>
            <div className="text-sm text-[#29332D]/90 leading-relaxed whitespace-pre-line bg-white rounded-2xl border border-[#29332D]/10 p-6 shadow-sm">
              {product.description}
            </div>
          </div>

          {/* Key Features List */}
          {product.features && product.features.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-[#29332D]/10">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#29332D]/60 font-heading">
                Key Care Benefits
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 rounded-xl border border-[#29332D]/10 bg-white p-3.5 text-xs text-[#29332D] shadow-sm"
                  >
                    <div className="size-4 rounded-full bg-[#7C9473]/10 text-[#7C9473] flex items-center justify-center shrink-0 mt-0.5">
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
            <div className="space-y-4 pt-4 border-t border-[#29332D]/10">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#29332D]/60 font-heading">
                What&apos;s Included in the Box
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.included.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 rounded-xl border border-[#29332D]/10 bg-white p-3.5 text-xs text-[#29332D] shadow-sm"
                  >
                    <FileCheck className="size-4 text-[#7C9473] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Requirements / Care Notes */}
          {product.requirements && product.requirements.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-[#29332D]/10">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#29332D]/60 font-heading">
                Usage Instructions &amp; Age Group
              </h2>
              <div className="flex flex-wrap gap-2">
                {product.requirements.map((req, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-[#29332D]/10 bg-white px-3.5 py-2 text-xs text-[#29332D]/80 shadow-sm"
                  >
                    <ShieldCheck className="size-3.5 text-[#7C9473]" />
                    <span>{req}</span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right 1 Col: Purchase Card & Action Buttons */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-[#29332D]/10 bg-white p-6 sm:p-7 shadow-md space-y-6 sticky top-24">
            {/* Price Header */}
            <div>
              <span className="text-xs font-semibold text-[#29332D]/60 uppercase tracking-wider block">
                Price
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-4xl font-extrabold font-mono text-[#29332D]">
                  ৳{product.price}
                </span>
                <span className="text-xs text-[#29332D]/60 font-mono">BDT</span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-2 pt-2 border-t border-[#29332D]/10">
              <label className="text-xs font-semibold text-[#29332D] uppercase tracking-wider block">
                Quantity
              </label>
              <div className="inline-flex items-center gap-3 rounded-full border border-[#29332D]/10 bg-[#FAF7F0] p-1">
                <button
                  type="button"
                  onClick={handleDecreaseQuantity}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                  className="size-8 rounded-full border border-[#29332D]/10 bg-white flex items-center justify-center text-[#29332D] hover:bg-[#FAF7F0] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  <Minus className="size-3.5" />
                </button>
                <span className="w-8 text-center text-sm font-bold font-mono text-[#29332D]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={handleIncreaseQuantity}
                  aria-label="Increase quantity"
                  className="size-8 rounded-full border border-[#29332D]/10 bg-white flex items-center justify-center text-[#29332D] hover:bg-[#FAF7F0] transition-colors cursor-pointer"
                >
                  <Plus className="size-3.5" />
                </button>
              </div>
            </div>

            {/* Action Buttons: Add to Cart & Buy Now */}
            <div className="space-y-2.5 pt-2">
              {/* Add to Cart */}
              <button
                type="button"
                onClick={() => addToCart(cartProduct, quantity)}
                className="w-full inline-flex h-12 items-center justify-center gap-2 rounded-full border-2 border-[#7C9473] bg-white px-6 text-sm font-bold text-[#7C9473] hover:bg-[#7C9473]/10 transition-all active:scale-[0.98] text-center cursor-pointer"
              >
                <ShoppingCart className="size-4" />
                <span>Add to Cart</span>
              </button>

              {/* Buy Now */}
              <button
                type="button"
                onClick={() => buyNow(cartProduct, quantity)}
                className="w-full inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#7C9473] px-6 text-sm font-bold text-white hover:bg-[#6b8262] transition-all shadow-md active:scale-[0.98] text-center cursor-pointer"
              >
                <span>Buy Now</span>
              </button>
            </div>

            {/* Guarantees */}
            <div className="space-y-3 pt-5 border-t border-[#29332D]/10 text-xs text-[#29332D]/70">
              <div className="flex items-center gap-2.5">
                <Zap className="size-4 text-[#7C9473] shrink-0" />
                <span>Fast &amp; reliable delivery</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="size-4 text-[#7C9473] shrink-0" />
                <span>100% Authentic products</span>
              </div>
              <div className="flex items-center gap-2.5">
                <RefreshCw className="size-4 text-[#7C9473] shrink-0" />
                <span>Easy returns &amp; customer support</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Purchase Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#29332D]/10 p-3 lg:hidden shadow-lg flex items-center justify-between gap-2">
        <div>
          <span className="text-[10px] text-[#29332D]/60 font-mono uppercase block">Price</span>
          <span className="text-lg font-bold font-mono text-[#29332D]">৳{product.price}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile Quantity selector compact */}
          <div className="inline-flex items-center border border-[#29332D]/10 rounded-full bg-[#FAF7F0] px-1 py-0.5">
            <button
              type="button"
              onClick={handleDecreaseQuantity}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
              className="size-7 rounded-full flex items-center justify-center text-[#29332D] disabled:opacity-30"
            >
              <Minus className="size-3" />
            </button>
            <span className="w-5 text-center text-xs font-bold text-[#29332D] font-mono">
              {quantity}
            </span>
            <button
              type="button"
              onClick={handleIncreaseQuantity}
              aria-label="Increase quantity"
              className="size-7 rounded-full flex items-center justify-center text-[#29332D]"
            >
              <Plus className="size-3" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => addToCart(cartProduct, quantity)}
            aria-label="Add to cart"
            className="inline-flex h-9 items-center justify-center rounded-full border border-[#7C9473] bg-white px-3 text-xs font-bold text-[#7C9473] active:scale-95"
          >
            <ShoppingCart className="size-3.5" />
          </button>

          <button
            type="button"
            onClick={() => buyNow(cartProduct, quantity)}
            className="inline-flex h-9 items-center justify-center rounded-full bg-[#7C9473] px-4 text-xs font-bold text-white hover:bg-[#6b8262] active:scale-95"
          >
            <span>Buy Now</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductDetailClient;
