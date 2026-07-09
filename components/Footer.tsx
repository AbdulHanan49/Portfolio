"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiHeart, FiArrowUp } from "react-icons/fi";

const footerLinks = [
  { icon: FiGithub, href: "https://github.com/AbdulHanan49", label: "GitHub" },
  { icon: FiLinkedin, href: "https://linkedin.com/in/hanan-aslam-b6160723a", label: "LinkedIn" },
  { icon: FiMail, href: "mailto:hananaslam90@gmail.com", label: "Email" },
];

const footerColumns = [
  {
    title: "Navigation",
    links: [
      { label: "Home",       href: "#home"       },
      { label: "About",      href: "#about"      },
      { label: "Skills",     href: "#skills"     },
      { label: "Experience", href: "#experience" },
      { label: "Projects",   href: "#projects"   },
      { label: "Contact",    href: "#contact"    },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Email Me", href: "mailto:hananaslam90@gmail.com" },
      { label: "LinkedIn", href: "https://linkedin.com/in/hanan-aslam-b6160723a" },
      { label: "GitHub",   href: "https://github.com/AbdulHanan49" },
      { label: "Resume",   href: "/resume.pdf" },
    ],
  },
];

export default function Footer() {
  // Generate bubbles client-only to avoid hydration mismatch
  const [bubbles, setBubbles] = useState<
    { id: number; size: string; distance: string; position: string; time: string; delay: string }[]
  >([]);

  useEffect(() => {
    // Fewer bubbles on mobile/iOS — 80 animated divs tank older devices
    const count = window.innerWidth < 768 ? 24 : 80;
    setBubbles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        size: `${2 + Math.random() * 5}rem`,
        distance: `${8 + Math.random() * 6}rem`,
        position: `${-5 + Math.random() * 110}%`,
        time: `${2 + Math.random() * 2}s`,
        delay: `${-1 * (2 + Math.random() * 2)}s`,
      }))
    );
  }, []);

  return (
    <footer className="footer-wrapper">
      {/* SVG filter for blob effect — absolutely off-screen, avoids iOS fixed+100vh quirk */}
      <svg
        style={{ position: "absolute", left: "-9999px", width: 0, height: 0, overflow: "hidden" }}
        aria-hidden="true"
      >
        <defs>
          <filter id="blob">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="blob"
            />
          </filter>
        </defs>
      </svg>

      {/* Bubbles */}
      <div className="footer-bubbles" aria-hidden="true">
        {bubbles.map((b) => (
          <div
            key={b.id}
            className="footer-bubble"
            style={
              {
                "--size": b.size,
                "--distance": b.distance,
                "--position": b.position,
                "--time": b.time,
                "--delay": b.delay,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* Footer content */}
      <div className="footer-content">
        <div className="max-w-[1200px] mx-auto px-6 py-20">
          <div className="footer-col-grid grid grid-cols-1 md:grid-cols-10 gap-10">
            {/* Brand column */}
            <motion.div
              className="md:col-span-5"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.a
                href="#home"
                className="flex items-center gap-0.5 text-xl no-underline mb-4"
                style={{ fontFamily: "var(--font-space)" }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="text-2xl font-light" style={{ color: "var(--accent)" }}>
                  &lt;
                </span>
                <span className="font-bold" style={{ color: "var(--text-primary)" }}>AH</span>
                <span className="text-2xl font-light" style={{ color: "var(--accent)" }}>
                  /&gt;
                </span>
              </motion.a>
              <p className="text-sm leading-6 mb-6" style={{ color: "var(--text-muted)" }}>
                Full-Stack Software Engineer based in Lahore, Pakistan.
                Building scalable web products from frontend to backend.
              </p>
              <div className="flex gap-2.5">
                {footerLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="footer-social-icon"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <link.icon size={16} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Link columns */}
            {footerColumns.map((col, ci) => (
              <motion.div
                key={col.title}
                className="md:col-span-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + ci * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <h4 className="footer-col-title">{col.title}</h4>
                <ul className="space-y-2.5" style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {col.links.map((link, li) => (
                    <motion.li
                      key={link.label}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + ci * 0.08 + li * 0.06, duration: 0.35 }}
                    >
                      <a
                        href={link.href}
                        className="footer-link"
                        {...(link.href === "/resume.pdf"
                          ? {
                              onClick: (e: React.MouseEvent) => {
                                e.preventDefault();
                                fetch("/resume.pdf")
                                  .then(r => r.blob())
                                  .then(blob => {
                                    const url = URL.createObjectURL(blob);
                                    const a = document.createElement("a");
                                    a.href = url;
                                    a.download = "Hanan Resume.pdf";
                                    document.body.appendChild(a);
                                    a.click();
                                    document.body.removeChild(a);
                                    URL.revokeObjectURL(url);
                                  });
                              },
                            }
                          : !link.href.startsWith("#")
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Bottom bar */}
          <div
            className="mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3"
            style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
          >
            <p
              className="text-xs flex items-center gap-1"
              style={{ color: "rgba(255,255,255,0.4)" }}
              suppressHydrationWarning
            >
              &copy; {new Date().getFullYear()} Abdul Hanan. Built with{" "}
              <span style={{ display: "inline-flex", animation: "heartBeat 1.2s ease-in-out infinite" }}>
                <FiHeart size={10} style={{ color: "#64ffda" }} />
              </span>
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                Designed &amp; Developed by Me
              </p>
              <motion.a
                href="#home"
                aria-label="Back to top"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  width: "32px", height: "32px", borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.4)",
                  textDecoration: "none", flexShrink: 0,
                  transition: "color 0.2s, border-color 0.2s",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.color = "#64ffda";
                  el.style.borderColor = "rgba(100, 255, 218,0.35)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.color = "rgba(255,255,255,0.4)";
                  el.style.borderColor = "rgba(255,255,255,0.12)";
                }}
              >
                <FiArrowUp size={14} />
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

