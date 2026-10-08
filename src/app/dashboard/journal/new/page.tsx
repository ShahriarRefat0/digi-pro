import { Metadata } from "next";
import { JournalFormClient } from "../journal-form-client";
import { getProducts } from "@/lib/products/product.repository";

export const metadata: Metadata = {
  title: "Add Care Journal Article | Careproff Admin",
  description: "Create a new Careproff baby & mother care article.",
};

export default async function NewJournalPage() {
  const products = await getProducts({ limit: 50 });

  return (
    <div className="p-6 sm:p-8 space-y-6">
      <JournalFormClient availableProducts={products} />
    </div>
  );
}
