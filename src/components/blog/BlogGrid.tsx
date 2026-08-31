"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { SearchX, BookOpen } from "lucide-react";
import { BlogPost, BlogCategory } from "@/lib/blog";
import { BlogCard } from "./BlogCard";
import { BlogCategoryFilter } from "./BlogCategoryFilter";
import { BlogSearch } from "./BlogSearch";

interface BlogGridProps {
  articles: BlogPost[];
}

export function BlogGrid({ articles }: BlogGridProps) {
  const [selectedCategory, setSelectedCategory] =
    React.useState<BlogCategory>("All");
  const [searchQuery, setSearchQuery] = React.useState("");

  // Filter articles based on Category and Search query
  const filteredArticles = React.useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory =
        selectedCategory === "All" ||
        article.category.toLowerCase() === selectedCategory.toLowerCase() ||
        (selectedCategory === "Web Development" &&
          (article.category === "Next.js" || article.category === "React"));

      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesSearch =
        article.title.toLowerCase().includes(query) ||
        article.description.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query) ||
        article.tags.some((tag) => tag.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [articles, selectedCategory, searchQuery]);

  const handleClearFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
  };

  return (
    <section className="relative overflow-hidden bg-black py-16 sm:py-20 border-b border-neutral-900 selection:bg-[#EEF35F] selection:text-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Filter and Search Controls Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-neutral-900">
          {/* Horizontal Category Nav */}
          <BlogCategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {/* Search Input */}
          <BlogSearch value={searchQuery} onChange={setSearchQuery} />
        </div>

        {/* Results Counter / Filter Indicator */}
        <div className="mt-8 mb-6 flex items-center justify-between text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <BookOpen className="size-3.5 text-[#EEF35F]" />
            <span>
              Showing{" "}
              <strong className="text-white">{filteredArticles.length}</strong>{" "}
              articles
              {selectedCategory !== "All" && ` in "${selectedCategory}"`}
              {searchQuery && ` matching "${searchQuery}"`}
            </span>
          </div>

          {(selectedCategory !== "All" || searchQuery) && (
            <button
              onClick={handleClearFilters}
              className="text-xs text-neutral-400 hover:text-[#EEF35F] transition-colors underline underline-offset-4"
            >
              Reset filters
            </button>
          )}
        </div>

        {/* Articles Grid or Empty State */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredArticles.map((article, idx) => (
              <BlogCard key={article.id} article={article} index={idx} />
            ))}
          </div>
        ) : (
          /* Friendly Empty State */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="my-16 flex flex-col items-center justify-center rounded-3xl border border-neutral-800 bg-neutral-950 p-12 text-center"
          >
            <div className="size-16 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#EEF35F] mb-4">
              <SearchX className="size-8" />
            </div>

            <h3 className="text-xl font-bold text-white font-heading">
              No articles found
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-neutral-400 max-w-sm">
              We couldn&apos;t find any articles matching &quot;{searchQuery}&quot; in{" "}
              {selectedCategory}. Try another search term or reset filters.
            </p>

            <button
              onClick={handleClearFilters}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-[#EEF35F] px-6 py-2.5 text-xs font-bold text-black transition-all hover:bg-[#e5ea4e] active:scale-95 shadow-md shadow-[#EEF35F]/20"
            >
              <span>Clear Search & Filters</span>
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default BlogGrid;
