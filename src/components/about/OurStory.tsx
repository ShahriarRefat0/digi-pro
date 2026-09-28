"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Lightbulb, Palette, Code2, Rocket } from "lucide-react";

const TIMELINE_STEPS = [
  {
    step: "01",
    title: "Idea",
    description: "Identify problems and conceptualize scalable digital solutions.",
    icon: Lightbulb,
  },
  {
    step: "02",
    title: "Design",
    description: "Craft accessible, aesthetic, and responsive UI design systems.",
    icon: Palette,
  },
  {
    step: "03",
    title: "Build",
    description: "Engineer modular codebases with Next.js 16 and TypeScript.",
    icon: Code2,
  },
  {
    step: "04",
    title: "Launch",
    description: "Deploy production-ready assets and custom client deliverables.",
    icon: Rocket,
  },
];

export function OurStory() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 sm:py-28 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Brand Story */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-6"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading text-slate-900 leading-tight">
              Why Careproff Exists
            </h2>

            <div className="mt-6 space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              <p>
                Building digital products from scratch can take time. Developers repeatedly solve the same problems, designers recreate common interfaces, and businesses often need custom solutions for their unique requirements.
              </p>
              <p className="text-slate-900 font-medium">
                Careproff was created to make that process easier.
              </p>
              <p className="text-slate-600">
                We build ready-to-use digital products such as starter kits, templates, UI resources, and developer tools. When a project requires something more specific, we also provide custom development services.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Visual Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-6"
          >
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm relative">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <span className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wider">
                  The Building Lifecycle
                </span>
                <span className="text-[11px] font-mono font-semibold text-[#0F766E]">
                  Idea &rarr; Launch
                </span>
              </div>

              <div className="space-y-4 relative">
                {TIMELINE_STEPS.map((step) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={step.step}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                      className="group flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 transition-colors hover:border-[#0F766E]/40 hover:bg-white"
                    >
                      <div className="size-10 rounded-xl bg-[#F0FDFA] border border-[#CCFBF1] flex items-center justify-center text-[#0F766E] shrink-0 group-hover:scale-110 transition-transform">
                        <Icon className="size-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-[#0F766E]">
                            {step.step}
                          </span>
                          <h4 className="text-sm font-bold text-slate-900 font-heading">
                            {step.title}
                          </h4>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default OurStory;
