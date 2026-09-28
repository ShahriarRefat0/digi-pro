"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Package, ShoppingCart, FileCheck, Headphones } from "lucide-react";
import { FAQCategory, FAQ_CATEGORIES } from "@/lib/faqs";

interface FAQCategoryTabsProps {
  selectedCategory: FAQCategory;
  onSelectCategory: (cat: FAQCategory) => void;
}

const CATEGORY_ICONS = {
  Products: Package,
  Purchase: ShoppingCart,
  Licensing: FileCheck,
  Support: Headphones,
};

export function FAQCategoryTabs({
  selectedCategory,
  onSelectCategory,
}: FAQCategoryTabsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
      {FAQ_CATEGORIES.map((category) => {
        const isSelected = selectedCategory === category;
        const Icon = CATEGORY_ICONS[category];

        return (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`group relative inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer active:scale-95 ${
              isSelected
                ? "bg-[#0F766E] text-white shadow-md shadow-teal-900/10 border-2 border-[#0F766E] -rotate-1 scale-105"
                : "border border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-100 hover:text-slate-900 shadow-xs"
            }`}
          >
            <Icon
              className={`size-4 transition-transform group-hover:scale-110 ${
                isSelected ? "text-white" : "text-[#0F766E]"
              }`}
            />
            <span>{category}</span>
          </button>
        );
      })}
    </div>
  );
}

export default FAQCategoryTabs;
