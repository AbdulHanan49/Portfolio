"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale" | "blur";
  className?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const variants: Record<string, { initial: any; animate: any }> = {
  up: {
    initial: { opacity: 0, y: 70, filter: "blur(6px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  down: {
    initial: { opacity: 0, y: -70, filter: "blur(6px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  left: {
    initial: { opacity: 0, x: 70, filter: "blur(6px)" },
    animate: { opacity: 1, x: 0, filter: "blur(0px)" },
  },
  right: {
    initial: { opacity: 0, x: -70, filter: "blur(6px)" },
    animate: { opacity: 1, x: 0, filter: "blur(0px)" },
  },
  scale: {
    initial: { opacity: 0, scale: 0.82, filter: "blur(10px)" },
    animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
  },
  blur: {
    initial: { opacity: 0, filter: "blur(20px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
  },
};

export default function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: ScrollRevealProps) {
  const { initial, animate } = variants[direction];

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
