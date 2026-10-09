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
        <Loader2 className="size-8 text-[#7C9473] animate-spin mb-3" />
        <p className="text-xs text-[#29332D]/60 font-mono">Loading order confirmation...</p>
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
        <div className="size-20 rounded-full bg-[#7C9473]/10 border-2 border-[#7C9473]/20 flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="size-10 text-[#7C9473]" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#29332D] tracking-tight">
          Thank You for Your Order!
        </h1>
        <p className="text-sm sm:text-base text-[#29332D]/70">
          Your order has been received and is being processed by Careoffbd.com.
        </p>
        {order && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF7F0] border border-[#29332D]/10 text-xs font-mono text-[#29332D] font-bold">
            Order #{order.orderNumber}
          </div>
        )}
      </div>

      {order ? (
        <div className="rounded-3xl border border-[#29332D]/10 bg-white p-6 sm:p-8 shadow-lg space-y-6">
          <h2 className="text-base sm:text-lg font-bold font-heading text-[#29332D] border-b border-[#29332D]/10 pb-3 flex items-center gap-2">
            <PackageCheck className="size-5 text-[#7C9473]" />
            <span>Order Details</span>
          </h2>

          {/* Purchased Items List */}
          <div className="space-y-4">
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-4 p-3.5 rounded-2xl border border-[#29332D]/10 bg-[#FAF7F0]/40"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative size-14 rounded-xl border border-[#29332D]/10 bg-white shrink-0 overflow-hidden">
                    <Image
                      src={item.thumbnail}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs sm:text-sm font-bold text-[#29332D] truncate">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#29332D]/60 font-mono">
                      Quantity: {item.quantity} × ৳{item.price.toLocaleString()}
                    </p>
                  </div>
                </div>
                <span className="text-xs sm:text-sm font-bold font-mono text-[#29332D] shrink-0">
                  ৳{item.subtotal.toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          {/* Customer & Shipping Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#29332D]/10 text-xs text-[#29332D]/80">
            <div className="space-y-2 bg-[#FAF7F0] p-4 rounded-2xl border border-[#29332D]/10">
              <span className="font-bold text-[#7C9473] uppercase tracking-wider text-[10px] block font-heading">
                Shipping Customer
              </span>
              <div className="flex items-center gap-2">
                <User className="size-3.5 text-[#29332D]/40" />
                <span className="font-semibold text-[#29332D]">{order.customer.fullName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="size-3.5 text-[#29332D]/40" />
                <span>{order.customer.phone}</span>
              </div>
              <div className="flex items-start gap-2 pt-1">
                <MapPin className="size-3.5 text-[#29332D]/40 shrink-0 mt-0.5" />
                <span>{order.customer.address}, {order.customer.city}</span>
              </div>
            </div>

            <div className="space-y-2 bg-[#FAF7F0] p-4 rounded-2xl border border-[#29332D]/10 font-mono">
              <span className="font-bold text-[#7C9473] uppercase tracking-wider text-[10px] font-sans block">
                Payment Summary
              </span>
              <div className="flex justify-between">
                <span className="text-[#29332D]/60 font-sans">Subtotal</span>
                <span>৳{order.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#29332D]/60 font-sans">Delivery Fee</span>
                <span>৳{order.deliveryFee}</span>
              </div>
              <div className="flex justify-between border-t border-[#29332D]/10 pt-2 font-bold text-[#29332D] text-sm">
                <span className="font-sans">Total Paid</span>
                <span className="text-[#7C9473]">৳{order.total.toLocaleString()}</span>
              </div>
              <div className="text-[11px] text-[#29332D]/60 font-sans pt-1">
                Payment Method: <span className="font-bold text-[#29332D] uppercase">{order.paymentMethod}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 rounded-2xl border border-[#29332D]/10 bg-white text-center text-sm text-[#29332D]/70">
          We received your purchase! A confirmation message will be sent shortly.
        </div>
      )}

      <div className="text-center pt-4">
        <Link
          href="/products"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#7C9473] px-8 text-sm font-bold text-white hover:bg-[#6b8262] transition-all shadow-md active:scale-95"
        >
          <ShoppingBag className="size-4" />
          <span>Continue Shopping</span>
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </motion.div>
  );
}
