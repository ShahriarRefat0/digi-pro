"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";
import { FAQItem } from "@/lib/faqs";

interface FAQAccordionProps {
  items: FAQItem[];
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  // Default first item open
  const [openId, setOpenId] = React.useState<string | null>(
    items[0]?.id || null
  );

  // Update openId if category items change
  React.useEffect(() => {
    if (items.length > 0) {
      setOpenId(items[0].id);
    }
  }, [items]);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full space-y-4">
      {items.map((item) => {
        const isOpen = openId === item.id;

        return (
          <div
            key={item.id}
            className={`rounded-2xl transition-all duration-200 overflow-hidden ${
              isOpen
                ? "border-2 border-neutral-700 bg-neutral-950 shadow-xl"
                : "border border-neutral-900 bg-neutral-950/40 hover:border-neutral-800 hover:bg-neutral-950/80"
            }`}
          >
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer transition-colors focus:outline-none"
            >
              <span
                className={`text-sm sm:text-base font-bold font-heading transition-colors ${
                  isOpen ? "text-[#EEF35F]" : "text-white hover:text-neutral-200"
                }`}
              >
                {item.question}
              </span>

              <div
                className={`size-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                  isOpen
                    ? "bg-[#EEF35F] text-black"
                    : "bg-neutral-900 border border-neutral-800 text-neutral-400 group-hover:text-white"
                }`}
              >
                {isOpen ? (
                  <Minus className="size-4 stroke-[2.5]" />
                ) : (
                  <Plus className="size-4 stroke-[2.5]" />
                )}
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <div className="px-5 pb-6 sm:px-6 sm:pb-7 text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal border-t border-neutral-900/60 pt-4">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default FAQAccordion;
