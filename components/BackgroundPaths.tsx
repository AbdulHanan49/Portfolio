"use client";

import { motion } from "framer-motion";

// Pre-computed at module level — deterministic, no hydration issues
const PATHS = Array.from({ length: 36 }, (_, i) => {
  const t = i / 35;
  // Spread paths vertically across full viewport height
  const startY = -50 + t * 1000;
  // S-curve: alternating control point offsets create organic flow
  const wave = Math.sin(i * 0.88) * 90;
  const cp1y = startY - wave;
  const cp2y = startY + wave;
  const endY  = startY + Math.sin(i * 0.55) * 40;

  return {
    d: `M-100 ${startY} C360 ${cp1y} 1080 ${cp2y} 1540 ${endY}`,
    opacity: 0.035 + t * 0.085,
    strokeWidth: 0.35 + t * 0.85,
    duration: 16 + (i % 8) * 3,
    delay: t * 14,
  };
});

export default function BackgroundPaths() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      <svg
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
      >
        {PATHS.map((p, i) => (
          <motion.path
            key={i}
            d={p.d}
            stroke={`rgba(120,86,255,${p.opacity})`}
            strokeWidth={p.strokeWidth}
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: p.opacity }}
            transition={{
              pathLength: {
                duration: p.duration,
                delay: p.delay,
                ease: "linear",
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 0.8,
              },
              opacity: {
                duration: 1.2,
                delay: p.delay * 0.4,
                ease: "easeOut",
              },
            }}
          />
        ))}
      </svg>
    </div>
  );
}
