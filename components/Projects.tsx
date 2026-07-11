"use client";

import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import { FiArrowRight, FiGithub } from "react-icons/fi";

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
      "Lead engineer in a cross-functional team of 4 on a live AI video editing SaaS. Enabled billing in 17+ currency markets via Stripe, achieved zero-downtime deployments on Azure CI/CD, and shipped AI auto-subtitles (Azure Speech SDK) and Google Gemini features. Stack: React 18 / TypeScript frontend, FastAPI / PostgreSQL backend, Remotion 4 video rendering engine, Docker.",
    tags: ["React 18", "TypeScript", "FastAPI", "PostgreSQL", "Remotion", "Stripe", "Azure", "Docker"],
    liveUrl: "https://mix-clip.com/en?c=eur",
    gradient: "linear-gradient(135deg,#64ffda 0%,#0d6654 55%,#020c1b 100%)",
    glow: "rgba(100,255,218,0.40)",
  },
  {
    number: "02",
    title: "Job Wallet",
    subtitle: "AI Job Tracking SaaS · Visnext Software Solutions",
    description:
      "Modernised a struggling legacy UI into a production-grade SaaS. Full frontend rebuilt in Vue 3 / Quasar with Pinia and Tailwind. Delivered 10+ Django REST APIs, JWT + RBAC auth, Celery / Redis async queue, and Stripe freemium billing with dual-channel notifications (email + in-app).",
    tags: ["Vue 3", "Quasar", "Django REST", "Python", "MySQL", "Celery", "Redis", "Stripe"],
    liveUrl: "https://jobwallet.co",
    gradient: "linear-gradient(135deg,#4A90E2 0%,#1a4a8a 55%,#020c1b 100%)",
    glow: "rgba(74,144,226,0.45)",
  },
  {
    number: "03",
    title: "Screen Sizzle",
    subtitle: "Movie Seat Booking System · MERN",
    description:
      "Solved the hardest problem in booking systems: concurrent double-booking. Implemented atomic MongoDB update patterns and real-time seat locking so multiple users racing for the same seat never both succeed. Full-stack MERN with Stripe checkout and Nodemailer confirmation emails.",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "Stripe", "Nodemailer", "MERN"],
    liveUrl: "#",
    githubUrl: "https://github.com/AbdulHanan49/Screen-Sizzle",
    gradient: "linear-gradient(135deg,#38bdf8 0%,#0369a1 55%,#020c1b 100%)",
    glow: "rgba(56,189,248,0.40)",
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
    gradient: "linear-gradient(135deg,#818cf8 0%,#3730a3 55%,#020c1b 100%)",
    glow: "rgba(129,140,248,0.40)",
  },
  {
    number: "05",
    title: "TourVista",
    subtitle: "Android Tour Booking App · Kotlin",
    description:
      "End-to-end Android booking app covering the full traveller journey: search, participant selection, scheduling, and operator confirmation, all synced in real-time via Firestore. Firebase Auth handles secure login; MVVM architecture keeps the codebase testable and maintainable as features grow.",
    tags: ["Kotlin", "Jetpack Compose", "Firebase Auth", "Firestore", "MVVM", "Android"],
    liveUrl: "#",
    githubUrl: "https://github.com/AbdulHanan49/TourVista",
    gradient: "linear-gradient(135deg,#60a5fa 0%,#1d4ed8 55%,#020c1b 100%)",
    glow: "rgba(96,165,250,0.40)",
  },
  {
    number: "06",
    title: "Brain Tumor Detection",
    subtitle: "Medical Imaging Pipeline · Python / OpenCV",
    description:
      "Built a reproducible MRI preprocessing pipeline capable of ingesting mixed tumor / non-tumor datasets and outputting labelled sample grids for visual QA. Standardised input to 224x224 RGB, enabling drop-in compatibility with standard CNN classifiers, the bottleneck most ML projects skip.",
    tags: ["Python", "OpenCV", "Matplotlib", "NumPy", "Jupyter", "Data Science"],
    liveUrl: "#",
    githubUrl: "https://github.com/AbdulHanan49/Brain-Tumor-Detection",
    gradient: "linear-gradient(135deg,#a5b4fc 0%,#4f46e5 55%,#020c1b 100%)",
    glow: "rgba(165,180,252,0.40)",
  },
];

/* ── Project preview mockups ── */
function ScreenshotPreview({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      style={{ width:"100%", height:"100%", overflow:"hidden", position:"relative" }}
      onContextMenu={(e) => e.preventDefault()}
    >
      <Image
        src={src} alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        style={{
          objectFit:"cover", objectPosition:"top",
          WebkitTouchCallout: "none",
          userSelect: "none",
          pointerEvents: "none",
        }}
        draggable={false}
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
              <span style={{ fontSize:6, letterSpacing:1, color:"#FBBF24" }}>{"â˜…".repeat(t.stars)}</span>
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
  const [hovered, setHovered] = useState(false);

  return (
    <ScrollReveal delay={0.08} direction="up" className="h-full">
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => {
          if (project.liveUrl !== "#") window.open(project.liveUrl, "_blank", "noopener,noreferrer");
        }}
        animate={{
          boxShadow: hovered
            ? `0 28px 72px ${project.glow.replace("0.5", "0.50")}, 0 8px 28px rgba(0,0,0,0.35)`
            : "0 4px 20px rgba(0,0,0,0.15), 0 1px 4px rgba(0,0,0,0.08)",
        }}
        style={{
          background: "var(--card-bg)",
          border: "1px solid var(--border)",
          borderRadius: 20,
          overflow: "hidden",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          cursor: project.liveUrl !== "#" ? "pointer" : "default",
        }}
      >
        {/* Gradient banner */}
        <div style={{ height: 4, background: project.gradient }} />

        {/* Visual preview mockup */}
        <div
          style={{ height: 148, position: "relative", overflow: "hidden", borderBottom: "1px solid var(--border)" }}
          onContextMenu={(e) => e.preventDefault()}
        >
          {/* Image */}
          <div style={{
            position: "absolute", inset: 0,
            filter: "brightness(1)",
            transition: "transform 0.35s ease",
          }}>
            {PROJECT_PREVIEWS[project.number]}
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
            fontFamily: "var(--font-space)", fontWeight: 700, fontSize: "1.15rem",
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

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {project.liveUrl !== "#" && (
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
                  color: "var(--accent)", textDecoration: "none", letterSpacing: "0.05em",
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
            )}
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
                  color: project.liveUrl !== "#" ? "var(--text-muted)" : "var(--accent)",
                  textDecoration: "none", letterSpacing: "0.05em",
                }}
              >
                <FiGithub size={13} />
                View Code
              </motion.a>
            ) : (
              project.liveUrl === "#" && (
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: "0.4rem",
                  fontFamily: "var(--font-fira)", fontSize: "0.75rem", fontWeight: 700,
                  color: "var(--text-muted)", letterSpacing: "0.05em",
                }}>
                  Private
                </span>
              )
            )}
          </div>
        </div>
      </motion.div>
    </ScrollReveal>
  );
}

export default function Projects() {
  return (
    <section id="projects"
      style={{ background: "var(--bg-primary)", overflow: "hidden", position: "relative" }}>

      {/* === SECTION CONTENT === */}
      <div className="max-w-[1200px] mx-auto px-6 pt-6 pb-5">

        {/* Section header */}
        <ScrollReveal>
          <div style={{ marginBottom: "1.5rem" }}>
            <p style={{
              fontFamily: "var(--font-fira)", fontSize: "0.65rem", fontWeight: 700,
              color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.28em",
              marginBottom: "0.75rem",
            }}>
              03. Projects
            </p>
            <h2 style={{
              fontFamily: "var(--font-space)", fontWeight: 800,
              fontSize: "clamp(1.75rem, 3vw, 2.6rem)", lineHeight: 1.05,
              color: "var(--text-primary)", letterSpacing: "-0.02em", marginBottom: "0.6rem",
            }}>
              Selected work
              <br />
              <span style={{ color: "var(--accent-secondary)", fontWeight: 700, letterSpacing: "-0.01em" }}>
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


