"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Menu, X, Heart, Shield } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-30 transition-all duration-300 ${
        scrolled
          ? "bg-gray-950/80 backdrop-blur-md border-b border-cyan-500/10 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#home"
          onClick={(e) => handleScrollTo(e, "#home")}
          className="flex items-center gap-2 font-mono text-base font-bold tracking-wider text-white select-none cursor-pointer"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-pink-500 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)]">
            <Terminal className="w-4 h-4 text-white" />
          </div>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-pink-400">
            RIFKY<span className="text-pink-500">.</span>DEV
          </span>
          {/* Subtle Scarlet Gang badge */}
          <span className="hidden sm:inline-flex items-center gap-1 text-[9px] px-2 py-0.5 rounded-full bg-pink-950/40 border border-pink-500/20 text-pink-400 font-sans ml-2">
            <Shield className="w-2.5 h-2.5" /> Scarlet Gang Partner
          </span>
        </motion.a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleScrollTo(e, item.href)}
              className="font-mono text-xs tracking-widest text-gray-400 hover:text-cyan-400 hover:glow-text-cyan transition-all duration-200 uppercase relative py-1 group"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-cyan-400 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          {/* Custom love badge for Sinta */}
          <motion.div
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-950/30 border border-pink-500/20 text-pink-400 text-xs font-mono"
            whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(236, 72, 153, 0.3)" }}
          >
            <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500 animate-pulse" /> Sinta-ku
          </motion.div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 md:hidden">
          <motion.div
            className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-pink-950/30 border border-pink-500/20 text-pink-400 text-[10px] font-mono"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Heart className="w-3 h-3 text-pink-500 fill-pink-500" /> Sinta
          </motion.div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-md text-gray-400 hover:text-white hover:bg-gray-900 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-950 border-b border-cyan-500/10 overflow-hidden"
          >
            <div className="px-6 py-4 space-y-4 flex flex-col">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleScrollTo(e, item.href)}
                  className="font-mono text-sm tracking-widest text-gray-300 hover:text-cyan-400 transition-colors uppercase py-2 border-b border-gray-900"
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-2 flex items-center justify-between">
                <span className="font-mono text-[10px] text-gray-500">SCARLET LEAGUE PARTNER</span>
                <span className="flex items-center gap-1 text-[11px] font-mono text-pink-400">
                  <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500 animate-pulse" /> Sinta
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}