import * as React from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Download, Sparkles, ShieldCheck, Zap } from "lucide-react"

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return (
    <div className="min-h-screen flex flex-col bg-black text-white selection:bg-[#FF90E8] selection:text-black">
      <Navbar />

      <main className="flex-1 mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 w-full bg-black">
        <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-8 sm:p-12 shadow-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900 px-3.5 py-1 text-xs font-semibold text-[#FF90E8] mb-4">
            <Sparkles className="size-3.5 text-[#FF90E8]" />
            <span>Digital Asset Details</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-white mb-3 capitalize">
            {slug.replace(/-/g, " ")}
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 mb-8 max-w-2xl leading-relaxed">
            Instant digital download package with full commercial licensing, source files, and lifetime asset updates.
          </p>

          <div className="flex flex-wrap items-center gap-4 pb-8 border-b border-neutral-900">
            <button className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#FF90E8] px-8 text-sm font-bold text-black transition-all hover:bg-[#ff7be3] active:scale-95 shadow-lg shadow-[#FF90E8]/20">
              <Download className="size-4" />
              Download Asset
            </button>
            <button className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-neutral-800 bg-neutral-900 px-8 text-sm font-semibold text-white transition-all hover:bg-neutral-800 hover:border-neutral-700">
              Preview Files
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 text-xs text-neutral-400">
            <div className="flex items-center gap-2">
              <Zap className="size-4 text-[#FF90E8]" />
              <span>Instant ZIP Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-[#FF90E8]" />
              <span>Commercial License Included</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-[#FF90E8]" />
              <span>Free Future Updates</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
