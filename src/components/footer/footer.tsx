"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"

export function Footer() {
  const [email, setEmail] = React.useState("")
  const [status, setStatus] = React.useState<"idle" | "loading" | "success">("idle")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus("loading")
    setTimeout(() => {
      setStatus("success")
      setEmail("")
      setTimeout(() => setStatus("idle"), 4000)
    }, 600)
  }

  return (
    <footer className="w-full border-t border-[#e2e8e3] bg-[#FAF7F0] text-[#29332D] mt-auto">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        {/* Top Section: Brand Story, Newsletter & Links */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Brand Story & Newsletter Form */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="max-w-xl space-y-4">
              <Link href="/" className="inline-flex items-center gap-2 text-2xl font-black text-[#29332D]">
                <span className="size-8 rounded-xl bg-[#7C9473] text-white flex items-center justify-center text-sm font-black shadow-xs">C</span>
                <span>Careoffbd.com</span>
              </Link>

              <p className="text-sm text-[#536358] leading-relaxed">
                Bangladesh&apos;s dedicated e-commerce destination for safe baby care, maternity essentials, and gentle women&apos;s personal care products. Tested, trusted, and delivered straight to your doorstep.
              </p>

              <div className="pt-2">
                <h3 className="text-sm font-bold text-[#29332D] mb-1">
                  Subscribe for gentle care tips &amp; exclusive offers
                </h3>
                <p className="text-xs text-[#536358] mb-4">
                  Join caregivers receiving weekly expert advice across Bangladesh.
                </p>

                <form onSubmit={handleSubmit} className="max-w-md">
                  <div className="flex items-center rounded-xl border border-[#e2e8e3] bg-white overflow-hidden shadow-xs transition-colors focus-within:border-[#7C9473] focus-within:ring-1 focus-within:ring-[#7C9473]">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={status === "success" ? "Subscribed! Thank you." : "Enter your email address"}
                      disabled={status === "loading" || status === "success"}
                      required
                      className="flex-1 bg-transparent px-4 py-3 text-xs sm:text-sm text-[#29332D] placeholder:text-gray-400 focus:outline-none disabled:opacity-60"
                    />
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      aria-label="Subscribe"
                      className="flex h-11 w-12 shrink-0 items-center justify-center bg-[#7C9473] text-white font-semibold transition-all hover:bg-[#5A7052] active:scale-95 disabled:opacity-75 cursor-pointer"
                    >
                      {status === "success" ? (
                        <Check className="size-4 stroke-[2.5]" />
                      ) : (
                        <ArrowRight className="size-4 stroke-[2.5]" />
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Right Columns: Nav Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:col-span-6 lg:justify-end">
            {/* Column 1: Shop Categories */}
            <div className="flex flex-col space-y-3.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7C9473]">Shop Categories</span>
              <Link href="/products?category=Baby+Essentials" className="text-xs sm:text-sm text-[#536358] transition-colors hover:text-[#7C9473] hover:underline underline-offset-4">
                Baby Care Essentials
              </Link>
              <Link href="/products?category=Maternal+Care" className="text-xs sm:text-sm text-[#536358] transition-colors hover:text-[#7C9473] hover:underline underline-offset-4">
                Maternity &amp; Pregnancy
              </Link>
              <Link href="/products" className="text-xs sm:text-sm text-[#536358] transition-colors hover:text-[#7C9473] hover:underline underline-offset-4">
                Bath &amp; Skincare
              </Link>
              <Link href="/products" className="text-xs sm:text-sm text-[#536358] transition-colors hover:text-[#7C9473] hover:underline underline-offset-4">
                Feeding &amp; Nursing
              </Link>
            </div>

            {/* Column 2: Information */}
            <div className="flex flex-col space-y-3.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7C9473]">Information</span>
              <Link href="/about" className="text-xs sm:text-sm text-[#536358] transition-colors hover:text-[#7C9473] hover:underline underline-offset-4">
                About Careoffbd
              </Link>
              <Link href="/care-journal" className="text-xs sm:text-sm text-[#536358] transition-colors hover:text-[#7C9473] hover:underline underline-offset-4">
                Care Journal &amp; Tips
              </Link>
              <Link href="/contact" className="text-xs sm:text-sm text-[#536358] transition-colors hover:text-[#7C9473] hover:underline underline-offset-4">
                Contact &amp; Help
              </Link>
              <Link href="/contact" className="text-xs sm:text-sm text-[#536358] transition-colors hover:text-[#7C9473] hover:underline underline-offset-4">
                FAQs &amp; Shipping
              </Link>
            </div>

            {/* Column 3: Trust & Delivery */}
            <div className="flex flex-col space-y-3.5 col-span-2 sm:col-span-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7C9473]">Customer Promise</span>
              <p className="text-xs text-[#536358] leading-relaxed">
                ✅ Cash on Delivery in Bangladesh
              </p>
              <p className="text-xs text-[#536358] leading-relaxed">
                ✅ 100% Genuine Guarantee
              </p>
              <p className="text-xs text-[#536358] leading-relaxed">
                ✅ Easy Returns &amp; Exchange
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Row: Copyright + Social Icons */}
        <div className="mt-12 sm:mt-16 border-t border-[#e2e8e3] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-center sm:text-left">
            <span className="flex size-6 items-center justify-center rounded-md bg-[#7C9473] text-xs font-black text-white">
              C
            </span>
            <span className="text-xs sm:text-sm font-medium text-[#536358]">
              © {new Date().getFullYear()} Careoffbd.com. All rights reserved. Gentle Baby &amp; Maternal Care.
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-[#536358]">
            <span>Cash on Delivery</span>
            <span>•</span>
            <span>bKash / Nagad</span>
            <span>•</span>
            <span>Express Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

