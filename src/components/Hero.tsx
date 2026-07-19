"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDownRight, MessageSquare, Heart, Shield, Terminal, Zap } from "lucide-react";
import ThreeHeroShapes from "./ThreeHeroShapes";

const PHRASES = [
  "Hi, I'm Rifky. A Full-Stack Developer & Innovator.",
  "I build high-performance Web Apps (Next.js, Node).",
  "I create advanced AI Integrations & Autonomous Bots.",
  "Deeply inspired by Sinta (Sinta-ku, Ketua Geng Scarlet! ❤️)"
];

export default function Hero() {
  const [typedText, setTypedText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypedSpeed] = useState(80);

  // Typewriter effect logic
  useEffect(() => {
    const currentPhrase = PHRASES[phraseIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing characters
        setTypedText(currentPhrase.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
        setTypedSpeed(80); // Speed of typing

        if (charIndex + 1 === currentPhrase.length) {
          // Pause at the end of the phrase
          setTypedSpeed(2500);
          setIsDeleting(true);
        }
      } else {
        // Deleting characters
        setTypedText(currentPhrase.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
        setTypedSpeed(40); // Speed of deleting

        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
          setTypedSpeed(400); // Pause before typing next phrase
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, phraseIndex, typingSpeed]);

  const handleOpenBot = () => {
    window.dispatchEvent(new Event("open-rifky-bot"));
  };

  const handleScrollToProjects = () => {
    const projectsSec = document.querySelector("#projects");
    if (projectsSec) {
      projectsSec.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen relative flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Background radial gradient overlay to keep readability */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#030712]/50 to-[#030712] pointer-events-none" />

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Typography & Photo */}
        <div className="lg:col-span-7 space-y-8 flex flex-col items-start justify-center text-left">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gray-950/70 border border-cyan-500/20 text-xs font-mono text-cyan-400 select-none backdrop-blur-md glow-border-cyan"
          >
            <Zap className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
            <span className="text-gray-400 font-sans">STATUS:</span> OPERATIONAL & CODING
          </motion.div>

          {/* Typing Hero Typography */}
          <div className="min-h-[140px] md:min-h-[100px] flex flex-col justify-start">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight select-none">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">
                Crafting Code with{" "}
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 font-mono glow-text-cyan">
                Madness
              </span>
            </h1>
            <div className="mt-4 h-16 max-w-xl">
              <p className="text-gray-300 font-mono text-base md:text-lg lg:text-xl leading-relaxed">
                <span>{typedText}</span>
                <span className="typewriter-cursor inline-block ml-1">&nbsp;</span>
              </p>
            </div>
          </div>

          {/* Sinta & Rifky Photo Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative self-stretch sm:self-auto w-full sm:max-w-md group"
          >
            {/* Retro Cyberpunk Corners & Glows */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500 to-pink-500 opacity-60 blur-md group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative bg-gray-950 rounded-2xl overflow-hidden border border-white/10 p-2">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <img
                  src="/rifky-sinta.jpg"
                  alt="Rifky and Sinta"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Cyberpunk corner brackets */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
                <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-pink-500" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-pink-500" />

                {/* Subtitle overlay badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-gray-950/85 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2.5 flex items-center justify-between">
                  <div>
                    <h4 className="font-mono text-[11px] font-bold text-white tracking-wider flex items-center gap-1">
                      RIFKY & SINTA <Heart className="w-3 h-3 text-pink-500 fill-pink-500" />
                    </h4>
                    <p className="text-[9px] font-sans text-pink-400 font-medium">
                      My Gorgeous Queen & Ketua Geng Scarlet
                    </p>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-pink-500/10 border border-pink-500/30 text-[8px] font-mono text-pink-400 uppercase tracking-widest">
                    <Shield className="w-2.5 h-2.5" /> Scarlet Boss
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-4 self-stretch sm:self-auto w-full"
          >
            <button
              onClick={handleScrollToProjects}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-pink-500 hover:opacity-90 text-white font-mono text-xs font-bold tracking-widest uppercase cursor-pointer flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] transition-all duration-300"
            >
              Explore My Work <ArrowDownRight className="w-4 h-4 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
            </button>
            <button
              onClick={handleOpenBot}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gray-950 hover:bg-gray-900 text-cyan-400 border border-cyan-500/30 hover:border-cyan-400 font-mono text-xs font-bold tracking-widest uppercase cursor-pointer flex items-center justify-center gap-2 transition-colors duration-200"
            >
              Chat with My AI <MessageSquare className="w-4 h-4 animate-pulse text-cyan-400" />
            </button>
          </motion.div>
        </div>

        {/* Right Column: Interactive 3D shapes */}
        <div className="lg:col-span-5 h-[400px] lg:h-auto flex items-center justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-pink-500/5 blur-3xl rounded-full" />
          
          <div className="w-full h-full relative">
            <ThreeHeroShapes />

            {/* Float HUD Information overlay */}
            <div className="absolute top-4 right-4 pointer-events-none text-right font-mono text-[9px] text-cyan-500/60 leading-normal space-y-0.5 select-none">
              <div>ENGINE_CORE: ACTIVE</div>
              <div>WEBGL_RENDERER: ON</div>
              <div>THREEJS_VERSION: r128</div>
              <div>LOC: SINTA_HEART_COORDS</div>
            </div>
            <div className="absolute bottom-4 left-4 pointer-events-none text-left font-mono text-[9px] text-pink-500/60 leading-normal space-y-0.5 select-none">
              <div>INTERACTIVE_MODE: DRAG_OBJECTS</div>
              <div>PARTICLES: React // Node // Python</div>
              <div>SYS_SECURE: PASS</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}