"use client";

import { PostGroup } from "@/app/StaticData/data";
import React, { createContext, useContext, useEffect, useState } from "react";


type AppContextType = {
  activeProject: PostGroup | null;
  setActiveProject: (data: PostGroup) => void;
  clearProject: () => void;
};

const AppContext = createContext<AppContextType | null>(null);

// ---------- TTL HELPERS ----------
const setWithExpiry = (key: string, value: any, ttl: number) => {
  const now = Date.now();

  const item = {
    value,
    expiry: now + ttl,
  };

  localStorage.setItem(key, JSON.stringify(item));
};

const getWithExpiry = (key: string) => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  try {
    const item = JSON.parse(itemStr);
    const now = Date.now();

    if (now > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }

    return item.value;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
};

// ---------- PROVIDER ----------
export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeProject, setActiveProjectState] =
    useState<PostGroup | null>(null);

  const [mounted, setMounted] = useState(false);

  // prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // ---------- LOAD FROM STORAGE ----------
  useEffect(() => {
    if (!mounted) return;

    const saved = getWithExpiry("activeProject");
    if (saved) {
      setActiveProjectState(saved);
    }
  }, [mounted]);

  // ---------- SET + SAVE ----------
  const setActiveProject = (data: PostGroup) => {
    setActiveProjectState(data);

    // 5 min TTL (adjust as needed)
    setWithExpiry("activeProject", data, 5 * 60 * 1000);
  };

  // ---------- CLEAR ----------
  const clearProject = () => {
    localStorage.removeItem("activeProject");
    setActiveProjectState(null);
  };

  if (!mounted) return null;

  return (
    <AppContext.Provider
      value={{ activeProject, setActiveProject, clearProject }}
    >
      {children}
    </AppContext.Provider>
  );
};

// ---------- HOOK ----------
export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("AppContext not found");
  return ctx;
};