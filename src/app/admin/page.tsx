"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Plus, DollarSign, Package, Users, TrendingUp } from "lucide-react";

const STATS_METRICS = [
  {
    title: "Total Revenue",
    value: "$18,420.50",
    change: "+14.2% from last month",
    changeColor: "text-emerald-400",
    icon: DollarSign,
    iconColor: "text-emerald-400",
  },
  {
    title: "Total Downloads",
    value: "3,892",
    change: "+8.1% this week",
    changeColor: "text-blue-400",
    icon: Package,
    iconColor: "text-blue-400",
  },
  {
    title: "Active Creators",
    value: "124",
    change: "28 pending approvals",
    changeColor: "text-neutral-400",
    icon: Users,
    iconColor: "text-[#0F766E]",
  },
  {
    title: "Conversion Rate",
    value: "4.82%",
    change: "+0.6% vs benchmark",
    changeColor: "text-emerald-400",
    icon: TrendingUp,
    iconColor: "text-amber-400",
  },
];

export default function AdminPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-teal-100 selection:text-teal-900">
      <Navbar />

      <main className="flex-1 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 w-full bg-slate-50">
        {/* Animated Dashboard Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-slate-200"
        >
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight font-heading text-slate-900">
              Store Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Overview of digital product sales, revenue, and creator analytics.
            </p>
          </div>

          <Link
            href="/admin/products"
            className="group inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#0F766E] px-6 text-xs font-bold text-white transition-all hover:bg-[#115E59] active:scale-95 shadow-xs"
          >
            <Plus className="size-4 transition-transform duration-200 group-hover:rotate-90" />
            <span>Upload New Product</span>
          </Link>
        </motion.div>

        {/* Animated Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
          {STATS_METRICS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: idx * 0.08, ease: "easeOut" }}
                whileHover={{ y: -6, transition: { duration: 0.2, ease: "easeOut" } }}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition-colors duration-200 hover:border-slate-300"
              >
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span>{stat.title}</span>
                  <Icon className={`size-4 ${stat.iconColor}`} />
                </div>
                <p className="text-2xl font-extrabold font-heading text-slate-900">
                  {stat.value}
                </p>
                <p className={`text-[11px] ${stat.changeColor} mt-2 flex items-center gap-1`}>
                  {stat.change}
                </p>
              </motion.div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
