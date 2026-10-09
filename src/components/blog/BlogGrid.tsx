"use client";

import * as React from "react";
import { motion } from "motion/react";
import { SearchX, BookOpen } from "lucide-react";
import { JournalArticle, JournalCategory } from "@/types/journal";
import { BlogCard } from "./BlogCard";
import { BlogCategoryFilter } from "./BlogCategoryFilter";
import { BlogSearch } from "./BlogSearch";

interface BlogGridProps {
  articles: JournalArticle[];
}

export function BlogGrid({ articles }: BlogGridProps) {
  const [selectedCategory, setSelectedCategory] =
    React.useState<JournalCategory>("All");
  const [searchQuery, setSearchQuery] = React.useState("");

  // Filter articles based on Category and Search query
  const filteredArticles = React.useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory =
        selectedCategory === "All" ||
        article.category.toLowerCase() === selectedCategory.toLowerCase() ||
        (selectedCategory === "Baby Care" &&
          (article.category === "Newborn Care" || article.category === "Baby Skin Care")) ||
        (selectedCategory === "Mother Care" &&
          (article.category === "Pregnancy Care" || article.category === "Postpartum Care"));

      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesSearch =
        article.title.toLowerCase().includes(query) ||
        article.description.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query) ||
        (article.tags && article.tags.some((tag) => tag.toLowerCase().includes(query)));

      return matchesCategory && matchesSearch;
    });
  }, [articles, selectedCategory, searchQuery]);

  const handleClearFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
  };

  return (
    <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-20 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Filter and Search Controls Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-200">
          {/* Horizontal Category Nav */}
          <BlogCategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {/* Search Input */}
          <BlogSearch value={searchQuery} onChange={setSearchQuery} />
        </div>

        {/* Dynamic Results Counter */}
        <div className="mt-8 mb-6 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <BookOpen className="size-3.5 text-[#2D5536]" />
            <span>
              Showing{" "}
              <strong className="text-slate-900">{filteredArticles.length}</strong>{" "}
              {articles.length !== filteredArticles.length && `of ${articles.length} `}
              articles
              {selectedCategory !== "All" && ` in "${selectedCategory}"`}
              {searchQuery && ` matching "${searchQuery}"`}
            </span>
          </div>

          {(selectedCategory !== "All" || searchQuery) && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="text-xs text-slate-600 hover:text-[#2D5536] transition-colors underline underline-offset-4 cursor-pointer"
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
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="my-16 flex flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-xs"
          >
            <div className="size-16 rounded-2xl bg-[#F2F8F3] border border-[#A8CFB2]/50 flex items-center justify-center text-[#2D5536] mb-4">
              <SearchX className="size-8" />
            </div>

            <h3 className="text-xl font-bold text-slate-900 font-heading">
              No care articles found
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-sm">
              We couldn&apos;t find any care articles matching &quot;{searchQuery}&quot;. Try another search term or reset filters.
            </p>

            <button
              type="button"
              onClick={handleClearFilters}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-[#A8CFB2] px-6 py-2.5 text-xs font-bold text-[#1C3A22] transition-all hover:brightness-95 active:scale-95 shadow-sm cursor-pointer"
            >
              <span>Clear Search &amp; Filters</span>
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default BlogGrid;
