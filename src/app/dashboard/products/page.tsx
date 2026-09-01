import * as React from "react";
import { getProducts } from "@/lib/products/product.repository";
import { ManageProductsClient } from "@/components/dashboard/products/ManageProductsClient";

export const dynamic = "force-dynamic";

export default async function ManageProductsPage() {
  const products = await getProducts();
  return <ManageProductsClient initialProducts={products} />;
}
