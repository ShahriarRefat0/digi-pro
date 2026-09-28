"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Bell, Search } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
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
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white/95 px-4 sm:px-6 lg:px-8 backdrop-blur-md shadow-xs">
      {/* Left: Mobile Toggle & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="lg:hidden size-9 rounded-xl border border-gray-300 bg-white flex items-center justify-center text-gray-700 hover:text-[#0F766E]"
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
                      className="transition-colors hover:text-[#0F766E]"
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
          onClick={() => alert("Search shortcut")}
          className="hidden sm:inline-flex items-center gap-2 rounded-full border border-gray-300 bg-gray-50 px-3 py-1.5 text-xs text-gray-600 hover:border-[#0F766E] hover:text-[#0F766E] transition-colors"
        >
          <Search className="size-3.5" />
          <span>Search dashboard...</span>
          <kbd className="rounded bg-gray-200 px-1.5 py-0.5 text-[10px] font-mono text-gray-600">
            ⌘K
          </kbd>
        </button>

        {/* Notification Bell */}
        <button
          type="button"
          onClick={() => alert("Notifications: All systems operational")}
          className="relative size-9 rounded-xl border border-gray-300 bg-white flex items-center justify-center text-gray-600 hover:text-[#0F766E] hover:border-[#0F766E] transition-colors"
          aria-label="Notifications"
        >
          <Bell className="size-4" />
          <span className="absolute top-2 right-2 size-2 rounded-full bg-[#0F766E]" />
        </button>

        {/* Admin Avatar */}
        <div className="size-9 rounded-full bg-[#F0FDFA] border border-teal-200 flex items-center justify-center text-xs font-bold text-[#0F766E] shadow-xs">
          AD
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;

