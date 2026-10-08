"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import {
  CheckCircle2,
  PackageCheck,
  ShoppingBag,
  ArrowRight,
  MapPin,
  Phone,
  User,
  Loader2,
} from "lucide-react";
import { Order } from "@/types/order";
import { getOrderDetailsAction } from "@/app/actions/checkout";

export function OrderSuccessClient() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const [order, setOrder] = React.useState<Order | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchOrder() {
      if (!orderId) {
        setLoading(false);
        return;
      }
      try {
        const fetched = await getOrderDetailsAction(orderId);
        setOrder(fetched);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-8">
        <Loader2 className="size-8 text-[#0F766E] animate-spin mb-3" />
        <p className="text-xs text-slate-500 font-mono">Loading order confirmation...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl mx-auto space-y-8 pb-16"
    >
      {/* Hero Confirmation Badge */}
      <div className="text-center space-y-3 pt-6">
        <div className="size-20 rounded-full bg-teal-50 border-2 border-teal-100 flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="size-10 text-[#0F766E]" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
          Thank You for Your Order!
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Your order has been received and is being processed by Careproff.
        </p>
        {order && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono text-slate-800 font-bold">
            Order #{order.orderNumber}
          </div>
        )}
      </div>

      {order ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-lg space-y-6">
          <h2 className="text-base sm:text-lg font-bold font-heading text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <PackageCheck className="size-5 text-[#0F766E]" />
            <span>Order Details</span>
          </h2>

          {/* Purchased Items List */}
          <div className="space-y-4">
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-4 p-3.5 rounded-2xl border border-slate-100 bg-slate-50/50"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative size-14 rounded-xl border border-slate-200 bg-white shrink-0 overflow-hidden">
                    <Image
                      src={item.thumbnail}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-mono">
                      Quantity: {item.quantity} × ৳{item.price.toLocaleString()}
                    </p>
                  </div>
                </div>
                <span className="text-xs sm:text-sm font-bold font-mono text-slate-900 shrink-0">
                  ৳{item.subtotal.toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          {/* Customer & Shipping Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs text-slate-700">
            <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <span className="font-bold text-slate-900 uppercase tracking-wider text-[10px] text-[#0F766E] block">
                Shipping Customer
              </span>
              <div className="flex items-center gap-2">
                <User className="size-3.5 text-slate-400" />
                <span className="font-semibold text-slate-900">{order.customer.fullName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="size-3.5 text-slate-400" />
                <span>{order.customer.phone}</span>
              </div>
              <div className="flex items-start gap-2 pt-1">
                <MapPin className="size-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>{order.customer.address}, {order.customer.city}</span>
              </div>
            </div>

            <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-100 font-mono">
              <span className="font-bold text-slate-900 uppercase tracking-wider text-[10px] font-sans text-[#0F766E] block">
                Payment Summary
              </span>
              <div className="flex justify-between">
                <span className="text-slate-500 font-sans">Subtotal</span>
                <span>৳{order.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-sans">Delivery Fee</span>
                <span>৳{order.deliveryFee}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 font-bold text-slate-900 text-sm">
                <span className="font-sans">Total Paid</span>
                <span className="text-[#0F766E]">৳{order.total.toLocaleString()}</span>
              </div>
              <div className="text-[11px] text-slate-500 font-sans pt-1">
                Payment Method: <span className="font-bold text-slate-700 uppercase">{order.paymentMethod}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 rounded-2xl border border-slate-200 bg-white text-center text-sm text-slate-600">
          We received your purchase! A confirmation message will be sent shortly.
        </div>
      )}

      <div className="text-center pt-4">
        <Link
          href="/products"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#0F766E] px-8 text-sm font-bold text-white hover:bg-[#115E59] transition-all shadow-md shadow-teal-900/10 active:scale-95"
        >
          <ShoppingBag className="size-4" />
          <span>Continue Shopping</span>
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </motion.div>
  );
}
