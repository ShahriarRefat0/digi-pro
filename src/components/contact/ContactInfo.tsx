"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Mail, Code2, LifeBuoy, ArrowRight } from "lucide-react";

export function ContactInfo() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-heading text-slate-900">
          How can we help?
        </h2>
        <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
          Whether you&apos;re exploring a digital product or planning a custom project, send us a message and tell us what you need.
        </p>
      </div>

      {/* 3 Contact Info Cards */}
      <div className="space-y-4">
        {/* Card 1: Email */}
        <motion.div
          whileHover={{ y: -3, transition: { duration: 0.2 } }}
          className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 sm:p-6 transition-all hover:border-[#0F766E]/40 hover:bg-white hover:shadow-xs"
        >
          <div className="flex items-start gap-4">
            <div className="size-10 rounded-xl bg-[#F0FDFA] border border-[#CCFBF1] flex items-center justify-center text-[#0F766E] shrink-0">
              <Mail className="size-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-heading">Email</h3>
              <p className="text-xs text-[#0F766E] font-mono mt-0.5 font-bold">
                hello@careproff.dev
              </p>
              <p className="text-xs text-slate-500 mt-1">
                For general questions and project inquiries.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Card 2: Start a Project */}
        <motion.div
          whileHover={{ y: -3, transition: { duration: 0.2 } }}
          className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 sm:p-6 transition-all hover:border-[#0F766E]/40 hover:bg-white hover:shadow-xs"
        >
          <div className="flex items-start gap-4">
            <div className="size-10 rounded-xl bg-[#F0FDFA] border border-[#CCFBF1] flex items-center justify-center text-[#0F766E] shrink-0">
              <Code2 className="size-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-heading">
                Start a Project
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Tell us about your website, application, or custom development idea.
              </p>
              <Link
                href="/services"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#0F766E] mt-2 group hover:underline underline-offset-4"
              >
                <span>View Our Services</span>
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Card 3: Product Support */}
        <motion.div
          whileHover={{ y: -3, transition: { duration: 0.2 } }}
          className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 sm:p-6 transition-all hover:border-[#0F766E]/40 hover:bg-white hover:shadow-xs"
        >
          <div className="flex items-start gap-4">
            <div className="size-10 rounded-xl bg-[#F0FDFA] border border-[#CCFBF1] flex items-center justify-center text-[#0F766E] shrink-0">
              <LifeBuoy className="size-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-heading">
                Product Support
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Need help with one of our digital products? Include the product name in your message.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Connect / Social Row */}
      <div className="pt-4 border-t border-slate-200">
        <p className="text-xs font-mono font-medium text-slate-500 uppercase tracking-wider mb-3">
          Follow &amp; Connect
        </p>
        <div className="flex items-center gap-4 text-xs font-mono text-slate-600">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#0F766E] transition-colors"
          >
            GitHub
          </a>
          <span>•</span>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#0F766E] transition-colors"
          >
            LinkedIn
          </a>
          <span>•</span>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#0F766E] transition-colors"
          >
            X / Twitter
          </a>
        </div>
      </div>
    </div>
  );
}

export default ContactInfo;
