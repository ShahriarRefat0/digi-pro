"use client"

import * as React from "react"
import Link from "next/link"
import {
  Menu,
  Sparkles,
  Layers,
  Box,
  Smile,
  Layout,
  Type,
  Code2,
  Flame,
  LayoutDashboard,
  User,
  ShoppingBag,
} from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "./theme-toggle"

const MOBILE_CATEGORIES = [
  { name: "UI Kits & Systems", icon: Layers, href: "/products?category=ui-kits", count: "140+" },
  { name: "3D Assets & Models", icon: Box, href: "/products?category=3d-assets", count: "85+" },
  { name: "Icon Packs (SVG)", icon: Smile, href: "/products?category=icons", count: "320+" },
  { name: "SaaS & Web Templates", icon: Layout, href: "/products?category=templates", count: "90+" },
  { name: "Fonts & Typography", icon: Type, href: "/products?category=fonts", count: "60+" },
  { name: "Code Snippets & Starters", icon: Code2, href: "/products?category=code", count: "45+" },
]

export function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-9 w-9 text-muted-foreground hover:text-foreground"
            aria-label="Open mobile navigation menu"
          />
        }
      >
        <Menu className="size-5" />
      </SheetTrigger>

      <SheetContent side="left" className="w-[300px] sm:w-[360px] p-0 flex flex-col">
        <SheetHeader className="p-5 pb-3 border-b text-left">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-black text-sm shadow-md">
              DP
            </div>
            <div>
              <SheetTitle className="text-base font-extrabold flex items-center gap-1.5">
                DigiPro <span className="text-primary">Store</span>
                <Badge variant="default" className="text-[9px] h-3.5 px-1 font-bold">
                  PRO
                </Badge>
              </SheetTitle>
              <SheetDescription className="text-[11px] text-muted-foreground">
                Premium Digital Assets & Templates
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {/* Highlight Deals */}
          <div className="rounded-xl bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-orange-500/10 border border-rose-500/20 p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1">
                <Flame className="size-3.5 fill-rose-500 text-rose-500" />
                Flash Sale Active
              </span>
              <Badge variant="destructive" className="text-[10px] h-4 px-1 font-bold">
                -30% OFF
              </Badge>
            </div>
            <p className="text-[11px] text-muted-foreground mb-2.5">
              Use code <span className="font-mono font-bold text-foreground">DIGI30</span> at checkout.
            </p>
            <SheetClose
              render={
                <Button
                  size="xs"
                  className="w-full text-xs font-semibold"
                  render={<Link href="/products" />}
                >
                  Shop Discounted Assets
                </Button>
              }
            />
          </div>

          {/* Categories */}
          <div className="space-y-1.5">
            <h4 className="px-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Browse Categories
            </h4>
            <div className="grid gap-1">
              {MOBILE_CATEGORIES.map((cat) => {
                const Icon = cat.icon
                return (
                  <SheetClose
                    key={cat.name}
                    render={
                      <Link
                        href={cat.href}
                        className="flex items-center justify-between rounded-lg px-2.5 py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors"
                      />
                    }
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="size-4 text-muted-foreground" />
                      <span>{cat.name}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground font-mono">
                      {cat.count}
                    </span>
                  </SheetClose>
                )
              })}
            </div>
          </div>

          <Separator />

          {/* Quick Pages */}
          <div className="space-y-1.5">
            <h4 className="px-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Explore More
            </h4>
            <div className="grid gap-1">
              <SheetClose
                render={
                  <Link
                    href="/products"
                    className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium text-foreground hover:bg-muted"
                  />
                }
              >
                <Sparkles className="size-4 text-amber-500" />
                <span>Featured Assets</span>
              </SheetClose>
              <SheetClose
                render={
                  <Link
                    href="/admin"
                    className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium text-foreground hover:bg-muted"
                  />
                }
              >
                <LayoutDashboard className="size-4 text-primary" />
                <span>Admin Console</span>
              </SheetClose>
              <SheetClose
                render={
                  <Link
                    href="/admin/products"
                    className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium text-foreground hover:bg-muted"
                  />
                }
              >
                <ShoppingBag className="size-4 text-emerald-500" />
                <span>Sell Digital Products</span>
              </SheetClose>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t bg-muted/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
              <User className="size-4" />
            </div>
            <div className="text-xs">
              <p className="font-semibold text-foreground">Alex Morgan</p>
              <p className="text-[10px] text-muted-foreground">Pro Member</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <ThemeToggle />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
