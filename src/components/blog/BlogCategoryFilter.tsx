"use client";

import * as React from "react";
import { BLOG_CATEGORIES, BlogCategory } from "@/lib/blog";

interface BlogCategoryFilterProps {
  selectedCategory: BlogCategory;
  onSelectCategory: (category: BlogCategory) => void;
}

export function BlogCategoryFilter({
  selectedCategory,
  onSelectCategory,
}: BlogCategoryFilterProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none select-none">
      {BLOG_CATEGORIES.map((cat) => {
        const isSelected = selectedCategory === cat;
        return (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 cursor-pointer active:scale-95 ${
              isSelected
                ? "bg-[#0F766E] text-white shadow-xs font-bold"
                : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
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
