"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Cpu, Radio, ShieldAlert, Layers, Server, Activity, Bot } from "lucide-react";
import TiltCard from "./TiltCard";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
  glowColor: string; // Tailwind glow border color / custom hex rgba
  mockup: React.ReactNode; // Interactive UI Mockup to look insanely high-tech
}

export default function Projects() {
  const projects: Project[] = [
    {
      id: "multi-ai",
      title: "Multi-AI Bot Dashboard",
      category: "AI & MULTI-LLM ORCHESTRATION",
      description: "A unified SaaS terminal and smart router managing multiple LLMs (GPT-4, Claude 3.5, Llama 3) with custom routing profiles, prompt versioning, and real-time inference latency analytics.",
      tech: ["React", "FastAPI", "Groq API", "Redis", "MongoDB"],
      github: "https://github.com/rifky-dev/multi-ai-bot",
      live: "#",
      glowColor: "rgba(6, 182, 212, 0.25)", // Cyan
      mockup: (
        <div className="w-full h-44 bg-[#020617] border border-cyan-500/20 rounded-xl p-3.5 font-mono text-[10px] text-cyan-400 overflow-hidden flex flex-col justify-between relative group/mock">
          {/* Top panel */}
          <div className="flex items-center justify-between border-b border-cyan-500/10 pb-1.5">
            <div className="flex items-center gap-1.5">
              <Bot className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-bold tracking-wider">AI_ORCHESTRATOR_V3</span>
            </div>
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          </div>
          {/* Stream */}
          <div className="space-y-1.5 my-2 flex-1">
            <div className="text-gray-400 flex justify-between">
              <span>&gt; Input: &quot;Optimize bot routing...&quot;</span>
              <span className="text-[9px] text-cyan-500/40">12:04:12</span>
            </div>
            <div className="text-pink-400">&gt; Prompt token length: 1,420 tkns</div>
            <div className="text-green-400 flex items-center gap-1.5">
              <span className="bg-green-500/10 px-1 rounded text-[8px]">ROUTED_TO_GROQ_LLAMA33</span>
              <span>- Latency: 9ms</span>
            </div>
            <div className="text-gray-500 text-[8px] truncate">
              Response: &quot;Orchestration path finalized. Activating nodes...&quot;
            </div>
          </div>
          {/* Foot analytics */}
          <div className="flex items-center justify-between border-t border-cyan-500/10 pt-1.5 text-[8px] text-gray-500">
            <span>UPTIME: 99.98%</span>
            <span>TOTAL_CALLS: 1,420,112</span>
          </div>
        </div>
      ),
    },
    {
      id: "apk-builder",
      title: "Cloud APK Automated Builder",
      category: "AUTOMATION & SECURE COMPILING",
      description: "A highly complex cloud compiler that dynamically injects secure payload integrations, bundles credentials, obfuscates configurations, and packs customized Android APK assets on the fly.",
      tech: ["Node.js", "Docker", "AWS S3", "Java/Kotlin Compiler"],
      github: "https://github.com/rifky-dev/cloud-apk-builder",
      live: "#",
      glowColor: "rgba(236, 72, 153, 0.25)", // Pink
      mockup: (
        <div className="w-full h-44 bg-[#020617] border border-pink-500/20 rounded-xl p-3.5 font-mono text-[10px] text-pink-400 overflow-hidden flex flex-col justify-between relative">
          {/* Top panel */}
          <div className="flex items-center justify-between border-b border-pink-500/10 pb-1.5">
            <div className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-pink-400" />
              <span className="font-bold tracking-wider">COMPILER_CORE_X64</span>
            </div>
            <span className="h-1.5 px-1.5 rounded bg-pink-500/20 text-pink-300 text-[8px] tracking-widest font-bold">BUILDING</span>
          </div>
          {/* Compile terminal */}
          <div className="space-y-1.5 my-2 flex-1 text-[8px] text-gray-300">
            <div className="text-pink-300/60">[SYSTEM] Fetching template: rifky_secured_v2</div>
            <div className="text-pink-300/60">[DEPS] Merging SDK versions... Done.</div>
            <div className="text-pink-400">[INJECTOR] Packing custom certificates...</div>
            <div className="text-green-400 font-bold">[SUCCESS] compiled_asset_signed_prod_v1.0.apk (12.4 MB)</div>
          </div>
          {/* Download link mockup */}
          <div className="flex items-center justify-between border-t border-pink-500/10 pt-1.5 text-[8px] text-gray-500">
            <span>DOCKER_NODES: 3 ACTIVE</span>
            <span className="text-pink-400 hover:underline cursor-pointer">DOWNLOAD_SECURE_BUILD</span>
          </div>
        </div>
      ),
    },
    {
      id: "gesture-app",
      title: "Hand-Gesture IoT Controller",
      category: "COMPUTER VISION & REALTIME IOT",
      description: "An advanced Computer Vision desktop client that analyzes skeletal hand nodes in real-time, translates configurations into actions, and broadcasts socket signals to control smart IoT nodes.",
      tech: ["Python", "OpenCV", "MediaPipe", "WebSockets", "ESP32 Core"],
      github: "https://github.com/rifky-dev/gesture-iot-controller",
      live: "#",
      glowColor: "rgba(234, 179, 8, 0.25)", // Yellow
      mockup: (
        <div className="w-full h-44 bg-[#020617] border border-yellow-500/20 rounded-xl p-3 flex flex-col justify-between relative overflow-hidden">
          {/* Frame visual mockup */}
          <div className="absolute inset-0 flex items-center justify-center opacity-30">
            {/* Skeletal hand drawing with SVG */}
            <svg viewBox="0 0 100 80" className="w-24 h-24 stroke-yellow-400 stroke-2 fill-none">
              <path d="M 20,70 L 30,55 L 45,55 L 55,45 L 60,35" />
              <path d="M 30,55 L 40,40 L 45,25 L 48,15" />
              <path d="M 45,55 L 55,38 L 60,20 L 62,10" />
              <path d="M 55,55 L 68,42 L 72,25 L 74,15" />
              <path d="M 55,55 C 65,58 75,55 80,48 L 85,38" />
              <circle cx="20" cy="70" r="2" className="fill-yellow-400" />
              <circle cx="30" cy="55" r="2" className="fill-yellow-400" />
              <circle cx="40" cy="40" r="2" className="fill-yellow-400" />
              <circle cx="45" cy="25" r="2" className="fill-green-400" />
              <circle cx="48" cy="15" r="2" className="fill-green-400" />
            </svg>
          </div>
          {/* Core interface overlay */}
          <div className="relative z-10 flex items-center justify-between border-b border-yellow-500/10 pb-1 font-mono text-[10px] text-yellow-400">
            <div className="flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5" />
              <span>OPENCV_MEDIAPIPE</span>
            </div>
            <span className="text-[8px] bg-yellow-500/10 px-1 text-yellow-400 flex items-center gap-1 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-ping" /> CV_STREAMING
            </span>
          </div>
          <div className="relative z-10 font-mono text-[9px] text-gray-300 space-y-1 my-2">
            <div>&gt; FPS: 60.0 // LATENCY: 4.1ms</div>
            <div className="text-yellow-400 font-bold">&gt; TRIGGER: PINCH_DOUBLE_TAP</div>
            <div className="text-green-400">&gt; MQTT BROADCAST: /home/lights/living-room -&gt; 100%</div>
          </div>
          <div className="relative z-10 flex items-center justify-between border-t border-yellow-500/10 pt-1 text-[8px] text-gray-500 font-mono">
            <span>SENSORS: 4 CONNECTED</span>
            <span>MODEL: MEDIAPIPE_V2</span>
          </div>
        </div>
      ),
    },
    {
      id: "bot-rental",
      title: "SaaS Bot Rental Platform",
      category: "SAAS PLATFORM & DYNAMIC SANDBOXES",
      description: "A comprehensive SaaS application allowing corporate and retail clients to spin up, configure, and rent sandboxed scraping, moderating, or trading bots in secure containers.",
      tech: ["Next.js", "Redis", "Docker Containers", "Stripe API"],
      github: "https://github.com/rifky-dev/saas-bot-rental",
      live: "#",
      glowColor: "rgba(139, 92, 246, 0.25)", // Purple
      mockup: (
        <div className="w-full h-44 bg-[#020617] border border-purple-500/20 rounded-xl p-3.5 font-mono text-[10px] text-purple-400 overflow-hidden flex flex-col justify-between relative">
          {/* Top panel */}
          <div className="flex items-center justify-between border-b border-purple-500/10 pb-1.5">
            <div className="flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-purple-400" />
              <span className="font-bold tracking-wider">CONTAINER_MANAGER</span>
            </div>
            <span className="h-1.5 px-1.5 rounded bg-purple-500/20 text-purple-300 text-[8px] font-bold">ALL_ONLINE</span>
          </div>
          {/* Server stats charts */}
          <div className="space-y-2 my-2 flex-1">
            <div className="flex items-center justify-between text-[9px] text-gray-300">
              <span>Bot_Node_#01 (Trading)</span>
              <span className="text-green-400">92% load</span>
            </div>
            <div className="h-1.5 w-full bg-gray-950 border border-purple-500/10 rounded-full overflow-hidden p-[1px]">
              <div className="h-full rounded-full bg-purple-500 w-11/12 shadow-[0_0_10px_#8b5cf6]" />
            </div>
            <div className="flex items-center justify-between text-[9px] text-gray-300">
              <span>Bot_Node_#02 (Mod_Disc)</span>
              <span className="text-cyan-400">12% load</span>
            </div>
            <div className="h-1.5 w-full bg-gray-950 border border-purple-500/10 rounded-full overflow-hidden p-[1px]">
              <div className="h-full rounded-full bg-cyan-500 w-2/12" />
            </div>
          </div>
          {/* Tenant analytics */}
          <div className="flex items-center justify-between border-t border-purple-500/10 pt-1.5 text-[8px] text-gray-500">
            <span>ACTIVE_TENANTS: 24</span>
            <span className="text-purple-400">NET_PROFIT: +21.4%</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background radial highlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <p className="font-mono text-xs text-pink-500 tracking-[0.2em] uppercase mb-2">
            {"// MASTER_PORTFOLIO"}
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white select-none">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-pink-500 font-mono">Projects</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto font-sans text-sm">
            Explore 4 of my core full-stack platforms, automated compiler nodes, and custom AI infrastructures. Handcrafted with precision, security, and madness.
          </p>
          <div className="h-[2px] w-24 bg-gradient-to-r from-cyan-500 via-blue-500 to-pink-500 mt-5 mx-auto" />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <TiltCard glowColor={project.glowColor} className="h-full bg-gray-950/70 border border-white/5 p-6 backdrop-blur-md flex flex-col justify-between">
                <div className="space-y-5">
                  {/* Category tag */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] tracking-[0.2em] text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-2.5 py-1 rounded-full uppercase font-bold">
                      {project.category}
                    </span>
                    <span className="text-[10px] font-mono text-gray-600 font-bold">
                      {"0" + (index + 1) + " / FILE_NODE"}
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-xl font-bold tracking-tight text-white font-sans group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>

                  {/* High Tech Mockup Visualizer */}
                  <div className="relative group">
                    <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300 pointer-events-none" />
                    {project.mockup}
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 font-sans text-xs leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Bottom details & CTA */}
                <div className="mt-6 pt-5 border-t border-white/5 space-y-4">
                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[9px] font-mono px-2 py-0.5 rounded bg-gray-900 border border-gray-800 text-gray-400 font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center justify-between text-xs font-mono pt-1">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors"
                    >
                      <GithubIcon className="w-4 h-4" /> CODE_REPOSITORY
                    </a>
                    <a
                      href={project.live}
                      className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 hover:underline transition-colors font-bold"
                    >
                      LAUNCH <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}