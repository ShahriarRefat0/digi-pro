import * as React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { searchAll } from "@/lib/search";
import { SearchView } from "./SearchView";

export const dynamic = "force-dynamic";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const q = resolvedParams.q?.trim() || "";

  return {
    title: q ? `Search Results for "${q}" - Careproff` : "Search - Careproff",
    description: `Search across products, services, and articles on Careproff.`,
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q?.trim() || "";

  const initialResults = await searchAll(query, {
    limitPerCategory: {
      products: 50,
      services: 20,
      blogs: 20,
      pages: 10,
    },
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-teal-100 selection:text-teal-900">
      <Navbar />
      <main className="flex-1 bg-slate-50">
        <React.Suspense
          fallback={
            <div className="mx-auto max-w-7xl px-4 py-16 text-center text-slate-900">
              <div className="size-8 animate-spin rounded-full border-2 border-[#0F766E] border-t-transparent mx-auto mb-4" />
              <p className="text-sm text-slate-500">Loading search...</p>
            </div>
          }
        >
          <SearchView initialQuery={query} initialResults={initialResults} />
        </React.Suspense>
      </main>
      <Footer />
    </div>
  );
}
