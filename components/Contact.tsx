"use client";

import { useState, FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { FiSend, FiCheck, FiAlertCircle, FiMail, FiMapPin, FiGithub, FiLinkedin, FiZap } from "react-icons/fi";

const EMAILJS_SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  ?? "";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const EMAILJS_PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  ?? "";

type FieldErrors = { name?: string; email?: string; subject?: string; message?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [focused,  setFocused]  = useState<string | null>(null);
  const [sent,     setSent]     = useState(false);
  const [sending,  setSending]  = useState(false);
  const [error,    setError]    = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const validate = () => {
    const next: FieldErrors = {};
    if (!formData.name.trim())    next.name    = "Name is required";
    if (!formData.email.trim())   next.email   = "Email is required";
    else if (!EMAIL_RE.test(formData.email)) next.email = "Enter a valid email address";
    if (!formData.subject.trim()) next.subject = "Subject is required";
    if (!formData.message.trim()) next.message = "Message is required";
    setFieldErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    setError(false);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  formData.name,
          from_email: formData.email,
          subject:    formData.subject,
          message:    formData.message,
        },
        EMAILJS_PUBLIC_KEY,
      );
      setSent(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSent(false), 4000);
    } catch {
      setError(true);
      setTimeout(() => setError(false), 4000);
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="pt-20 pb-40 relative overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Subtle dot grid (dark mode only) */}
      <div aria-hidden="true" className="dark-orb" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, rgba(100,255,218,0.07) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 80%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 80%)",
        willChange: "opacity",
      }} />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">

        {/* Header */}
        <ScrollReveal>
          <div style={{ marginBottom: "1.25rem" }}>
            <p style={{
              fontFamily: "var(--font-fira)", fontSize: "0.65rem", fontWeight: 700,
              color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.28em",
              marginBottom: "0.75rem",
            }}>
              05. Contact
            </p>
            <h2 style={{
              fontFamily: "var(--font-space)", fontWeight: 800,
              fontSize: "clamp(1.75rem, 3vw, 2.6rem)", lineHeight: 1.05,
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

        {/* Form area */}
        <ScrollReveal delay={0.15}>
          <div className="contact-form-wrapper">
            <div className="contact-form-glow" />

            <div className="contact-form-inner">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

                {/* Left — contact info column */}
                <div className="lg:col-span-2 flex flex-col justify-center gap-8">
                  <div>
                    <h4 className="contact-form-heading" style={{ marginBottom: "0.4rem" }}>
                      Let&apos;s work together
                    </h4>
                    <p className="contact-form-text">
                      Open to freelance projects and full-time opportunities. I&apos;ll reply within 24 hours.
                    </p>
                  </div>

                  {/* Contact details */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                    {/* Availability badge */}
                    <div style={{
                      display: "inline-flex", alignItems: "center", gap: "0.5rem",
                      padding: "0.35rem 0.75rem", borderRadius: "999px",
                      background: "var(--accent-mix-10)", border: "1px solid var(--accent-mix-25)",
                      width: "fit-content",
                    }}>
                      <FiZap size={12} style={{ color: "var(--accent)" }} />
                      <span style={{ fontFamily: "var(--font-fira)", fontSize: "0.7rem", fontWeight: 600, color: "var(--accent)", letterSpacing: "0.06em" }}>
                        Available for new projects
                      </span>
                    </div>

                    {/* Email */}
                    <a href="mailto:hananaslam90@gmail.com" style={{
                      display: "flex", alignItems: "center", gap: "0.75rem",
                      color: "var(--text-secondary)", textDecoration: "none",
                      fontFamily: "var(--font-sora)", fontSize: "0.875rem",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--accent)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "var(--text-secondary)")}>
                      <span style={{
                        width: "34px", height: "34px", borderRadius: "8px", flexShrink: 0,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        background: "var(--accent-mix-10)", border: "1px solid var(--border)",
                        color: "var(--accent)",
                      }}>
                        <FiMail size={15} />
                      </span>
                      hananaslam90@gmail.com
                    </a>

                    {/* Location */}
                    <div style={{
                      display: "flex", alignItems: "center", gap: "0.75rem",
                      color: "var(--text-secondary)",
                      fontFamily: "var(--font-sora)", fontSize: "0.875rem",
                    }}>
                      <span style={{
                        width: "34px", height: "34px", borderRadius: "8px", flexShrink: 0,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        background: "var(--accent-mix-10)", border: "1px solid var(--border)",
                        color: "var(--accent)",
                      }}>
                        <FiMapPin size={15} />
                      </span>
                      Lahore, Pakistan · Open to Remote
                    </div>

                    {/* Social links */}
                    <div style={{ display: "flex", gap: "0.625rem", marginTop: "0.25rem" }}>
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
                            width: "38px", height: "38px", borderRadius: "8px",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            background: "var(--accent-mix-10)", border: "1px solid var(--border)",
                            color: "var(--text-muted)", textDecoration: "none",
                            transition: "color 0.2s, border-color 0.2s, background 0.2s",
                          }}
                          onMouseEnter={e => {
                            const el = e.currentTarget as HTMLAnchorElement;
                            el.style.color = "var(--accent)";
                            el.style.borderColor = "var(--accent)";
                            el.style.background = "var(--accent-mix-18)";
                          }}
                          onMouseLeave={e => {
                            const el = e.currentTarget as HTMLAnchorElement;
                            el.style.color = "var(--text-muted)";
                            el.style.borderColor = "var(--border)";
                            el.style.background = "var(--accent-mix-10)";
                          }}
                        >
                          {icon}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right — Form */}
                <form onSubmit={handleSubmit} noValidate className="lg:col-span-3 space-y-4">

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="contact-field-wrap">
                      <label className="contact-label" htmlFor="name">Name</label>
                      <div className={`rounded-xl overflow-hidden contact-field-ring${focused === "name" ? " focused" : ""}${fieldErrors.name ? " error" : ""}`}>
                        <input
                          id="name" type="text" placeholder="John Doe"
                          value={formData.name}
                          onChange={e => { setFormData({ ...formData, name: e.target.value }); setFieldErrors(prev => ({ ...prev, name: undefined })); }}
                          onFocus={() => setFocused("name")}
                          onBlur={() => setFocused(null)}
                          className="contact-input-v2"
                          aria-invalid={!!fieldErrors.name}
                        />
                      </div>
                      {fieldErrors.name && <span className="contact-error-text">{fieldErrors.name}</span>}
                    </div>

                    {/* Email */}
                    <div className="contact-field-wrap">
                      <label className="contact-label" htmlFor="email">Email</label>
                      <div className={`rounded-xl overflow-hidden contact-field-ring${focused === "email" ? " focused" : ""}${fieldErrors.email ? " error" : ""}`}>
                        <input
                          id="email" type="email" placeholder="john@example.com"
                          value={formData.email}
                          onChange={e => { setFormData({ ...formData, email: e.target.value }); setFieldErrors(prev => ({ ...prev, email: undefined })); }}
                          onFocus={() => setFocused("email")}
                          onBlur={() => setFocused(null)}
                          className="contact-input-v2"
                          aria-invalid={!!fieldErrors.email}
                        />
                      </div>
                      {fieldErrors.email && <span className="contact-error-text">{fieldErrors.email}</span>}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="contact-field-wrap">
                    <label className="contact-label" htmlFor="subject">Subject</label>
                    <div className={`rounded-xl overflow-hidden contact-field-ring${focused === "subject" ? " focused" : ""}${fieldErrors.subject ? " error" : ""}`}>
                      <input
                        id="subject" type="text" placeholder="Project discussion"
                        value={formData.subject}
                        onChange={e => { setFormData({ ...formData, subject: e.target.value }); setFieldErrors(prev => ({ ...prev, subject: undefined })); }}
                        onFocus={() => setFocused("subject")}
                        onBlur={() => setFocused(null)}
                        className="contact-input-v2"
                        aria-invalid={!!fieldErrors.subject}
                      />
                    </div>
                    {fieldErrors.subject && <span className="contact-error-text">{fieldErrors.subject}</span>}
                  </div>

                  {/* Message */}
                  <div className="contact-field-wrap">
                    <label className="contact-label" htmlFor="message">Message</label>
                    <div className={`rounded-xl overflow-hidden contact-field-ring${focused === "message" ? " focused" : ""}${fieldErrors.message ? " error" : ""}`}>
                      <textarea
                        id="message" placeholder="Tell me about your project..."
                        rows={5}
                        value={formData.message}
                        onChange={e => { setFormData({ ...formData, message: e.target.value }); setFieldErrors(prev => ({ ...prev, message: undefined })); }}
                        onFocus={() => setFocused("message")}
                        onBlur={() => setFocused(null)}
                        className="contact-input-v2 resize-none"
                        aria-invalid={!!fieldErrors.message}
                      />
                    </div>
                    {fieldErrors.message && <span className="contact-error-text">{fieldErrors.message}</span>}
                  </div>

                  {/* Submit button */}
                  <div>
                    <motion.button
                      type="submit"
                      disabled={sending}
                      initial="rest"
                      whileHover={!sending ? "hover" : "rest"}
                      whileTap={!sending ? { scale: 0.97 } : {}}
                      variants={{ rest: { scale: 1, y: 0 }, hover: { scale: 1.03, y: -2 } }}
                      transition={{ type: "spring", stiffness: 400, damping: 18 }}
                      className="btn-primary w-full sm:w-auto"
                      style={{
                        position: "relative", overflow: "hidden",
                        background: error
                          ? "linear-gradient(135deg, #7f1d1d, #991b1b)"
                          : undefined,
                        opacity: sending ? 0.75 : 1,
                        cursor: sending ? "not-allowed" : "pointer",
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
                        ) : error ? (
                          <motion.span
                            key="error"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                          >
                            <FiAlertCircle size={16} /> Failed, try email
                          </motion.span>
                        ) : sending ? (
                          <motion.span
                            key="sending"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                          >
                            Sending...
                          </motion.span>
                        ) : (
                          <motion.span
                            key="idle"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                          >
                            Send Message
                            <motion.span
                              variants={{ rest: { x: 0, rotate: 0 }, hover: { x: 4, rotate: 12 } }}
                              transition={{ type: "spring", stiffness: 400, damping: 15 }}
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <FiSend size={16} />
                            </motion.span>
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </div>

                  <span role="status" aria-live="polite" className="sr-only">
                    {sent
                      ? "Message sent successfully."
                      : error
                      ? "Message failed to send. Please try again or email directly."
                      : ""}
                  </span>

                </form>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}


