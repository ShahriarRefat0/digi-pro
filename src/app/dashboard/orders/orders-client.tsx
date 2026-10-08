"use client";

import * as React from "react";
import Image from "next/image";
import { Order, OrderStatus } from "@/types/order";
import { updateOrderStatusAction } from "@/app/actions/orders";
import { toast } from "sonner";
import {
  ShoppingBag,
  User,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  Truck,
  CheckCircle2,
  Clock,
  XCircle,
  Package,
} from "lucide-react";

interface AdminOrdersClientProps {
  initialOrders: Order[];
}

const STATUS_OPTIONS: { value: OrderStatus; label: string; color: string }[] = [
  { value: "pending", label: "Pending Verification", color: "bg-amber-50 text-amber-700 border-amber-200" },
  { value: "confirmed", label: "Confirmed", color: "bg-blue-50 text-blue-700 border-blue-200" },
  { value: "processing", label: "Processing", color: "bg-[#0F766E]/10 text-[#0F766E] border-teal-200" },
  { value: "shipped", label: "Shipped", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
  { value: "delivered", label: "Delivered", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  { value: "cancelled", label: "Cancelled", color: "bg-rose-50 text-rose-700 border-rose-200" },
];

export function AdminOrdersClient({ initialOrders }: AdminOrdersClientProps) {
  const [orders, setOrders] = React.useState<Order[]>(initialOrders);
  const [updatingId, setUpdatingId] = React.useState<string | null>(null);

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    setUpdatingId(orderId);
    try {
      const result = await updateOrderStatusAction(orderId, newStatus);
      if (result.success) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );
        toast.success(`Order status updated to ${newStatus}`);
      } else {
        toast.error(result.error || "Failed to update status");
      }
    } catch (err) {
      toast.error("Error updating order status");
    } finally {
      setUpdatingId(null);
    }
  };

  if (orders.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-xs">
        <div className="size-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-400">
          <ShoppingBag className="size-8" />
        </div>
        <h3 className="text-lg font-bold font-heading text-slate-900">
          No Orders Received Yet
        </h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
          When customers place orders from the e-commerce store, they will appear here in real-time.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold font-heading text-slate-900 tracking-tight">
            Customer Orders
          </h1>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            Total {orders.length} {orders.length === 1 ? "order" : "orders"} placed
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {orders.map((order) => {
          const currentStatusObj =
            STATUS_OPTIONS.find((s) => s.value === order.status) || STATUS_OPTIONS[0];

          return (
            <div
              key={order.id}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all space-y-5"
            >
              {/* Top Banner: Order # & Status Selector */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-extrabold font-mono text-slate-900">
                      Order #{order.orderNumber}
                    </span>
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full border ${currentStatusObj.color}`}
                    >
                      {currentStatusObj.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                    <Calendar className="size-3.5 text-slate-400" />
                    <span>{new Date(order.createdAt).toLocaleString()}</span>
                  </div>
                </div>

                {/* Status selector */}
                <div className="flex items-center gap-2">
                  <label className="text-xs font-semibold text-slate-600">Update Status:</label>
                  <select
                    disabled={updatingId === order.id}
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                    className="h-9 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#0F766E] cursor-pointer"
                  >
                    {STATUS_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Items & Customer Info Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                {/* Purchased Cart Items (Left 2 cols) */}
                <div className="lg:col-span-2 space-y-3">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <Package className="size-4 text-[#0F766E]" />
                    <span>Purchased Items ({order.items.length})</span>
                  </h4>

                  <div className="space-y-2.5">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between gap-3 p-3 rounded-2xl border border-slate-100 bg-slate-50"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="relative size-12 rounded-xl border border-slate-200 bg-white shrink-0 overflow-hidden">
                            <Image
                              src={item.thumbnail}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <span className="text-xs font-bold text-slate-900 block truncate">
                              {item.name}
                            </span>
                            <span className="text-[11px] text-slate-500 font-mono">
                              {item.quantity} × ৳{item.price.toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <span className="text-xs font-bold font-mono text-slate-900 shrink-0">
                          ৳{item.subtotal.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Customer Details & Breakdown (Right 1 col) */}
                <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-100 text-xs">
                  {/* Customer Contact */}
                  <div className="space-y-2 border-b border-slate-200 pb-3">
                    <span className="font-bold uppercase tracking-wider text-[10px] text-[#0F766E] block font-mono">
                      Customer Details
                    </span>
                    <div className="flex items-center gap-2 text-slate-900 font-semibold">
                      <User className="size-3.5 text-slate-400" />
                      <span>{order.customer.fullName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700 font-mono">
                      <Phone className="size-3.5 text-slate-400" />
                      <span>{order.customer.phone}</span>
                    </div>
                    <div className="flex items-start gap-2 text-slate-600">
                      <MapPin className="size-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>{order.customer.address}, {order.customer.city}</span>
                    </div>
                    {order.customer.notes && (
                      <div className="text-[11px] text-slate-500 italic pt-1">
                        &quot;{order.customer.notes}&quot;
                      </div>
                    )}
                  </div>

                  {/* Financial Breakdown */}
                  <div className="space-y-1.5 font-mono">
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal:</span>
                      <span>৳{order.subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Delivery ({order.customer.deliveryZone.replace("_", " ")}):</span>
                      <span>৳{order.deliveryFee}</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-200 pt-2 font-bold text-slate-900 text-sm">
                      <span>Total:</span>
                      <span className="text-[#0F766E]">৳{order.total.toLocaleString()}</span>
                    </div>
                    <div className="pt-2 text-[11px] text-slate-500 font-sans">
                      Payment: <span className="font-bold text-slate-800 uppercase">{order.paymentMethod === "cod" ? "Cash on Delivery" : order.paymentMethod}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
