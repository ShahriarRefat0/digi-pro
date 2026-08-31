"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PillNav, PillNavItem } from "./pill-nav";

export function Navbar() {
  const pathname = usePathname();

  const navItems: PillNavItem[] = [
    { label: "Discover", href: "/products" },
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blog" },
    { label: "Pricing", href: "/pricing" },
    { label: "Features", href: "/features" },
    { label: "About", href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-900 bg-black/95 backdrop-blur-md text-white selection:bg-[#EEF35F] selection:text-black">
      <div className="flex h-16 w-full items-center justify-between pl-6 sm:pl-8 pr-0">
        {/* Left: Brand Logo + GitHub Stars Badge */}
        <div className="flex items-center gap-3.5">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-white hover:text-[#EEF35F] transition-colors font-heading"
          >
            gumroad
          </Link>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-neutral-800 bg-neutral-950 px-2.5 py-1 text-xs font-medium text-neutral-300 hover:border-neutral-600 hover:text-white transition-colors"
          >
            <svg className="size-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span className="text-[11px] font-medium tracking-tight">9.6K ★</span>
          </a>
        </div>

        {/* Center: React Bits PillNav */}
        <div className="hidden lg:flex items-center">
          <PillNav
            items={navItems}
            activeHref={pathname}
            baseColor="#EEF35F"
            pillColor="#0d0e0e"
            pillTextColor="#ffffff"
            hoveredPillTextColor="#000000"
            ease="power2.out"
          />
        </div>

        {/* Right Desktop Nav Actions */}
        <div className="flex h-full items-center">
          <Link
            href="/admin"
            className="hidden sm:inline-flex text-xs font-semibold text-neutral-300 transition-colors hover:text-white mr-6"
          >
            Dashboard
          </Link>

          <Link
            href="/admin/products"
            className="flex h-full items-center justify-center bg-[#EEF35F] px-5 sm:px-7 text-xs sm:text-sm font-bold text-black transition-colors hover:bg-[#e5ea4e] border-l border-neutral-900 active:scale-95"
          >
            Start selling
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
