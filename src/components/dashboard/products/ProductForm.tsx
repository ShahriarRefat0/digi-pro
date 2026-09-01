"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plus,
  X,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ExternalLink,
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

interface ProductFormProps {
  initialData?: Product | null;
}

export function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter();

  const [formData, setFormData] = React.useState({
    name: initialData?.name || "",
    slug: initialData?.slug || "",
    shortDescription: initialData?.shortDescription || "",
    description: initialData?.description || "",
    price: initialData?.price !== undefined ? String(initialData.price) : "49",
    category: (initialData?.category || "Starter Kits") as ProductCategory,
    thumbnail: initialData?.thumbnail || "",
    version: initialData?.version || "1.0.0",
    demoUrl: initialData?.demoUrl || "",
    documentationUrl: initialData?.documentationUrl || "",
    purchaseUrl: initialData?.purchaseUrl || "",
    status: (initialData?.status || "published") as "published" | "draft",
    featured: initialData?.featured ?? true,
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
  });

  const [newFeature, setNewFeature] = React.useState("");
  const [newTech, setNewTech] = React.useState("");
  const [selectedThumb, setSelectedThumb] = React.useState<string | null>(null);
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});
  const [serverErrorMessage, setServerErrorMessage] = React.useState<string | null>(null);
  const [submitState, setSubmitState] = React.useState<
    "idle" | "saving" | "success"
  >("idle");

  // Auto-generate slug from name if new product
  const handleNameChange = (name: string) => {
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    setFormData((prev) => ({
      ...prev,
      name,
      slug: initialData ? prev.slug : slug,
    }));
    if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
  };

  const handleAddFeature = () => {
    if (!newFeature.trim()) return;
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, newFeature.trim()],
    }));
    setNewFeature("");
  };

  const handleRemoveFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, idx) => idx !== index),
    }));
  };

  const handleAddTech = () => {
    if (!newTech.trim()) return;
    setFormData((prev) => ({
      ...prev,
      technologies: [...prev.technologies, newTech.trim()],
    }));
    setNewTech("");
  };

  const handleRemoveTech = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((_, idx) => idx !== index),
    }));
  };

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.name.trim()) errs.name = "Product name is required";
    if (!formData.slug.trim()) errs.slug = "Slug identifier is required";
    if (!formData.shortDescription.trim())
      errs.shortDescription = "Short description is required";
    if (!formData.description.trim())
      errs.description = "Detailed description is required";
    if (formData.price === "" || isNaN(Number(formData.price)) || Number(formData.price) < 0)
      errs.price = "Valid price >= 0 is required";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (statusOverride?: "published" | "draft") => {
    setServerErrorMessage(null);
    if (!validate()) return;

    setSubmitState("saving");

    const finalStatus = statusOverride || formData.status;
    const thumbnailPath =
      formData.thumbnail.trim() ||
      (selectedThumb ? `/images/products/${selectedThumb}` : "/images/products/nextforge.png");

    const payload = {
      name: formData.name.trim(),
      slug: formData.slug.trim(),
      shortDescription: formData.shortDescription.trim(),
      description: formData.description.trim(),
      price: Number(formData.price) || 0,
      category: formData.category,
      thumbnail: thumbnailPath,
      images: initialData?.images || [],
      features: formData.features,
      included: initialData?.included || ["Source Code", "Documentation", "Lifetime Updates"],
      technologies: formData.technologies,
      requirements: initialData?.requirements || ["Node.js 20+"],
      demoUrl: formData.demoUrl.trim(),
      documentationUrl: formData.documentationUrl.trim(),
      purchaseUrl: formData.purchaseUrl.trim(),
      version: formData.version.trim() || "1.0.0",
      status: finalStatus,
      featured: formData.featured,
      tags: initialData?.tags || [formData.category.toLowerCase().replace(/\s+/g, "-")],
    };

    try {
      let result;
      if (initialData?.id) {
        result = await updateProductAction(initialData.id, payload);
      } else {
        result = await createProductAction(payload);
      }

      if (!result.success) {
        setServerErrorMessage(result.error || "Failed to save product.");
        setSubmitState("idle");
        return;
      }

      setSubmitState("success");
      setTimeout(() => {
        router.push("/dashboard/products");
        router.refresh();
      }, 1000);
    } catch {
      setServerErrorMessage("An unexpected network error occurred while saving.");
      setSubmitState("idle");
    }
  };

  return (
    <div className="space-y-8 max-w-4xl pb-16">
      {/* Server Error Alert */}
      {serverErrorMessage && (
        <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-rose-400 flex items-center gap-3 animate-in fade-in duration-200">
          <AlertCircle className="size-5 shrink-0" />
          <div className="text-xs font-semibold">{serverErrorMessage}</div>
        </div>
      )}

      {/* Success Notification */}
      {submitState === "success" && (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-emerald-400 flex items-center gap-3 animate-in fade-in duration-200">
          <CheckCircle2 className="size-5 shrink-0" />
          <div className="text-sm font-semibold">
            Product saved successfully in MongoDB! Redirecting to products list...
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
              <label className="block text-xs font-mono font-semibold text-neutral-300 mb-1.5">
                Product Name <span className="text-[#EEF35F]">*</span>
              </label>
              <Input
                value={formData.name}
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
              <label className="block text-xs font-mono font-semibold text-neutral-300 mb-1.5">
                URL Slug <span className="text-[#EEF35F]">*</span>
              </label>
              <Input
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
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
            <label className="block text-xs font-mono font-semibold text-neutral-300 mb-1.5">
              Short Description <span className="text-[#EEF35F]">*</span>
            </label>
            <Input
              value={formData.shortDescription}
              onChange={(e) =>
                setFormData({ ...formData, shortDescription: e.target.value })
              }
              placeholder="A concise 1-sentence overview for cards and meta tags"
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
              rows={4}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="In-depth description of the product features, tech stack, and benefits..."
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
            <p className="text-xs text-neutral-400">Set the digital download price.</p>
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
                step="1"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
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
            <p className="text-xs text-neutral-400">Assign primary discipline.</p>
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
              className="w-full rounded-xl border border-neutral-800 bg-black px-3 py-2 text-xs sm:text-sm text-white transition-colors focus:border-[#EEF35F] focus:outline-none cursor-pointer"
            >
              {PRODUCT_CATEGORIES.map((cat) => (
                <option key={cat} value={cat} className="bg-neutral-950">
                  {cat}
                </option>
              ))}
            </select>
          </CardContent>
        </Card>
      </div>

      {/* SECTION 3: Media Upload UI */}
      <Card className="border-neutral-800 bg-neutral-950">
        <CardHeader>
          <CardTitle className="text-lg">Media &amp; Assets</CardTitle>
          <p className="text-xs text-neutral-400">
            Provide thumbnail image URL or select a local asset.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-xs font-mono font-semibold text-neutral-300 mb-1.5">
              Thumbnail Image URL (or path)
            </label>
            <Input
              value={formData.thumbnail}
              onChange={(e) =>
                setFormData({ ...formData, thumbnail: e.target.value })
              }
              placeholder="e.g. /images/products/nextforge.png or https://images.unsplash.com/..."
            />
          </div>

          <div className="rounded-2xl border-2 border-dashed border-neutral-800 bg-black/50 p-6 text-center hover:border-neutral-700 transition-colors">
            <UploadCloud className="size-8 text-neutral-500 mx-auto mb-2" />
            <p className="text-xs font-semibold text-white">
              {selectedThumb ? `Selected: ${selectedThumb}` : "Click or drag thumbnail image here"}
            </p>
            <p className="text-[11px] text-neutral-500 mt-1">
              PNG, JPG, or WebP up to 5MB (1200x800 recommended)
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setSelectedThumb(file.name);
                  setFormData((prev) => ({
                    ...prev,
                    thumbnail: `/images/products/${file.name}`,
                  }));
                }
              }}
              className="mt-3 block mx-auto text-xs text-neutral-400 file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-neutral-900 file:text-[#EEF35F] hover:file:bg-neutral-800 cursor-pointer"
            />
          </div>
        </CardContent>
      </Card>

      {/* SECTION 4: Product Details (Features & Tech Stack) */}
      <Card className="border-neutral-800 bg-neutral-950">
        <CardHeader>
          <CardTitle className="text-lg">Product Details</CardTitle>
          <p className="text-xs text-neutral-400">
            Add key selling bullet points and technology badges.
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
                    onClick={() => handleRemoveFeature(idx)}
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
                    handleAddFeature();
                  }
                }}
                placeholder="Type a feature and press Enter or Add..."
              />
              <button
                type="button"
                onClick={handleAddFeature}
                className="rounded-xl border border-neutral-800 bg-neutral-900 px-4 text-xs font-semibold text-white hover:bg-neutral-800 transition-colors shrink-0 cursor-pointer"
              >
                + Add
              </button>
            </div>
          </div>

          {/* Technologies */}
          <div>
            <label className="block text-xs font-mono font-semibold text-neutral-300 mb-2">
              Technologies &amp; Frameworks
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 rounded-full border border-neutral-800 bg-neutral-900 px-3 py-1 text-xs font-mono text-neutral-300"
                >
                  <span>{tech}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTech(idx)}
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
                    handleAddTech();
                  }
                }}
                placeholder="Add technology badge (e.g. Next.js, Docker)..."
              />
              <button
                type="button"
                onClick={handleAddTech}
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
          <CardTitle className="text-lg">Product Links</CardTitle>
          <p className="text-xs text-neutral-400">
            Set live demo, documentation, and external checkout links.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-xs font-mono font-semibold text-neutral-300 mb-1.5">
              Live Demo URL
            </label>
            <Input
              value={formData.demoUrl}
              onChange={(e) =>
                setFormData({ ...formData, demoUrl: e.target.value })
              }
              placeholder="https://preview.example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-semibold text-neutral-300 mb-1.5">
              Documentation URL
            </label>
            <Input
              value={formData.documentationUrl}
              onChange={(e) =>
                setFormData({ ...formData, documentationUrl: e.target.value })
              }
              placeholder="https://docs.example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-semibold text-neutral-300 mb-1.5">
              Purchase / Checkout URL
            </label>
            <Input
              value={formData.purchaseUrl}
              onChange={(e) =>
                setFormData({ ...formData, purchaseUrl: e.target.value })
              }
              placeholder="https://gumroad.com/l/your-product"
            />
          </div>
        </CardContent>
      </Card>

      {/* SECTION 6: Metadata & Visibility */}
      <Card className="border-neutral-800 bg-neutral-950">
        <CardHeader>
          <CardTitle className="text-lg">Metadata &amp; Visibility</CardTitle>
          <p className="text-xs text-neutral-400">
            Configure version tag and publication state.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
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
                className="w-full rounded-xl border border-neutral-800 bg-black px-3 py-2 text-xs sm:text-sm text-white transition-colors focus:border-[#EEF35F] focus:outline-none cursor-pointer"
              >
                <option value="published" className="bg-neutral-950">Published</option>
                <option value="draft" className="bg-neutral-950">Draft</option>
              </select>
            </div>

            <div className="pt-5">
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
            disabled={submitState === "saving"}
            onClick={() => handleSubmit("draft")}
            className="flex-1 sm:flex-initial inline-flex h-11 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 px-6 text-xs font-semibold text-neutral-200 hover:bg-neutral-800 hover:text-white transition-colors cursor-pointer disabled:opacity-50"
          >
            Save as Draft
          </button>

          <button
            type="button"
            disabled={submitState === "saving"}
            onClick={() => handleSubmit("published")}
            className="flex-1 sm:flex-initial inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#EEF35F] px-8 text-xs font-bold text-black hover:bg-[#e5ea4e] hover:shadow-[0_0_20px_rgba(238,243,95,0.3)] transition-all shadow-md shadow-[#EEF35F]/20 cursor-pointer disabled:opacity-50"
          >
            {submitState === "saving" ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Saving to MongoDB...</span>
              </>
            ) : (
              <span>{initialData ? "Update Product" : "Publish Product"}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductForm;
