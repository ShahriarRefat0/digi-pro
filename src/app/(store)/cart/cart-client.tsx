"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  AlertTriangle,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

export function CartClient() {
  const {
    cartItems,
    subtotal,
    totalQuantity,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const [showClearConfirm, setShowClearConfirm] = React.useState(false);

  if (cartItems.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16"
      >
        <div className="size-24 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center mb-6 shadow-sm">
          <ShoppingCart className="size-12 text-[#0F766E]" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 tracking-tight">
          Your cart is empty
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-md">
          Discover gentle care essentials for mothers and little ones.
        </p>
        <div className="mt-8">
          <Link
            href="/products"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#0F766E] px-8 text-sm font-bold text-white hover:bg-[#115E59] transition-all shadow-md shadow-teal-900/10 active:scale-95"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8 pb-16 relative"
    >
      {/* Clear Cart Modal */}
      <AnimatePresence>
        {showClearConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full border border-slate-200 shadow-xl space-y-4"
            >
              <div className="flex items-center gap-3 text-rose-600">
                <div className="size-10 rounded-full bg-rose-50 flex items-center justify-center shrink-0">
                  <AlertTriangle className="size-5" />
                </div>
                <h3 className="text-lg font-bold font-heading text-slate-900">
                  Clear your cart?
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600">
                Are you sure you want to remove all items from your shopping cart? This action cannot be undone.
              </p>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowClearConfirm(false)}
                  className="px-5 py-2.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    clearCart();
                    setShowClearConfirm(false);
                  }}
                  className="px-5 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors shadow-sm cursor-pointer"
                >
                  Clear Cart
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 tracking-tight">
            Shopping Cart
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-mono mt-1">
            {totalQuantity} {totalQuantity === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="size-4" />
            <span>Continue Shopping</span>
          </Link>

          <button
            type="button"
            onClick={() => setShowClearConfirm(true)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-full px-3.5 py-1.5 transition-colors cursor-pointer"
          >
            <Trash2 className="size-3.5" />
            <span>Clear Cart</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Item List & Order Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Cart Item List (Left 2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.productId}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl border border-slate-200 bg-white shadow-xs hover:border-slate-300 transition-all"
            >
              {/* Product Info & Thumbnail */}
              <div className="flex items-center gap-4 min-w-0 flex-1">
                <div className="relative size-20 sm:size-24 rounded-xl border border-slate-200 bg-slate-50 shrink-0 overflow-hidden">
                  <Image
                    src={item.thumbnail}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 space-y-1">
                  {item.category && (
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#0F766E] bg-teal-50 border border-teal-100 rounded-full px-2 py-0.5 inline-block">
                      {item.category}
                    </span>
                  )}
                  <Link
                    href={`/products/${item.slug}`}
                    className="text-sm sm:text-base font-bold text-slate-900 hover:text-[#0F766E] transition-colors block truncate"
                  >
                    {item.name}
                  </Link>
                  <div className="text-xs text-slate-500 font-mono">
                    Unit Price: ৳{item.price.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Quantity Controls & Line Subtotal */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                {/* Quantity selector */}
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 p-1">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    aria-label={`Decrease quantity of ${item.name}`}
                    className="size-7 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    <Minus className="size-3" />
                  </button>
                  <span className="w-7 text-center text-xs font-bold font-mono text-slate-900">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    aria-label={`Increase quantity of ${item.name}`}
                    className="size-7 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <Plus className="size-3" />
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-right min-w-[90px]">
                  <span className="text-xs font-mono text-slate-400 block">Subtotal</span>
                  <span className="text-base font-extrabold font-mono text-slate-900">
                    ৳{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>

                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => removeFromCart(item.productId)}
                  aria-label={`Remove ${item.name} from cart`}
                  className="size-8 rounded-full flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          ))}

          {/* Guarantee Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
            <div className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-600">
              <Truck className="size-4 text-[#0F766E] shrink-0" />
              <span>Fast Nationwide Shipping</span>
            </div>
            <div className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-600">
              <ShieldCheck className="size-4 text-[#0F766E] shrink-0" />
              <span>100% Authentic Products</span>
            </div>
            <div className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-600">
              <RotateCcw className="size-4 text-[#0F766E] shrink-0" />
              <span>Hassle-free Support</span>
            </div>
          </div>
        </div>

        {/* Order Summary (Right 1 col) */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg space-y-6 sticky top-24">
          <h2 className="text-lg font-bold font-heading text-slate-900 border-b border-slate-100 pb-3">
            Order Summary
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between text-slate-600">
              <span>Subtotal ({totalQuantity} items)</span>
              <span className="font-mono font-bold text-slate-900">
                ৳{subtotal.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between text-slate-600">
              <span>Delivery Fee</span>
              <span className="text-xs text-teal-700 bg-teal-50 font-semibold px-2 py-0.5 rounded-full border border-teal-100">
                Calculated at checkout
              </span>
            </div>

            <div className="flex items-center justify-between text-slate-600">
              <span>Discount</span>
              <span className="font-mono text-slate-500">৳0</span>
            </div>

            <div className="border-t border-slate-200 pt-4 flex items-baseline justify-between">
              <div>
                <span className="text-base font-bold text-slate-900 block">Total</span>
                <span className="text-[10px] text-slate-400 font-mono">Excl. delivery fee</span>
              </div>
              <span className="text-2xl font-extrabold font-mono text-[#0F766E]">
                ৳{subtotal.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <Link
              href="/checkout"
              className="w-full inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#0F766E] px-8 text-sm font-bold text-white hover:bg-[#115E59] transition-all shadow-md shadow-teal-900/10 active:scale-95 text-center"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="size-4" />
            </Link>

            <Link
              href="/products"
              className="w-full inline-flex h-10 items-center justify-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-6 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
