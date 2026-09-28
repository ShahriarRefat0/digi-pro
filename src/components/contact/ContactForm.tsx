"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { HELP_OPTIONS } from "@/lib/contact";

export function ContactForm() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    helpType: "digital-product",
    projectRef: "",
    message: "",
  });

  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});
  const [status, setStatus] = React.useState<"idle" | "loading" | "success">(
    "idle"
  );

  const validate = () => {
    const errs: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      errs.name = "Name is required";
    }

    if (!formData.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      errs.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      errs.message = "Please provide at least 10 characters in your message";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setStatus("loading");

    // Realistic demo simulated prepare
    setTimeout(() => {
      setStatus("success");
    }, 800);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      helpType: "digital-product",
      projectRef: "",
      message: "",
    });
    setErrors({});
    setStatus("idle");
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 lg:p-10 shadow-lg relative">
      <div className="mb-6 pb-4 border-b border-slate-100">
        <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-900">
          Send us a message
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Fill in the details below and we&apos;ll get back to you promptly.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success-state"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="py-10 text-center space-y-4"
          >
            <div className="size-14 rounded-full bg-[#F0FDFA] border border-[#CCFBF1] text-[#0F766E] flex items-center justify-center mx-auto">
              <CheckCircle2 className="size-7" />
            </div>

            <h4 className="text-xl font-bold font-heading text-slate-900">
              Message Prepared Successfully!
            </h4>

            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Thanks for reaching out, <span className="text-slate-900 font-semibold">{formData.name}</span>. This is currently a frontend preview interface. In the live production release, your inquiry is routed directly to our inbox.
            </p>

            <div className="pt-4">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex h-10 items-center justify-center rounded-full border border-slate-200 bg-slate-100 px-6 text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-200 hover:text-[#0F766E] cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="contact-form"
            onSubmit={handleSubmit}
            noValidate
            className="space-y-4 sm:space-y-5"
          >
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-mono font-semibold text-slate-700 mb-1.5"
              >
                Name <span className="text-[#0F766E]">*</span>
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: "" });
                }}
                placeholder="Your name"
                className={`w-full rounded-xl border bg-white px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none ${
                  errors.name
                    ? "border-rose-500 focus:border-rose-500"
                    : "border-slate-200 focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E]"
                }`}
              />
              {errors.name && (
                <p className="mt-1 flex items-center gap-1 text-[11px] text-rose-500">
                  <AlertCircle className="size-3" />
                  <span>{errors.name}</span>
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-mono font-semibold text-slate-700 mb-1.5"
              >
                Email Address <span className="text-[#0F766E]">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: "" });
                }}
                placeholder="you@example.com"
                className={`w-full rounded-xl border bg-white px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none ${
                  errors.email
                    ? "border-rose-500 focus:border-rose-500"
                    : "border-slate-200 focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E]"
                }`}
              />
              {errors.email && (
                <p className="mt-1 flex items-center gap-1 text-[11px] text-rose-500">
                  <AlertCircle className="size-3" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* What can we help with? Select */}
            <div>
              <label
                htmlFor="helpType"
                className="block text-xs font-mono font-semibold text-slate-700 mb-1.5"
              >
                What can we help with? <span className="text-[#0F766E]">*</span>
              </label>
              <select
                id="helpType"
                value={formData.helpType}
                onChange={(e) =>
                  setFormData({ ...formData, helpType: e.target.value })
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs sm:text-sm text-slate-900 transition-colors focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] focus:outline-none cursor-pointer"
              >
                {HELP_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id} className="bg-white text-slate-900">
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Project / Product Reference (Optional) */}
            <div>
              <label
                htmlFor="projectRef"
                className="block text-xs font-mono font-semibold text-slate-700 mb-1.5"
              >
                Project or Product Name{" "}
                <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <input
                id="projectRef"
                type="text"
                value={formData.projectRef}
                onChange={(e) =>
                  setFormData({ ...formData, projectRef: e.target.value })
                }
                placeholder="Tell us which product or project you're referring to"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] focus:outline-none"
              />
            </div>

            {/* Message Textarea */}
            <div>
              <label
                htmlFor="message"
                className="block text-xs font-mono font-semibold text-slate-700 mb-1.5"
              >
                Message <span className="text-[#0F766E]">*</span>
              </label>
              <textarea
                id="message"
                rows={4}
                value={formData.message}
                onChange={(e) => {
                  setFormData({ ...formData, message: e.target.value });
                  if (errors.message) setErrors({ ...errors, message: "" });
                }}
                placeholder="Tell us a little about what you're looking for..."
                className={`w-full rounded-xl border bg-white px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none resize-none ${
                  errors.message
                    ? "border-rose-500 focus:border-rose-500"
                    : "border-slate-200 focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E]"
                }`}
              />
              {errors.message && (
                <p className="mt-1 flex items-center gap-1 text-[11px] text-rose-500">
                  <AlertCircle className="size-3" />
                  <span>{errors.message}</span>
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#0F766E] px-8 text-xs sm:text-sm font-bold text-white transition-all hover:bg-[#115E59] active:scale-95 disabled:opacity-70 shadow-md shadow-[#0F766E]/20 cursor-pointer"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    <span>Preparing...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="size-4" />
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ContactForm;
