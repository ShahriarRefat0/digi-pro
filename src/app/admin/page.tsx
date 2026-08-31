import * as React from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, DollarSign, Package, Users, TrendingUp } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex-1 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b">
          <div>
            <Badge variant="outline" className="mb-1 text-xs">
              Management Console
            </Badge>
            <h1 className="text-3xl font-extrabold tracking-tight font-heading">
              Store Dashboard
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              Overview of digital product sales, revenue, and customer
              analytics.
            </p>
          </div>

          <Button
            render={<Link href="/admin/products" />}
            className="gap-2 text-xs"
          >
            <Plus className="size-4" />
            Upload New Product
          </Button>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
          <div className="rounded-2xl border bg-card p-5">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span>Total Revenue</span>
              <DollarSign className="size-4 text-emerald-500" />
            </div>
            <p className="text-2xl font-extrabold font-heading text-foreground">
              $18,420.50
            </p>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
              <TrendingUp className="size-3" /> +14.2% from last month
            </p>
          </div>

          <div className="rounded-2xl border bg-card p-5">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span>Total Downloads</span>
              <Package className="size-4 text-blue-500" />
            </div>
            <p className="text-2xl font-extrabold font-heading text-foreground">
              3,892
            </p>
            <p className="text-[11px] text-blue-600 dark:text-blue-400 mt-1 flex items-center gap-1">
              <TrendingUp className="size-3" /> +8.1% this week
            </p>
          </div>

          <div className="rounded-2xl border bg-card p-5">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span>Active Creators</span>
              <Users className="size-4 text-purple-500" />
            </div>
            <p className="text-2xl font-extrabold font-heading text-foreground">
              124
            </p>
            <p className="text-[11px] text-muted-foreground mt-1">
              28 pending approvals
            </p>
          </div>

          <div className="rounded-2xl border bg-card p-5">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span>Conversion Rate</span>
              <TrendingUp className="size-4 text-amber-500" />
            </div>
            <p className="text-2xl font-extrabold font-heading text-foreground">
              4.82%
            </p>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1">
              +0.6% vs benchmark
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
