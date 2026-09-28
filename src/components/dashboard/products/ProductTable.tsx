"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Package } from "lucide-react";
import { Product } from "@/types/product";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { ProductStatusBadge } from "./ProductStatusBadge";
import { ProductActions } from "./ProductActions";

interface ProductTableProps {
  products: Product[];
  onDeleteProduct?: (productId: string) => void;
}

function formatProductDateTime(dateStr?: string) {
  if (!dateStr) return { date: "—", time: "" };

  const d = new Date(dateStr);
  if (isNaN(d.getTime())) {
    return { date: dateStr, time: "" };
  }

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  let hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  const formattedHours = String(hours).padStart(2, "0");

  return {
    date: `${day}-${month}-${year}`,
    time: `${formattedHours}:${minutes} ${ampm}`,
  };
}

export function ProductTable({ products, onDeleteProduct }: ProductTableProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-xs">
        <div className="size-12 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400 mx-auto mb-4">
          <Package className="size-6" />
        </div>
        <h3 className="text-base font-bold text-gray-900 font-heading">No Products Found</h3>
        <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
          No care products matched your search criteria. Try adjusting your query or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-200 bg-[#F8FAFC] hover:bg-[#F8FAFC]">
              <TableHead className="w-[300px] text-gray-600 font-semibold">Product</TableHead>
              <TableHead className="text-gray-600 font-semibold">Category</TableHead>
              <TableHead className="text-gray-600 font-semibold">Price</TableHead>
              <TableHead className="text-gray-600 font-semibold">Status</TableHead>
              <TableHead className="text-gray-600 font-semibold">Updated</TableHead>
              <TableHead className="text-right text-gray-600 font-semibold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => {
              const dt = formatProductDateTime(product.updatedAt || product.createdAt);
              const formattedPrice = typeof product.price === "number" ? `৳${product.price}` : (String(product.price).startsWith("৳") ? String(product.price) : `৳${product.price}`);

              return (
                <TableRow
                  key={product.id}
                  className="border-gray-100 hover:bg-slate-50/80 transition-colors"
                >
                  {/* Product Name & Slug */}
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <div className="relative size-10 rounded-xl bg-[#F0FDFA] border border-teal-200 flex items-center justify-center text-[#0F766E] font-bold text-xs shrink-0 overflow-hidden">
                        {product.thumbnail &&
                        (product.thumbnail.startsWith("http://") ||
                          product.thumbnail.startsWith("https://") ||
                          product.thumbnail.startsWith("data:")) ? (
                          <Image
                            src={product.thumbnail}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          product.name.slice(0, 2).toUpperCase()
                        )}
                      </div>
                      <div>
                        <Link
                          href={`/dashboard/products/new?edit=${product.id}`}
                          className="font-bold text-gray-900 hover:text-[#0F766E] transition-colors font-heading text-sm"
                        >
                          {product.name}
                        </Link>
                        <p className="text-[11px] text-gray-400 truncate max-w-[200px]">
                          v{product.version} • /{product.slug}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  {/* Category */}
                  <TableCell>
                    <span className="inline-flex rounded-md bg-slate-100 border border-gray-200 px-2.5 py-1 text-[11px] font-semibold text-gray-700">
                      {product.category}
                    </span>
                  </TableCell>

                  {/* Price */}
                  <TableCell className="font-bold text-gray-900 text-sm font-heading">
                    {formattedPrice}
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <ProductStatusBadge status={product.status} />
                  </TableCell>

                  {/* Updated (Formatted Date & Time) */}
                  <TableCell className="text-xs">
                    <div className="flex flex-col space-y-0.5">
                      <span className="text-gray-700 font-medium">
                        Date: <span className="text-gray-900 font-semibold">{dt.date}</span>
                      </span>
                      {dt.time && (
                        <span className="text-[11px] text-gray-400">
                          Time: {dt.time}
                        </span>
                      )}
                    </div>
                  </TableCell>

                  {/* Action Dropdown */}
                  <TableCell className="text-right">
                    <ProductActions product={product} onDelete={onDeleteProduct} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default ProductTable;

