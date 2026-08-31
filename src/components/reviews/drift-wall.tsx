"use client";

import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Star } from "lucide-react";

export interface ReviewItem {
  id?: string;
  name: string;
  role: string;
  handle?: string;
  avatar?: string;
  content: string;
  rating?: number;
}

export interface DriftWallProps {
  items?: ReviewItem[];
  columns?: number;
  tileWidth?: number;
  tileHeight?: number;
  gap?: number;
  radius?: number;
  tilt?: number;
  turn?: number;
  roll?: number;
  perspective?: number;
  depth?: number;
  speed?: number;
  direction?: "up" | "down";
  variance?: number;
  parallax?: number;
  pauseOnHover?: boolean;
  lift?: number;
  fade?: number;
  dim?: number;
  overlayColor?: string;
  className?: string;
  style?: CSSProperties;
}

interface ColumnMeta {
  copyHeight: number;
  copies: number;
}

const cx = (...parts: (string | false | undefined | null)[]) =>
  parts.filter(Boolean).join(" ");

const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const columnFactor = (index: number, variance: number): number => {
  const pseudo = ((index * 0.6180339887 + 0.35) % 1) * 2 - 1;
  return 1 + variance * pseudo;
};

export const DriftWall: React.FC<DriftWallProps> = ({
  items = [],
  columns = 5,
  tileWidth = 260,
  tileHeight = 170,
  gap = 18,
  radius = 16,
  tilt = 12,
  turn = -10,
  roll = 0,
  perspective = 1200,
  depth = 100,
  speed = 32,
  direction = "up",
  variance = 0.35,
  parallax = 0.5,
  pauseOnHover = true,
  lift = 40,
  fade = 0.55,
  dim = 0.65,
  overlayColor = "#000000",
  className,
  style,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const trackRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [columnMeta, setColumnMeta] = useState<ColumnMeta[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeIdRef = useRef<string | null>(null);
  const hoveredColRef = useRef<number>(-1);
  const wallHoveredRef = useRef<boolean>(false);
  const pointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const pointerDampedRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const offsetsRef = useRef<number[]>([]);
  const velocitiesRef = useRef<number[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const reduced = useMemo(() => prefersReducedMotion(), []);

  const columnItems = useMemo<ReviewItem[][]>(() => {
    if (!items.length) return [];
    const cols: ReviewItem[][] = Array.from({ length: columns }, () => []);
    items.forEach((item, idx) => {
      cols[idx % columns].push(item);
    });
    return cols;
  }, [items, columns]);

  const baseVelocities = useMemo<number[]>(() => {
    const dir = direction === "down" ? -1 : 1;
    return Array.from({ length: columns }, (_, c) => {
      return speed * columnFactor(c, variance) * dir;
    });
  }, [columns, speed, variance, direction]);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const measure = () => {
      const vh = el.clientHeight || 600;
      const meta: ColumnMeta[] = columnItems.map((col) => {
        const itemH = tileHeight + gap;
        const colH = col.length * itemH;
        if (colH === 0) return { copyHeight: itemH, copies: 3 };
        const copies = Math.max(3, Math.ceil((vh * 2.5) / colH) + 1);
        return { copyHeight: colH, copies };
      });

      setColumnMeta(meta);
      offsetsRef.current = meta.map(() => 0);
      velocitiesRef.current = [...baseVelocities];
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [columnItems, tileHeight, gap, baseVelocities]);

  const applyPlaneTransform = useCallback(
    (px: number, py: number) => {
      const plane = planeRef.current;
      if (!plane) return;

      const rX = tilt - py * 14 * parallax;
      const rY = turn + px * 14 * parallax;
      const rZ = roll;
      const tZ = depth;

      plane.style.transform = `translate(-50%, -50%) rotateX(${rX}deg) rotateY(${rY}deg) rotateZ(${rZ}deg) translateZ(${tZ}px)`;
    },
    [tilt, turn, roll, depth, parallax]
  );

  useEffect(() => {
    applyPlaneTransform(0, 0);
  }, [applyPlaneTransform]);

  useEffect(() => {
    const animate = (ts: number) => {
      if (lastTsRef.current === null) lastTsRef.current = ts;
      const dt = Math.min((ts - lastTsRef.current) / 1000, 0.1);
      lastTsRef.current = ts;

      const damp = 0.08;
      const targetX = pointerRef.current.x;
      const targetY = pointerRef.current.y;
      pointerDampedRef.current.x +=
        (targetX - pointerDampedRef.current.x) * damp;
      pointerDampedRef.current.y +=
        (targetY - pointerDampedRef.current.y) * damp;
      applyPlaneTransform(
        pointerDampedRef.current.x,
        pointerDampedRef.current.y
      );

      if (!reduced) {
        for (let c = 0; c < trackRefs.current.length; c++) {
          const meta = columnMeta[c];
          if (!meta) continue;
          const paused = wallHoveredRef.current && pauseOnHover;
          const factor = paused || hoveredColRef.current === c ? 0 : 1;
          const target = baseVelocities[c] * factor;

          const ease = 1 - Math.exp(-dt / (target === 0 ? 0.16 : 0.28));
          velocitiesRef.current[c] =
            (velocitiesRef.current[c] ?? 0) +
            (target - (velocitiesRef.current[c] ?? 0)) * ease;
          let next =
            (offsetsRef.current[c] ?? 0) + velocitiesRef.current[c] * dt;
          next =
            ((next % meta.copyHeight) + meta.copyHeight) % meta.copyHeight;
          offsetsRef.current[c] = next;

          const track = trackRefs.current[c];
          if (track) track.style.transform = `translate3d(0, ${-next}px, 0)`;
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
    };
  }, [
    baseVelocities,
    columnMeta,
    pauseOnHover,
    parallax,
    reduced,
    applyPlaneTransform,
  ]);

  const activate = useCallback((id: string, index: number): void => {
    activeIdRef.current = id;
    hoveredColRef.current = index;
    setActiveId(id);
  }, []);

  const release = useCallback((): void => {
    activeIdRef.current = null;
    hoveredColRef.current = -1;
    setActiveId(null);
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      if (parallax > 0 && !reduced) {
        pointerRef.current = {
          x: (e.clientX - rect.left) / rect.width - 0.5,
          y: (e.clientY - rect.top) / rect.height - 0.5,
        };
      }
      const hit = document.elementFromPoint(e.clientX, e.clientY);
      const tile =
        hit && hit.closest
          ? (hit.closest("[data-tile-id]") as HTMLElement | null)
          : null;
      if (!tile) return;
      const id = tile.dataset.tileId ?? null;
      if (id === activeIdRef.current) return;
      activeIdRef.current = id;
      hoveredColRef.current = Number(tile.dataset.col);
      setActiveId(id);
    },
    [parallax, reduced]
  );

  const handlePointerLeaveWall = useCallback((): void => {
    wallHoveredRef.current = false;
    pointerRef.current = { x: 0, y: 0 };
    release();
  }, [release]);

  const maskStyle =
    "radial-gradient(ellipse 75% 75% at 50% 50%, #000 var(--dw-edge), transparent 100%), " +
    "linear-gradient(to top, #000 var(--dw-edge), transparent 100%)";

  const cssVars = useMemo<CSSProperties>(
    () =>
      ({
        "--dw-tile-w": `${tileWidth}px`,
        "--dw-tile-h": `${tileHeight}px`,
        "--dw-gap": `${gap}px`,
        "--dw-radius": `${radius}px`,
        "--dw-lift": `${lift}px`,
        "--dw-dim": dim,
        "--dw-overlay": overlayColor,
        "--dw-edge": `${Math.max(0, (1 - fade) * 100)}%`,
        perspective: `${perspective}px`,
        perspectiveOrigin: "50% 50%",
        WebkitMaskImage: maskStyle,
        maskImage: maskStyle,
        WebkitMaskComposite: "source-in",
        maskComposite: "intersect",
        ...style,
      }) as CSSProperties,
    [
      tileWidth,
      tileHeight,
      gap,
      radius,
      lift,
      dim,
      overlayColor,
      fade,
      perspective,
      maskStyle,
      style,
    ]
  );

  const tileClass = cx(
    "group/tile relative block flex-none cursor-pointer outline-none",
    "w-full h-[calc(var(--dw-tile-h)+var(--dw-gap))] [transform-style:preserve-3d]"
  );

  const innerClass = cx(
    "pointer-events-none absolute inset-[calc(var(--dw-gap)/2)] flex flex-col justify-between overflow-hidden",
    "bg-neutral-950/95 border border-neutral-800/80 p-4 sm:p-5",
    "rounded-[var(--dw-radius)] opacity-[var(--dw-dim)] [transform:translateZ(0)]",
    "transition-[transform,opacity,border-color,box-shadow] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
    "group-[.is-active]/tile:opacity-100 group-[.is-active]/tile:border-neutral-600 group-[.is-active]/tile:[transform:translateZ(var(--dw-lift))]",
    "group-[.is-active]/tile:shadow-[0_24px_60px_-18px_rgba(0,0,0,0.9),0_0_20px_rgba(238,243,95,0.12)]",
    "group-focus-visible/tile:opacity-100 group-focus-visible/tile:[transform:translateZ(var(--dw-lift))]"
  );

  const renderTile = (item: ReviewItem, id: string, colIndex: number) => {
    return (
      <div
        key={id}
        tabIndex={0}
        role="article"
        aria-label={`Review by ${item.name}`}
        className={cx(tileClass, activeId === id && "is-active")}
        data-tile-id={id}
        data-col={colIndex}
        onFocus={() => activate(id, colIndex)}
        onBlur={release}
      >
        <div className={innerClass}>
          {/* Top Row: User Avatar & Role */}
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-full bg-neutral-900 border border-neutral-700/80 flex items-center justify-center font-bold text-xs text-white shrink-0 overflow-hidden text-[#EEF35F]">
              {item.avatar ? (
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="size-full object-cover"
                />
              ) : (
                item.name.charAt(0)
              )}
            </div>
            <div className="min-w-0 flex-1 text-left">
              <div className="font-bold text-xs text-white truncate group-hover/tile:text-[#EEF35F] transition-colors">
                {item.name}
              </div>
              <div className="text-[10px] text-neutral-400 truncate">
                {item.role}
              </div>
            </div>
          </div>

          {/* Middle: Review Quote */}
          <p className="text-xs text-neutral-300 line-clamp-3 leading-relaxed mt-2.5 text-left font-normal">
            &ldquo;{item.content}&rdquo;
          </p>

          {/* Bottom: Star Rating */}
          <div className="flex items-center gap-1 mt-2.5 pt-2 border-t border-neutral-900/80">
            {Array.from({ length: item.rating || 5 }).map((_, s) => (
              <Star
                key={s}
                className="size-3 fill-[#EEF35F] text-[#EEF35F]"
              />
            ))}
            <span className="text-[10px] font-mono text-neutral-400 ml-1.5">
              5.0
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className={cx("relative h-full w-full overflow-hidden", className)}
      style={cssVars}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => {
        wallHoveredRef.current = true;
      }}
      onPointerLeave={handlePointerLeaveWall}
      role="group"
      aria-label="Reviews drift wall"
    >
      <div
        ref={planeRef}
        className="absolute left-1/2 top-1/2 flex cursor-pointer flex-row [transform-style:preserve-3d] [transform-origin:50%_50%] will-change-transform"
      >
        {columnItems.map((col, c) => {
          const meta = columnMeta[c];
          const copies = meta ? Array.from({ length: meta.copies }) : [];
          return (
            <div
              className="relative w-[calc(var(--dw-tile-w)+var(--dw-gap))] [transform-style:preserve-3d]"
              key={`col-${c}`}
            >
              <div
                className="flex flex-col [transform-style:preserve-3d] will-change-transform"
                ref={(el) => {
                  trackRefs.current[c] = el;
                }}
              >
                {copies.map((_, copyIndex) =>
                  col.map((item, itemIndex) =>
                    renderTile(
                      item,
                      `${c}-${copyIndex}-${itemIndex}`,
                      c
                    )
                  )
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DriftWall;
