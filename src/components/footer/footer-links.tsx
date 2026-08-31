import * as React from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

interface LinkItem {
  name: string
  href: string
  badge?: string
}

interface LinkGroup {
  title: string
  links: LinkItem[]
}

const LINK_GROUPS: LinkGroup[] = [
  {
    title: "Digital Assets",
    links: [
      { name: "UI Kits & Systems", href: "/products?category=ui-kits" },
      { name: "3D Models & Assets", href: "/products?category=3d-assets", badge: "Popular" },
      { name: "Icon Packs & SVGs", href: "/products?category=icons" },
      { name: "Next.js Templates", href: "/products?category=templates", badge: "New" },
      { name: "Typography & Fonts", href: "/products?category=fonts" },
      { name: "Free Community Drops", href: "/products" },
    ],
  },
  {
    title: "Resources & Docs",
    links: [
      { name: "Component Docs", href: "/products" },
      { name: "License Breakdown", href: "/products" },
      { name: "Figma Setup Guide", href: "/products" },
      { name: "Release Changelog", href: "/products", badge: "v2.4" },
      { name: "Design System Kit", href: "/products" },
      { name: "Discord Community", href: "https://discord.com" },
    ],
  },
  {
    title: "Creators & Sellers",
    links: [
      { name: "Become a Creator", href: "/admin/products", badge: "Earn 85%" },
      { name: "Creator Dashboard", href: "/admin" },
      { name: "Submission Guidelines", href: "/admin" },
      { name: "Earnings Calculator", href: "/admin" },
      { name: "Affiliate Program", href: "/admin" },
    ],
  },
  {
    title: "Company & Trust",
    links: [
      { name: "About DigiPro", href: "/" },
      { name: "Commercial Licensing", href: "/products" },
      { name: "Privacy Policy", href: "/" },
      { name: "Terms of Service", href: "/" },
      { name: "Refund & Returns", href: "/" },
      { name: "Customer Support", href: "/" },
    ],
  },
]

export function FooterLinks() {
  return (
    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
      {LINK_GROUPS.map((group) => (
        <div key={group.title} className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
            {group.title}
          </h3>
          <ul className="space-y-2">
            {group.links.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="group inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">
                    {link.name}
                  </span>
                  {link.badge && (
                    <Badge
                      variant={link.badge.includes("%") ? "destructive" : "secondary"}
                      className="text-[9px] h-3.5 px-1 font-semibold"
                    >
                      {link.badge}
                    </Badge>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
