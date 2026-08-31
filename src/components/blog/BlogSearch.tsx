"use client";

import * as React from "react";
import { Search, X } from "lucide-react";

interface BlogSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function BlogSearch({ value, onChange }: BlogSearchProps) {
  return (
    <div className="relative w-full max-w-md">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-500">
        <Search className="size-4 text-[#EEF35F]" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search articles, tags, or topics..."
        className="w-full rounded-full border border-neutral-800 bg-neutral-950 py-2.5 pl-10 pr-10 text-xs text-white placeholder-neutral-500 transition-all focus:border-[#EEF35F] focus:bg-neutral-900/90 focus:outline-none focus:ring-1 focus:ring-[#EEF35F]"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-neutral-500 hover:text-white transition-colors"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}

export default BlogSearch;
