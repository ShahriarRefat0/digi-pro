import { Suspense } from "react";
import { Metadata } from "next";
import { OrderSuccessClient } from "./order-success-client";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Order Confirmed — Careoffbd.com",
  description: "Your order has been successfully placed with Careoffbd.com.",
};

export default function OrderSuccessPage() {
  return (
    <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Suspense
        fallback={
          <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-8">
            <Loader2 className="size-8 text-[#7C9473] animate-spin mb-3" />
            <p className="text-xs text-[#29332D]/60 font-mono">Loading confirmation...</p>
          </div>
        }
      >
        <OrderSuccessClient />
      </Suspense>
    </main>
  );
}
