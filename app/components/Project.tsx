"use client";

import React, { useState, useEffect } from "react";
import { Grid, X, Film, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";
import Unauthorized from "./Unauthorized";
import type { Post } from "../StaticData/types";

const customEase: [number, number, number, number] = [0.16, 1, 0.3, 1];
const RESOLUTIONS = ["1080x1920", "1920x1080"] as const;
type Resolution = (typeof RESOLUTIONS)[number];

const getAspectRatioClass = (res?: string) => {
  if (res === "1080x1920") return "aspect-[9/16]";
  if (res === "1920x1080") return "aspect-video";
  if (res === "1080x1440") return "aspect-[3/4]";
  return "aspect-[9/16]";
};

const Projects = () => {
  const { activeProject, loading } = useAppContext();
  const posts = activeProject?.posts ?? [];
  const projectName = activeProject?.projectName;

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [activeTab, setActiveTab] = useState<"thumbnails" | "motion">(
    "thumbnails",
  );
  const [motionResolution, setMotionResolution] =
    useState<Resolution>("1080x1920");

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedPost(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedPost ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedPost]);

  const logo = posts.find((p) => p.category === "logo");
  const imagePosts = posts.filter((p) => p.category === "thumbnail");
  const videoPosts = posts.filter(
    (p) => p.category === "motion" && p.res === motionResolution,
  );

  const tabContentVariants = {
    initial: { opacity: 0, y: 10, filter: "blur(4px)" },
    animate: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: customEase },
    },
    exit: {
      opacity: 0,
      y: -10,
      filter: "blur(4px)",
      transition: { duration: 0.3 },
    },
  };

  if (loading) return null;

  if (!activeProject) {
    return <Unauthorized />;
  }

  return (
    <div className="bg-canvas min-h-screen text-fg font-sans antialiased selection:bg-accent/30">
      <main className="w-full max-w-[935px] mx-auto pt-10 md:pt-16 pb-20 px-4 md:px-0">
        <Link href={"/project"}>
          <span className="text-fg text-xl underline cursor-pointer mb-8 inline-block">
            Back
          </span>
        </Link>

        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: customEase }}
          className="flex flex-col md:flex-row items-center gap-8 md:gap-12 mb-16 md:mb-24 md:pl-8 text-center md:text-left"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-[110px] h-[110px] md:w-[150px] md:h-[150px] shrink-0 rounded-full border border-line p-1 cursor-pointer bg-surface shadow-2xl relative"
          >
            <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center">
              <img
                src={logo?.src || "https://via.placeholder.com/150"}
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                alt="Project Logo"
              />
            </div>
          </motion.div>

          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-3xl md:text-4xl font-black text-fg tracking-[0.25em] cursor-default uppercase text-balance">
              {projectName}
            </h1>
          </div>
        </motion.header>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: customEase }}
        >
          <div className="flex justify-center border-t border-line gap-12 md:gap-32">
            <button
              onClick={() => setActiveTab("thumbnails")}
              className={`flex items-center gap-3 py-6 border-t cursor-pointer focus:outline-none -mt-[1px] text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] transition-all duration-500 ${
                activeTab === "thumbnails"
                  ? "border-fg text-fg"
                  : "border-transparent text-fg-muted hover:text-fg"
              }`}
            >
              <Grid size={14} /> Thumbnails
            </button>
            <button
              onClick={() => setActiveTab("motion")}
              className={`flex items-center gap-3 py-6 border-t cursor-pointer focus:outline-none -mt-[1px] text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] transition-all duration-500 ${
                activeTab === "motion"
                  ? "border-fg text-fg"
                  : "border-transparent text-fg-muted hover:text-fg"
              }`}
            >
              <Film size={14} /> Motion Graphics
            </button>
          </div>

          <div className="mt-8 md:mt-12 min-h-[500px]">
            <AnimatePresence mode="wait">
              {activeTab === "thumbnails" && (
                <motion.div
                  key="images"
                  variants={tabContentVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="columns-2 md:columns-3 gap-3 md:gap-6 space-y-3 md:space-y-6"
                >
                  {imagePosts.length === 0 ? (
                    <div className="col-span-full py-24 text-center text-fg-muted tracking-widest text-sm uppercase font-black">
                      No thumbnails yet.
                    </div>
                  ) : (
                    imagePosts.map((post) => (
                      <motion.div
                        key={post.id}
                        whileHover={{ y: -5 }}
                        className={`break-inside-avoid w-full ${getAspectRatioClass(post.res)} bg-surface-2 relative group cursor-pointer overflow-hidden rounded-[24px] border border-line`}
                        onClick={() => setSelectedPost(post)}
                      >
                        <img
                          src={post.src}
                          alt={post.caption}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-canvas/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                          <span className="text-[9px] font-black uppercase tracking-widest text-accent mb-1">
                            {post.res?.replace("x", " × ") || "VIEW"}
                          </span>
                        </div>
                      </motion.div>
                    ))
                  )}
                </motion.div>
              )}

              {activeTab === "motion" && (
                <motion.div
                  key="videos"
                  variants={tabContentVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <div className="flex justify-center gap-10 mb-12">
                    {RESOLUTIONS.map((res) => (
                      <button
                        key={res}
                        onClick={() => setMotionResolution(res)}
                        className={`text-[9px] font-black tracking-[0.3em] uppercase transition-all duration-500 cursor-pointer pb-1 ${
                          motionResolution === res
                            ? "text-fg border-b-2 border-accent"
                            : "text-fg-muted hover:text-fg"
                        }`}
                      >
                        {res.replace("x", " × ")}
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-col items-center gap-12 w-full max-w-4xl mx-auto">
                    {videoPosts.length === 0 ? (
                      <div className="py-20 text-center text-fg-muted tracking-widest uppercase text-sm font-black">
                        No projects for this resolution.
                      </div>
                    ) : (
                      videoPosts.map((post) => (
                        <motion.div
                          key={`${activeProject?.projectId}-${post.id}`}
                          whileHover={{ scale: 1.01 }}
                          transition={{ duration: 0.4 }}
                          className={`w-full bg-surface-2 relative group cursor-pointer overflow-hidden rounded-[32px] border border-line shadow-2xl ${
                            motionResolution === "1080x1920"
                              ? "aspect-[9/16] max-w-[340px]"
                              : "aspect-video max-w-full"
                          }`}
                          onClick={() => setSelectedPost(post)}
                        >
                          <video
                            src={post.src}
                            muted
                            loop
                            playsInline
                            autoPlay
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                          />
                          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                            <div className="w-16 h-16 rounded-full bg-canvas/50 backdrop-blur-md flex justify-center items-center border border-line text-fg shadow-2xl group-hover:bg-accent/20 group-hover:border-accent/40 transition-all duration-500">
                              <Play className="ml-1 fill-current" size={24} />
                            </div>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </main>

      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-canvas/95 p-4 md:p-10 backdrop-blur-xl"
            onClick={() => setSelectedPost(null)}
          >
            <button
              className="absolute top-10 right-10 text-fg-muted hover:text-fg transition-colors z-50 cursor-pointer focus:outline-none"
              onClick={() => setSelectedPost(null)}
              aria-label="Close preview"
            >
              <X size={40} strokeWidth={1} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[1200px] flex flex-col md:flex-row items-center justify-center gap-10"
            >
              <div className="relative flex items-center justify-center w-full max-h-[80vh]">
                {selectedPost.type === "video" ? (
                  <video
                    src={selectedPost.src}
                    controls
                    autoPlay
                    className="w-auto max-w-full max-h-[80vh] rounded-[24px] shadow-2xl"
                  />
                ) : (
                  <img
                    src={selectedPost.src}
                    alt={selectedPost.caption}
                    className="w-auto max-w-full max-h-[80vh] object-contain rounded-[24px] shadow-2xl"
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;