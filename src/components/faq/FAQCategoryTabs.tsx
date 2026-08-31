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
                ? "bg-[#EEF35F] text-black shadow-lg shadow-[#EEF35F]/20 border-2 border-[#EEF35F] -rotate-1 scale-105"
                : "border border-neutral-800 bg-neutral-950/80 text-neutral-300 hover:border-neutral-600 hover:bg-neutral-900 hover:text-white"
            }`}
          >
            <Icon
              className={`size-4 transition-transform group-hover:scale-110 ${
                isSelected ? "text-black" : "text-[#EEF35F]"
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
