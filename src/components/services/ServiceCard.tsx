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
} from "lucide-react";
import { ServiceItem } from "@/lib/services";

interface ServiceCardProps {
  service: ServiceItem;
  index?: number;
}

const ICON_MAP = {
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
      className="group relative flex flex-col justify-between rounded-2xl border border-neutral-800 bg-neutral-950 p-6 sm:p-8 transition-colors duration-300 hover:border-neutral-700 hover:bg-neutral-900/60 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.9),0_0_25px_rgba(238,243,95,0.08)]"
    >
      {/* Top Header: Icon & Title */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="size-12 rounded-xl bg-[#EEF35F]/10 border border-[#EEF35F]/20 text-[#EEF35F] flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#EEF35F]/20">
            <Icon className="size-6" />
          </div>
          <span className="text-[10px] font-mono font-medium text-neutral-500 uppercase tracking-widest bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded-full">
            Service
          </span>
        </div>

        <h3 className="text-xl font-bold text-white font-heading group-hover:text-[#EEF35F] transition-colors">
          {service.title}
        </h3>

        <p className="mt-2.5 text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
          {service.description}
        </p>

        {/* Features Checklist */}
        <div className="mt-6 pt-5 border-t border-neutral-900">
          <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-3">
            What&apos;s Included
          </p>
          <ul className="space-y-2">
            {service.features.map((feature, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-xs text-neutral-300"
              >
                <div className="size-4 rounded-full bg-neutral-900 border border-neutral-800 text-[#EEF35F] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="size-2.5 stroke-[3]" />
                </div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Footer: Technologies & CTA Button */}
      <div className="mt-8 pt-5 border-t border-neutral-900">
        {/* Technologies Pills */}
        <div className="flex flex-wrap items-center gap-1.5 mb-5">
          {service.technologies.map((tech) => (
            <span
              key={tech}
              className="text-[11px] font-mono font-medium text-neutral-400 bg-neutral-900/90 border border-neutral-800 px-2 py-0.5 rounded-md transition-colors group-hover:border-neutral-700"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Button */}
        <Link
          href={`mailto:contact@example.com?subject=${encodeURIComponent(
            `Inquiry about ${service.title}`
          )}`}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-xs font-semibold text-white transition-all duration-200 hover:border-neutral-600 hover:bg-[#EEF35F] hover:text-black active:scale-95 group-hover:border-neutral-700"
        >
          <span>{service.cta}</span>
          <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
}

export default ServiceCard;
