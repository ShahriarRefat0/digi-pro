"use client";

import * as React from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { INITIAL_PRODUCTS } from "@/lib/products";
import { ProductForm } from "@/components/dashboard/products/ProductForm";
import { Loader2 } from "lucide-react";

function AddProductContent() {
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const productToEdit = React.useMemo(() => {
    if (!editId) return null;
    return INITIAL_PRODUCTS.find((p) => p.id === editId) || null;
  }, [editId]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-6 border-b border-neutral-900">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-heading text-white">
          {productToEdit ? `Edit Product: ${productToEdit.name}` : "Add Product"}
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 mt-1 font-normal">
          {productToEdit
            ? "Update product information, pricing, and metadata."
            : "Create a new digital product package."}
        </p>
      </div>

      {/* Multi-Section Form */}
      <ProductForm initialData={productToEdit} />
    </div>
  );
}

export default function AddProductPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20 text-neutral-400 gap-2">
          <Loader2 className="size-5 animate-spin text-[#EEF35F]" />
          <span className="text-xs font-mono">Loading form...</span>
        </div>
      }
    >
      <AddProductContent />
    </Suspense>
  );
}
