"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSun, FiMoon, FiMenu, FiX, FiDownload } from "react-icons/fi";
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
          const id = NAV_ITEMS[i].href.slice(1);
          setActive(id);
          // Keep URL in sync as user scrolls
          window.history.replaceState(null, "", NAV_ITEMS[i].href);
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
  const pillBg = dark
    ? scrolled ? "rgba(11,8,18,0.88)"     : "rgba(11,8,18,0.62)"
    : scrolled ? "rgba(250,250,248,0.92)" : "rgba(250,250,248,0.74)";
  const pillBorder = dark
    ? scrolled ? "rgba(120,86,255,0.28)"  : "rgba(120,86,255,0.14)"
    : scrolled ? "rgba(120,86,255,0.22)"  : "rgba(120,86,255,0.12)";
  const pillShadow = scrolled
    ? dark
      ? "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(155,121,255,0.05)"
      : "0 8px 28px rgba(0,0,0,0.10), inset 0 1px 0 rgba(120,86,255,0.06)"
    : "none";

  const iconBtn = {
    width: 44, height: 44, borderRadius: 12,
    display: "flex" as const, alignItems: "center" as const, justifyContent: "center" as const,
    background: dark ? "rgba(120,86,255,0.09)" : "rgba(120,86,255,0.07)",
    border: `1px solid ${dark ? "rgba(120,86,255,0.22)" : "rgba(120,86,255,0.18)"}`,
    color: dark ? "rgba(155,121,255,0.82)" : "#562abd",
    cursor: "pointer" as const,
  };

  return (
    <>
      {/* ════════════ HEADER ════════════ */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        padding: scrolled ? "0.85rem 1.5rem" : "1.25rem 1.5rem",
        transition: "padding 0.35s ease",
        pointerEvents: "none",   /* click-through on empty space */
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          display: "flex", alignItems: "center", justifyContent: "space-between",
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
                        dark ? "rgba(120,86,255,0.10)" : "rgba(120,86,255,0.07)";
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
                      ? dark ? "#DDD6FE" : "#562abd"
                      : dark ? "rgba(155,121,255,0.5)" : "rgba(86,42,189,0.5)",
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
                        background: dark
                          ? "rgba(120,86,255,0.22)"
                          : "rgba(120,86,255,0.11)",
                        border: `1px solid ${dark
                          ? "rgba(155,121,255,0.28)"
                          : "rgba(120,86,255,0.22)"}`,
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
                background: dark ? "rgba(120,86,255,0.12)" : "rgba(120,86,255,0.08)",
                border: `1px solid ${dark ? "rgba(120,86,255,0.30)" : "rgba(120,86,255,0.20)"}`,
                color: dark ? "#C4B5FD" : "#562abd",
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

      {/* ════════════ MOBILE DRAWER ════════════ */}
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
              transition={{ type: "spring", stiffness: 320, damping: 35 }}
              style={{
                position: "fixed", top: 0, right: 0, bottom: 0,
                width: "min(260px, 85vw)", zIndex: 999,
                background: dark
                  ? "rgba(11,8,18,0.97)"
                  : "rgba(250,250,248,0.97)",
                backdropFilter: "blur(24px)",
                borderLeft: `1px solid ${dark
                  ? "rgba(120,86,255,0.18)"
                  : "rgba(120,86,255,0.13)"}`,
                display: "flex", flexDirection: "column",
                padding: "5.5rem 1.25rem 2rem",
                gap: "0.3rem",
              }}
            >
              {/* Top accent line */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 2,
                background: "linear-gradient(to right, transparent, rgba(120,86,255,0.7), transparent)",
              }} />

              {NAV_ITEMS.map(({ label, href }, i) => {
                const isActive = active === href.slice(1);
                return (
                  <motion.a
                    key={href}
                    href={href}
                    initial={{ opacity: 0, x: 28 }}
                    animate={{ opacity: 1, x: 0  }}
                    transition={{ delay: i * 0.055, ease: [0.16, 1, 0.3, 1], duration: 0.3 }}
                    onClick={(e) => { e.preventDefault(); go(href); }}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "0.72rem 0.85rem",
                      borderRadius: 10,
                      background: isActive
                        ? dark ? "rgba(120,86,255,0.14)" : "rgba(120,86,255,0.08)"
                        : "transparent",
                      border: `1px solid ${isActive
                        ? dark ? "rgba(120,86,255,0.28)" : "rgba(120,86,255,0.18)"
                        : "transparent"}`,
                      fontFamily: "var(--font-space)", fontWeight: 700,
                      fontSize: "0.88rem", letterSpacing: "0.03em",
                      color: isActive
                        ? dark ? "#C4B5FD" : "#562abd"
                        : dark ? "rgba(155,121,255,0.48)" : "rgba(86,42,189,0.48)",
                      textDecoration: "none",
                      transition: "background 0.2s, border-color 0.2s, color 0.2s",
                    }}
                  >
                    {label}
                    {isActive && (
                      <span style={{
                        width: 5, height: 5, borderRadius: "50%",
                        background: "#562abd",
                        boxShadow: "0 0 8px rgba(120,86,255,0.85)",
                      }} />
                    )}
                  </motion.a>
                );
              })}

              {/* Resume in drawer */}
              <motion.a
                href="/resume.pdf"
                download="Hanan's Resume.pdf"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0  }}
                transition={{ delay: NAV_ITEMS.length * 0.055 + 0.08, duration: 0.3 }}
                style={{
                  marginTop: "1.1rem",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "0.45rem",
                  padding: "0.7rem",
                  borderRadius: 10,
                  background: dark ? "rgba(120,86,255,0.16)" : "rgba(120,86,255,0.09)",
                  border: `1px solid ${dark ? "rgba(120,86,255,0.35)" : "rgba(120,86,255,0.22)"}`,
                  fontFamily: "var(--font-fira)", fontWeight: 700,
                  fontSize: "0.7rem", letterSpacing: "0.1em",
                  color: dark ? "#C4B5FD" : "#562abd",
                  textDecoration: "none",
                }}
              >
                <FiDownload size={12} />
                DOWNLOAD RESUME
              </motion.a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
