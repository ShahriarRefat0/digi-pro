"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Mail, CheckCircle2 } from "lucide-react";

export function BlogCTA() {
  const [email, setEmail] = React.useState("");
  const [subscribed, setSubscribed] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <section className="relative overflow-hidden bg-black py-20 sm:py-28 selection:bg-[#EEF35F] selection:text-black">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="relative rounded-3xl border border-neutral-800 bg-gradient-to-b from-neutral-950 via-neutral-950 to-neutral-900/50 p-8 sm:p-14 text-center shadow-2xl overflow-hidden"
        >
          {/* Ambient Glow */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="size-[350px] rounded-full bg-radial from-[#EEF35F]/10 via-transparent to-transparent blur-3xl" />
          </div>

          <div className="relative z-10 max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-heading text-white">
              Stay in the Loop
            </h2>

            <p className="mt-3 text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
              Get practical development insights, digital product drops, and architectural guides delivered directly to your inbox. No spam, ever.
            </p>

            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 inline-flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-6 py-3 text-xs font-semibold text-emerald-400"
              >
                <CheckCircle2 className="size-4" />
                <span>Thank you for subscribing! Check your inbox soon.</span>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mt-8 flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
              >
                <div className="relative w-full">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-500">
                    <Mail className="size-4 text-[#EEF35F]" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full rounded-full border border-neutral-800 bg-neutral-900 py-3 pl-10 pr-4 text-xs text-white placeholder-neutral-500 transition-all focus:border-[#EEF35F] focus:bg-neutral-950 focus:outline-none focus:ring-1 focus:ring-[#EEF35F]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#EEF35F] px-7 text-xs font-bold text-black transition-all hover:bg-[#e5ea4e] hover:shadow-[0_0_20px_rgba(238,243,95,0.3)] active:scale-95 shrink-0 shadow-md shadow-[#EEF35F]/20"
                >
                  <span>Subscribe</span>
                </button>
              </form>
            )}

            <p className="mt-4 text-[10px] text-neutral-500 font-mono">
              Join 1,400+ developers, designers & creators. Unsubscribe anytime.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default BlogCTA;
