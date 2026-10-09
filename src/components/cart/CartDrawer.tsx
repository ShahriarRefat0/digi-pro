"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingCart,
  X,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

export function CartDrawer() {
  const router = useRouter();
  const {
    cartItems,
    totalQuantity,
    subtotal,
    isDrawerOpen,
    setIsDrawerOpen,
    updateQuantity,
    removeFromCart,
  } = useCart();

  if (!isDrawerOpen) return null;

  const handleClose = () => {
    setIsDrawerOpen(false);
  };

  const handleViewCart = () => {
    setIsDrawerOpen(false);
    router.push("/cart");
  };

  const handleCheckout = () => {
    setIsDrawerOpen(false);
    router.push("/checkout");
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
        onClick={handleClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md h-full bg-white border-l border-[#29332D]/10 shadow-2xl z-10 flex flex-col justify-between animate-in slide-in-from-right duration-250">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#29332D]/10 bg-[#FAF7F0]/80">
          <div className="flex items-center gap-2.5">
            <div className="size-9 rounded-xl bg-[#7C9473]/10 border border-[#7C9473]/20 text-[#7C9473] flex items-center justify-center">
              <ShoppingCart className="size-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#29332D] font-heading">
                Shopping Cart
              </h2>
              <p className="text-[11px] text-[#29332D]/60">
                {totalQuantity} {totalQuantity === 1 ? "item" : "items"} selected
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close cart"
            className="size-8 rounded-full border border-[#29332D]/10 bg-white flex items-center justify-center text-[#29332D]/60 hover:text-[#29332D] hover:bg-[#FAF7F0] transition-colors cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Cart Items List / Empty State */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 py-12">
              <div className="size-16 rounded-full bg-[#7C9473]/10 border border-[#7C9473]/20 text-[#7C9473] flex items-center justify-center">
                <ShoppingCart className="size-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-[#29332D] font-heading">
                  Your cart is empty
                </h3>
                <p className="text-xs text-[#29332D]/60 max-w-xs leading-relaxed">
                  Discover gentle care essentials for mothers and little ones.
                </p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="inline-flex items-center gap-2 rounded-xl bg-[#7C9473] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#6b8262] transition-all cursor-pointer shadow-xs"
              >
                <ShoppingBag className="size-4" />
                <span>Continue Shopping</span>
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.productId}
                className="group relative flex gap-4 rounded-2xl border border-[#29332D]/10 bg-[#FAF7F0]/40 p-4 transition-all hover:bg-white hover:shadow-xs"
              >
                {/* Thumbnail */}
                <div className="relative size-16 rounded-xl overflow-hidden border border-[#29332D]/10 bg-[#FAF7F0] shrink-0">
                  <Image
                    src={item.thumbnail}
                    alt={item.name}
                    fill
                    className="object-cover"
                    unoptimized={item.thumbnail.startsWith("blob:") || item.thumbnail.startsWith("/uploads")}
                  />
                </div>

                {/* Info & Quantity */}
                <div className="flex flex-col justify-between flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-bold text-[#29332D] font-heading truncate max-w-[170px]">
                        {item.name}
                      </h4>
                      {item.category && (
                        <p className="text-[10px] text-[#7C9473] font-semibold">
                          {item.category}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.productId)}
                      aria-label={`Remove ${item.name} from cart`}
                      className="text-[#29332D]/40 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#29332D]/10">
                    <span className="text-xs font-bold text-[#7C9473] font-mono">
                      ৳{item.price}
                    </span>

                    {/* Quantity Controls */}
                    <div className="flex items-center rounded-lg border border-[#29332D]/10 bg-white">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        aria-label="Decrease quantity"
                        className="size-7 flex items-center justify-center text-[#29332D] hover:bg-[#FAF7F0] rounded-l-lg transition-colors cursor-pointer"
                      >
                        <Minus className="size-3" />
                      </button>
                      <span className="px-2 text-xs font-mono font-bold text-[#29332D] min-w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        aria-label="Increase quantity"
                        className="size-7 flex items-center justify-center text-[#29332D] hover:bg-[#FAF7F0] rounded-r-lg transition-colors cursor-pointer"
                      >
                        <Plus className="size-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer (Subtotal & Actions) */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-[#29332D]/10 bg-[#FAF7F0]/80 space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm font-bold text-[#29332D] font-heading">
                <span>Subtotal</span>
                <span className="text-base font-mono text-[#7C9473]">
                  ৳{subtotal.toLocaleString()}
                </span>
              </div>
              <p className="text-[11px] text-[#29332D]/60 font-normal">
                Delivery fee calculated at checkout.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={handleViewCart}
                className="w-full inline-flex h-11 items-center justify-center rounded-xl border border-[#29332D]/10 bg-white px-4 text-xs font-bold text-[#29332D] hover:bg-[#FAF7F0] transition-colors shadow-xs cursor-pointer"
              >
                View Cart
              </button>
              <button
                type="button"
                onClick={handleCheckout}
                className="w-full inline-flex h-11 items-center justify-center gap-1.5 rounded-xl bg-[#7C9473] px-4 text-xs font-bold text-white hover:bg-[#6b8262] transition-all shadow-xs cursor-pointer"
              >
                <span>Checkout</span>
                <ArrowRight className="size-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
