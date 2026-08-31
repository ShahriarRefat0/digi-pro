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
                ? "bg-[#EEF35F] text-black shadow-md shadow-[#EEF35F]/20 font-bold"
                : "border border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-700 hover:bg-neutral-900 hover:text-white"
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
