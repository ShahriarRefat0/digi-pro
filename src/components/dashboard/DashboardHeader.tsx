"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Bell, Search, User, ChevronRight } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface DashboardHeaderProps {
  onOpenMobileMenu: () => void;
}

export function DashboardHeader({ onOpenMobileMenu }: DashboardHeaderProps) {
  const pathname = usePathname();

  // Compute breadcrumb segments
  const getBreadcrumbs = () => {
    if (pathname === "/dashboard") {
      return [{ label: "Dashboard", href: "/dashboard", isCurrent: true }];
    }
    if (pathname === "/dashboard/products") {
      return [
        { label: "Dashboard", href: "/dashboard", isCurrent: false },
        { label: "Manage Products", href: "/dashboard/products", isCurrent: true },
      ];
    }
    if (pathname === "/dashboard/products/new") {
      return [
        { label: "Dashboard", href: "/dashboard", isCurrent: false },
        { label: "Manage Products", href: "/dashboard/products", isCurrent: false },
        { label: "Add Product", href: "/dashboard/products/new", isCurrent: true },
      ];
    }
    return [{ label: "Dashboard", href: "/dashboard", isCurrent: true }];
  };

  const crumbs = getBreadcrumbs();

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-neutral-900 bg-black/90 px-4 sm:px-6 lg:px-8 backdrop-blur-xl">
      {/* Left: Mobile Toggle & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="lg:hidden size-9 rounded-xl border border-neutral-800 bg-neutral-950 flex items-center justify-center text-neutral-400 hover:text-white"
          aria-label="Open sidebar"
        >
          <Menu className="size-4.5" />
        </button>

        {/* Dynamic Breadcrumbs */}
        <Breadcrumb>
          <BreadcrumbList>
            {crumbs.map((crumb, idx) => (
              <React.Fragment key={crumb.href + idx}>
                <BreadcrumbItem>
                  {crumb.isCurrent ? (
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="transition-colors hover:text-white"
                    >
                      {crumb.label}
                    </Link>
                  )}
                </BreadcrumbItem>
                {idx < crumbs.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Right: Search, Notifications & Avatar */}
      <div className="flex items-center gap-3">
        {/* Quick Search Button */}
        <button
          type="button"
          onClick={() => alert("Search shortcut (Demo)")}
          className="hidden sm:inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-950 px-3 py-1.5 text-xs text-neutral-400 hover:border-neutral-700 hover:text-white transition-colors"
        >
          <Search className="size-3.5" />
          <span>Quick search...</span>
          <kbd className="rounded bg-neutral-900 px-1.5 py-0.5 text-[10px] font-mono text-neutral-500">
            ⌘K
          </kbd>
        </button>

        {/* Notification Bell */}
        <button
          type="button"
          onClick={() => alert("Notifications: No new alerts (Demo)")}
          className="relative size-9 rounded-xl border border-neutral-800 bg-neutral-950 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="size-4" />
          <span className="absolute top-2 right-2 size-2 rounded-full bg-[#EEF35F]" />
        </button>

        {/* Admin Avatar */}
        <div className="size-9 rounded-full bg-gradient-to-tr from-neutral-800 to-neutral-700 border border-neutral-700 flex items-center justify-center text-xs font-bold text-white shadow-sm">
          AD
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;
