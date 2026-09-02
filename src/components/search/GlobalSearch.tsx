"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, X, ArrowLeft } from "lucide-react";
import { GroupedSearchResults, SearchResultItem as SearchResultItemType } from "@/types/search";
import { SearchInput } from "./SearchInput";
import { SearchResults } from "./SearchResults";

const INITIAL_RESULTS: GroupedSearchResults = {
  products: [],
  services: [],
  blogs: [],
  pages: [],
  totalCount: 0,
};

export function GlobalSearch() {
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [results, setResults] = React.useState<GroupedSearchResults>(INITIAL_RESULTS);
  const [selectedIndex, setSelectedIndex] = React.useState<number>(-1);
  const [shortcutKey, setShortcutKey] = React.useState("⌘K");

  const containerRef = React.useRef<HTMLDivElement>(null);
  const desktopInputRef = React.useRef<HTMLInputElement>(null);
  const mobileInputRef = React.useRef<HTMLInputElement>(null);
  const debounceTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  // Detect OS for shortcut key badge
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform || navigator.userAgent);
      setShortcutKey(isMac ? "⌘K" : "Ctrl K");
    }
  }, []);

  // Compute flattened list of items for keyboard navigation
  const flatItems = React.useMemo<SearchResultItemType[]>(() => {
    return [
      ...results.products,
      ...results.services,
      ...results.blogs,
      ...results.pages,
    ];
  }, [results]);

  // Debounced search query execution
  const fetchSearchResults = React.useCallback(async (searchQuery: string) => {
    const trimmed = searchQuery.trim();
    if (!trimmed) {
      setResults(INITIAL_RESULTS);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}`);
      if (!response.ok) throw new Error("Search request failed");
      const data: GroupedSearchResults = await response.json();
      setResults(data);
      setSelectedIndex(-1);
    } catch (error) {
      console.error("Error performing search:", error);
      setResults(INITIAL_RESULTS);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setSelectedIndex(-1);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (!value.trim()) {
      setResults(INITIAL_RESULTS);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    debounceTimerRef.current = setTimeout(() => {
      fetchSearchResults(value);
    }, 250);
  };

  const handleClear = () => {
    setQuery("");
    setResults(INITIAL_RESULTS);
    setSelectedIndex(-1);
    if (isOpen) {
      desktopInputRef.current?.focus();
    }
    if (isMobileOpen) {
      mobileInputRef.current?.focus();
    }
  };

  const closeAll = () => {
    setIsOpen(false);
    setIsMobileOpen(false);
    setSelectedIndex(-1);
  };

  // Keyboard navigation handler
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      closeAll();
      desktopInputRef.current?.blur();
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!isOpen && !isMobileOpen) {
        setIsOpen(true);
        return;
      }
      if (flatItems.length === 0) return;
      setSelectedIndex((prev) => (prev + 1 >= flatItems.length ? 0 : prev + 1));
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (flatItems.length === 0) return;
      setSelectedIndex((prev) => (prev <= 0 ? flatItems.length - 1 : prev - 1));
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < flatItems.length) {
        const item = flatItems[selectedIndex];
        closeAll();
        router.push(item.href);
      } else if (query.trim()) {
        closeAll();
        router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      }
    }
  };

  // Global keyboard shortcut (Cmd+K / Ctrl+K)
  React.useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        const isMobile = window.innerWidth < 1024;
        if (isMobile) {
          setIsMobileOpen(true);
          setTimeout(() => mobileInputRef.current?.focus(), 50);
        } else {
          setIsOpen(true);
          desktopInputRef.current?.focus();
        }
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  // Click outside listener for desktop dropdown
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  // Lock body scroll when mobile dialog is open
  React.useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  return (
    <>
      {/* Desktop Search Bar (Integrated inside Navbar) */}
      <div
        ref={containerRef}
        className="relative hidden lg:flex items-center flex-1 max-w-xs xl:max-w-sm mx-4"
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <SearchInput
          inputRef={desktopInputRef}
          value={query}
          onChange={handleQueryChange}
          onClear={handleClear}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          isLoading={isLoading}
          shortcutKey={shortcutKey}
          placeholder="Search products, services, articles..."
          variant="compact"
        />

        {/* Desktop Suggestions Dropdown */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 z-50 rounded-2xl border border-neutral-800/90 bg-black/95 backdrop-blur-2xl shadow-2xl shadow-black/80 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-150">
            <SearchResults
              query={query}
              results={results}
              flatItems={flatItems}
              selectedIndex={selectedIndex}
              isLoading={isLoading}
              onSelectIndex={setSelectedIndex}
              onItemClick={closeAll}
            />
          </div>
        )}
      </div>

      {/* Mobile Search Trigger Button (Visible on Screens < 1024px) */}
      <button
        type="button"
        onClick={() => {
          setIsMobileOpen(true);
          setTimeout(() => mobileInputRef.current?.focus(), 50);
        }}
        aria-label="Open search dialog"
        className="flex lg:hidden ml-auto size-9 rounded-full border border-neutral-800 bg-neutral-950 items-center justify-center text-neutral-300 hover:border-neutral-700 hover:text-white transition-colors shrink-0"
      >
        <Search className="size-4" />
      </button>

      {/* Mobile Full-Screen Search Dialog / Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-black/98 backdrop-blur-2xl lg:hidden animate-in fade-in duration-200">
          {/* Mobile Header Bar */}
          <div className="flex items-center gap-2 border-b border-neutral-900 px-4 py-3">
            <button
              type="button"
              onClick={closeAll}
              className="flex size-9 shrink-0 items-center justify-center rounded-full border border-neutral-800 bg-neutral-950 text-neutral-300 hover:text-white"
              aria-label="Close search"
            >
              <ArrowLeft className="size-4" />
            </button>

            <div className="flex-1">
              <SearchInput
                inputRef={mobileInputRef}
                value={query}
                onChange={handleQueryChange}
                onClear={handleClear}
                onKeyDown={handleKeyDown}
                isLoading={isLoading}
                placeholder="Search everything..."
                variant="dialog"
                autoFocus
              />
            </div>
          </div>

          {/* Mobile Results Container */}
          <div className="flex-1 overflow-y-auto">
            <SearchResults
              query={query}
              results={results}
              flatItems={flatItems}
              selectedIndex={selectedIndex}
              isLoading={isLoading}
              onSelectIndex={setSelectedIndex}
              onItemClick={closeAll}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default GlobalSearch;
