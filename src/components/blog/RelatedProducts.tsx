"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, ExternalLink, Sparkles } from "lucide-react";

interface RelatedProductsProps {
  products: Product[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  const { addToCart } = useCart();

  if (!products || products.length === 0) return null;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 border-t border-slate-200">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="size-5 text-[#2D5536]" />
        <h3 className="text-xl font-bold font-heading text-slate-900">
          Products Mentioned in This Article
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-xs hover:border-[#A8CFB2] hover:shadow-md transition-all"
          >
            <div>
              {/* Product Thumbnail */}
              <Link
                href={`/products/${product.slug}`}
                className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-50 block mb-3 border border-slate-100"
              >
                <Image
                  src={product.thumbnail || "/images/placeholder.webp"}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </Link>

              {/* Title & Price */}
              <Link href={`/products/${product.slug}`}>
                <h4 className="text-sm font-bold text-slate-900 hover:text-[#2D5536] transition-colors line-clamp-1">
                  {product.name}
                </h4>
              </Link>

              <p className="text-xs text-slate-500 line-clamp-2 mt-1 mb-3">
                {product.shortDescription}
              </p>

              <div className="text-base font-extrabold font-mono text-slate-900 mb-4">
                ৳{product.price}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
              <Link
                href={`/products/${product.slug}`}
                className="inline-flex h-9 items-center justify-center gap-1 rounded-full border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <ExternalLink className="size-3" />
                <span>View</span>
              </Link>
              <button
                type="button"
                onClick={() =>
                  addToCart({
                    id: product.id,
                    name: product.name,
                    slug: product.slug,
                    thumbnail: product.thumbnail,
                    price: product.price,
                    category: product.category,
                  })
                }
                className="inline-flex h-9 items-center justify-center gap-1 rounded-full bg-[#A8CFB2] text-xs font-bold text-[#1C3A22] hover:brightness-95 active:scale-95 transition-all shadow-sm cursor-pointer"
              >
                <ShoppingCart className="size-3" />
                <span>Add</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RelatedProducts;
