"use client";

import * as React from "react";
import Image from "next/image";
import { Upload, X, Loader2, Image as ImageIcon, AlertCircle } from "lucide-react";
import { HeroImageReference } from "@/types/hero";

interface HeroImageUploadProps {
  label: string;
  variant: "desktop" | "mobile";
  value: HeroImageReference;
  onChange: (ref: HeroImageReference) => void;
  aspectHint?: string;
  error?: string;
}

export function HeroImageUpload({
  label,
  variant,
  value,
  onChange,
  aspectHint = "Recommended: WEBP/PNG, max 10MB",
  error,
}: HeroImageUploadProps) {
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadError, setUploadError] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("variant", variant);

      const res = await fetch("/api/hero/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to upload image to Cloudflare R2");
      }

      onChange({
        url: data.url,
        key: data.key,
      });
    } catch (err: any) {
      console.error("Upload error:", err);
      setUploadError(err.message || "Failed to upload image");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemove = () => {
    onChange({ url: "", key: "" });
    setUploadError(null);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-slate-800">
          {label} <span className="text-rose-500">*</span>
        </label>
        <span className="text-[11px] text-slate-600 font-mono">{aspectHint}</span>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        onChange={handleFileChange}
        className="hidden"
      />

      {value.url ? (
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-2 group">
          <div
            className={`relative rounded-xl overflow-hidden bg-slate-100 ${
              variant === "desktop" ? "aspect-16/9 sm:aspect-21/9" : "aspect-4/3 sm:aspect-16/9"
            }`}
          >
            <Image
              src={value.url}
              alt={`${label} preview`}
              fill
              className="object-cover transition-transform group-hover:scale-105 duration-300"
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized={value.url.startsWith("blob:") || value.url.startsWith("/uploads")}
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-lg bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-white transition-colors cursor-pointer"
              >
                Change Image
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="rounded-lg bg-rose-600/90 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-600 transition-colors cursor-pointer"
              >
                Remove
              </button>
            </div>
          </div>
          <div className="mt-2 px-1 flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span className="truncate max-w-[250px]">Key: {value.key}</span>
            <span className="text-[#0F766E] font-medium">Uploaded</span>
          </div>
        </div>
      ) : (
        <div
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
            error || uploadError
              ? "border-rose-300 bg-rose-50/50 hover:bg-rose-50"
              : "border-slate-200 bg-slate-50/70 hover:bg-slate-100/80 hover:border-[#0F766E]/40"
          }`}
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-2 py-4">
              <Loader2 className="size-7 text-[#0F766E] animate-spin" />
              <p className="text-xs font-medium text-slate-700">Uploading to Cloudflare R2...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="size-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#0F766E] shadow-xs">
                {variant === "desktop" ? <ImageIcon className="size-5" /> : <Upload className="size-5" />}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">
                  Click to upload {variant} hero image
                </p>
                <p className="text-[11px] text-slate-600 mt-0.5">JPG, PNG, WEBP, AVIF up to 10MB</p>
              </div>
            </div>
          )}
        </div>
      )}

      {(uploadError || error) && (
        <div className="flex items-center gap-1.5 text-xs text-rose-600 font-medium mt-1">
          <AlertCircle className="size-3.5 shrink-0" />
          <span>{uploadError || error}</span>
        </div>
      )}
    </div>
  );
}
