"use client";

import React from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import CustomCursor from "@/components/CustomCursor";
import ThreeBackground from "@/components/ThreeBackground";
import RifkyBot from "@/components/RifkyBot";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#030712] selection:bg-cyan-500/30 selection:text-cyan-200 overflow-hidden cyber-grid">
        {/* Interactive WebGL / Three.js particle background */}
        <ThreeBackground />

        {/* Cyberpunk Interactive Custom Cursor */}
        <CustomCursor />

        {/* Global Floating AI Assistant Client (Groq-driven) */}
        <RifkyBot />

        {/* Portfolio Header / Navigation Bar */}
        <Header />

        {/* Page Content layout wrapper */}
        <main className="relative z-10">
          <Hero />
          <About />
          <Projects />
          <Contact />
        </main>
      </div>
    </SmoothScroll>
  );
}