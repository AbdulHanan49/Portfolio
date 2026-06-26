"use client";

import { useEffect, useRef, useState } from "react";

// Negative delays so bars start mid-cycle immediately (no dead wait on first frame)
const DELAYS = [1.4, 1.2, 1.0, 0.8, 0.6, 0.4, 0.2, 0, 0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.4];

export default function LoadingScreen() {
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onEnd = (e: AnimationEvent) => {
      // Only react to the container's own animation, not bubbled bar events
      if (e.target !== el) return;
      // Let React unmount cleanly — el.remove() bypasses reconciliation
      // and gets re-inserted on the next parent re-render (e.g. ThemeProvider setState)
      setDone(true);
    };

    el.addEventListener("animationend", onEnd);
    return () => el.removeEventListener("animationend", onEnd);
  }, []);

  if (done) return null;

  return (
    <div
      ref={ref}
      id="loading-overlay"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.5rem",
        background: "radial-gradient(ellipse 80% 60% at 50% 50%, #071428 0%, #030810 100%)",
        animation: "loadingFade 1s ease forwards",
        pointerEvents: "auto",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 80 }}>
        {DELAYS.map((delay, i) => (
          <div
            key={i}
            style={{
              width: 8,
              height: 80,
              borderRadius: 5,
              background: "#48CAE4",
              transformOrigin: "bottom center",
              willChange: "transform",
              animation: `equalize 1.2s -${delay}s infinite ease-in-out`,
              flexShrink: 0,
            }}
          />
        ))}
      </div>

      <span style={{
        fontFamily: "var(--font-fira), monospace",
        fontSize: "0.68rem",
        letterSpacing: "0.26em",
        color: "rgba(144, 224, 239, 0.50)",
        textTransform: "uppercase",
      }}>
        Loading
      </span>
    </div>
  );
}
