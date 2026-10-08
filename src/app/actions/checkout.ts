"use server";

import { createOrder, getOrderById } from "@/lib/orders/order.repository";
import { CreateOrderClientInput, Order } from "@/types/order";

export async function processCheckoutAction(input: CreateOrderClientInput): Promise<{
  success: boolean;
  order?: Order;
  error?: string;
}> {
  try {
    const order = await createOrder(input);
    return {
      success: true,
      order,
    };
  } catch (err: any) {
    console.error("Error placing order:", err);
    return {
      success: false,
      error: err.message || "Failed to place order. Please try again.",
    };
  }
}

export async function getOrderDetailsAction(orderId: string): Promise<Order | null> {
  try {
    return await getOrderById(orderId);
  } catch (err) {
    console.error("Error fetching order:", err);
    return null;
  }
}
