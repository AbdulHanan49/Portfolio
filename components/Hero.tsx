"use client";

import { useEffect, useRef, useState } from "react";
import { FiGithub, FiLinkedin, FiMail, FiArrowRight } from "react-icons/fi";
import Image from "next/image";
import { useTheme } from "./ThemeProvider";

const SOCIALS = [
  { Icon: FiGithub,   href: "https://github.com/AbdulHanan49",         label: "GitHub"   },
  { Icon: FiLinkedin, href: "https://linkedin.com/in/hanan-aslam-dev", label: "LinkedIn" },
  { Icon: FiMail,     href: "mailto:hananaslam90@gmail.com",            label: "Email"    },
];

const STATS = [
  { value: "3",   label: "SaaS Shipped" },
  { value: "2+",  label: "Years Active" },
  { value: "30+", label: "Technologies" },
  { value: "2",   label: "Companies"    },
];

/* ─────────────────────────────────────────
   PROFILE CARD — pure CSS transitions
───────────────────────────────────────── */
function ProfileCard() {
  const [hovered, setHovered] = useState(false);

  const INFO_ROWS = [
    { label: "Company",  value: "KCube Solutions", accent: "#e8eeff" },
    { label: "Location", value: "Lahore · Remote", accent: "#e8eeff" },
    { label: "Degree",   value: "BSSE · FAST-NUCES '24", accent: "#e8eeff" },
  ];

  const ease = "cubic-bezier(0.16,1,0.3,1)";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setHovered(v => !v)}
      style={{
        width: "min(340px, calc(100vw - 4rem))",
        height: "min(430px, calc(min(100vw - 4rem, 340px) * 1.27))",
        cursor: "default", position: "relative",
        borderRadius: 24, overflow: "hidden",
        boxShadow: hovered
          ? "0 32px 80px rgba(10,25,47,0.55), 0 0 0 1.5px rgba(100, 255, 218,0.25)"
          : "0 16px 48px rgba(10,25,47,0.35), 0 0 0 1px rgba(36,52,71,0.40)",
        transition: "box-shadow 0.45s ease",
        animation: "heroFadeUp 0.9s 0.3s both",
      }}
    >
      {/* Top accent bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3, zIndex: 10,
        background: "linear-gradient(to right, var(--text-primary), var(--accent), var(--accent))",
      }} />

      {/* Photo — blurs and dims on hover */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        transformOrigin: "center top",
        filter: hovered ? "blur(4px) brightness(0.45) saturate(0.8)" : "blur(0px) brightness(1) saturate(1)",
        transform: hovered ? "scale(1.06)" : "scale(1)",
        transition: `filter 0.55s ${ease}, transform 0.55s ${ease}`,
      }}>
        <Image
          src="/profile.png"
          alt="Abdul Hanan"
          fill
          priority
          sizes="(max-width: 480px) calc(100vw - 4rem), 300px"
          style={{ objectFit: "cover", objectPosition: "top center" }}
        />
      </div>

      {/* Resting bottom scrim */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: "50%", zIndex: 3, pointerEvents: "none",
        background: "linear-gradient(to top, rgba(8,4,28,0.95) 0%, rgba(8,4,28,0.4) 60%, transparent 100%)",
        opacity: hovered ? 0 : 1,
        transition: "opacity 0.3s ease",
      }} />

      {/* Resting name + role */}
      <div style={{
        position: "absolute", bottom: 20, left: 18, right: 18, zIndex: 4,
        opacity: hovered ? 0 : 1,
        transform: hovered ? "translateY(12px)" : "translateY(0)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
      }}>
        <p style={{
          fontFamily: "var(--font-space)", fontWeight: 800,
          fontSize: "1.15rem", color: "#fff",
          letterSpacing: "-0.02em", margin: 0, lineHeight: 1.2,
        }}>Abdul Hanan</p>
        <p style={{
          fontFamily: "var(--font-fira)", fontSize: "0.6rem", fontWeight: 600,
          color: "rgba(136,146,176,0.7)", letterSpacing: "0.07em",
          textTransform: "uppercase", margin: "0.3rem 0 0",
        }}>Full-Stack Engineer</p>
      </div>

      {/* Employed badge — CSS float animation */}
      <div style={{
        position: "absolute", top: 16, right: 14, zIndex: 12,
        display: "inline-flex", alignItems: "center", gap: "0.35rem",
        padding: "0.28rem 0.72rem", borderRadius: 999,
        background: "rgba(8,4,28,0.65)",
        border: "1px solid rgba(245,158,11,0.5)",
        fontFamily: "var(--font-fira)", fontSize: "0.68rem", fontWeight: 700,
        color: "#F59E0B", letterSpacing: "0.05em",
        animation: "badgeFloat 2.5s ease-in-out infinite",
      }}>
        <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#F59E0B", flexShrink: 0 }} />
        Employed
      </div>

      {/* Corner brackets */}
      {[
        { top: 12, left: 12, borderTop: true, borderLeft: true, color: "rgba(100, 255, 218,0.40)" },
        { bottom: 12, right: 12, borderBottom: true, borderRight: true, color: "rgba(100, 255, 218,0.40)" },
      ].map((c, i) => (
        <div key={i} style={{
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
          opacity: hovered ? 1 : 0,
          transform: hovered ? "scale(1)" : "scale(0.6)",
          transition: `opacity 0.3s ease ${i * 0.05}s, transform 0.3s ease ${i * 0.05}s`,
        }} />
      ))}

      {/* Scan line — CSS animation on hover */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: 60, zIndex: 11, pointerEvents: "none",
        background: "linear-gradient(to bottom, transparent 0%, rgba(100, 255, 218,0.18) 45%, rgba(100, 255, 218,0.07) 55%, transparent 100%)",
        opacity: hovered ? 1 : 0,
        animation: hovered ? "cardScan 1.6s linear 0.5s infinite" : "none",
        transition: "opacity 0.15s ease",
      }} />

      {/* Slide-up overlay */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 8,
        background: "transparent",
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
        padding: "1.5rem 1.4rem",
        transform: hovered ? "translateY(0%)" : "translateY(100%)",
        transition: `transform 0.55s ${ease}`,
      }}>
        {/* Scrim behind text */}
        <div style={{
          position: "absolute", inset: 0, zIndex: -1, pointerEvents: "none",
          background: "linear-gradient(to top, rgba(4,2,14,0.94) 0%, rgba(6,3,20,0.78) 50%, rgba(6,3,20,0.35) 80%, transparent 100%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease",
        }} />

        {/* Eyebrow */}
        <p style={{
          fontFamily: "var(--font-fira)", fontSize: "0.62rem", fontWeight: 700,
          color: "var(--accent)", letterSpacing: "0.28em",
          textTransform: "uppercase", margin: "0 0 0.9rem",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(8px)",
          transition: `opacity 0.3s ease ${hovered ? "0.08s" : "0s"}, transform 0.3s ease ${hovered ? "0.08s" : "0s"}`,
        }}>About me</p>

        {/* Info rows — staggered */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {INFO_ROWS.map(({ label, value, accent }, i, arr) => (
            <div key={label} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "0.58rem 0",
              borderBottom: i < arr.length - 1 ? "1px solid rgba(36,52,71,0.40)" : "none",
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateY(0)" : "translateY(16px)",
              transition: `opacity 0.38s ${ease} ${hovered ? 0.14 + i * 0.07 : 0}s, transform 0.38s ${ease} ${hovered ? 0.14 + i * 0.07 : 0}s`,
            }}>
              <span style={{
                fontFamily: "var(--font-fira)", fontSize: "0.65rem", fontWeight: 600,
                color: "rgba(255,255,255,0.7)", letterSpacing: "0.06em", textTransform: "uppercase",
              }}>{label}</span>
              <span style={{
                fontFamily: "var(--font-sora)", fontSize: "0.78rem", fontWeight: 700,
                color: accent,
              }}>{value}</span>
            </div>
          ))}
        </div>

        {/* Status row */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginTop: "0.8rem", paddingTop: "0.7rem",
          borderTop: "1px solid rgba(36,52,71,0.40)",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(10px)",
          transition: `opacity 0.32s ease ${hovered ? "0.44s" : "0s"}, transform 0.32s ease ${hovered ? "0.44s" : "0s"}`,
        }}>
          <span style={{
            fontFamily: "var(--font-fira)", fontSize: "0.65rem", fontWeight: 600,
            color: "rgba(255,255,255,0.7)", letterSpacing: "0.06em", textTransform: "uppercase",
          }}>Status</span>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "0.32rem",
            fontFamily: "var(--font-fira)", fontSize: "0.72rem", fontWeight: 700, color: "#F59E0B",
          }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#F59E0B", flexShrink: 0 }} />
            Currently Employed
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   HERO
───────────────────────────────────────── */
export default function Hero() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const nameGradient = isDark
    ? "linear-gradient(135deg, #e6f1ff 0%, #ccd6f6 65%, #64ffda 100%)"
    : "linear-gradient(135deg, #0d2b5e 0%, #1e56c4 55%, #2563EB 100%)";

  const spotlightRef = useRef<HTMLDivElement>(null);
  const isDarkRef = useRef(isDark);
  useEffect(() => { isDarkRef.current = isDark; }, [isDark]);

  // Clear spotlight when theme switches so stale dark/light colour doesn't linger
  useEffect(() => {
    if (spotlightRef.current) spotlightRef.current.style.background = "";
  }, [isDark]);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    const handler = (e: MouseEvent) => {
      if (!spotlightRef.current) return;
      const rect = spotlightRef.current.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const color = isDarkRef.current
        ? "rgba(36,52,71,0.12)"
        : "rgba(74,144,226,0.07)";
      spotlightRef.current.style.background =
        `radial-gradient(900px circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, ${color}, transparent 40%)`;
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <section id="home" className="hero-section">

      {/* Background */}
      <div className="hero-grid"      aria-hidden="true" />
      <div className="hero-spotlight" ref={spotlightRef} aria-hidden="true" />
      <div className="hero-orb hero-orb-1" aria-hidden="true" />
      <div className="hero-orb hero-orb-2" aria-hidden="true" />
      <div className="hero-orb hero-orb-3" aria-hidden="true" />

      {/* Two-column layout */}
      <div
        className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12 px-6"
        style={{ maxWidth: "1200px", margin: "0 auto", paddingTop: "clamp(5.5rem, 10vw, 7.5rem)", paddingBottom: "clamp(3rem, 5vw, 4.5rem)" }}
      >

        {/* LEFT — Name block */}
        <div className="flex flex-col items-start text-left flex-1 min-w-0 w-full">

          {/* Overline */}
          <p style={{
            fontFamily: "var(--font-fira)", fontSize: "0.65rem", fontWeight: 700,
            color: "var(--accent)", letterSpacing: "0.28em", textTransform: "uppercase",
            marginBottom: "0.75rem",
            animation: "heroFadeIn 0.6s 0s both",
          }}>
            Hi, my name is
          </p>

          {/* Name block */}
          <div style={{ animation: "heroFadeUp 1s 0.1s both", marginBottom: "1.25rem" }}>
            <h1 style={{ margin: 0, lineHeight: 0.9, letterSpacing: "-0.03em", textTransform: "uppercase" }}>
              <span style={{
                display: "block",
                fontFamily: "var(--font-space)", fontWeight: 800,
                fontSize: "clamp(1.2rem, 3.5vw, 2.2rem)",
                color: "var(--text-secondary)", letterSpacing: "-0.02em",
                marginBottom: "0.1em",
              }}>
                Abdul
              </span>
              <span style={{
                display: "block",
                fontFamily: "var(--font-space)", fontWeight: 800,
                fontSize: "clamp(2.8rem, 10vw, 7rem)",
                lineHeight: 0.88, letterSpacing: "-0.04em",
                backgroundImage: nameGradient,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                Hanan
              </span>
            </h1>
          </div>

          {/* Static role */}
          <div style={{
            display: "flex", alignItems: "center", marginBottom: "1.5rem",
            animation: "heroFadeIn 0.5s 0.42s both",
          }}>
            <span style={{
              fontFamily: "var(--font-fira)",
              fontSize: "clamp(0.82rem, 1.6vw, 1rem)",
              color: "var(--accent)", letterSpacing: "0.06em",
            }}>
              Full-Stack Software Engineer
            </span>
          </div>

          {/* Description */}
          <div style={{ animation: "heroFadeUp 0.5s 0.55s both", maxWidth: "440px", marginBottom: "2rem" }}>
            <p style={{
              fontFamily: "var(--font-sora)",
              fontSize: "clamp(0.85rem, 1.3vw, 0.95rem)",
              color: "var(--text-secondary)", lineHeight: 1.85,
            }}>
              Building full-stack products with React, FastAPI &amp; TypeScript,
              from first commit to production. 2 years active, 3 SaaS shipped.
            </p>
          </div>

          {/* CTA buttons */}
          <div style={{
            display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1.75rem",
            animation: "heroFadeUp 0.45s 0.65s both",
          }}>
            <a
              href="#projects"
              className="hero-btn-primary"
              onClick={e => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}
            >
              View my work
              <FiArrowRight size={14} />
            </a>

          </div>

          {/* Socials */}
          <div style={{
            display: "flex", alignItems: "center", gap: "0.5rem",
            animation: "heroFadeUp 0.4s 0.75s both",
          }}>
            {SOCIALS.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank" rel="noopener noreferrer" aria-label={label}
                className="hero-social-icon"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>

        </div>

        {/* RIGHT — Card + Stats */}
        <div className="flex flex-col items-center gap-6 flex-shrink-0">

          <ProfileCard />

          {/* Stats grid */}
          <div
            className="stats-grid"
            style={{
              display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
              width: "min(340px, calc(100vw - 4rem))", borderRadius: 14,
              background: "var(--accent-mix-10)",
              border: "1px solid var(--border)",
              overflow: "hidden",
              animation: "heroFadeUp 0.5s 0.85s both",
            }}
          >
            {STATS.map((s, i) => (
              <div
                key={s.label}
                style={{
                  padding: "0.85rem 0",
                  textAlign: "center",
                  borderRight: i < STATS.length - 1 ? "1px solid var(--border)" : "none",
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
                  fontFamily: "var(--font-fira)", fontSize: "0.62rem", fontWeight: 700,
                  color: "var(--text-secondary)", letterSpacing: "0.08em", textTransform: "uppercase",
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Scroll indicator */}
      <div
        className="scroll-indicator"
        style={{ animation: "heroFadeIn 0.5s 1.2s both" }}
        aria-hidden="true"
      >
        <div className="scroll-line" />
      </div>

    </section>
  );
}



