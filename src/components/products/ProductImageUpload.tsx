"use client";

import * as React from "react";
import Image from "next/image";
import { UploadCloud, Loader2, X, AlertCircle } from "lucide-react";

interface ProductImageUploadProps {
  value?: string;
  publicId?: string;
  productSlug?: string;
  onChange: (data: { url: string; publicId: string }) => void;
  onRemove: () => void;
  onUploadingChange?: (isUploading: boolean) => void;
}

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export function ProductImageUpload({
  value,
  publicId,
  productSlug,
  onChange,
  onRemove,
  onUploadingChange,
}: ProductImageUploadProps) {
  const [isUploading, setIsUploading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    setErrorMessage(null);

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      setErrorMessage("Please upload a supported image (JPEG, PNG, WebP, AVIF).");
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setErrorMessage("Please upload a supported image under 10MB.");
      return;
    }

    setIsUploading(true);
    onUploadingChange?.(true);

    try {
      // 1. Request secure signed upload parameters from Next.js API
      const cleanSlug = (productSlug || "").trim().toLowerCase().replace(/[^\w-]/g, "");
      const slugFolder = cleanSlug
        ? `digiforge/products/${cleanSlug}`
        : "digiforge/products";

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

      // 2. Upload file directly to Cloudinary using signed parameters
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", apiKey);
      formData.append("timestamp", String(timestamp));
      formData.append("signature", signature);
      if (folder) {
        formData.append("folder", folder);
      }

      const cloudinaryRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const cloudinaryData = await cloudinaryRes.json().catch(() => ({}));

      if (!cloudinaryRes.ok) {
        const errorMsg =
          cloudinaryData.error?.message ||
          "Cloudinary upload failed. Please verify credentials in .env";
        throw new Error(errorMsg);
      }

      onChange({
        url: cloudinaryData.secure_url,
        publicId: cloudinaryData.public_id,
      });
    } catch (err: any) {
      console.error("Cloudinary upload error:", err);
      setErrorMessage(err.message || "Image upload failed. Please try again.");
    } finally {
      setIsUploading(false);
      onUploadingChange?.(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  const hasImage = Boolean(
    value &&
      value.trim() !== "" &&
      (value.startsWith("http://") || value.startsWith("https://") || value.startsWith("data:"))
  );

  return (
    <div className="space-y-3">
      {hasImage ? (
        <div className="relative group overflow-hidden rounded-2xl border border-neutral-800 bg-black/60 p-2.5">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-neutral-900">
            <Image
              src={value!}
              alt="Product thumbnail"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
              <div className="text-[11px] font-mono text-neutral-300 truncate max-w-[70%]">
                {publicId || "Uploaded Image"}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="rounded-lg bg-neutral-900/90 border border-neutral-700 px-2.5 py-1 text-xs font-semibold text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Replace
                </button>
                <button
                  type="button"
                  onClick={onRemove}
                  disabled={isUploading}
                  className="rounded-lg bg-rose-950/80 border border-rose-800 px-2 py-1 text-xs font-semibold text-rose-300 hover:bg-rose-900 transition-colors cursor-pointer"
                >
                  <X className="size-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className={`relative rounded-2xl border-2 border-dashed p-7 text-center transition-all cursor-pointer ${
            isDragging
              ? "border-[#EEF35F] bg-[#EEF35F]/5"
              : "border-neutral-800 bg-black/50 hover:border-neutral-700 hover:bg-neutral-900/30"
          } ${isUploading ? "opacity-75 pointer-events-none" : ""}`}
        >
          {isUploading ? (
            <div className="flex flex-col items-center justify-center py-2">
              <Loader2 className="size-8 animate-spin text-[#EEF35F] mb-2" />
              <p className="text-xs font-bold text-white font-mono">Uploading to Cloudinary...</p>
              <p className="text-[11px] text-neutral-400 mt-1">Please wait while the image is securely processed</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <div className="flex size-12 items-center justify-center rounded-2xl border border-neutral-800 bg-neutral-900/80 mb-3 text-neutral-400 group-hover:text-white">
                <UploadCloud className="size-6 text-[#EEF35F]" />
              </div>
              <p className="text-xs font-semibold text-white">
                Click to upload or drag &amp; drop thumbnail
              </p>
              <p className="text-[11px] text-neutral-500 mt-1">
                JPEG, PNG, WebP, AVIF up to 10MB
              </p>
            </div>
          )}
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={ALLOWED_TYPES.join(",")}
        onChange={handleFileChange}
        disabled={isUploading}
        className="hidden"
      />

      {/* Error Message */}
      {errorMessage && (
        <div className="flex items-center gap-2 rounded-xl border border-rose-900/60 bg-rose-950/30 px-3.5 py-2.5 text-xs text-rose-300">
          <AlertCircle className="size-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}

export default ProductImageUpload;
