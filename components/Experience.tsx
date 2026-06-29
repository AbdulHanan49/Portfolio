"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

interface ExpItem {
  period: string;
  year: string;
  title: string;
  company: string;
  type: "Full-Time" | "Education";
  description: string;
  points: string[];
  tags: string[];
  metrics: string[];
  products?: string[];
  current?: boolean;
}

const items: ExpItem[] = [
  {
    period: "Oct 2025 – Present",
    year: "NOW",
    title: "Full-Stack Software Engineer",
    company: "KCube Solutions",
    type: "Full-Time",
    description:
      "Owning the full stack of MixClip — a production AI-powered video editing SaaS. React 18/TypeScript frontend, FastAPI/PostgreSQL backend, and Remotion 4 video rendering engine for scalable video exports.",
    points: [
      "Lead engineer in a cross-functional team of 4 (PM, designer, 1 developer) — owned full-stack architecture end-to-end",
      "Delivered Stripe subscription system with multi-currency billing (USD, EUR, GBP+)",
      "Shipped zero-downtime deployments via GitHub Actions CI/CD with Docker + Azure",
      "Integrated Google Gemini AI and Azure Cognitive Services Speech SDK for auto-subtitle generation",
    ],
    metrics: ["70+ Custom Hooks", "17+ Currencies", "Zero-Downtime CI/CD"],
    products: ["MixClip"],
    tags: ["React 18", "TypeScript", "FastAPI", "PostgreSQL", "Docker", "Azure", "Stripe", "Remotion"],
    current: true,
  },
  {
    period: "Apr 2025 – Sep 2025",
    year: "2025",
    title: "Associate Software Engineer",
    company: "Visnext Software Solutions",
    type: "Full-Time",
    description:
      "Rebuilt the full frontend of Job Wallet — an AI-powered job application tracking SaaS — migrating from a legacy UI to Vue 3 / Quasar Framework with Pinia and Tailwind CSS. Engineered 10+ Django REST Framework APIs across job descriptions, CV resumes, subscription plans, notifications, contacts, and files.",
    points: [
      "Sole engineer in a 2-person team (PM + developer) — delivered all frontend and backend features independently under PM-assigned sprint workflow",
      "Secured all APIs with JWT + RBAC; eliminated N+1 query patterns in Django ORM / MySQL reducing backend response overhead",
      "Implemented Celery + Redis async task queue for scheduled interview reminders and subscription lifecycle events",
      "Delivered Stripe freemium billing with 2 subscription tiers (Basic $0 / Unlimited $10/mo), webhook idempotency, and dual-channel notifications",
    ],
    metrics: ["10+ Feature Screens", "Celery + Redis", "Stripe Freemium"],
    products: ["Job Wallet"],
    tags: ["Vue 3", "Quasar", "Pinia", "Tailwind CSS", "Django REST", "Python", "MySQL", "JWT", "Celery", "Redis", "Stripe"],
  },
  {
    period: "2020 – 2025",
    year: "2020",
    title: "BS Software Engineering",
    company: "FAST-NUCES Lahore",
    type: "Education",
    description:
      "Graduated from the National University of Computer and Emerging Sciences (FAST-NUCES). Built a strong foundation in algorithms, software engineering, databases, and machine learning through hands-on projects and coursework.",
    points: [
      "Built a brain tumour detection system using deep learning (TensorFlow/Keras)",
      "Developed multiple full-stack web applications as semester and final-year projects",
      "Focused on practical software engineering and real-world problem solving",
    ],
    metrics: [],
    products: ["ScreenSizzle", "SmartLib", "Brain Tumor Detection"],
    tags: ["Python", "Java", "C++", "Data Structures", "Algorithms", "TensorFlow", "SQL"],
  },
];

const ACCENT     = "#22D3EE";
const ACCENT_LOW = "rgba(34,211,238,0.20)";
const MINT       = "#00FFB2";
const MINT_LOW   = "rgba(0,255,178,0.22)";

export default function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const fillRef     = useRef<HTMLDivElement>(null);
  const sparkRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const tl    = timelineRef.current;
      const fill  = fillRef.current;
      const spark = sparkRef.current;
      if (!tl || !fill || !spark) return;
      const rect = tl.getBoundingClientRect();
      const vh   = window.innerHeight;
      const raw  = (vh * 0.78 - rect.top) / (rect.height + vh * 0.48);
      const pct  = Math.min(100, Math.max(0, raw * 100));
      fill.style.height   = `${pct}%`;
      spark.style.top     = `${pct}%`;
      spark.style.opacity = pct > 1 && pct < 99 ? "1" : "0";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="experience"
      className="relative py-20 overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Background dot grid */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, rgba(52,73,94,0.18) 1px, transparent 1px)",
        backgroundSize: "44px 44px",
        mask: "radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 80%)",
        WebkitMask: "radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 80%)",
      }} />

      <div aria-hidden="true" style={{
        position: "absolute", top: "10%", left: "-8%",
        width: 480, height: 480, borderRadius: "50%", pointerEvents: "none",
        background: "radial-gradient(circle, rgba(44,62,80,0.80) 0%, transparent 70%)",
        filter: "blur(70px)",
      }} />

      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 55% 70% at 92% 50%, rgba(52,73,94,0.30) 0%, transparent 65%)",
      }} />

      <div aria-hidden="true" style={{
        position: "absolute", bottom: "0%", right: "15%",
        width: 350, height: 350, borderRadius: "50%", pointerEvents: "none",
        background: "radial-gradient(circle, rgba(44,62,80,0.50) 0%, transparent 70%)",
        filter: "blur(60px)",
      }} />

      <div className="max-w-[1100px] mx-auto px-6 relative z-10">

        {/* Section header */}
        <ScrollReveal>
          <div style={{ marginBottom: "3rem" }}>
            <p style={{
              fontFamily: "var(--font-fira)", fontSize: "0.65rem", fontWeight: 700,
              color: "var(--accent)", textTransform: "uppercase",
              letterSpacing: "0.28em", marginBottom: "0.85rem",
            }}>
              02 — Career
            </p>
            <h2 style={{
              fontFamily: "var(--font-space)", fontWeight: 900,
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              lineHeight: 1.05, color: "var(--text-primary)", letterSpacing: "-0.02em",
            }}>
              My career<br />
              <span style={{ color: "var(--accent-secondary)" }}>&amp;&nbsp;experience</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* ── Timeline ── */}
        <div
          ref={timelineRef}
          style={{ position: "relative", marginLeft: "0.25rem", paddingLeft: "clamp(1.5rem, 4vw, 2.25rem)" }}
        >
          {/* Track */}
          <div style={{
            position: "absolute", left: 0, top: 0, bottom: 0,
            width: 1, background: "rgba(0,255,178,0.12)",
          }} />

          {/* Scroll-driven fill */}
          <div
            ref={fillRef}
            style={{
              position: "absolute", left: "-0.5px", top: 0,
              width: 2, height: "0%",
              background: "linear-gradient(to bottom, #00FFB2 0%, #00CC8E 60%, rgba(0,255,178,0.4) 100%)",
              boxShadow: "0 0 8px 2px rgba(0,255,178,0.75), 0 0 20px 4px rgba(0,255,178,0.35)",
              borderRadius: 2,
              transition: "height 0.08s linear",
            }}
          />

          {/* Spark */}
          <div
            ref={sparkRef}
            style={{
              position: "absolute", left: "-5px", top: "0%",
              transform: "translateY(-50%)",
              width: 10, height: 10, borderRadius: "50%",
              background: "#fff",
              boxShadow: [
                "0 0 0 2px rgba(0,255,178,0.9)",
                "0 0 10px 4px rgba(0,255,178,0.9)",
                "0 0 24px 8px rgba(0,255,178,0.5)",
                "0 0 48px 16px rgba(0,255,178,0.2)",
              ].join(", "),
              opacity: 0,
              transition: "opacity 0.25s ease",
              zIndex: 20,
            }}
          />

          {items.map((item, idx) => {
            const isEdu      = item.type === "Education";
            const dotColor   = isEdu ? MINT       : ACCENT;
            const dotGlow    = isEdu ? MINT_LOW   : ACCENT_LOW;
            const accentHex  = isEdu ? "#00FFB2"  : "#22D3EE";
            const badgeBg    = isEdu ? "rgba(0,255,178,0.10)"  : "rgba(34,211,238,0.10)";
            const badgeBdr   = isEdu ? "rgba(0,255,178,0.35)"  : "rgba(34,211,238,0.30)";
            const badgeColor = isEdu ? MINT       : ACCENT;
            const barGrad    = isEdu
              ? "linear-gradient(90deg,#00FFB2,rgba(0,255,178,0))"
              : "linear-gradient(90deg,#22D3EE,rgba(34,211,238,0))";
            const metricColor = isEdu ? "#00FFB2" : "#22D3EE";
            const productColor = isEdu ? "#00FFB2" : "#22D3EE";

            return (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <div style={{ position: "relative", paddingBottom: idx < items.length - 1 ? "2.5rem" : 0 }}>

                  {/* Timeline dot */}
                  <div
                    style={{
                      position: "absolute",
                      left: "calc(clamp(-2.25rem, -4vw, -1.5rem) - 7px)", top: "1.6rem",
                      width: 14, height: 14,
                      borderRadius: "50%",
                      background: dotColor,
                      zIndex: 10,
                      "--dot-color": dotColor,
                      "--dot-glow": dotGlow,
                      animation: "timelineDotGlow 2.5s ease-in-out infinite",
                    } as CSSProperties}
                  />

                  {/* Card */}
                  <motion.div
                    whileHover={{
                      y: -4,
                      boxShadow: `0 18px 52px ${dotGlow}, 0 0 0 1px ${isEdu ? "rgba(0,255,178,0.30)" : "rgba(34,211,238,0.25)"}`,
                    }}
                    transition={{ duration: 0.22 }}
                    style={{
                      position: "relative", overflow: "hidden",
                      borderRadius: 18,
                      padding: "clamp(1rem, 3vw, 1.5rem) clamp(1rem, 3vw, 1.75rem)",
                      background: "var(--card-bg)",
                      border: isEdu
                        ? "1px solid rgba(0,255,178,0.18)"
                        : "1px solid rgba(34,211,238,0.20)",
                    }}
                  >
                    {/* Left accent bar */}
                    <div style={{
                      position: "absolute", left: 0, top: 0, bottom: 0, width: 3, borderRadius: "18px 0 0 18px",
                      background: `linear-gradient(to bottom, ${accentHex}, transparent)`,
                    }} />

                    {/* Top gradient bar */}
                    <div style={{
                      position: "absolute", top: 0, left: 0, right: 0, height: 2, borderRadius: "18px 18px 0 0",
                      background: barGrad,
                    }} />

                    {/* Year watermark */}
                    <span aria-hidden="true" style={{
                      position: "absolute", right: "1.25rem", top: "50%",
                      transform: "translateY(-50%)",
                      fontFamily: "var(--font-space)", fontWeight: 900,
                      fontSize: "5.5rem", color: "var(--text-primary)",
                      opacity: 0.03, letterSpacing: "-0.04em",
                      pointerEvents: "none", userSelect: "none",
                    }}>
                      {item.year}
                    </span>

                    {/* ── Two-column header ── */}
                    <div style={{
                      display: "flex", flexWrap: "wrap",
                      justifyContent: "space-between", alignItems: "flex-start",
                      gap: "0.75rem", marginBottom: "0.9rem",
                    }}>
                      {/* Left: title + company */}
                      <div>
                        <h3 style={{
                          fontFamily: "var(--font-space)", fontWeight: 800,
                          fontSize: "1.2rem", color: "var(--text-primary)",
                          marginBottom: "0.18rem", lineHeight: 1.2,
                        }}>
                          {item.title}
                        </h3>
                        <p style={{
                          fontFamily: "var(--font-fira)", fontSize: "0.8rem",
                          color: accentHex, fontWeight: 600,
                          letterSpacing: "0.03em", margin: 0,
                        }}>
                          {item.company}
                        </p>
                      </div>

                      {/* Right: period + badges */}
                      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.4rem", flexShrink: 0 }}>
                        <span style={{
                          fontFamily: "var(--font-fira)", fontSize: "0.68rem", fontWeight: 600,
                          color: "var(--text-muted)", letterSpacing: "0.04em",
                        }}>
                          {item.period}
                        </span>
                        <span style={{
                          padding: "0.14rem 0.6rem", borderRadius: 20,
                          fontFamily: "var(--font-fira)", fontSize: "0.6rem", fontWeight: 700,
                          letterSpacing: "0.06em", textTransform: "uppercase",
                          background: badgeBg, color: badgeColor, border: `1px solid ${badgeBdr}`,
                        }}>
                          {item.type}
                        </span>
                        {item.current && (
                          <span style={{
                            display: "inline-flex", alignItems: "center", gap: "0.3rem",
                            padding: "0.14rem 0.6rem", borderRadius: 20,
                            fontFamily: "var(--font-fira)", fontSize: "0.6rem", fontWeight: 700,
                            letterSpacing: "0.06em", textTransform: "uppercase",
                            background: "rgba(16,185,129,0.10)", color: "#10B981",
                            border: "1px solid rgba(16,185,129,0.30)",
                          }}>
                            <span style={{
                              width: 6, height: 6, borderRadius: "50%",
                              background: "#10B981", display: "inline-block",
                              animation: "pulse 2s ease infinite",
                            }} />
                            Current
                          </span>
                        )}
                      </div>
                    </div>

                    {/* ── Product / Project subheading ── */}
                    {item.products && item.products.length > 0 && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.55rem", marginBottom: "0.85rem" }}>
                        {item.products.map((p) => (
                          <a
                            key={p}
                            href="#projects"
                            onClick={(e) => {
                              e.preventDefault();
                              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                            }}
                            style={{
                              display: "inline-flex", alignItems: "center", gap: "0.25rem",
                              fontFamily: "var(--font-space)", fontSize: "0.88rem", fontWeight: 700,
                              color: productColor, textDecoration: "none",
                              transition: "opacity 0.15s",
                            }}
                            onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = "0.65"}
                            onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "1"}
                          >
                            {p}
                            <svg width="9" height="9" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M1 9L9 1M9 1H3M9 1v6"/>
                            </svg>
                          </a>
                        ))}
                      </div>
                    )}

                    {/* ── Metrics row ── */}
                    <div style={{ display: item.metrics.length ? "flex" : "none", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1rem" }}>
                      {item.metrics.map((m) => (
                        <span
                          key={m}
                          style={{
                            fontFamily: "var(--font-fira)", fontSize: "0.62rem", fontWeight: 700,
                            letterSpacing: "0.04em",
                            padding: "0.22rem 0.7rem", borderRadius: 8,
                            color: metricColor,
                            background: `${metricColor}10`,
                            border: `1px solid ${metricColor}28`,
                          }}
                        >
                          {m}
                        </span>
                      ))}
                    </div>

                    {/* Description */}
                    <p style={{
                      fontFamily: "var(--font-sora)", fontSize: "0.86rem",
                      color: "var(--text-secondary)", lineHeight: 1.8,
                      marginBottom: "0.9rem",
                    }}>
                      {item.description}
                    </p>

                    {/* Bullet points */}
                    <ul style={{
                      listStyle: "none", padding: 0,
                      margin: "0 0 1rem",
                      display: "flex", flexDirection: "column", gap: "0.45rem",
                    }}>
                      {item.points.map((pt, pi) => (
                        <li
                          key={pt}
                          style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}
                        >
                          <span
                            style={{
                              width: 5, height: 5, borderRadius: "50%",
                              background: dotColor, flexShrink: 0, marginTop: "0.5rem",
                              display: "inline-block",
                              animation: `dotPulse ${2 + pi * 0.3}s ease-in-out ${pi * 0.4}s infinite`,
                            }}
                          />
                          <span style={{
                            fontFamily: "var(--font-sora)", fontSize: "0.83rem",
                            color: "var(--text-secondary)", lineHeight: 1.6,
                          }}>
                            {pt}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech tags */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.38rem" }}>
                      {item.tags.map((t) => (
                        <span
                          key={t}
                          className="timeline-tag"
                          style={{ cursor: "default" }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
