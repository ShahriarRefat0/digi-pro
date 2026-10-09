"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
  ShoppingCart,
  Truck,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  Loader2,
  MapPin,
  User,
  Phone,
  FileText,
  CreditCard,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { DeliveryZone, DELIVERY_FEES, DELIVERY_ZONE_LABELS } from "@/types/order";
import { processCheckoutAction } from "@/app/actions/checkout";
import { toast } from "sonner";

export function CheckoutClient() {
  const router = useRouter();
  const { cartItems, subtotal, clearCart } = useCart();

  const [fullName, setFullName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState("Dhaka");
  const [deliveryZone, setDeliveryZone] = React.useState<DeliveryZone>("inside_dhaka");
  const [notes, setNotes] = React.useState("");
  const [paymentMethod, setPaymentMethod] = React.useState<"cod" | "bkash" | "nagad">("cod");

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const deliveryFee = DELIVERY_FEES[deliveryZone];
  const grandTotal = subtotal + deliveryFee;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    if (!fullName.trim() || !phone.trim() || !address.trim()) {
      setErrorMsg("Please fill out all required delivery information.");
      toast.error("Please fill out all required fields.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const result = await processCheckoutAction({
        customer: {
          fullName: fullName.trim(),
          phone: phone.trim(),
          address: address.trim(),
          city: city.trim() || "Dhaka",
          deliveryZone,
          notes: notes.trim(),
        },
        items: cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        paymentMethod,
      });

      if (result.success && result.order) {
        clearCart();
        toast.success("Order placed successfully!");
        router.push(`/order-success?orderId=${result.order.id}`);
      } else {
        setErrorMsg(result.error || "Failed to place order.");
        toast.error(result.error || "Failed to place order.");
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "An unexpected error occurred.");
      toast.error("An error occurred while placing order.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4 py-16"
      >
        <div className="size-20 rounded-full bg-[#7C9473]/10 border border-[#7C9473]/20 flex items-center justify-center mb-5">
          <ShoppingCart className="size-10 text-[#7C9473]" />
        </div>
        <h1 className="text-2xl font-bold font-heading text-[#29332D]">
          Your cart is empty
        </h1>
        <p className="mt-2 text-sm text-[#29332D]/70 max-w-sm">
          You don&apos;t have any items in your cart to checkout.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#7C9473] px-7 text-xs font-bold text-white hover:bg-[#6b8262] transition-all shadow-sm"
        >
          Browse Products
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8 pb-16"
    >
      {/* Back to cart header */}
      <div className="flex items-center justify-between border-b border-[#29332D]/10 pb-4">
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#29332D]/70 hover:text-[#29332D] transition-colors"
        >
          <ArrowLeft className="size-4" />
          <span>Return to Shopping Cart</span>
        </Link>

        <span className="text-xs font-mono text-[#29332D]/50">
          Step 2 of 2: Checkout
        </span>
      </div>

      <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#29332D] tracking-tight">
        Checkout &amp; Delivery Information
      </h1>

      {errorMsg && (
        <div className="p-4 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 text-xs font-semibold">
          {errorMsg}
        </div>
      )}

      {/* Main Checkout Grid */}
      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Customer Information (Left 2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section 1: Customer Details */}
          <div className="rounded-3xl border border-[#29332D]/10 bg-white p-6 sm:p-7 shadow-sm space-y-5">
            <div className="flex items-center gap-3 border-b border-[#29332D]/10 pb-4">
              <div className="size-9 rounded-full bg-[#7C9473]/10 border border-[#7C9473]/20 flex items-center justify-center text-[#7C9473]">
                <User className="size-4" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold font-heading text-[#29332D]">
                  1. Shipping Information
                </h2>
                <p className="text-xs text-[#29332D]/60">
                  Enter your address details for accurate delivery
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#29332D] block">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="size-4 text-[#29332D]/40 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Rahim Ahmed"
                    className="w-full h-10 pl-10 pr-4 rounded-xl border border-[#29332D]/10 bg-[#FAF7F0] text-xs text-[#29332D] focus:outline-none focus:border-[#7C9473] focus:ring-1 focus:ring-[#7C9473] focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {/* Mobile Phone */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#29332D] block">
                  Phone Number <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="size-4 text-[#29332D]/40 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 01712345678"
                    className="w-full h-10 pl-10 pr-4 rounded-xl border border-[#29332D]/10 bg-[#FAF7F0] text-xs text-[#29332D] focus:outline-none focus:border-[#7C9473] focus:ring-1 focus:ring-[#7C9473] focus:bg-white transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#29332D] block">
                Full Street Address <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="size-4 text-[#29332D]/40 absolute left-3.5 top-3" />
                <textarea
                  required
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House/Apartment #, Road #, Area/Thana"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#29332D]/10 bg-[#FAF7F0] text-xs text-[#29332D] focus:outline-none focus:border-[#7C9473] focus:ring-1 focus:ring-[#7C9473] focus:bg-white transition-colors resize-none"
                />
              </div>
            </div>

            {/* City */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#29332D] block">
                City / District
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Dhaka"
                className="w-full h-10 px-4 rounded-xl border border-[#29332D]/10 bg-[#FAF7F0] text-xs text-[#29332D] focus:outline-none focus:border-[#7C9473] focus:ring-1 focus:ring-[#7C9473] focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Section 2: Delivery Zone Selection */}
          <div className="rounded-3xl border border-[#29332D]/10 bg-white p-6 sm:p-7 shadow-sm space-y-5">
            <div className="flex items-center gap-3 border-b border-[#29332D]/10 pb-4">
              <div className="size-9 rounded-full bg-[#7C9473]/10 border border-[#7C9473]/20 flex items-center justify-center text-[#7C9473]">
                <Truck className="size-4" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold font-heading text-[#29332D]">
                  2. Select Delivery Zone
                </h2>
                <p className="text-xs text-[#29332D]/60">
                  Careoffbd standard shipping rates apply
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(
                [
                  { zone: "inside_dhaka", label: "Inside Dhaka", fee: 70 },
                  { zone: "dhaka_suburbs", label: "Dhaka Suburbs", fee: 100 },
                  { zone: "outside_dhaka", label: "Outside Dhaka", fee: 130 },
                ] as const
              ).map((option) => (
                <label
                  key={option.zone}
                  className={`relative flex flex-col p-4 rounded-2xl border transition-all cursor-pointer ${
                    deliveryZone === option.zone
                      ? "border-[#7C9473] bg-[#7C9473]/10 ring-2 ring-[#7C9473]/20"
                      : "border-[#29332D]/10 bg-white hover:border-[#29332D]/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <input
                      type="radio"
                      name="deliveryZone"
                      value={option.zone}
                      checked={deliveryZone === option.zone}
                      onChange={() => setDeliveryZone(option.zone)}
                      className="size-4 text-[#7C9473] accent-[#7C9473]"
                    />
                    <span className="text-xs font-bold font-mono text-[#7C9473]">
                      ৳{option.fee}
                    </span>
                  </div>
                  <span className="mt-2 text-xs font-bold text-[#29332D]">
                    {option.label}
                  </span>
                  <span className="text-[10px] text-[#29332D]/60 mt-0.5">
                    {option.zone === "inside_dhaka"
                      ? "1-2 Business Days"
                      : option.zone === "dhaka_suburbs"
                      ? "2-3 Business Days"
                      : "3-5 Business Days"}
                  </span>
                </label>
              ))}
            </div>

            {/* Special Notes */}
            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-semibold text-[#29332D] block">
                Order Notes / Special Delivery Instructions (Optional)
              </label>
              <div className="relative">
                <FileText className="size-4 text-[#29332D]/40 absolute left-3.5 top-3" />
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Please call before delivery or leave at front desk"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#29332D]/10 bg-[#FAF7F0] text-xs text-[#29332D] focus:outline-none focus:border-[#7C9473] focus:ring-1 focus:ring-[#7C9473] focus:bg-white transition-colors resize-none"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Payment Method */}
          <div className="rounded-3xl border border-[#29332D]/10 bg-white p-6 sm:p-7 shadow-sm space-y-5">
            <div className="flex items-center gap-3 border-b border-[#29332D]/10 pb-4">
              <div className="size-9 rounded-full bg-[#7C9473]/10 border border-[#7C9473]/20 flex items-center justify-center text-[#7C9473]">
                <CreditCard className="size-4" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold font-heading text-[#29332D]">
                  3. Payment Method
                </h2>
                <p className="text-xs text-[#29332D]/60">
                  Pay upon receiving your order safely
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <label
                className={`flex items-center gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === "cod"
                    ? "border-[#7C9473] bg-[#7C9473]/10 ring-2 ring-[#7C9473]/20"
                    : "border-[#29332D]/10 bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="size-4 text-[#7C9473] accent-[#7C9473]"
                />
                <div>
                  <span className="text-xs font-bold text-[#29332D] block">
                    Cash on Delivery (COD)
                  </span>
                  <span className="text-[11px] text-[#29332D]/60">
                    Pay in cash when your order is delivered to your doorstep.
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Order Summary Sidebar (Right 1 col) */}
        <div className="rounded-3xl border border-[#29332D]/10 bg-white p-6 shadow-md space-y-6 sticky top-24">
          <h2 className="text-lg font-bold font-heading text-[#29332D] border-b border-[#29332D]/10 pb-3">
            Order Items ({cartItems.length})
          </h2>

          {/* Compact Cart Item List */}
          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {cartItems.map((item) => (
              <div
                key={item.productId}
                className="flex items-center gap-3 text-xs py-1.5 border-b border-[#29332D]/10 last:border-0"
              >
                <div className="relative size-12 rounded-lg border border-[#29332D]/10 bg-[#FAF7F0] shrink-0 overflow-hidden">
                  <Image
                    src={item.thumbnail}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="font-bold text-[#29332D] block truncate">
                    {item.name}
                  </span>
                  <span className="text-[#29332D]/60 font-mono text-[11px]">
                    Qty: {item.quantity} × ৳{item.price}
                  </span>
                </div>
                <span className="font-mono font-bold text-[#29332D] shrink-0">
                  ৳{(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing Breakdown */}
          <div className="space-y-2.5 pt-2 border-t border-[#29332D]/10 text-xs">
            <div className="flex justify-between text-[#29332D]/70">
              <span>Items Subtotal</span>
              <span className="font-mono font-bold text-[#29332D]">
                ৳{subtotal.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between text-[#29332D]/70">
              <span>
                Delivery Fee ({DELIVERY_ZONE_LABELS[deliveryZone].split(" (")[0]})
              </span>
              <span className="font-mono font-bold text-[#29332D]">
                ৳{deliveryFee}
              </span>
            </div>

            <div className="flex justify-between text-[#29332D]/70">
              <span>Discount</span>
              <span className="font-mono text-[#29332D]/50">৳0</span>
            </div>

            <div className="border-t border-[#29332D]/10 pt-3 flex items-baseline justify-between">
              <span className="text-sm font-bold text-[#29332D]">Grand Total</span>
              <span className="text-2xl font-extrabold font-mono text-[#29332D]">
                ৳{grandTotal.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Place Order CTA */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#7C9473] px-8 text-sm font-bold text-white hover:bg-[#6b8262] disabled:opacity-50 transition-all shadow-sm active:scale-95 text-center cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Processing Order...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="size-4" />
                <span>Place Order (৳{grandTotal.toLocaleString()})</span>
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-2 text-[11px] text-[#29332D]/60 pt-1">
            <ShieldCheck className="size-4 text-[#7C9473]" />
            <span>Secure 100% verified checkout</span>
          </div>
        </div>
      </form>
    </motion.div>
  );
}
