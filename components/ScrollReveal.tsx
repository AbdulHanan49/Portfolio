"use client";

import { useEffect, useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale" | "blur";
  className?: string;
}

const INITIAL: Record<string, string> = {
  up:    "opacity:0;transform:translateY(44px)",
  down:  "opacity:0;transform:translateY(-44px)",
  left:  "opacity:0;transform:translateX(44px)",
  right: "opacity:0;transform:translateX(-44px)",
  scale: "opacity:0;transform:scale(0.88);filter:blur(8px)",
  blur:  "opacity:0;filter:blur(14px)",
};

export default function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Apply initial hidden state via style attribute (no JS loop cost)
    const parts = INITIAL[direction].split(";");
    parts.forEach(p => {
      const [prop, val] = p.split(":");
      // @ts-expect-error dynamic style prop
      el.style[prop.trim().replace(/-([a-z])/g, (_: string, c: string) => c.toUpperCase())] = val;
    });
    el.style.transition = `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s, filter 0.65s ease ${delay}s`;
    el.style.willChange = "opacity, transform";

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.style.opacity = "1";
        el.style.transform = "none";
        el.style.filter = "none";
        el.style.willChange = "auto";
        io.disconnect();
      },
      { threshold: 0.08, rootMargin: "-40px 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [delay, direction]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
