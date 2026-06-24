"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  SiReact, SiTypescript, SiJavascript, SiNodedotjs,
  SiMongodb, SiPostgresql, SiTailwindcss, SiDocker, SiGit,
  SiPython, SiExpress, SiFastapi, SiVuedotjs, SiDjango,
  SiStripe, SiGithubactions,
} from "react-icons/si";
import { FiCloud } from "react-icons/fi";

interface TechItem { name: string; icon: React.ReactNode; color: string }

const row1: TechItem[] = [
  { name: "React 18",    icon: <SiReact />,        color: "#61dafb" },
  { name: "TypeScript",  icon: <SiTypescript />,   color: "#3178c6" },
  { name: "FastAPI",     icon: <SiFastapi />,      color: "#009688" },
  { name: "Python",      icon: <SiPython />,       color: "#3776ab" },
  { name: "Node.js",     icon: <SiNodedotjs />,    color: "#68a063" },
  { name: "PostgreSQL",  icon: <SiPostgresql />,   color: "#4169e1" },
  { name: "Docker",      icon: <SiDocker />,       color: "#2496ed" },
  { name: "Vue 3",       icon: <SiVuedotjs />,     color: "#42b883" },
];

const row2: TechItem[] = [
  { name: "MongoDB",        icon: <SiMongodb />,       color: "#47a248" },
  { name: "Express.js",     icon: <SiExpress />,       color: "#ffffff" },
  { name: "Django REST",    icon: <SiDjango />,        color: "#44b78b" },
  { name: "GitHub Actions", icon: <SiGithubactions />, color: "#2088ff" },
  { name: "Stripe",         icon: <SiStripe />,        color: "#635bff" },
  { name: "Azure",          icon: <FiCloud />,         color: "#0078d4" },
  { name: "Git",            icon: <SiGit />,           color: "#f05032" },
  { name: "Tailwind CSS",   icon: <SiTailwindcss />,   color: "#06b6d4" },
  { name: "JavaScript",     icon: <SiJavascript />,    color: "#f7df1e" },
];

function MarqueeItem({ item }: { item: TechItem }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="marquee__item"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{
        scale: hovered ? 1.12 : 1,
        y: hovered ? -4 : 0,
        boxShadow: hovered
          ? `0 8px 28px ${item.color}30`
          : "0 0 0 transparent",
        borderColor: hovered
          ? `${item.color}55`
          : "var(--border)",
        background: hovered
          ? `${item.color}10`
          : "var(--bg-tertiary)",
      }}
      transition={{ type: "spring", stiffness: 420, damping: 22 }}
      style={{ cursor: "default" }}
    >
      <motion.span
        className="marquee__icon"
        animate={{
          color: hovered ? item.color : undefined,
          filter: hovered ? `drop-shadow(0 0 6px ${item.color})` : "none",
          scale: hovered ? 1.2 : 1,
        }}
        transition={{ duration: 0.22 }}
        style={{ color: item.color }}
      >
        {item.icon}
      </motion.span>
      <motion.span
        className="marquee__name"
        animate={{ color: hovered ? item.color : undefined }}
        transition={{ duration: 0.18 }}
      >
        {item.name}
      </motion.span>
    </motion.div>
  );
}

function MarqueeRow({ items, reverse = false }: { items: TechItem[]; reverse?: boolean }) {
  const allItems = [...items, ...items];

  return (
    <div className={`marquee ${reverse ? "marquee--reverse" : ""}`}>
      <div className="marquee__group">
        {allItems.map((item, i) => (
          <MarqueeItem key={`${item.name}-${i}`} item={item} />
        ))}
      </div>
      <div aria-hidden="true" className="marquee__group">
        {allItems.map((item, i) => (
          <MarqueeItem key={`${item.name}-dup-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function TechMarquee() {
  return (
    <div className="tech-marquee-section">
      <MarqueeRow items={row1} />
      <MarqueeRow items={row2} reverse />
    </div>
  );
}
