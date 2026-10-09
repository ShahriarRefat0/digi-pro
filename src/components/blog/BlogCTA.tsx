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
    <section className="relative overflow-hidden bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="relative rounded-3xl border border-[#A8CFB2]/40 bg-gradient-to-b from-[#F2F8F3] via-white to-slate-50 p-8 sm:p-14 text-center shadow-md overflow-hidden"
        >
          {/* Ambient Glow */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="size-[350px] rounded-full bg-radial from-[#A8CFB2]/30 via-transparent to-transparent blur-3xl" />
          </div>

          <div className="relative z-10 max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-heading text-slate-900">
              Stay Informed About Baby &amp; Mother Care
            </h2>

            <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Get helpful baby care tips, motherhood guidance, product education, and exclusive Careproff offers delivered to your inbox.
            </p>

            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 inline-flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-50 px-6 py-3 text-xs font-semibold text-emerald-700"
              >
                <CheckCircle2 className="size-4 text-emerald-600" />
                <span>Thank you for subscribing! Check your inbox soon.</span>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mt-8 flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
              >
                <div className="relative w-full">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                    <Mail className="size-4 text-[#2D5536]" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full rounded-full border border-slate-200 bg-white py-3 pl-10 pr-4 text-xs text-slate-900 placeholder:text-slate-400 transition-all focus:border-[#A8CFB2] focus:outline-none focus:ring-1 focus:ring-[#A8CFB2] shadow-xs"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#A8CFB2] px-7 text-xs font-bold text-[#1C3A22] transition-all hover:brightness-95 active:scale-95 shrink-0 shadow-sm cursor-pointer"
                >
                  <span>Subscribe</span>
                </button>
              </form>
            )}

            <p className="mt-4 text-[11px] text-slate-500 font-mono">
              Helpful care tips and exclusive offers from Careproff.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default BlogCTA;
