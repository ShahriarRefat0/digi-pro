"use server";

import {
  getPublishedJournals,
  getAllJournalsAdmin,
  getFeaturedJournal,
  getJournalBySlug,
  createJournal,
  updateJournal,
  deleteJournal,
} from "@/lib/journals/journal.repository";
import { CreateJournalInput, UpdateJournalInput, JournalArticle } from "@/types/journal";
import { revalidatePath } from "next/cache";

export async function fetchPublishedJournalsAction(): Promise<JournalArticle[]> {
  try {
    return await getPublishedJournals();
  } catch (err) {
    console.error("Error fetching published journals:", err);
    return [];
  }
}

export async function fetchAllJournalsAdminAction(): Promise<JournalArticle[]> {
  try {
    return await getAllJournalsAdmin();
  } catch (err) {
    console.error("Error fetching admin journals:", err);
    return [];
  }
}

export async function createJournalAction(input: CreateJournalInput) {
  try {
    const journal = await createJournal(input);
    revalidatePath("/care-journal");
    revalidatePath("/blog");
    revalidatePath("/dashboard/journal");
    return { success: true, journal };
  } catch (err: any) {
    console.error("Error creating journal:", err);
    return { success: false, error: err.message || "Failed to create journal." };
  }
}

export async function updateJournalAction(id: string, input: UpdateJournalInput) {
  try {
    const success = await updateJournal(id, input);
    if (success) {
      revalidatePath("/care-journal");
      revalidatePath("/blog");
      revalidatePath("/dashboard/journal");
      return { success: true };
    }
    return { success: false, error: "Journal article not found" };
  } catch (err: any) {
    console.error("Error updating journal:", err);
    return { success: false, error: err.message || "Failed to update journal." };
  }
}

export async function deleteJournalAction(id: string) {
  try {
    const success = await deleteJournal(id);
    if (success) {
      revalidatePath("/care-journal");
      revalidatePath("/blog");
      revalidatePath("/dashboard/journal");
      return { success: true };
    }
    return { success: false, error: "Journal article not found" };
  } catch (err: any) {
    console.error("Error deleting journal:", err);
    return { success: false, error: err.message || "Failed to delete journal." };
  }
}
