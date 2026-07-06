"use client";

import { useEffect, useState } from "react";

const DELAYS = [1.4, 1.2, 1.0, 0.8, 0.6, 0.4, 0.2, 0, 0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.4];

// Key on window — persists across HMR module re-evaluations but resets on full page reload
const WIN_KEY = "__portfolio_loaded";

export default function LoadingScreen() {
  const [fading, setFading] = useState(false);
  const [gone,   setGone]   = useState(false);

  useEffect(() => {
    // If already shown in this browser window session (HMR reload), skip immediately
    if ((window as unknown as Record<string, unknown>)[WIN_KEY]) {
      setGone(true);
      return;
    }

    let minTimer: ReturnType<typeof setTimeout>;
    let fadeTimer: ReturnType<typeof setTimeout> | undefined;
    let rafId1: number;
    let rafId2: number;

    // Remove static HTML cover only after LoadingScreen is painted (2 frames)
    rafId1 = requestAnimationFrame(() => {
      rafId2 = requestAnimationFrame(() => {
        const cover = document.getElementById("pre-react-cover");
        if (cover) cover.remove();
      });
    });

    let minPassed = false;
    let pageDone  = false;

    function tryFade() {
      if (!minPassed || !pageDone) return;
      setFading(true);
      fadeTimer = setTimeout(() => {
        (window as unknown as Record<string, unknown>)[WIN_KEY] = true; // mark shown
        setGone(true);
      }, 720);
    }

    // Minimum visible time — let the equalizer bars animate at least once
    minTimer = setTimeout(() => {
      minPassed = true;
      tryFade();
    }, 1800);

    // Wait until ALL assets are loaded (fonts, images, scripts)
    if (document.readyState === "complete") {
      pageDone = true;
      tryFade();
    } else {
      window.addEventListener("load", function onLoad() {
        pageDone = true;
        tryFade();
      }, { once: true });
    }

    return () => {
      cancelAnimationFrame(rafId1);
      cancelAnimationFrame(rafId2);
      clearTimeout(minTimer);
      clearTimeout(fadeTimer);
    };
  }, []);

  if (gone) return null;

  return (
    <div
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
        background: "#0a192f",
        opacity: fading ? 0 : 1,
        transition: "opacity 0.72s cubic-bezier(0.4, 0, 0.2, 1)",
        pointerEvents: fading ? "none" : "auto",
        willChange: "opacity",
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
              background: "#64ffda",
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
        color: "rgba(100, 255, 218, 0.50)",
        textTransform: "uppercase",
      }}>
        Loading
      </span>
    </div>
  );
}
