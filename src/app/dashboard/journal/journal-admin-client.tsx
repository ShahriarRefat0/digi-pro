"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { JournalArticle } from "@/types/journal";
import { updateJournalAction, deleteJournalAction } from "@/app/actions/journal";
import { toast } from "sonner";
import {
  BookOpen,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Eye,
  EyeOff,
  Sparkles,
  Calendar,
  User,
  Tag,
} from "lucide-react";

interface AdminJournalClientProps {
  initialJournals: JournalArticle[];
}

export function AdminJournalClient({ initialJournals }: AdminJournalClientProps) {
  const [journals, setJournals] = React.useState<JournalArticle[]>(initialJournals);
  const [loadingId, setLoadingId] = React.useState<string | null>(null);

  const handleToggleStatus = async (journal: JournalArticle) => {
    const newStatus = journal.status === "published" ? "draft" : "published";
    setLoadingId(journal.id);
    try {
      const res = await updateJournalAction(journal.id, { status: newStatus });
      if (res.success) {
        setJournals((prev) =>
          prev.map((j) => (j.id === journal.id ? { ...j, status: newStatus } : j))
        );
        toast.success(`Article ${newStatus === "published" ? "published" : "set to draft"}`);
      } else {
        toast.error(res.error || "Failed to update status");
      }
    } catch (err) {
      toast.error("Error updating article status");
    } finally {
      setLoadingId(null);
    }
  };

  const handleToggleFeatured = async (journal: JournalArticle) => {
    const newFeatured = !journal.featured;
    setLoadingId(journal.id);
    try {
      const res = await updateJournalAction(journal.id, { featured: newFeatured });
      if (res.success) {
        setJournals((prev) =>
          prev.map((j) => (j.id === journal.id ? { ...j, featured: newFeatured } : j))
        );
        toast.success(`Article ${newFeatured ? "marked as featured" : "unfeatured"}`);
      } else {
        toast.error(res.error || "Failed to update featured status");
      }
    } catch (err) {
      toast.error("Error updating featured status");
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (journal: JournalArticle) => {
    if (!confirm(`Are you sure you want to delete "${journal.title}"?`)) return;

    setLoadingId(journal.id);
    try {
      const res = await deleteJournalAction(journal.id);
      if (res.success) {
        setJournals((prev) => prev.filter((j) => j.id !== journal.id));
        toast.success("Journal article deleted");
      } else {
        toast.error(res.error || "Failed to delete article");
      }
    } catch (err) {
      toast.error("Error deleting journal article");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold font-heading text-slate-900 tracking-tight">
            Care Journal Management
          </h1>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            Manage educational articles for mothers &amp; caregivers
          </p>
        </div>

        <Link
          href="/dashboard/journal/new"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#0F766E] px-6 text-xs font-bold text-white hover:bg-[#115E59] transition-all shadow-md shadow-teal-900/10 active:scale-95 cursor-pointer"
        >
          <Plus className="size-4" />
          <span>Add Journal</span>
        </Link>
      </div>

      {journals.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-xs">
          <div className="size-16 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-4 text-[#0F766E]">
            <BookOpen className="size-8" />
          </div>
          <h3 className="text-lg font-bold font-heading text-slate-900">
            No Journal Articles Found
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
            Create your first baby &amp; mother care article to educate your customers.
          </p>
          <Link
            href="/dashboard/journal/new"
            className="mt-6 inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#0F766E] px-6 text-xs font-bold text-white hover:bg-[#115E59]"
          >
            <Plus className="size-4" />
            <span>Create Article</span>
          </Link>
        </div>
      ) : (
        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-mono border-b border-slate-200 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">Article</th>
                  <th className="py-3.5 px-4 font-semibold">Category</th>
                  <th className="py-3.5 px-4 font-semibold">Status</th>
                  <th className="py-3.5 px-4 font-semibold">Featured</th>
                  <th className="py-3.5 px-4 font-semibold">Date</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {journals.map((journal) => (
                  <tr key={journal.id} className="hover:bg-slate-50/60 transition-colors">
                    {/* Article Thumbnail & Title */}
                    <td className="py-3.5 px-4 min-w-[240px]">
                      <div className="flex items-center gap-3">
                        <div className="relative size-12 rounded-xl border border-slate-200 bg-slate-50 shrink-0 overflow-hidden">
                          <Image
                            src={journal.coverImage || "/images/placeholder.webp"}
                            alt={journal.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <Link
                            href={`/care-journal/${journal.slug}`}
                            target="_blank"
                            className="font-bold text-slate-900 hover:text-[#0F766E] transition-colors line-clamp-1 block"
                          >
                            {journal.title}
                          </Link>
                          <span className="text-[11px] text-slate-500 font-mono block">
                            By {journal.author || "Careproff Care Team"}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 rounded-full bg-teal-50 border border-teal-100 px-2.5 py-0.5 text-[11px] font-mono font-semibold text-[#0F766E]">
                        <Tag className="size-3" />
                        <span>{journal.category}</span>
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(journal)}
                        disabled={loadingId === journal.id}
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors cursor-pointer ${
                          journal.status === "published"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                            : "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"
                        }`}
                      >
                        {journal.status === "published" ? (
                          <>
                            <Eye className="size-3" />
                            <span>Published</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="size-3" />
                            <span>Draft</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Featured */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => handleToggleFeatured(journal)}
                        disabled={loadingId === journal.id}
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold transition-colors cursor-pointer ${
                          journal.featured
                            ? "bg-teal-50 text-[#0F766E] border border-teal-200 hover:bg-teal-100"
                            : "bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200"
                        }`}
                      >
                        <Sparkles className="size-3" />
                        <span>{journal.featured ? "Featured" : "Standard"}</span>
                      </button>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 whitespace-nowrap font-mono text-slate-500 text-[11px]">
                      {journal.date}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/care-journal/${journal.slug}`}
                          target="_blank"
                          title="View on site"
                          className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:text-[#0F766E] hover:border-[#0F766E] transition-colors"
                        >
                          <ExternalLink className="size-3.5" />
                        </Link>
                        <Link
                          href={`/dashboard/journal/${journal.id}/edit`}
                          title="Edit article"
                          className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:text-[#0F766E] hover:border-[#0F766E] transition-colors"
                        >
                          <Edit className="size-3.5" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(journal)}
                          title="Delete article"
                          className="p-1.5 rounded-lg border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
