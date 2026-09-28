"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, ShieldCheck } from "lucide-react";
import { PillNav, PillNavItem } from "./pill-nav";
import { GlobalSearch } from "@/components/search";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems: PillNavItem[] = [
    { label: "Discover Products", href: "/products" },
    { label: "Pediatric Services", href: "/services" },
    { label: "Care Journal", href: "/blog" },
  ];

  // Close mobile menu on route change
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-md text-gray-900 shadow-xs">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand Logo + Care Trust Badge */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/"
            className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 hover:text-[#0F766E] transition-colors font-heading flex items-center gap-2"
          >
            <span className="size-7 rounded-lg bg-[#0F766E] text-white flex items-center justify-center text-sm font-black">C</span>
            <span>Careproff</span>
          </Link>

          <span
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-[#F0FDFA] px-2.5 py-0.5 text-xs font-medium text-[#0F766E]"
          >
            <ShieldCheck className="size-3.5 text-[#0F766E]" />
            <span className="text-[11px] font-semibold tracking-tight">100% Dermatologist Safe</span>
          </span>
        </div>

        {/* Center: Global Search Bar */}
        <GlobalSearch />

        {/* Right Desktop Nav Actions: PillNav + Shop Now */}
        <div className="hidden lg:flex items-center gap-4 shrink-0">
          <PillNav
            items={navItems}
            activeHref={pathname}
            baseColor="#0F766E"
            pillColor="#F0FDFA"
            pillTextColor="#374151"
            hoveredPillTextColor="#ffffff"
            ease="power2.out"
          />

          <Link
            href="/products"
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full bg-[#0F766E] px-5 text-xs font-bold text-white transition-all hover:bg-[#115E59] active:scale-95 shadow-xs"
          >
            <span>Shop Now</span>
          </Link>
        </div>

        {/* Mobile / Tablet Actions (< 1024px) */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/products"
            className="inline-flex h-8 items-center justify-center rounded-full bg-[#0F766E] px-3.5 text-xs font-bold text-white transition-colors hover:bg-[#115E59] active:scale-95"
          >
            <span>Shop</span>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="size-9 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-700 hover:border-[#0F766E] hover:text-[#0F766E] transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="size-4.5" />
            ) : (
              <Menu className="size-4.5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-200 bg-white px-4 py-6 shadow-lg lg:hidden animate-in slide-in-from-top-2 duration-200">
          <div className="mx-auto max-w-md space-y-1.5">
            <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
              Care Navigation
            </p>

            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname?.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-all ${isActive
                      ? "bg-[#F0FDFA] text-[#0F766E] font-bold border border-teal-200"
                      : "text-gray-700 hover:bg-gray-50 hover:text-[#0F766E]"
                    }`}
                >
                  <span>{item.label}</span>
                  {isActive ? (
                    <span className="size-2 rounded-full bg-[#0F766E]" />
                  ) : (
                    <ArrowRight className="size-3.5 text-gray-400" />
                  )}
                </Link>
              );
            })}

            <div className="my-3 border-t border-gray-200" />

            <div className="pt-1">
              <Link
                href="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center rounded-xl bg-[#0F766E] py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#115E59]"
              >
                Shop All Care Products
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;

