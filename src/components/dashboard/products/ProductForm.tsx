"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plus,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ExternalLink,
  Tag,
  Layers,
  Sparkles,
} from "lucide-react";
import {
  Product,
  ProductCategory,
  PRODUCT_CATEGORIES,
} from "@/types/product";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { createProductAction, updateProductAction } from "@/app/actions/products";
import { ProductImageUpload } from "@/components/products/ProductImageUpload";
import { ProductGalleryUpload } from "@/components/products/ProductGalleryUpload";

interface ProductFormProps {
  initialData?: Product | null;
}

export function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter();
  const isEditing = Boolean(initialData?.id);

  const [formData, setFormData] = React.useState({
    name: initialData?.name || "",
    slug: initialData?.slug || "",
    shortDescription: initialData?.shortDescription || "",
    description: initialData?.description || "",
    price: initialData?.price !== undefined ? String(initialData.price) : "49",
    category: (initialData?.category || "SaaS Starters") as ProductCategory,
    thumbnail: initialData?.thumbnail || "",
    thumbnailPublicId: initialData?.thumbnailPublicId || "",
    images: initialData?.images || [],
    imagePublicIds: initialData?.imagePublicIds || [],
    features: initialData?.features || [
      "Next.js 16 App Router",
      "TypeScript & Tailwind CSS v4",
      "Modular Component System",
    ],
    technologies: initialData?.technologies || [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
    ],
    included: initialData?.included || [
      "Full Source Code",
      "Documentation & Setup Guide",
      "Free Lifetime Updates",
    ],
    requirements: initialData?.requirements || ["Node.js 20+", "pnpm / npm"],
    demoUrl: initialData?.demoUrl || "",
    documentationUrl: initialData?.documentationUrl || "",
    purchaseUrl: initialData?.purchaseUrl || "",
    version: initialData?.version || "1.0.0",
    status: (initialData?.status || "published") as "published" | "draft",
    featured: initialData?.featured ?? true,
    tags: initialData?.tags || ["nextjs", "saas", "template"],
  });

  // Track if admin manually modified the slug to prevent auto-overwriting
  const [isSlugManual, setIsSlugManual] = React.useState(Boolean(initialData?.slug));

  // Input states for tag/list additions
  const [newFeature, setNewFeature] = React.useState("");
  const [newTech, setNewTech] = React.useState("");
  const [newIncluded, setNewIncluded] = React.useState("");
  const [newRequirement, setNewRequirement] = React.useState("");
  const [newTag, setNewTag] = React.useState("");

  const [isUploadingImage, setIsUploadingImage] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [serverErrorMessage, setServerErrorMessage] = React.useState<string | null>(null);
  const [submitState, setSubmitState] = React.useState<"idle" | "saving" | "success">("idle");

  // Slug generator
  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  // Auto-generate slug from name if not manually set
  const handleNameChange = (name: string) => {
    setFormData((prev) => ({
      ...prev,
      name,
      slug: !isSlugManual ? slugify(name) : prev.slug,
    }));
    if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
    if (!isSlugManual && errors.slug) setErrors((prev) => ({ ...prev, slug: "" }));
  };

  const handleSlugChange = (rawSlug: string) => {
    setIsSlugManual(true);
    const formatted = rawSlug.toLowerCase().replace(/[^\w-]/g, "");
    setFormData((prev) => ({ ...prev, slug: formatted }));
    if (errors.slug) setErrors((prev) => ({ ...prev, slug: "" }));
  };

  // --- Dynamic Array Helpers ---
  const addItem = (
    value: string,
    field: "features" | "technologies" | "included" | "requirements" | "tags",
    setValue: (v: string) => void,
    normalizeLower = false
  ) => {
    const trimmed = normalizeLower ? value.trim().toLowerCase() : value.trim();
    if (!trimmed) return;
    if (formData[field].includes(trimmed)) {
      setValue("");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], trimmed],
    }));
    setValue("");
  };

  const removeItem = (
    field: "features" | "technologies" | "included" | "requirements" | "tags",
    index: number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, idx) => idx !== index),
    }));
  };

  // Client validation
  const validate = (targetStatus: "published" | "draft") => {
    const errs: Record<string, string> = {};

    if (!formData.name.trim()) errs.name = "Product name is required";
    else if (formData.name.trim().length < 2) errs.name = "Product name must be at least 2 characters";

    if (!formData.slug.trim()) errs.slug = "URL slug is required";
    else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(formData.slug.trim())) {
      errs.slug = "Slug must be lowercase alphanumeric with hyphens (e.g. saas-starter-kit)";
    }

    if (!formData.shortDescription.trim()) errs.shortDescription = "Short description is required";
    else if (formData.shortDescription.trim().length < 5) errs.shortDescription = "Short description must be at least 5 characters";

    if (!formData.description.trim()) errs.description = "Detailed description is required";
    else if (formData.description.trim().length < 10) errs.description = "Detailed description must be at least 10 characters";

    const parsedPrice = Number(formData.price);
    if (formData.price === "" || isNaN(parsedPrice) || parsedPrice < 0) {
      errs.price = "Valid price >= 0 is required";
    }

    const isValidHttp = (url: string) => {
      if (!url.trim()) return true;
      try {
        const parsed = new URL(url.trim());
        return parsed.protocol === "http:" || parsed.protocol === "https:";
      } catch {
        return false;
      }
    };

    if (!isValidHttp(formData.demoUrl)) {
      errs.demoUrl = "Live Demo must be a valid URL starting with http:// or https:// (or leave blank)";
    }
    if (!isValidHttp(formData.documentationUrl)) {
      errs.documentationUrl = "Documentation must be a valid URL starting with http:// or https:// (or leave blank)";
    }
    if (formData.purchaseUrl.trim() && !isValidHttp(formData.purchaseUrl)) {
      errs.purchaseUrl = "Purchase / Checkout URL must be a valid URL starting with http:// or https://";
    }

    if (targetStatus === "published") {
      if (!formData.thumbnail.trim()) {
        errs.thumbnail = "A cover thumbnail is required before publishing.";
      }
      if (!formData.purchaseUrl.trim()) {
        errs.purchaseUrl = "Purchase / Checkout URL is required for published products.";
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (targetStatus?: "published" | "draft") => {
    setServerErrorMessage(null);
    const finalStatus = targetStatus || formData.status;

    if (isUploadingImage) {
      setServerErrorMessage("Please wait for image uploads to Cloudinary to finish.");
      return;
    }

    if (!validate(finalStatus)) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setSubmitState("saving");

    const payload = {
      name: formData.name.trim(),
      slug: formData.slug.trim(),
      shortDescription: formData.shortDescription.trim(),
      description: formData.description.trim(),
      price: Number(formData.price) || 0,
      category: formData.category,
      categorySlug: formData.category.toLowerCase().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-"),
      thumbnail: formData.thumbnail.trim(),
      thumbnailPublicId: formData.thumbnailPublicId.trim() || undefined,
      images: formData.images,
      imagePublicIds: formData.imagePublicIds,
      features: formData.features,
      technologies: formData.technologies,
      included: formData.included,
      requirements: formData.requirements,
      demoUrl: formData.demoUrl.trim(),
      documentationUrl: formData.documentationUrl.trim(),
      purchaseUrl: formData.purchaseUrl.trim(),
      version: formData.version.trim() || "1.0.0",
      status: finalStatus,
      featured: formData.featured,
      tags: formData.tags,
    };

    try {
      let result;
      if (isEditing && initialData?.id) {
        result = await updateProductAction(initialData.id, payload);
      } else {
        result = await createProductAction(payload);
      }

      if (!result.success) {
        setServerErrorMessage(result.error || "Failed to save product.");
        if (result.fieldErrors) {
          setErrors((prev) => ({ ...prev, ...result.fieldErrors }));
        }
        setSubmitState("idle");
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      setSubmitState("success");
      setTimeout(() => {
        router.push("/dashboard/products");
        router.refresh();
      }, 900);
    } catch (err: any) {
      console.error("Product submission error:", err);
      setServerErrorMessage(
        err?.message || "An unexpected error occurred while saving the product to MongoDB."
      );
      setSubmitState("idle");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-8 max-w-4xl pb-16 text-white">
      {/* Server Error Alert */}
      {serverErrorMessage && (
        <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-rose-400 flex items-start gap-3 animate-in fade-in duration-200">
          <AlertCircle className="size-5 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider">Submission Error</h4>
            <p className="text-xs font-medium mt-0.5">{serverErrorMessage}</p>
          </div>
        </div>
      )}

      {/* Success Notification */}
      {submitState === "success" && (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-emerald-400 flex items-center gap-3 animate-in fade-in duration-200">
          <CheckCircle2 className="size-5 shrink-0" />
          <div className="text-sm font-semibold">
            Product successfully saved in MongoDB! Redirecting to products list...
          </div>
        </div>
      )}

      {/* SECTION 1: Basic Information */}
      <Card className="border-neutral-800 bg-neutral-950">
        <CardHeader>
          <CardTitle className="text-lg">Basic Information</CardTitle>
          <p className="text-xs text-neutral-400">
            Define product title, URL slug, and customer-facing descriptions.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-mono font-semibold text-neutral-300">
                  Product Name <span className="text-[#EEF35F]">*</span>
                </label>
                <span className="text-[10px] font-mono text-neutral-500">
                  {formData.name.length}/120
                </span>
              </div>
              <Input
                value={formData.name}
                maxLength={120}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. NextForge SaaS Boilerplate"
                className={errors.name ? "border-rose-500" : ""}
              />
              {errors.name && (
                <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="size-3" /> {errors.name}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-mono font-semibold text-neutral-300">
                  URL Slug <span className="text-[#EEF35F]">*</span>
                </label>
                {isSlugManual && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsSlugManual(false);
                      setFormData((prev) => ({ ...prev, slug: slugify(prev.name) }));
                    }}
                    className="text-[10px] text-[#EEF35F] hover:underline"
                  >
                    Reset to auto
                  </button>
                )}
              </div>
              <Input
                value={formData.slug}
                maxLength={120}
                onChange={(e) => handleSlugChange(e.target.value)}
                placeholder="e.g. nextforge-saas-boilerplate"
                className={errors.slug ? "border-rose-500" : ""}
              />
              {errors.slug && (
                <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="size-3" /> {errors.slug}
                </p>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-mono font-semibold text-neutral-300">
                Short Description <span className="text-[#EEF35F]">*</span>
              </label>
              <span className="text-[10px] font-mono text-neutral-500">
                {formData.shortDescription.length}/300
              </span>
            </div>
            <Input
              value={formData.shortDescription}
              maxLength={300}
              onChange={(e) => {
                setFormData({ ...formData, shortDescription: e.target.value });
                if (errors.shortDescription) setErrors((prev) => ({ ...prev, shortDescription: "" }));
              }}
              placeholder="A concise 1-sentence overview for discovery cards and SEO"
              className={errors.shortDescription ? "border-rose-500" : ""}
            />
            {errors.shortDescription && (
              <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                <AlertCircle className="size-3" /> {errors.shortDescription}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-mono font-semibold text-neutral-300 mb-1.5">
              Detailed Description <span className="text-[#EEF35F]">*</span>
            </label>
            <Textarea
              rows={5}
              value={formData.description}
              onChange={(e) => {
                setFormData({ ...formData, description: e.target.value });
                if (errors.description) setErrors((prev) => ({ ...prev, description: "" }));
              }}
              placeholder="In-depth description of product architecture, benefits, stack details, and features..."
              className={errors.description ? "border-rose-500" : ""}
            />
            {errors.description && (
              <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                <AlertCircle className="size-3" /> {errors.description}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* SECTION 2: Pricing & Category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card className="border-neutral-800 bg-neutral-950">
          <CardHeader>
            <CardTitle className="text-lg">Pricing</CardTitle>
            <p className="text-xs text-neutral-400">Set the digital download price in USD.</p>
          </CardHeader>
          <CardContent>
            <label className="block text-xs font-mono font-semibold text-neutral-300 mb-1.5">
              Price (USD) <span className="text-[#EEF35F]">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 font-mono text-sm">
                $
              </span>
              <Input
                type="number"
                min="0"
                step="any"
                value={formData.price}
                onChange={(e) => {
                  setFormData({ ...formData, price: e.target.value });
                  if (errors.price) setErrors((prev) => ({ ...prev, price: "" }));
                }}
                placeholder="49"
                className={`pl-8 ${errors.price ? "border-rose-500" : ""}`}
              />
            </div>
            {errors.price && (
              <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                <AlertCircle className="size-3" /> {errors.price}
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="border-neutral-800 bg-neutral-950">
          <CardHeader>
            <CardTitle className="text-lg">Category</CardTitle>
            <p className="text-xs text-neutral-400">Assign official DigiForge product discipline.</p>
          </CardHeader>
          <CardContent>
            <label className="block text-xs font-mono font-semibold text-neutral-300 mb-1.5">
              Product Category <span className="text-[#EEF35F]">*</span>
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value as ProductCategory,
                })
              }
              className="w-full rounded-xl border border-neutral-800 bg-black px-3.5 py-2.5 text-xs sm:text-sm text-white transition-colors focus:border-[#EEF35F] focus:outline-none cursor-pointer"
            >
              {PRODUCT_CATEGORIES.map((cat) => (
                <option key={cat} value={cat} className="bg-neutral-950 text-white">
                  {cat}
                </option>
              ))}
            </select>
          </CardContent>
        </Card>
      </div>

      {/* SECTION 3: Cloudinary Media Upload UI */}
      <Card className="border-neutral-800 bg-neutral-950">
        <CardHeader>
          <CardTitle className="text-lg">Media &amp; Assets</CardTitle>
          <p className="text-xs text-neutral-400">
            Upload cover thumbnail (required for publishing) and multi-image gallery screenshots to Cloudinary.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Main Thumbnail Upload */}
          <div>
            <label className="block text-xs font-mono font-semibold text-neutral-300 mb-2">
              Cover Thumbnail <span className="text-[#EEF35F]">*</span>
            </label>
            <ProductImageUpload
              value={formData.thumbnail}
              publicId={formData.thumbnailPublicId}
              productSlug={formData.slug}
              onChange={({ url, publicId }) => {
                setFormData((prev) => ({
                  ...prev,
                  thumbnail: url,
                  thumbnailPublicId: publicId,
                }));
                if (errors.thumbnail) {
                  setErrors((prev) => ({ ...prev, thumbnail: "" }));
                }
              }}
              onRemove={() => {
                setFormData((prev) => ({
                  ...prev,
                  thumbnail: "",
                  thumbnailPublicId: "",
                }));
              }}
              onUploadingChange={setIsUploadingImage}
            />
            {errors.thumbnail && (
              <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                <AlertCircle className="size-3" /> {errors.thumbnail}
              </p>
            )}
          </div>

          {/* Product Gallery Images */}
          <div className="pt-4 border-t border-neutral-900">
            <label className="block text-xs font-mono font-semibold text-neutral-300 mb-2">
              Gallery Screenshots &amp; Product Visuals (Optional)
            </label>
            <ProductGalleryUpload
              images={formData.images}
              imagePublicIds={formData.imagePublicIds}
              productSlug={formData.slug}
              onChange={({ images, imagePublicIds }) => {
                setFormData((prev) => ({
                  ...prev,
                  images,
                  imagePublicIds,
                }));
              }}
              onUploadingChange={setIsUploadingImage}
            />
          </div>
        </CardContent>
      </Card>

      {/* SECTION 4: Features & Specifications */}
      <Card className="border-neutral-800 bg-neutral-950">
        <CardHeader>
          <CardTitle className="text-lg">Product Details &amp; Highlights</CardTitle>
          <p className="text-xs text-neutral-400">
            Define features, technology badges, deliverables, and requirements.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Key Features */}
          <div>
            <label className="block text-xs font-mono font-semibold text-neutral-300 mb-2">
              Key Features
            </label>
            <div className="space-y-2">
              {formData.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-2 rounded-xl border border-neutral-800 bg-black/60 px-3.5 py-2 text-xs text-neutral-200"
                >
                  <span>{feature}</span>
                  <button
                    type="button"
                    onClick={() => removeItem("features", idx)}
                    className="text-neutral-500 hover:text-rose-400 transition-colors cursor-pointer"
                  >
                    <X className="size-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2 mt-3">
              <Input
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addItem(newFeature, "features", setNewFeature);
                  }
                }}
                placeholder="Type a feature and press Enter..."
              />
              <button
                type="button"
                onClick={() => addItem(newFeature, "features", setNewFeature)}
                className="rounded-xl border border-neutral-800 bg-neutral-900 px-4 text-xs font-semibold text-white hover:bg-neutral-800 transition-colors shrink-0 cursor-pointer"
              >
                + Add
              </button>
            </div>
          </div>

          {/* Technologies */}
          <div className="pt-4 border-t border-neutral-900">
            <label className="block text-xs font-mono font-semibold text-neutral-300 mb-2">
              Technologies &amp; Frameworks
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 rounded-full border border-neutral-800 bg-neutral-900 px-3.5 py-1 text-xs font-mono text-neutral-300"
                >
                  <span>{tech}</span>
                  <button
                    type="button"
                    onClick={() => removeItem("technologies", idx)}
                    className="text-neutral-500 hover:text-rose-400 transition-colors cursor-pointer"
                  >
                    <X className="size-3" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                value={newTech}
                onChange={(e) => setNewTech(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addItem(newTech, "technologies", setNewTech);
                  }
                }}
                placeholder="e.g. Next.js, TypeScript, Tailwind CSS, Docker..."
              />
              <button
                type="button"
                onClick={() => addItem(newTech, "technologies", setNewTech)}
                className="rounded-xl border border-neutral-800 bg-neutral-900 px-4 text-xs font-semibold text-white hover:bg-neutral-800 transition-colors shrink-0 cursor-pointer"
              >
                + Add
              </button>
            </div>
          </div>

          {/* What's Included */}
          <div className="pt-4 border-t border-neutral-900">
            <label className="block text-xs font-mono font-semibold text-neutral-300 mb-2">
              What&apos;s Included in Download
            </label>
            <div className="space-y-2">
              {formData.included.map((inc, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-2 rounded-xl border border-neutral-800 bg-black/60 px-3.5 py-2 text-xs text-neutral-200"
                >
                  <span>{inc}</span>
                  <button
                    type="button"
                    onClick={() => removeItem("included", idx)}
                    className="text-neutral-500 hover:text-rose-400 transition-colors cursor-pointer"
                  >
                    <X className="size-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2 mt-3">
              <Input
                value={newIncluded}
                onChange={(e) => setNewIncluded(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addItem(newIncluded, "included", setNewIncluded);
                  }
                }}
                placeholder="e.g. Full Source Code, Figma UI Files, Free Lifetime Updates..."
              />
              <button
                type="button"
                onClick={() => addItem(newIncluded, "included", setNewIncluded)}
                className="rounded-xl border border-neutral-800 bg-neutral-900 px-4 text-xs font-semibold text-white hover:bg-neutral-800 transition-colors shrink-0 cursor-pointer"
              >
                + Add
              </button>
            </div>
          </div>

          {/* Requirements */}
          <div className="pt-4 border-t border-neutral-900">
            <label className="block text-xs font-mono font-semibold text-neutral-300 mb-2">
              Requirements (Optional)
            </label>
            <div className="space-y-2">
              {formData.requirements.map((req, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-2 rounded-xl border border-neutral-800 bg-black/60 px-3.5 py-2 text-xs text-neutral-200"
                >
                  <span>{req}</span>
                  <button
                    type="button"
                    onClick={() => removeItem("requirements", idx)}
                    className="text-neutral-500 hover:text-rose-400 transition-colors cursor-pointer"
                  >
                    <X className="size-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2 mt-3">
              <Input
                value={newRequirement}
                onChange={(e) => setNewRequirement(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addItem(newRequirement, "requirements", setNewRequirement);
                  }
                }}
                placeholder="e.g. Node.js 20+, MongoDB 6+, Basic React experience..."
              />
              <button
                type="button"
                onClick={() => addItem(newRequirement, "requirements", setNewRequirement)}
                className="rounded-xl border border-neutral-800 bg-neutral-900 px-4 text-xs font-semibold text-white hover:bg-neutral-800 transition-colors shrink-0 cursor-pointer"
              >
                + Add
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SECTION 5: External Product Links */}
      <Card className="border-neutral-800 bg-neutral-950">
        <CardHeader>
          <CardTitle className="text-lg">Product Links &amp; Checkout</CardTitle>
          <p className="text-xs text-neutral-400">
            Set live demo, documentation, and external checkout links (e.g. Gumroad).
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-xs font-mono font-semibold text-neutral-300 mb-1.5">
              Live Demo URL (Optional)
            </label>
            <Input
              value={formData.demoUrl}
              onChange={(e) => {
                setFormData({ ...formData, demoUrl: e.target.value });
                if (errors.demoUrl) setErrors((prev) => ({ ...prev, demoUrl: "" }));
              }}
              placeholder="https://preview.example.com"
              className={errors.demoUrl ? "border-rose-500" : ""}
            />
            {errors.demoUrl && (
              <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                <AlertCircle className="size-3" /> {errors.demoUrl}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-mono font-semibold text-neutral-300 mb-1.5">
              Documentation URL (Optional)
            </label>
            <Input
              value={formData.documentationUrl}
              onChange={(e) => {
                setFormData({ ...formData, documentationUrl: e.target.value });
                if (errors.documentationUrl) setErrors((prev) => ({ ...prev, documentationUrl: "" }));
              }}
              placeholder="https://docs.example.com"
              className={errors.documentationUrl ? "border-rose-500" : ""}
            />
            {errors.documentationUrl && (
              <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                <AlertCircle className="size-3" /> {errors.documentationUrl}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-mono font-semibold text-neutral-300 mb-1.5">
              Purchase / Checkout URL <span className="text-[#EEF35F]">*</span>{" "}
              <span className="text-[11px] text-neutral-500 font-normal">(Required when publishing)</span>
            </label>
            <Input
              value={formData.purchaseUrl}
              onChange={(e) => {
                setFormData({ ...formData, purchaseUrl: e.target.value });
                if (errors.purchaseUrl) setErrors((prev) => ({ ...prev, purchaseUrl: "" }));
              }}
              placeholder="https://gumroad.com/l/your-product"
              className={errors.purchaseUrl ? "border-rose-500" : ""}
            />
            {errors.purchaseUrl && (
              <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                <AlertCircle className="size-3" /> {errors.purchaseUrl}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* SECTION 6: Metadata, Tags & Visibility */}
      <Card className="border-neutral-800 bg-neutral-950">
        <CardHeader>
          <CardTitle className="text-lg">Metadata, Tags &amp; Visibility</CardTitle>
          <p className="text-xs text-neutral-400">
            Configure version tag, search tags, and homepage placement.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            <div>
              <label className="block text-xs font-mono font-semibold text-neutral-300 mb-1.5">
                Version Tag
              </label>
              <Input
                value={formData.version}
                onChange={(e) =>
                  setFormData({ ...formData, version: e.target.value })
                }
                placeholder="1.0.0"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold text-neutral-300 mb-1.5">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as "published" | "draft",
                  })
                }
                className="w-full rounded-xl border border-neutral-800 bg-black px-3.5 py-2.5 text-xs sm:text-sm text-white transition-colors focus:border-[#EEF35F] focus:outline-none cursor-pointer"
              >
                <option value="published" className="bg-neutral-950 text-white">Published</option>
                <option value="draft" className="bg-neutral-950 text-white">Draft</option>
              </select>
            </div>

            <div className="pt-4 sm:pt-6">
              <label className="inline-flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) =>
                    setFormData({ ...formData, featured: e.target.checked })
                  }
                  className="size-4 rounded border-neutral-800 bg-black text-[#EEF35F] focus:ring-[#EEF35F]"
                />
                <span className="text-xs font-semibold text-white">
                  Feature on Homepage
                </span>
              </label>
            </div>
          </div>

          {/* Tags */}
          <div className="pt-4 border-t border-neutral-900">
            <label className="block text-xs font-mono font-semibold text-neutral-300 mb-2">
              Search Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 rounded-full border border-neutral-800 bg-neutral-900 px-3.5 py-1 text-xs font-mono text-neutral-300"
                >
                  <Tag className="size-3 text-[#EEF35F]" />
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => removeItem("tags", idx)}
                    className="text-neutral-500 hover:text-rose-400 transition-colors cursor-pointer"
                  >
                    <X className="size-3" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addItem(newTag, "tags", setNewTag, true);
                  }
                }}
                placeholder="Type a tag (e.g. saas, nextjs, starter)..."
              />
              <button
                type="button"
                onClick={() => addItem(newTag, "tags", setNewTag, true)}
                className="rounded-xl border border-neutral-800 bg-neutral-900 px-4 text-xs font-semibold text-white hover:bg-neutral-800 transition-colors shrink-0 cursor-pointer"
              >
                + Add Tag
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FORM ACTIONS FOOTER */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-neutral-900">
        <Link
          href="/dashboard/products"
          className="text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
        >
          Cancel
        </Link>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            disabled={submitState === "saving" || isUploadingImage}
            onClick={() => handleSubmit("draft")}
            className="flex-1 sm:flex-initial inline-flex h-11 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 px-6 text-xs font-semibold text-neutral-200 hover:bg-neutral-800 hover:text-white transition-colors cursor-pointer disabled:opacity-50"
          >
            {submitState === "saving" && formData.status === "draft" ? (
              <div className="flex items-center gap-2">
                <Loader2 className="size-3.5 animate-spin" />
                <span>Saving Draft...</span>
              </div>
            ) : (
              "Save as Draft"
            )}
          </button>

          <button
            type="button"
            disabled={submitState === "saving" || isUploadingImage}
            onClick={() => handleSubmit("published")}
            className="flex-1 sm:flex-initial inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#EEF35F] px-8 text-xs font-bold text-black hover:bg-[#e5ea4e] hover:shadow-[0_0_20px_rgba(238,243,95,0.3)] transition-all shadow-md shadow-[#EEF35F]/20 cursor-pointer disabled:opacity-50"
          >
            {submitState === "saving" && formData.status === "published" ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Saving to MongoDB...</span>
              </>
            ) : isUploadingImage ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Uploading Image...</span>
              </>
            ) : (
              <span>{isEditing ? "Update Product" : "Publish Product"}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductForm;
