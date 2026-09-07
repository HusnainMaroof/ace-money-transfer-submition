"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  mobile?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({
  href,
  children,
  onClick,
  mobile,
}) => (
  <a
    href={href}
    onClick={onClick}
    className={
      mobile
        ? "text-3xl tracking-[-0.02em] text-fg font-bold hover:text-accent transition-colors py-2"
        : "text-xs tracking-wider text-fg-muted hover:text-fg transition-colors"
    }
  >
    {children}
  </a>
);

const ThemeToggle: React.FC<{ mobile?: boolean }> = ({ mobile }) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={
        mobile
          ? "flex items-center gap-2 text-fg-muted hover:text-fg transition-colors py-2"
          : "p-2 text-fg-muted hover:text-fg transition-colors cursor-pointer"
      }
    >
      {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
};

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-canvas/80 backdrop-blur-xl py-4 border-b border-line"
            : "bg-transparent py-6 lg:py-8"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center">
            <motion.a
              href="#"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-xs tracking-[0.4em] text-fg font-semibold"
            >
              AM
            </motion.a>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="hidden md:flex items-center gap-10"
            >
              <NavLink href="#work">WORK</NavLink>
              <NavLink href="#about">ABOUT</NavLink>
              <NavLink href="/project">SUBMISSION</NavLink>
              <ThemeToggle />
            </motion.div>

            <motion.a
              href="#contact"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 1 }}
              whileHover={{ scale: 1.02 }}
              className="hidden md:block px-6 py-2.5 border border-line hover:border-fg/30 text-xs tracking-wider transition-colors text-fg"
            >
              LET&apos;S TALK
            </motion.a>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-fg z-50 relative"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 90% 5%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 90% 5%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 90% 5%)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-canvas md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full space-y-6 px-6">
              <NavLink href="#work" mobile onClick={() => setIsMenuOpen(false)}>
                WORK
              </NavLink>
              <NavLink
                href="#about"
                mobile
                onClick={() => setIsMenuOpen(false)}
              >
                ABOUT
              </NavLink>
              <NavLink
                href="/project"
                mobile
                onClick={() => setIsMenuOpen(false)}
              >
                SUBMISSION
              </NavLink>
              <ThemeToggle mobile />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="pt-12 text-center"
              >
                <p className="text-fg-muted text-[10px] tracking-[0.3em] uppercase mb-2">
                  Get in touch
                </p>
                <p className="text-fg font-mono text-sm">
                  hello@aamirmaroof.com
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}