"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Static star field (deterministic, no hydration mismatch) ── */
const STARS = Array.from({ length: 75 }, (_, i) => ({
  x:  ((i * 73 + 17) % 97) + 1,
  y:  ((i * 47 + 31) % 93) + 2,
  r:  (i % 3) * 0.6 + 0.5,
  op: 0.12 + (i % 6) * 0.07,
  d:  (i % 5) * 0.55,
}));

/* ── Developer-themed loading messages ── */
const MESSAGES = [
  "Initialising dev environment...",
  "Installing dependencies...",
  "Bundling modules...",
  "Mounting components...",
  "Connecting to the cloud...",
  "Almost at launch velocity...",
];

/* ── Blinking terminal cursor ── */
function Cursor() {
  return (
    <motion.span
      animate={{ opacity: [1, 0] }}
      transition={{ duration: 0.65, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
      style={{ display: "inline-block", marginLeft: 1, color: "rgba(0,255,178,0.9)", lineHeight: 1 }}
    >▋</motion.span>
  );
}

/* ── Rocket SVG ── */
function Rocket() {
  return (
    <svg viewBox="0 0 80 148" width="90" height="158" fill="none" aria-hidden="true">
      <path d="M40 4 C40 4 24 22 24 46 L56 46 C56 22 40 4 40 4 Z"
        fill="white" stroke="rgba(120,86,255,0.55)" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M32 14 C29 22 27 33 27 42" stroke="rgba(255,255,255,0.35)"
        strokeWidth="1.2" strokeLinecap="round" />
      <rect x="24" y="44" width="32" height="60" fill="white"
        stroke="rgba(120,86,255,0.45)" strokeWidth="1.5" />
      <rect x="24" y="54" width="32" height="7" fill="rgba(120,86,255,0.18)" />
      <rect x="24" y="78" width="32" height="7" fill="rgba(120,86,255,0.18)" />
      <circle cx="40" cy="66" r="10" fill="#0B0812" stroke="#9B79FF" strokeWidth="2" />
      <circle cx="40" cy="66" r="6.5" fill="#110D1A" />
      <circle cx="40" cy="66" r="6.5" fill="url(#wglow)" />
      <circle cx="37" cy="63" r="2.2" fill="rgba(0,255,178,0.55)" />
      <path d="M24 86 L7 112 L24 107 Z"
        fill="#562abd" stroke="rgba(120,86,255,0.5)" strokeWidth="1" strokeLinejoin="round" />
      <path d="M56 86 L73 112 L56 107 Z"
        fill="#562abd" stroke="rgba(120,86,255,0.5)" strokeWidth="1" strokeLinejoin="round" />
      <rect x="28" y="104" width="24" height="12" rx="2"
        fill="#1A1228" stroke="#9B79FF" strokeWidth="1.2" />
      <path d="M28 116 L25 132 L55 132 L52 116 Z"
        fill="#110D1A" stroke="rgba(120,86,255,0.5)" strokeWidth="1.2" />
      <path d="M32 120 L30 130" stroke="rgba(120,86,255,0.3)" strokeWidth="0.8" />
      <path d="M48 120 L50 130" stroke="rgba(120,86,255,0.3)" strokeWidth="0.8" />
      <path d="M40 116 L40 132" stroke="rgba(120,86,255,0.25)" strokeWidth="0.8" />
      <defs>
        <radialGradient id="wglow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#562abd" stopOpacity="0.25" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

/* ── Engine flames ── */
function Flames({ launching }: { launching: boolean }) {
  return (
    <div style={{
      position: "absolute", bottom: -8, left: "50%",
      transform: "translateX(-50%)",
      display: "flex", alignItems: "flex-start", justifyContent: "center",
      width: 60, pointerEvents: "none",
    }}>
      <motion.div
        animate={launching
          ? { scaleY: [1, 4.5], scaleX: [1, 2.2], opacity: [0.7, 1] }
          : { scaleY: [1, 1.18, 0.9, 1.12, 1], scaleX: [1, 1.1, 0.95, 1] }
        }
        transition={{ duration: launching ? 0.5 : 0.65, repeat: launching ? 0 : Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute", top: 0,
          width: 46, height: 52,
          background: "radial-gradient(ellipse at 50% 0%, rgba(245,158,11,0.65) 0%, rgba(239,68,68,0.35) 55%, transparent 100%)",
          borderRadius: "48% 48% 50% 50%",
          filter: "blur(8px)",
          transformOrigin: "50% 0%",
        }}
      />
      <motion.div
        animate={launching
          ? { scaleY: [1, 5.5], opacity: [1, 1] }
          : { scaleY: [1, 1.22, 0.88, 1.18, 1], scaleX: [1, 0.88, 1.08, 0.95, 1] }
        }
        transition={{ duration: launching ? 0.45 : 0.55, repeat: launching ? 0 : Infinity }}
        style={{
          position: "absolute", top: 0,
          width: 30, height: 48,
          background: "linear-gradient(to bottom, #F59E0B 0%, #EF4444 55%, transparent 100%)",
          borderRadius: "50% 50% 45% 45%",
          filter: "blur(4px)",
          transformOrigin: "50% 0%",
        }}
      />
      <motion.div
        animate={launching
          ? { scaleY: [1, 6.5], opacity: [1, 1] }
          : { scaleY: [1, 1.3, 0.85, 1.25, 1], scaleX: [1, 0.82, 1.12, 0.9, 1] }
        }
        transition={{ duration: launching ? 0.4 : 0.42, repeat: launching ? 0 : Infinity }}
        style={{
          position: "absolute", top: 0,
          width: 16, height: 36,
          background: "linear-gradient(to bottom, #FFFBEB 0%, #FCD34D 40%, #F59E0B 75%, transparent 100%)",
          borderRadius: "50% 50% 45% 45%",
          filter: "blur(1.5px)",
          transformOrigin: "50% 0%",
        }}
      />
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, 28 + i * 8],
            x: [0, (i % 2 === 0 ? 1 : -1) * (8 + i * 4)],
            opacity: [1, 0],
            scale: [1, 0.3],
          }}
          transition={{ duration: 0.5 + i * 0.08, repeat: Infinity, delay: i * 0.09, ease: "easeOut" }}
          style={{
            position: "absolute", top: 28,
            width: 3, height: 3, borderRadius: "50%",
            background: i % 2 === 0 ? "#F59E0B" : "#FCD34D",
          }}
        />
      ))}
    </div>
  );
}

/* ── Launch pad ── */
function LaunchPad() {
  return (
    <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ display: "flex", gap: 52, marginBottom: 2 }}>
        {[-1, 1].map((side) => (
          <div key={side} style={{
            width: 2, height: 22,
            background: "linear-gradient(to bottom, rgba(120,86,255,0.6), rgba(120,86,255,0.2))",
          }} />
        ))}
      </div>
      <div style={{
        width: 110, height: 8, borderRadius: 4,
        background: "linear-gradient(to right, transparent, rgba(120,86,255,0.35) 20%, rgba(120,86,255,0.5) 50%, rgba(120,86,255,0.35) 80%, transparent)",
        boxShadow: "0 0 16px rgba(120,86,255,0.4), 0 0 4px rgba(120,86,255,0.3)",
      }} />
      <div style={{ display: "flex", gap: 60, marginTop: 2 }}>
        {[-1, 1].map((side) => (
          <div key={side} style={{
            width: 2, height: 14,
            background: "rgba(120,86,255,0.25)",
            transform: `rotate(${side * 15}deg)`,
            transformOrigin: "top center",
          }} />
        ))}
      </div>
    </div>
  );
}

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [msgIdx,   setMsgIdx]   = useState(0);
  const [phase,    setPhase]    = useState<"loading" | "launch" | "done">("loading");
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const dur = 2600;
    let start: number | null = null;

    const tick = (ts: number) => {
      if (!start) start = ts;
      const t      = Math.min((ts - start) / dur, 1);
      const eased  = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      setMsgIdx(Math.min(Math.floor(eased * MESSAGES.length), MESSAGES.length - 1));

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setPhase("launch");
        setTimeout(() => setPhase("done"), 1100);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  const launching = phase === "launch";

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            background: "#0B0820",
            overflow: "hidden",
          }}
        >
          {/* ── Star field ── */}
          <svg aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
            {STARS.map((s, i) => (
              <motion.circle key={i} cx={`${s.x}%`} cy={`${s.y}%`} r={s.r} fill="white"
                initial={{ opacity: s.op }}
                animate={{ opacity: [s.op, s.op * 0.3, s.op] }}
                transition={{ duration: 2 + s.d, repeat: Infinity, delay: s.d, ease: "easeInOut" }}
              />
            ))}
          </svg>

          {/* ── Subtle dot-grid overlay ── */}
          <div aria-hidden="true" style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage: "radial-gradient(circle, rgba(120,86,255,0.13) 1px, transparent 1px)",
            backgroundSize: "38px 38px",
            opacity: 0.55,
          }} />

          {/* ── Ambient deep glow ── */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(ellipse 55% 50% at 50% 60%, rgba(120,86,255,0.18) 0%, transparent 70%)",
          }} />

          {/* ── Rocket + pad assembly ── */}
          <motion.div
            animate={launching
              ? { y: [0, -40, -window.innerHeight * 1.4] }
              : { y: [0, -6, 0] }
            }
            transition={launching
              ? { duration: 0.9, ease: [0.4, 0, 1, 1] }
              : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }
            }
            style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "3.5rem" }}
          >
            <div style={{ position: "relative" }}>
              <Rocket />
              <Flames launching={launching} />
            </div>
            <div style={{ marginTop: 56 }}>
              <LaunchPad />
            </div>
          </motion.div>

          {/* ── Terminal status panel ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{
              position: "absolute", bottom: "7%",
              width: "100%", maxWidth: 340, padding: "0 1.5rem",
              display: "flex", flexDirection: "column", alignItems: "stretch", gap: "0.9rem",
            }}
          >
            {/* Terminal card */}
            <div style={{
              background: "rgba(11,8,32,0.72)",
              border: "1px solid rgba(120,86,255,0.22)",
              borderRadius: 12,
              padding: "0.9rem 1.15rem",
              backdropFilter: "blur(12px)",
              boxShadow: "0 0 40px rgba(120,86,255,0.07), inset 0 0 24px rgba(120,86,255,0.04)",
            }}>
              {/* Window chrome */}
              <div style={{
                display: "flex", alignItems: "center", gap: "0.42rem",
                marginBottom: "0.72rem", paddingBottom: "0.65rem",
                borderBottom: "1px solid rgba(120,86,255,0.11)",
              }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "rgba(239,68,68,0.45)", display: "inline-block" }} />
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "rgba(245,158,11,0.45)", display: "inline-block" }} />
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "rgba(34,197,94,0.45)", display: "inline-block" }} />
                <span style={{
                  marginLeft: "auto",
                  fontFamily: "var(--font-fira)", fontSize: "0.55rem",
                  color: "rgba(120,86,255,0.45)", letterSpacing: "0.16em",
                  textTransform: "uppercase",
                }}>
                  portfolio.exe
                </span>
              </div>

              {/* Prompt line */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={launching ? "ignition" : msgIdx}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.18 }}
                  style={{ display: "flex", alignItems: "center", gap: "0.55rem", minHeight: "1.2rem" }}
                >
                  <span style={{
                    fontFamily: "var(--font-fira)", fontSize: "0.7rem", fontWeight: 700,
                    color: launching ? "#F59E0B" : "rgba(120,86,255,0.75)",
                    flexShrink: 0,
                  }}>›</span>
                  <span style={{
                    fontFamily: "var(--font-fira)", fontSize: "0.67rem",
                    letterSpacing: launching ? "0.12em" : "0.04em",
                    fontWeight: launching ? 700 : 400,
                    color: launching ? "#FCD34D" : "rgba(0,255,178,0.78)",
                  }}>
                    {launching ? "IGNITION SEQUENCE" : MESSAGES[msgIdx]}
                  </span>
                  {!launching && <Cursor />}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress bar */}
            <div style={{
              width: "100%", height: 3, borderRadius: 999,
              background: "rgba(120,86,255,0.12)", position: "relative",
            }}>
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{
                  height: "100%", borderRadius: 999,
                  background: "linear-gradient(90deg, #562abd, #7856FF, #00FFB2)",
                  boxShadow: "0 0 10px rgba(120,86,255,0.9), 0 0 24px rgba(120,86,255,0.4)",
                  position: "relative",
                }}
              >
                <div style={{
                  position: "absolute", right: -1, top: "50%", transform: "translateY(-50%)",
                  width: 7, height: 7, borderRadius: "50%", background: "#fff",
                  boxShadow: "0 0 5px 2px rgba(0,255,178,0.9), 0 0 14px 4px rgba(120,86,255,0.7)",
                }} />
              </motion.div>
            </div>

            {/* Progress footer */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{
                fontFamily: "var(--font-fira)", fontSize: "0.56rem",
                color: "rgba(120,86,255,0.38)", letterSpacing: "0.14em", textTransform: "uppercase",
              }}>
                {launching ? "Launched" : "Loading"}
              </span>
              <span style={{
                fontFamily: "var(--font-fira)", fontSize: "0.68rem", fontWeight: 700,
                color: progress === 100 ? "#9B79FF" : "rgba(120,86,255,0.65)",
                letterSpacing: "0.14em",
              }}>
                {String(progress).padStart(3, "0")}%
              </span>
            </div>
          </motion.div>

          {/* ── Ground exhaust glow on launch ── */}
          <AnimatePresence>
            {launching && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: [0, 0.8, 0], scale: [0.5, 3, 5] }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                style={{
                  position: "absolute", top: "42%", left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 180, height: 180, borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(245,158,11,0.45) 0%, rgba(120,86,255,0.25) 40%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />
            )}
          </AnimatePresence>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
