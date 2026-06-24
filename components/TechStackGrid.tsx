"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import {
  SiReact, SiTypescript, SiPython, SiJavascript, SiVuedotjs,
  SiFastapi, SiNodedotjs, SiTailwindcss, SiDjango,
  SiPostgresql, SiMongodb, SiDocker, SiGit, SiGithubactions,
  SiStripe, SiExpress, SiVite, SiOpenai, SiPostman,
  SiGithub, SiFigma, SiMysql, SiHtml5,
} from "react-icons/si";
import { FiCloud } from "react-icons/fi";

interface Tech { name: string; icon: React.ReactNode; color: string }

const rows: Tech[][] = [
  [
    { name: "React 18",    icon: <SiReact />,        color: "#61dafb" },
    { name: "TypeScript",  icon: <SiTypescript />,   color: "#3178c6" },
    { name: "Python",      icon: <SiPython />,       color: "#3776ab" },
    { name: "JavaScript",  icon: <SiJavascript />,   color: "#f7df1e" },
    { name: "Vue 3",       icon: <SiVuedotjs />,     color: "#42b883" },
    { name: "FastAPI",     icon: <SiFastapi />,      color: "#009688" },
    { name: "Node.js",     icon: <SiNodedotjs />,    color: "#68a063" },
    { name: "Tailwind",    icon: <SiTailwindcss />,  color: "#06b6d4" },
    { name: "Django REST", icon: <SiDjango />,       color: "#44b78b" },
  ],
  [
    { name: "PostgreSQL",  icon: <SiPostgresql />,   color: "#4169e1" },
    { name: "MongoDB",     icon: <SiMongodb />,      color: "#47a248" },
    { name: "Docker",      icon: <SiDocker />,       color: "#2496ed" },
    { name: "Git",         icon: <SiGit />,          color: "#f05032" },
    { name: "GH Actions",  icon: <SiGithubactions />,color: "#2088ff" },
    { name: "Stripe",      icon: <SiStripe />,       color: "#635bff" },
    { name: "Express",     icon: <SiExpress />,      color: "#c0c0c0" },
    { name: "Vite",        icon: <SiVite />,         color: "#646cff" },
  ],
  [
    { name: "Azure",       icon: <FiCloud />,        color: "#0078d4" },
    { name: "OpenAI",      icon: <SiOpenai />,       color: "#a0a0a0" },
    { name: "Postman",     icon: <SiPostman />,      color: "#ff6c37" },
    { name: "GitHub",      icon: <SiGithub />,       color: "#e2e8f0" },
    { name: "MySQL",       icon: <SiMysql />,        color: "#4479a1" },
  ],
  [
    { name: "Figma",       icon: <SiFigma />,        color: "#f24e1e" },
    { name: "HTML5",       icon: <SiHtml5 />,        color: "#e34f26" },
  ],
];

function TechCard({ tech, delay }: { tech: Tech; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width)  * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - r.top)  / r.height) * 100}%`);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 26, scale: 0.80 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-24px" }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={onMove}
      style={{
        "--tech-color": tech.color,
        width: 104, height: 104, flexShrink: 0,
        position: "relative",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        gap: "0.48rem",
        borderRadius: 18,
        background: `color-mix(in srgb, ${tech.color} 5%, var(--card-bg))`,
        border: `1px solid color-mix(in srgb, ${tech.color} 22%, var(--border))`,
        overflow: "hidden",
        cursor: "default",
        transition: "border-color .26s, box-shadow .26s, transform .26s, background .26s",
      } as React.CSSProperties}
      whileHover={{
        y: -6, scale: 1.06,
        borderColor: `color-mix(in srgb, ${tech.color} 55%, transparent)`,
        boxShadow: `0 0 0 1px color-mix(in srgb,${tech.color} 28%,transparent), 0 10px 32px color-mix(in srgb,${tech.color} 22%,transparent)`,
      } as never}
    >
      {/* Mouse-follow shimmer */}
      <span style={{
        position: "absolute", inset: 0, borderRadius: "inherit", pointerEvents: "none",
        background: `radial-gradient(72px circle at var(--mx,50%) var(--my,50%), color-mix(in srgb,${tech.color} 18%,transparent), transparent 70%)`,
        opacity: 0, transition: "opacity .2s",
      }} className="tech-shimmer" />

      {/* Coloured bottom strip */}
      <span style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
        background: tech.color, opacity: 0.35,
        borderRadius: "0 0 18px 18px",
      }} />

      {/* Icon */}
      <span style={{
        fontSize: "2rem", color: tech.color, display: "flex",
        alignItems: "center", justifyContent: "center",
        filter: `drop-shadow(0 0 0px ${tech.color}00)`,
        transition: "transform .26s, filter .26s",
      }} className="tech-icon">
        {tech.icon}
      </span>

      {/* Name */}
      <span style={{
        fontFamily: "var(--font-fira)", fontSize: "0.58rem", fontWeight: 600,
        color: "var(--text-muted)", textAlign: "center",
        letterSpacing: "0.04em", lineHeight: 1, whiteSpace: "nowrap",
        transition: "color .2s",
      }} className="tech-label">
        {tech.name}
      </span>
    </motion.div>
  );
}

export default function TechStackGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = sectionRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--sx", `${e.clientX - r.left}px`);
    el.style.setProperty("--sy", `${e.clientY - r.top}px`);
  };

  return (
    <section
      ref={sectionRef}
      className="tech-stack-section"
      onMouseMove={onMove}
      style={{ background: "var(--bg-secondary)" }}
    >
      <div className="tech-stack-spotlight" aria-hidden="true" />
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 75% 65% at 50% 50%, rgba(124,58,237,0.09) 0%, transparent 70%)",
      }} />

      {/* Scanning beam */}
      <motion.div
        aria-hidden="true"
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 4, repeat: Infinity, repeatDelay: 3, ease: "linear" }}
        style={{
          position: "absolute", top: 0, bottom: 0, width: 160, pointerEvents: "none",
          background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.07) 40%, rgba(167,139,250,0.14) 50%, rgba(124,58,237,0.07) 60%, transparent)",
          zIndex: 0,
        }}
      />

      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 1 }}>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
        >
          <p style={{
            fontFamily: "var(--font-fira)", fontSize: "0.65rem", fontWeight: 700,
            color: "var(--accent)", textTransform: "uppercase",
            letterSpacing: "0.28em", marginBottom: "0.75rem",
          }}>
            Full Toolbox
          </p>
          <h2 style={{
            fontFamily: "var(--font-space)", fontWeight: 900,
            fontSize: "clamp(2rem, 4.5vw, 3.6rem)",
            lineHeight: 1.05, color: "var(--text-primary)", letterSpacing: "-0.02em",
            marginBottom: "0.75rem",
          }}>
            Tech <span style={{ color: "var(--accent-secondary)" }}>Stack</span>
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{
              fontFamily: "var(--font-fira)", fontSize: "0.7rem",
              color: "var(--text-muted)", letterSpacing: "0.06em",
            }}
          >
            24 technologies · shipped in production
          </motion.p>
        </motion.div>

        {/* Diamond pyramid */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.72rem" }}>
          {rows.map((row, ri) => (
            <div key={ri} style={{ display: "flex", gap: "0.72rem", flexWrap: "wrap", justifyContent: "center" }}>
              {row.map((tech, ti) => (
                <TechCard key={`${ri}-${tech.name}`} tech={tech} delay={ri * 0.05 + ti * 0.035} />
              ))}
            </div>
          ))}
        </div>

      </div>

      {/* Global hover rules for inline-styled elements */}
      <style>{`
        .tech-icon    { transition: transform .26s ease, filter .26s ease; }
        .tech-shimmer { transition: opacity .2s ease; }
        .tech-label   { transition: color .2s ease; }
        div:hover > .tech-shimmer { opacity: 1 !important; }
        div:hover > .tech-icon {
          transform: scale(1.2) translateY(-1px);
          filter: drop-shadow(0 0 7px currentColor) !important;
        }
        div:hover > .tech-label { color: var(--text-secondary) !important; }
      `}</style>
    </section>
  );
}
