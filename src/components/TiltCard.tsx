"use client";

import React, { useRef, useState, MouseEvent } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string; // Hex or tailwind class name
}

export default function TiltCard({
  children,
  className = "",
  glowColor = "rgba(6, 182, 212, 0.15)", // Default cyan glow
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    // Mouse positions relative to the card container
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Normalize positions between -0.5 and 0.5
    const normalizedX = (mouseX / width) - 0.5;
    const normalizedY = (mouseY / height) - 0.5;

    // Calculate rotation angles (max 15 degrees)
    const maxRotation = 12;
    const rX = -normalizedY * maxRotation;
    const rY = normalizedX * maxRotation;

    setRotateX(rX);
    setRotateY(rY);
    setMousePos({ x: mouseX, y: mouseY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-2xl transition-all duration-200 ease-out preserve-3d cursor-pointer ${className}`}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
        boxShadow: isHovered
          ? `0 20px 40px -15px rgba(0, 0, 0, 0.8), 0 0 30px ${glowColor}`
          : "0 10px 30px -15px rgba(0, 0, 0, 0.7)",
      }}
    >
      {/* Light glow reflection following the mouse */}
      {isHovered && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 180px at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.08), transparent)`,
            zIndex: 3,
          }}
        />
      )}

      {/* Glow highlight borders */}
      <div
        className="absolute inset-0 rounded-2xl border border-transparent pointer-events-none transition-opacity duration-300"
        style={{
          borderImage: isHovered
            ? `radial-gradient(circle 120px at ${mousePos.x}px ${mousePos.y}px, ${glowColor.replace("0.15", "0.6")}, transparent) 1`
            : "none",
          zIndex: 2,
        }}
      />

      <div className="h-full w-full relative z-10 select-none transform-preserve-3d">
        {children}
      </div>
    </div>
  );
}