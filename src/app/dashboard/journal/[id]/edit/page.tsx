import { Metadata } from "next";
import { notFound } from "next/navigation";
import { JournalFormClient } from "../../journal-form-client";
import { getJournalBySlug } from "@/lib/journals/journal.repository";
import { getProducts } from "@/lib/products/product.repository";

interface EditJournalParams {
  params: Promise<{
    id: string;
  }>;
}

export const metadata: Metadata = {
  title: "Edit Care Journal Article | Careproff Admin",
  description: "Edit Careproff journal article.",
};

export default async function EditJournalPage({ params }: EditJournalParams) {
  const { id } = await params;
  const journal = await getJournalBySlug(id);

  if (!journal) {
    notFound();
  }

  const products = await getProducts({ limit: 50 });

  return (
    <div className="p-6 sm:p-8 space-y-6">
      <JournalFormClient article={journal} availableProducts={products} />
    </div>
  );
}
