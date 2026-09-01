import * as React from "react";
import { Suspense } from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft, Terminal, ShieldCheck, Loader2 } from "lucide-react";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Admin Sign In — DigiForge",
  description: "Administrative login portal for DigiForge store management.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-black text-white selection:bg-[#EEF35F] selection:text-black relative overflow-hidden">
      {/* Background Radial Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="size-[650px] rounded-full bg-radial from-neutral-900/80 via-black to-black blur-3xl opacity-40" />
      </div>

      {/* Top Header */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors group"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Store</span>
        </Link>

        <div className="flex items-center gap-2 font-heading font-extrabold text-sm tracking-tight text-neutral-400">
          <Terminal className="size-4 text-[#EEF35F]" />
          <span className="font-mono text-xs uppercase tracking-wider text-neutral-300">
            ADMIN PORTAL
          </span>
        </div>
      </header>

      {/* Main Form Center */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-10 sm:py-16">
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-20 text-neutral-400 gap-2">
              <Loader2 className="size-5 animate-spin text-[#EEF35F]" />
              <span className="text-xs font-mono">Loading authentication...</span>
            </div>
          }
        >
          <LoginForm />
        </Suspense>
      </main>

      {/* Security Footer */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500 font-mono">
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-4 text-neutral-400" />
          <span>Restricted Single-Admin Authentication Service</span>
        </div>
        <div>
          <span>&copy; {new Date().getFullYear()} DigiForge Inc.</span>
        </div>
      </footer>
    </div>
  );
}
