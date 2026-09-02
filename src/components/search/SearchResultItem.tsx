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
      case "Web Templates":
      case "Website Templates":
        return <Globe2 className="size-4 text-blue-400" />;
      case "UI Kits":
        return <PanelsTopLeft className="size-4 text-indigo-400" />;
      case "SaaS Starters":
      case "Starter Kits":
        return <Rocket className="size-4 text-emerald-400" />;
      case "Developer Tools":
        return <Code2 className="size-4 text-amber-400" />;
      case "E-commerce":
        return <ShoppingCart className="size-4 text-orange-400" />;
      case "Web Components":
        return <Blocks className="size-4 text-cyan-400" />;
      case "AI Tools":
        return <Sparkles className="size-4 text-[#EEF35F]" />;
      case "Design Assets":
        return <Palette className="size-4 text-rose-400" />;
      case "3D Assets":
        return <Box className="size-4 text-violet-400" />;
      case "Motion & Animation":
        return <Clapperboard className="size-4 text-fuchsia-400" />;
      case "Mobile UI":
        return <Smartphone className="size-4 text-teal-400" />;
      case "Productivity":
        return <Zap className="size-4 text-lime-400" />;
      case "E-books & Guides":
        return <BookOpen className="size-4 text-sky-400" />;
      case "Digital Assets":
        return <Layers3 className="size-4 text-purple-400" />;
      default:
        return <Package className="size-4 text-[#EEF35F]" />;
    }
  }

  if (item.type === "service") {
    switch (item.icon) {
      case "Code2":
        return <Code2 className="size-4 text-emerald-400" />;
      case "PanelsTopLeft":
        return <PanelsTopLeft className="size-4 text-indigo-400" />;
      case "ShoppingCart":
        return <ShoppingCart className="size-4 text-orange-400" />;
      case "Server":
        return <Server className="size-4 text-blue-400" />;
      case "BrainCircuit":
        return <BrainCircuit className="size-4 text-yellow-400" />;
      case "Gauge":
        return <Gauge className="size-4 text-cyan-400" />;
      default:
        return <Code2 className="size-4 text-emerald-400" />;
    }
  }

  if (item.type === "blog") {
    return <FileText className="size-4 text-purple-400" />;
  }

  if (item.type === "page") {
    switch (item.icon) {
      case "Globe2":
      case "Package":
        return <Globe2 className="size-4 text-blue-400" />;
      case "Code2":
        return <Code2 className="size-4 text-emerald-400" />;
      case "FileText":
        return <FileText className="size-4 text-purple-400" />;
      case "MessageSquare":
        return <MessageSquare className="size-4 text-amber-400" />;
      default:
        return <Compass className="size-4 text-cyan-400" />;
    }
  }

  return <Compass className="size-4 text-neutral-400" />;
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
          ? "bg-neutral-900/90 text-white shadow-sm ring-1 ring-[#EEF35F]/40"
          : "text-neutral-300 hover:bg-neutral-900/60 hover:text-white"
      }`}
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {/* Thumbnail or Category Icon */}
        <div className="relative flex size-9 shrink-0 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-950/80 overflow-hidden">
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
            <span className="truncate text-xs sm:text-sm font-medium text-white group-hover:text-[#EEF35F] transition-colors">
              {item.title}
            </span>
            {item.type === "product" && item.price !== undefined && (
              <span className="shrink-0 rounded-full border border-[#EEF35F]/30 bg-[#EEF35F]/10 px-2 py-0.2 text-[10px] font-bold text-[#EEF35F]">
                ${item.price}
              </span>
            )}
          </div>
          {item.description && (
            <p className="truncate text-[11px] sm:text-xs text-neutral-400 font-normal leading-relaxed mt-0.5">
              {item.description}
            </p>
          )}
        </div>
      </div>

      {/* Right meta tag or arrow */}
      <div className="flex items-center gap-2 shrink-0">
        {item.category && item.type !== "product" && (
          <span className="hidden sm:inline-block text-[10px] text-neutral-500 font-mono">
            {item.category}
          </span>
        )}
        <ArrowRight
          className={`size-3.5 transition-transform duration-150 ${
            isSelected
              ? "text-[#EEF35F] translate-x-0.5 opacity-100"
              : "text-neutral-600 opacity-0 group-hover:opacity-100 group-hover:text-neutral-300"
          }`}
        />
      </div>
    </Link>
  );
};

export default SearchResultItem;
