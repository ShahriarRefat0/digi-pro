import { Metadata } from "next";
import { CheckoutClient } from "./checkout-client";

export const metadata: Metadata = {
  title: "Checkout | Careproff",
  description: "Complete your order with Careproff e-commerce.",
};

export default function CheckoutPage() {
  return (
    <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <CheckoutClient />
    </main>
  );
}
