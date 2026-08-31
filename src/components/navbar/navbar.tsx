"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { PillNav, PillNavItem } from "./pill-nav";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems: PillNavItem[] = [
    { label: "Discover", href: "/products" },
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  // Close mobile menu on route change
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-900 bg-black/90 backdrop-blur-xl text-white selection:bg-[#EEF35F] selection:text-black">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand Logo + GitHub Stars Badge */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-xl sm:text-2xl font-bold tracking-tight text-white hover:text-[#EEF35F] transition-colors font-heading"
          >
            gumroad
          </Link>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-neutral-800 bg-neutral-950 px-2.5 py-0.5 text-xs font-medium text-neutral-300 hover:border-neutral-600 hover:text-white transition-colors"
          >
            <svg className="size-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span className="text-[11px] font-medium tracking-tight">9.6K ★</span>
          </a>
        </div>

        {/* Center: React Bits GSAP PillNav (Desktop / Large Tablet) */}
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
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/admin"
            className="text-xs font-semibold text-neutral-300 transition-colors hover:text-white"
          >
            Dashboard
          </Link>

          <Link
            href="/admin/products"
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full bg-[#EEF35F] px-5 text-xs font-bold text-black transition-all hover:bg-[#e5ea4e] hover:shadow-[0_0_15px_rgba(238,243,95,0.3)] active:scale-95 shadow-sm"
          >
            <span>Start selling</span>
          </Link>
        </div>

        {/* Mobile / Tablet Actions (< 1024px) */}
        <div className="flex items-center gap-2.5 lg:hidden">
          <Link
            href="/admin/products"
            className="inline-flex h-8 items-center justify-center rounded-full bg-[#EEF35F] px-3.5 text-xs font-bold text-black transition-colors hover:bg-[#e5ea4e] active:scale-95"
          >
            <span>Sell</span>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="size-9 rounded-full border border-neutral-800 bg-neutral-950 flex items-center justify-center text-white hover:border-neutral-700 hover:text-[#EEF35F] transition-colors focus:outline-none"
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
        <div className="border-t border-neutral-900 bg-black/95 px-4 py-6 backdrop-blur-2xl lg:hidden animate-in slide-in-from-top-2 duration-200">
          <div className="mx-auto max-w-md space-y-1.5">
            <p className="px-3 pb-2 text-[10px] font-mono font-semibold uppercase tracking-wider text-neutral-500">
              Navigation
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
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-[#EEF35F] text-black font-bold shadow-md shadow-[#EEF35F]/20"
                      : "text-neutral-300 hover:bg-neutral-900 hover:text-white"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive ? (
                    <span className="size-2 rounded-full bg-black" />
                  ) : (
                    <ArrowRight className="size-3.5 text-neutral-600" />
                  )}
                </Link>
              );
            })}

            <div className="my-3 border-t border-neutral-900" />

            <div className="grid grid-cols-2 gap-2 pt-1">
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center rounded-xl border border-neutral-800 bg-neutral-950 py-2.5 text-xs font-semibold text-neutral-300 transition-colors hover:bg-neutral-900 hover:text-white"
              >
                Dashboard
              </Link>

              <Link
                href="/admin/products"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center rounded-xl bg-[#EEF35F] py-2.5 text-xs font-bold text-black transition-colors hover:bg-[#e5ea4e]"
              >
                Start selling
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
