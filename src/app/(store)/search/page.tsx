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
    title: q ? `Search Results for "${q}" - DigiForge` : "Search - DigiForge",
    description: `Search across products, services, boilerplates, and articles on DigiForge.`,
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
    <div className="min-h-screen flex flex-col bg-black text-white selection:bg-[#EEF35F] selection:text-black">
      <Navbar />
      <main className="flex-1 bg-black">
        <React.Suspense
          fallback={
            <div className="mx-auto max-w-7xl px-4 py-16 text-center text-white">
              <div className="size-8 animate-spin rounded-full border-2 border-[#EEF35F] border-t-transparent mx-auto mb-4" />
              <p className="text-sm text-neutral-400">Loading search...</p>
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
