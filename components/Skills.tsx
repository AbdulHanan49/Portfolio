"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import {
  SiReact, SiTypescript, SiJavascript, SiNodedotjs,
  SiExpress, SiMongodb, SiPostgresql, SiGit, SiDocker,
  SiTailwindcss, SiPython, SiVuedotjs, SiFastapi, SiDjango,
  SiStripe, SiGithubactions, SiMysql, SiGooglegemini,
} from "react-icons/si";
import { FiCloud, FiX } from "react-icons/fi";

interface Skill {
  name: string; icon: React.ReactNode; color: string;
  level: "Expert" | "Advanced" | "Intermediate";
  experience: string; description: string; tools: string[];
}

const levelMeta: Record<string, { color: string; width: string }> = {
  Expert:       { color: "#7856FF", width: "92%" },
  Advanced:     { color: "#3178c6", width: "72%" },
  Intermediate: { color: "#00FFB2", width: "48%" },
};

const columns: { title: string; accent: string; number: string; skills: Skill[] }[] = [
  {
    title: "Frontend",
    number: "01",
    accent: "#7856FF",
    skills: [
      { name: "React 18",     icon: <SiReact />,       color: "#61dafb", level: "Expert",       experience: "1+ yr",  description: "Production SaaS with 70+ custom hooks, TanStack Query v5, Zustand + Zundo, React Hook Form, i18next, PWA.",  tools: ["TanStack Query","Zustand","React Hook Form","i18next"] },
      { name: "TypeScript",   icon: <SiTypescript />,  color: "#3178c6", level: "Expert",       experience: "1+ yr",  description: "Type-safe production code with generics, utility types, Pydantic-style validation, strict config.",           tools: ["Generics","Type Guards","Utility Types","Zod"] },
      { name: "JavaScript",   icon: <SiJavascript />,  color: "#f7df1e", level: "Expert",       experience: "2+ yrs", description: "ES6+, async patterns, closures, DOM APIs — used daily across every project.",                               tools: ["ES6+","Promises","Web APIs","Async/Await"] },
      { name: "Vue 3",        icon: <SiVuedotjs />,    color: "#42b883", level: "Advanced",     experience: "6 mo",   description: "Rebuilt Job Wallet frontend at Visnext — Vue 3 Composition API with Quasar Framework, Pinia state management, and Tailwind CSS across 10+ feature screens.",                tools: ["Composition API","Quasar Framework","Pinia","Tailwind CSS"] },
      { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "#06b6d4", level: "Expert",       experience: "1+ yr",  description: "Utility-first styling with Tailwind CSS 4, custom design systems, animations, responsive layouts.",          tools: ["CSS 4","Custom Themes","Animations","Dark Mode"] },
    ],
  },
  {
    title: "Backend",
    number: "02",
    accent: "#3178c6",
    skills: [
      { name: "FastAPI",     icon: <SiFastapi />,    color: "#009688", level: "Expert",        experience: "1 yr",   description: "Primary backend at KCube — Pydantic v2, SQLModel, Alembic migrations, async endpoints, JWT + OAuth.",     tools: ["Pydantic v2","SQLModel","Alembic","Async Routes"] },
      { name: "PostgreSQL",  icon: <SiPostgresql />, color: "#4169e1", level: "Advanced",      experience: "1+ yr",  description: "Relational data modelling, complex queries, Alembic migrations, SQLAlchemy 2, query optimisation.",        tools: ["SQLAlchemy 2","Alembic","Migrations","Transactions"] },
      { name: "Python",      icon: <SiPython />,     color: "#3776ab", level: "Advanced",      experience: "2+ yrs", description: "Primary backend language — FastAPI at KCube for MixClip and Django REST at Visnext for Job Wallet. OpenCV + Matplotlib for image processing projects.",    tools: ["FastAPI","Django REST","OpenCV","Pydantic"] },
      { name: "Node.js",     icon: <SiNodedotjs />,  color: "#68a063", level: "Advanced",      experience: "1+ yr",  description: "Express REST APIs and a dedicated Remotion video-rendering microservice at KCube.",                        tools: ["Remotion","Express","REST APIs","Microservices"] },
      { name: "Express.js",  icon: <SiExpress />,    color: "#c0c0c0", level: "Advanced",      experience: "1+ yr",  description: "Middleware patterns, routing, JWT auth, structured API contracts, validation.",                           tools: ["Middleware","JWT Auth","Rate Limiting","Validation"] },
      { name: "Django REST", icon: <SiDjango />,     color: "#44b78b", level: "Advanced",      experience: "6 mo",   description: "Built 10+ resource APIs at Visnext — DRF serializers, viewsets, JWT + RBAC, Django ORM N+1 optimisation, Celery + Redis async tasks.",                      tools: ["Serializers","Viewsets","RBAC","Celery + Redis"] },
      { name: "MySQL",       icon: <SiMysql />,      color: "#4479a1", level: "Advanced",      experience: "6 mo",   description: "Production database at Visnext for Job Wallet — schema design, N+1 query elimination via Django ORM select_related / prefetch_related, index-level query optimisation.",      tools: ["Django ORM","select_related","Indexes","Migrations"] },
    ],
  },
  {
    title: "DevOps & Tools",
    number: "03",
    accent: "#00FFB2",
    skills: [
      { name: "Docker",     icon: <SiDocker />,        color: "#2496ed", level: "Advanced",     experience: "1+ yr",  description: "Multi-stage builds, Docker Compose, containerised micro-services — used in production Azure deployments.",  tools: ["Multi-stage","Compose","Azure ACR","Networks"] },
      { name: "GH Actions", icon: <SiGithubactions />, color: "#2088ff", level: "Advanced",     experience: "1 yr",   description: "Automated CI/CD: build → test → push to Azure Container Registry → deploy to Azure Container Apps.",         tools: ["CI Pipelines","Docker Build","Release Gates","Env Secrets"] },
      { name: "Azure",      icon: <FiCloud />,         color: "#0078d4", level: "Advanced",     experience: "1 yr",   description: "Azure Container Apps, Container Registry, Blob & Queue Storage, Cognitive Services Speech SDK.",            tools: ["Container Apps","Blob Storage","ACR","Speech SDK"] },
      { name: "Stripe API", icon: <SiStripe />,        color: "#635bff", level: "Advanced",     experience: "1 yr",   description: "Production billing at both KCube and Visnext — subscriptions, 17+ currencies, webhooks, trial lifecycle.",  tools: ["Subscriptions","Webhooks","Multi-currency","Trials"] },
      { name: "Git",        icon: <SiGit />,           color: "#f05032", level: "Expert",       experience: "3+ yrs", description: "Branching strategies, rebasing, conflict resolution, CI workflow hooks.",                                    tools: ["GitHub Actions","Git Flow","Rebasing","Hooks"] },
      { name: "MongoDB",    icon: <SiMongodb />,       color: "#47a248", level: "Intermediate",  experience: "1 yr",  description: "Schema design, aggregation pipelines, Mongoose ODM — used in MERN-stack side projects.",                   tools: ["Mongoose","Aggregation","Atlas","Indexing"] },
      { name: "Gemini AI",  icon: <SiGooglegemini />,  color: "#4285f4", level: "Intermediate",  experience: "< 1 yr", description: "Google Gemini AI API integrated into MixClip at KCube — content assistance for script writing and AI-generated video metadata generation.",              tools: ["Gemini API","Prompt Engineering","Content Gen","REST"] },
    ],
  },
];

/* ── Skill Row ── */
function SkillRow({ skill, delay, catAccent, isOpen, onOpen, onClose }: {
  skill: Skill; delay: number; catAccent: string;
  isOpen: boolean; onOpen: () => void; onClose: () => void;
}) {
  const meta = levelMeta[skill.level];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ x: 3 }}
        onClick={onOpen}
        tabIndex={0}
        role="button"
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen(); } }}
        style={{
          display: "flex", alignItems: "center", gap: "0.65rem",
          padding: "0.6rem 0.75rem",
          borderRadius: 10,
          background: `color-mix(in srgb, ${skill.color} 4%, var(--card-bg))`,
          border: `1px solid color-mix(in srgb, ${skill.color} 14%, var(--border))`,
          cursor: "pointer", outline: "none",
          transition: "border-color .2s, background .2s",
        }}
      >
        {/* Icon */}
        <div style={{
          width: 34, height: 34, borderRadius: 8, flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "1.1rem", color: skill.color,
          background: `${skill.color}14`, border: `1px solid ${skill.color}25`,
        }}>
          {skill.icon}
        </div>

        {/* Name + bar */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.28rem" }}>
            <span style={{
              fontFamily: "var(--font-space)", fontSize: "0.8rem", fontWeight: 700,
              color: "var(--text-primary)", lineHeight: 1,
            }}>
              {skill.name}
            </span>
            <span style={{
              fontFamily: "var(--font-fira)", fontSize: "0.56rem", fontWeight: 700,
              color: meta.color, background: `${meta.color}12`,
              padding: "0.1rem 0.42rem", borderRadius: 999,
              border: `1px solid ${meta.color}28`, flexShrink: 0,
            }}>
              {skill.level}
            </span>
          </div>
          <div style={{ height: 3, borderRadius: 999, background: `${skill.color}14`, overflow: "hidden" }}>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: meta.width }}
              viewport={{ once: true }}
              transition={{ delay: delay + 0.18, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              style={{
                height: "100%", borderRadius: 999,
                background: `linear-gradient(90deg, ${meta.color}, ${skill.color})`,
              }}
            />
          </div>
        </div>
      </motion.div>

      {/* Detail modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1001] flex items-center justify-center p-4"
            style={{ background: "rgba(6,5,20,0.85)", backdropFilter: "blur(12px)" }}
            onClick={onClose}
            onKeyDown={(e) => { if (e.key === "Escape") onClose(); }}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 24 }}
              transition={{ type: "spring", damping: 26, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative", maxWidth: 460, width: "100%",
                padding: "2rem", borderRadius: 22,
                background: `color-mix(in srgb, ${skill.color} 6%, var(--card-bg))`,
                border: `1.5px solid ${skill.color}40`,
                boxShadow: `0 28px 72px rgba(0,0,0,0.6), 0 0 0 1px ${skill.color}18`,
              }}
            >
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 3,
                borderRadius: "22px 22px 0 0",
                background: `linear-gradient(to right, ${skill.color}, ${catAccent}80, transparent)`,
              }} />
              <button
                onClick={onClose}
                style={{
                  position: "absolute", top: "1rem", right: "1rem",
                  width: 30, height: 30, borderRadius: 8,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "var(--bg-tertiary)", color: "var(--text-muted)",
                  border: "1px solid var(--border)", cursor: "pointer",
                }}
                aria-label="Close"
              >
                <FiX size={14} />
              </button>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.6rem", color: skill.color,
                  background: `${skill.color}18`, border: `1px solid ${skill.color}35`,
                }}>
                  {skill.icon}
                </div>
                <div>
                  <h3 style={{ fontFamily: "var(--font-space)", fontWeight: 800, fontSize: "1.2rem", color: "var(--text-primary)", marginBottom: "0.3rem" }}>
                    {skill.name}
                  </h3>
                  <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
                    <span style={{
                      fontFamily: "var(--font-fira)", fontSize: "0.6rem", fontWeight: 800,
                      textTransform: "uppercase", letterSpacing: "0.1em",
                      color: meta.color, background: `${meta.color}15`,
                      padding: "0.18rem 0.6rem", borderRadius: 999,
                      border: `1px solid ${meta.color}30`,
                    }}>
                      {skill.level}
                    </span>
                    <span style={{ fontFamily: "var(--font-fira)", fontSize: "0.68rem", color: "var(--text-muted)" }}>
                      {skill.experience}
                    </span>
                  </div>
                </div>
              </div>
              <div style={{ marginBottom: "1.25rem" }}>
                <div style={{ width: "100%", height: 5, borderRadius: 999, background: `${skill.color}15`, overflow: "hidden" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: meta.width }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{ height: "100%", borderRadius: 999, background: `linear-gradient(90deg, ${meta.color}, ${skill.color})`, boxShadow: `0 0 10px ${meta.color}80` }}
                  />
                </div>
              </div>
              <p style={{ fontFamily: "var(--font-sora)", fontSize: "0.86rem", color: "var(--text-secondary)", lineHeight: 1.85, marginBottom: "1.25rem" }}>
                {skill.description}
              </p>
              <p style={{ fontFamily: "var(--font-fira)", fontSize: "0.62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--text-muted)", marginBottom: "0.65rem" }}>
                Tools &amp; Concepts
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
                {skill.tools.map((t) => (
                  <span key={t} style={{
                    fontFamily: "var(--font-fira)", fontSize: "0.7rem", fontWeight: 600,
                    padding: "0.32rem 0.8rem", borderRadius: 10,
                    background: `${skill.color}12`, color: skill.color,
                    border: `1px solid ${skill.color}30`,
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Column ── */
function SkillColumn({ col, colIndex, activeSkill, onOpen, onClose }: {
  col: typeof columns[number]; colIndex: number;
  activeSkill: string | null; onOpen: (name: string) => void; onClose: () => void;
}) {
  return (
    <ScrollReveal delay={colIndex * 0.1}>
      <div style={{
        position: "relative",
        borderRadius: 18,
        padding: "1.5rem",
        background: `color-mix(in srgb, ${col.accent} 5%, var(--card-bg))`,
        border: `1px solid color-mix(in srgb, ${col.accent} 18%, var(--border))`,
        overflow: "hidden",
        height: "100%",
      }}>
        {/* Top accent bar */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 2, borderRadius: "18px 18px 0 0",
          background: `linear-gradient(to right, ${col.accent}, transparent)`,
        }} />

        {/* Left accent bar */}
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: 3, borderRadius: "18px 0 0 18px",
          background: `linear-gradient(to bottom, ${col.accent}, transparent)`,
        }} />

        {/* Column header */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "1.1rem" }}>
          <span style={{
            fontFamily: "var(--font-fira)", fontSize: "0.58rem", fontWeight: 800,
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: col.accent,
            background: `color-mix(in srgb, ${col.accent} 14%, transparent)`,
            border: `1px solid color-mix(in srgb, ${col.accent} 28%, transparent)`,
            padding: "0.2rem 0.55rem", borderRadius: 7,
          }}>
            {col.number}
          </span>
          <h3 style={{
            fontFamily: "var(--font-space)", fontWeight: 800,
            fontSize: "1rem", color: "var(--text-primary)", margin: 0,
          }}>
            {col.title}
          </h3>
          <span style={{
            fontFamily: "var(--font-fira)", fontSize: "0.58rem",
            color: "var(--text-muted)", marginLeft: "auto",
          }}>
            {col.skills.length} skills
          </span>
        </div>

        {/* Skill rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
          {col.skills.map((skill, si) => (
            <SkillRow
              key={skill.name}
              skill={skill}
              delay={colIndex * 0.06 + si * 0.05}
              catAccent={col.accent}
              isOpen={activeSkill === skill.name}
              onOpen={() => onOpen(skill.name)}
              onClose={onClose}
            />
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}

/* ── Section ── */
export default function Skills() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const close = useCallback(() => setActiveSkill(null), []);

  useEffect(() => {
    if (!activeSkill) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    const onHash = () => close();
    window.addEventListener("keydown", onKey);
    window.addEventListener("hashchange", onHash);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("hashchange", onHash);
    };
  }, [activeSkill, close]);

  return (
    <section
      id="skills"
      style={{
        padding: "5rem 0",
        background: "var(--bg-primary)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background dot-grid */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, rgba(120,86,255,0.07) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        mask: "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 80%)",
        WebkitMask: "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 80%)",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem", position: "relative", zIndex: 1 }}>

        {/* Section header */}
        <ScrollReveal>
          <div style={{ marginBottom: "2.5rem" }}>
            <p style={{
              fontFamily: "var(--font-fira)", fontSize: "0.65rem", fontWeight: 700,
              color: "var(--accent)", textTransform: "uppercase",
              letterSpacing: "0.28em", marginBottom: "0.6rem",
            }}>
              02 — Skills
            </p>
            <h2 style={{
              fontFamily: "var(--font-space)", fontWeight: 900,
              fontSize: "clamp(2rem, 4vw, 3.4rem)", lineHeight: 1.05,
              color: "var(--text-primary)", letterSpacing: "-0.02em",
            }}>
              Tech stack &amp;<br />
              <span style={{ color: "var(--accent-secondary)" }}>expertise</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Three-column grid */}
        <div className="skills-grid-responsive" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
          gap: "1.25rem",
          alignItems: "stretch",
        }}>
          {columns.map((col, ci) => (
            <SkillColumn
              key={col.title}
              col={col}
              colIndex={ci}
              activeSkill={activeSkill}
              onOpen={setActiveSkill}
              onClose={close}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
