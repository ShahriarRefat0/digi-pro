"use client";

import * as React from "react";
import { JOURNAL_CATEGORIES, JournalCategory } from "@/types/journal";

interface BlogCategoryFilterProps {
  selectedCategory: JournalCategory;
  onSelectCategory: (category: JournalCategory) => void;
}

export function BlogCategoryFilter({
  selectedCategory,
  onSelectCategory,
}: BlogCategoryFilterProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none select-none max-w-full">
      {JOURNAL_CATEGORIES.map((cat) => {
        const isSelected = selectedCategory === cat;
        return (
          <button
            key={cat}
            type="button"
            onClick={() => onSelectCategory(cat)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-xs transition-all duration-200 cursor-pointer active:scale-95 shrink-0 ${
              isSelected
                ? "bg-[#A8CFB2] text-[#1C3A22] shadow-xs font-bold"
                : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 font-semibold"
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}

export default BlogCategoryFilter;
