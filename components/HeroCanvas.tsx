"use client";

import { useEffect, useRef } from "react";

/* Connect-Three particle-line background
   Grid of floating points; lines + circles activate near the cursor.
   Original design: marcoguglie.it — ported to React, no GSAP dependency,
   colors adapted to the violet-amber palette. */
export default function HeroCanvas({
  canvasOpacity = 0.65,
  lineColor = "156,217,249",
}: {
  canvasOpacity?: number;
  lineColor?: string;        // RGB triple, e.g. "156,217,249"
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = canvasRef.current;
    if (!el) return;
    const ctxOrNull = el.getContext("2d");
    if (!ctxOrNull) return;
    const ctx = ctxOrNull;

    let width  = window.innerWidth;
    let height = window.innerHeight;
    el.width   = width;
    el.height  = height;

    const mouse = { x: width / 2, y: height / 2 };
    let animating = true;
    let raf = 0;

    /* ── Point type ── */
    type Pt = {
      x: number; y: number;
      ox: number; oy: number;       // origin
      tx: number; ty: number;       // current move target
      sx: number; sy: number;       // move start position
      dur: number;                  // movement duration ms
      t0: number;                   // movement start timestamp
      r: number;                    // circle radius
      closest: Pt[];
      lineAlpha: number;
      dotAlpha: number;
    };

    let pts: Pt[] = [];

    function dist2(a: Pt, b: Pt) {
      return (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
    }

    function newTarget(p: Pt) {
      p.sx  = p.x;  p.sy  = p.y;
      p.tx  = p.ox + (Math.random() - 0.5) * 100;
      p.ty  = p.oy + (Math.random() - 0.5) * 100;
      p.dur = 1000 + Math.random() * 1000;
      p.t0  = performance.now();
    }

    function buildPoints() {
      pts = [];
      const cols = 20, rows = 20;
      const cw = width / cols, ch = height / rows;
      for (let cx = 0; cx < cols; cx++) {
        for (let cy = 0; cy < rows; cy++) {
          const px = cx * cw + Math.random() * cw;
          const py = cy * ch + Math.random() * ch;
          const p: Pt = {
            x: px, y: py, ox: px, oy: py,
            tx: px, ty: py, sx: px, sy: py,
            dur: 1000, t0: performance.now() - Math.random() * 1000,
            r: 2 + Math.random() * 2,
            closest: [], lineAlpha: 0, dotAlpha: 0,
          };
          // stagger start offset so points drift independently
          newTarget(p);
          pts.push(p);
        }
      }
      // find 5 nearest neighbours per point (computed once, stable enough)
      for (const p of pts) {
        p.closest = pts
          .filter(q => q !== p)
          .sort((a, b) => dist2(p, a) - dist2(p, b))
          .slice(0, 5);
      }
    }

    function easeInOut(t: number) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    function tick(p: Pt, now: number) {
      const t = Math.min((now - p.t0) / p.dur, 1);
      const e = easeInOut(t);
      p.x = p.sx + (p.tx - p.sx) * e;
      p.y = p.sy + (p.ty - p.sy) * e;
      if (t >= 1) newTarget(p);
    }

    function drawLines(p: Pt) {
      if (!p.lineAlpha) return;
      for (const c of p.closest) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(c.x, c.y);
        ctx.strokeStyle = `rgba(${lineColor},${p.lineAlpha})`;
        ctx.lineWidth   = 1.0;
        ctx.stroke();
      }
    }

    function drawDot(p: Pt) {
      if (!p.dotAlpha) return;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, false);
      ctx.fillStyle = `rgba(${lineColor},${p.dotAlpha})`;
      ctx.fill();
    }

    function loop(now: number) {
      if (animating) {
        ctx.clearRect(0, 0, width, height);
        for (const p of pts) {
          tick(p, now);
          const d = (mouse.x - p.x) ** 2 + (mouse.y - p.y) ** 2;
          if      (d < 4_000)  { p.lineAlpha = 0.75; p.dotAlpha = 1.00; }
          else if (d < 20_000) { p.lineAlpha = 0.35; p.dotAlpha = 0.65; }
          else if (d < 40_000) { p.lineAlpha = 0.12; p.dotAlpha = 0.28; }
          else                 { p.lineAlpha = 0;    p.dotAlpha = 0;    }
          drawLines(p);
          drawDot(p);
        }
      }
      raf = requestAnimationFrame(loop);
    }

    buildPoints();
    raf = requestAnimationFrame(loop);

    const onMouse  = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onScroll = () => { animating = window.scrollY <= height; };
    const onResize = () => {
      width = window.innerWidth; height = window.innerHeight;
      el.width = width; el.height = height;
      buildPoints();
    };

    window.addEventListener("mousemove", onMouse,  { passive: true });
    window.addEventListener("scroll",    onScroll, { passive: true });
    window.addEventListener("resize",    onResize, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll",    onScroll);
      window.removeEventListener("resize",    onResize);
    };
  }, [lineColor]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute", inset: 0,
        width: "100%", height: "100%",
        zIndex: 2, pointerEvents: "none",
        opacity: canvasOpacity, willChange: "transform",
      }}
    />
  );
}
