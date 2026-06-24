"use client";

import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import SplitText from "./SplitText";
import { FiGithub, FiArrowRight } from "react-icons/fi";

interface Project {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  liveUrl: string;
  githubUrl?: string;
  gradient: string;
  glow: string;
}

const projects: Project[] = [
  {
    number: "01",
    title: "MixClip",
    subtitle: "AI Video SaaS · KCube Solutions",
    description:
      "Production AI-powered video editing SaaS built end-to-end as sole engineer. React 18/TypeScript frontend, FastAPI/PostgreSQL backend, Node.js/Remotion rendering microservice, Azure Speech SDK auto-subtitles, Google Gemini AI, Stripe multi-currency billing across 17+ currencies, and zero-downtime Azure CI/CD.",
    tags: ["React 18", "TypeScript", "FastAPI", "PostgreSQL", "Remotion", "Stripe", "Azure", "Docker"],
    liveUrl: "#",
    gradient: "linear-gradient(135deg,#562abd 0%,#210C6E 60%,#0E0636 100%)",
    glow: "rgba(120,86,255,0.5)",
  },
  {
    number: "02",
    title: "Job Wallet",
    subtitle: "AI Job Tracking SaaS · Visnext Software Solutions",
    description:
      "Rebuilt the full frontend of an AI-powered job tracking SaaS — migrating legacy UI to Vue 3/Quasar Framework with Pinia and Tailwind CSS. Engineered 10+ Django REST APIs, JWT + RBAC auth, Celery + Redis async task queue for interview reminders, and Stripe freemium billing with dual-channel notifications.",
    tags: ["Vue 3", "Quasar", "Django REST", "Python", "MySQL", "Celery", "Redis", "Stripe"],
    liveUrl: "#",
    gradient: "linear-gradient(135deg,#059669 0%,#065F46 60%,#022C22 100%)",
    glow: "rgba(5,150,105,0.5)",
  },
  {
    number: "03",
    title: "Screen Sizzle",
    subtitle: "Movie Seat Booking System · MERN",
    description:
      "Full-stack MERN movie seat booking platform with real-time seat availability, concurrent session handling, and atomic update patterns to prevent double-booking across simultaneous users. Features Stripe payment checkout and Nodemailer booking confirmation emails.",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "Stripe", "Nodemailer", "MERN"],
    liveUrl: "#",
    githubUrl: "https://github.com/AbdulHanan49/Screen-Sizzle",
    gradient: "linear-gradient(135deg,#2563EB 0%,#1E3A8A 60%,#0F172A 100%)",
    glow: "rgba(37,99,235,0.5)",
  },
  {
    number: "04",
    title: "SmartLib",
    subtitle: "Library Management System · ASP.NET",
    description:
      "Full-stack library management system with an ASP.NET backend and SQL Server. Implemented role-based access for librarians and patrons, book issuance and return tracking, and automated fine calculation for overdue returns.",
    tags: ["ASP.NET", "SQL Server", "HTML", "CSS", "JavaScript"],
    liveUrl: "#",
    githubUrl: "https://github.com/AbdulHanan49/LibApp",
    gradient: "linear-gradient(135deg,#D97706 0%,#92400E 60%,#451A03 100%)",
    glow: "rgba(217,119,6,0.5)",
  },
  {
    number: "05",
    title: "TourVista",
    subtitle: "Android Tour Booking App · Kotlin",
    description:
      "Android tour booking and management app built with Kotlin and Jetpack Compose. Features Firebase Authentication, Firestore real-time data sync, role-based access for travelers and tour operators, and an end-to-end booking flow covering tour search, participant selection, scheduling, and operator confirmation.",
    tags: ["Kotlin", "Jetpack Compose", "Firebase Auth", "Firestore", "MVVM", "Android"],
    liveUrl: "#",
    githubUrl: "https://github.com/AbdulHanan49/TourVista",
    gradient: "linear-gradient(135deg,#0891b2 0%,#0e7490 60%,#083344 100%)",
    glow: "rgba(8,145,178,0.5)",
  },
  {
    number: "06",
    title: "Brain Tumor Detection",
    subtitle: "Image Processing · Python / OpenCV",
    description:
      "Medical image preprocessing and visualization pipeline for brain tumor detection. Loads MRI images from tumor and non-tumor datasets, resizes to 224×224, converts BGR to RGB via OpenCV, and renders labeled sample grids using Matplotlib for visual analysis.",
    tags: ["Python", "OpenCV", "Matplotlib", "NumPy", "Jupyter", "Data Science"],
    liveUrl: "#",
    githubUrl: "https://github.com/AbdulHanan49/Brain-Tumor-Detection",
    gradient: "linear-gradient(135deg,#7c3aed 0%,#4c1d95 60%,#1e0a3c 100%)",
    glow: "rgba(124,58,237,0.5)",
  },
];

const GALLERY_ROWS = [
  [0, 1, 2, 3, 4, 5],
  [1, 2, 3, 4, 5, 0],
  [5, 0, 1, 2, 3, 4],
];

/* ── Single gallery thumbnail ── */
function GalleryCard({ project, delay }: { project: Project; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        width: 220, height: 145, borderRadius: 14,
        background: project.gradient,
        flexShrink: 0, position: "relative", overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: `0 8px 32px ${project.glow.replace("0.5", "0.2")}`,
      }}
    >
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)",
        backgroundSize: "18px 18px",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 70% 60% at 30% 30%, rgba(255,255,255,0.15), transparent)",
      }} />
      <span style={{
        position: "absolute", right: 12, bottom: 4,
        fontFamily: "var(--font-space)", fontWeight: 900,
        fontSize: "5rem", color: "rgba(255,255,255,0.07)",
        lineHeight: 1, letterSpacing: "-0.05em", userSelect: "none",
      }}>
        {project.number}
      </span>
      <div style={{ position: "absolute", bottom: 12, left: 14 }}>
        <p style={{
          fontFamily: "var(--font-space)", fontWeight: 800, fontSize: "0.85rem",
          color: "rgba(255,255,255,0.92)", marginBottom: 6, lineHeight: 1.2,
        }}>
          {project.title}
        </p>
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          {project.tags.slice(0, 2).map(t => (
            <span key={t} style={{
              fontFamily: "var(--font-fira)", fontSize: "0.55rem", fontWeight: 600,
              padding: "0.15rem 0.5rem", borderRadius: 20,
              background: "rgba(0,0,0,0.35)", color: "rgba(255,255,255,0.75)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}>{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Detailed project card ── */
function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMove = useCallback((e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    setTilt({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 10,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * -10,
    });
  }, []);

  return (
    <ScrollReveal delay={0.08} direction="up" className="h-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false); }}
        onClick={() => project.githubUrl && window.open(project.githubUrl, "_blank", "noopener,noreferrer")}
        animate={{
          boxShadow: hovered
            ? `0 24px 64px ${project.glow.replace("0.5", "0.3")}`
            : "0 4px 20px rgba(0,0,0,0.2)",
        }}
        style={{
          background: "var(--card-bg)",
          border: "1px solid var(--border)",
          borderRadius: 20,
          overflow: "hidden",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
          transition: "transform 0.2s ease-out",
          cursor: project.githubUrl ? "pointer" : "default",
        }}
      >
        {/* Gradient banner */}
        <div style={{ height: 4, background: project.gradient, boxShadow: `0 0 12px ${project.glow.replace("0.5","0.6")}` }} />

        <div style={{ padding: "clamp(1.25rem, 3vw, 1.75rem) clamp(1rem, 3vw, 2rem)", display: "flex", flexDirection: "column", flex: 1 }}>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
            <div>
              <span style={{
                fontFamily: "var(--font-fira)", fontSize: "0.65rem", fontWeight: 700,
                color: "var(--text-muted)", letterSpacing: "0.1em",
              }}>
                {project.number} / {project.subtitle}
              </span>
            </div>
            {project.githubUrl && (
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  whileHover={{ scale: 1.12, y: -2, color: "var(--accent)" }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  style={{
                    width: 34, height: 34, borderRadius: 8,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: "var(--bg-tertiary)", border: "1px solid var(--border)",
                    color: "var(--text-muted)", textDecoration: "none",
                  }}
                  aria-label="GitHub"
                >
                  <FiGithub size={15} />
                </motion.a>
              </div>
            )}
          </div>

          <h3 style={{
            fontFamily: "var(--font-space)", fontWeight: 800, fontSize: "1.35rem",
            color: "var(--text-primary)", marginBottom: "0.75rem", lineHeight: 1.2,
          }}>
            {project.title}
          </h3>

          <p style={{
            fontFamily: "var(--font-sora)", fontSize: "0.875rem",
            color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "1.25rem", flex: 1,
          }}>
            {project.description}
          </p>

          {/* Tag pills with hover */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.5rem" }}>
            {project.tags.map((t, i) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.08, y: -1 }}
                className="timeline-tag"
                style={{ cursor: "default" }}
              >
                {t}
              </motion.span>
            ))}
          </div>

          {project.githubUrl ? (
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              whileHover="hover"
              initial="rest"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.4rem",
                fontFamily: "var(--font-fira)", fontSize: "0.75rem", fontWeight: 700,
                color: "var(--accent-secondary)", textDecoration: "none", letterSpacing: "0.05em",
              }}
            >
              View on GitHub
              <motion.span
                variants={{ rest: { x: 0 }, hover: { x: 5 } }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                style={{ display: "flex", alignItems: "center" }}
              >
                <FiArrowRight size={13} />
              </motion.span>
            </motion.a>
          ) : (
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "0.4rem",
              fontFamily: "var(--font-fira)", fontSize: "0.75rem", fontWeight: 700,
              color: "var(--text-muted)", letterSpacing: "0.05em",
            }}>
              Private
            </span>
          )}
        </div>
      </motion.div>
    </ScrollReveal>
  );
}

export default function Projects() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <section id="projects" ref={sectionRef} onMouseMove={handleMouseMove}
      style={{ background: "var(--bg-secondary)", overflow: "hidden", position: "relative" }}>

      {/* Cursor spotlight */}
      <div aria-hidden="true" style={{
        position: "absolute", pointerEvents: "none",
        width: 700, height: 700, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(120,86,255,0.11) 0%, rgba(120,86,255,0.04) 40%, transparent 65%)",
        transform: `translate(${mouse.x - 350}px, ${mouse.y - 350}px)`,
        transition: "transform 0.12s ease-out",
        top: 0, left: 0,
      }} />

      {/* ═══ DIAGONAL PERSPECTIVE GALLERY ═══ */}
      <div style={{ height: "clamp(300px, 48vh, 480px)", position: "relative", overflow: "hidden" }}>
        <div className="proj-gallery-perspective" style={{
          position: "absolute",
          top: "-3rem", left: "-10rem", right: "-10rem",
          transform: "perspective(1400px) rotateX(22deg) rotateY(-5deg)",
          transformOrigin: "50% 100%",
          display: "flex", flexDirection: "column", gap: "1rem", padding: "1.5rem",
          opacity: 0.8, pointerEvents: "none",
        }}>
          {GALLERY_ROWS.map((row, ri) => (
            <div key={ri} style={{ display: "flex", gap: "1rem", marginLeft: `clamp(0px, ${ri * 7}vw, ${ri * 110}px)` }}>
              {row.map((projIdx, ci) => (
                <GalleryCard
                  key={`${ri}-${ci}`}
                  project={projects[projIdx]}
                  delay={ri * 0.08 + ci * 0.04}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Gradient fades */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "70%",
          background: "linear-gradient(to bottom, transparent, var(--bg-secondary))", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "30%",
          background: "linear-gradient(to bottom, var(--bg-secondary), transparent)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: "10%",
          background: "linear-gradient(to right, var(--bg-secondary), transparent)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "10%",
          background: "linear-gradient(to left, var(--bg-secondary), transparent)", pointerEvents: "none" }} />
      </div>

      {/* ═══ SECTION CONTENT ═══ */}
      <div className="max-w-[1100px] mx-auto px-6 pb-10">

        {/* Section header */}
        <ScrollReveal>
          <div style={{ marginBottom: "4rem" }}>
            <p style={{
              fontFamily: "var(--font-fira)", fontSize: "0.65rem", fontWeight: 700,
              color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.28em",
              marginBottom: "0.75rem",
            }}>
              04 — Projects
            </p>
            <h2 style={{
              fontFamily: "var(--font-space)", fontWeight: 900,
              fontSize: "clamp(2rem, 4vw, 3.4rem)", lineHeight: 1.05,
              color: "var(--text-primary)", letterSpacing: "-0.02em", marginBottom: "0.6rem",
            }}>
              <SplitText text="Selected work" by="word" stagger={0.08} />
              <br />
              <span
                className="serif-italic"
                style={{ color: "var(--accent-secondary)", fontWeight: 700, letterSpacing: "-0.01em" }}
              >
                <SplitText text="I'm proud of" by="word" stagger={0.09} delay={0.2} />
              </span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Project cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {projects.map((project) => (
            <ProjectCard key={project.number} project={project} />
          ))}
        </div>

      </div>
    </section>
  );
}
