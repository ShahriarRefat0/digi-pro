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
    <section className="relative overflow-hidden bg-black py-20 sm:py-28 border-b border-neutral-900 selection:bg-[#EEF35F] selection:text-black">
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading text-white leading-tight">
              Why DigiForge Exists
            </h2>

            <div className="mt-6 space-y-4 text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
              <p>
                Building digital products from scratch can take time. Developers repeatedly solve the same problems, designers recreate common interfaces, and businesses often need custom solutions for their unique requirements.
              </p>
              <p className="text-white font-medium">
                DigiForge was created to make that process easier.
              </p>
              <p className="text-neutral-400">
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
            <div className="rounded-3xl border border-neutral-800 bg-neutral-950 p-6 sm:p-8 shadow-2xl relative">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-900">
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  The Building Lifecycle
                </span>
                <span className="text-[11px] font-mono text-[#EEF35F]">
                  Idea &rarr; Launch
                </span>
              </div>

              <div className="space-y-4 relative">
                {TIMELINE_STEPS.map((step, idx) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={step.step}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                      className="group flex items-start gap-4 rounded-2xl border border-neutral-800/80 bg-neutral-900/50 p-4 transition-colors hover:border-neutral-700 hover:bg-neutral-900/80"
                    >
                      <div className="size-10 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center text-[#EEF35F] shrink-0 group-hover:scale-110 transition-transform">
                        <Icon className="size-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-[#EEF35F]">
                            {step.step}
                          </span>
                          <h4 className="text-sm font-bold text-white font-heading">
                            {step.title}
                          </h4>
                        </div>
                        <p className="text-xs text-neutral-400 mt-1">
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
