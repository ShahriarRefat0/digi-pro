"use client";

import * as React from "react";
import { Search, X, Loader2 } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  onFocus?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  isLoading?: boolean;
  placeholder?: string;
  shortcutKey?: string;
  autoFocus?: boolean;
  variant?: "compact" | "dialog";
  inputRef?: React.RefObject<HTMLInputElement | null>;
  id?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onClear,
  onFocus,
  onKeyDown,
  isLoading = false,
  placeholder = "Search products, services, articles...",
  shortcutKey = "⌘K",
  autoFocus = false,
  variant = "compact",
  inputRef,
  id = "global-search-input",
}) => {
  const isDialog = variant === "dialog";

  return (
    <div
      className={`relative flex items-center w-full transition-all duration-200 ${
        isDialog
          ? "h-12 bg-neutral-900/90 rounded-2xl border border-neutral-800 px-3.5 focus-within:border-[#EEF35F] focus-within:ring-1 focus-within:ring-[#EEF35F]"
          : "h-9 bg-neutral-950/90 rounded-full border border-neutral-800 px-3 hover:border-neutral-700 focus-within:border-[#EEF35F] focus-within:ring-1 focus-within:ring-[#EEF35F]"
      }`}
    >
      {/* Search / Loading Icon */}
      <div className="flex items-center justify-center shrink-0 mr-2 text-neutral-400">
        {isLoading ? (
          <Loader2 className="size-4 animate-spin text-[#EEF35F]" />
        ) : (
          <Search className="size-3.5 sm:size-4 text-neutral-400" />
        )}
      </div>

      {/* Input Field */}
      <input
        ref={inputRef}
        id={id}
        type="text"
        role="searchbox"
        aria-label="Search products, services, articles, and pages"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        autoFocus={autoFocus}
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        className="flex-1 bg-transparent text-xs sm:text-sm text-white placeholder:text-neutral-500 focus:outline-none min-w-0"
      />

      {/* Right Controls: Clear Button or Keyboard Shortcut Badge */}
      <div className="flex items-center gap-1.5 shrink-0 ml-1.5">
        {value ? (
          <button
            type="button"
            onClick={onClear}
            className="flex size-5 items-center justify-center rounded-full text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
            aria-label="Clear search input"
          >
            <X className="size-3" />
          </button>
        ) : (
          shortcutKey && !isDialog && (
            <kbd className="hidden sm:inline-flex items-center rounded border border-neutral-800 bg-neutral-900 px-1.5 py-0.5 text-[10px] font-mono font-medium text-neutral-400 select-none">
              {shortcutKey}
            </kbd>
          )
        )}
      </div>
    </div>
  );
};

export default SearchInput;
