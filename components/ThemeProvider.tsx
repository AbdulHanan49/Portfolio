"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

const DARK_VARS: Record<string, string> = {
  "--bg-primary":           "#0a192f",
  "--bg-secondary":         "#112240",
  "--bg-tertiary":          "#233554",
  "--text-primary":         "#ccd6f6",
  "--text-secondary":       "#8892b0",
  "--text-muted":           "#8892b0",
  "--accent":               "#64ffda",
  "--accent-light":         "#64ffda",
  "--accent-dark":          "#11172a",
  "--accent-secondary":     "#ccd6f6",
  "--accent-glow":          "rgba(100,255,218,0.08)",
  "--accent-glow-strong":   "rgba(100,255,218,0.16)",
  "--accent-mix-10":        "rgba(100,255,218,0.06)",
  "--accent-mix-18":        "rgba(100,255,218,0.10)",
  "--accent-mix-25":        "rgba(100,255,218,0.15)",
  "--accent-mix-45":        "rgba(100,255,218,0.28)",
  "--accent-border":        "rgba(100,255,218,0.25)",
  "--accent-stroke":        "rgba(100,255,218,0.40)",
  "--btn-outline-hover-bg": "#112240",
  "--border":               "#233554",
  "--card-bg":              "#112240",
  "--card-border":          "#233554",
  "--nav-bg":               "rgba(10,25,47,0.95)",
  "--code-bg":              "#020c1b",
  "--code-text":            "#64ffda",
  "--shadow-sm":            "0 1px 3px rgba(0,0,0,0.40)",
  "--shadow-md":            "0 4px 12px rgba(0,0,0,0.50)",
  "--shadow-lg":            "0 16px 40px rgba(0,0,0,0.65)",
};

const LIGHT_VARS: Record<string, string> = {
  "--bg-primary":           "#F4F4F4",
  "--bg-secondary":         "#FFFFFF",
  "--bg-tertiary":          "#EBEBEB",
  "--text-primary":         "#2E2E2E",
  "--text-secondary":       "#4A4A4A",
  "--text-muted":           "#666666",
  "--accent":               "#2563EB",
  "--accent-light":         "#60A5FA",
  "--accent-dark":          "#2E2E2E",
  "--accent-secondary":     "#2E2E2E",
  "--accent-glow":          "rgba(37,99,235,0.10)",
  "--accent-glow-strong":   "rgba(37,99,235,0.18)",
  "--accent-mix-10":        "rgba(37,99,235,0.06)",
  "--accent-mix-18":        "rgba(37,99,235,0.10)",
  "--accent-mix-25":        "rgba(37,99,235,0.15)",
  "--accent-mix-45":        "rgba(37,99,235,0.28)",
  "--accent-border":        "rgba(37,99,235,0.55)",
  "--accent-stroke":        "rgba(37,99,235,0.75)",
  "--btn-outline-hover-bg": "#EBEBEB",
  "--border":               "#DCDCDC",
  "--card-bg":              "#FFFFFF",
  "--card-border":          "#E0E0E0",
  "--nav-bg":               "rgba(244,244,244,0.95)",
  "--code-bg":              "#2E2E2E",
  "--code-text":            "#2563EB",
  "--shadow-sm":            "0 2px 8px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.08)",
  "--shadow-md":            "0 6px 20px rgba(0,0,0,0.18), 0 2px 6px rgba(0,0,0,0.10)",
  "--shadow-lg":            "0 16px 48px rgba(0,0,0,0.22), 0 6px 16px rgba(0,0,0,0.12)",
};

function applyTheme(t: Theme) {
  const root = document.documentElement;
  root.setAttribute("data-theme", t);
  const vars = t === "dark" ? DARK_VARS : LIGHT_VARS;
  for (const [key, val] of Object.entries(vars)) {
    root.style.setProperty(key, val);
  }
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    applyTheme("dark");
  }, []);

  const toggleTheme = () => {
    setTheme(prev => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      applyTheme(next);
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
