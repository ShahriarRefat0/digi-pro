import * as React from "react";
import { getProductById } from "@/lib/products/product.repository";
import { ProductForm } from "@/components/dashboard/products/ProductForm";

export const dynamic = "force-dynamic";

interface AddProductPageProps {
  searchParams: Promise<{ edit?: string }>;
}

export default async function AddProductPage({ searchParams }: AddProductPageProps) {
  const { edit: editId } = await searchParams;
  const productToEdit = editId ? await getProductById(editId) : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-6 border-b border-neutral-900">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-heading text-white">
          {productToEdit ? `Edit Product: ${productToEdit.name}` : "Add Product"}
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 mt-1 font-normal">
          {productToEdit
            ? "Update product information, pricing, and metadata in MongoDB."
            : "Create a new digital product package in MongoDB."}
        </p>
      </div>

      {/* Multi-Section Form */}
      <ProductForm initialData={productToEdit} />
    </div>
  );
}
