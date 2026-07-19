"use client";

import React, { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, Heart, CheckCircle2, ShieldAlert, Sparkles, Terminal } from "lucide-react";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setIsSubmitting(true);

    // Simulate sending packet over a secure channel
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSuccess(true);
    setName("");
    setEmail("");
    setMessage("");

    // Reset success banner after 5s
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <p className="font-mono text-xs text-cyan-400 tracking-[0.2em] uppercase mb-2">
            {"// SECURE_COMMUNICATION"}
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white select-none">
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 font-mono">Touch</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto font-sans text-sm">
            Interested in hiring me, collaborating on complex AI development, or simply asking about the Scarlet gang? Send me an encrypted message packet!
          </p>
          <div className="h-[2px] w-24 bg-gradient-to-r from-cyan-500 to-pink-500 mt-5 mx-auto" />
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto items-start">
          {/* Social Links & Info Column (Left) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-6 rounded-2xl bg-gray-950/60 border border-white/5 backdrop-blur-md space-y-6">
              <h3 className="font-mono text-sm font-bold text-cyan-400 flex items-center gap-2">
                <Terminal className="w-4.5 h-4.5" /> connection_nodes.conf
              </h3>

              <p className="text-gray-400 font-sans text-xs leading-relaxed">
                Feel free to ping me on any of these operational platforms. My neural systems are continuously listening for new contract proposals or high-tech collaboration packages.
              </p>

              <div className="space-y-4">
                {/* Email link */}
                <a
                  href="mailto:rifky@arena.ai"
                  className="flex items-center gap-4 p-3.5 rounded-xl bg-gray-900/60 border border-white/5 hover:border-cyan-500/30 text-gray-300 hover:text-white transition-all group cursor-pointer"
                >
                  <div className="p-2.5 rounded-lg bg-cyan-950 border border-cyan-500/30 text-cyan-400 group-hover:bg-cyan-500/10 transition-colors">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">EMAIL_ADDRESS</h4>
                    <p className="text-xs font-mono font-semibold">rifky@arena.ai</p>
                  </div>
                </a>

                {/* GitHub link */}
                <a
                  href="https://github.com/rifky-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3.5 rounded-xl bg-gray-900/60 border border-white/5 hover:border-cyan-500/30 text-gray-300 hover:text-white transition-all group cursor-pointer"
                >
                  <div className="p-2.5 rounded-lg bg-gray-950 border border-white/10 text-gray-400 group-hover:bg-white/5 transition-colors">
                    <GithubIcon className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">GITHUB</h4>
                    <p className="text-xs font-mono font-semibold">github.com/rifky-dev</p>
                  </div>
                </a>

                {/* LinkedIn link */}
                <a
                  href="https://linkedin.com/in/rifky-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3.5 rounded-xl bg-gray-900/60 border border-white/5 hover:border-cyan-500/30 text-gray-300 hover:text-white transition-all group cursor-pointer"
                >
                  <div className="p-2.5 rounded-lg bg-blue-950 border border-blue-500/30 text-blue-400 group-hover:bg-blue-500/10 transition-colors">
                    <LinkedinIcon className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">LINKEDIN</h4>
                    <p className="text-xs font-mono font-semibold">linkedin.com/in/rifky-dev</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Relationship Footer Banner */}
            <div className="p-4 rounded-xl bg-pink-950/20 border border-pink-500/20 text-center flex items-center justify-center gap-2 font-mono text-[11px] text-pink-400">
              <Heart className="w-4 h-4 text-pink-500 fill-pink-500 animate-pulse" /> Protected by the Scarlet Gang League
            </div>
          </div>

          {/* Secure Contact Form Column (Right) */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="p-6 md:p-8 rounded-2xl bg-gray-950/60 border border-white/5 backdrop-blur-md space-y-6 relative"
            >
              {/* Top Bar Decoration */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                </div>
                <span className="font-mono text-[10px] text-gray-500">SECURE_TUNNEL: ON</span>
              </div>

              {/* Status Notice */}
              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 rounded-xl bg-green-950/50 border border-green-500/30 text-green-400 flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-mono text-xs font-bold uppercase tracking-wider">Transmission Succeeded</h4>
                      <p className="text-[11px] text-gray-300 font-sans mt-1 leading-normal">
                        Your message packet has been encrypted and securely beamed over standard ports. Rifky will respond via your provided mailbox coordinates.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Inputs */}
              <div className="space-y-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">
                    Sender_Identity (Name)
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name or alias..."
                    className="w-full bg-gray-900/60 border border-white/5 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none transition-all font-sans"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">
                    Mailbox_Coordinates (Email)
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full bg-gray-900/60 border border-white/5 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none transition-all font-sans"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">
                    Message_Packet (Content)
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your encrypted inquiry details..."
                    className="w-full bg-gray-900/60 border border-white/5 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none transition-all font-sans resize-none"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-400 hover:to-pink-400 text-white font-mono text-xs font-bold tracking-widest uppercase cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(236,72,153,0.4)] transition-all duration-300"
              >
                {isSubmitting ? (
                  <>
                    TRANSMITTING PACKET...{" "}
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  </>
                ) : (
                  <>
                    BROADCAST MESSAGE <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Footer Area */}
        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] text-gray-500">
            Crafted with madness by <span className="text-cyan-400">Rifky</span> © 2026
          </p>
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-gray-500">
            <span>Powered by</span>
            <span className="flex items-center gap-1 text-pink-400 font-bold uppercase tracking-wider">
              <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500 animate-pulse" /> Sinta
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}