"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Package,
  Code2,
  FileText,
  Compass,
  ArrowRight,
  Globe2,
  Server,
  ShoppingCart,
  PanelsTopLeft,
  BrainCircuit,
  Gauge,
  MessageSquare,
  Rocket,
  Blocks,
  Sparkles,
  Palette,
  Box,
  Clapperboard,
  Smartphone,
  Zap,
  BookOpen,
  Layers3,
  HeartPulse,
  Baby,
} from "lucide-react";
import { SearchResultItem as SearchResultItemType } from "@/types/search";

interface SearchResultItemProps {
  item: SearchResultItemType;
  isSelected?: boolean;
  onSelect?: () => void;
  onClick?: () => void;
}

function getIcon(item: SearchResultItemType) {
  if (item.type === "product") {
    switch (item.category) {
      case "Maternal Care":
        return <HeartPulse className="size-4 text-[#0F766E]" />;
      case "Baby Essentials":
        return <Baby className="size-4 text-teal-600" />;
      default:
        return <Package className="size-4 text-[#0F766E]" />;
    }
  }

  if (item.type === "service") {
    return <HeartPulse className="size-4 text-[#0F766E]" />;
  }

  if (item.type === "blog") {
    return <FileText className="size-4 text-teal-700" />;
  }

  return <Compass className="size-4 text-gray-500" />;
}

export const SearchResultItem: React.FC<SearchResultItemProps> = ({
  item,
  isSelected,
  onSelect,
  onClick,
}) => {
  return (
    <Link
      href={item.href}
      onClick={onClick}
      onMouseEnter={onSelect}
      className={`group relative flex items-center justify-between gap-3.5 rounded-xl px-3.5 py-2.5 transition-all text-left duration-150 outline-none ${
        isSelected
          ? "bg-[#F0FDFA] text-[#0F766E] border border-teal-200 shadow-xs"
          : "text-gray-800 hover:bg-slate-50 hover:text-[#0F766E]"
      }`}
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {/* Thumbnail or Category Icon */}
        <div className="relative flex size-9 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white overflow-hidden shadow-xs">
          {item.type === "product" && item.thumbnail && item.thumbnail !== "/images/placeholder.webp" && item.thumbnail.startsWith("/") ? (
            <Image
              src={item.thumbnail}
              alt={item.title}
              width={36}
              height={36}
              className="size-full object-cover"
            />
          ) : (
            getIcon(item)
          )}
        </div>

        {/* Text Details */}
        <div className="flex flex-col min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="truncate text-xs sm:text-sm font-semibold text-gray-900 group-hover:text-[#0F766E] transition-colors">
              {item.title}
            </span>
            {item.type === "product" && item.price !== undefined && (
              <span className="shrink-0 rounded-full border border-teal-200 bg-[#F0FDFA] px-2 py-0.2 text-[10px] font-bold text-[#0F766E]">
                ৳{item.price}
              </span>
            )}
          </div>
          {item.description && (
            <p className="truncate text-[11px] sm:text-xs text-gray-500 font-normal leading-relaxed mt-0.5">
              {item.description}
            </p>
          )}
        </div>
      </div>

      {/* Right meta tag or arrow */}
      <div className="flex items-center gap-2 shrink-0">
        {item.category && item.type !== "product" && (
          <span className="hidden sm:inline-block text-[10px] text-gray-400 font-medium">
            {item.category}
          </span>
        )}
        <ArrowRight
          className={`size-3.5 transition-transform duration-150 ${
            isSelected
              ? "text-[#0F766E] translate-x-0.5 opacity-100"
              : "text-gray-400 opacity-0 group-hover:opacity-100 group-hover:text-[#0F766E]"
          }`}
        />
      </div>
    </Link>
  );
};

export default SearchResultItem;

