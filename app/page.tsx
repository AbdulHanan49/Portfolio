"use client";

import ThemeProvider from "@/components/ThemeProvider";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import TechStackGrid from "@/components/TechStackGrid";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import MiniGames from "@/components/MiniGames";
import StatsTicker from "@/components/StatsTicker";
import Footer from "@/components/Footer";
import FixedUI from "@/components/FixedUI";

export default function Home() {
  return (
    <ThemeProvider>
      <LoadingScreen />
      <CustomCursor />
      <FixedUI />
      <Navbar />
      <main id="main-content">
        <Hero />
        <StatsTicker />
        <About />
        <TechStackGrid />
        <Skills />
        <Experience />
        <Projects />
        <MiniGames />
        <Contact />
      </main>
      <Footer />
    </ThemeProvider>
  );
}
