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
    title: q ? `Search Results for "${q}" — Careoffbd.com` : "Search — Careoffbd.com",
    description: `Search across products and care articles on Careoffbd.com.`,
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q?.trim() || "";

  const initialResults = await searchAll(query, {
    limitPerCategory: {
      products: 50,
      blogs: 20,
      pages: 10,
    },
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#29332D] selection:bg-[#7C9473]/20 selection:text-[#29332D]">
      <Navbar />
      <main className="flex-1 bg-[#FAF7F0]">
        <React.Suspense
          fallback={
            <div className="mx-auto max-w-7xl px-4 py-16 text-center text-[#29332D]">
              <div className="size-8 animate-spin rounded-full border-2 border-[#7C9473] border-t-transparent mx-auto mb-4" />
              <p className="text-sm text-[#29332D]/60">Loading search...</p>
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
