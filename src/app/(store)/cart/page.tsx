import { Metadata } from "next";
import { CartClient } from "./cart-client";

export const metadata: Metadata = {
  title: "Shopping Cart | Careproff",
  description: "View items in your Careproff shopping cart and proceed to checkout.",
};

export default function CartPage() {
  return (
    <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <CartClient />
    </main>
  );
}
