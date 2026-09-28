"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Edit3,
  Trash2,
  Eye,
  ArrowUp,
  ArrowDown,
  CheckCircle2,
  XCircle,
  Calendar,
  Sparkles,
  Loader2,
  Plus,
  AlertTriangle,
} from "lucide-react";
import { HeroSlide } from "@/types/hero";
import { HeroSlidePreviewModal } from "./HeroSlidePreviewModal";
import {
  deleteHeroSlideAction,
  toggleHeroSlideAction,
  reorderHeroSlidesAction,
} from "@/app/actions/hero";

interface HeroSlidesTableProps {
  slides: HeroSlide[];
}

export function HeroSlidesTable({ slides: initialSlides }: HeroSlidesTableProps) {
  const router = useRouter();
  const [slides, setSlides] = React.useState<HeroSlide[]>(initialSlides);
  const [previewSlide, setPreviewSlide] = React.useState<HeroSlide | null>(null);
  const [deleteTarget, setDeleteTarget] = React.useState<HeroSlide | null>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [loadingId, setLoadingId] = React.useState<string | null>(null);

  React.useEffect(() => {
    setSlides(initialSlides);
  }, [initialSlides]);

  const handleToggleStatus = async (slide: HeroSlide) => {
    setLoadingId(slide.id);
    try {
      const res = await toggleHeroSlideAction(slide.id);
      if (res.success && res.data) {
        setSlides((prev) =>
          prev.map((s) => (s.id === slide.id ? { ...s, isActive: res.data!.isActive } : s))
        );
        toast.success(
          `Slide "${slide.title}" set to ${res.data.isActive ? "Active" : "Draft"}`
        );
        router.refresh();
      } else {
        toast.error(res.error || "Failed to update slide status");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to update slide status");
    } finally {
      setLoadingId(null);
    }
  };

  const handleMoveOrder = async (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === slides.length - 1)
    ) {
      return;
    }

    const newSlides = [...slides];
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    const temp = newSlides[index];
    newSlides[index] = newSlides[targetIdx];
    newSlides[targetIdx] = temp;

    // Re-assign order indices
    const updatedWithOrders = newSlides.map((s, idx) => ({ ...s, order: idx + 1 }));
    setSlides(updatedWithOrders);

    try {
      const orderedIds = updatedWithOrders.map((s) => s.id);
      const res = await reorderHeroSlidesAction(orderedIds);
      if (res.success) {
        toast.success("Slide order updated successfully");
        router.refresh();
      } else {
        toast.error(res.error || "Failed to save reordered position");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to save slide order");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);

    try {
      const res = await deleteHeroSlideAction(deleteTarget.id);
      if (res.success) {
        setSlides((prev) => prev.filter((s) => s.id !== deleteTarget.id));
        toast.success(`Deleted hero slide "${deleteTarget.title}"`);
        setDeleteTarget(null);
        router.refresh();
      } else {
        toast.error(res.error || "Failed to delete hero slide");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to delete hero slide");
    } finally {
      setIsDeleting(false);
    }
  };

  const formatScheduleRange = (startDate?: string | null, endDate?: string | null) => {
    if (!startDate && !endDate) return "Always Active";
    const startStr = startDate ? new Date(startDate).toLocaleDateString() : "Start";
    const endStr = endDate ? new Date(endDate).toLocaleDateString() : "End";
    return `${startStr} – ${endStr}`;
  };

  return (
    <div className="space-y-6">
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 font-heading">
            Homepage Hero Slides
          </h2>
          <p className="text-xs text-slate-500">
            Manage, activate, reorder, and schedule dynamic hero carousel banners.
          </p>
        </div>

        <Link
          href="/dashboard/hero/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F766E] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#115E59] transition-all shadow-xs"
        >
          <Plus className="size-4" />
          <span>Add Hero Slide</span>
        </Link>
      </div>

      {/* Table Container */}
      {slides.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center space-y-4">
          <div className="size-12 rounded-2xl bg-[#F0FDFA] border border-[#CCFBF1] text-[#0F766E] flex items-center justify-center mx-auto">
            <Sparkles className="size-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 font-heading">No Hero Slides Found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              You haven&apos;t added any hero slides yet. Create your first slide to display on the public homepage.
            </p>
          </div>
          <Link
            href="/dashboard/hero/new"
            className="inline-flex items-center gap-2 rounded-xl bg-[#0F766E] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#115E59] transition-all shadow-xs"
          >
            <Plus className="size-4" />
            <span>Create First Slide</span>
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4 w-12 text-center">Order</th>
                  <th className="py-3.5 px-4">Image</th>
                  <th className="py-3.5 px-4">Headline & Eyebrow</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Schedule</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {slides.map((slide, idx) => (
                  <tr
                    key={slide.id}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    {/* Order & Reorder Controls */}
                    <td className="py-4 px-3 text-center">
                      <div className="flex flex-col items-center justify-center gap-1">
                        <span className="font-mono font-bold text-slate-800 text-xs">
                          {idx + 1}
                        </span>
                        <div className="flex items-center gap-0.5">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => handleMoveOrder(idx, "up")}
                            title="Move Up"
                            className="size-5 rounded border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:text-[#0F766E] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                          >
                            <ArrowUp className="size-3" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === slides.length - 1}
                            onClick={() => handleMoveOrder(idx, "down")}
                            title="Move Down"
                            className="size-5 rounded border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:text-[#0F766E] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                          >
                            <ArrowDown className="size-3" />
                          </button>
                        </div>
                      </div>
                    </td>

                    {/* Image Thumbnail */}
                    <td className="py-4 px-4">
                      <div className="relative size-16 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                        <Image
                          src={slide.desktopImage.url || slide.mobileImage.url || "/images/placeholder.webp"}
                          alt={slide.title}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    </td>

                    {/* Title & Eyebrow */}
                    <td className="py-4 px-4 max-w-xs sm:max-w-md">
                      <div>
                        {slide.eyebrow && (
                          <span className="inline-block text-[10px] font-semibold text-[#0F766E] bg-[#F0FDFA] border border-[#CCFBF1] px-2 py-0.5 rounded-full mb-1">
                            {slide.eyebrow}
                          </span>
                        )}
                        <p className="font-bold text-slate-900 font-heading truncate">
                          {slide.title}
                        </p>
                        {slide.description && (
                          <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5 font-normal">
                            {slide.description}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Status Badge & Toggle */}
                    <td className="py-4 px-4">
                      <button
                        type="button"
                        disabled={loadingId === slide.id}
                        onClick={() => handleToggleStatus(slide)}
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold transition-all cursor-pointer ${
                          slide.isActive
                            ? "bg-[#F0FDFA] border-[#CCFBF1] text-[#0F766E] hover:bg-teal-100"
                            : "bg-slate-100 border-slate-200 text-slate-500 hover:bg-slate-200"
                        }`}
                      >
                        {loadingId === slide.id ? (
                          <Loader2 className="size-3 animate-spin" />
                        ) : slide.isActive ? (
                          <CheckCircle2 className="size-3" />
                        ) : (
                          <XCircle className="size-3" />
                        )}
                        <span>{slide.isActive ? "Active" : "Draft"}</span>
                      </button>
                    </td>

                    {/* Schedule */}
                    <td className="py-4 px-4 font-mono text-[11px] text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="size-3.5 text-slate-400 shrink-0" />
                        <span>{formatScheduleRange(slide.startDate, slide.endDate)}</span>
                      </div>
                    </td>

                    {/* Action Buttons */}
                    <td className="py-4 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        {/* Preview */}
                        <button
                          type="button"
                          onClick={() => setPreviewSlide(slide)}
                          title="Live Preview"
                          className="size-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:text-[#0F766E] hover:border-teal-200 hover:bg-[#F0FDFA] transition-all cursor-pointer shadow-xs"
                        >
                          <Eye className="size-4" />
                        </button>

                        {/* Edit */}
                        <Link
                          href={`/dashboard/hero/${slide.id}/edit`}
                          title="Edit Hero Slide"
                          className="size-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer shadow-xs"
                        >
                          <Edit3 className="size-4" />
                        </Link>

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(slide)}
                          title="Delete Hero Slide"
                          className="size-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 transition-all cursor-pointer shadow-xs"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewSlide && (
        <HeroSlidePreviewModal
          open={Boolean(previewSlide)}
          onClose={() => setPreviewSlide(null)}
          slide={previewSlide}
        />
      )}

      {/* Delete Confirmation Dialog */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="size-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center">
                <AlertTriangle className="size-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  Delete Hero Slide?
                </h3>
                <p className="text-xs text-slate-500">This action cannot be undone.</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to delete <strong className="text-slate-900">&quot;{deleteTarget.title}&quot;</strong>?
              This will permanently delete the slide from MongoDB and remove its associated Cloudflare R2 images.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setDeleteTarget(null)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDeleteConfirm}
                className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-700 cursor-pointer shadow-xs disabled:opacity-50"
              >
                {isDeleting ? <Loader2 className="size-3.5 animate-spin" /> : <Trash2 className="size-3.5" />}
                <span>Delete Permanently</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
