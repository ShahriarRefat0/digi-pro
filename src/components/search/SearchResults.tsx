"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Compass, Sparkles, Loader2 } from "lucide-react";
import { GroupedSearchResults, SearchResultItem as SearchResultItemType } from "@/types/search";
import { SearchResultItem } from "./SearchResultItem";

const POPULAR_CATEGORIES = [
  { name: "Maternal Care", href: "/products?category=Maternal+Care" },
  { name: "Baby Essentials", href: "/products?category=Baby+Essentials" },
  { name: "Pediatric Services", href: "/services" },
  { name: "Care Journal", href: "/blog" },
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
      <div className="p-4 sm:p-5 space-y-4 text-gray-900 bg-white">
        <div>
          <div className="flex items-center gap-1.5 px-2 pb-2 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
            <Sparkles className="size-3 text-[#0F766E]" />
            <span>Popular Categories</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 pt-1">
            {POPULAR_CATEGORIES.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                onClick={onItemClick}
                className="flex items-center justify-between rounded-xl border border-gray-200 bg-slate-50 px-3.5 py-2.5 text-xs font-semibold text-gray-700 hover:border-teal-300 hover:bg-[#F0FDFA] hover:text-[#0F766E] transition-all group"
              >
                <span className="truncate">{cat.name}</span>
                <ArrowRight className="size-3 text-gray-400 group-hover:text-[#0F766E] group-hover:translate-x-0.5 transition-all shrink-0" />
              </Link>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-3">
          <div className="flex items-center justify-between px-2 text-[10px] font-medium text-gray-400">
            <span>Navigation Quick Links</span>
            <span className="text-[10px] text-gray-400">Careproff</span>
          </div>
          <div className="flex flex-wrap gap-2 pt-2 px-1">
            <Link
              href="/products"
              onClick={onItemClick}
              className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-600 hover:border-[#0F766E] hover:text-[#0F766E] transition-colors"
            >
              Browse Products
            </Link>
            <Link
              href="/services"
              onClick={onItemClick}
              className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-600 hover:border-[#0F766E] hover:text-[#0F766E] transition-colors"
            >
              Pediatric Services
            </Link>
            <Link
              href="/blog"
              onClick={onItemClick}
              className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-600 hover:border-[#0F766E] hover:text-[#0F766E] transition-colors"
            >
              Care Journal
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Loading state with no existing results
  if (isLoading && flatItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center text-gray-900 bg-white">
        <Loader2 className="size-6 animate-spin text-[#0F766E] mb-3" />
        <p className="text-sm font-medium text-gray-700">Searching Careproff...</p>
        <p className="text-xs text-gray-500 mt-1">
          Looking for products, services, and articles for &ldquo;{query}&rdquo;
        </p>
      </div>
    );
  }

  // No results found
  if (flatItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center text-gray-900 bg-white">
        <div className="flex size-12 items-center justify-center rounded-2xl border border-gray-200 bg-slate-50 mb-3">
          <Compass className="size-5 text-gray-400" />
        </div>
        <h4 className="text-sm font-bold text-gray-900">No results found</h4>
        <p className="text-xs text-gray-500 mt-1 max-w-xs">
          We couldn&apos;t find anything matching &ldquo;{query}&rdquo;. Try checking for typos or using broader keywords.
        </p>
        <div className="mt-5">
          <Link
            href="/products"
            onClick={onItemClick}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#0F766E] px-4 py-1.5 text-xs font-bold text-white transition-all hover:bg-[#115E59]"
          >
            <span>Browse care products</span>
            <ArrowRight className="size-3.5 stroke-[2.5]" />
          </Link>
        </div>
      </div>
    );
  }

  let runningIndex = 0;

  return (
    <div className="flex flex-col max-h-[65vh] sm:max-h-[480px] overflow-y-auto overscroll-contain py-2 text-gray-900 bg-white">
      {/* Products Category */}
      {results.products.length > 0 && (
        <div className="px-3 py-1.5">
          <div className="flex items-center justify-between px-2 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
            <span>Products</span>
            <span className="text-[10px] text-gray-400">
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
          <div className="flex items-center justify-between px-2 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
            <span>Services</span>
            <span className="text-[10px] text-gray-400">
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
          <div className="flex items-center justify-between px-2 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
            <span>Blog & Articles</span>
            <span className="text-[10px] text-gray-400">
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
          <div className="flex items-center justify-between px-2 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
            <span>Pages</span>
            <span className="text-[10px] text-gray-400">
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
      <div className="mt-2 border-t border-gray-200 px-4 py-2.5 bg-slate-50 sticky bottom-0 backdrop-blur-md flex items-center justify-between">
        <Link
          href={`/search?q=${encodeURIComponent(query)}`}
          onClick={onItemClick}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F766E] hover:underline underline-offset-4 group transition-colors"
        >
          <span>View all {results.totalCount} results for &ldquo;{query}&rdquo;</span>
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
        <span className="text-[10px] text-gray-400 hidden sm:inline-block">
          Press ↵ to view
        </span>
      </div>
    </div>
  );
};

export default SearchResults;

