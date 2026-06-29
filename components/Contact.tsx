"use client";

import { useState, FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { FiSend, FiCheck, FiAlertCircle } from "react-icons/fi";

const EMAILJS_SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  ?? "";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const EMAILJS_PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  ?? "";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [focused,  setFocused]  = useState<string | null>(null);
  const [sent,     setSent]     = useState(false);
  const [sending,  setSending]  = useState(false);
  const [error,    setError]    = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
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
      className="py-20 relative overflow-hidden"
      style={{ background: "var(--bg-secondary)" }}
    >
      {/* Background dot grid */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, rgba(52,73,94,0.18) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        mask: "radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 80%)",
        WebkitMask: "radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 80%)",
      }} />

      {/* Ambient orbs — CSS animated */}
      <div
        className="absolute bottom-0 right-0 w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(52,73,94,0.60) 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "contactOrb1 7s ease-in-out infinite",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-0 left-0 w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(44,62,80,0.80) 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "contactOrb2 9s ease-in-out 2.5s infinite",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 right-0 w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(44,62,80,0.45) 0%, transparent 70%)",
          filter: "blur(70px)",
          animation: "contactOrb3 11s ease-in-out 5s infinite",
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">

        {/* Header */}
        <ScrollReveal>
          <div style={{ marginBottom: "1.75rem" }}>
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
                  </p>

                </div>

                {/* Right — Form */}
                <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-4">

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="contact-field-wrap">
                      <label className="contact-label" htmlFor="name">Name</label>
                      <div className={`rounded-xl overflow-hidden contact-field-ring${focused === "name" ? " focused" : ""}`}>
                        <input
                          id="name" type="text" placeholder="John Doe" required
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          onFocus={() => setFocused("name")}
                          onBlur={() => setFocused(null)}
                          className="contact-input-v2"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="contact-field-wrap">
                      <label className="contact-label" htmlFor="email">Email</label>
                      <div className={`rounded-xl overflow-hidden contact-field-ring${focused === "email" ? " focused" : ""}`}>
                        <input
                          id="email" type="email" placeholder="john@example.com" required
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          onFocus={() => setFocused("email")}
                          onBlur={() => setFocused(null)}
                          className="contact-input-v2"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="contact-field-wrap">
                    <label className="contact-label" htmlFor="subject">Subject</label>
                    <div className={`rounded-xl overflow-hidden contact-field-ring${focused === "subject" ? " focused" : ""}`}>
                      <input
                        id="subject" type="text" placeholder="Project discussion" required
                        value={formData.subject}
                        onChange={e => setFormData({ ...formData, subject: e.target.value })}
                        onFocus={() => setFocused("subject")}
                        onBlur={() => setFocused(null)}
                        className="contact-input-v2"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="contact-field-wrap">
                    <label className="contact-label" htmlFor="message">Message</label>
                    <div className={`rounded-xl overflow-hidden contact-field-ring${focused === "message" ? " focused" : ""}`}>
                      <textarea
                        id="message" placeholder="Tell me about your project..." required
                        rows={5}
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        onFocus={() => setFocused("message")}
                        onBlur={() => setFocused(null)}
                        className="contact-input-v2 resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit button */}
                  <div>
                    <motion.button
                      type="submit"
                      disabled={sending}
                      whileHover={!sending ? { scale: 1.03, y: -2 } : {}}
                      whileTap={!sending ? { scale: 0.97 } : {}}
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
                            <FiAlertCircle size={16} /> Failed — try email
                          </motion.span>
                        ) : sending ? (
                          <motion.span
                            key="sending"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                          >
                            Sending…
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
                  </div>

                </form>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
