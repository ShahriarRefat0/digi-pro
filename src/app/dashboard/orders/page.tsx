import { Metadata } from "next";
import { getAllOrders } from "@/lib/orders/order.repository";
import { AdminOrdersClient } from "./orders-client";

export const metadata: Metadata = {
  title: "Admin Orders | Careproff",
  description: "View and manage customer orders.",
};

export default async function AdminOrdersPage() {
  const orders = await getAllOrders();

  return (
    <div className="p-6 sm:p-8 space-y-6">
      <AdminOrdersClient initialOrders={orders} />
    </div>
  );
}
