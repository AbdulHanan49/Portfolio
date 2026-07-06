"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

export default function CursorSpotlight() {
  const { theme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const paint = (x: number, y: number) => {
      if (theme === "dark") {
        el.style.background = `radial-gradient(650px circle at ${x}px ${y}px, rgba(255,255,255,0.13) 0%, rgba(100,255,218,0.06) 40%, transparent 70%)`;
      } else {
        el.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(74,144,226,0.10) 0%, rgba(74,144,226,0.04) 40%, transparent 70%)`;
      }
    };

    const onMouse = (e: MouseEvent) => paint(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) paint(t.clientX, t.clientY);
    };

    window.addEventListener("mousemove", onMouse);
    window.addEventListener("touchmove", onTouch, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onTouch);
    };
  }, [theme]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 40,
        pointerEvents: "none",
      }}
    />
  );
}
