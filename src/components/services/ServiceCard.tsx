"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Code2,
  PanelsTopLeft,
  ShoppingCart,
  Server,
  BrainCircuit,
  Gauge,
  Check,
  ArrowRight,
  LucideIcon,
} from "lucide-react";
import { ServiceItem } from "@/lib/services";

interface ServiceCardProps {
  service: ServiceItem;
  index?: number;
}

const ICON_MAP: Record<string, LucideIcon> = {
  Code2: Code2,
  PanelsTopLeft: PanelsTopLeft,
  ShoppingCart: ShoppingCart,
  Server: Server,
  BrainCircuit: BrainCircuit,
  Gauge: Gauge,
};

export function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  const Icon = ICON_MAP[service.icon] || Code2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
      className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/50 p-6 sm:p-8 transition-all duration-300 hover:border-[#0F766E]/40 hover:bg-white hover:shadow-lg"
    >
      {/* Top Header: Icon & Title */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="size-12 rounded-xl bg-[#F0FDFA] border border-[#CCFBF1] text-[#0F766E] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <Icon className="size-6" />
          </div>
          <span className="text-[10px] font-mono font-medium text-slate-600 uppercase tracking-widest bg-white border border-slate-200 px-2.5 py-1 rounded-full shadow-xs">
            Service
          </span>
        </div>

        <h3 className="text-xl font-bold text-slate-900 font-heading group-hover:text-[#0F766E] transition-colors">
          {service.title}
        </h3>

        <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
          {service.description}
        </p>

        {/* Features Checklist */}
        <div className="mt-6 pt-5 border-t border-slate-200">
          <p className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-3">
            What&apos;s Included
          </p>
          <ul className="space-y-2">
            {service.features.map((feature, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-xs text-slate-700"
              >
                <div className="size-4 rounded-full bg-[#F0FDFA] border border-[#CCFBF1] text-[#0F766E] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="size-2.5 stroke-[3]" />
                </div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Footer: Technologies & CTA Button */}
      <div className="mt-8 pt-5 border-t border-slate-200">
        {/* Technologies Pills */}
        <div className="flex flex-wrap items-center gap-1.5 mb-5">
          {service.technologies.map((tech) => (
            <span
              key={tech}
              className="text-[11px] font-mono font-medium text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md transition-colors group-hover:border-slate-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Button */}
        <Link
          href={`mailto:contact@careproff.dev?subject=${encodeURIComponent(
            `Inquiry about ${service.title}`
          )}`}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-800 transition-all duration-200 hover:border-[#0F766E] hover:bg-[#0F766E] hover:text-white active:scale-95 shadow-xs"
        >
          <span>{service.cta}</span>
          <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
}

export default ServiceCard;
