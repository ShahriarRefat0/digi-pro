import * as React from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft, UploadCloud } from "lucide-react";

export default function AdminProductsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white selection:bg-[#FF90E8] selection:text-black">
      <Navbar />

      <main className="flex-1 mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 w-full bg-black">
        <div className="flex items-center gap-2 mb-6">
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            Back to Dashboard
          </Link>
        </div>

        <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-8 sm:p-10 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-900">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900 px-3.5 py-1 text-xs font-semibold text-[#FF90E8] mb-3">
                <span>Creator Studio</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-heading text-white">
                Publish Digital Asset
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Upload your UI kit, 3D icon set, or Next.js template to start
                earning.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center border-2 border-dashed border-neutral-800 rounded-2xl p-12 text-center bg-neutral-900/40">
            <div className="size-14 rounded-2xl bg-[#FF90E8]/10 text-[#FF90E8] flex items-center justify-center mb-4 border border-[#FF90E8]/20">
              <UploadCloud className="size-7" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">
              Drag and drop your asset files here
            </h3>
            <p className="text-xs text-neutral-400 max-w-sm mb-6">
              Supports .ZIP, .FIG, .GLTF, .BLENDER, and .OTF files up to 2GB per
              asset.
            </p>
            <button className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#FF90E8] px-6 text-xs font-bold text-black transition-all hover:bg-[#ff7be3] active:scale-95 shadow-md">
              <Plus className="size-4" />
              Select ZIP Archive
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
