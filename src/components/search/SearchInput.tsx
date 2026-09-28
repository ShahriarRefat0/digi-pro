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
  placeholder = "Search care products, services, advice...",
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
          ? "h-12 bg-white rounded-2xl border border-gray-300 px-3.5 shadow-xs focus-within:border-[#0F766E] focus-within:ring-1 focus-within:ring-[#0F766E]"
          : "h-9 bg-gray-50/80 rounded-full border border-gray-300 px-3 hover:border-gray-400 focus-within:bg-white focus-within:border-[#0F766E] focus-within:ring-1 focus-within:ring-[#0F766E]"
      }`}
    >
      {/* Search / Loading Icon */}
      <div className="flex items-center justify-center shrink-0 mr-2 text-gray-400">
        {isLoading ? (
          <Loader2 className="size-4 animate-spin text-[#0F766E]" />
        ) : (
          <Search className="size-3.5 sm:size-4 text-gray-400" />
        )}
      </div>

      {/* Input Field */}
      <input
        ref={inputRef}
        id={id}
        type="text"
        role="searchbox"
        aria-label="Search care products, services, and articles"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        autoFocus={autoFocus}
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        className="flex-1 bg-transparent text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none min-w-0"
      />

      {/* Right Controls: Clear Button or Keyboard Shortcut Badge */}
      <div className="flex items-center gap-1.5 shrink-0 ml-1.5">
        {value ? (
          <button
            type="button"
            onClick={onClear}
            className="flex size-5 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
            aria-label="Clear search input"
          >
            <X className="size-3" />
          </button>
        ) : (
          shortcutKey && !isDialog && (
            <kbd className="hidden sm:inline-flex items-center rounded border border-gray-200 bg-gray-100 px-1.5 py-0.5 text-[10px] font-mono font-medium text-gray-500 select-none">
              {shortcutKey}
            </kbd>
          )
        )}
      </div>
    </div>
  );
};

export default SearchInput;

