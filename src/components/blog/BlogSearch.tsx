"use client";

import * as React from "react";
import { Search, X } from "lucide-react";

interface BlogSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function BlogSearch({ value, onChange }: BlogSearchProps) {
  return (
    <div className="relative w-full max-w-md shrink-0">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
        <Search className="size-4 text-[#0F766E]" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search baby & mother care articles..."
        className="w-full rounded-full border border-slate-200 bg-white py-2.5 pl-10 pr-10 text-xs text-slate-900 placeholder:text-slate-400 transition-all focus:border-[#0F766E] focus:outline-none focus:ring-1 focus:ring-[#0F766E]"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}

export default BlogSearch;
