"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Plus,
  ExternalLink,
  UserCircle,
  LogOut,
  X,
  Images,
  ShoppingCart,
  BookOpen,
  FolderTree,
} from "lucide-react";
import { MAIN_DASHBOARD_NAV } from "@/lib/dashboard-navigation";
import { logoutAdminAction } from "@/app/actions/auth";

const ICON_MAP = {
  LayoutDashboard: LayoutDashboard,
  Package: Package,
  Plus: Plus,
  ExternalLink: ExternalLink,
  Images: Images,
  ShoppingCart: ShoppingCart,
  BookOpen: BookOpen,
  FolderTree: FolderTree,
};

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export function Sidebar({ mobileOpen, onCloseMobile }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAdminAction();
    router.push("/login");
    router.refresh();
  };

  const sidebarContent = (
    <div className="flex h-full w-full flex-col justify-between bg-white text-gray-900 border-r border-gray-200">
      {/* Top Header / Brand */}
      <div>
        <div className="flex h-16 items-center justify-between px-6 border-b border-gray-200">
          <Link
            href="/dashboard"
            onClick={onCloseMobile}
            className="flex items-center gap-2 font-heading font-bold text-lg tracking-tight text-gray-900 hover:text-[#0F766E] transition-colors"
          >
            <div className="size-8 rounded-lg bg-[#0F766E] text-white flex items-center justify-center font-black text-sm shadow-xs">
              C
            </div>
            <span>Careproff Admin</span>
          </Link>

          {/* Close button on mobile */}
          {onCloseMobile && (
            <button
              type="button"
              onClick={onCloseMobile}
              className="lg:hidden size-8 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:text-gray-900"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        {/* Navigation List */}
        <div className="p-4 space-y-6">
          <div>
            <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
              Admin Menu
            </p>
            <nav className="space-y-1">
              {MAIN_DASHBOARD_NAV.map((item) => {
                const Icon = ICON_MAP[item.icon as keyof typeof ICON_MAP] || LayoutDashboard;
                const isActive =
                  item.href === "/dashboard"
                    ? pathname === "/dashboard"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onCloseMobile}
                    className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-[#CCFBF1] text-[#0F766E] font-bold shadow-xs border border-teal-200"
                        : "text-gray-600 hover:bg-slate-50 hover:text-[#0F766E]"
                    }`}
                  >
                    <Icon className="size-4 shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom Section: Website Link + Admin Profile + Logout */}
      <div className="p-4 border-t border-gray-200 space-y-3 bg-[#FAFAF8]">
        {/* View Website */}
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold text-gray-700 hover:bg-white hover:text-[#0F766E] transition-colors border border-gray-200 shadow-xs"
        >
          <span className="flex items-center gap-2.5">
            <ExternalLink className="size-4 text-gray-500" />
            <span>View Public Store</span>
          </span>
          <span className="text-[10px] text-gray-400 font-medium">Public</span>
        </Link>

        {/* Admin Profile */}
        <div className="rounded-2xl border border-gray-200 bg-white p-3 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-full bg-[#F0FDFA] border border-teal-200 flex items-center justify-center text-[#0F766E]">
              <UserCircle className="size-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900 leading-none">Admin</p>
              <p className="text-[10px] text-gray-500 mt-1">Administrator</p>
            </div>
          </div>

          <button
            type="button"
            title="Log Out"
            onClick={handleLogout}
            className="size-8 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 transition-colors cursor-pointer"
          >
            <LogOut className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-gray-200 bg-white shrink-0 h-screen sticky top-0">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
            onClick={onCloseMobile}
          />
          <div className="relative w-72 max-w-[80vw] h-full bg-white border-r border-gray-200 z-10 shadow-2xl animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;

