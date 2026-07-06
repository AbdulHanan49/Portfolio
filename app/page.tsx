"use client";

import dynamic from "next/dynamic";
import ThemeProvider from "@/components/ThemeProvider";
import CursorSpotlight from "@/components/CursorSpotlight";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LoadingScreen from "@/components/LoadingScreen";

const About      = dynamic(() => import("@/components/About"));
const Experience = dynamic(() => import("@/components/Experience"));
const Projects   = dynamic(() => import("@/components/Projects"));
const Skills     = dynamic(() => import("@/components/Skills"));
const Contact    = dynamic(() => import("@/components/Contact"));
const Footer     = dynamic(() => import("@/components/Footer"));

export default function Home() {
  return (
    <ThemeProvider>
      <CursorSpotlight />
      <LoadingScreen />
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
