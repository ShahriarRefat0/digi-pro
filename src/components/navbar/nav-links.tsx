"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ChevronDown,
  Layers,
  Box,
  Smile,
  Layout,
  Type,
  Code2,
  Sparkles,
  Flame,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const CATEGORIES = [
  {
    title: "UI Kits & Design Systems",
    description: "Figma, React & Tailwind component sets",
    icon: Layers,
    href: "/products?category=ui-kits",
    badge: "Popular",
    color: "text-blue-500",
  },
  {
    title: "3D Assets & Models",
    description: "Isometric 3D illustrations, GLTF & OBJ assets",
    icon: Box,
    href: "/products?category=3d-assets",
    badge: "Hot",
    color: "text-amber-500",
  },
  {
    title: "Icon Packs & Glyphs",
    description: "Thousands of vector and animated SVGs",
    icon: Smile,
    href: "/products?category=icons",
    badge: "10k+",
    color: "text-emerald-500",
  },
  {
    title: "Web & SaaS Templates",
    description: "Production ready Next.js & Tailwind websites",
    icon: Layout,
    href: "/products?category=templates",
    badge: "New",
    color: "text-purple-500",
  },
  {
    title: "Fonts & Typography",
    description: "Modern display, serif, and monospaced typefaces",
    icon: Type,
    href: "/products?category=fonts",
    color: "text-rose-500",
  },
  {
    title: "Code Snippets & Plugins",
    description: "Full-stack starter boilerplates & integrations",
    icon: Code2,
    href: "/products?category=code",
    color: "text-cyan-500",
  },
]

export function NavLinks({ className }: { className?: string }) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex items-center gap-1 lg:gap-2", className)}>
      {/* Categories Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <button
              className="group inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
              aria-label="Browse categories"
            />
          }
        >
          <Layers className="size-3.5 text-primary/80" />
          <span>Categories</span>
          <ChevronDown className="size-3 transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" className="w-80 p-2 shadow-2xl rounded-2xl">
          <DropdownMenuLabel className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            Digital Asset Categories
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <div className="grid gap-1">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon
              return (
                <DropdownMenuItem
                  key={cat.title}
                  render={<Link href={cat.href} className="cursor-pointer" />}
                  className="flex items-start gap-2.5 p-2 rounded-xl group/item"
                >
                  <div className="size-8 rounded-lg bg-muted flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-background transition-colors shadow-2xs">
                    <Icon className={cn("size-4", cat.color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-bold text-foreground">
                        {cat.title}
                      </span>
                      {cat.badge && (
                        <Badge
                          variant={cat.badge === "Hot" ? "destructive" : "secondary"}
                          className="text-[9px] h-4 px-1 font-bold"
                        >
                          {cat.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-[11px] text-muted-foreground line-clamp-1">
                      {cat.description}
                    </p>
                  </div>
                </DropdownMenuItem>
              )
            })}
          </div>

          <DropdownMenuSeparator className="my-1.5" />

          <div className="p-1">
            <Link
              href="/products"
              className="flex items-center justify-center gap-1.5 rounded-lg bg-muted/70 py-1.5 text-center text-xs font-medium text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Sparkles className="size-3.5" />
              Explore All 2,400+ Products
            </Link>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Direct Links */}
      <Link
        href="/products"
        className={cn(
          "inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors hover:text-foreground hover:bg-muted/60",
          pathname === "/products" ? "text-foreground font-bold bg-muted/50" : "text-muted-foreground"
        )}
      >
        <Sparkles className="size-3.5 text-amber-500" />
        <span>Featured</span>
      </Link>

      <Link
        href="/products"
        className={cn(
          "inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors hover:text-foreground hover:bg-muted/60",
          pathname?.includes("deals") ? "text-foreground font-bold" : "text-muted-foreground"
        )}
      >
        <Flame className="size-3.5 text-rose-500 animate-pulse" />
        <span>Deals</span>
        <Badge variant="destructive" className="h-4 px-1 text-[9px] font-bold ml-0.5">
          -50%
        </Badge>
      </Link>

      <Link
        href="/admin"
        className="hidden xl:inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
      >
        <span>Admin Panel</span>
      </Link>
    </nav>
  )
}
