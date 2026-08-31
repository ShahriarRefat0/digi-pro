"use client";

import * as React from "react";
import Link from "next/link";
import { Package, ExternalLink } from "lucide-react";
import { Product } from "@/lib/products";
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

export function ProductTable({ products, onDeleteProduct }: ProductTableProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-12 text-center">
        <div className="size-12 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-500 mx-auto mb-4">
          <Package className="size-6" />
        </div>
        <h3 className="text-base font-bold text-white font-heading">No Products Found</h3>
        <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto">
          No digital products matched your search filter criteria. Try adjusting your query or clear filters.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-950 shadow-xl overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-neutral-800 hover:bg-transparent">
              <TableHead className="w-[300px] text-neutral-400">Product</TableHead>
              <TableHead className="text-neutral-400">Category</TableHead>
              <TableHead className="text-neutral-400">Price</TableHead>
              <TableHead className="text-neutral-400">Status</TableHead>
              <TableHead className="text-neutral-400">Updated</TableHead>
              <TableHead className="text-right text-neutral-400">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                className="border-neutral-800/60 hover:bg-neutral-900/40 transition-colors"
              >
                {/* Product Name & Slug */}
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#EEF35F] font-bold text-xs shrink-0">
                      {product.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <Link
                        href={`/dashboard/products/new?edit=${product.id}`}
                        className="font-bold text-white hover:text-[#EEF35F] transition-colors font-heading text-sm"
                      >
                        {product.name}
                      </Link>
                      <p className="text-[11px] font-mono text-neutral-500 truncate max-w-[200px]">
                        v{product.version} • /{product.slug}
                      </p>
                    </div>
                  </div>
                </TableCell>

                {/* Category */}
                <TableCell>
                  <span className="inline-flex rounded-md bg-neutral-900 border border-neutral-800 px-2.5 py-1 text-[11px] font-mono text-neutral-300">
                    {product.category}
                  </span>
                </TableCell>

                {/* Price */}
                <TableCell className="font-mono font-bold text-white text-sm">
                  ${product.price}
                </TableCell>

                {/* Status */}
                <TableCell>
                  <ProductStatusBadge status={product.status} />
                </TableCell>

                {/* Updated */}
                <TableCell className="text-xs font-mono text-neutral-400">
                  {product.updatedAt}
                </TableCell>

                {/* Action Dropdown */}
                <TableCell className="text-right">
                  <ProductActions product={product} onDelete={onDeleteProduct} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default ProductTable;
