"use client";

import { useCallback, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import { FiArrowRight } from "react-icons/fi";

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
      "Sole engineer on a live AI video editing SaaS — full ownership from zero to production. Enabled billing in 17+ currency markets via Stripe, achieved zero-downtime deployments on Azure CI/CD, and shipped AI auto-subtitles (Azure Speech SDK) and Google Gemini features. Stack: React 18 / TypeScript frontend, FastAPI / PostgreSQL backend, Node.js / Remotion rendering microservice, Docker.",
    tags: ["React 18", "TypeScript", "FastAPI", "PostgreSQL", "Remotion", "Stripe", "Azure", "Docker"],
    liveUrl: "https://mix-clip.com/en?c=eur",
    gradient: "linear-gradient(135deg,#562abd 0%,#210C6E 60%,#0E0636 100%)",
    glow: "rgba(120,86,255,0.5)",
  },
  {
    number: "02",
    title: "Job Wallet",
    subtitle: "AI Job Tracking SaaS · Visnext Software Solutions",
    description:
      "Modernised a struggling legacy UI into a production-grade SaaS — full frontend rebuilt in Vue 3 / Quasar with Pinia and Tailwind. Delivered 10+ Django REST APIs, JWT + RBAC auth, Celery / Redis async queue cutting manual follow-up effort for users, and Stripe freemium billing with dual-channel notifications (email + in-app).",
    tags: ["Vue 3", "Quasar", "Django REST", "Python", "MySQL", "Celery", "Redis", "Stripe"],
    liveUrl: "https://jobwallet.co",
    gradient: "linear-gradient(135deg,#059669 0%,#065F46 60%,#022C22 100%)",
    glow: "rgba(5,150,105,0.5)",
  },
  {
    number: "03",
    title: "Screen Sizzle",
    subtitle: "Movie Seat Booking System · MERN",
    description:
      "Solved the hardest problem in booking systems — concurrent double-booking. Implemented atomic MongoDB update patterns and real-time seat locking so multiple users racing for the same seat never both succeed. Full-stack MERN with Stripe checkout and Nodemailer confirmation emails.",
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
      "Replaced manual paper-based library operations with a full digital workflow. Role-based access separates librarian and patron views, automated fine calculation eliminates manual overdue tracking, and a full issuance / return ledger gives librarians complete audit history.",
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
      "End-to-end Android booking app covering the full traveller journey — search, participant selection, scheduling, and operator confirmation — all synced in real-time via Firestore. Firebase Auth handles secure login; MVVM architecture keeps the codebase testable and maintainable as features grow.",
    tags: ["Kotlin", "Jetpack Compose", "Firebase Auth", "Firestore", "MVVM", "Android"],
    liveUrl: "#",
    githubUrl: "https://github.com/AbdulHanan49/TourVista",
    gradient: "linear-gradient(135deg,#0891b2 0%,#0e7490 60%,#083344 100%)",
    glow: "rgba(8,145,178,0.5)",
  },
  {
    number: "06",
    title: "Brain Tumor Detection",
    subtitle: "Medical Imaging Pipeline · Python / OpenCV",
    description:
      "Built a reproducible MRI preprocessing pipeline capable of ingesting mixed tumor / non-tumor datasets and outputting labelled sample grids for visual QA. Standardised input to 224×224 RGB, enabling drop-in compatibility with standard CNN classifiers — the bottleneck most ML projects skip.",
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

/* ── Project preview mockups ── */
function ScreenshotPreview({ src, alt }: { src: string; alt: string }) {
  return (
    <div style={{ width:"100%", height:"100%", overflow:"hidden", position:"relative" }}>
      <Image
        src={src} alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        style={{ objectFit:"cover", objectPosition:"top" }}
        loading="lazy"
        quality={72}
      />
    </div>
  );
}




function TourVistaPreview() {
  const tours = [
    { name:"Lahore City Tour", price:"PKR 2,500", stars:4 },
    { name:"Murree Weekend",   price:"PKR 8,000", stars:5 },
  ];
  return (
    <div style={{ width:"100%", height:"100%", background:"linear-gradient(160deg,#041820 0%,#083344 100%)", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ width:90, height:114, border:"2px solid rgba(8,145,178,0.5)", borderRadius:14, background:"rgba(0,0,0,0.5)", overflow:"hidden", boxShadow:"0 0 20px rgba(8,145,178,0.14)" }}>
        <div style={{ height:14, background:"rgba(8,145,178,0.25)", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div style={{ width:20, height:4, background:"rgba(255,255,255,0.2)", borderRadius:2 }} />
        </div>
        <div style={{ padding:"5px 6px 3px", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ height:4, width:50, background:"rgba(255,255,255,0.2)", borderRadius:2, marginBottom:2 }} />
          <div style={{ height:3, width:30, background:"rgba(8,145,178,0.4)", borderRadius:2 }} />
        </div>
        {tours.map((t, i) => (
          <div key={i} style={{ margin:"4px 5px", padding:"4px 5px", background:i===0?"rgba(8,145,178,0.15)":"rgba(255,255,255,0.05)", border:`1px solid ${i===0?"rgba(8,145,178,0.4)":"rgba(255,255,255,0.07)"}`, borderRadius:5 }}>
            <div style={{ fontFamily:"monospace", fontSize:5.5, color:"rgba(255,255,255,0.8)", marginBottom:2, lineHeight:1.3 }}>{t.name}</div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span style={{ fontSize:6, letterSpacing:1, color:"#FBBF24" }}>{"★".repeat(t.stars)}</span>
              <span style={{ fontFamily:"monospace", fontSize:5, color:"rgba(8,145,178,0.9)" }}>{t.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BrainTumorPreview() {
  const scans = ["tumor","normal","tumor","normal","tumor","normal"] as const;
  return (
    <div style={{ width:"100%", height:"100%", background:"linear-gradient(160deg,#0E0520 0%,#1A0945 100%)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:6 }}>
      <div style={{ fontFamily:"monospace", fontSize:6.5, color:"rgba(167,139,250,0.7)", letterSpacing:"0.1em", textTransform:"uppercase" }}>MRI Classification</div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:6 }}>
        {scans.map((type, i) => (
          <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:3 }}>
            <div style={{ width:34, height:34, borderRadius:6, background:type==="tumor"?"radial-gradient(circle at 55% 45%,rgba(180,0,0,0.6) 0%,rgba(60,20,80,0.9) 50%,rgba(20,10,40,1) 100%)":"radial-gradient(circle,rgba(80,80,80,0.8) 0%,rgba(30,30,60,0.9) 60%,rgba(10,5,30,1) 100%)", border:`1px solid ${type==="tumor"?"rgba(239,68,68,0.5)":"rgba(34,197,94,0.35)"}`, boxShadow:type==="tumor"?"0 0 6px rgba(239,68,68,0.22)":"none" }} />
            <span style={{ fontFamily:"monospace", fontSize:5.5, fontWeight:700, color:type==="tumor"?"rgba(239,68,68,0.8)":"rgba(34,197,94,0.7)" }}>{type==="tumor"?"Tumor":"Normal"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const PROJECT_PREVIEWS: Record<string, ReactNode> = {
  "01": <ScreenshotPreview src="/projects/mixclip.png"     alt="MixClip screenshot" />,
  "02": <ScreenshotPreview src="/projects/jobwallet.png"   alt="Job Wallet screenshot" />,
  "03": <ScreenshotPreview src="/projects/screensizzle.png" alt="Screen Sizzle screenshot" />,
  "04": <ScreenshotPreview src="/projects/smartlib.png"    alt="SmartLib screenshot" />,
  "05": <ScreenshotPreview src="/projects/tourvista.jpg" alt="TourVista screenshot" />,
  "06": <BrainTumorPreview />,
};

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
        onClick={() => {
          if (project.liveUrl !== "#") window.open(project.liveUrl, "_blank", "noopener,noreferrer");
        }}
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
          cursor: project.liveUrl !== "#" ? "pointer" : "default",
        }}
      >
        {/* Gradient banner */}
        <div style={{ height: 4, background: project.gradient, boxShadow: `0 0 12px ${project.glow.replace("0.5","0.6")}` }} />

        {/* Visual preview mockup */}
        <div style={{ height: 148, position: "relative", overflow: "hidden", borderBottom: "1px solid var(--border)" }}>
          {/* Image — blurs on hover */}
          <div style={{
            position: "absolute", inset: 0,
            filter: hovered ? "blur(3px) brightness(0.6)" : "blur(0px) brightness(1)",
            transform: hovered ? "scale(1.04)" : "scale(1)",
            transition: "filter 0.35s ease, transform 0.35s ease",
          }}>
            {PROJECT_PREVIEWS[project.number]}
          </div>

          {/* Dark overlay + CTA — fades in on hover */}
          <div style={{
            position: "absolute", inset: 0,
            background: "rgba(0,0,0,0.55)",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s ease",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: "0.5rem",
            pointerEvents: "none",
          }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "0.4rem",
              fontFamily: "var(--font-fira)", fontSize: "0.75rem", fontWeight: 700,
              color: "#fff", letterSpacing: "0.1em", textTransform: "uppercase",
              background: project.gradient,
              padding: "0.45rem 1.1rem", borderRadius: 999,
              boxShadow: `0 0 20px ${project.glow}`,
            }}>
              {project.liveUrl !== "#" ? "View Live ↗" : "Preview"}
            </span>
          </div>

          {/* Bottom fade into card */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 32, background: "linear-gradient(to bottom, transparent, var(--card-bg))", pointerEvents: "none" }} />
        </div>

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

          {project.liveUrl !== "#" ? (
            <motion.a
              href={project.liveUrl}
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
              Live Site
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
              03 — Projects
            </p>
            <h2 style={{
              fontFamily: "var(--font-space)", fontWeight: 900,
              fontSize: "clamp(2rem, 4vw, 3.4rem)", lineHeight: 1.05,
              color: "var(--text-primary)", letterSpacing: "-0.02em", marginBottom: "0.6rem",
            }}>
              Selected work
              <br />
              <span
                className="serif-italic"
                style={{ color: "var(--accent-secondary)", fontWeight: 700, letterSpacing: "-0.01em" }}
              >
                I&apos;m proud of
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
