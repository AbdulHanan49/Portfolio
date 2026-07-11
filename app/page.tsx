"use client";

import dynamic from "next/dynamic";
import ThemeProvider from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LoadingScreen from "@/components/LoadingScreen";
import SectionDivider from "@/components/SectionDivider";

const About      = dynamic(() => import("@/components/About"));
const Experience = dynamic(() => import("@/components/Experience"));
const Projects   = dynamic(() => import("@/components/Projects"));
const Skills     = dynamic(() => import("@/components/Skills"));
const Contact    = dynamic(() => import("@/components/Contact"));
const Footer     = dynamic(() => import("@/components/Footer"));

export default function Home() {
  return (
    <ThemeProvider>
      <LoadingScreen />
      <Navbar />
      <main id="main-content">
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider flip />
        <Experience />
        <SectionDivider />
        <Projects />
        <SectionDivider flip />
        <Skills />
        <SectionDivider />
        <Contact />
      </main>
      <Footer />
    </ThemeProvider>
  );
}
