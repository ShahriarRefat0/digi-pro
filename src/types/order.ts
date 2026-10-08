export type DeliveryZone = "inside_dhaka" | "dhaka_suburbs" | "outside_dhaka";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type PaymentStatus = "pending" | "paid" | "failed";

export type PaymentMethod = "cod" | "bkash" | "nagad";

export interface OrderItem {
  productId: string;
  name: string;
  slug: string;
  thumbnail: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface CustomerInfo {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  deliveryZone: DeliveryZone;
  notes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: CustomerInfo;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderClientInput {
  customer: CustomerInfo;
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  paymentMethod?: PaymentMethod;
}

export const DELIVERY_FEES: Record<DeliveryZone, number> = {
  inside_dhaka: 70,
  dhaka_suburbs: 100,
  outside_dhaka: 130,
};

export const DELIVERY_ZONE_LABELS: Record<DeliveryZone, string> = {
  inside_dhaka: "Inside Dhaka (৳70)",
  dhaka_suburbs: "Dhaka Suburbs (৳100)",
  outside_dhaka: "Outside Dhaka (৳130)",
};
