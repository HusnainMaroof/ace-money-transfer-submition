"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const GlitchText: React.FC<{ text: string }> = ({ text }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "!@#$%^&*()_+NKJNKLM<>?:{}[]";

  const triggerGlitch = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        prev
          .split("")
          .map((letter, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join(""),
      );

      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
  };

  useEffect(() => {
    const timer = setTimeout(triggerGlitch, 1500);
    return () => clearTimeout(timer);
  }, [text]);

  return <span onMouseEnter={triggerGlitch}>{displayText}</span>;
};

export default function HeroSection() {
  // Explicitly typing the ease curve as a tuple to resolve TypeScript strictness
  const customEase: [number, number, number, number] = [0.76, 0, 0.24, 1];

  return (
    <section className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden py-20 lg:py-0">
      {/* Background visual elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-black to-purple-600/5" />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 w-full max-w-[95vw] lg:max-w-7xl mx-auto px-6 lg:px-12">
        {/* Sub-header reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: customEase }}
          className="mb-6 flex items-center gap-4"
        >
          <div className="w-10 h-px bg-white/20" />
          <span className="text-[10px] tracking-[0.4em] text-neutral-500 uppercase">
            Aamir Maroof
          </span>
        </motion.div>

        {/* Main Title lines */}
        <div className="space-y-1 lg:space-y-2 mb-10 lg:mb-14">
          {["VISUAL", "DESIGNER", "& DIGITAL"].map((text, i) => (
            <div key={text} className="overflow-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1.2,
                  delay: 0.5 + i * 0.1,
                  ease: customEase,
                }}
                className={`text-[15vw] lg:text-[10vw] leading-[0.8] tracking-[-0.04em] font-bold ${
                  i === 2 ? "text-neutral-800" : "text-white"
                }`}
              >
                {text}
              </motion.h1>
            </div>
          ))}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, delay: 0.85, ease: customEase }}
              className="text-[15vw] lg:text-[10vw] leading-[0.8] tracking-[-0.04em] text-white font-bold"
            >
              <GlitchText text="CREATOR" />
            </motion.h1>
          </div>
        </div>

        {/* Action area */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: customEase }}
          className="flex flex-col sm:flex-row gap-8 sm:gap-20 items-start"
        >
          <div className="max-w-xs lg:max-w-sm">
            <p className="text-[13px] lg:text-base text-neutral-500 tracking-wide font-medium leading-relaxed">
              Based in Earth. Specialized in high-end animation, motion
              graphics, and minimalist product interfaces.
            </p>
          </div>

          <div className="flex gap-12">
            <motion.a
              href="#work"
              whileHover={{ x: 8 }}
              className="group flex items-center gap-3 text-white"
            >
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase">
                Works
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ x: 8 }}
              className="group flex items-center gap-3 text-neutral-500 hover:text-white transition-colors"
            >
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase">
                Contact
              </span>
              <div className="w-6 h-px bg-neutral-700 group-hover:w-10 group-hover:bg-white transition-all duration-500" />
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Vertical Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <div className="h-12 w-px bg-neutral-800 relative overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-white/40"
          />
        </div>
      </motion.div>
    </section>
  );
}
