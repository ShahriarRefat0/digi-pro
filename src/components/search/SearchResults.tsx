"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Compass, Sparkles, Loader2 } from "lucide-react";
import { GroupedSearchResults, SearchResultItem as SearchResultItemType } from "@/types/search";
import { SearchResultItem } from "./SearchResultItem";

const POPULAR_CATEGORIES = [
  { name: "Web Templates", href: "/products?category=web-templates" },
  { name: "UI Kits", href: "/products?category=ui-kits" },
  { name: "SaaS Starters", href: "/products?category=saas-starters" },
  { name: "Developer Tools", href: "/products?category=developer-tools" },
  { name: "E-commerce", href: "/products?category=e-commerce" },
  { name: "AI Tools", href: "/products?category=ai-tools" },
];

interface SearchResultsProps {
  query: string;
  results: GroupedSearchResults;
  flatItems: SearchResultItemType[];
  selectedIndex: number;
  isLoading: boolean;
  onSelectIndex: (index: number) => void;
  onItemClick: () => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  query,
  results,
  flatItems,
  selectedIndex,
  isLoading,
  onSelectIndex,
  onItemClick,
}) => {
  const isQueryEmpty = !query.trim();

  // Empty state: Quick suggestions
  if (isQueryEmpty) {
    return (
      <div className="p-4 sm:p-5 space-y-4 text-white">
        <div>
          <div className="flex items-center gap-1.5 px-2 pb-2 text-[10px] font-mono font-semibold uppercase tracking-wider text-neutral-400">
            <Sparkles className="size-3 text-[#EEF35F]" />
            <span>Popular Categories</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
            {POPULAR_CATEGORIES.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                onClick={onItemClick}
                className="flex items-center justify-between rounded-xl border border-neutral-800/80 bg-neutral-900/60 px-3.5 py-2.5 text-xs font-medium text-neutral-300 hover:border-neutral-700 hover:bg-neutral-800/80 hover:text-white transition-all group"
              >
                <span className="truncate">{cat.name}</span>
                <ArrowRight className="size-3 text-neutral-600 group-hover:text-[#EEF35F] group-hover:translate-x-0.5 transition-all shrink-0" />
              </Link>
            ))}
          </div>
        </div>

        <div className="border-t border-neutral-900 pt-3">
          <div className="flex items-center justify-between px-2 text-[10px] font-mono text-neutral-500">
            <span>Navigation Quick Links</span>
            <span className="text-[10px] text-neutral-600">DigiForge</span>
          </div>
          <div className="flex flex-wrap gap-2 pt-2 px-1">
            <Link
              href="/products"
              onClick={onItemClick}
              className="rounded-full border border-neutral-800 bg-neutral-950 px-3 py-1 text-xs text-neutral-400 hover:border-neutral-700 hover:text-white transition-colors"
            >
              Browse All Products
            </Link>
            <Link
              href="/services"
              onClick={onItemClick}
              className="rounded-full border border-neutral-800 bg-neutral-950 px-3 py-1 text-xs text-neutral-400 hover:border-neutral-700 hover:text-white transition-colors"
            >
              Custom Engineering Services
            </Link>
            <Link
              href="/blog"
              onClick={onItemClick}
              className="rounded-full border border-neutral-800 bg-neutral-950 px-3 py-1 text-xs text-neutral-400 hover:border-neutral-700 hover:text-white transition-colors"
            >
              Articles & Guides
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Loading state with no existing results
  if (isLoading && flatItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center text-white">
        <Loader2 className="size-6 animate-spin text-[#EEF35F] mb-3" />
        <p className="text-sm font-medium text-neutral-300">Searching website...</p>
        <p className="text-xs text-neutral-500 mt-1">
          Looking for products, services, and articles for &ldquo;{query}&rdquo;
        </p>
      </div>
    );
  }

  // No results found
  if (flatItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center text-white">
        <div className="flex size-12 items-center justify-center rounded-2xl border border-neutral-800 bg-neutral-900/60 mb-3">
          <Compass className="size-5 text-neutral-500" />
        </div>
        <h4 className="text-sm font-semibold text-white">No results found</h4>
        <p className="text-xs text-neutral-400 mt-1 max-w-xs">
          We couldn&apos;t find anything matching &ldquo;{query}&rdquo;. Try checking for typos or using broader keywords.
        </p>
        <div className="mt-5">
          <Link
            href="/products"
            onClick={onItemClick}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#EEF35F] px-4 py-1.5 text-xs font-bold text-black transition-all hover:bg-[#e5ea4e] hover:shadow-[0_0_12px_rgba(238,243,95,0.25)]"
          >
            <span>Browse all products</span>
            <ArrowRight className="size-3.5 stroke-[2.5]" />
          </Link>
        </div>
      </div>
    );
  }

  let runningIndex = 0;

  return (
    <div className="flex flex-col max-h-[65vh] sm:max-h-[480px] overflow-y-auto overscroll-contain py-2 text-white">
      {/* Products Category */}
      {results.products.length > 0 && (
        <div className="px-3 py-1.5">
          <div className="flex items-center justify-between px-2 pb-1.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-neutral-500">
            <span>Products</span>
            <span className="text-[10px] text-neutral-600 font-mono">
              {results.products.length} found
            </span>
          </div>
          <div className="space-y-1">
            {results.products.map((item) => {
              const itemIdx = runningIndex++;
              return (
                <SearchResultItem
                  key={item.id}
                  item={item}
                  isSelected={selectedIndex === itemIdx}
                  onSelect={() => onSelectIndex(itemIdx)}
                  onClick={onItemClick}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Services Category */}
      {results.services.length > 0 && (
        <div className="px-3 py-1.5">
          <div className="flex items-center justify-between px-2 pb-1.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-neutral-500">
            <span>Services</span>
            <span className="text-[10px] text-neutral-600 font-mono">
              {results.services.length} found
            </span>
          </div>
          <div className="space-y-1">
            {results.services.map((item) => {
              const itemIdx = runningIndex++;
              return (
                <SearchResultItem
                  key={item.id}
                  item={item}
                  isSelected={selectedIndex === itemIdx}
                  onSelect={() => onSelectIndex(itemIdx)}
                  onClick={onItemClick}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Blog Category */}
      {results.blogs.length > 0 && (
        <div className="px-3 py-1.5">
          <div className="flex items-center justify-between px-2 pb-1.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-neutral-500">
            <span>Blog & Articles</span>
            <span className="text-[10px] text-neutral-600 font-mono">
              {results.blogs.length} found
            </span>
          </div>
          <div className="space-y-1">
            {results.blogs.map((item) => {
              const itemIdx = runningIndex++;
              return (
                <SearchResultItem
                  key={item.id}
                  item={item}
                  isSelected={selectedIndex === itemIdx}
                  onSelect={() => onSelectIndex(itemIdx)}
                  onClick={onItemClick}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Pages Category */}
      {results.pages.length > 0 && (
        <div className="px-3 py-1.5">
          <div className="flex items-center justify-between px-2 pb-1.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-neutral-500">
            <span>Pages</span>
            <span className="text-[10px] text-neutral-600 font-mono">
              {results.pages.length} found
            </span>
          </div>
          <div className="space-y-1">
            {results.pages.map((item) => {
              const itemIdx = runningIndex++;
              return (
                <SearchResultItem
                  key={item.id}
                  item={item}
                  isSelected={selectedIndex === itemIdx}
                  onSelect={() => onSelectIndex(itemIdx)}
                  onClick={onItemClick}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* View all results footer */}
      <div className="mt-2 border-t border-neutral-900 px-4 py-2.5 bg-neutral-950/60 sticky bottom-0 backdrop-blur-md flex items-center justify-between">
        <Link
          href={`/search?q=${encodeURIComponent(query)}`}
          onClick={onItemClick}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#EEF35F] hover:underline underline-offset-4 group transition-colors"
        >
          <span>View all {results.totalCount} results for &ldquo;{query}&rdquo;</span>
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
        <span className="text-[10px] font-mono text-neutral-500 hidden sm:inline-block">
          Press ↵ to view
        </span>
      </div>
    </div>
  );
};

export default SearchResults;
