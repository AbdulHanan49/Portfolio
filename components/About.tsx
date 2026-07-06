"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { FiMapPin, FiBook, FiBriefcase, FiMoon } from "react-icons/fi";

/* ── Animated counter ── */
function StatCounter({
  target, label, suffix = "+",
}: {
  target: number; label: string; suffix?: string;
}) {
  const [count, setCount] = useState(target);
  const ref         = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();
          const step  = (now: number) => {
            const p = Math.min((now - start) / 1800, 1);
            const next = Math.round((1 - Math.pow(1 - p, 3)) * target);
            setCount(Math.max(next, 1));
            if (p < 1) requestAnimationFrame(step);
            else setCount(target);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  const display = count;

  return (
    <motion.div
      ref={ref}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.2, type: "spring", stiffness: 320 }}
      style={{ textAlign: "center", padding: "0 1.25rem", cursor: "default" }}
    >
      <div style={{
        fontFamily: "var(--font-space)", fontWeight: 900,
        fontSize: "clamp(2.2rem, 3.5vw, 3rem)", lineHeight: 1,
        background: "linear-gradient(135deg, var(--accent), var(--accent-secondary))",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}>
        {display}{suffix}
      </div>
      <div style={{
        fontFamily: "var(--font-fira)", fontSize: "0.62rem", fontWeight: 700,
        color: "var(--text-muted)", letterSpacing: "0.12em",
        textTransform: "uppercase", marginTop: "0.4rem",
      }}>
        {label}
      </div>
    </motion.div>
  );
}

const TRAITS = [
  { icon: FiMapPin,    label: "Pakistan"            },
  { icon: FiBook,      label: "FAST-NUCES '25"  },
  { icon: FiBriefcase, label: "Open to Remote"  },
  { icon: FiMoon,      label: "Night Owl Coder" },
];

export default function About() {
  return (
    <section
      id="about"
      style={{ background: "var(--bg-primary)", padding: "7rem 0 6rem", position: "relative", overflow: "hidden" }}
    >
      {/* ── Subtle dot grid (dark mode only) ── */}
      <div aria-hidden="true" className="dark-orb" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, rgba(100,255,218,0.07) 1px, transparent 1px)",
        backgroundSize: "38px 38px",
        mask: "radial-gradient(ellipse 75% 65% at 50% 50%, black 20%, transparent 80%)",
        WebkitMask: "radial-gradient(ellipse 75% 65% at 50% 50%, black 20%, transparent 80%)",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem", position: "relative", zIndex: 1 }}>

        {/* ── Section eyebrow ── */}
        <ScrollReveal>
          <p style={{
            fontFamily: "var(--font-fira)", fontSize: "0.65rem", fontWeight: 700,
            color: "var(--accent)", textTransform: "uppercase",
            letterSpacing: "0.28em", marginBottom: "3rem",
          }}>
            01 — About
          </p>
        </ScrollReveal>

        {/* ── Main 2-col grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* â•â•â•â• LEFT — Bio â•â•â•â• */}
          <ScrollReveal delay={0.1}>
            <div style={{ position: "relative" }}>

              {/* Decorative watermark initials */}
              <div aria-hidden="true" style={{
                position: "absolute", top: "-1.5rem", right: 0,
                fontFamily: "var(--font-space)", fontWeight: 900,
                fontSize: "clamp(7rem, 14vw, 13rem)", lineHeight: 1,
                color: "var(--accent)", opacity: 0.04,
                letterSpacing: "-0.05em", userSelect: "none",
                pointerEvents: "none",
              }}>
                AH
              </div>

              {/* ── Welcome intro — reference style ── */}
              <h3
                style={{
                  fontFamily: "var(--font-space)", fontWeight: 900,
                  fontSize: "clamp(2.4rem, 5vw, 3.4rem)",
                  color: "var(--text-primary)", lineHeight: 1.05,
                  letterSpacing: "-0.03em", margin: "0 0 1.25rem",
                }}
              >
                About me
              </h3>

              <p
                style={{
                  fontFamily: "var(--font-sora)", fontWeight: 400,
                  fontSize: "clamp(0.95rem, 1.5vw, 1.05rem)",
                  color: "var(--text-secondary)", lineHeight: 1.9,
                  marginBottom: "2.25rem", position: "relative",
                }}
              >
                I&apos;m a{" "}
                <span style={{ color: "var(--accent)", fontWeight: 600 }}>Full-Stack Software Engineer</span>
                {" "}based in Lahore, Pakistan, currently building{" "}
                <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>MixClip</span>
                {" "}— a production AI video editing SaaS — at{" "}
                <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>KCube Solutions</span>
                {" "}using React 18, FastAPI &amp; TypeScript as lead engineer in a cross-functional team of 4.
                Previously at Visnext Software Solutions building{" "}
                <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>Job Wallet</span>
                {" "}— an AI-powered job tracking SaaS — with Vue 3, Django REST Framework &amp; Python.
              </p>

              {/* Trait pills — staggered entrance + hover */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.55rem" }}>
                {TRAITS.map(({ icon: Icon, label }, i) => (
                  <motion.span
                    key={label}
                    whileHover={{
                      scale: 1.06, y: -3,
                      boxShadow: "var(--shadow-sm)",
                      borderColor: "var(--accent)",
                      color: "var(--accent)",
                    }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: "0.4rem",
                      padding: "0.45rem 0.85rem", borderRadius: 8,
                      background: "var(--bg-tertiary)",
                      border: "1px solid var(--border)",
                      fontFamily: "var(--font-fira)", fontSize: "0.7rem", fontWeight: 600,
                      color: "var(--text-muted)", letterSpacing: "0.03em",
                      cursor: "default",
                    }}
                  >
                    <Icon size={11} />
                    {label}
                  </motion.span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* â•â•â•â• RIGHT — Bento grid â•â•â•â• */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

            {/* Stats card */}
            <ScrollReveal delay={0.15}>
              <motion.div
                whileHover={{ y: -4, boxShadow: "var(--shadow-md)" }}
                transition={{ duration: 0.25 }}
                style={{
                  background: "var(--card-bg)", border: "1px solid var(--card-border)",
                  borderRadius: 20, padding: "1.75rem 0.75rem",
                  display: "flex", alignItems: "center",
                  justifyContent: "space-around",
                  position: "relative", overflow: "hidden",
                  cursor: "default",
                }}
              >
                <div style={{
                  position: "absolute", inset: 0,
                  background: "transparent",
                  pointerEvents: "none",
                }} />
                <StatCounter target={2}  label="Years Exp."     suffix="+" />
                <div style={{ width: 1, height: 44, background: "var(--border)" }} />
                <StatCounter target={3}  label="SaaS Shipped"  suffix="" />
                <div style={{ width: 1, height: 44, background: "var(--border)" }} />
                <StatCounter target={30} label="Technologies"  suffix="+" />
              </motion.div>
            </ScrollReveal>

            {/* Role + Education row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 200px), 1fr))", gap: "1rem" }}>

              {/* Current role */}
              <ScrollReveal delay={0.2}>
                <motion.div
                  whileHover={{ y: -5, boxShadow: "var(--shadow-md)" }}
                  transition={{ duration: 0.25 }}
                  style={{
                    background: "var(--card-bg)", border: "1px solid var(--card-border)",
                    borderRadius: 16, padding: "1.35rem",
                    position: "relative", overflow: "hidden", height: "100%",
                    cursor: "default",
                  }}
                >
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: 2,
                    background: "linear-gradient(to right, var(--accent), transparent)",
                  }} />
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: "0.35rem",
                    fontFamily: "var(--font-fira)", fontSize: "0.6rem", fontWeight: 700,
                    color: "#F59E0B", letterSpacing: "0.1em",
                    textTransform: "uppercase", marginBottom: "0.85rem",
                  }}>
                    <span style={{
                      width: 5, height: 5, borderRadius: "50%",
                      background: "#F59E0B", boxShadow: "0 0 6px #F59E0B",
                      display: "inline-block", animation: "pulse 2s ease infinite",
                    }} />
                    Current
                  </span>
                  <p style={{
                    fontFamily: "var(--font-space)", fontWeight: 800,
                    fontSize: "0.9rem", color: "var(--text-primary)",
                    marginBottom: "0.3rem", lineHeight: 1.3,
                  }}>
                    KCube Solutions
                  </p>
                  <p style={{
                    fontFamily: "var(--font-sora)", fontSize: "0.75rem",
                    color: "var(--text-muted)", lineHeight: 1.6,
                  }}>
                    Full-Stack Software Engineer<br />Oct 2025 — Present
                  </p>
                </motion.div>
              </ScrollReveal>

              {/* Education */}
              <ScrollReveal delay={0.25}>
                <motion.div
                  whileHover={{ y: -5, boxShadow: "var(--shadow-md)" }}
                  transition={{ duration: 0.25 }}
                  style={{
                    background: "var(--card-bg)", border: "1px solid var(--card-border)",
                    borderRadius: 16, padding: "1.35rem",
                    position: "relative", overflow: "hidden", height: "100%",
                    cursor: "default",
                  }}
                >
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: 2,
                    background: "linear-gradient(to right, var(--accent-secondary), transparent)",
                  }} />
                  <span style={{
                    display: "inline-block",
                    fontFamily: "var(--font-fira)", fontSize: "0.6rem", fontWeight: 700,
                    color: "var(--accent-secondary)", letterSpacing: "0.1em",
                    textTransform: "uppercase", marginBottom: "0.85rem",
                  }}>
                    Education
                  </span>
                  <p style={{
                    fontFamily: "var(--font-space)", fontWeight: 800,
                    fontSize: "0.9rem", color: "var(--text-primary)",
                    marginBottom: "0.3rem", lineHeight: 1.3,
                  }}>
                    FAST-NUCES
                  </p>
                  <p style={{
                    fontFamily: "var(--font-sora)", fontSize: "0.75rem",
                    color: "var(--text-muted)", lineHeight: 1.6,
                  }}>
                    BS Software Engineering<br />Class of 2025
                  </p>
                </motion.div>
              </ScrollReveal>
            </div>

            {/* Philosophy quote card */}
            <ScrollReveal delay={0.3}>
              <motion.div
                whileHover={{ y: -4, boxShadow: "var(--shadow-md)" }}
                transition={{ duration: 0.25 }}
                style={{
                  background: "var(--card-bg)",
                  border: "1px solid var(--card-border)",
                  borderRadius: 16, padding: "1.5rem",
                  position: "relative", overflow: "hidden",
                  cursor: "default",
                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute", right: "-0.5rem", bottom: "-1.75rem",
                    fontFamily: "var(--font-space)", fontWeight: 900,
                    fontSize: "6rem", color: "var(--accent-secondary)",
                    lineHeight: 1, userSelect: "none",
                    animation: "opacityPulse 4s ease-in-out infinite",
                  }}
                >
                  &ldquo;
                </div>
                <p style={{
                  fontFamily: "var(--font-sora)", fontSize: "0.9rem",
                  fontWeight: 500, color: "var(--text-secondary)",
                  lineHeight: 1.8, fontStyle: "italic",
                }}>
                  &ldquo;I care about the code{" "}
                  <span style={{
                    color: "var(--accent-light)",
                    fontStyle: "normal", fontWeight: 700,
                  }}>
                    after
                  </span>
                  {" "}it ships — performance, reliability, and the next
                  engineer who has to read it.&rdquo;
                </p>
              </motion.div>
            </ScrollReveal>

          </div>
        </div>
      </div>
    </section>
  );
}


