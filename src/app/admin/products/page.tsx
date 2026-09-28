"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Plus, ArrowLeft, UploadCloud } from "lucide-react";

export default function AdminProductsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-teal-100 selection:text-teal-900">
      <Navbar />

      <main className="flex-1 mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 w-full bg-slate-50">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
          className="flex items-center gap-2 mb-6"
        >
          <Link
            href="/admin"
            className="group inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
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
          className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-10 shadow-xs"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-heading text-slate-900">
                Publish Digital Product
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Upload your digital product or care guide to start selling.
              </p>
            </div>
          </div>

          <motion.div
            whileHover={{ scale: 1.01, borderColor: "rgba(15,118,110,0.4)" }}
            transition={{ duration: 0.25 }}
            className="mt-8 flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-2xl p-12 text-center bg-slate-50 cursor-pointer transition-colors"
          >
            <div className="size-14 rounded-2xl bg-teal-50 text-[#0F766E] flex items-center justify-center mb-4 border border-teal-100">
              <UploadCloud className="size-7" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Drag and drop your product files here
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mb-6">
              Supports .ZIP, .PDF, and media files up to 2GB per asset.
            </p>
            <button className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#0F766E] px-6 text-xs font-bold text-white transition-all hover:bg-[#115E59] active:scale-95 shadow-xs">
              <Plus className="size-4" />
              <span>Select Archive File</span>
            </button>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
