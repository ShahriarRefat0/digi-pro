"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Search,
  Package,
  Code2,
  FileText,
  Compass,
  ArrowRight,
  Loader2,
  Sparkles,
  Calendar,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import { GroupedSearchResults, SearchResultItem } from "@/types/search";

interface SearchViewProps {
  initialQuery: string;
  initialResults: GroupedSearchResults;
}

type FilterTab = "all" | "products" | "services" | "blogs" | "pages";

export function SearchView({ initialQuery, initialResults }: SearchViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = React.useState(initialQuery);
  const [activeTab, setActiveTab] = React.useState<FilterTab>("all");
  const [results, setResults] = React.useState<GroupedSearchResults>(initialResults);
  const [isLoading, setIsLoading] = React.useState(false);
  const debounceTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  // Sync with searchParams if navigated via URL
  React.useEffect(() => {
    const q = searchParams.get("q") || "";
    if (q !== query) {
      setQuery(q);
      performSearch(q);
    }
  }, [searchParams]);

  const performSearch = async (searchQuery: string) => {
    const trimmed = searchQuery.trim();
    if (!trimmed) {
      setResults({ products: [], services: [], blogs: [], pages: [], totalCount: 0 });
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}&full=true`);
      if (res.ok) {
        const data: GroupedSearchResults = await res.json();
        setResults(data);
      }
    } catch (err) {
      console.error("Failed to perform search on search page:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQueryChange = (val: string) => {
    setQuery(val);
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);

    debounceTimerRef.current = setTimeout(() => {
      // Update URL query string without reloading page
      const params = new URLSearchParams(window.location.search);
      if (val.trim()) {
        params.set("q", val.trim());
      } else {
        params.delete("q");
      }
      router.replace(`/search?${params.toString()}`, { scroll: false });
      performSearch(val);
    }, 250);
  };

  const handleClear = () => {
    setQuery("");
    setResults({ products: [], services: [], blogs: [], pages: [], totalCount: 0 });
    const params = new URLSearchParams(window.location.search);
    params.delete("q");
    router.replace(`/search`, { scroll: false });
  };

  const totalResults = results.totalCount;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16 text-slate-900">
      {/* Page Header */}
      <div className="max-w-3xl mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3.5 py-1 text-xs font-semibold text-[#0F766E] mb-4">
          <Sparkles className="size-3.5 text-[#0F766E]" />
          <span>Global Website Search</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading text-slate-900">
          {query.trim() ? (
            <span>
              Search results for <span className="text-[#0F766E]">&ldquo;{query}&rdquo;</span>
            </span>
          ) : (
            <span>Explore Careproff</span>
          )}
        </h1>
        <p className="text-sm sm:text-base text-slate-500 mt-2.5">
          Find digital assets, care resources, guides, and services.
        </p>

        {/* Large Interactive Search Input */}
        <div className="relative mt-6 flex items-center rounded-2xl border border-slate-300 bg-white px-4 py-3.5 shadow-xs focus-within:border-[#0F766E] focus-within:ring-2 focus-within:ring-[#0F766E]/20 transition-all">
          <Search className="size-5 text-slate-400 mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="Type anything to search products, services, articles..."
            className="flex-1 bg-transparent text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none min-w-0"
          />
          {isLoading ? (
            <Loader2 className="size-5 animate-spin text-[#0F766E] ml-2 shrink-0" />
          ) : query ? (
            <button
              onClick={handleClear}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-md transition-colors"
            >
              Clear
            </button>
          ) : null}
        </div>
      </div>

      {/* Tabs / Filters */}
      {query.trim() && (
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-slate-200">
          <button
            onClick={() => setActiveTab("all")}
            className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === "all"
                ? "bg-[#0F766E] text-white shadow-sm"
                : "border border-slate-300 bg-white text-slate-600 hover:border-slate-400 hover:text-slate-900"
            }`}
          >
            <span>All Results</span>
            <span
              className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono ${
                activeTab === "all" ? "bg-teal-900 text-white" : "bg-slate-100 text-slate-500"
              }`}
            >
              {totalResults}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("products")}
            className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === "products"
                ? "bg-[#0F766E] text-white shadow-sm"
                : "border border-slate-300 bg-white text-slate-600 hover:border-slate-400 hover:text-slate-900"
            }`}
          >
            <Package className="size-3.5" />
            <span>Products</span>
            <span
              className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono ${
                activeTab === "products" ? "bg-teal-900 text-white" : "bg-slate-100 text-slate-500"
              }`}
            >
              {results.products.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("services")}
            className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === "services"
                ? "bg-[#0F766E] text-white shadow-sm"
                : "border border-slate-300 bg-white text-slate-600 hover:border-slate-400 hover:text-slate-900"
            }`}
          >
            <Code2 className="size-3.5" />
            <span>Services</span>
            <span
              className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono ${
                activeTab === "services" ? "bg-teal-900 text-white" : "bg-slate-100 text-slate-500"
              }`}
            >
              {results.services.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("blogs")}
            className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === "blogs"
                ? "bg-[#0F766E] text-white shadow-sm"
                : "border border-slate-300 bg-white text-slate-600 hover:border-slate-400 hover:text-slate-900"
            }`}
          >
            <FileText className="size-3.5" />
            <span>Articles</span>
            <span
              className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono ${
                activeTab === "blogs" ? "bg-teal-900 text-white" : "bg-slate-100 text-slate-500"
              }`}
            >
              {results.blogs.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("pages")}
            className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === "pages"
                ? "bg-[#0F766E] text-white shadow-sm"
                : "border border-slate-300 bg-white text-slate-600 hover:border-slate-400 hover:text-slate-900"
            }`}
          >
            <Compass className="size-3.5" />
            <span>Pages</span>
            <span
              className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono ${
                activeTab === "pages" ? "bg-teal-900 text-white" : "bg-slate-100 text-slate-500"
              }`}
            >
              {results.pages.length}
            </span>
          </button>
        </div>
      )}

      {/* Main Results Display */}
      {query.trim() === "" ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 text-center shadow-xs">
          <Compass className="size-10 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-900 font-heading">Start searching Careproff</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto mt-1">
            Type keywords like &ldquo;Care Guides&rdquo;, &ldquo;Maternal&rdquo;, &ldquo;Baby Products&rdquo;, or &ldquo;Services&rdquo; to find instant matches.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {["Care Guides", "Maternal Health", "Baby Kits", "Nutrition", "Parenting Tools", "Consultation"].map((tag) => (
              <button
                key={tag}
                onClick={() => handleQueryChange(tag)}
                className="rounded-full border border-slate-300 bg-slate-100 px-3.5 py-1.5 text-xs font-medium text-slate-700 hover:border-[#0F766E] hover:text-[#0F766E] transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      ) : totalResults === 0 && !isLoading ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-xs">
          <div className="flex size-14 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 mx-auto mb-4">
            <Compass className="size-6 text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 font-heading">No results found for &ldquo;{query}&rdquo;</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto mt-1">
            We couldn&apos;t find any products, services, or articles matching your query. Try searching with different terms or categories.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full bg-[#0F766E] px-5 py-2 text-xs font-bold text-white hover:bg-[#115E59] transition-colors shadow-xs"
            >
              <span>Browse all products</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-12">
          {/* Products Section */}
          {(activeTab === "all" || activeTab === "products") && results.products.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Package className="size-5 text-[#0F766E]" />
                  <h2 className="text-xl font-bold font-heading text-slate-900">Digital Products</h2>
                  <span className="rounded-full bg-slate-100 border border-slate-200 px-2 py-0.5 text-xs font-mono text-slate-500">
                    {results.products.length}
                  </span>
                </div>
                <Link
                  href="/products"
                  className="text-xs font-semibold text-slate-500 hover:text-slate-900 inline-flex items-center gap-1 group"
                >
                  <span>Explore store</span>
                  <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.products.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 hover:border-teal-300 hover:shadow-md transition-all shadow-xs"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 overflow-hidden">
                          {item.thumbnail && item.thumbnail !== "/images/placeholder.webp" ? (
                            <Image
                              src={item.thumbnail}
                              alt={item.title}
                              width={44}
                              height={44}
                              className="size-full object-cover"
                            />
                          ) : (
                            <Package className="size-5 text-[#0F766E]" />
                          )}
                        </div>
                        {item.price !== undefined && (
                          <span className="rounded-full border border-teal-200 bg-teal-50 px-2.5 py-0.5 text-xs font-bold text-[#0F766E] font-mono">
                            ৳{item.price}
                          </span>
                        )}
                      </div>

                      <div className="space-y-1">
                        {item.category && (
                          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                            {item.category}
                          </span>
                        )}
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0F766E] transition-colors font-heading line-clamp-1">
                          {item.title}
                        </h3>
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mt-1">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500 group-hover:text-slate-900">
                      <span>View product</span>
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Services Section */}
          {(activeTab === "all" || activeTab === "services") && results.services.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Code2 className="size-5 text-teal-600" />
                  <h2 className="text-xl font-bold font-heading text-slate-900">Services &amp; Consultation</h2>
                  <span className="rounded-full bg-slate-100 border border-slate-200 px-2 py-0.5 text-xs font-mono text-slate-500">
                    {results.services.length}
                  </span>
                </div>
                <Link
                  href="/services"
                  className="text-xs font-semibold text-slate-500 hover:text-slate-900 inline-flex items-center gap-1 group"
                >
                  <span>All services</span>
                  <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.services.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 hover:border-teal-300 hover:shadow-md transition-all shadow-xs"
                  >
                    <div>
                      <div className="flex size-10 items-center justify-center rounded-xl border border-slate-200 bg-teal-50 text-[#0F766E] mb-3">
                        <Code2 className="size-5" />
                      </div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0F766E] transition-colors font-heading">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mt-1">
                        {item.description}
                      </p>
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {item.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-slate-200 bg-slate-100 px-2 py-0.5 text-[10px] text-slate-600"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500 group-hover:text-slate-900">
                      <span>Learn more</span>
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Blog Section */}
          {(activeTab === "all" || activeTab === "blogs") && results.blogs.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <FileText className="size-5 text-teal-600" />
                  <h2 className="text-xl font-bold font-heading text-slate-900">Articles &amp; Guides</h2>
                  <span className="rounded-full bg-slate-100 border border-slate-200 px-2 py-0.5 text-xs font-mono text-slate-500">
                    {results.blogs.length}
                  </span>
                </div>
                <Link
                  href="/blog"
                  className="text-xs font-semibold text-slate-500 hover:text-slate-900 inline-flex items-center gap-1 group"
                >
                  <span>Browse blog</span>
                  <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.blogs.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 hover:border-teal-300 hover:shadow-md transition-all shadow-xs"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-2">
                        {item.category && <span className="text-[#0F766E] font-semibold">{item.category}</span>}
                        {item.date && (
                          <span className="flex items-center gap-1">
                            <Calendar className="size-3" />
                            {item.date}
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0F766E] transition-colors font-heading line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed mt-1.5">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500 group-hover:text-slate-900">
                      <span>Read article</span>
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Pages Section */}
          {(activeTab === "all" || activeTab === "pages") && results.pages.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Compass className="size-5 text-teal-600" />
                  <h2 className="text-xl font-bold font-heading text-slate-900">Important Pages</h2>
                  <span className="rounded-full bg-slate-100 border border-slate-200 px-2 py-0.5 text-xs font-mono text-slate-500">
                    {results.pages.length}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.pages.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 hover:border-teal-300 hover:shadow-md transition-all shadow-xs"
                  >
                    <div>
                      <div className="flex size-10 items-center justify-center rounded-xl border border-slate-200 bg-teal-50 text-[#0F766E] mb-3">
                        <Compass className="size-5" />
                      </div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0F766E] transition-colors font-heading">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mt-1">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500 group-hover:text-slate-900">
                      <span>Visit page</span>
                      <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
