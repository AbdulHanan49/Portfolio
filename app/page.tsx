"use client";

import dynamic from "next/dynamic";
import ThemeProvider from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

const About      = dynamic(() => import("@/components/About"),      { ssr: false });
const Experience = dynamic(() => import("@/components/Experience"), { ssr: false });
const Projects   = dynamic(() => import("@/components/Projects"),   { ssr: false });
const Skills     = dynamic(() => import("@/components/Skills"),     { ssr: false });
const Contact    = dynamic(() => import("@/components/Contact"),    { ssr: false });
const Footer     = dynamic(() => import("@/components/Footer"),     { ssr: false });

export default function Home() {
  return (
    <ThemeProvider>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </ThemeProvider>
  );
}
