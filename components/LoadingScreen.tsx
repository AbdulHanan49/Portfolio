"use client";

import { useLayoutEffect, useRef, useState } from "react";

const DELAYS = [1.4, 1.2, 1.0, 0.8, 0.6, 0.4, 0.2, 0, 0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.4];

export default function LoadingScreen() {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Show only on the first visit of the browser session.
    // sessionStorage is cleared when the tab closes, so returning visitors
    // see it once per session rather than on every page load.
    if (sessionStorage.getItem("visited")) return;
    sessionStorage.setItem("visited", "1");
    setShow(true);
    const timer = setTimeout(() => setShow(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

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
        background: "radial-gradient(ellipse 80% 60% at 50% 50%, #243344 0%, #1C2B39 100%)",
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
              background: "#00FFB2",
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
        color: "rgba(0, 255, 178, 0.50)",
        textTransform: "uppercase",
      }}>
        Loading
      </span>
    </div>
  );
}
