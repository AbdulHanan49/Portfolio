"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { FiSend, FiGithub, FiLinkedin, FiMail, FiCheck } from "react-icons/fi";

const socials = [
  { icon: FiGithub,   href: "https://github.com/AbdulHanan49",              label: "GitHub"   },
  { icon: FiLinkedin, href: "https://linkedin.com/in/hanan-aslam-b6160723a", label: "LinkedIn" },
  { icon: FiMail,     href: "mailto:hananaslam90@gmail.com",                 label: "Email"    },
];

const FIELDS = [
  { id: "name",    label: "Name",    type: "text",  placeholder: "John Doe",                col: "half"  },
  { id: "email",   label: "Email",   type: "email", placeholder: "john@example.com",         col: "half"  },
  { id: "subject", label: "Subject", type: "text",  placeholder: "Project discussion",       col: "full"  },
  { id: "message", label: "Message", type: "area",  placeholder: "Tell me about your project...", col: "full" },
] as const;

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [focused,  setFocused]  = useState<string | null>(null);
  const [sent,     setSent]     = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section
      id="contact"
      className="py-20 relative overflow-hidden"
      style={{ background: "var(--bg-secondary)" }}
    >
      {/* Background dot grid */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, rgba(86,42,189,0.07) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        mask: "radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 80%)",
        WebkitMask: "radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 80%)",
      }} />

      {/* ── Animated ambient orbs ── */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.28, 0.40, 0.28] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 right-0 w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(86,42,189,0.35) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        aria-hidden="true"
      />
      <motion.div
        animate={{ scale: [1, 1.14, 1], opacity: [0.20, 0.30, 0.20] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
        className="absolute top-0 left-0 w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(33,12,110,0.50) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        aria-hidden="true"
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.12, 0.22, 0.12] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute top-1/2 right-0 w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,255,178,0.15) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">

        {/* Header */}
        <ScrollReveal>
          <div style={{ marginBottom: "2.5rem" }}>
            <p style={{
              fontFamily: "var(--font-fira)", fontSize: "0.65rem", fontWeight: 700,
              color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.28em",
              marginBottom: "0.75rem",
            }}>
              05 — Contact
            </p>
            <h2 style={{
              fontFamily: "var(--font-space)", fontWeight: 900,
              fontSize: "clamp(2rem, 4vw, 3.4rem)", lineHeight: 1.05,
              color: "var(--text-primary)", letterSpacing: "-0.02em", marginBottom: "0.5rem",
            }}>
              Got a project?<br />
              <span style={{ color: "var(--accent-secondary)" }}>Let&apos;s talk</span>
            </h2>
            <p style={{ fontFamily: "var(--font-sora)", fontSize: "0.9rem", color: "var(--text-muted)", marginTop: "0.75rem" }}>
              Have an idea? I&apos;m available for freelance &amp; full-time roles.
            </p>
          </div>
        </ScrollReveal>

        {/* Big CTA heading */}
        <ScrollReveal delay={0.1}>
          <div className="mb-10">
            <h3 className="contact-big-heading">
              Let&apos;s build something
              <br />
              <span style={{ color: "var(--accent-secondary)" }}>great together</span>.
            </h3>
            <p className="contact-subtext">
              Got an idea? A vision? A wild project that needs a developer who actually cares?
              <br />
              I&apos;m all ears. Let&apos;s turn your concept into reality.
            </p>
          </div>
        </ScrollReveal>

        {/* Form area */}
        <ScrollReveal delay={0.15}>
          <div className="contact-form-wrapper">
            <div className="contact-form-glow" />

            <div className="contact-form-inner">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

                {/* Left — CTA column */}
                <div className="lg:col-span-2 flex flex-col justify-center">
                  <h4 className="contact-form-heading">Send me a message</h4>
                  <p className="contact-form-text">
                    Fill out the form and I&apos;ll get back to you within 24 hours.
                    Or reach out directly through any of the channels above.
                  </p>

                  {/* Social icons — animated */}
                  <div className="flex gap-2.5 mt-6">
                    {socials.map((s, i) => (
                      <motion.a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        whileHover={{ scale: 1.15, y: -4, boxShadow: "0 8px 24px rgba(120,86,255,0.3)" }}
                        whileTap={{ scale: 0.9 }}
                        className="social-icon"
                      >
                        <s.icon size={18} />
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Right — Form */}
                <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-4">

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <motion.div
                      className="contact-field-wrap"
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <label className="contact-label" htmlFor="name">Name</label>
                      <motion.div
                        animate={{
                          boxShadow: focused === "name"
                            ? "0 0 0 2px var(--accent), 0 0 20px var(--accent-glow)"
                            : "0 0 0 1px var(--border)",
                        }}
                        className="rounded-xl overflow-hidden"
                      >
                        <input
                          id="name" type="text" placeholder="John Doe" required
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          onFocus={() => setFocused("name")}
                          onBlur={() => setFocused(null)}
                          className="contact-input-v2"
                        />
                      </motion.div>
                    </motion.div>

                    {/* Email */}
                    <motion.div
                      className="contact-field-wrap"
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.16, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <label className="contact-label" htmlFor="email">Email</label>
                      <motion.div
                        animate={{
                          boxShadow: focused === "email"
                            ? "0 0 0 2px var(--accent), 0 0 20px var(--accent-glow)"
                            : "0 0 0 1px var(--border)",
                        }}
                        className="rounded-xl overflow-hidden"
                      >
                        <input
                          id="email" type="email" placeholder="john@example.com" required
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          onFocus={() => setFocused("email")}
                          onBlur={() => setFocused(null)}
                          className="contact-input-v2"
                        />
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Subject */}
                  <motion.div
                    className="contact-field-wrap"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.22, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <label className="contact-label" htmlFor="subject">Subject</label>
                    <motion.div
                      animate={{
                        boxShadow: focused === "subject"
                          ? "0 0 0 2px var(--accent), 0 0 20px var(--accent-glow)"
                          : "0 0 0 1px var(--border)",
                      }}
                      className="rounded-xl overflow-hidden"
                    >
                      <input
                        id="subject" type="text" placeholder="Project discussion" required
                        value={formData.subject}
                        onChange={e => setFormData({ ...formData, subject: e.target.value })}
                        onFocus={() => setFocused("subject")}
                        onBlur={() => setFocused(null)}
                        className="contact-input-v2"
                      />
                    </motion.div>
                  </motion.div>

                  {/* Message */}
                  <motion.div
                    className="contact-field-wrap"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.28, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <label className="contact-label" htmlFor="message">Message</label>
                    <motion.div
                      animate={{
                        boxShadow: focused === "message"
                          ? "0 0 0 2px var(--accent), 0 0 20px var(--accent-glow)"
                          : "0 0 0 1px var(--border)",
                      }}
                      className="rounded-xl overflow-hidden"
                    >
                      <textarea
                        id="message" placeholder="Tell me about your project..." required
                        rows={5}
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        onFocus={() => setFocused("message")}
                        onBlur={() => setFocused(null)}
                        className="contact-input-v2 resize-none"
                      />
                    </motion.div>
                  </motion.div>

                  {/* Submit button */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.34, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.03, y: -2, boxShadow: "0 12px 36px rgba(86,42,189,0.5), 0 0 0 1px rgba(120,86,255,0.4)" }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: "spring", stiffness: 400, damping: 18 }}
                      className="btn-primary w-full sm:w-auto"
                      style={{
                        position: "relative", overflow: "hidden",
                        background: "linear-gradient(135deg, #562abd, #210C6E)",
                        color: "#F0EEFF",
                        boxShadow: "0 4px 20px rgba(86,42,189,0.28)",
                      }}
                    >
                      <AnimatePresence mode="wait">
                        {sent ? (
                          <motion.span
                            key="sent"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                          >
                            <FiCheck size={16} /> Sent!
                          </motion.span>
                        ) : (
                          <motion.span
                            key="idle"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                          >
                            Send Message <FiSend size={16} />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </motion.div>

                </form>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
