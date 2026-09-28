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
    <footer className="w-full border-t border-gray-200 bg-[#FAFAF8] text-gray-900 mt-auto">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        {/* Top Section: Newsletter + Link Columns */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Heading & Newsletter Form */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="max-w-xl">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-[36px] lg:leading-[1.2] text-gray-900">
                Subscribe for gentle care tips, expert pediatric advice & exclusive offers.
              </h2>
              <p className="mt-3 text-sm text-gray-600">
                Join over 25,000+ caregivers receiving weekly dermatologist-approved advice.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 max-w-md">
                <div className="flex items-center rounded-xl border border-gray-300 bg-white overflow-hidden shadow-xs transition-colors focus-within:border-[#0F766E] focus-within:ring-1 focus-within:ring-[#0F766E]">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={status === "success" ? "Subscribed! Thank you." : "Enter your email address"}
                    disabled={status === "loading" || status === "success"}
                    required
                    className="flex-1 bg-transparent px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none disabled:opacity-60"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    aria-label="Subscribe"
                    className="flex h-11 w-12 shrink-0 items-center justify-center bg-[#0F766E] text-white font-semibold transition-all hover:bg-[#115E59] active:scale-95 disabled:opacity-75"
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

          {/* Right Columns: Nav Links */}
          <div className="grid grid-cols-2 gap-8 sm:gap-16 lg:col-span-5 lg:justify-end">
            {/* Column 1 */}
            <div className="flex flex-col space-y-3.5">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Products & Services</span>
              <Link href="/products" className="text-sm text-gray-600 transition-colors hover:text-[#0F766E] hover:underline underline-offset-4">
                Maternal Care
              </Link>
              <Link href="/products" className="text-sm text-gray-600 transition-colors hover:text-[#0F766E] hover:underline underline-offset-4">
                Baby Essentials
              </Link>
              <Link href="/services" className="text-sm text-gray-600 transition-colors hover:text-[#0F766E] hover:underline underline-offset-4">
                Pediatric Services
              </Link>
              <Link href="/blog" className="text-sm text-gray-600 transition-colors hover:text-[#0F766E] hover:underline underline-offset-4">
                Care Journal
              </Link>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col space-y-3.5">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Company & Help</span>
              <Link href="/about" className="text-sm text-gray-600 transition-colors hover:text-[#0F766E] hover:underline underline-offset-4">
                About Careproff
              </Link>
              <Link href="/contact" className="text-sm text-gray-600 transition-colors hover:text-[#0F766E] hover:underline underline-offset-4">
                Contact Support
              </Link>
              <Link href="/contact" className="text-sm text-gray-600 transition-colors hover:text-[#0F766E] hover:underline underline-offset-4">
                FAQs & Delivery
              </Link>
              <Link href="/about" className="text-sm text-gray-600 transition-colors hover:text-[#0F766E] hover:underline underline-offset-4">
                Safety Guarantee
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Row: Copyright + Social Icons */}
        <div className="mt-16 sm:mt-20 border-t border-gray-200 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Logo / Copyright */}
          <div className="flex items-center gap-2.5">
            <span className="flex size-6 items-center justify-center rounded-md bg-[#0F766E] text-xs font-black text-white leading-none">
              C
            </span>
            <span className="text-sm font-medium text-gray-700">
              © {new Date().getFullYear()} Careproff. All rights reserved. Gentle, safe maternal & baby care.
            </span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-6 text-gray-500">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-[#0F766E] transition-colors"
            >
              <svg className="size-5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-[#0F766E] transition-colors"
            >
              <svg className="size-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

