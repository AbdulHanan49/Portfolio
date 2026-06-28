"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiHeart } from "react-icons/fi";

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
      { label: "Games",      href: "#games"      },
      { label: "Contact",    href: "#contact"    },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Email Me", href: "mailto:hananaslam90@gmail.com" },
      { label: "LinkedIn", href: "https://linkedin.com/in/hanan-aslam-b6160723a" },
      { label: "GitHub",   href: "https://github.com/AbdulHanan49" },
    ],
  },
];

export default function Footer() {
  // Generate bubbles client-only to avoid hydration mismatch
  const [bubbles, setBubbles] = useState<
    { id: number; size: string; distance: string; position: string; time: string; delay: string }[]
  >([]);

  useEffect(() => {
    setBubbles(
      Array.from({ length: 80 }, (_, i) => ({
        id: i,
        size: `${2 + Math.random() * 4}rem`,
        distance: `${6 + Math.random() * 4}rem`,
        position: `${-5 + Math.random() * 110}%`,
        time: `${2 + Math.random() * 2}s`,
        delay: `${-1 * (2 + Math.random() * 2)}s`,
      }))
    );
  }, []);

  return (
    <footer className="footer-wrapper">
      {/* SVG filter for blob effect */}
      <svg
        style={{ position: "fixed", top: "100vh", width: 0, height: 0 }}
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
        <div className="max-w-[1200px] mx-auto px-6 py-12">
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
                <span className="text-2xl font-light" style={{ color: "#00FFB2" }}>
                  &lt;
                </span>
                <span className="font-bold text-white">AH</span>
                <span className="text-2xl font-light" style={{ color: "#00FFB2" }}>
                  /&gt;
                </span>
              </motion.a>
              <p className="text-sm leading-6 mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
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
                    whileHover={{ scale: 1.15, y: -3, boxShadow: "0 6px 20px rgba(0,255,178,0.28)" }}
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
                        {...(!link.href.startsWith("#") && {
                          target: "_blank",
                          rel: "noopener noreferrer",
                        })}
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
            className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
            style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
          >
            <p
              className="text-xs flex items-center gap-1"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              &copy; {new Date().getFullYear()} Abdul Hanan. Built with{" "}
              <span style={{ display: "inline-flex", animation: "heartBeat 1.2s ease-in-out infinite" }}>
                <FiHeart size={10} style={{ color: "#00FFB2" }} />
              </span>
            </p>
            <p
              className="text-xs"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Designed & Developed by Me
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
