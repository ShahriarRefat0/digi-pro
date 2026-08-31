"use client"

import * as React from "react"
import Link from "next/link"
import {
  LayoutDashboard,
  DownloadCloud,
  Heart,
  Settings,
  CreditCard,
  LogOut,
  Sparkles,
  ShieldAlert,
  HelpCircle,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function UserMenu() {
  const [isSignedIn, setIsSignedIn] = React.useState(true)

  if (!isSignedIn) {
    return (
      <Button
        variant="default"
        size="sm"
        onClick={() => setIsSignedIn(true)}
        className="rounded-full text-xs font-semibold px-4 shadow-xs"
      >
        Sign In
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            className="group relative flex items-center gap-2 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary/50 transition-transform active:scale-95"
            aria-label="User profile menu"
          />
        }
      >
        <Avatar className="size-8 border-2 border-primary/20 transition-all group-hover:border-primary">
          <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" alt="Alex Morgan" />
          <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
            AM
          </AvatarFallback>
        </Avatar>
        <span className="sr-only">Open user menu</span>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 p-1.5 shadow-xl rounded-xl">
        <DropdownMenuLabel className="p-2 font-normal">
          <div className="flex items-center gap-2.5">
            <Avatar className="size-9">
              <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" alt="Alex Morgan" />
              <AvatarFallback>AM</AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-0.5 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold truncate text-foreground">Alex Morgan</span>
                <Badge variant="default" className="text-[9px] h-3.5 px-1 font-bold">
                  PRO
                </Badge>
              </div>
              <span className="text-[11px] text-muted-foreground truncate">
                alex.morgan@digipro.io
              </span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem render={<Link href="/admin" className="cursor-pointer" />}>
            <LayoutDashboard className="size-4 text-muted-foreground" />
            <span>Dashboard</span>
          </DropdownMenuItem>

          <DropdownMenuItem render={<Link href="/products" className="cursor-pointer" />}>
            <DownloadCloud className="size-4 text-muted-foreground" />
            <span>My Downloads</span>
            <Badge variant="secondary" className="ml-auto text-[10px] h-4 px-1 font-mono">
              12
            </Badge>
          </DropdownMenuItem>

          <DropdownMenuItem render={<Link href="/products" className="cursor-pointer" />}>
            <Heart className="size-4 text-muted-foreground" />
            <span>Saved Wishlist</span>
            <Badge variant="outline" className="ml-auto text-[10px] h-4 px-1 font-mono">
              5
            </Badge>
          </DropdownMenuItem>

          <DropdownMenuItem render={<Link href="/admin/products" className="cursor-pointer" />}>
            <Sparkles className="size-4 text-amber-500" />
            <span className="text-amber-600 dark:text-amber-400 font-medium">Creator Hub</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem render={<Link href="/admin" className="cursor-pointer" />}>
            <ShieldAlert className="size-4 text-muted-foreground" />
            <span>Admin Console</span>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <CreditCard className="size-4 text-muted-foreground" />
            <span>Billing & Invoices</span>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Settings className="size-4 text-muted-foreground" />
            <span>Account Settings</span>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <HelpCircle className="size-4 text-muted-foreground" />
            <span>Support & Docs</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          onClick={() => setIsSignedIn(false)}
          className="cursor-pointer text-destructive focus:bg-destructive/10"
        >
          <LogOut className="size-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
