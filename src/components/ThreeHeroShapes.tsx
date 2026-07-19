"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeHeroShapes() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    camera.position.z = 100;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x06b6d4, 2, 150); // Cyan glow
    pointLight1.position.set(30, 20, 20);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xec4899, 2, 150); // Pink glow
    pointLight2.position.set(-30, -20, 20);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xeab308, 2, 150); // Yellow glow
    pointLight3.position.set(0, 0, 40);
    scene.add(pointLight3);

    // ----------------------------------------------------
    // OBJECT 1: React Atomic Logo (Cyan)
    // ----------------------------------------------------
    const reactGroup = new THREE.Group();
    reactGroup.position.set(-15, 12, 0);

    // Nucleus
    const nucleusGeo = new THREE.SphereGeometry(2.5, 32, 32);
    const nucleusMat = new THREE.MeshPhongMaterial({
      color: 0x06b6d4,
      emissive: 0x015a6b,
      shininess: 100,
    });
    const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
    reactGroup.add(nucleus);

    // Rings (Orbits)
    const ringGroup = new THREE.Group();
    const ringCount = 3;
    const ringMaterials = [
      new THREE.LineBasicMaterial({ color: 0x06b6d4, linewidth: 2 }),
      new THREE.LineBasicMaterial({ color: 0x06b6d4, linewidth: 2 }),
      new THREE.LineBasicMaterial({ color: 0x06b6d4, linewidth: 2 }),
    ];

    // Create elliptical rings using Curve
    for (let i = 0; i < ringCount; i++) {
      const curve = new THREE.EllipseCurve(
        0, 0,            // ax, ay
        8, 3,            // xRadius, yRadius
        0, 2 * Math.PI,  // aStartAngle, aEndAngle
        false,           // aClockwise
        0                // aRotation
      );

      const points = curve.getPoints(64);
      const ringGeo = new THREE.BufferGeometry().setFromPoints(points);
      const ringMesh = new THREE.Line(ringGeo, ringMaterials[i]);

      // Rotate each ring differently
      ringMesh.rotation.z = (i * Math.PI) / 3;
      ringGroup.add(ringMesh);

      // Add a small electron on each ring
      const electronGeo = new THREE.SphereGeometry(0.5, 16, 16);
      const electronMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
      const electron = new THREE.Mesh(electronGeo, electronMat);
      
      // Attach metadata to animate electrons
      electron.userData = {
        angle: (i * Math.PI) / 3,
        speed: 0.05 + i * 0.01,
        radiusX: 8,
        radiusY: 3,
        ringRotation: (i * Math.PI) / 3
      };
      
      reactGroup.add(electron);
    }
    reactGroup.add(ringGroup);
    scene.add(reactGroup);

    // ----------------------------------------------------
    // OBJECT 2: Node.js Hexagonal Outline (Green)
    // ----------------------------------------------------
    const nodeGroup = new THREE.Group();
    nodeGroup.position.set(18, -12, 0);

    // Hexagon prism outline
    const hexGeo = new THREE.CylinderGeometry(6, 6, 4, 6, 1, false);
    const hexMat = new THREE.MeshPhongMaterial({
      color: 0x22c55e,
      emissive: 0x14532d,
      wireframe: true,
      shininess: 80,
    });
    const hexPrism = new THREE.Mesh(hexGeo, hexMat);
    hexPrism.rotation.x = Math.PI / 4;
    hexPrism.rotation.y = Math.PI / 6;
    nodeGroup.add(hexPrism);

    // Core glow sphere
    const nodeCoreGeo = new THREE.SphereGeometry(1.5, 16, 16);
    const nodeCoreMat = new THREE.MeshBasicMaterial({ color: 0x4ade80 });
    const nodeCore = new THREE.Mesh(nodeCoreGeo, nodeCoreMat);
    nodeGroup.add(nodeCore);

    scene.add(nodeGroup);

    // ----------------------------------------------------
    // OBJECT 3: Python Interlocking Torus Knot (Yellow & Blue)
    // ----------------------------------------------------
    const pythonGroup = new THREE.Group();
    pythonGroup.position.set(-10, -15, 5);

    const knotGeo = new THREE.TorusKnotGeometry(5, 1.2, 100, 16, 2, 3);
    
    // Custom material with vertex coloring or double material for linked snake look
    const knotMat = new THREE.MeshPhongMaterial({
      color: 0x3b82f6, // Blue
      emissive: 0x1e3a8a,
      shininess: 90,
      specular: 0xffffff,
    });
    const pythonKnot = new THREE.Mesh(knotGeo, knotMat);
    pythonGroup.add(pythonKnot);

    // Add a yellow companion sphere orbiting it or secondary knot
    const pythonKnot2Geo = new THREE.TorusKnotGeometry(3, 0.7, 64, 12, 3, 4);
    const knotMat2 = new THREE.MeshPhongMaterial({
      color: 0xeab308, // Yellow
      emissive: 0x713f12,
      shininess: 90,
    });
    const pythonKnot2 = new THREE.Mesh(pythonKnot2Geo, knotMat2);
    pythonKnot2.position.set(2, 2, 2);
    pythonGroup.add(pythonKnot2);

    scene.add(pythonGroup);

    // ----------------------------------------------------
    // ADDITIONAL CYBER DECOR: Flying glowing crystals
    // ----------------------------------------------------
    const crystalGeo = new THREE.OctahedronGeometry(2, 0);
    const crystalMat1 = new THREE.MeshPhongMaterial({ color: 0xec4899, emissive: 0x500730, flatShading: true });
    const crystalMat2 = new THREE.MeshPhongMaterial({ color: 0xa855f7, emissive: 0x3b0764, flatShading: true });
    
    const crystal1 = new THREE.Mesh(crystalGeo, crystalMat1);
    crystal1.position.set(15, 15, -10);
    scene.add(crystal1);

    const crystal2 = new THREE.Mesh(crystalGeo, crystalMat2);
    crystal2.position.set(-20, 0, -20);
    scene.add(crystal2);

    // Mouse Tracking
    let mouseX = 0;
    let mouseY = 0;
    
    const onMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / width) * 2 - 1;
      mouseY = -((event.clientY - rect.top) / height) * 2 + 1;
    };

    container.addEventListener("mousemove", onMouseMove);

    // Animation Loop
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth camera reaction to mouse
      camera.position.x += (mouseX * 15 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 15 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      // Rotate React Group & Orbits
      reactGroup.rotation.y = elapsedTime * 0.5;
      reactGroup.rotation.x = elapsedTime * 0.2;
      
      // Animate React Electrons
      let electronIndex = 0;
      reactGroup.children.forEach((child) => {
        if (child instanceof THREE.Mesh && child !== nucleus) {
          const ud = child.userData;
          if (ud.speed) {
            ud.angle += ud.speed;
            
            // Calculate 2D position in ellipse
            const localX = Math.cos(ud.angle) * ud.radiusX;
            const localY = Math.sin(ud.angle) * ud.radiusY;
            
            // Rotate the local coordinate to match the ring rotation
            const pos = new THREE.Vector3(localX, localY, 0);
            pos.applyAxisAngle(new THREE.Vector3(0, 0, 1), ud.ringRotation);
            
            child.position.copy(pos);
          }
        }
      });

      // Rotate Node.js Group
      nodeGroup.rotation.y = -elapsedTime * 0.7;
      nodeGroup.rotation.z = elapsedTime * 0.3;
      // Hover bobbing effect
      nodeGroup.position.y = -12 + Math.sin(elapsedTime * 1.5) * 2;

      // Rotate Python group
      pythonGroup.rotation.x = elapsedTime * 0.4;
      pythonGroup.rotation.y = elapsedTime * 0.6;
      pythonGroup.position.y = -15 + Math.cos(elapsedTime * 2.0) * 1.5;

      // Rotate crystals
      crystal1.rotation.y += 0.02;
      crystal1.position.y = 15 + Math.sin(elapsedTime * 2) * 1.2;
      
      crystal2.rotation.x += 0.015;
      crystal2.position.y = Math.cos(elapsedTime * 1.5) * 1.2;

      renderer.render(scene, camera);
    };

    animate();

    // Resize observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    });
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener("mousemove", onMouseMove);
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      
      // Dispose Three assets
      nucleusGeo.dispose();
      nucleusMat.dispose();
      hexGeo.dispose();
      hexMat.dispose();
      nodeCoreGeo.dispose();
      nodeCoreMat.dispose();
      knotGeo.dispose();
      knotMat.dispose();
      pythonKnot2Geo.dispose();
      knotMat2.dispose();
      crystalGeo.dispose();
      crystalMat1.dispose();
      crystalMat2.dispose();
      
      ringMaterials.forEach(m => m.dispose());
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-[400px] md:h-[500px] relative flex items-center justify-center cursor-grab active:cursor-grabbing"
    />
  );
}