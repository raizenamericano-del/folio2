"use client";

import React, { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
  life: number;
}

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true);

  // Mouse positions
  const mouse = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Detect mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    if (window.innerWidth < 768) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const particles: Particle[] = [];
    const colors = ["#06b6d4", "#ec4899", "#8b5cf6", "#10b981"];

    // Update mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      // Spawn movement particles
      if (Math.random() < 0.4) {
        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 3 + 1,
          alpha: 1,
          life: 30, // ticks
        });
      }
    };

    const handleMouseClick = (e: MouseEvent) => {
      // Spawn burst particles on click
      for (let i = 0; i < 15; i++) {
        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 5,
          vy: (Math.random() - 0.5) * 5,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 4 + 1.5,
          alpha: 1,
          life: 45,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleMouseClick);

    // Animation Loop
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth custom cursor ring interpolation
      const ring = ringRef.current;
      if (ring) {
        ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.15;
        ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.15;
        ring.style.transform = `translate3d(${ringPos.current.x - 12}px, ${ringPos.current.y - 12}px, 0)`;
      }

      // Draw and update particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        p.alpha = p.life / (p.life > 30 ? 45 : 30); // Fade out

        // Draw particle
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Remove dead particles
        if (p.life <= 0) {
          particles.splice(i, 1);
        }
      }
    };

    animate();

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleMouseClick);
      cancelAnimationFrame(animationId);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Custom canvas particle background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-50 mix-blend-screen"
      />

      {/* Cybernetic outer glowing ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-6 h-6 border-2 border-cyan-500 rounded-full pointer-events-none z-50 shadow-[0_0_10px_#06b6d4] transition-opacity duration-300 pointer-events-none"
        style={{
          transform: "translate3d(-100px, -100px, 0)",
          willChange: "transform",
        }}
      >
        <div className="absolute top-[8px] left-[8px] w-1 h-1 bg-pink-500 rounded-full shadow-[0_0_5px_#ec4899]" />
      </div>
    </>
  );
}