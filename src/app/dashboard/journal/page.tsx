import { Metadata } from "next";
import { getAllJournalsAdmin } from "@/lib/journals/journal.repository";
import { AdminJournalClient } from "./journal-admin-client";

export const metadata: Metadata = {
  title: "Admin Care Journal | Careproff",
  description: "Manage Careproff baby & mother care journal articles.",
};

export default async function AdminJournalPage() {
  const journals = await getAllJournalsAdmin();

  return (
    <div className="p-6 sm:p-8 space-y-6">
      <AdminJournalClient initialJournals={journals} />
    </div>
  );
}
