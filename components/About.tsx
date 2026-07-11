"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { FiMapPin, FiBook, FiBriefcase } from "react-icons/fi";

const TRAITS = [
  { icon: FiMapPin,    label: "Pakistan"       },
  { icon: FiBook,      label: "FAST-NUCES '24" },
  { icon: FiBriefcase, label: "Open to Remote" },
];

export default function About() {
  return (
    <section
      id="about"
      style={{ background: "var(--bg-primary)", padding: "1.25rem 0 1rem", position: "relative", overflow: "hidden" }}
    >
      {/* Subtle dot grid (dark mode only) */}
      <div aria-hidden="true" className="dark-orb" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, rgba(100,255,218,0.07) 1px, transparent 1px)",
        backgroundSize: "38px 38px",
        maskImage: "radial-gradient(ellipse 75% 65% at 50% 50%, black 20%, transparent 80%)",
        WebkitMaskImage: "radial-gradient(ellipse 75% 65% at 50% 50%, black 20%, transparent 80%)",
        willChange: "opacity",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 1 }}>

        {/* Section eyebrow */}
        <ScrollReveal>
          <p style={{
            fontFamily: "var(--font-fira)", fontSize: "0.65rem", fontWeight: 700,
            color: "var(--accent)", textTransform: "uppercase",
            letterSpacing: "0.28em", marginBottom: "0.75rem",
          }}>
            01. About
          </p>
        </ScrollReveal>

        {/* Main 2-col grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* LEFT — Bio */}
          <ScrollReveal delay={0.1}>
            <div style={{ position: "relative" }}>

              {/* Decorative watermark initials */}
              <div aria-hidden="true" style={{
                position: "absolute", top: "-1.5rem", right: 0,
                fontFamily: "var(--font-space)", fontWeight: 800,
                fontSize: "clamp(7rem, 14vw, 13rem)", lineHeight: 1,
                color: "var(--accent)", opacity: 0.04,
                letterSpacing: "-0.05em", userSelect: "none",
                pointerEvents: "none",
              }}>
                AH
              </div>

              <h3 style={{
                fontFamily: "var(--font-space)", fontWeight: 800,
                fontSize: "clamp(2rem, 4vw, 2.8rem)",
                color: "var(--text-primary)", lineHeight: 1.05,
                letterSpacing: "-0.03em", margin: "0 0 1.25rem",
              }}>
                About me
              </h3>

              <p style={{
                fontFamily: "var(--font-sora)", fontWeight: 400,
                fontSize: "clamp(0.95rem, 1.5vw, 1.05rem)",
                color: "var(--text-secondary)", lineHeight: 1.9,
                marginBottom: "2.25rem", position: "relative",
              }}>
                I&apos;m a{" "}
                <span style={{ color: "var(--accent)", fontWeight: 600 }}>Full-Stack Software Engineer</span>
                {" "}based in Lahore, Pakistan, currently building{" "}
                <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>MixClip</span>
                {" "}(a production AI video editing SaaS that's grown to 2,578 active users across 17+ countries) at{" "}
                <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>KCube Solutions</span>
                {" "}using React 18, FastAPI &amp; TypeScript as lead engineer in a cross-functional team of 4.
                Previously at Visnext Software Solutions building{" "}
                <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>Job Wallet</span>
                {" "}(an AI-powered job tracking SaaS) with Vue 3, Django REST Framework &amp; Python.
              </p>

              {/* Trait pills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.55rem" }}>
                {TRAITS.map(({ icon: Icon, label }) => (
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

          {/* RIGHT — Bento grid */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", justifyContent: "center" }}>

            {/* Role + Education row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem" }}>

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
                    fontFamily: "var(--font-space)", fontWeight: 700,
                    fontSize: "0.9rem", color: "var(--text-primary)",
                    marginBottom: "0.3rem", lineHeight: 1.3,
                  }}>
                    KCube Solutions
                  </p>
                  <p style={{
                    fontFamily: "var(--font-sora)", fontSize: "0.75rem",
                    color: "var(--text-muted)", lineHeight: 1.6,
                  }}>
                    Full-Stack Software Engineer<br />Oct 2025 · Present
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
                    fontFamily: "var(--font-space)", fontWeight: 700,
                    fontSize: "0.9rem", color: "var(--text-primary)",
                    marginBottom: "0.3rem", lineHeight: 1.3,
                  }}>
                    FAST-NUCES
                  </p>
                  <p style={{
                    fontFamily: "var(--font-sora)", fontSize: "0.75rem",
                    color: "var(--text-muted)", lineHeight: 1.6,
                  }}>
                    BS Software Engineering<br />Class of 2024
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
                  {" "}it ships: performance, reliability, and the next
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
