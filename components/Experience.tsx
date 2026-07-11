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
    period: "Oct 2025 · Present",
    year: "NOW",
    title: "Full-Stack Software Engineer",
    company: "KCube Solutions",
    type: "Full-Time",
    description:
      "Owning the full stack of MixClip, a production AI-powered video editing SaaS that's grown to 2,578 active users across 17+ countries. React 18/TypeScript frontend, FastAPI/PostgreSQL backend, and Remotion 4 video rendering engine for scalable video exports.",
    points: [
      "Lead engineer in a cross-functional team of 4 (PM, designer, 1 junior dev): made the call on tech stack and architecture from day one, with Google OAuth 2.0 for auth",
      "Frontend editor with undo/redo (Zustand), real-time server sync (TanStack Query v5), 17+ locale support (i18next), and PWA — got Core Web Vitals to 0 CLS and 130ms TBT",
      "Wired up Stripe billing in 17+ currencies hitting EUR 300+ in daily volume; added AI auto-subtitles (Azure Speech SDK) and Google Gemini AI content assistance",
      "Kept the service at 0 server errors over 30 days of production monitoring via Azure Application Insights; CI/CD on GitHub Actions with Docker multi-stage builds to Azure Container Apps",
    ],
    metrics: ["2,578 Active Users", "17+ Currencies", "0 Server Errors"],
    products: ["MixClip"],
    tags: ["React 18", "TypeScript", "FastAPI", "PostgreSQL", "Docker", "Azure", "Stripe", "Remotion"],
    current: true,
  },
  {
    period: "Apr 2025 · Sep 2025",
    year: "2025",
    title: "Associate Software Engineer",
    company: "Visnext Software Solutions",
    type: "Full-Time",
    description:
      "Rebuilt the full frontend of Job Wallet, an AI-powered job application tracking SaaS, migrating from a legacy UI to Vue 3 / Quasar Framework with Pinia and Tailwind CSS. Engineered 10+ Django REST Framework APIs across job descriptions, CV resumes, subscription plans, notifications, contacts, and files.",
    points: [
      "Sole engineer in a 2-person team (PM + developer): rewrote the frontend from scratch and delivered 10+ production screens — including an interview calendar and notification center — in six months",
      "Designed and shipped 10+ DRF endpoints (job pipelines, CV uploads, subscriptions, notifications, files) with JWT + RBAC; connected the CV parser into an existing ML pipeline for field extraction and job matching",
      "Tracked down and fixed N+1 query patterns across high-traffic Django ORM / MySQL routes; ran interview reminders and subscription lifecycle events via Celery + Redis off the main request path",
      "Shipped Stripe billing with 2 tiers (free / $10/mo) and idempotent webhooks; notifications go out as both in-app alerts and SendGrid email",
    ],
    metrics: ["10+ Feature Screens", "Celery + Redis", "Stripe Freemium"],
    products: ["Job Wallet"],
    tags: ["Vue 3", "Quasar", "Pinia", "Tailwind CSS", "Django REST", "Python", "MySQL", "JWT", "Celery", "Redis", "Stripe"],
  },
  {
    period: "2020 · 2024",
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

const ACCENT     = "var(--accent)";
const ACCENT_LOW = "var(--accent-mix-18)";

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
      className="relative py-6 overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Subtle dot grid (dark mode only) */}
      <div aria-hidden="true" className="dark-orb" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, rgba(100,255,218,0.07) 1px, transparent 1px)",
        backgroundSize: "44px 44px",
        maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 80%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 80%)",
      }} />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">

        {/* Section header */}
        <ScrollReveal>
          <div style={{ marginBottom: "1rem" }}>
            <p style={{
              fontFamily: "var(--font-fira)", fontSize: "0.65rem", fontWeight: 700,
              color: "var(--accent)", textTransform: "uppercase",
              letterSpacing: "0.28em", marginBottom: "0.85rem",
            }}>
              02. Career
            </p>
            <h2 style={{
              fontFamily: "var(--font-space)", fontWeight: 800,
              fontSize: "clamp(1.75rem, 3vw, 2.6rem)",
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
            width: 1, background: "var(--accent-mix-10)",
          }} />

          {/* Scroll-driven fill */}
          <div
            ref={fillRef}
            style={{
              position: "absolute", left: "-0.5px", top: 0,
              width: 2, height: "0%",
              background: "linear-gradient(to bottom, var(--accent) 0%, var(--accent) 60%, var(--accent-mix-45) 100%)",
              boxShadow: "0 0 8px 2px var(--accent-mix-25), 0 0 20px 4px var(--accent-mix-18)",
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
              background: "var(--bg-primary)",
              boxShadow: "0 0 0 2px var(--accent), 0 0 10px 4px var(--accent-mix-45), 0 0 24px 8px var(--accent-mix-25)",
              opacity: 0,
              transition: "opacity 0.25s ease",
              zIndex: 20,
            }}
          />

          {items.map((item, idx) => {
            const isEdu      = item.type === "Education";
            const dotColor   = isEdu ? "#8892b0" : ACCENT;
            const dotGlow    = isEdu ? "rgba(136,146,176,0.12)" : ACCENT_LOW;
            const accentHex   = "var(--accent)";
            const badgeBg     = "var(--accent-mix-10)";
            const badgeBdr    = "var(--accent-mix-25)";
            const badgeColor  = "var(--accent)";
            const barGrad     = "linear-gradient(90deg, var(--accent), transparent)";
            const metricColor = "var(--accent)";
            const productColor = "var(--accent)";

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
                      boxShadow: `0 18px 52px var(--accent-mix-18), 0 0 0 1px var(--accent-mix-45)`,
                    }}
                    transition={{ duration: 0.22 }}
                    style={{
                      position: "relative", overflow: "hidden",
                      borderRadius: 18,
                      padding: "clamp(1rem, 3vw, 1.5rem) clamp(1rem, 3vw, 1.75rem)",
                      background: "var(--card-bg)",
                      border: "1px solid var(--card-border)",
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

                    {/* Year watermark removed — was colliding with card text */}

                    {/* ── Header ── */}
                    <div style={{ marginBottom: "0.9rem" }}>
                      {/* Badges row — always on top, wraps freely */}
                      <div style={{
                        display: "flex", flexWrap: "wrap", alignItems: "center",
                        gap: "0.4rem", marginBottom: "0.55rem",
                      }}>
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

                      {/* Title + company below badges */}
                      <h3 style={{
                        fontFamily: "var(--font-space)", fontWeight: 700,
                        fontSize: "1.05rem", color: "var(--text-primary)",
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



