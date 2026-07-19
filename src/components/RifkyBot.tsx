"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, CornerDownLeft, Sparkles, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const PRESETS = [
  { label: "Siapa Sinta? ❤️", text: "Siapa itu Sinta?" },
  { label: "Rifky's Skills 🚀", text: "What are Rifky's main technical skills?" },
  { label: "Hire Rifky! 💼", text: "How can I hire Rifky or contact him for a project?" },
  { label: "Multi-AI Bot? 🤖", text: "Tell me about your Multi-AI Bot project." }
];

export default function RifkyBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm **RifkyBot**, the AI clone of Rifky. 🤖\n\nAsk me anything about my full-stack development skills, projects, or my beautiful queen **Sinta** (she is my senior & the boss of the Scarlet gang! ❤️).\n\nWhat would you like to explore today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Listen to custom event to open bot from anywhere
  useEffect(() => {
    const handleOpenBot = () => {
      setIsOpen(true);
    };
    window.addEventListener("open-rifky-bot", handleOpenBot);
    return () => {
      window.removeEventListener("open-rifky-bot", handleOpenBot);
    };
  }, []);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const chatHistory = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: chatHistory }),
      });

      if (!res.ok) {
        throw new Error("Failed to contact the matrix.");
      }

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Oops! Connection to the AI matrix was interrupted. Please check your internet or API key configuration, and try again! 🌐⚡",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Format markdown-like text in chat
  const formatMessageText = (text: string) => {
    // Bold matches **text**
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={index} className="text-cyan-400 font-semibold">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-pink-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.5)] cursor-pointer hover:scale-110 active:scale-95 transition-transform duration-200 relative`}
          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <div className="relative">
              <MessageSquare className="w-6 h-6" />
              <span className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-pink-500"></span>
              </span>
            </div>
          )}
        </motion.button>
      </div>

      {/* Floating Chat Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-24 right-6 w-[92vw] sm:w-[420px] h-[550px] bg-gray-950/95 border border-cyan-500/30 rounded-2xl shadow-[0_15px_50px_-15px_rgba(0,0,0,0.8),_0_0_40px_rgba(6,182,212,0.15)] z-40 backdrop-blur-xl flex flex-col overflow-hidden"
          >
            {/* Chat Header */}
            <div className="p-4 bg-gradient-to-r from-gray-900 to-gray-950 border-b border-cyan-500/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-cyan-950 border border-cyan-400/40 flex items-center justify-center text-cyan-400">
                    <Bot className="w-5 h-5 animate-pulse" />
                  </div>
                  <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-gray-950 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-mono text-sm font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400 flex items-center gap-1.5">
                    RIFKY_BOT <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                  </h3>
                  <p className="text-[10px] font-mono text-gray-400 flex items-center gap-1">
                    System: Llama-3.3-70b <Heart className="w-2.5 h-2.5 text-rose-500 fill-rose-500 animate-pulse" /> Sinta
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-cyan-500/20 scrollbar-track-transparent">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2.5 ${
                    msg.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs shrink-0 border ${
                      msg.role === "user"
                        ? "bg-pink-950/50 border-pink-500/30 text-pink-400"
                        : "bg-cyan-950/50 border-cyan-500/30 text-cyan-400"
                    }`}
                  >
                    {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[75%] p-3 rounded-2xl text-xs leading-relaxed font-sans whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "bg-pink-900/10 border border-pink-500/20 text-gray-200 rounded-tr-none"
                        : "bg-gray-900/50 border border-cyan-500/10 text-gray-200 rounded-tl-none"
                    }`}
                  >
                    {formatMessageText(msg.content)}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-400 flex items-center justify-center text-xs shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-gray-900/50 border border-cyan-500/10 p-3 rounded-2xl rounded-tl-none max-w-[75%]">
                    <div className="flex space-x-1.5 items-center h-4 px-1.5">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Presets / Suggestions */}
            {messages.length < 3 && (
              <div className="px-4 py-2 border-t border-gray-900 flex flex-wrap gap-2">
                {PRESETS.map((p, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(p.text)}
                    className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-gray-900 border border-cyan-500/20 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400/50 transition-colors"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            )}

            {/* Chat Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(input);
              }}
              className="p-4 bg-gray-950 border-t border-cyan-500/20 flex gap-2 items-center"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Talk to RifkyBot... (try: Siapa Sinta?)"
                className="flex-1 bg-gray-900 border border-cyan-500/20 focus:border-cyan-400/50 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 font-sans"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-400 hover:to-pink-400 text-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}