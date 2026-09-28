"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle } from "lucide-react";
import { FAQCategory, FAQS_DATA } from "@/lib/faqs";
import { FAQCategoryTabs } from "./FAQCategoryTabs";
import { FAQAccordion } from "./FAQAccordion";

const CATEGORY_DESCRIPTIONS: Record<FAQCategory, string> = {
  Products:
    "Details about included files, code architecture, customization flexibility, and supported frameworks.",
  Purchase:
    "How to browse, select, and acquire digital resources securely via our verified distribution channels.",
  Licensing:
    "Clear commercial usage rights, single-project vs multi-project terms, and redistribution guidelines.",
  Support:
    "Technical guidance, documentation access, maintenance releases, and developer inquiry assistance.",
};

export function FAQSection() {
  const [activeCategory, setActiveCategory] =
    React.useState<FAQCategory>("Products");

  const filteredFaqs = React.useMemo(() => {
    return FAQS_DATA.filter((faq) => faq.category === activeCategory);
  }, [activeCategory]);

  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 sm:py-28 border-b border-slate-200 selection:bg-teal-100 selection:text-teal-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="rounded-3xl border border-slate-200 bg-gradient-to-b from-white via-slate-50 to-slate-50 p-8 sm:p-12 lg:p-14 shadow-xs relative overflow-hidden mb-12"
        >
          {/* Subtle Ambient Light */}
          <div className="absolute top-0 right-0 size-96 bg-radial from-teal-100/30 via-transparent to-transparent pointer-events-none blur-3xl" />

          <div className="relative z-10 max-w-3xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading text-slate-900 leading-tight">
              Questions about digital products?
            </h2>

            <p className="mt-4 text-sm sm:text-base text-slate-500 font-normal leading-relaxed">
              Everything you need to know before choosing and using our digital products.
            </p>

            {/* Category Filter Tabs */}
            <div className="mt-8">
              <FAQCategoryTabs
                selectedCategory={activeCategory}
                onSelectCategory={setActiveCategory}
              />
            </div>
          </div>
        </motion.div>

        {/* Bottom Two-Column Accordion Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Left Column: Active Category Details */}
          <motion.div
            key={`left-${activeCategory}`}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="lg:col-span-4"
          >
            <div className="lg:sticky lg:top-24">
              <div className="flex items-center gap-2 text-xs font-mono text-[#0F766E] uppercase tracking-wider mb-2 font-semibold">
                <HelpCircle className="size-3.5" />
                <span>Frequently Asked</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-heading text-slate-900">
                {activeCategory}
              </h3>

              <p className="mt-3 text-sm text-slate-500 leading-relaxed font-normal">
                {CATEGORY_DESCRIPTIONS[activeCategory]}
              </p>

              <div className="mt-6 pt-6 border-t border-slate-200 hidden lg:block">
                <span className="text-xs font-mono text-slate-400">
                  Showing {filteredFaqs.length} questions in {activeCategory}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Accordion Questions */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={`accordion-${activeCategory}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <FAQAccordion items={filteredFaqs} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQSection;
