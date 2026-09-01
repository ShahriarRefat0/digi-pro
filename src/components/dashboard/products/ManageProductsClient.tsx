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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-900">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-heading text-white">
            Manage Products
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 font-normal">
            Create, update, and manage your digital products catalog.
          </p>
        </div>

        <Link
          href="/dashboard/products/new"
          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full bg-[#EEF35F] px-5 text-xs font-bold text-black hover:bg-[#e5ea4e] hover:shadow-[0_0_15px_rgba(238,243,95,0.3)] transition-all shadow-sm shrink-0"
        >
          <Plus className="size-3.5" />
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
