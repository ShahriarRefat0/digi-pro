"use client";

import * as React from "react";
import { motion } from "motion/react";
import { MessageCircle, Code2, ArrowRight, Terminal } from "lucide-react";

export function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-black py-20 sm:py-28 border-b border-neutral-900 selection:bg-[#EEF35F] selection:text-black">
      {/* Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="size-[600px] rounded-full bg-radial from-neutral-900/70 via-black to-black blur-3xl"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading Content */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading text-white leading-[1.08]"
            >
              Let&apos;s Talk About{" "}
              <span className="text-[#EEF35F] underline decoration-[#EEF35F]/40 decoration-wavy underline-offset-8">
                Your Project.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
              className="mt-6 text-base sm:text-lg text-neutral-400 max-w-2xl leading-relaxed mx-auto lg:mx-0 font-normal"
            >
              Have a question about a digital product or need something built for you? We&apos;d love to hear what you&apos;re working on.
            </motion.p>
          </div>

          {/* Right Column: Abstract Developer Communication Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center"
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="w-full max-w-md rounded-3xl border border-neutral-800 bg-neutral-950 p-6 sm:p-7 shadow-2xl relative overflow-hidden backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-radial from-[#EEF35F]/10 via-transparent to-transparent pointer-events-none" />

              <div className="relative z-10 flex items-center justify-between pb-4 border-b border-neutral-800 mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="size-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#EEF35F]">
                    <Terminal className="size-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white">Direct Channel</h3>
                    <p className="text-[10px] font-mono text-neutral-400">Response time: ~24h</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                  Available
                </span>
              </div>

              {/* Message Exchange Flow */}
              <div className="relative z-10 space-y-3 font-mono text-xs">
                <div className="rounded-xl bg-neutral-900/90 border border-neutral-800 p-3.5 flex items-start gap-3">
                  <MessageCircle className="size-4 text-neutral-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-neutral-300 font-semibold">&ldquo;Have an idea in mind?&rdquo;</p>
                    <p className="text-[11px] text-neutral-500 mt-0.5">Tell us what you want to build or achieve.</p>
                  </div>
                </div>

                <div className="rounded-xl bg-[#EEF35F]/10 border border-[#EEF35F]/30 p-3.5 flex items-start gap-3 text-white">
                  <Code2 className="size-4 text-[#EEF35F] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[#EEF35F] font-bold">&ldquo;Let&apos;s build it.&rdquo;</p>
                    <p className="text-[11px] text-neutral-400 mt-0.5">Ready-made assets or tailored code solutions.</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-neutral-900 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
                <span>Start a conversation</span>
                <span className="text-[#EEF35F] font-bold inline-flex items-center gap-1">
                  Connect below &rarr;
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ContactHero;
