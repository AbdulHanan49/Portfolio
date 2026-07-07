"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSun, FiMoon, FiMenu, FiX, FiDownload, FiGithub, FiLinkedin } from "react-icons/fi";
import { useTheme } from "./ThemeProvider";

const NAV_ITEMS = [
  { label: "Home",       href: "#home"       },
  { label: "About",      href: "#about"      },
  { label: "Experience", href: "#experience" },
  { label: "Projects",   href: "#projects"   },
  { label: "Skills",     href: "#skills"     },
  { label: "Contact",    href: "#contact"    },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled,  setScrolled]  = useState(false);
  const [active,    setActive]    = useState("home");
  const [menuOpen,  setMenuOpen]  = useState(false);
  const dark = theme === "dark";
  const activeHrefRef = useRef("#home");

  useEffect(() => {
    // On mount: scroll to the hash if present (enables deep-linking)
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
      }, 120);
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const pos = window.scrollY + 200;
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const el = document.querySelector(NAV_ITEMS[i].href) as HTMLElement | null;
        if (el && el.offsetTop <= pos) {
          const href = NAV_ITEMS[i].href;
          setActive(href.slice(1));
          // Only call replaceState when the section actually changes — calling it
          // on every scroll event exceeds iOS Safari's 100-calls/30s limit and crashes.
          if (href !== activeHrefRef.current) {
            activeHrefRef.current = href;
            window.history.replaceState(null, "", href);
          }
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    setMenuOpen(false);
    // Update URL immediately on click
    window.history.pushState(null, "", href);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  /* Theme-aware pill colours */
  const pillBg     = dark
    ? scrolled ? "rgba(10,25,47,0.96)"       : "rgba(10,25,47,0.80)"
    : scrolled ? "rgba(244,244,244,0.96)"    : "rgba(244,244,244,0.80)";
  const pillBorder = dark
    ? scrolled ? "rgba(100,255,218,0.22)"     : "rgba(100,255,218,0.07)"
    : scrolled ? "rgba(46,46,46,0.18)"       : "rgba(46,46,46,0.10)";
  const pillShadow = scrolled
    ? dark
      ? "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(100,255,218,0.04)"
      : "0 8px 28px rgba(0,0,0,0.10)"
    : "none";

  const iconBtn = {
    width: 44, height: 44, borderRadius: 12,
    display: "flex" as const, alignItems: "center" as const, justifyContent: "center" as const,
    background: dark ? "rgba(100,255,218,0.07)"  : "rgba(46,46,46,0.07)",
    border: `1px solid ${dark ? "rgba(100,255,218,0.22)" : "rgba(46,46,46,0.30)"}`,
    color: dark ? "#ccd6f6" : "#2E2E2E",
    cursor: "pointer" as const,
  };

  return (
    <>
      {/* â•â•â•â•â•â•â•â•â•â•â•â• HEADER â•â•â•â•â•â•â•â•â•â•â•â• */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        paddingTop: `calc(${scrolled ? "0.85rem" : "1.25rem"} + env(safe-area-inset-top))`,
        paddingBottom: scrolled ? "0.85rem" : "1.25rem",
        paddingLeft: "1.5rem", paddingRight: "1.5rem",
        transition: "padding 0.35s ease",
        pointerEvents: "none",
      }}>
        {/* Universal backdrop — subtle at top, frosted glass once scrolled */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: scrolled
            ? dark ? "rgba(10,25,47,0.92)" : "rgba(244,244,244,0.92)"
            : dark ? "rgba(10,25,47,0.55)" : "rgba(244,244,244,0.55)",
          backdropFilter: "blur(20px) saturate(1.6)",
          WebkitBackdropFilter: "blur(20px) saturate(1.6)",
          borderBottom: `1px solid ${scrolled
            ? dark ? "rgba(100,255,218,0.08)" : "rgba(0,0,0,0.07)"
            : "transparent"}`,
          boxShadow: scrolled
            ? dark ? "0 4px 24px rgba(0,0,0,0.30)" : "0 4px 24px rgba(0,0,0,0.07)"
            : "none",
          transition: "background 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease",
        }} />
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          position: "relative",
        }}>

          {/* ── Logo ── */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); go("#home"); }}
            className="logo"
            style={{
              pointerEvents: "auto",
              display: "flex", alignItems: "center", gap: "0.2rem",
              fontFamily: "var(--font-space)", fontSize: "1.5rem",
              fontWeight: 700, textDecoration: "none",
            }}
          >
            <span className="logo-bracket" style={{ fontSize: "1.7rem" }}>&lt;</span>
            <span style={{ color: "var(--text-primary)" }}>AH</span>
            <span className="logo-bracket" style={{ fontSize: "1.7rem" }}>/&gt;</span>
          </a>

          {/* ── Desktop floating pill ── */}
          <nav
            className="hidden lg:flex"
            style={{
              pointerEvents: "auto",
              alignItems: "center",
              padding: "0.42rem",
              borderRadius: 999,
              background: pillBg,
              backdropFilter: "blur(22px) saturate(1.8)",
              WebkitBackdropFilter: "blur(22px) saturate(1.8)",
              border: `1px solid ${pillBorder}`,
              boxShadow: pillShadow,
              transition: "background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease",
            }}
          >
            {NAV_ITEMS.map(({ label, href }) => {
              const isActive = active === href.slice(1);
              return (
                <a
                  key={href}
                  href={href}
                  onClick={(e) => { e.preventDefault(); go(href); }}
                  onMouseEnter={(e) => {
                    if (!isActive)
                      (e.currentTarget as HTMLElement).style.background =
                        dark ? "rgba(100,255,218,0.08)" : "rgba(74,144,226,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive)
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                  }}
                  style={{
                    position: "relative",
                    display: "flex", alignItems: "center",
                    padding: "0.52rem 1.1rem",
                    borderRadius: 999,
                    fontFamily: "var(--font-fira)", fontSize: "0.82rem",
                    fontWeight: isActive ? 700 : 500,
                    letterSpacing: "0.04em",
                    color: isActive
                      ? dark ? "#ccd6f6" : "#2E2E2E"
                      : dark ? "rgba(189,195,199,0.70)" : "rgba(46,46,46,0.60)",
                    textDecoration: "none",
                    background: "transparent",
                    transition: "background 0.2s ease, color 0.2s ease",
                    zIndex: 1,
                    whiteSpace: "nowrap",
                  }}
                >
                  {/* Shared-layout active pill — slides between items */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      style={{
                        position: "absolute", inset: 0, borderRadius: 999,
                        background: dark ? "rgba(100,255,218,0.07)" : "rgba(74,144,226,0.10)",
                        border: `1px solid ${dark ? "rgba(100,255,218,0.22)" : "rgba(74,144,226,0.25)"}`,
                        zIndex: -1,
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 36 }}
                    />
                  )}
                  {label}
                </a>
              );
            })}
          </nav>

          {/* ── Controls ── */}
          <div style={{ pointerEvents: "auto", display: "flex", alignItems: "center", gap: "0.45rem" }}>

            {/* Resume — desktop only; mobile users get it inside the drawer */}
            <motion.a
              href="/resume.pdf"
              download="Hanan's Resume.pdf"
              className="hidden lg:flex"
              whileHover={{ y: -1.5 }}
              whileTap={{ scale: 0.95 }}
              style={{
                alignItems: "center", gap: "0.42rem",
                padding: "0.55rem 1.25rem",
                borderRadius: 12,
                background: dark ? "rgba(100,255,218,0.08)"  : "rgba(46,46,46,0.07)",
                border: `1px solid ${dark ? "rgba(100,255,218,0.25)" : "rgba(46,46,46,0.30)"}`,
                color: dark ? "#ccd6f6" : "#2E2E2E",
                fontFamily: "var(--font-fira)", fontSize: "0.76rem", fontWeight: 700,
                letterSpacing: "0.1em", textDecoration: "none",
              }}
            >
              <FiDownload size={14} />
              RESUME
            </motion.a>

            {/* Theme toggle */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.9 }}
              style={iconBtn}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={theme}
                  initial={{ rotate: -60, opacity: 0, scale: 0.55 }}
                  animate={{ rotate: 0,   opacity: 1, scale: 1    }}
                  exit={{   rotate:  60,  opacity: 0, scale: 0.55 }}
                  transition={{ duration: 0.17, ease: "easeOut" }}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            {/* Hamburger — inline display must not be set so md:hidden can work */}
            <motion.button
              onClick={() => setMenuOpen(v => !v)}
              className="flex lg:hidden"
              whileTap={{ scale: 0.9 }}
              style={{ ...iconBtn, display: undefined }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={menuOpen ? "x" : "menu"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0,   opacity: 1 }}
                  exit={{   rotate:  90,  opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  {menuOpen ? <FiX size={19} /> : <FiMenu size={19} />}
                </motion.span>
              </AnimatePresence>
            </motion.button>

          </div>
        </div>
      </header>

      {/* â•â•â•â•â•â•â•â•â•â•â•â• MOBILE DRAWER â•â•â•â•â•â•â•â•â•â•â•â• */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setMenuOpen(false)}
              style={{
                position: "fixed", inset: 0, zIndex: 998,
                background: "rgba(0,0,0,0.52)",
                backdropFilter: "blur(3px)",
              }}
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              style={{
                position: "fixed", top: 0, right: 0, bottom: 0,
                width: "min(280px, 88vw)", zIndex: 999,
                background: dark ? "#0d1f38" : "#f8f9fa",
                borderLeft: `1px solid ${dark ? "rgba(100,255,218,0.10)" : "rgba(0,0,0,0.08)"}`,
                display: "flex", flexDirection: "column",
                overflow: "hidden",
              }}
            >
              {/* Identity header */}
              <div style={{
                padding: "calc(2rem + env(safe-area-inset-top)) 1.5rem 1.5rem",
                borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
              }}>
                {/* Close button */}
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1.5rem" }}>
                  <motion.button
                    onClick={() => setMenuOpen(false)}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      width: 36, height: 36, borderRadius: 8,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
                      border: "none", color: dark ? "#8892b0" : "#6b7280", cursor: "pointer",
                    }}
                    aria-label="Close menu"
                  >
                    <FiX size={18} />
                  </motion.button>
                </div>

                {/* Monogram + name + role */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: dark ? "rgba(100,255,218,0.08)" : "rgba(37,99,235,0.08)",
                    border: `1.5px solid ${dark ? "rgba(100,255,218,0.20)" : "rgba(37,99,235,0.20)"}`,
                    fontFamily: "var(--font-space)", fontWeight: 700, fontSize: "1rem",
                    color: "var(--accent)",
                  }}>
                    AH
                  </div>
                  <div>
                    <div style={{
                      fontFamily: "var(--font-space)", fontWeight: 700, fontSize: "0.9rem",
                      color: dark ? "#ccd6f6" : "#1e293b", lineHeight: 1.2,
                    }}>
                      Abdul Hanan
                    </div>
                    <div style={{
                      fontFamily: "var(--font-sora)", fontSize: "0.72rem",
                      color: dark ? "#8892b0" : "#64748b", marginTop: "0.15rem",
                    }}>
                      Full-Stack Engineer
                    </div>
                  </div>
                </div>
              </div>

              {/* Nav links */}
              <nav style={{ flex: 1, padding: "1rem 0.75rem", display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                {NAV_ITEMS.map(({ label, href }, i) => {
                  const isActive = active === href.slice(1);
                  return (
                    <motion.a
                      key={href}
                      href={href}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.045, ease: [0.16, 1, 0.3, 1], duration: 0.28 }}
                      onClick={(e) => { e.preventDefault(); go(href); }}
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "0.78rem 0.85rem",
                        borderRadius: 10,
                        background: isActive
                          ? dark ? "rgba(100,255,218,0.08)" : "rgba(37,99,235,0.07)"
                          : "transparent",
                        fontFamily: "var(--font-space)", fontWeight: isActive ? 700 : 500,
                        fontSize: "0.95rem",
                        color: isActive
                          ? dark ? "#ccd6f6" : "#1e293b"
                          : dark ? "rgba(136,146,176,0.80)" : "rgba(71,85,105,0.80)",
                        textDecoration: "none",
                        transition: "background 0.18s, color 0.18s",
                        letterSpacing: "0.01em",
                      }}
                    >
                      {label}
                      {isActive && (
                        <span style={{
                          width: 6, height: 6, borderRadius: "50%",
                          background: "var(--accent)",
                        }} />
                      )}
                    </motion.a>
                  );
                })}
              </nav>

              {/* Footer — resume + socials */}
              <div style={{
                padding: "1rem 1.5rem 2rem",
                borderTop: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
                display: "flex", flexDirection: "column", gap: "0.875rem",
              }}>
                <motion.a
                  href="/resume.pdf"
                  download="Hanan's Resume.pdf"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: NAV_ITEMS.length * 0.045 + 0.06, duration: 0.28 }}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                    padding: "0.72rem",
                    borderRadius: 10,
                    background: dark ? "rgba(100,255,218,0.10)" : "rgba(37,99,235,0.09)",
                    border: `1px solid ${dark ? "rgba(100,255,218,0.22)" : "rgba(37,99,235,0.22)"}`,
                    fontFamily: "var(--font-fira)", fontWeight: 700,
                    fontSize: "0.72rem", letterSpacing: "0.1em",
                    color: dark ? "#64ffda" : "#2563EB",
                    textDecoration: "none",
                  }}
                >
                  <FiDownload size={13} />
                  DOWNLOAD RESUME
                </motion.a>

                <div style={{ display: "flex", gap: "0.5rem" }}>
                  {[
                    { href: "https://github.com/AbdulHanan49", icon: <FiGithub size={16} />, label: "GitHub" },
                    { href: "https://linkedin.com/in/hanan-aslam-dev", icon: <FiLinkedin size={16} />, label: "LinkedIn" },
                  ].map(({ href, icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      style={{
                        flex: 1, height: 38, borderRadius: 9,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                        border: `1px solid ${dark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.08)"}`,
                        color: dark ? "#8892b0" : "#64748b",
                        textDecoration: "none",
                      }}
                    >
                      {icon}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}



