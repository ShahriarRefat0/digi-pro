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
} from "lucide-react";
import { MAIN_DASHBOARD_NAV, BOTTOM_DASHBOARD_NAV } from "@/lib/dashboard-navigation";
import { logoutAdminAction } from "@/app/actions/auth";

const ICON_MAP = {
  LayoutDashboard: LayoutDashboard,
  Package: Package,
  Plus: Plus,
  ExternalLink: ExternalLink,
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
    <div className="flex h-full w-full flex-col justify-between bg-black text-white">
      {/* Top Header / Brand */}
      <div>
        <div className="flex h-16 items-center justify-between px-6 border-b border-neutral-900">
          <Link
            href="/dashboard"
            onClick={onCloseMobile}
            className="flex items-center gap-2 font-heading font-extrabold text-lg tracking-tight text-white hover:text-[#EEF35F] transition-colors"
          >
            <div className="size-7 rounded-lg bg-[#EEF35F] text-black flex items-center justify-center font-black text-sm shadow-sm">
              D
            </div>
            <span>DigiForge</span>
          </Link>

          {/* Close button on mobile */}
          {onCloseMobile && (
            <button
              type="button"
              onClick={onCloseMobile}
              className="lg:hidden size-8 rounded-lg border border-neutral-800 bg-neutral-950 flex items-center justify-center text-neutral-400 hover:text-white"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        {/* Navigation List */}
        <div className="p-4 space-y-6">
          <div>
            <p className="px-3 pb-2 text-[10px] font-mono font-semibold uppercase tracking-wider text-neutral-500">
              Main Menu
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
                        ? "bg-[#EEF35F] text-black font-bold shadow-md shadow-[#EEF35F]/20"
                        : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
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
      <div className="p-4 border-t border-neutral-900 space-y-3">
        {/* View Website */}
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-medium text-neutral-400 hover:bg-neutral-900 hover:text-white transition-colors border border-neutral-800/80"
        >
          <span className="flex items-center gap-2.5">
            <ExternalLink className="size-4 text-neutral-500" />
            <span>View Website</span>
          </span>
          <span className="text-[10px] font-mono text-neutral-500">Public</span>
        </Link>

        {/* Admin Profile */}
        <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#EEF35F]">
              <UserCircle className="size-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white leading-none">Admin</p>
              <p className="text-[10px] font-mono text-neutral-400 mt-1">Administrator</p>
            </div>
          </div>

          <button
            type="button"
            title="Log Out"
            onClick={handleLogout}
            className="size-8 rounded-lg border border-neutral-800 bg-neutral-900 flex items-center justify-center text-neutral-400 hover:text-rose-400 hover:border-rose-500/30 transition-colors cursor-pointer"
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
      <aside className="hidden lg:flex w-64 flex-col border-r border-neutral-900 bg-black shrink-0 h-screen sticky top-0">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={onCloseMobile}
          />
          <div className="relative w-72 max-w-[80vw] h-full bg-black border-r border-neutral-800 z-10 shadow-2xl animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
