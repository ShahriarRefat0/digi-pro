"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  FolderTree,
  Plus,
  Search,
  Eye,
  EyeOff,
  Edit2,
  Trash2,
  Check,
  X,
  AlertCircle,
  Loader2,
  LayoutList,
  Sparkles,
  ArrowUpDown,
} from "lucide-react";
import { Category } from "@/types/category";
import {
  createCategoryAction,
  updateCategoryAction,
  deleteCategoryAction,
  toggleCategoryActiveAction,
  toggleCategoryNavbarAction,
} from "@/app/actions/categories";
import { toast } from "sonner";

interface CategoriesAdminClientProps {
  initialCategories: Category[];
}

export function CategoriesAdminClient({ initialCategories }: CategoriesAdminClientProps) {
  const router = useRouter();
  const [categories, setCategories] = React.useState<Category[]>(initialCategories);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingCategory, setEditingCategory] = React.useState<Category | null>(null);

  // Form State
  const [name, setName] = React.useState("");
  const [slug, setSlug] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [image, setImage] = React.useState("");
  const [parentId, setParentId] = React.useState<string | null>(null);
  const [isActive, setIsActive] = React.useState(true);
  const [showInNavbar, setShowInNavbar] = React.useState(true);
  const [sortOrder, setSortOrder] = React.useState<number>(0);

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [deleteLoadingId, setDeleteLoadingId] = React.useState<string | null>(null);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  // Update local state when server props update
  React.useEffect(() => {
    setCategories(initialCategories);
  }, [initialCategories]);

  const resetForm = () => {
    setName("");
    setSlug("");
    setDescription("");
    setImage("");
    setParentId(null);
    setIsActive(true);
    setShowInNavbar(true);
    setSortOrder(categories.length + 1);
    setEditingCategory(null);
    setErrorMsg(null);
  };

  const handleOpenCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (cat: Category) => {
    setEditingCategory(cat);
    setName(cat.name);
    setSlug(cat.slug);
    setDescription(cat.description || "");
    setImage(cat.image || "");
    setParentId(cat.parentId || null);
    setIsActive(cat.isActive);
    setShowInNavbar(cat.showInNavbar);
    setSortOrder(cat.sortOrder || 0);
    setErrorMsg(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg("Category name is required.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const payload = {
        name: name.trim(),
        slug: slug.trim() || undefined,
        description: description.trim(),
        image: image.trim(),
        parentId: parentId || null,
        isActive,
        showInNavbar,
        sortOrder: Number(sortOrder) || 0,
      };

      if (editingCategory) {
        const res = await updateCategoryAction(editingCategory.id, payload);
        if (res.success && res.data) {
          toast.success(`Category "${res.data.name}" updated successfully.`);
          setIsModalOpen(false);
          resetForm();
          router.refresh();
        } else {
          setErrorMsg(res.error || "Failed to update category.");
        }
      } else {
        const res = await createCategoryAction(payload);
        if (res.success && res.data) {
          toast.success(`Category "${res.data.name}" created successfully.`);
          setIsModalOpen(false);
          resetForm();
          router.refresh();
        } else {
          setErrorMsg(res.error || "Failed to create category.");
        }
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleActive = async (cat: Category) => {
    const newStatus = !cat.isActive;
    try {
      const res = await toggleCategoryActiveAction(cat.id, newStatus);
      if (res.success) {
        toast.success(`"${cat.name}" is now ${newStatus ? "Active" : "Inactive"}.`);
        router.refresh();
      } else {
        toast.error(res.error || "Failed to toggle status.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error toggling active status.");
    }
  };

  const handleToggleNavbar = async (cat: Category) => {
    const newVisibility = !cat.showInNavbar;
    try {
      const res = await toggleCategoryNavbarAction(cat.id, newVisibility);
      if (res.success) {
        toast.success(`"${cat.name}" navbar display: ${newVisibility ? "Enabled" : "Disabled"}.`);
        router.refresh();
      } else {
        toast.error(res.error || "Failed to toggle navbar visibility.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error toggling navbar visibility.");
    }
  };

  const handleDelete = async (cat: Category) => {
    if (!confirm(`Are you sure you want to delete category "${cat.name}"?`)) {
      return;
    }

    setDeleteLoadingId(cat.id);
    try {
      const res = await deleteCategoryAction(cat.id);
      if (res.success) {
        toast.success(`Category "${cat.name}" deleted.`);
        router.refresh();
      } else {
        alert(res.error || "Failed to delete category.");
        toast.error(res.error || "Failed to delete category.");
      }
    } catch (err: any) {
      console.error(err);
      toast.error("An error occurred while deleting.");
    } finally {
      setDeleteLoadingId(null);
    }
  };

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="size-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search categories by name or slug..."
            className="w-full h-10 pl-10 pr-4 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E]"
          />
        </div>

        {/* Add Category CTA */}
        <button
          type="button"
          onClick={handleOpenCreateModal}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#0F766E] px-5 text-xs font-bold text-white hover:bg-[#115E59] transition-all shadow-xs cursor-pointer"
        >
          <Plus className="size-4" />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Categories Table / List */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        {filteredCategories.length === 0 ? (
          <div className="p-12 text-center text-gray-500 space-y-3">
            <FolderTree className="size-10 text-gray-300 mx-auto" />
            <p className="text-sm font-semibold text-gray-700">No categories found</p>
            <p className="text-xs text-gray-400">
              {searchQuery ? "Try a different search query." : "Click Add New Category to get started."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-700">
              <thead className="bg-gray-50/80 border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3.5">Order</th>
                  <th className="px-5 py-3.5">Category Name</th>
                  <th className="px-5 py-3.5">Slug</th>
                  <th className="px-5 py-3.5">Parent Category</th>
                  <th className="px-5 py-3.5 text-center">Active</th>
                  <th className="px-5 py-3.5 text-center">Navbar</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {filteredCategories.map((cat) => {
                  const parentCategory = categories.find((c) => c.id === cat.parentId);

                  return (
                    <tr key={cat.id} className="hover:bg-slate-50/70 transition-colors">
                      {/* Sort order badge */}
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1 font-mono font-bold text-gray-700">
                          <ArrowUpDown className="size-3 text-gray-400" />
                          <span>{cat.sortOrder}</span>
                        </span>
                      </td>

                      {/* Name */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2.5">
                          <div className="size-8 rounded-lg bg-[#F0FDFA] border border-teal-200 flex items-center justify-center text-[#0F766E] shrink-0">
                            <FolderTree className="size-4" />
                          </div>
                          <div>
                            <span className="font-bold text-gray-900 block">{cat.name}</span>
                            {cat.description && (
                              <span className="text-[11px] text-gray-400 font-normal line-clamp-1">
                                {cat.description}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Slug */}
                      <td className="px-5 py-4 font-mono text-gray-500">{cat.slug}</td>

                      {/* Parent Category */}
                      <td className="px-5 py-4">
                        {parentCategory ? (
                          <span className="inline-flex items-center rounded-full bg-slate-100 border border-slate-200 px-2.5 py-0.5 text-[11px] text-slate-700 font-medium">
                            {parentCategory.name}
                          </span>
                        ) : (
                          <span className="text-gray-400 text-[11px]">— Root —</span>
                        )}
                      </td>

                      {/* Active Switch */}
                      <td className="px-5 py-4 text-center">
                        <button
                          type="button"
                          onClick={() => handleToggleActive(cat)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                            cat.isActive
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-gray-100 text-gray-500 border border-gray-200"
                          }`}
                        >
                          {cat.isActive ? <Check className="size-3" /> : <X className="size-3" />}
                          <span>{cat.isActive ? "Active" : "Hidden"}</span>
                        </button>
                      </td>

                      {/* Navbar Switch */}
                      <td className="px-5 py-4 text-center">
                        <button
                          type="button"
                          onClick={() => handleToggleNavbar(cat)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                            cat.showInNavbar
                              ? "bg-teal-50 text-[#0F766E] border border-teal-200"
                              : "bg-gray-100 text-gray-500 border border-gray-200"
                          }`}
                        >
                          {cat.showInNavbar ? <Eye className="size-3" /> : <EyeOff className="size-3" />}
                          <span>{cat.showInNavbar ? "Visible" : "Off"}</span>
                        </button>
                      </td>

                      {/* Action buttons */}
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleOpenEditModal(cat)}
                            className="size-8 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:text-[#0F766E] hover:border-teal-200 hover:bg-teal-50 transition-colors cursor-pointer"
                            title="Edit Category"
                          >
                            <Edit2 className="size-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(cat)}
                            disabled={deleteLoadingId === cat.id}
                            className="size-8 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-400 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 transition-colors disabled:opacity-50 cursor-pointer"
                            title="Delete Category"
                          >
                            {deleteLoadingId === cat.id ? (
                              <Loader2 className="size-3.5 animate-spin text-rose-600" />
                            ) : (
                              <Trash2 className="size-3.5" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create / Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-lg w-full border border-gray-200 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="size-9 rounded-xl bg-[#F0FDFA] border border-teal-200 text-[#0F766E] flex items-center justify-center">
                  <FolderTree className="size-5" />
                </div>
                <h3 className="text-base font-bold font-heading text-gray-900">
                  {editingCategory ? "Edit Category" : "Create New Category"}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="size-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>

            {errorMsg && (
              <div className="p-3.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="size-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Category Name */}
              <div className="space-y-1.5">
                <label className="font-bold text-gray-800 block">
                  Category Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Baby Essentials"
                  className="w-full h-10 px-3.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] focus:bg-white transition-colors"
                />
              </div>

              {/* Slug */}
              <div className="space-y-1.5">
                <label className="font-bold text-gray-800 block">
                  URL Slug (Optional - auto-generated if left empty)
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="e.g. baby-essentials"
                  className="w-full h-10 px-3.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 font-mono focus:outline-none focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] focus:bg-white transition-colors"
                />
              </div>

              {/* Parent Category */}
              <div className="space-y-1.5">
                <label className="font-bold text-gray-800 block">Parent Category (Optional)</label>
                <select
                  value={parentId || ""}
                  onChange={(e) => setParentId(e.target.value || null)}
                  className="w-full h-10 px-3.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] focus:bg-white transition-colors"
                >
                  <option value="">None (Top-level Category)</option>
                  {categories
                    .filter((c) => !editingCategory || c.id !== editingCategory.id)
                    .map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                </select>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="font-bold text-gray-800 block">Description (Optional)</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief overview of this product category..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] focus:bg-white transition-colors resize-none"
                />
              </div>

              {/* Sort Order */}
              <div className="space-y-1.5">
                <label className="font-bold text-gray-800 block">Display Order (Sort Order)</label>
                <input
                  type="number"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(Number(e.target.value))}
                  placeholder="0"
                  className="w-full h-10 px-3.5 rounded-xl border border-gray-200 bg-gray-50 font-mono text-gray-900 focus:outline-none focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] focus:bg-white transition-colors"
                />
              </div>

              {/* Toggles: Active & Show in Navbar */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <label className="flex items-center gap-2 p-3 rounded-xl border border-gray-200 bg-gray-50 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="size-4 text-[#0F766E] accent-[#0F766E]"
                  />
                  <div>
                    <span className="font-bold text-gray-900 block">Active Status</span>
                    <span className="text-[10px] text-gray-500">Show in storefront</span>
                  </div>
                </label>

                <label className="flex items-center gap-2 p-3 rounded-xl border border-gray-200 bg-gray-50 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={showInNavbar}
                    onChange={(e) => setShowInNavbar(e.target.checked)}
                    className="size-4 text-[#0F766E] accent-[#0F766E]"
                  />
                  <div>
                    <span className="font-bold text-gray-900 block">Show in Navbar</span>
                    <span className="text-[10px] text-gray-500">Header navigation</span>
                  </div>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-full bg-[#0F766E] hover:bg-[#115E59] text-white font-bold transition-all shadow-xs disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>{editingCategory ? "Update Category" : "Save Category"}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
