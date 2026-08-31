"use client";

import * as React from "react";
import Link from "next/link";
import {
  Package,
  BadgeCheck,
  FileEdit,
  Plus,
  ArrowRight,
} from "lucide-react";
import { INITIAL_PRODUCTS } from "@/lib/products";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ProductTable } from "@/components/dashboard/products/ProductTable";

export default function DashboardPage() {
  const [products, setProducts] = React.useState(INITIAL_PRODUCTS);

  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Page Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-900">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-heading text-white">
            Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 font-normal">
            Manage your digital products from one place.
          </p>
        </div>

        <Link
          href="/dashboard/products/new"
          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full bg-[#EEF35F] px-5 text-xs font-bold text-black hover:bg-[#e5ea4e] hover:shadow-[0_0_15px_rgba(238,243,95,0.3)] transition-all shadow-sm shrink-0"
        >
          <Plus className="size-3.5" />
          <span>Add Product</span>
        </Link>
      </div>

      {/* 3 Static Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* Total Products */}
        <Card className="border-neutral-800 bg-neutral-950">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <span className="text-xs font-mono font-medium text-neutral-400">
              Total Products
            </span>
            <div className="size-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#EEF35F]">
              <Package className="size-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold font-heading text-white">24</div>
            <p className="text-[11px] text-neutral-400 mt-1">Digital products catalog</p>
          </CardContent>
        </Card>

        {/* Published */}
        <Card className="border-neutral-800 bg-neutral-950">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <span className="text-xs font-mono font-medium text-neutral-400">
              Published
            </span>
            <div className="size-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <BadgeCheck className="size-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold font-heading text-white">18</div>
            <p className="text-[11px] text-neutral-400 mt-1">Live in store marketplace</p>
          </CardContent>
        </Card>

        {/* Drafts */}
        <Card className="border-neutral-800 bg-neutral-950">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <span className="text-xs font-mono font-medium text-neutral-400">
              Drafts
            </span>
            <div className="size-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-300">
              <FileEdit className="size-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold font-heading text-white">6</div>
            <p className="text-[11px] text-neutral-400 mt-1">Unpublished draft assets</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h2 className="text-sm font-mono font-semibold uppercase tracking-wider text-neutral-400">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/dashboard/products/new"
            className="group rounded-2xl border border-neutral-800 bg-neutral-950 p-5 flex items-center justify-between hover:border-[#EEF35F]/40 hover:bg-neutral-900/60 transition-all"
          >
            <div className="flex items-center gap-3.5">
              <div className="size-11 rounded-xl bg-[#EEF35F] text-black flex items-center justify-center font-bold">
                <Plus className="size-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white font-heading group-hover:text-[#EEF35F] transition-colors">
                  Add New Product
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Publish a new template, UI kit, or developer resource.
                </p>
              </div>
            </div>
            <ArrowRight className="size-4 text-neutral-500 group-hover:text-[#EEF35F] group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            href="/dashboard/products"
            className="group rounded-2xl border border-neutral-800 bg-neutral-950 p-5 flex items-center justify-between hover:border-neutral-700 hover:bg-neutral-900/60 transition-all"
          >
            <div className="flex items-center gap-3.5">
              <div className="size-11 rounded-xl bg-neutral-900 border border-neutral-800 text-white flex items-center justify-center font-bold">
                <Package className="size-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white font-heading group-hover:text-white transition-colors">
                  Manage Products
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Search, filter, edit, or remove catalog products.
                </p>
              </div>
            </div>
            <ArrowRight className="size-4 text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </div>

      {/* Recent Products Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold font-heading text-white">Recent Products</h2>
            <p className="text-xs text-neutral-400">Recently published and updated digital assets.</p>
          </div>
          <Link
            href="/dashboard/products"
            className="text-xs font-semibold text-[#EEF35F] hover:underline underline-offset-4"
          >
            View all products &rarr;
          </Link>
        </div>

        <ProductTable products={products} onDeleteProduct={handleDeleteProduct} />
      </div>
    </div>
  );
}
