"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Plus, DollarSign, Package, Users, TrendingUp, Sparkles } from "lucide-react";

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
    iconColor: "text-[#EEF35F]",
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
    <div className="min-h-screen flex flex-col bg-black text-white selection:bg-[#EEF35F] selection:text-black">
      <Navbar />

      <main className="flex-1 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 w-full bg-black">
        {/* Animated Dashboard Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-neutral-900"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-950 px-3.5 py-1 text-xs font-semibold text-[#EEF35F] mb-3">
              <Sparkles className="size-3.5" />
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
            className="group inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#EEF35F] px-6 text-xs font-bold text-black transition-all hover:bg-[#e5ea4e] hover:shadow-[0_0_20px_rgba(238,243,95,0.3)] active:scale-95 shadow-md"
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
                className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6 shadow-md transition-colors duration-200 hover:border-neutral-700 hover:bg-neutral-900/60"
              >
                <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                  <span>{stat.title}</span>
                  <Icon className={`size-4 ${stat.iconColor}`} />
                </div>
                <p className="text-2xl font-extrabold font-heading text-white">
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
