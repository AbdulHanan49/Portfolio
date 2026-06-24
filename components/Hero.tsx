"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiArrowRight } from "react-icons/fi";
import dynamic from "next/dynamic";
import HeroCanvas from "@/components/HeroCanvas";
import SplitText from "@/components/SplitText";

const BackgroundPaths = dynamic(() => import("@/components/BackgroundPaths"), { ssr: false });

/* ── Typed text hook ── */
function useTyped(texts: string[]) {
  const [display, setDisplay] = useState("");
  const state = useRef({ textIdx: 0, charIdx: 0, deleting: false, timer: null as ReturnType<typeof setTimeout> | null });
  useEffect(() => {
    const s = state.current;
    s.textIdx = 0; s.charIdx = 0; s.deleting = false;
    const tick = () => {
      const cur = texts[s.textIdx];
      if (!s.deleting) {
        s.charIdx++;
        setDisplay(cur.slice(0, s.charIdx));
        if (s.charIdx >= cur.length) { s.deleting = true; s.timer = setTimeout(tick, 2500); return; }
        s.timer = setTimeout(tick, 60);
      } else {
        s.charIdx--;
        setDisplay(cur.slice(0, s.charIdx));
        if (s.charIdx <= 0) { s.deleting = false; s.textIdx = (s.textIdx + 1) % texts.length; s.timer = setTimeout(tick, 350); return; }
        s.timer = setTimeout(tick, 25);
      }
    };
    s.timer = setTimeout(tick, 500);
    return () => { if (s.timer) clearTimeout(s.timer); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return display;
}

const SOCIALS = [
  { Icon: FiGithub,   href: "https://github.com/AbdulHanan49",               label: "GitHub"   },
  { Icon: FiLinkedin, href: "https://linkedin.com/in/hanan-aslam-b6160723a",  label: "LinkedIn" },
  { Icon: FiMail,     href: "mailto:hananaslam90@gmail.com",                  label: "Email"    },
];

const TYPED_ROLES = [
  "Full-Stack Software Engineer",
  "Shipping Products, Not Just Code",
  "Building Modern Web Apps That Scale",
  "Turning Ideas into Scalable, Production-Ready Products",
  "Full-Stack Engineer · Production-Grade SaaS",
];

const STATS = [
  { value: "2",   label: "Companies"   },
  { value: "14+", label: "Months Exp"  },
  { value: "30+", label: "Technologies"},
  { value: "3",   label: "SaaS Built"  },
];

/* ─────────────────────────────────────────
   PROFILE CARD  — slide-up reveal on hover
   Photo blurs + tints, details rise from bottom
───────────────────────────────────────── */
function ProfileCard({ base }: { base: number }) {
  const [hovered, setHovered] = useState(false);

  const INFO_ROWS = [
    { label: "Company",   value: "KCube Solutions",   accent: "#9B79FF" },
    { label: "Location",  value: "Lahore · Remote",   accent: "#00FFB2" },
    { label: "Education", value: "FAST NUCES · BSSE", accent: "#9B79FF" },
    { label: "Graduated", value: "2024",               accent: "#00FFB2" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 60, scale: 0.88 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ delay: base + 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setHovered(v => !v)}
      style={{
        width: "min(300px, calc(100vw - 4rem))",
        height: "min(380px, calc(min(100vw - 4rem, 300px) * 1.27))",
        cursor: "default", position: "relative",
        borderRadius: 24, overflow: "hidden",
        boxShadow: hovered
          ? "0 32px 80px rgba(86,42,189,0.6), 0 0 0 1.5px rgba(120,86,255,0.75), 0 0 60px rgba(120,86,255,0.2)"
          : "0 16px 48px rgba(86,42,189,0.28), 0 0 0 1px rgba(120,86,255,0.22)",
        transition: "box-shadow 0.45s ease",
      }}
    >
      {/* ── Top accent bar ── */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3, zIndex: 10,
        background: "linear-gradient(to right, #562abd, #9B79FF, #00FFB2)",
      }} />

      {/* ── Photo (blurs + dims on hover) ── */}
      <motion.img
        src="/profile.png"
        alt="Abdul Hanan"
        animate={{
          filter: hovered
            ? "blur(4px) brightness(0.45) saturate(0.8)"
            : "blur(0px) brightness(1) saturate(1)",
          scale: hovered ? 1.06 : 1,
        }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "top center",
          zIndex: 1, transformOrigin: "center top",
        }}
      />

      {/* ── Resting bottom scrim (name readable when not hovered) ── */}
      <motion.div
        animate={{ opacity: hovered ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: "50%", zIndex: 3, pointerEvents: "none",
          background: "linear-gradient(to top, rgba(8,4,28,0.95) 0%, rgba(8,4,28,0.4) 60%, transparent 100%)",
        }}
      />

      {/* ── Resting name + role (fades out on hover) ── */}
      <motion.div
        animate={{ opacity: hovered ? 0 : 1, y: hovered ? 12 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ position: "absolute", bottom: 20, left: 18, right: 18, zIndex: 4 }}
      >
        <p style={{
          fontFamily: "var(--font-space)", fontWeight: 800,
          fontSize: "1.15rem", color: "#fff",
          letterSpacing: "-0.02em", margin: 0, lineHeight: 1.2,
        }}>Abdul Hanan</p>
        <p style={{
          fontFamily: "var(--font-fira)", fontSize: "0.6rem", fontWeight: 600,
          color: "rgba(196,181,253,0.7)", letterSpacing: "0.07em",
          textTransform: "uppercase", margin: "0.3rem 0 0",
        }}>Full-Stack Engineer</p>
      </motion.div>

      {/* ── Employed badge ── */}
      <motion.div
        animate={hovered ? { y: 0 } : { y: [0, -4, 0] }}
        transition={hovered
          ? { duration: 0.25 }
          : { duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute", top: 16, right: 14, zIndex: 12,
          display: "inline-flex", alignItems: "center", gap: "0.35rem",
          padding: "0.28rem 0.72rem", borderRadius: 999,
          background: "rgba(8,4,28,0.65)",
          border: "1px solid rgba(245,158,11,0.5)",
          fontFamily: "var(--font-fira)", fontSize: "0.58rem", fontWeight: 700,
          color: "#F59E0B", letterSpacing: "0.06em",
        }}
      >
        <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#F59E0B", flexShrink: 0 }} />
        Employed
      </motion.div>

      {/* ── Corner brackets (appear on hover) ── */}
      {[
        { top: 12, left: 12, borderTop: true, borderLeft: true, color: "rgba(0,255,178,0.75)" },
        { bottom: 12, right: 12, borderBottom: true, borderRight: true, color: "rgba(120,86,255,0.75)" },
      ].map((c, i) => (
        <motion.div key={i}
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.6 }}
          transition={{ duration: 0.3, delay: i * 0.05 }}
          style={{
            position: "absolute", zIndex: 12, width: 18, height: 18,
            pointerEvents: "none",
            ...(c.top    !== undefined ? { top:    c.top }    : {}),
            ...(c.left   !== undefined ? { left:   c.left }   : {}),
            ...(c.bottom !== undefined ? { bottom: c.bottom } : {}),
            ...(c.right  !== undefined ? { right:  c.right }  : {}),
            borderTop:    c.borderTop    ? `2px solid ${c.color}` : undefined,
            borderLeft:   c.borderLeft   ? `2px solid ${c.color}` : undefined,
            borderBottom: c.borderBottom ? `2px solid ${c.color}` : undefined,
            borderRight:  c.borderRight  ? `2px solid ${c.color}` : undefined,
          }}
        />
      ))}

      {/* ── Scan line sweeping down on hover ── */}
      <motion.div
        animate={hovered
          ? { y: ["-10%", "110%"], opacity: [0, 0.8, 0.8, 0] }
          : { opacity: 0 }}
        transition={hovered
          ? { duration: 1.6, repeat: Infinity, ease: "linear", repeatDelay: 0.5 }
          : { duration: 0.15 }}
        style={{
          position: "absolute", top: 0, left: 0, right: 0,
          height: 60, zIndex: 11, pointerEvents: "none",
          background: "linear-gradient(to bottom, transparent 0%, rgba(120,86,255,0.22) 45%, rgba(0,255,178,0.12) 55%, transparent 100%)",
        }}
      />

      {/* ────────────────────────────────────────
          SLIDE-UP OVERLAY — covers FULL card.
          Semi-transparent so blurred photo shows.
      ──────────────────────────────────────── */}
      <motion.div
        animate={{ y: hovered ? "0%" : "100%" }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "absolute", inset: 0, zIndex: 8,
          background: "transparent",
          borderTop: "none",
          /* content sits at the bottom */
          display: "flex", flexDirection: "column", justifyContent: "flex-end",
          padding: "1.5rem 1.4rem",
        }}
      >
        {/* Subtle scrim behind text only — for readability */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: "absolute", inset: 0, zIndex: -1, pointerEvents: "none",
            background: "linear-gradient(to top, rgba(6,3,20,0.72) 0%, rgba(10,5,32,0.45) 55%, transparent 100%)",
          }}
        />

        {/* Eyebrow */}
        <motion.p
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
          transition={{ delay: hovered ? 0.08 : 0, duration: 0.3 }}
          style={{
            fontFamily: "var(--font-fira)", fontSize: "0.5rem", fontWeight: 700,
            color: "rgba(120,86,255,0.8)", letterSpacing: "0.32em",
            textTransform: "uppercase", margin: "0 0 0.9rem",
          }}
        >
          About me
        </motion.p>

        {/* Info rows — staggered slide in */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {INFO_ROWS.map(({ label, value, accent }, i, arr) => (
            <motion.div
              key={label}
              animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 16 }}
              transition={{ delay: hovered ? 0.14 + i * 0.07 : 0, duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "0.58rem 0",
                borderBottom: i < arr.length - 1 ? "1px solid rgba(120,86,255,0.12)" : "none",
              }}
            >
              <span style={{
                fontFamily: "var(--font-fira)", fontSize: "0.54rem", fontWeight: 600,
                color: "rgba(196,181,253,0.45)", letterSpacing: "0.08em", textTransform: "uppercase",
              }}>{label}</span>
              <span style={{
                fontFamily: "var(--font-sora)", fontSize: "0.7rem", fontWeight: 700,
                color: accent,
              }}>{value}</span>
            </motion.div>
          ))}
        </div>

        {/* Status row */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
          transition={{ delay: hovered ? 0.44 : 0, duration: 0.32 }}
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            marginTop: "0.8rem", paddingTop: "0.7rem",
            borderTop: "1px solid rgba(120,86,255,0.18)",
          }}
        >
          <span style={{
            fontFamily: "var(--font-fira)", fontSize: "0.54rem", fontWeight: 600,
            color: "rgba(196,181,253,0.45)", letterSpacing: "0.08em", textTransform: "uppercase",
          }}>Status</span>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "0.32rem",
            fontFamily: "var(--font-fira)", fontSize: "0.62rem", fontWeight: 700, color: "#F59E0B",
          }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#F59E0B", flexShrink: 0 }} />
            Currently Employed
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   HERO
───────────────────────────────────────── */
export default function Hero() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const typedRole    = useTyped(TYPED_ROLES);
  const base         = 2.5;
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const check = () =>
      setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
    check();
    const mo = new MutationObserver(check);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => mo.disconnect();
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!spotlightRef.current) return;
      const rect = spotlightRef.current.parentElement?.getBoundingClientRect();
      if (!rect) return;
      spotlightRef.current.style.background =
        `radial-gradient(900px circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, rgba(120,86,255,0.08), transparent 40%)`;
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <section id="home" className="hero-section">

      {/* Background */}
      <div className="hero-grid"      aria-hidden="true" />
      <BackgroundPaths />
      <div className="hero-spotlight" ref={spotlightRef} aria-hidden="true" />
      <div className="hidden lg:block">
        <HeroCanvas
          key={isDark ? "dark" : "light"}
          canvasOpacity={isDark ? 0.65 : 0.55}
          lineColor={isDark ? "156,217,249" : "86,42,189"}
        />
      </div>
      <div className="hero-orb hero-orb-1" aria-hidden="true" />
      <div className="hero-orb hero-orb-2" aria-hidden="true" />
      <div className="hero-orb hero-orb-3" aria-hidden="true" />

      {/* ── Two-column layout ── */}
      <div
        className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12 px-5 sm:px-8 lg:px-16"
        style={{ minHeight: "100vh", maxWidth: "1240px", margin: "0 auto", paddingTop: "clamp(5rem, 10vw, 7rem)", paddingBottom: "3rem" }}
      >

        {/* ════ LEFT — Name block ════ */}
        <div className="flex flex-col items-start text-left flex-1 min-w-0 w-full">

          {/* Overline */}
          <p style={{
            fontFamily: "var(--font-fira)", fontSize: "0.65rem", fontWeight: 700,
            color: "var(--accent)", letterSpacing: "0.28em", textTransform: "uppercase",
            marginBottom: "0.75rem",
          }}>
            <SplitText text="Full-Stack Engineer" delay={base} stagger={0.045} />
          </p>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(16px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: base + 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: "1.25rem" }}
          >
            <div style={{
              display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "0.2rem",
            }}>
              <span style={{
                fontFamily: "var(--font-fira)", fontSize: "0.82rem", fontWeight: 700,
                color: "var(--accent)", letterSpacing: "0.38em", textTransform: "uppercase",
              }}>
                ABDUL
              </span>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: base + 0.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  flex: 1, height: "1px",
                  background: "linear-gradient(to right, rgba(120,86,255,0.55), transparent)",
                  transformOrigin: "left",
                }}
              />
            </div>
            <motion.h1
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              style={{
                fontFamily: "var(--font-space)", fontWeight: 900,
                fontSize: "clamp(3.2rem, 12vw, 8.5rem)",
                lineHeight: 0.88, letterSpacing: "-0.04em", textTransform: "uppercase",
                background: "linear-gradient(135deg, #EDE9FE 0%, #C4B5FD 25%, #9B79FF 50%, #562abd 75%, #C4B5FD 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                margin: 0,
              }}
            >
              HANAN
            </motion.h1>
          </motion.div>

          {/* Typed role */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: base + 0.42, duration: 0.5 }}
            style={{ display: "flex", alignItems: "center", marginBottom: "1.5rem", minHeight: "1.8rem" }}
          >
            <span style={{
              fontFamily: "var(--font-fira)",
              fontSize: "clamp(0.82rem, 1.6vw, 1rem)",
              color: "var(--text-secondary)", letterSpacing: "0.06em",
            }}>
              {typedRole}
              <span style={{
                display: "inline-block", width: "2px", height: "1.1em",
                background: "var(--accent)", marginLeft: "3px",
                verticalAlign: "text-bottom", animation: "blink 1s step-end infinite",
              }} />
            </span>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: base + 0.55, duration: 0.5 }}
            style={{ maxWidth: "440px", marginBottom: "2rem" }}
          >
            <p style={{
              fontFamily: "var(--font-sora)", fontWeight: 600,
              fontSize: "clamp(0.95rem, 1.4vw, 1.05rem)",
              color: "var(--text-primary)", lineHeight: 1.55, marginBottom: "0.5rem",
            }}>
              Building production&#8209;grade SaaS from idea to deployment.
            </p>
            <p style={{
              fontFamily: "var(--font-sora)",
              fontSize: "clamp(0.82rem, 1.2vw, 0.9rem)",
              color: "var(--text-muted)", lineHeight: 1.85,
            }}>
              Building full-stack products with React, FastAPI &amp; TypeScript —
              from first commit to production.
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: base + 0.65, duration: 0.45 }}
            style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1.75rem" }}
          >
            <motion.a
              href="#projects"
              onClick={e => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}
              whileHover={{ scale: 1.04, y: -3, boxShadow: "0 0 0 3px rgba(120,86,255,0.2), 0 14px 44px rgba(120,86,255,0.65), inset 0 1px 0 rgba(255,255,255,0.28)" }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.55rem",
                padding: "0.75rem 1.9rem", borderRadius: 999,
                background: "linear-gradient(135deg, #9B79FF 0%, #7856FF 40%, #562abd 100%)",
                color: "#fff", textDecoration: "none",
                fontFamily: "var(--font-fira)", fontSize: "0.75rem", fontWeight: 700,
                letterSpacing: "0.06em",
                boxShadow: "0 0 0 1px rgba(120,86,255,0.45), 0 4px 24px rgba(120,86,255,0.45), inset 0 1px 0 rgba(255,255,255,0.22)",
                position: "relative", overflow: "hidden",
              }}
            >
              <motion.span
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.8, ease: "linear" }}
                style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)", pointerEvents: "none" }}
              />
              View my work
              <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }} style={{ display: "inline-flex" }}>
                <FiArrowRight size={14} />
              </motion.span>
            </motion.a>

            <motion.a
              href="mailto:hananaslam90@gmail.com"
              whileHover={{ scale: 1.04, y: -3, color: "#9B79FF" }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.55rem",
                padding: "0.74rem 1.9rem", borderRadius: 999,
                background: "linear-gradient(var(--bg-primary), var(--bg-primary)) padding-box, linear-gradient(135deg, rgba(155,121,255,0.65), rgba(0,255,178,0.35)) border-box",
                border: "1.5px solid transparent",
                color: "var(--text-secondary)", textDecoration: "none",
                fontFamily: "var(--font-fira)", fontSize: "0.75rem", fontWeight: 700,
                letterSpacing: "0.06em",
              }}
            >
              <FiMail size={14} />
              Hire me
            </motion.a>
          </motion.div>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: base + 0.75, duration: 0.4 }}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            {SOCIALS.map(({ Icon, href, label }, i) => (
              <motion.a
                key={label}
                href={href}
                target="_blank" rel="noopener noreferrer" aria-label={label}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: base + 0.75 + i * 0.09, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -3, scale: 1.08, background: "rgba(120,86,255,0.18)", borderColor: "rgba(120,86,255,0.55)" }}
                whileTap={{ scale: 0.94 }}
                style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  width: 40, height: 40, borderRadius: 10,
                  background: "rgba(120,86,255,0.07)",
                  border: "1px solid rgba(120,86,255,0.22)",
                  color: "var(--text-secondary)", textDecoration: "none",
                }}
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </motion.div>

        </div>

        {/* ════ RIGHT — Card + Stats ════ */}
        <div className="flex flex-col items-center gap-6 flex-shrink-0">

          <ProfileCard base={base} />

          {/* Stats grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: base + 0.85, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="stats-grid"
            style={{
              display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
              width: "min(300px, calc(100vw - 4rem))", borderRadius: 14,
              background: "rgba(120,86,255,0.06)",
              border: "1px solid rgba(120,86,255,0.18)",
              overflow: "hidden",
            }}
          >
            {STATS.map((s, i) => (
              <div
                key={s.label}
                style={{
                  padding: "0.85rem 0",
                  textAlign: "center",
                  borderRight: i < STATS.length - 1 ? "1px solid rgba(120,86,255,0.14)" : "none",
                }}
              >
                <div style={{
                  fontFamily: "var(--font-space)", fontWeight: 900,
                  fontSize: "1.25rem", lineHeight: 1,
                  background: "linear-gradient(135deg, var(--accent), var(--accent-secondary))",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                  marginBottom: "0.2rem",
                }}>
                  {s.value}
                </div>
                <div style={{
                  fontFamily: "var(--font-fira)", fontSize: "0.52rem", fontWeight: 700,
                  color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase",
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>

        </div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: base + 1.2, duration: 0.5 }}
        aria-hidden="true"
      >
        <div className="scroll-line" />
      </motion.div>

    </section>
  );
}
