"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Plus, ArrowLeft, UploadCloud } from "lucide-react";

export default function AdminProductsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white selection:bg-[#EEF35F] selection:text-black">
      <Navbar />

      <main className="flex-1 mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 w-full bg-black">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
          className="flex items-center gap-2 mb-6"
        >
          <Link
            href="/admin"
            className="group inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="size-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
            <span>Back to Dashboard</span>
          </Link>
        </motion.div>

        {/* Animated Upload Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="rounded-2xl border border-neutral-800 bg-neutral-950 p-8 sm:p-10 shadow-2xl"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-900">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-heading text-white">
                Publish Digital Asset
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Upload your UI kit, 3D icon set, or Next.js template to start
                earning.
              </p>
            </div>
          </div>

          <motion.div
            whileHover={{ scale: 1.01, borderColor: "rgba(238,243,95,0.4)" }}
            transition={{ duration: 0.25 }}
            className="mt-8 flex flex-col items-center justify-center border-2 border-dashed border-neutral-800 rounded-2xl p-12 text-center bg-neutral-900/30 cursor-pointer transition-colors"
          >
            <div className="size-14 rounded-2xl bg-[#EEF35F]/10 text-[#EEF35F] flex items-center justify-center mb-4 border border-[#EEF35F]/20">
              <UploadCloud className="size-7" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">
              Drag and drop your asset files here
            </h3>
            <p className="text-xs text-neutral-400 max-w-sm mb-6">
              Supports .ZIP, .FIG, .GLTF, .BLENDER, and .OTF files up to 2GB per
              asset.
            </p>
            <button className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#EEF35F] px-6 text-xs font-bold text-black transition-all hover:bg-[#e5ea4e] hover:shadow-[0_0_20px_rgba(238,243,95,0.3)] active:scale-95 shadow-md">
              <Plus className="size-4" />
              <span>Select ZIP Archive</span>
            </button>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
