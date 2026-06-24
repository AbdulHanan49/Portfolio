"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  /* All animation state lives in refs — zero re-renders during RAF */
  const pos      = useRef({ x: -100, y: -100 });
  const ringPos  = useRef({ x: -100, y: -100 });
  const hovering = useRef(false);
  const onFooter = useRef(false);
  const ringSize = useRef(36);
  const ringOp   = useRef(0.45);
  const ringFill = useRef(0);
  const dotOp    = useRef(1);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    setVisible(true);
    document.body.style.cursor = "none";

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      hovering.current = !!el.closest(
        "a, button, [role='button'], label, input[type='submit'], input[type='button']"
      );
      onFooter.current = !!el.closest("footer");
    };

    const onLeave  = () => setVisible(false);
    const onEnter  = () => setVisible(true);

    window.addEventListener("mousemove",  onMove,   { passive: true });
    document.addEventListener("mouseover",  onOver,  { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    let raf: number;
    const tick = () => {
      const hov = hovering.current;
      const spd = 0.14; /* lerp speed for state transitions */

      /* Position — ring lags behind cursor, faster when hovering */
      ringPos.current.x += (pos.current.x - ringPos.current.x) * (hov ? 0.18 : 0.10);
      ringPos.current.y += (pos.current.y - ringPos.current.y) * (hov ? 0.18 : 0.10);

      /* Lerp all visual properties */
      ringSize.current += ((hov ? 52  : 36  ) - ringSize.current) * spd;
      ringOp.current   += ((hov ? 0.9 : 0.45) - ringOp.current)   * spd;
      ringFill.current += ((hov ? 0.12: 0   ) - ringFill.current)  * spd;
      dotOp.current    += ((hov ? 0   : 1   ) - dotOp.current)     * spd;

      const dot  = dotRef.current;
      const ring = ringRef.current;
      const half = ringSize.current / 2;

      const cursorColor = onFooter.current ? "255,255,255" : "120,86,255";

      if (dot) {
        dot.style.transform  = `translate(${pos.current.x - 3}px,${pos.current.y - 3}px)`;
        dot.style.opacity    = `${dotOp.current}`;
        dot.style.background = `rgb(${cursorColor})`;
      }
      if (ring) {
        ring.style.transform  = `translate(${ringPos.current.x - half}px,${ringPos.current.y - half}px)`;
        ring.style.width      = `${ringSize.current}px`;
        ring.style.height     = `${ringSize.current}px`;
        ring.style.opacity    = `${ringOp.current}`;
        ring.style.background = `rgba(${cursorColor},${ringFill.current.toFixed(3)})`;
        ring.style.borderColor = `rgb(${cursorColor})`;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseover",  onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Centre dot — snaps to cursor, fades out on hover */}
      <div
        ref={dotRef}
        style={{
          position: "fixed", top: 0, left: 0,
          width: 6, height: 6,
          borderRadius: "50%",
          background: "var(--accent)",
          pointerEvents: "none",
          zIndex: 99999,
          willChange: "transform, opacity",
        }}
      />
      {/* Trailing ring — expands + fills on hover */}
      <div
        ref={ringRef}
        style={{
          position: "fixed", top: 0, left: 0,
          width: 36, height: 36,
          borderRadius: "50%",
          border: "1.5px solid var(--accent)",
          pointerEvents: "none",
          zIndex: 99998,
          willChange: "transform, width, height, opacity",
        }}
      />
    </>
  );
}
