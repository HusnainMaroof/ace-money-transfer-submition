"use client";
import React, { useState } from "react";
import {
  ArrowRight,
  ShieldCheck,
  Settings,
  Activity,
  Loader2,
  Lock,
  EyeOff,
  Eye,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "@/context/AppContext";
import { POST_GROUPS } from "../StaticData/data";
import { useRouter } from "next/navigation"; // ✅ CORRECT

// --- Interfaces ---

export type Terminal = {
  id: number;
  name: string;
  code: string;
  password: string;
  logoImg: string;
  route: string;
  projectId: number;
};

interface VaultCardProps {
  terminal: Terminal;
  index: number;
  onVerified: (terminal: Terminal) => void;
}

// --- Mock Data ---

export const VAULT_TERMINALS: Terminal[] = [
  {
    id: 1,
    name: "Ace Money transfer",
    code: "TRX-01",
    password: "ace1",
    route: "/project/Acemoneytransfer",
    logoImg:
      "https://res.cloudinary.com/dwtskde96/image/upload/v1776787100/logo_y2klhn.svg",
    projectId: 1,
  },
  {
    id: 2,
    name: "Crispies uk",
    code: "GLN-02",
    password: "crispiesuk1",
    logoImg: "https://irp.cdn-website.com/f3edc476/dms3rep/multi/Asset+11+new-cbf9cc0a.svg",
    route: "/project/Crispiesuk",
    projectId: 2,
  },

];
// --- Components ---

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
      className={`relative w-full aspect-square bg-[#0D0D0D] border ${error ? "border-red-500" : "border-white/5"} rounded-[40px] p-8 flex flex-col items-center justify-center shadow-2xl overflow-hidden group transition-colors duration-300`}
    >
      <div className="absolute inset-0 bg-red-600/[0.01] group-hover:bg-red-600/[0.03] blur-[80px] transition-colors duration-700 pointer-events-none" />

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
                className="w-[110px] h-[110px] md:w-[150px] md:h-[150px] shrink-0 rounded-full border border-neutral-800 p-1 cursor-pointer bg-black shadow-2xl relative "
              >
                <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center ">
                  <img
                    src={terminal.logoImg}
                    
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity  duration-700"
                  />
                </div>
              </motion.div>
              <h2 className="text-[12px] font-bold tracking-[0.4em] text-white  uppercase mb-1 text-center font-sans pt-3">
                {terminal.name}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="w-full px-4 mt-4">
              <div
                className={`relative border-b ${
                  error
                    ? "border-red-500"
                    : "border-white/10 focus-within:border-red-500/40"
                } transition-all duration-500 pb-2 flex items-center`}
              >
                {/* Input */}
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent text-white text-center font-light placeholder:text-white/5 focus:outline-none text-sm tracking-[0.3em]"
                />

                {/* 👁 Toggle */}
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()} // prevent focus loss
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute left-0 text-white/20 hover:text-white/60 transition"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>

                {/* ➡ Submit */}
                <button
                  type="submit"
                  disabled={!password}
                  className={`absolute right-0 cursor-pointer transition-all duration-500 ${
                    password
                      ? "text-red-500 opacity-100"
                      : "text-white/5 opacity-0 translate-x-4"
                  }`}
                >
                  <ArrowRight size={18} />
                </button>
              </div>

              {/* Error */}
              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[8px] text-red-500 font-bold uppercase tracking-widest mt-2 text-center"
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
            <div className="w-16 h-16 rounded-full bg-red-600/10 border border-red-500/20 flex items-center justify-center mb-4">
              <ShieldCheck size={28} className="text-red-500 animate-pulse" />
            </div>
            <h3 className="text-white font-bold text-sm mb-1 uppercase tracking-widest">
              Verified
            </h3>
            <p className="text-white/30 text-[9px] font-mono tracking-widest uppercase">
              Authorizing {terminal.code}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// --- Main App ---

export default function Vault() {
  const [redirecting, setRedirecting] = useState<Terminal | null>(null);
  const {   setActiveProject } = useAppContext();
  const router = useRouter();
  const handleVerified = (terminal: Terminal) => {
    setRedirecting(terminal);

    // console.log(terminal);
    const group = POST_GROUPS.find((g) => g.projectId === terminal.projectId);

   setActiveProject(group!);

    // console.log(group);

    setTimeout(() => {
      router.push(terminal.route);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-red-500/30 py-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        {/* Header Section */}
        <header className="flex flex-col items-center mb-20">
          <h1 className="text-lg font-black tracking-[0.6em] text-white uppercase underline decoration-red-600 underline-offset-8">
            Projects
          </h1>
        </header>

        {/* The Grid */}
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

        {/* Global Action Footer */}
        <footer className="mt-20 flex justify-center space-x-6">
          <button className="flex items-center space-x-2 text-[10px] font-black tracking-[0.3em] text-white/20 hover:text-red-500/60 transition-colors uppercase cursor-pointer">
            <Settings size={12} />
            <span>Node Settings</span>
          </button>
          <div className="w-px h-3 bg-white/5" />
          <button className="flex items-center space-x-2 text-[10px] font-black tracking-[0.3em] text-white/20 hover:text-red-500/60 transition-colors uppercase cursor-pointer">
            <Activity size={12} />
            <span>Audit Logs</span>
          </button>
        </footer>

        {/* Redirect Overlay */}
        <AnimatePresence>
          {redirecting && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-[#050505]/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center"
              >
                <div className="relative mb-10">
                  <Loader2 size={48} className="text-red-600 animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Lock size={16} className="text-red-600 opacity-40" />
                  </div>
                </div>
                <h2 className="text-xl font-black text-white tracking-[0.4em] uppercase mb-4">
                  Redirecting
                </h2>
                <p className="text-white/40 text-[10px] font-mono tracking-[0.3em] uppercase">
                  Opening Secure Route: {redirecting.route}
                </p>
                <button
                  onClick={() => setRedirecting(null)}
                  className="mt-12 text-[9px] font-black text-white/20 hover:text-white uppercase tracking-widest cursor-pointer underline underline-offset-4"
                >
                  Cancel Redirection
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        body { background-color: #050505; }
        ::placeholder { 
          text-align: center; 
          text-transform: uppercase;
          font-size: 9px;
          letter-spacing: 0.3em;
          font-weight: 900;
          opacity: 0.2;
        }
      `,
        }}
      />
    </div>
  );
}
