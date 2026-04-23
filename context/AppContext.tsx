"use client";

import { PostGroup } from "@/app/StaticData/data";
import React, { createContext, useContext, useEffect, useState } from "react";

type AppContextType = {
  activeProject: PostGroup | null;
  loading: boolean;
  setActiveProject: (data: PostGroup) => void;
  clearProject: () => void;
};

const AppContext = createContext<AppContextType | null>(null);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeProject, setActiveProjectState] = useState<PostGroup | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const itemStr = localStorage.getItem("activeProject");

    if (itemStr) {
      try {
        const parsed = JSON.parse(itemStr);
        setActiveProjectState(parsed);
      } catch {
        localStorage.removeItem("activeProject");
      }
    }

    setLoading(false);
  }, []);

  const setActiveProject = (data: PostGroup) => {
    setActiveProjectState(data);
    localStorage.setItem("activeProject", JSON.stringify(data));
  };

  const clearProject = () => {
    localStorage.removeItem("activeProject");
    setActiveProjectState(null);
  };

  // 🔥 prevents hydration mismatch
  if (!isClient) return null;

  return (
    <AppContext.Provider
      value={{ activeProject, setActiveProject, clearProject, loading }}
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
