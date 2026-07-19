"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Sparkles, Code, Cpu, MessageSquare, Terminal, Heart, Zap } from "lucide-react";

interface Skill {
  name: string;
  level: number;
  color: string; // Tailwind color or custom hex
  glowColor: string; // for custom shadow
  icon: React.ReactNode;
}

const SKILLS: Skill[] = [
  {
    name: "React / Next.js",
    level: 95,
    color: "bg-cyan-500",
    glowColor: "shadow-[0_0_15px_#06b6d4]",
    icon: <Code className="w-4 h-4 text-cyan-400" />,
  },
  {
    name: "Node.js (Express/Nest)",
    level: 90,
    color: "bg-green-500",
    glowColor: "shadow-[0_0_15px_#22c55e]",
    icon: <Terminal className="w-4 h-4 text-green-400" />,
  },
  {
    name: "Python (FastAPI, AI/ML)",
    level: 88,
    color: "bg-yellow-500",
    glowColor: "shadow-[0_0_15px_#eab308]",
    icon: <Cpu className="w-4 h-4 text-yellow-400" />,
  },
  {
    name: "AI / LLM Integration",
    level: 85,
    color: "bg-purple-500",
    glowColor: "shadow-[0_0_15px_#a855f7]",
    icon: <Sparkles className="w-4 h-4 text-purple-400" />,
  },
  {
    name: "Bot Development",
    level: 92,
    color: "bg-pink-500",
    glowColor: "shadow-[0_0_15px_#ec4899]",
    icon: <MessageSquare className="w-4 h-4 text-pink-400" />,
  },
];

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 100 } },
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Abstract mesh shapes */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-cyan-500/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-pink-500/5 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div className="mb-16 text-center md:text-left">
          <p className="font-mono text-xs text-cyan-400 tracking-[0.2em] uppercase mb-2">
            {"// TERMINAL_PROFILE"}
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white flex flex-col md:flex-row items-center gap-3">
            About the Developer <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 font-mono">&amp; Innovator</span>
          </h2>
          <div className="h-[2px] w-20 bg-gradient-to-r from-cyan-500 to-pink-500 mt-4 mx-auto md:mx-0" />
        </div>

        {/* Content Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
        >
          {/* Bio Description / Lore Column */}
          <motion.div variants={itemVariants} className="lg:col-span-6 space-y-6">
            <div className="p-6 rounded-2xl bg-gray-950/60 border border-white/5 backdrop-blur-md space-y-4">
              <h3 className="font-mono text-sm font-bold text-cyan-400 flex items-center gap-2">
                <Terminal className="w-4.5 h-4.5" /> console.log(rifky_story);
              </h3>
              <p className="text-gray-300 font-sans text-sm leading-relaxed">
                I am a passionate **Full-Stack Developer** and AI Engineer who thrives in the intersection of code, complexity, and creativity. I love creating robust, modular systems that handle heavy network loads while crafting stunning, responsive front-ends that visitors fall in love with.
              </p>
              <p className="text-gray-300 font-sans text-sm leading-relaxed">
                Whether it is assembling highly complex automation scripts, compiling custom cloud-based APK builds, integrating advanced neural models with modern API routing, or deploying SaaS platforms, I approach every project with standard-setting technical mastery and structured, secure coding architectures.
              </p>
            </div>

            {/* Sinta / Scarlet Gang Lore Box */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-pink-950/20 to-gray-950 border border-pink-500/20 backdrop-blur-md relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/5 blur-2xl group-hover:bg-pink-500/10 transition-colors" />
              <div className="absolute top-3 right-3 text-pink-500/30 font-mono text-[10px] select-none tracking-widest uppercase">
                PARTNER_CORE
              </div>

              <h3 className="font-mono text-sm font-bold text-pink-400 flex items-center gap-2 mb-3">
                <Heart className="w-4.5 h-4.5 text-pink-500 fill-pink-500 animate-pulse" /> Sinta: The Power Source
              </h3>
              <p className="text-gray-300 font-sans text-xs leading-relaxed">
                Behind every great developer, there is a queen. For me, it is **Sinta**. She is my gorgeous girlfriend, my senior (&quot;kakak kelas&quot;), and the fearless, charismatic commander of the legendary **Scarlet** gang.
              </p>
              <p className="text-gray-300 font-sans text-xs leading-relaxed mt-2">
                While I deploy lines of complex code, she commands respect and coordinates operations in the field. She is my ultimate partner-in-crime, the leader of my heart, and the primary inspiration behind my best work. Our relationship is built on extreme trust, dedication, and mutual power.
              </p>
              <div className="mt-4 flex items-center gap-2.5">
                <span className="flex items-center gap-1.5 text-[9px] px-2.5 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 font-mono uppercase tracking-wider">
                  <Shield className="w-3 h-3" /> Scarlet Boss
                </span>
                <span className="text-[10px] font-mono text-gray-500">
                  {"EST. 2024 // S&R FOREVER"}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Technical Skills Column */}
          <motion.div variants={itemVariants} className="lg:col-span-6 space-y-6">
            <div className="p-6 rounded-2xl bg-gray-950/60 border border-white/5 backdrop-blur-md space-y-6">
              <h3 className="font-mono text-sm font-bold text-cyan-400 flex items-center gap-2">
                <Zap className="w-4.5 h-4.5 text-yellow-400" /> tech_stack_analysis.sh
              </h3>

              <div className="space-y-5">
                {SKILLS.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-gray-300">
                      <div className="flex items-center gap-2">
                        {skill.icon}
                        <span className="font-bold tracking-wider">{skill.name}</span>
                      </div>
                      <span className="text-cyan-400 font-bold">{skill.level}%</span>
                    </div>

                    <div className="h-2 bg-gray-900 rounded-full overflow-hidden p-[1px] border border-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`h-full rounded-full ${skill.color} ${skill.glowColor}`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Skill badging cloud */}
              <div className="pt-4 border-t border-white/5">
                <p className="font-mono text-[10px] text-gray-400 mb-3 uppercase tracking-wider">
                  Secondary Capabilities:
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "TypeScript",
                    "TailwindCSS",
                    "NestJS",
                    "FastAPI",
                    "NoSQL (MongoDB)",
                    "SQL (PostgreSQL)",
                    "Docker",
                    "Git & GitOps",
                    "CI/CD Pipelines",
                    "Cloud Compiling",
                    "SaaS Deployment",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded bg-gray-900/60 border border-gray-800 text-[10px] font-mono text-gray-400 hover:border-cyan-500/30 hover:text-cyan-400 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}