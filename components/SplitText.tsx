"use client";

import React from "react";
import { motion } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  stagger?: number;
  by?: "char" | "word";
  once?: boolean;
}

const charVariants = {
  hidden: { y: "115%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function SplitText({
  text,
  className,
  style,
  delay = 0,
  stagger = 0.035,
  by = "char",
  once = true,
}: SplitTextProps) {
  const units = by === "word" ? text.split(" ") : text.split("");

  return (
    <motion.span
      aria-label={text}
      className={className}
      style={{ display: "inline", ...style }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-40px" }}
    >
      {units.map((unit, i) => {
        // Static space — no animation, just a gap
        if (unit === " ") {
          return (
            <span key={i} aria-hidden="true" style={{ display: "inline-block", width: "0.28em" }} />
          );
        }

        return (
          <React.Fragment key={i}>
            <span
              aria-hidden="true"
              style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}
            >
              <motion.span variants={charVariants} style={{ display: "inline-block" }}>
                {unit}
              </motion.span>
            </span>
            {/* Space between words */}
            {by === "word" && i < units.length - 1 && (
              <span aria-hidden="true" style={{ display: "inline-block", width: "0.3em" }} />
            )}
          </React.Fragment>
        );
      })}
    </motion.span>
  );
}
