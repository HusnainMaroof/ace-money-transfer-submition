"use client";

import React, {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import type { PostGroup } from "@/app/StaticData/types";

type AppContextType = {
  activeProject: PostGroup | null;
  loading: boolean;
  setActiveProject: (data: PostGroup) => void;
  clearProject: () => void;
};

const STORAGE_KEY = "activeProject";

let currentProject: PostGroup | null = null;
let hydrated = false;
const listeners = new Set<() => void>();

let clientSnapshot: { activeProject: PostGroup | null; loading: boolean } = {
  activeProject: null,
  loading: true,
};

const serverSnapshot = { activeProject: null, loading: true };

function rebuild() {
  clientSnapshot = { activeProject: currentProject, loading: !hydrated };
  listeners.forEach((l) => l());
}

function hydrate() {
  if (hydrated) return;
  hydrated = true;
  if (typeof window !== "undefined") {
    const itemStr = localStorage.getItem(STORAGE_KEY);
    if (itemStr) {
      try {
        currentProject = JSON.parse(itemStr) as PostGroup;
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }
  rebuild();
}

export function setActiveProject(data: PostGroup) {
  currentProject = data;
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
  rebuild();
}

export function clearProject() {
  currentProject = null;
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
  }
  rebuild();
}

function subscribe(callback: () => void) {
  if (!hydrated) hydrate();
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function getSnapshot() {
  return clientSnapshot;
}

function getServerSnapshot() {
  return serverSnapshot;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const data = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const value = useMemo<AppContextType>(
    () => ({
      activeProject: data.activeProject,
      loading: data.loading,
      setActiveProject,
      clearProject,
    }),
    [data],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("AppContext not found");
  return ctx;
};