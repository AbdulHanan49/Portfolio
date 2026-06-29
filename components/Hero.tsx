"use client";

import { useEffect, useRef, useState } from "react";
import { FiGithub, FiLinkedin, FiMail, FiArrowRight } from "react-icons/fi";
import Image from "next/image";

const SOCIALS = [
  { Icon: FiGithub,   href: "https://github.com/AbdulHanan49",         label: "GitHub"   },
  { Icon: FiLinkedin, href: "https://linkedin.com/in/hanan-aslam-dev", label: "LinkedIn" },
  { Icon: FiMail,     href: "mailto:hananaslam90@gmail.com",            label: "Email"    },
];

const STATS = [
  { value: "2",   label: "Companies"    },
  { value: "14+", label: "Months Exp"   },
  { value: "30+", label: "Technologies" },
  { value: "3",   label: "SaaS Built"   },
];

/* ─────────────────────────────────────────
   PROFILE CARD — pure CSS transitions
───────────────────────────────────────── */
function ProfileCard() {
  const [hovered, setHovered] = useState(false);

  const INFO_ROWS = [
    { label: "Company",   value: "KCube Solutions",   accent: "#22D3EE" },
    { label: "Location",  value: "Lahore · Remote",   accent: "#00FFB2" },
    { label: "Education", value: "FAST NUCES · BSSE", accent: "#22D3EE" },
    { label: "Graduated", value: "2025",               accent: "#00FFB2" },
  ];

  const ease = "cubic-bezier(0.16,1,0.3,1)";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setHovered(v => !v)}
      style={{
        width: "min(300px, calc(100vw - 4rem))",
        height: "min(380px, calc(min(100vw - 4rem, 300px) * 1.27))",
        cursor: "default", position: "relative",
        borderRadius: 24, overflow: "hidden",
        boxShadow: hovered
          ? "0 32px 80px rgba(44,62,80,0.55), 0 0 0 1.5px rgba(0,255,178,0.55)"
          : "0 16px 48px rgba(44,62,80,0.35), 0 0 0 1px rgba(52,73,94,0.40)",
        transition: "box-shadow 0.45s ease",
        animation: "heroFadeUp 0.9s 0.3s both",
      }}
    >
      {/* Top accent bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3, zIndex: 10,
        background: "linear-gradient(to right, #00CC8E, #00FFB2, #22D3EE)",
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
          color: "rgba(196,181,253,0.7)", letterSpacing: "0.07em",
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
        fontFamily: "var(--font-fira)", fontSize: "0.58rem", fontWeight: 700,
        color: "#F59E0B", letterSpacing: "0.06em",
        animation: "badgeFloat 2.5s ease-in-out infinite",
      }}>
        <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#F59E0B", flexShrink: 0 }} />
        Employed
      </div>

      {/* Corner brackets */}
      {[
        { top: 12, left: 12, borderTop: true, borderLeft: true, color: "rgba(0,255,178,0.75)" },
        { bottom: 12, right: 12, borderBottom: true, borderRight: true, color: "rgba(34,211,238,0.75)" },
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
        background: "linear-gradient(to bottom, transparent 0%, rgba(0,255,178,0.18) 45%, rgba(34,211,238,0.12) 55%, transparent 100%)",
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
          background: "linear-gradient(to top, rgba(6,3,20,0.72) 0%, rgba(10,5,32,0.45) 55%, transparent 100%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease",
        }} />

        {/* Eyebrow */}
        <p style={{
          fontFamily: "var(--font-fira)", fontSize: "0.5rem", fontWeight: 700,
          color: "var(--accent)", letterSpacing: "0.32em",
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
              borderBottom: i < arr.length - 1 ? "1px solid rgba(52,73,94,0.40)" : "none",
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateY(0)" : "translateY(16px)",
              transition: `opacity 0.38s ${ease} ${hovered ? 0.14 + i * 0.07 : 0}s, transform 0.38s ${ease} ${hovered ? 0.14 + i * 0.07 : 0}s`,
            }}>
              <span style={{
                fontFamily: "var(--font-fira)", fontSize: "0.54rem", fontWeight: 600,
                color: "rgba(196,181,253,0.45)", letterSpacing: "0.08em", textTransform: "uppercase",
              }}>{label}</span>
              <span style={{
                fontFamily: "var(--font-sora)", fontSize: "0.7rem", fontWeight: 700,
                color: accent,
              }}>{value}</span>
            </div>
          ))}
        </div>

        {/* Status row */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginTop: "0.8rem", paddingTop: "0.7rem",
          borderTop: "1px solid rgba(52,73,94,0.40)",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(10px)",
          transition: `opacity 0.32s ease ${hovered ? "0.44s" : "0s"}, transform 0.32s ease ${hovered ? "0.44s" : "0s"}`,
        }}>
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
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   HERO
───────────────────────────────────────── */
export default function Hero() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!spotlightRef.current) return;
      const rect = spotlightRef.current.parentElement?.getBoundingClientRect();
      if (!rect) return;
      spotlightRef.current.style.background =
        `radial-gradient(900px circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, rgba(52,73,94,0.12), transparent 40%)`;
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
        className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12 px-5 sm:px-8 lg:px-16"
        style={{ minHeight: "100vh", maxWidth: "1240px", margin: "0 auto", paddingTop: "clamp(5rem, 10vw, 7rem)", paddingBottom: "3rem" }}
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
            Full-Stack Engineer
          </p>

          {/* Name block */}
          <div style={{ animation: "heroFadeUp 1s 0.1s both", marginBottom: "1.25rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "0.2rem" }}>
              <span style={{
                fontFamily: "var(--font-fira)", fontSize: "0.82rem", fontWeight: 700,
                color: "var(--accent)", letterSpacing: "0.38em", textTransform: "uppercase",
              }}>
                ABDUL
              </span>
              <div style={{
                flex: 1, height: "1px",
                background: "linear-gradient(to right, rgba(52,73,94,0.60), transparent)",
                transformOrigin: "left",
                animation: "heroLineGrow 0.8s 0.35s both ease",
              }} />
            </div>
            <h1 style={{
              fontFamily: "var(--font-space)", fontWeight: 900,
              fontSize: "clamp(3.2rem, 12vw, 8.5rem)",
              lineHeight: 0.88, letterSpacing: "-0.04em", textTransform: "uppercase",
              background: "linear-gradient(135deg, #00FFB2 0%, #22D3EE 45%, #33FFC0 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              margin: 0,
            }}>
              HANAN
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
              color: "var(--text-secondary)", letterSpacing: "0.06em",
            }}>
              Full-Stack Software Engineer
            </span>
          </div>

          {/* Description */}
          <div style={{ animation: "heroFadeUp 0.5s 0.55s both", maxWidth: "440px", marginBottom: "2rem" }}>
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

            <a
              href="mailto:hananaslam90@gmail.com"
              className="hero-btn-secondary"
            >
              <FiMail size={14} />
              Hire me
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
              width: "min(300px, calc(100vw - 4rem))", borderRadius: 14,
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
                  fontFamily: "var(--font-fira)", fontSize: "0.52rem", fontWeight: 700,
                  color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase",
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
