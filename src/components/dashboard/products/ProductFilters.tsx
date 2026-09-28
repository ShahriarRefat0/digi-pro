"use client";

import * as React from "react";
import { Search } from "lucide-react";

interface ProductFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
}

export function ProductFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}: ProductFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
      {/* Search Input */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search care products by name or category..."
          className="w-full rounded-full border border-gray-300 bg-white pl-10 pr-4 py-2 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 shadow-xs transition-colors focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] focus:outline-none"
        />
      </div>

      {/* Status Filter Dropdown */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-gray-500 hidden sm:inline">Status:</span>
        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
          className="rounded-full border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-800 shadow-xs transition-colors focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] focus:outline-none cursor-pointer"
        >
          <option value="all" className="bg-white">All Statuses</option>
          <option value="published" className="bg-white">Published</option>
          <option value="draft" className="bg-white">Draft</option>
        </select>
      </div>
    </div>
  );
}

export default ProductFilters;

