"use client";

import * as React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Product } from "@/types/product";
import { ProductFilters } from "@/components/dashboard/products/ProductFilters";
import { ProductTable } from "@/components/dashboard/products/ProductTable";

interface ManageProductsClientProps {
  initialProducts: Product[];
}

export function ManageProductsClient({ initialProducts }: ManageProductsClientProps) {
  const [products, setProducts] = React.useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");

  React.useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  const filteredProducts = React.useMemo(() => {
    return products.filter((p) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === "all" ? true : p.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [products, searchQuery, statusFilter]);

  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight font-heading text-gray-900">
            Manage Products
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 font-normal">
            Create, update, and manage your Careproff catalog products.
          </p>
        </div>

        <Link
          href="/dashboard/products/new"
          className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-[#0F766E] px-5 text-xs font-bold text-white hover:bg-[#115E59] transition-all shadow-xs shrink-0"
        >
          <Plus className="size-4" />
          <span>Add Product</span>
        </Link>
      </div>

      {/* Search & Filter Controls */}
      <ProductFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      {/* Product Table */}
      <ProductTable
        products={filteredProducts}
        onDeleteProduct={handleDeleteProduct}
      />
    </div>
  );
}

export default ManageProductsClient;

