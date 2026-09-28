"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Save,
  Eye,
  ArrowLeft,
  Sparkles,
  Type,
  Image as ImageIcon,
  Link as LinkIcon,
  Calendar,
  Layers,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { HeroSlide, HeroImageReference } from "@/types/hero";
import { HeroImageUpload } from "./HeroImageUpload";
import { HeroSlidePreviewModal } from "./HeroSlidePreviewModal";
import { createHeroSlideAction, updateHeroSlideAction } from "@/app/actions/hero";

interface HeroSlideFormProps {
  initialData?: HeroSlide | null;
  isEdit?: boolean;
}

export function HeroSlideForm({ initialData, isEdit = false }: HeroSlideFormProps) {
  const router = useRouter();

  const [eyebrow, setEyebrow] = React.useState(initialData?.eyebrow || "");
  const [title, setTitle] = React.useState(initialData?.title || "");
  const [description, setDescription] = React.useState(initialData?.description || "");

  const [desktopImage, setDesktopImage] = React.useState<HeroImageReference>(
    initialData?.desktopImage || { url: "", key: "" }
  );
  const [mobileImage, setMobileImage] = React.useState<HeroImageReference>(
    initialData?.mobileImage || { url: "", key: "" }
  );

  const [primaryEnabled, setPrimaryEnabled] = React.useState(
    initialData?.primaryButton ? initialData.primaryButton.enabled : true
  );
  const [primaryText, setPrimaryText] = React.useState(
    initialData?.primaryButton?.text || "Shop Now"
  );
  const [primaryLink, setPrimaryLink] = React.useState(
    initialData?.primaryButton?.link || "/products"
  );

  const [secondaryEnabled, setSecondaryEnabled] = React.useState(
    initialData?.secondaryButton ? initialData.secondaryButton.enabled : false
  );
  const [secondaryText, setSecondaryText] = React.useState(
    initialData?.secondaryButton?.text || "Learn More"
  );
  const [secondaryLink, setSecondaryLink] = React.useState(
    initialData?.secondaryButton?.link || "/about"
  );

  const [order, setOrder] = React.useState<number>(
    typeof initialData?.order === "number" ? initialData.order : 1
  );
  const [isActive, setIsActive] = React.useState(
    initialData?.isActive !== undefined ? initialData.isActive : true
  );

  // Format dates for input type="datetime-local" or "date"
  const formatDateForInput = (dateStr?: string | null) => {
    if (!dateStr) return "";
    try {
      const d = new Date(dateStr);
      return d.toISOString().slice(0, 16);
    } catch {
      return "";
    }
  };

  const [startDate, setStartDate] = React.useState(formatDateForInput(initialData?.startDate));
  const [endDate, setEndDate] = React.useState(formatDateForInput(initialData?.endDate));

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formError, setFormError] = React.useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = React.useState<Record<string, string>>({});
  const [previewOpen, setPreviewOpen] = React.useState(false);

  const currentSlideState: Partial<HeroSlide> = {
    eyebrow,
    title,
    description,
    desktopImage,
    mobileImage,
    primaryButton: { enabled: primaryEnabled, text: primaryText, link: primaryLink },
    secondaryButton: { enabled: secondaryEnabled, text: secondaryText, link: secondaryLink },
    order,
    isActive,
    startDate: startDate || null,
    endDate: endDate || null,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFieldErrors({});

    // Client-side validations
    if (!title.trim()) {
      setFieldErrors({ title: "Title is required" });
      return;
    }
    if (!desktopImage.url || !desktopImage.key) {
      setFieldErrors({ desktopImage: "Desktop hero image is required" });
      return;
    }
    if (!mobileImage.url || !mobileImage.key) {
      setFieldErrors({ mobileImage: "Mobile hero image is required" });
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        eyebrow: eyebrow.trim(),
        title: title.trim(),
        description: description.trim(),
        desktopImage,
        mobileImage,
        primaryButton: {
          enabled: primaryEnabled,
          text: primaryText.trim(),
          link: primaryLink.trim(),
        },
        secondaryButton: {
          enabled: secondaryEnabled,
          text: secondaryText.trim(),
          link: secondaryLink.trim(),
        },
        order: Number(order) || 1,
        isActive,
        startDate: startDate ? new Date(startDate).toISOString() : null,
        endDate: endDate ? new Date(endDate).toISOString() : null,
      };

      const result = isEdit && initialData?.id
        ? await updateHeroSlideAction(initialData.id, payload)
        : await createHeroSlideAction(payload);

      if (!result.success) {
        setFormError(result.error || "Failed to save hero slide");
        if (result.fieldErrors) {
          setFieldErrors(result.fieldErrors);
        }
        toast.error(result.error || "Form validation failed");
        return;
      }

      toast.success(isEdit ? "Hero slide updated successfully!" : "Hero slide created successfully!");
      router.push("/dashboard/hero");
      router.refresh();
    } catch (err: any) {
      console.error("Submit error:", err);
      setFormError(err.message || "An unexpected error occurred");
      toast.error("Failed to save hero slide");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto pb-12">
        {/* Top Header & Quick Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <button
              type="button"
              onClick={() => router.push("/dashboard/hero")}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 mb-2 transition-colors cursor-pointer"
            >
              <ArrowLeft className="size-3.5" />
              <span>Back to Hero Slides</span>
            </button>
            <h1 className="text-2xl font-extrabold text-slate-900 font-heading">
              {isEdit ? "Edit Hero Slide" : "Create New Hero Slide"}
            </h1>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setPreviewOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer shadow-xs"
            >
              <Eye className="size-4 text-[#0F766E]" />
              <span>Live Preview</span>
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F766E] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#115E59] transition-all cursor-pointer shadow-sm disabled:opacity-50"
            >
              {isSubmitting ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Save className="size-4" />
              )}
              <span>{isEdit ? "Update Slide" : "Save Slide"}</span>
            </button>
          </div>
        </div>

        {formError && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 flex items-start gap-3 text-rose-800 text-xs font-medium">
            <AlertCircle className="size-4 shrink-0 mt-0.5 text-rose-600" />
            <div>
              <p className="font-bold">Error saving hero slide</p>
              <p className="mt-0.5">{formError}</p>
            </div>
          </div>
        )}

        {/* Section 1: Content */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
            <div className="size-8 rounded-xl bg-[#F0FDFA] border border-[#CCFBF1] text-[#0F766E] flex items-center justify-center">
              <Type className="size-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 font-heading">Hero Text Content</h2>
              <p className="text-xs text-slate-500">Eyebrow tag, primary headline, and description</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5">
            {/* Eyebrow */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Eyebrow Badge Tag <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                value={eyebrow}
                onChange={(e) => setEyebrow(e.target.value)}
                placeholder="e.g. Winter Baby Care or Newborn Essentials"
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-[#0F766E] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20"
              />
              <p className="text-[11px] text-slate-500 mt-1">Displays as a subtle pill badge above the title.</p>
            </div>

            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Headline Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Pure Care for Your Little One"
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-[#0F766E] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20"
              />
              {fieldErrors.title && (
                <p className="text-xs text-rose-600 mt-1 font-medium">{fieldErrors.title}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Sub-Description <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. Gentle everyday essentials made for your baby's delicate skin."
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-[#0F766E] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Cloudflare R2 Images */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
            <div className="size-8 rounded-xl bg-[#F0FDFA] border border-[#CCFBF1] text-[#0F766E] flex items-center justify-center">
              <ImageIcon className="size-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 font-heading">Cloudflare R2 Media Assets</h2>
              <p className="text-xs text-slate-500">Upload separate images for Desktop and Mobile compositions</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <HeroImageUpload
              label="Desktop Hero Image"
              variant="desktop"
              value={desktopImage}
              onChange={setDesktopImage}
              aspectHint="16:9 or 21:9 landscape (WEBP/PNG)"
              error={fieldErrors.desktopImage}
            />

            <HeroImageUpload
              label="Mobile Hero Image"
              variant="mobile"
              value={mobileImage}
              onChange={setMobileImage}
              aspectHint="4:3 or 16:9 optimized for mobile screens"
              error={fieldErrors.mobileImage}
            />
          </div>
        </div>

        {/* Section 3: Call-To-Action Buttons */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
            <div className="size-8 rounded-xl bg-[#F0FDFA] border border-[#CCFBF1] text-[#0F766E] flex items-center justify-center">
              <LinkIcon className="size-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 font-heading">Call-To-Action Buttons</h2>
              <p className="text-xs text-slate-500">Configure primary and optional secondary CTAs with safe internal/external URLs</p>
            </div>
          </div>

          {/* Primary CTA */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-900 cursor-pointer">
                <input
                  type="checkbox"
                  checked={primaryEnabled}
                  onChange={(e) => setPrimaryEnabled(e.target.checked)}
                  className="size-4 rounded border-slate-300 text-[#0F766E] focus:ring-[#0F766E]"
                />
                <span>Enable Primary Button</span>
              </label>
              <span className="text-[10px] font-mono text-[#0F766E] bg-[#F0FDFA] border border-[#CCFBF1] px-2 py-0.5 rounded-md">
                Primary CTA
              </span>
            </div>

            {primaryEnabled && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Button Text
                  </label>
                  <input
                    type="text"
                    value={primaryText}
                    onChange={(e) => setPrimaryText(e.target.value)}
                    placeholder="Shop Now"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-900 focus:border-[#0F766E] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Button Link / URL
                  </label>
                  <input
                    type="text"
                    value={primaryLink}
                    onChange={(e) => setPrimaryLink(e.target.value)}
                    placeholder="/products or https://..."
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-900 focus:border-[#0F766E] focus:outline-none font-mono"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Secondary CTA */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-900 cursor-pointer">
                <input
                  type="checkbox"
                  checked={secondaryEnabled}
                  onChange={(e) => setSecondaryEnabled(e.target.checked)}
                  className="size-4 rounded border-slate-300 text-[#0F766E] focus:ring-[#0F766E]"
                />
                <span>Enable Secondary Button</span>
              </label>
              <span className="text-[10px] font-mono text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-md">
                Optional Secondary
              </span>
            </div>

            {secondaryEnabled && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Button Text
                  </label>
                  <input
                    type="text"
                    value={secondaryText}
                    onChange={(e) => setSecondaryText(e.target.value)}
                    placeholder="Learn More"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-900 focus:border-[#0F766E] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Button Link / URL
                  </label>
                  <input
                    type="text"
                    value={secondaryLink}
                    onChange={(e) => setSecondaryLink(e.target.value)}
                    placeholder="/about or /journal/..."
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-900 focus:border-[#0F766E] focus:outline-none font-mono"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Section 4: Display Order, Active Status & Scheduling */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
            <div className="size-8 rounded-xl bg-[#F0FDFA] border border-[#CCFBF1] text-[#0F766E] flex items-center justify-center">
              <Calendar className="size-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 font-heading">Display & Scheduling Options</h2>
              <p className="text-xs text-slate-500">Order position, active state toggle, and optional start/end campaign dates</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Display Order */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Display Order Position
              </label>
              <input
                type="number"
                min={1}
                value={order}
                onChange={(e) => setOrder(parseInt(e.target.value) || 1)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-900 font-mono focus:border-[#0F766E] focus:outline-none"
              />
              <p className="text-[11px] text-slate-500 mt-1">Lower numbers appear first (e.g. 1, 2, 3)</p>
            </div>

            {/* Active Toggle */}
            <div className="flex flex-col justify-center">
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Slide Status
              </label>
              <button
                type="button"
                onClick={() => setIsActive(!isActive)}
                className={`w-full flex items-center justify-between rounded-xl border px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? "border-teal-300 bg-[#F0FDFA] text-[#0F766E]"
                    : "border-slate-200 bg-slate-100 text-slate-500"
                }`}
              >
                <span>{isActive ? "Published & Active" : "Draft / Inactive"}</span>
                <span
                  className={`size-2.5 rounded-full ${
                    isActive ? "bg-[#0F766E]" : "bg-slate-400"
                  }`}
                />
              </button>
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Start Date <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                type="datetime-local"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-900 font-mono focus:border-[#0F766E] focus:outline-none"
              />
            </div>

            {/* End Date */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                End Date <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-900 font-mono focus:border-[#0F766E] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => router.push("/dashboard/hero")}
            className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => setPreviewOpen(true)}
            className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-xs"
          >
            Live Preview
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-xl bg-[#0F766E] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#115E59] transition-all cursor-pointer shadow-sm disabled:opacity-50"
          >
            {isSubmitting ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Save className="size-4" />
            )}
            <span>{isEdit ? "Update Hero Slide" : "Save Hero Slide"}</span>
          </button>
        </div>
      </form>

      {/* Live Preview Modal */}
      <HeroSlidePreviewModal
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        slide={currentSlideState}
      />
    </>
  );
}
