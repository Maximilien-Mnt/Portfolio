"use client";

import { useCallback, useEffect, useRef } from "react";

import { cn } from "@/lib/utils";
import { walk } from "@/lib/viz/walk";

export interface OriginFieldProps {
  className?: string;
}

/**
 * Hero canvas: 32px grid + centred axes + a seeded random-walk path drawn
 * progressively. Click (or Enter/Space) reseeds; the path end drifts toward the
 * cursor; a live (x, y) readout follows the pointer.
 *
 * Colours are read from CSS variables so the field follows the theme.
 * Pauses via IntersectionObserver when off-screen; cancels rAF on unmount;
 * renders a single final frame under prefers-reduced-motion.
 */
export function OriginField({ className }: OriginFieldProps = {}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const readoutRef = useRef<HTMLSpanElement>(null);

  const rafRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(null);
  const roRef = useRef<ResizeObserver | null>(null);
  const ioRef = useRef<IntersectionObserver | null>(null);
  const moRef = useRef<MutationObserver | null>(null);
  const mqRef = useRef<MediaQueryList | null>(null);

  const t0Ref = useRef(0);
  const seedRef = useRef(7);
  const ptsRef = useRef<number[]>([]);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const reduceRef = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  const DURATION = 2600;
  const GRID = 32;

  const css = (name: string) =>
    getComputedStyle(document.documentElement)
      .getPropertyValue(name)
      .trim();

  const size = useCallback(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = wrapper.getBoundingClientRect();
    const W = Math.max(1, Math.floor(rect.width));
    const H = Math.max(1, Math.floor(rect.height));
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    const ctx = canvas.getContext("2d")!;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }, []);

  const gen = useCallback(() => {
    ptsRef.current = walk(seedRef.current);
  }, []);

  const cancel = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const loopRef = useRef<((now: number) => void) | null>(null);
  loopRef.current = (now) => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;
    const ctx = canvas.getContext("2d")!;
    const rect = wrapper.getBoundingClientRect();
    const W = rect.width;
    const H = rect.height;

    const reveal = reduceRef.current
      ? 1
      : Math.min(1, (now - t0Ref.current) / DURATION);

    ctx.clearRect(0, 0, W, H);
    const cx = W / 2;
    const cy = H / 2;

    // 32px grid centred on the origin.
    ctx.strokeStyle = css("--grid");
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = cx % GRID; x < W; x += GRID) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
    }
    for (let y = cy % GRID; y < H; y += GRID) {
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
    }
    ctx.stroke();

    // Axes at the origin.
    ctx.strokeStyle = css("--fg-3");
    ctx.beginPath();
    ctx.moveTo(0, cy);
    ctx.lineTo(W, cy);
    ctx.moveTo(cx, 0);
    ctx.lineTo(cx, H);
    ctx.stroke();

    // X-axis tick labels (−5 … 5, 1 unit ≈ 128px).
    ctx.fillStyle = css("--fg-3");
    ctx.font =
      '10px "Martian Mono", ui-monospace, SFMono-Regular, Menlo, monospace';
    ctx.textBaseline = "top";
    for (let k = -5; k <= 5; k++) {
      if (k === 0) continue;
      ctx.fillText(String(k), cx + k * 128 + 3, cy + 12);
    }
    // Random-walk path, drawn progressively.
    const pts = ptsRef.current;
    const n = Math.floor(pts.length * reveal);
    const sx = W / Math.max(1, pts.length - 1);
    const drift = (mouseRef.current.y - 0.5) * H * 0.25;
    let headX = 0;
    let headY = 0;
    ctx.strokeStyle = css("--signal");
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    ctx.beginPath();
    for (let i = 0; i < n; i++) {
      const p = pts[i];
      if (p === undefined) continue;
      const x = i * sx;
      const y = cy - p * H * 0.55 + drift * (i / Math.max(1, pts.length));
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
      headX = x;
      headY = y;
    }
    ctx.stroke();

    // Head: signal dot + fg ring.
    if (n > 1) {
      ctx.fillStyle = css("--signal");
      ctx.beginPath();
      ctx.arc(headX, headY, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = css("--fg");
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(headX, headY, 10, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Cursor crosshair + readout.
    const mx = mouseRef.current.x * W;
    const my = mouseRef.current.y * H;
    ctx.strokeStyle = css("--fg-2");
    ctx.setLineDash([3, 4]);
    ctx.beginPath();
    ctx.moveTo(mx, 0);
    ctx.lineTo(mx, H);
    ctx.moveTo(0, my);
    ctx.lineTo(W, my);
    ctx.stroke();
    ctx.setLineDash([]);

    const x = ((mouseRef.current.x - 0.5) * 10).toFixed(2);
    const y = ((0.5 - mouseRef.current.y) * 10).toFixed(2);
    if (readoutRef.current) {
      readoutRef.current.textContent = `(x ${x}, y ${y})`;
    }

    if (!reduceRef.current && reveal < 1) {
      rafRef.current = requestAnimationFrame((ts) => loopRef.current!(ts));
    } else {
      rafRef.current = null;
    }
  };

  const start = useCallback(() => {
    cancel();
    t0Ref.current = performance.now();
    rafRef.current = requestAnimationFrame((ts) => loopRef.current!(ts));
  }, [cancel]);

  // Single frame with the current reveal (t0 is intentionally NOT reset so a
  // finished walk stays at reveal = 1 and only the cursor crosshair updates).
  const redrawOnce = useCallback(() => {
    cancel();
    rafRef.current = requestAnimationFrame((ts) => loopRef.current!(ts));
  }, [cancel]);

  const handleMove = useCallback(
    (e: MouseEvent) => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const rect = wrapper.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      mouseRef.current.x = (e.clientX - rect.left) / rect.width;
      mouseRef.current.y = (e.clientY - rect.top) / rect.height;
      redrawOnce();
    },
    [redrawOnce],
  );

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (e.target instanceof Element && e.target.closest("button, a")) return;
      seedRef.current += 1;
      gen();
      start();
    },
    [gen, start],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        seedRef.current += 1;
        gen();
        start();
      }
    },
    [gen, start],
  );

  const handleReduce = useCallback(() => {
    if (!mqRef.current) return;
    reduceRef.current = mqRef.current.matches;
    cancel();
    if (reduceRef.current) {
      t0Ref.current = performance.now();
      redrawOnce(); // final frame once, no loop
    } else {
      start();
    }
  }, [cancel, redrawOnce, start]);

  const handleResize = useCallback(() => {
    size();
    redrawOnce();
  }, [size, redrawOnce]);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (!entry) return;
      if (entry.isIntersecting) {
        t0Ref.current = performance.now();
        start();
      } else {
        cancel();
      }
    },
    [start, cancel],
  );

  useEffect(() => {
    gen();
    size();
    t0Ref.current = performance.now();
    start();

    const wrapper = wrapperRef.current;
    if (wrapper) {
      wrapper.addEventListener("mousemove", handleMove, { passive: true });
      wrapper.addEventListener("click", handleClick);
    }

    mqRef.current = window.matchMedia("(prefers-reduced-motion: reduce)");
    mqRef.current.addEventListener("change", handleReduce);

    moRef.current = new MutationObserver(redrawOnce);
    moRef.current.observe(document.documentElement, { attributes: true });

    roRef.current = new ResizeObserver(handleResize);
    if (wrapper) roRef.current.observe(wrapper);

    ioRef.current = new IntersectionObserver(handleIntersect, {
      threshold: 0,
    });
    if (wrapper) ioRef.current.observe(wrapper);
  }, [gen, size, start, handleMove, handleClick, handleReduce, redrawOnce, handleResize, handleIntersect]);

  useEffect(() => {
    return () => {
      cancel();
      if (mqRef.current) {
        mqRef.current.removeEventListener("change", handleReduce);
      }
      moRef.current?.disconnect();
      roRef.current?.disconnect();
      ioRef.current?.disconnect();
      const wrapper = wrapperRef.current;
      if (wrapper) {
        wrapper.removeEventListener("mousemove", handleMove);
        wrapper.removeEventListener("click", handleClick);
      }
    };
  }, [handleMove, handleClick, handleReduce, cancel]);

  return (
    <div
      ref={wrapperRef}
      tabIndex={0}
      aria-label="Origin field — random walk; click or press Enter to reseed"
      onKeyDown={handleKeyDown}
      className={cn("relative w-full h-full overflow-hidden", className)}
    >
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 w-full h-full block" />
      <span
        ref={readoutRef}
        aria-hidden="true"
        className="absolute left-3 top-3 z-20 font-mono text-[0.72rem] uppercase tracking-wider text-fg-3 whitespace-nowrap pointer-events-none"
      >
        (x 0.00, y 0.00)
      </span>
    </div>
  );
}
