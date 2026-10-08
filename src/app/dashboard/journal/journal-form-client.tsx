"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { JournalArticle, JOURNAL_CATEGORIES, JournalCategory } from "@/types/journal";
import { Product } from "@/types/product";
import { createJournalAction, updateJournalAction } from "@/app/actions/journal";
import { toast } from "sonner";
import {
  ArrowLeft,
  Loader2,
  Upload,
  CheckCircle2,
  Sparkles,
  BookOpen,
  ShoppingBag,
} from "lucide-react";

interface JournalFormClientProps {
  article?: JournalArticle;
  availableProducts: Product[];
}

export function JournalFormClient({ article, availableProducts }: JournalFormClientProps) {
  const router = useRouter();
  const isEditing = Boolean(article);

  const [title, setTitle] = React.useState(article?.title || "");
  const [slug, setSlug] = React.useState(article?.slug || "");
  const [category, setCategory] = React.useState<JournalCategory>(
    (article?.category as JournalCategory) || "Baby Care"
  );
  const [description, setDescription] = React.useState(article?.description || "");
  const [content, setContent] = React.useState(article?.content || "");
  const [author, setAuthor] = React.useState(article?.author || "Careproff Care Team");
  const [authorRole, setAuthorRole] = React.useState(
    article?.authorRole || "Pediatric & Maternal Care Experts"
  );
  const [readTime, setReadTime] = React.useState(article?.readTime || "5 min read");
  const [featured, setFeatured] = React.useState(article?.featured || false);
  const [status, setStatus] = React.useState<"published" | "draft">(
    article?.status || "published"
  );
  const [coverImage, setCoverImage] = React.useState(article?.coverImage || "");
  const [tagsInput, setTagsInput] = React.useState(
    article?.tags ? article.tags.join(", ") : ""
  );
  const [selectedProductIds, setSelectedProductIds] = React.useState<string[]>(
    article?.relatedProductIds || []
  );
  const [seoTitle, setSeoTitle] = React.useState(article?.seoTitle || "");
  const [seoDescription, setSeoDescription] = React.useState(article?.seoDescription || "");

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);

  // Auto-generate slug from title if not manually edited
  React.useEffect(() => {
    if (!isEditing && title) {
      setSlug(
        title
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "")
      );
    }
  }, [title, isEditing]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/hero/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await res.json();
      if (data.url) {
        setCoverImage(data.url);
        toast.success("Cover image uploaded!");
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Error uploading image. Please use an image URL instead.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleProductToggle = (productId: string) => {
    setSelectedProductIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !content.trim()) {
      toast.error("Please fill out all required fields.");
      return;
    }

    setIsSubmitting(true);
    const parsedTags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    try {
      if (isEditing && article) {
        const res = await updateJournalAction(article.id, {
          title,
          slug,
          category,
          description,
          content,
          author,
          authorRole,
          readTime,
          featured,
          status,
          coverImage,
          tags: parsedTags,
          relatedProductIds: selectedProductIds,
          seoTitle,
          seoDescription,
        });

        if (res.success) {
          toast.success("Journal article updated!");
          router.push("/dashboard/journal");
        } else {
          toast.error(res.error || "Failed to update journal article");
        }
      } else {
        const res = await createJournalAction({
          title,
          slug,
          category,
          description,
          content,
          author,
          authorRole,
          readTime,
          featured,
          status,
          coverImage,
          tags: parsedTags,
          relatedProductIds: selectedProductIds,
          seoTitle,
          seoDescription,
        });

        if (res.success) {
          toast.success("Journal article created!");
          router.push("/dashboard/journal");
        } else {
          toast.error(res.error || "Failed to create journal article");
        }
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-8 pb-16">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <Link
          href="/dashboard/journal"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="size-4" />
          <span>Back to Journal Articles</span>
        </Link>
        <span className="text-xs font-mono text-slate-400">
          {isEditing ? "Edit Article" : "Create New Article"}
        </span>
      </div>

      <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 tracking-tight">
        {isEditing ? `Edit: ${article?.title}` : "Add New Care Journal Article"}
      </h1>

      <div className="space-y-6">
        {/* Main Details Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm space-y-5">
          <h2 className="text-base font-bold font-heading text-slate-900 border-b border-slate-100 pb-3">
            Article Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Title */}
            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 block">
                Article Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. 10 Essential Winter Care Tips for Newborn Babies"
                className="w-full h-10 px-4 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:border-[#0F766E] focus:bg-white transition-colors"
              />
            </div>

            {/* Slug */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 block">
                URL Slug
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="winter-care-tips-newborn"
                className="w-full h-10 px-4 rounded-xl border border-slate-200 bg-slate-50 text-xs font-mono text-slate-900 focus:outline-none focus:border-[#0F766E] focus:bg-white transition-colors"
              />
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 block">
                Category <span className="text-rose-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as JournalCategory)}
                className="w-full h-10 px-4 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#0F766E] focus:bg-white transition-colors cursor-pointer"
              >
                {JOURNAL_CATEGORIES.filter((c) => c !== "All").map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Short Excerpt */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Short Summary / Excerpt <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Simple and practical ways to keep your newborn comfortable during colder months."
              className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:border-[#0F766E] focus:bg-white transition-colors resize-none"
            />
          </div>

          {/* Full Rich Content */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Article Body Content <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={10}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write or paste your article content here..."
              className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:border-[#0F766E] focus:bg-white transition-colors font-sans leading-relaxed"
            />
          </div>
        </div>

        {/* Media & Meta Settings */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm space-y-5">
          <h2 className="text-base font-bold font-heading text-slate-900 border-b border-slate-100 pb-3">
            Cover Image &amp; Publishing Options
          </h2>

          {/* Cover Image Upload / URL */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 block">
              Cover Image URL
            </label>
            <div className="flex flex-col sm:flex-row gap-3 items-stretch">
              <input
                type="url"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://images.unsplash.com/photo-..."
                className="flex-1 h-10 px-4 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:border-[#0F766E] focus:bg-white transition-colors"
              />
              <label className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-100 px-4 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer shrink-0">
                {isUploading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Upload className="size-4 text-[#0F766E]" />
                )}
                <span>{isUploading ? "Uploading..." : "Upload Cover Image"}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                  className="hidden"
                />
              </label>
            </div>

            {coverImage && (
              <div className="relative aspect-[16/9] max-w-sm rounded-xl overflow-hidden border border-slate-200 mt-3">
                <Image
                  src={coverImage}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {/* Author */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 block">
                Author Name
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full h-10 px-4 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900"
              />
            </div>

            {/* Read Time */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 block">
                Reading Time
              </label>
              <input
                type="text"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                placeholder="5 min read"
                className="w-full h-10 px-4 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900"
              />
            </div>

            {/* Status */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 block">
                Publish Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as "published" | "draft")}
                className="w-full h-10 px-4 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-900 cursor-pointer"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-1.5 pt-2">
            <label className="text-xs font-semibold text-slate-700 block">
              Tags (Comma separated)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="Newborn, Winter Care, Skin Care"
              className="w-full h-10 px-4 rounded-xl border border-slate-200 bg-slate-50 text-xs font-mono text-slate-900"
            />
          </div>

          {/* Featured checkbox */}
          <div className="pt-2">
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="size-4 text-[#0F766E] accent-[#0F766E] rounded"
              />
              <span className="text-xs font-bold text-slate-900">
                Set as Featured Article on Journal Homepage
              </span>
            </label>
          </div>
        </div>

        {/* Section 14: Related Products Selector */}
        {availableProducts.length > 0 && (
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <ShoppingBag className="size-4 text-[#0F766E]" />
              <h2 className="text-base font-bold font-heading text-slate-900">
                Products Mentioned in This Article
              </h2>
            </div>
            <p className="text-xs text-slate-500">
              Select Careproff products to display alongside this educational article.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-60 overflow-y-auto pr-1">
              {availableProducts.map((p) => {
                const isSelected = selectedProductIds.includes(p.id);
                return (
                  <label
                    key={p.id}
                    className={`flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? "border-[#0F766E] bg-teal-50/50 ring-1 ring-[#0F766E]/20"
                        : "border-slate-200 bg-slate-50 hover:bg-white"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleProductToggle(p.id)}
                      className="size-4 text-[#0F766E] accent-[#0F766E] rounded"
                    />
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-slate-900 block truncate">
                        {p.name}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">
                        ৳{p.price}
                      </span>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Link
            href="/dashboard/journal"
            className="px-6 py-2.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#0F766E] px-8 text-xs font-bold text-white hover:bg-[#115E59] disabled:opacity-50 transition-all shadow-md shadow-teal-900/10 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="size-4" />
                <span>{isEditing ? "Update Article" : "Save Article"}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
