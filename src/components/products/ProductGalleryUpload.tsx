"use client";

import * as React from "react";
import Image from "next/image";
import { Loader2, X, AlertCircle, Plus } from "lucide-react";

interface ProductGalleryUploadProps {
  images: string[];
  imagePublicIds?: string[];
  productSlug?: string;
  onChange: (data: { images: string[]; imagePublicIds: string[] }) => void;
  onUploadingChange?: (isUploading: boolean) => void;
}

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export function ProductGalleryUpload({
  images,
  imagePublicIds = [],
  productSlug,
  onChange,
  onUploadingChange,
}: ProductGalleryUploadProps) {
  const [isUploading, setIsUploading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleUploadFiles = async (files: FileList | File[]) => {
    setErrorMessage(null);
    const validFiles: File[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!ALLOWED_TYPES.includes(file.type)) {
        setErrorMessage("One or more files have unsupported formats. Use JPEG, PNG, WebP, AVIF.");
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        setErrorMessage("Files must be under 10MB each.");
        return;
      }
      validFiles.push(file);
    }

    if (validFiles.length === 0) return;

    setIsUploading(true);
    onUploadingChange?.(true);

    try {
      const cleanSlug = (productSlug || "").trim().toLowerCase().replace(/[^\w-]/g, "");
      const slugFolder = cleanSlug
        ? `digiforge/products/${cleanSlug}/gallery`
        : "digiforge/products/gallery";

      const uploadedUrls: string[] = [...images];
      const uploadedPids: string[] = [...imagePublicIds];

      for (const file of validFiles) {
        // Request signature
        const signRes = await fetch("/api/sign-cloudinary-params", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ folder: slugFolder }),
        });

        const signData = await signRes.json().catch(() => ({}));

        if (!signRes.ok) {
          throw new Error(signData.error || "Failed to authenticate upload request.");
        }

        const { signature, timestamp, apiKey, cloudName, folder } = signData;

        if (!signature || !apiKey || !cloudName) {
          throw new Error("Missing Cloudinary configuration. Check .env variables.");
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("api_key", apiKey);
        formData.append("timestamp", String(timestamp));
        formData.append("signature", signature);
        if (folder) {
          formData.append("folder", folder);
        }

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          const errorMsg =
            data.error?.message ||
            "Failed to upload gallery image to Cloudinary.";
          throw new Error(errorMsg);
        }

        uploadedUrls.push(data.secure_url);
        uploadedPids.push(data.public_id);
      }

      onChange({
        images: uploadedUrls,
        imagePublicIds: uploadedPids,
      });
    } catch (err: any) {
      console.error("Gallery upload error:", err);
      setErrorMessage(err.message || "Failed to upload gallery images. Please try again.");
    } finally {
      setIsUploading(false);
      onUploadingChange?.(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemove = (index: number) => {
    const nextImages = images.filter((_, i) => i !== index);
    const nextPids = imagePublicIds.filter((_, i) => i !== index);
    onChange({
      images: nextImages,
      imagePublicIds: nextPids,
    });
  };

  const validImages = images.filter(
    (img) =>
      typeof img === "string" &&
      (img.startsWith("http://") || img.startsWith("https://") || img.startsWith("data:"))
  );

  return (
    <div className="space-y-4">
      {/* Existing Gallery Previews */}
      {validImages.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {validImages.map((imgUrl, idx) => (
            <div
              key={`${imgUrl}-${idx}`}
              className="group relative aspect-[4/3] rounded-xl border border-neutral-800 bg-neutral-900 overflow-hidden"
            >
              <Image
                src={imgUrl}
                alt={`Gallery image ${idx + 1}`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-start justify-end p-2">
                <button
                  type="button"
                  onClick={() => handleRemove(idx)}
                  disabled={isUploading}
                  className="rounded-lg bg-rose-950/90 border border-rose-800 p-1 text-rose-300 hover:bg-rose-900 transition-colors cursor-pointer"
                >
                  <X className="size-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload button / drop area */}
      <div
        onClick={() => !isUploading && fileInputRef.current?.click()}
        className={`rounded-xl border border-dashed border-neutral-800 bg-black/40 p-4 text-center hover:border-neutral-700 transition-colors cursor-pointer ${
          isUploading ? "opacity-60 pointer-events-none" : ""
        }`}
      >
        {isUploading ? (
          <div className="flex items-center justify-center gap-2 py-1 text-xs text-neutral-300">
            <Loader2 className="size-4 animate-spin text-[#EEF35F]" />
            <span>Uploading gallery images to Cloudinary...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 text-xs text-neutral-400 hover:text-white">
            <Plus className="size-4 text-[#EEF35F]" />
            <span className="font-semibold text-neutral-300">Add Gallery Images</span>
            <span className="text-[11px] text-neutral-500">(Supports multiple JPEG, PNG, WebP)</span>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={ALLOWED_TYPES.join(",")}
        onChange={(e) => {
          if (e.target.files) {
            handleUploadFiles(e.target.files);
          }
        }}
        disabled={isUploading}
        className="hidden"
      />

      {errorMessage && (
        <div className="flex items-center gap-2 rounded-xl border border-rose-900/60 bg-rose-950/30 px-3.5 py-2.5 text-xs text-rose-300">
          <AlertCircle className="size-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}

export default ProductGalleryUpload;
