"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // Create Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.015);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Create Particles Geometry
    const particleCount = 250;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities: number[] = [];
    const colors = new Float32Array(particleCount * 3);

    const cyanColor = new THREE.Color("#06b6d4"); // Cyan
    const pinkColor = new THREE.Color("#ec4899"); // Pink
    const purpleColor = new THREE.Color("#8b5cf6"); // Purple

    for (let i = 0; i < particleCount; i++) {
      // Position particles in a cube
      const x = (Math.random() - 0.5) * 300;
      const y = (Math.random() - 0.5) * 300;
      const z = (Math.random() - 0.5) * 300;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Velocities
      velocities.push(
        (Math.random() - 0.5) * 0.2,
        (Math.random() - 0.5) * 0.2,
        (Math.random() - 0.5) * 0.2
      );

      // Colors
      const mix = Math.random();
      let chosenColor = cyanColor;
      if (mix > 0.6) {
        chosenColor = pinkColor;
      } else if (mix > 0.3) {
        chosenColor = purpleColor;
      }

      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Particle Texture (Circle)
    const canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.3, "rgba(255, 255, 255, 0.8)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 16, 16);
    }
    const texture = new THREE.CanvasTexture(canvas);

    // Particle Material
    const material = new THREE.PointsMaterial({
      size: 4,
      vertexColors: true,
      map: texture,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // Grid helper or subtle lines
    // To make it look like a constellation, we can connect nearby particles.
    // However, drawing connection lines in dynamic buffer geometry can be heavy,
    // so let's draw subtle cybernetic wireframe grids floating in the background.
    const gridHelper = new THREE.GridHelper(400, 20, 0x1e293b, 0x0f172a);
    gridHelper.position.y = -80;
    gridHelper.rotation.x = 0.1;
    scene.add(gridHelper);

    // Mouse Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - window.innerWidth / 2) * 0.05;
      mouseY = (event.clientY - window.innerHeight / 2) * 0.05;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        mouseX = (event.touches[0].clientX - window.innerWidth / 2) * 0.05;
        mouseY = (event.touches[0].clientY - window.innerHeight / 2) * 0.05;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth mouse follow
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      camera.position.x = targetX;
      camera.position.y = -targetY;
      camera.lookAt(scene.position);

      // Rotate whole particle system slowly
      particleSystem.rotation.y += 0.0008;
      particleSystem.rotation.x += 0.0004;

      // Update particle positions
      const positionsAttr = geometry.attributes.position as THREE.BufferAttribute;
      const array = positionsAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        // Apply velocity
        array[i * 3] += velocities[i * 3];
        array[i * 3 + 1] += velocities[i * 3 + 1];
        array[i * 3 + 2] += velocities[i * 3 + 2];

        // Boundary check (box of 300)
        if (Math.abs(array[i * 3]) > 150) velocities[i * 3] *= -1;
        if (Math.abs(array[i * 3 + 1]) > 150) velocities[i * 3 + 1] *= -1;
        if (Math.abs(array[i * 3 + 2]) > 150) velocities[i * 3 + 2] *= -1;
      }

      positionsAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-50 bg-[#030712] overflow-hidden pointer-events-none"
      style={{ mixBlendMode: "screen" }}
    />
  );
}