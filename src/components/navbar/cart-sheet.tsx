"use client"

import * as React from "react"
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Zap,
  Tag,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"

export interface CartItem {
  id: string
  title: string
  category: string
  price: number
  quantity: number
  license: string
  iconBg: string
}

const INITIAL_CART: CartItem[] = [
  {
    id: "item-1",
    title: "NovaUI Pro - React & Tailwind Kit",
    category: "UI Kits",
    price: 49.0,
    quantity: 1,
    license: "Extended Commercial",
    iconBg: "bg-indigo-500/10 text-indigo-500",
  },
  {
    id: "item-2",
    title: "Hyper3D - 120+ Isometric Icons",
    category: "3D Assets",
    price: 29.0,
    quantity: 1,
    license: "Standard License",
    iconBg: "bg-amber-500/10 text-amber-500",
  },
]

export function CartSheet() {
  const [items, setItems] = React.useState<CartItem[]>(INITIAL_CART)
  const [promoCode, setPromoCode] = React.useState("")
  const [appliedDiscount, setAppliedDiscount] = React.useState<number | null>(null)
  const [promoError, setPromoError] = React.useState<string | null>(null)
  const [promoSuccess, setPromoSuccess] = React.useState<string | null>(null)

  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const rawSubtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discountAmount = appliedDiscount ? (rawSubtotal * appliedDiscount) / 100 : 0
  const finalTotal = Math.max(0, rawSubtotal - discountAmount)

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta
            return nextQty > 0 ? { ...item, quantity: nextQty } : null
          }
          return item
        })
        .filter(Boolean) as CartItem[]
    )
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault()
    setPromoError(null)
    setPromoSuccess(null)
    const code = promoCode.trim().toUpperCase()
    if (!code) return

    if (code === "DIGI30" || code === "PRO30") {
      setAppliedDiscount(30)
      setPromoSuccess("30% discount applied!")
    } else if (code === "SAVE10") {
      setAppliedDiscount(10)
      setPromoSuccess("10% discount applied!")
    } else {
      setPromoError("Invalid coupon code. Try 'DIGI30'")
    }
  }

  const restoreSampleCart = () => {
    setItems(INITIAL_CART)
    setAppliedDiscount(null)
    setPromoSuccess(null)
    setPromoError(null)
  }

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            variant="outline"
            size="icon"
            className="relative h-9 w-9 rounded-full border-border/70 hover:bg-accent transition-colors"
            aria-label={`Cart with ${totalItemCount} items`}
          />
        }
      >
        <ShoppingBag className="size-4" />
        {totalItemCount > 0 && (
          <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground animate-in zoom-in-50">
            {totalItemCount}
          </span>
        )}
      </SheetTrigger>

      <SheetContent side="right" className="flex flex-col w-full sm:max-w-md p-0">
        <SheetHeader className="p-5 pb-3 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-lg font-bold flex items-center gap-2">
              <ShoppingBag className="size-5 text-primary" />
              Your Cart
            </SheetTitle>
            <Badge variant="secondary" className="font-semibold">
              {totalItemCount} {totalItemCount === 1 ? "item" : "items"}
            </Badge>
          </div>
          <SheetDescription className="text-xs text-muted-foreground flex items-center gap-1.5 pt-1">
            <Zap className="size-3.5 text-amber-500 fill-amber-500" />
            Instant digital delivery to your account after checkout
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="size-16 rounded-full bg-muted flex items-center justify-center mb-4 text-muted-foreground">
              <ShoppingBag className="size-8 stroke-[1.5]" />
            </div>
            <h3 className="font-semibold text-base mb-1">Your cart is empty</h3>
            <p className="text-xs text-muted-foreground max-w-xs mb-6">
              Explore thousands of curated UI kits, fonts, 3D models, and code templates.
            </p>
            <Button onClick={restoreSampleCart} size="sm" className="gap-2">
              <Plus className="size-4" />
              Load Sample Items
            </Button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="group relative flex items-start gap-3 rounded-xl border p-3 transition-colors hover:border-primary/40 bg-card/60"
                >
                  <div
                    className={`size-12 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs ${item.iconBg}`}
                  >
                    {item.category.slice(0, 2).toUpperCase()}
                  </div>

                  <div className="flex-1 min-w-0 pr-2">
                    <h4 className="text-xs font-semibold leading-snug line-clamp-1 group-hover:text-primary transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-muted-foreground">{item.license}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs font-bold text-foreground">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>

                      {/* Quantity buttons */}
                      <div className="flex items-center gap-1 border rounded-md px-1 py-0.5 bg-muted/30">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="size-5 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-background transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span className="w-4 text-center text-xs font-medium">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="size-5 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-background transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="size-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="text-muted-foreground/60 hover:text-destructive transition-colors p-1"
                    aria-label="Remove item"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Promo Code Form */}
            <div className="pt-2">
              <form onSubmit={applyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" />
                  <Input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Coupon code (e.g. DIGI30)"
                    className="h-8 pl-8 text-xs uppercase"
                  />
                </div>
                <Button type="submit" variant="secondary" size="sm" className="h-8 text-xs">
                  Apply
                </Button>
              </form>
              {promoSuccess && (
                <p className="mt-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
                  <CheckCircle2 className="size-3" /> {promoSuccess}
                </p>
              )}
              {promoError && (
                <p className="mt-1.5 text-[11px] text-destructive font-medium">
                  {promoError}
                </p>
              )}
            </div>

            {/* Guarantee badge */}
            <div className="rounded-lg bg-muted/50 p-2.5 flex items-center gap-2 text-[11px] text-muted-foreground">
              <ShieldCheck className="size-4 text-emerald-500 shrink-0" />
              <span>100% Secure Checkout with 14-day Money-Back Guarantee</span>
            </div>
          </div>
        )}

        {items.length > 0 && (
          <SheetFooter className="p-5 pt-3 border-t bg-muted/20 flex flex-col gap-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>${rawSubtotal.toFixed(2)}</span>
              </div>
              {appliedDiscount && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                  <span>Discount ({appliedDiscount}%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-muted-foreground">
                <span>Digital Delivery</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">FREE</span>
              </div>
              <Separator className="my-1" />
              <div className="flex justify-between text-sm font-bold text-foreground">
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <SheetClose
              render={
                <Button className="w-full h-10 gap-2 font-semibold shadow-md">
                  Checkout Now
                  <ArrowRight className="size-4" />
                </Button>
              }
            />
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}
