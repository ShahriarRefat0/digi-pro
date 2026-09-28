import * as React from "react";
import { Suspense } from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft, Terminal, ShieldCheck, Loader2 } from "lucide-react";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Admin Sign In — Careproff",
  description: "Administrative login portal for Careproff store management.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-900 selection:bg-teal-100 selection:text-teal-900 relative overflow-hidden">
      {/* Background Radial Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="size-[650px] rounded-full bg-radial from-teal-100/60 via-slate-50 to-slate-50 blur-3xl opacity-60" />
      </div>

      {/* Top Header */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors group"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Store</span>
        </Link>

        <div className="flex items-center gap-2 font-heading font-extrabold text-sm tracking-tight text-slate-700">
          <Terminal className="size-4 text-[#0F766E]" />
          <span className="font-mono text-xs uppercase tracking-wider text-slate-700">
            ADMIN PORTAL
          </span>
        </div>
      </header>

      {/* Main Form Center */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-10 sm:py-16">
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-20 text-slate-500 gap-2">
              <Loader2 className="size-5 animate-spin text-[#0F766E]" />
              <span className="text-xs font-mono">Loading authentication...</span>
            </div>
          }
        >
          <LoginForm />
        </Suspense>
      </main>

      {/* Security Footer */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-mono">
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-4 text-slate-400" />
          <span>Restricted Single-Admin Authentication Service</span>
        </div>
        <div>
          <span>&copy; {new Date().getFullYear()} Careproff.</span>
        </div>
      </footer>
    </div>
  );
}
