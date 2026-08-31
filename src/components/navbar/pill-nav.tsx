"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";

export type PillNavItem = {
  label: string;
  href: string;
  ariaLabel?: string;
};

export interface PillNavProps {
  items: PillNavItem[];
  activeHref?: string;
  className?: string;
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
}

export const PillNav: React.FC<PillNavProps> = ({
  items,
  activeHref,
  className = "",
  ease = "power2.out",
  baseColor = "#EEF35F",
  pillColor = "#0d0e0e",
  hoveredPillTextColor = "#000000",
  pillTextColor = "#ffffff",
}) => {
  const circleRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const tlRefs = useRef<Array<gsap.core.Timeline | null>>([]);
  const activeTweenRefs = useRef<Array<gsap.core.Tween | null>>([]);

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle) => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement as HTMLElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        if (w === 0 || h === 0) return;

        const R = (w * w) / (4 * h) + h / 2;
        const D = Math.ceil(2 * R) + 2;
        const delta =
          Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`,
        });

        const label = pill.querySelector<HTMLElement>(".pill-label");
        const white = pill.querySelector<HTMLElement>(".pill-label-hover");

        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });

        const index = circleRefs.current.indexOf(circle);
        if (index === -1) return;

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(
          circle,
          {
            scale: 1.2,
            xPercent: -50,
            duration: 0.4,
            ease,
            overwrite: "auto",
          },
          0
        );

        if (label) {
          tl.to(
            label,
            { y: -(h + 8), duration: 0.35, ease, overwrite: "auto" },
            0
          );
        }

        if (white) {
          gsap.set(white, { y: Math.ceil(h + 12), opacity: 0 });
          tl.to(
            white,
            { y: 0, opacity: 1, duration: 0.35, ease, overwrite: "auto" },
            0
          );
        }

        tlRefs.current[index] = tl;
      });
    };

    layout();

    const onResize = () => layout();
    window.addEventListener("resize", onResize);

    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(layout).catch(() => {});
    }

    return () => window.removeEventListener("resize", onResize);
  }, [items, ease]);

  const handleEnter = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease,
      overwrite: "auto",
    });
  };

  const handleLeave = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.25,
      ease,
      overwrite: "auto",
    });
  };

  return (
    <div
      className={`relative items-center rounded-full flex border border-neutral-800 bg-[#0d0e0e] shadow-inner ${className}`}
      style={{ height: "38px" }}
    >
      <ul
        role="menubar"
        className="list-none flex items-stretch m-0 p-[2px] h-full gap-[3px]"
      >
        {items.map((item, i) => {
          const isActive =
            activeHref === item.href ||
            (item.href !== "/" && activeHref?.startsWith(item.href));

          const pillStyle: React.CSSProperties = {
            background: isActive ? baseColor : "transparent",
            color: isActive ? hoveredPillTextColor : pillTextColor,
            paddingLeft: "16px",
            paddingRight: "16px",
          };

          return (
            <li key={item.href} role="none" className="flex h-full">
              <Link
                role="menuitem"
                href={item.href}
                className="relative overflow-hidden inline-flex items-center justify-center h-full no-underline rounded-full box-border font-medium text-[13px] leading-[0] tracking-[0.2px] whitespace-nowrap cursor-pointer px-0 transition-colors"
                style={pillStyle}
                aria-label={item.ariaLabel || item.label}
                onMouseEnter={() => handleEnter(i)}
                onMouseLeave={() => handleLeave(i)}
              >
                {!isActive && (
                  <span
                    className="hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none"
                    style={{
                      background: baseColor,
                      willChange: "transform",
                    }}
                    aria-hidden="true"
                    ref={(el) => {
                      circleRefs.current[i] = el;
                    }}
                  />
                )}
                <span className="label-stack relative inline-block leading-[1] z-[2]">
                  <span
                    className="pill-label relative z-[2] inline-block leading-[1] font-semibold text-[13px] tracking-tight"
                    style={{ willChange: "transform" }}
                  >
                    {item.label}
                  </span>
                  {!isActive && (
                    <span
                      className="pill-label-hover absolute left-0 top-0 z-[3] inline-block font-semibold text-[13px] tracking-tight"
                      style={{
                        color: hoveredPillTextColor,
                        willChange: "transform, opacity",
                      }}
                      aria-hidden="true"
                    >
                      {item.label}
                    </span>
                  )}
                </span>
                {isActive && (
                  <span
                    className="absolute left-1/2 -bottom-[4px] -translate-x-1/2 w-1.5 h-1.5 rounded-full z-[4] bg-black"
                    aria-hidden="true"
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PillNav;
