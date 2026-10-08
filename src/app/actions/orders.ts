"use server";

import { getAllOrders, updateOrderStatus } from "@/lib/orders/order.repository";
import { OrderStatus } from "@/types/order";
import { revalidatePath } from "next/cache";

export async function fetchAllOrdersAction() {
  try {
    const orders = await getAllOrders();
    return { success: true, orders };
  } catch (err: any) {
    console.error("Error fetching admin orders:", err);
    return { success: false, orders: [], error: err.message };
  }
}

export async function updateOrderStatusAction(id: string, status: OrderStatus) {
  try {
    const updated = await updateOrderStatus(id, status);
    if (updated) {
      revalidatePath("/dashboard/orders");
      return { success: true };
    }
    return { success: false, error: "Order not found" };
  } catch (err: any) {
    console.error("Error updating order status:", err);
    return { success: false, error: err.message };
  }
}
