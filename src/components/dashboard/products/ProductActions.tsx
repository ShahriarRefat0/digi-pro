"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MoreHorizontal, Eye, Edit, Trash2, AlertTriangle, Loader2 } from "lucide-react";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { deleteProductAction } from "@/app/actions/products";

interface ProductActionsProps {
  product: Product;
  onDelete?: (productId: string) => void;
}

export function ProductActions({ product, onDelete }: ProductActionsProps) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [deleteError, setDeleteError] = React.useState<string | null>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);

  // Close popup when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    setDeleteError(null);

    try {
      const res = await deleteProductAction(product.id);
      if (!res.success) {
        setDeleteError(res.error || "Failed to delete product.");
        setIsDeleting(false);
        return;
      }

      setShowDeleteModal(false);
      setMenuOpen(false);
      setIsDeleting(false);

      if (onDelete) {
        onDelete(product.id);
      } else {
        router.refresh();
      }
    } catch {
      setDeleteError("Failed to delete product. Please try again.");
      setIsDeleting(false);
    }
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <Button
        variant="ghost"
        size="icon-xs"
        onClick={() => setMenuOpen(!menuOpen)}
        className="size-8 rounded-lg border border-transparent hover:border-gray-200 hover:bg-gray-100 text-gray-600 hover:text-gray-900 cursor-pointer"
        aria-label="Product actions"
      >
        <MoreHorizontal className="size-4" />
      </Button>

      {/* Action Dropdown Menu */}
      {menuOpen && (
        <div className="absolute right-0 top-full mt-1.5 w-44 z-50 rounded-xl border border-gray-200 bg-white p-1.5 shadow-xl">
          <Link
            href={`/products/${product.slug}`}
            target="_blank"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 w-full rounded-lg px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-[#F0FDFA] hover:text-[#0F766E] transition-colors"
          >
            <Eye className="size-3.5 text-gray-500" />
            <span>View Public</span>
          </Link>

          <Link
            href={`/dashboard/products/new?edit=${product.id}`}
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 w-full rounded-lg px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-[#F0FDFA] hover:text-[#0F766E] transition-colors"
          >
            <Edit className="size-3.5 text-gray-500" />
            <span>Edit Product</span>
          </Link>

          <div className="my-1 border-t border-gray-100" />

          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              setShowDeleteModal(true);
            }}
            className="flex items-center gap-2 w-full rounded-lg px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
          >
            <Trash2 className="size-3.5" />
            <span>Delete Product</span>
          </button>
        </div>
      )}

      {/* Delete Confirmation Alert Dialog Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl space-y-4 text-gray-900">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="size-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-gray-900 font-heading">
                  Delete Product?
                </h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  Are you sure you want to delete &ldquo;{product.name}&rdquo;?
                </p>
              </div>
            </div>

            <p className="text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-xl p-3">
              This action cannot be undone. This will permanently remove the product and its data from the database.
            </p>

            {deleteError && (
              <p className="text-xs text-rose-600 bg-rose-50 border border-rose-200 rounded-xl p-2.5">
                {deleteError}
              </p>
            )}

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setShowDeleteModal(false)}
                className="rounded-full border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDeleteConfirm}
                className="inline-flex items-center gap-1.5 rounded-full bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-700 transition-colors cursor-pointer disabled:opacity-50 shadow-xs"
              >
                {isDeleting && <Loader2 className="size-3.5 animate-spin" />}
                <span>{isDeleting ? "Deleting..." : "Delete Product"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductActions;

