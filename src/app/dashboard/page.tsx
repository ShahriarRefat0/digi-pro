import * as React from "react";
import Link from "next/link";
import {
  Package,
  BadgeCheck,
  FileEdit,
  Plus,
  ArrowRight,
} from "lucide-react";
import { getDashboardProductStats, getProducts } from "@/lib/products/product.repository";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ProductTable } from "@/components/dashboard/products/ProductTable";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [stats, recentProducts] = await Promise.all([
    getDashboardProductStats(),
    getProducts({ limit: 4, sort: { updatedAt: -1 } }),
  ]);

  return (
    <div className="space-y-8">
      {/* Page Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight font-heading text-gray-900">
            Careproff Admin Overview
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 font-normal">
            Manage your maternal and pediatric care products catalog.
          </p>
        </div>

        <Link
          href="/dashboard/products/new"
          className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-[#0F766E] px-5 text-xs font-bold text-white hover:bg-[#115E59] transition-all shadow-xs shrink-0"
        >
          <Plus className="size-4" />
          <span>Add Care Product</span>
        </Link>
      </div>

      {/* 3 Real Metric Cards from MongoDB */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* Total Products */}
        <Card className="border-gray-200 bg-white shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Total Products
            </span>
            <div className="size-9 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-[#0F766E]">
              <Package className="size-4.5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-heading text-gray-900">{stats.total}</div>
            <p className="text-[11px] text-gray-500 mt-1 font-medium">Care essentials in catalog</p>
          </CardContent>
        </Card>

        {/* Published */}
        <Card className="border-gray-200 bg-white shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Published
            </span>
            <div className="size-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <BadgeCheck className="size-4.5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-heading text-gray-900">{stats.published}</div>
            <p className="text-[11px] text-gray-500 mt-1 font-medium">Active in public store</p>
          </CardContent>
        </Card>

        {/* Drafts */}
        <Card className="border-gray-200 bg-white shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Drafts
            </span>
            <div className="size-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
              <FileEdit className="size-4.5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-heading text-gray-900">{stats.drafts}</div>
            <p className="text-[11px] text-gray-500 mt-1 font-medium">Unpublished draft items</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/dashboard/products/new"
            className="group rounded-2xl border border-gray-200 bg-white p-5 flex items-center justify-between hover:border-teal-300 hover:bg-[#F0FDFA] transition-all shadow-xs"
          >
            <div className="flex items-center gap-3.5">
              <div className="size-11 rounded-xl bg-[#0F766E] text-white flex items-center justify-center font-bold">
                <Plus className="size-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 font-heading group-hover:text-[#0F766E] transition-colors">
                  Add New Product
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Add a new maternal care lotion, baby wash, or pediatric item.
                </p>
              </div>
            </div>
            <ArrowRight className="size-4 text-gray-400 group-hover:text-[#0F766E] group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            href="/dashboard/products"
            className="group rounded-2xl border border-gray-200 bg-white p-5 flex items-center justify-between hover:border-gray-300 hover:bg-slate-50 transition-all shadow-xs"
          >
            <div className="flex items-center gap-3.5">
              <div className="size-11 rounded-xl bg-slate-100 border border-gray-200 text-gray-800 flex items-center justify-center font-bold">
                <Package className="size-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 font-heading transition-colors">
                  Manage Products Catalog
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Search, filter, update prices, or remove products.
                </p>
              </div>
            </div>
            <ArrowRight className="size-4 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </div>

      {/* Recent Products Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold font-heading text-gray-900">Recent Care Products</h2>
            <p className="text-xs text-gray-500">Recently published and updated products.</p>
          </div>
          <Link
            href="/dashboard/products"
            className="text-xs font-bold text-[#0F766E] hover:underline underline-offset-4"
          >
            View all products &rarr;
          </Link>
        </div>

        <ProductTable products={recentProducts} />
      </div>
    </div>
  );
}

