"use client";
import React, { useState } from "react";
import {
  ArrowRight,
  ShieldCheck,
  Loader2,
  Lock,
  EyeOff,
  Eye,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "@/context/AppContext";
import { POST_GROUPS, type Terminal, VAULT_TERMINALS } from "../StaticData/data";
import { useRouter } from "next/navigation";

interface VaultCardProps {
  terminal: Terminal;
  index: number;
  onVerified: (terminal: Terminal) => void;
}

const VaultCard: React.FC<VaultCardProps> = ({
  terminal,
  index,
  onVerified,
}) => {
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);

    if (password === terminal.password) {
      setIsVerifying(true);
      setTimeout(() => {
        onVerified(terminal);
      }, 800);
    } else {
      setError(true);
      setTimeout(() => setError(false), 600);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`relative w-full aspect-square bg-surface border ${error ? "border-accent" : "border-line"} rounded-[40px] p-8 flex flex-col items-center justify-center shadow-2xl overflow-hidden group transition-colors duration-300`}
    >
      <div className="absolute inset-0 bg-accent/[0.01] group-hover:bg-accent/[0.03] blur-[80px] transition-colors duration-700 pointer-events-none" />

      <AnimatePresence mode="wait">
        {!isVerifying ? (
          <motion.div
            key="input-form"
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full flex flex-col items-center z-10"
          >
            <div className="flex flex-col items-center mb-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-[110px] h-[110px] md:w-[150px] md:h-[150px] shrink-0 rounded-full border border-line p-1 cursor-pointer bg-canvas shadow-2xl relative"
              >
                <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center">
                  <img
                    src={terminal.logoImg}
                    alt={terminal.name}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                  />
                </div>
              </motion.div>
              <h2 className="text-[12px] font-bold tracking-[0.4em] text-fg uppercase mb-1 text-center font-sans pt-3">
                {terminal.name}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="w-full px-4 mt-4">
              <div
                className={`relative border-b ${
                  error
                    ? "border-accent"
                    : "border-line focus-within:border-accent/40"
                } transition-all duration-500 pb-2 flex items-center`}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent text-fg text-center font-light focus:outline-none text-sm tracking-[0.3em]"
                />

                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute left-0 text-fg-muted hover:text-fg transition cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>

                <button
                  type="submit"
                  disabled={!password}
                  className={`absolute right-0 cursor-pointer transition-all duration-500 ${
                    password
                      ? "text-accent opacity-100"
                      : "text-fg-muted/20 opacity-0 translate-x-4"
                  }`}
                >
                  <ArrowRight size={18} />
                </button>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[8px] text-accent font-bold uppercase tracking-widest mt-2 text-center"
                >
                  Invalid Key
                </motion.p>
              )}
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="verifying"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center z-10 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
              <ShieldCheck size={28} className="text-accent animate-pulse" />
            </div>
            <h3 className="text-fg font-bold text-sm mb-1 uppercase tracking-widest">
              Verified
            </h3>
            <p className="text-fg-muted text-[9px] font-mono tracking-widest uppercase">
              Authorizing {terminal.code}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function Vault() {
  const [redirecting, setRedirecting] = useState<Terminal | null>(null);
  const { setActiveProject } = useAppContext();
  const router = useRouter();

  const handleVerified = (terminal: Terminal) => {
    setRedirecting(terminal);

    const group = POST_GROUPS.find((g) => g.projectId === terminal.projectId);

    if (!group) {
      console.error("Project not found");
      return;
    }

    setActiveProject(group);

    setTimeout(() => {
      router.push(terminal.route);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-canvas text-fg font-sans py-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        <header className="flex flex-col items-center mb-20">
          <h1 className="text-lg font-black tracking-[0.6em] text-fg uppercase underline decoration-accent underline-offset-8">
            Projects
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {VAULT_TERMINALS.map((terminal, idx) => (
            <VaultCard
              key={terminal.id}
              terminal={terminal}
              index={idx}
              onVerified={handleVerified}
            />
          ))}
        </div>

        <AnimatePresence>
          {redirecting && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-canvas/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center"
              >
                <div className="relative mb-10">
                  <Loader2 size={48} className="text-accent animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Lock size={16} className="text-accent opacity-40" />
                  </div>
                </div>
                <h2 className="text-xl font-black text-fg tracking-[0.4em] uppercase mb-4">
                  Redirecting
                </h2>
                <p className="text-fg-muted text-[10px] font-mono tracking-[0.3em] uppercase">
                  Opening Secure Route: {redirecting.route}
                </p>
                <button
                  onClick={() => setRedirecting(null)}
                  className="mt-12 text-[9px] font-black text-fg-muted hover:text-fg uppercase tracking-widest cursor-pointer underline underline-offset-4"
                >
                  Cancel Redirection
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}