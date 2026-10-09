"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ArrowRight,
  ShoppingCart,
  Heart,
  Truck,
  Sparkles,
} from "lucide-react";
import { GlobalSearch } from "@/components/search";
import { useCart } from "@/context/CartContext";
import { CartDrawer } from "@/components/cart/CartDrawer";

export interface CategoryNavItem {
  label: string;
  href: string;
}

export const DEFAULT_CATEGORY_NAV_ITEMS: CategoryNavItem[] = [
  { label: "All Products", href: "/products" },
  { label: "Baby Care", href: "/products?category=Baby+Essentials" },
  { label: "Maternal Care", href: "/products?category=Maternal+Care" },
  { label: "Bath & Hygiene", href: "/products?category=Baby+Essentials" },
  { label: "Diapers & Wipes", href: "/products?category=Baby+Essentials" },
  { label: "Feeding & Nursing", href: "/products?category=Maternal+Care" },
  { label: "Postpartum Recovery", href: "/products?category=Maternal+Care" },
  { label: "Care Journal", href: "/care-journal" },
  { label: "About Us", href: "/about" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { totalQuantity, setIsDrawerOpen } = useCart();
  const [navItems, setNavItems] = React.useState<CategoryNavItem[]>(DEFAULT_CATEGORY_NAV_ITEMS);

  // Fetch dynamic active categories from MongoDB
  React.useEffect(() => {
    async function loadDynamicNavbarCategories() {
      try {
        const res = await fetch("/api/categories?navbar=true");
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.categories) && data.categories.length > 0) {
            const dynamicItems: CategoryNavItem[] = [
              { label: "All Products", href: "/products" },
              ...data.categories.map((c: any) => ({
                label: c.name,
                href: `/products?category=${encodeURIComponent(c.slug || c.name)}`,
              })),
              { label: "Care Journal", href: "/care-journal" },
              { label: "About Us", href: "/about" },
            ];
            setNavItems(dynamicItems);
          }
        }
      } catch (err) {
        console.error("Failed to load dynamic navbar categories:", err);
      }
    }
    loadDynamicNavbarCategories();
  }, []);

  // Close mobile menu on route change
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="w-full bg-[#7C9473] text-white text-[11px] sm:text-xs font-medium py-2 px-4 text-center select-none shadow-xs">
        <div className="mx-auto max-w-7xl flex items-center justify-between sm:justify-center gap-4">
          <span className="hidden sm:inline-block font-semibold">
            🚚 Free Shipping in Dhaka on orders over ৳1500
          </span>
          <span className="sm:hidden font-semibold">
            🚚 Cash on Delivery Across Bangladesh 🇧🇩
          </span>
          <span className="hidden md:inline-block text-[#FAF7F0] opacity-90">
            • 100% Authentic Baby &amp; Mother Care Products
          </span>
        </div>
      </div>

      {/* Main Two-Row Sticky Header */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md text-[#29332D] shadow-xs border-b border-[#e2e8e3]">
        {/* ROW 1: Top Navigation (Logo, Wide Search, Shopping Actions) */}
        <div className="border-b border-[#e2e8e3]">
          <div className="mx-auto flex h-16 sm:h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-3 sm:gap-6">
            {/* Left: Brand Logo */}
            <div className="flex items-center shrink-0">
              <Link
                href="/"
                className="text-xl sm:text-2xl font-black tracking-tight text-[#29332D] hover:text-[#7C9473] transition-colors font-heading flex items-center gap-2.5 group"
              >
                <span className="size-9 sm:size-10 rounded-xl bg-[#7C9473] text-white flex items-center justify-center text-base sm:text-lg font-black shadow-xs group-hover:bg-[#6b8262] transition-colors">
                  C
                </span>
                <span className="flex items-baseline gap-0.5">
                  <span>Careoffbd</span>
                  <span className="text-[#7C9473] text-xs sm:text-sm font-semibold">.com</span>
                </span>
              </Link>
            </div>

            {/* Center: Wide Search Bar */}
            <GlobalSearch />

            {/* Right: Shopping Actions (Track Order, Cart, Wishlist) */}
            <div className="hidden md:flex items-center gap-5 sm:gap-6 shrink-0">
              {/* 1. Track Order Action */}
              <Link
                href="/cart"
                title="Track your order status"
                className="group flex flex-col items-center gap-0.5 text-[#29332D] hover:text-[#7C9473] transition-colors cursor-pointer"
              >
                <div className="size-9 rounded-full bg-[#FAF7F0] border border-[#e2e8e3] group-hover:border-[#7C9473] flex items-center justify-center transition-colors">
                  <Truck className="size-4.5 text-[#29332D] group-hover:text-[#7C9473] transition-colors" />
                </div>
                <span className="text-[11px] font-medium tracking-tight">Track Order</span>
              </Link>

              {/* 2. Shopping Cart Action with Badge */}
              <button
                type="button"
                onClick={() => setIsDrawerOpen(true)}
                aria-label={totalQuantity > 0 ? `Shopping cart, ${totalQuantity} items` : "Shopping cart"}
                className="group flex flex-col items-center gap-0.5 text-[#29332D] hover:text-[#7C9473] transition-colors cursor-pointer"
              >
                <div className="relative size-9 rounded-full bg-[#FAF7F0] border border-[#e2e8e3] group-hover:border-[#7C9473] flex items-center justify-center transition-colors">
                  <ShoppingCart className="size-4.5 text-[#29332D] group-hover:text-[#7C9473] transition-colors" />
                  {totalQuantity > 0 && (
                    <span className="absolute -top-1 -right-1 flex size-4.5 items-center justify-center rounded-full bg-[#7C9473] text-[9px] font-bold text-white shadow-xs font-mono animate-in zoom-in-50 duration-200">
                      {totalQuantity}
                    </span>
                  )}
                </div>
                <span className="text-[11px] font-medium tracking-tight">Cart</span>
              </button>

              {/* 3. Wishlist Action */}
              <button
                type="button"
                onClick={() => setIsDrawerOpen(true)}
                title="Wishlist"
                className="group flex flex-col items-center gap-0.5 text-[#29332D] hover:text-[#7C9473] transition-colors cursor-pointer"
              >
                <div className="size-9 rounded-full bg-[#FAF7F0] border border-[#e2e8e3] group-hover:border-[#7C9473] flex items-center justify-center transition-colors">
                  <Heart className="size-4.5 text-[#29332D] group-hover:text-[#7C9473] transition-colors" />
                </div>
                <span className="text-[11px] font-medium tracking-tight">Wishlist</span>
              </button>
            </div>

            {/* Mobile Actions Container (< 768px) */}
            <div className="flex items-center gap-2 md:hidden">
              {/* Cart button */}
              <button
                type="button"
                onClick={() => setIsDrawerOpen(true)}
                aria-label={totalQuantity > 0 ? `Shopping cart, ${totalQuantity} items` : "Shopping cart"}
                className="relative inline-flex size-9 items-center justify-center rounded-full border border-[#e2e8e3] bg-[#FAF7F0] text-[#29332D] hover:border-[#7C9473] hover:text-[#7C9473] transition-all cursor-pointer shadow-xs active:scale-95"
              >
                <ShoppingCart className="size-4" />
                {totalQuantity > 0 && (
                  <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-[#7C9473] text-[9px] font-bold text-white shadow-xs font-mono animate-in zoom-in-50 duration-200">
                    {totalQuantity}
                  </span>
                )}
              </button>

              {/* Hamburger Toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="size-9 rounded-full border border-[#e2e8e3] bg-white flex items-center justify-center text-[#29332D] hover:border-[#7C9473] hover:text-[#7C9473] transition-colors focus:outline-none"
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
        </div>

        {/* ROW 2: Bottom Category Navigation Row */}
        <div className="bg-[#FAF7F0]/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav
              aria-label="Category Navigation"
              className="flex items-center gap-6 overflow-x-auto py-2.5 scrollbar-none whitespace-nowrap text-xs sm:text-sm font-semibold text-[#29332D]"
            >
              {navItems.map((cat) => {
                const isActive =
                  pathname === cat.href ||
                  (cat.href.includes("category=") &&
                    pathname.startsWith("/products") &&
                    typeof window !== "undefined" &&
                    window.location.search.includes(cat.href.split("?")[1]));

                return (
                  <Link
                    key={cat.label}
                    href={cat.href}
                    className={`relative py-1 transition-colors shrink-0 hover:text-[#7C9473] ${
                      isActive
                        ? "text-[#7C9473] font-bold"
                        : "text-[#29332D]/80 hover:text-[#7C9473]"
                    }`}
                  >
                    <span>{cat.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[#7C9473]" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Mobile Drawer Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-[#e2e8e3] bg-white px-4 py-6 shadow-lg md:hidden animate-in slide-in-from-top-2 duration-200">
            <div className="mx-auto max-w-md space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#e2e8e3]">
                <p className="text-xs font-bold uppercase tracking-wider text-[#7C9473]">
                  Product Categories
                </p>
                <span className="inline-flex items-center gap-1 text-[10px] text-[#29332D]/60">
                  <Sparkles className="size-3 text-[#7C9473]" />
                  <span>Careoffbd Catalog</span>
                </span>
              </div>

              {/* Mobile Quick Action Buttons: Track Order & Wishlist */}
              <div className="grid grid-cols-2 gap-3 py-1">
                <Link
                  href="/cart"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 p-2.5 rounded-xl border border-[#e2e8e3] bg-[#FAF7F0] text-xs font-bold text-[#29332D] hover:border-[#7C9473] transition-colors"
                >
                  <Truck className="size-4 text-[#7C9473]" />
                  <span>Track Order</span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsDrawerOpen(true);
                  }}
                  className="flex items-center justify-center gap-2 p-2.5 rounded-xl border border-[#e2e8e3] bg-[#FAF7F0] text-xs font-bold text-[#29332D] hover:border-[#7C9473] transition-colors cursor-pointer"
                >
                  <Heart className="size-4 text-[#7C9473]" />
                  <span>Wishlist</span>
                </button>
              </div>

              {/* Mobile Category Links List */}
              <div className="space-y-1 pt-2 border-t border-[#e2e8e3]">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between rounded-xl px-4 py-2.5 text-xs font-semibold text-[#29332D] hover:bg-[#FAF7F0] hover:text-[#7C9473] transition-all"
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="size-3.5 text-[#29332D]/40" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Cart Drawer Overlay */}
      <CartDrawer />
    </>
  );
}

export default Navbar;
