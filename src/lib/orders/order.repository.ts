import { ObjectId } from "mongodb";
import { getDatabase } from "@/lib/mongodb";
import {
  Order,
  OrderItem,
  CreateOrderClientInput,
  OrderStatus,
  DELIVERY_FEES,
} from "@/types/order";
import { ProductDocument } from "@/types/product";

const ORDERS_COLLECTION = "orders";
const PRODUCTS_COLLECTION = "products";

export interface OrderDocument {
  _id?: ObjectId;
  orderNumber: string;
  customer: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    deliveryZone: "inside_dhaka" | "dhaka_suburbs" | "outside_dhaka";
    notes?: string;
  };
  items: Array<{
    productId: string;
    name: string;
    slug: string;
    thumbnail: string;
    price: number;
    quantity: number;
    subtotal: number;
  }>;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  paymentMethod: "cod" | "bkash" | "nagad";
  paymentStatus: "pending" | "paid" | "failed";
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

function docToOrder(doc: OrderDocument): Order {
  return {
    id: doc._id ? doc._id.toString() : "",
    orderNumber: doc.orderNumber,
    customer: doc.customer,
    items: doc.items,
    subtotal: doc.subtotal,
    deliveryFee: doc.deliveryFee,
    discount: doc.discount,
    total: doc.total,
    paymentMethod: doc.paymentMethod,
    paymentStatus: doc.paymentStatus,
    status: doc.status,
    createdAt: doc.createdAt instanceof Date ? doc.createdAt.toISOString() : String(doc.createdAt),
    updatedAt: doc.updatedAt instanceof Date ? doc.updatedAt.toISOString() : String(doc.updatedAt),
  };
}

export async function createOrder(input: CreateOrderClientInput): Promise<Order> {
  if (!input.items || input.items.length === 0) {
    throw new Error("Order must contain at least one item.");
  }

  if (!input.customer.fullName || !input.customer.phone || !input.customer.address) {
    throw new Error("Customer full name, phone number, and address are required.");
  }

  const db = await getDatabase();
  const productsCol = db.collection<ProductDocument>(PRODUCTS_COLLECTION);
  const ordersCol = db.collection<OrderDocument>(ORDERS_COLLECTION);

  const verifiedItems: OrderItem[] = [];
  let calculatedSubtotal = 0;

  for (const itemInput of input.items) {
    if (!itemInput.productId || itemInput.quantity <= 0) {
      continue;
    }

    let filterQuery: any = { status: "published" };
    if (ObjectId.isValid(itemInput.productId)) {
      filterQuery._id = new ObjectId(itemInput.productId);
    } else {
      filterQuery.slug = itemInput.productId;
    }

    const productDoc = await productsCol.findOne(filterQuery);

    if (!productDoc) {
      // Fallback lookup by ID only in case status field wasn't set on custom seed
      let fallbackFilter: any = {};
      if (ObjectId.isValid(itemInput.productId)) {
        fallbackFilter._id = new ObjectId(itemInput.productId);
      } else {
        fallbackFilter.slug = itemInput.productId;
      }
      const rawDoc = await productsCol.findOne(fallbackFilter);
      if (!rawDoc) {
        throw new Error(`Product not found or unavailable (ID: ${itemInput.productId}).`);
      }
    }

    const targetDoc = (await productsCol.findOne({
      $or: [
        ...(ObjectId.isValid(itemInput.productId)
          ? [{ _id: new ObjectId(itemInput.productId) }]
          : []),
        { slug: itemInput.productId },
      ],
    })) as ProductDocument | null;

    if (!targetDoc) {
      throw new Error(`Product with ID ${itemInput.productId} could not be loaded.`);
    }

    const realPrice = Number(targetDoc.price) || 0;
    const requestedQty = Math.max(1, itemInput.quantity);
    const itemSubtotal = realPrice * requestedQty;

    let thumbUrl = "/images/placeholder.webp";
    if (typeof targetDoc.thumbnail === "string" && targetDoc.thumbnail) {
      thumbUrl = targetDoc.thumbnail;
    } else if (typeof targetDoc.thumbnail === "object" && (targetDoc.thumbnail as any)?.url) {
      thumbUrl = (targetDoc.thumbnail as any).url;
    }

    verifiedItems.push({
      productId: targetDoc._id ? targetDoc._id.toString() : itemInput.productId,
      name: targetDoc.name || "Care Product",
      slug: targetDoc.slug || itemInput.productId,
      thumbnail: thumbUrl,
      price: realPrice,
      quantity: requestedQty,
      subtotal: itemSubtotal,
    });

    calculatedSubtotal += itemSubtotal;
  }

  if (verifiedItems.length === 0) {
    throw new Error("No valid products were found in your order.");
  }

  const deliveryZone = input.customer.deliveryZone || "inside_dhaka";
  const deliveryFee = DELIVERY_FEES[deliveryZone] ?? 70;
  const discount = 0;
  const grandTotal = calculatedSubtotal + deliveryFee - discount;

  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  const orderNumber = `CP${Date.now().toString().slice(-5)}${randomDigits}`;

  const now = new Date();
  const newOrderDoc: OrderDocument = {
    orderNumber,
    customer: {
      fullName: input.customer.fullName.trim(),
      phone: input.customer.phone.trim(),
      address: input.customer.address.trim(),
      city: input.customer.city ? input.customer.city.trim() : "Dhaka",
      deliveryZone,
      notes: input.customer.notes ? input.customer.notes.trim() : "",
    },
    items: verifiedItems,
    subtotal: calculatedSubtotal,
    deliveryFee,
    discount,
    total: grandTotal,
    paymentMethod: input.paymentMethod || "cod",
    paymentStatus: "pending",
    status: "pending",
    createdAt: now,
    updatedAt: now,
  };

  const result = await ordersCol.insertOne(newOrderDoc);
  newOrderDoc._id = result.insertedId;

  return docToOrder(newOrderDoc);
}

export async function getAllOrders(): Promise<Order[]> {
  const db = await getDatabase();
  const ordersCol = db.collection<OrderDocument>(ORDERS_COLLECTION);
  const docs = await ordersCol.find({}).sort({ createdAt: -1 }).toArray();
  return docs.map(docToOrder);
}

export async function getOrderById(id: string): Promise<Order | null> {
  const db = await getDatabase();
  const ordersCol = db.collection<OrderDocument>(ORDERS_COLLECTION);

  let doc: OrderDocument | null = null;

  if (ObjectId.isValid(id)) {
    doc = await ordersCol.findOne({ _id: new ObjectId(id) });
  }

  if (!doc) {
    doc = await ordersCol.findOne({ orderNumber: id });
  }

  return doc ? docToOrder(doc) : null;
}

export async function updateOrderStatus(id: string, status: OrderStatus): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;
  const db = await getDatabase();
  const ordersCol = db.collection<OrderDocument>(ORDERS_COLLECTION);

  const result = await ordersCol.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        status,
        updatedAt: new Date(),
      },
    }
  );

  return result.modifiedCount > 0;
}
