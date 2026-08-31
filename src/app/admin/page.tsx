import * as React from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, DollarSign, Package, Users, TrendingUp } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white selection:bg-[#FF90E8] selection:text-black">
      <Navbar />

      <main className="flex-1 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 w-full bg-black">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-neutral-900">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-950 px-3.5 py-1 text-xs font-semibold text-[#FF90E8] mb-3">
              <span>Management Console</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight font-heading text-white">
              Store Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Overview of digital product sales, revenue, and creator analytics.
            </p>
          </div>

          <Link
            href="/admin/products"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#FF90E8] px-6 text-xs font-bold text-black transition-all hover:bg-[#ff7be3] active:scale-95 shadow-md"
          >
            <Plus className="size-4" />
            Upload New Product
          </Link>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6 shadow-md">
            <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
              <span>Total Revenue</span>
              <DollarSign className="size-4 text-emerald-400" />
            </div>
            <p className="text-2xl font-extrabold font-heading text-white">
              $18,420.50
            </p>
            <p className="text-[11px] text-emerald-400 mt-2 flex items-center gap-1">
              <TrendingUp className="size-3" /> +14.2% from last month
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6 shadow-md">
            <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
              <span>Total Downloads</span>
              <Package className="size-4 text-blue-400" />
            </div>
            <p className="text-2xl font-extrabold font-heading text-white">
              3,892
            </p>
            <p className="text-[11px] text-blue-400 mt-2 flex items-center gap-1">
              <TrendingUp className="size-3" /> +8.1% this week
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6 shadow-md">
            <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
              <span>Active Creators</span>
              <Users className="size-4 text-[#FF90E8]" />
            </div>
            <p className="text-2xl font-extrabold font-heading text-white">
              124
            </p>
            <p className="text-[11px] text-neutral-400 mt-2">
              28 pending approvals
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6 shadow-md">
            <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
              <span>Conversion Rate</span>
              <TrendingUp className="size-4 text-amber-400" />
            </div>
            <p className="text-2xl font-extrabold font-heading text-white">
              4.82%
            </p>
            <p className="text-[11px] text-emerald-400 mt-2">
              +0.6% vs benchmark
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
