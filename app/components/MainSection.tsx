"use client";

import React, { useState, useEffect } from "react";
import { Heart, Grid, X, Film, Play } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

// --- TYPES ---
type Post = {
  id: number;
  type: "image" | "video";
  src: string;
  likes: string;
  caption: string;
  res?: "1080x1920" | "1920x1080"; // Added resolution property to type
};

// --- MOCK DATA ---
const PROFILE_USER = {
  username: "ace money transfer",
  subtitle: "Visual Identity & Motion",
  avatar: "/photos/logo.svg",
};

const POSTS: Post[] = [
  {
    id: 1,
    type: "image",
    src: "/photos/img1.png",
    likes: "4.2k",
    caption: "Clean lines and natural light. 🏛️✨ #architecture",
  },
  {
    id: 2,
    type: "image",
    src: "/photos/img4.png",
    likes: "5.1k",
    caption: "Concrete and wood textures blending seamlessly.",
  },
  {
    id: 3,
    type: "image",
    src: "/photos/img2.png",
    likes: "3.8k",
    caption: "Interior details that matter. 🛋️",
  },
  {
    id: 4,
    type: "image",
    src: "/photos/img3.jpeg",
    likes: "5.1k",
    caption: "Concrete and wood textures blending seamlessly.",
  },
  {
    id: 5,
    type: "image",
    src: "/photos/img6.webp",
    likes: "5.1k",
    caption: "Concrete and wood textures blending seamlessly.",
  },
  {
    id: 6,
    type: "image",
    src: "/photos/img5.webp",
    likes: "5.1k",
    caption: "Concrete and wood textures blending seamlessly.",
  },
  {
    id: 7,
    type: "video",
    src: "/videos/AMT IS.mp4",
    likes: "5.1k",
    caption: "Vertical motion study - Abstract flows.",
    res: "1080x1920",
  },
  {
    id: 8,
    type: "video",
    src: "/videos/AMT L.mp4",
    likes: "5.1k",
    caption: "Horizontal motion study - Abstract flows.",
    res: "1920x1080",
  },
];

// Strictly typed easing curve to fix TS number[] inference error
const customEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function ProfilePage() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [activeTab, setActiveTab] = useState<"thumbnails" | "motion">(
    "thumbnails",
  );
  const [motionResolution, setMotionResolution] = useState<
    "1080x1920" | "1920x1080"
  >("1080x1920");

  // --- HANDLERS ---
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedPost(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedPost ? "hidden" : "unset";
  }, [selectedPost]);

  // --- FILTERS ---
  const imagePosts = POSTS.filter((p) => p.type === "image");

  // Filter videos dynamically based on the selected resolution tab
  const videoPosts = POSTS.filter(
    (p) => p.type === "video" && p.res === motionResolution,
  );

  // --- ANIMATION VARIANTS ---
  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const gridItem: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  const tabContentVariants: Variants = {
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

  return (
    <div className="bg-black min-h-screen text-neutral-200 font-sans antialiased selection:bg-neutral-800">
      <main className="w-full max-w-[935px] mx-auto pt-10 md:pt-16 pb-20 px-4 md:px-0">
        {/* HEADER */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: customEase }}
          className="flex flex-col md:flex-row items-center md:items-center gap-6 md:gap-12 mb-12 md:mb-20 md:pl-8 text-center md:text-left"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="w-[100px] h-[100px] md:w-[130px] md:h-[130px] shrink-0 rounded-full border border-neutral-800 p-1 cursor-pointer transition-transform duration-500"
          >
            <div className="w-full h-full rounded-full overflow-hidden bg-red-[#C4161C] ">
              <img
                src={PROFILE_USER.avatar}
                alt={`${PROFILE_USER.username} Logo`}
                className="w-full h-full object-fit opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>
          </motion.div>

          <div className="flex flex-col items-center md:items-start w-full">
            <h1 className="text-3xl md:text-4xl font-light text-white tracking-[0.2em] cursor-default">
              {PROFILE_USER.username}
            </h1>
          </div>
        </motion.header>

        {/* TABS */}
        <div className="flex justify-center border-t border-neutral-900 gap-12 md:gap-32">
          <button
            onClick={() => setActiveTab("thumbnails")}
            className={`flex items-center gap-3 py-6 border-t cursor-pointer focus:outline-none ${activeTab === "thumbnails" ? "border-white text-white" : "border-transparent text-neutral-600 hover:text-neutral-300"} text-[11px] md:text-[12px] font-medium tracking-[0.25em] -mt-[1px] transition-all duration-300`}
          >
            <Grid
              size={14}
              strokeWidth={activeTab === "thumbnails" ? 2 : 1.5}
            />{" "}
            Thumbnails
          </button>
          <button
            onClick={() => setActiveTab("motion")}
            className={`flex items-center gap-3 py-6 border-t cursor-pointer focus:outline-none ${activeTab === "motion" ? "border-white text-white" : "border-transparent text-neutral-600 hover:text-neutral-300"} text-[11px] md:text-[12px] font-medium tracking-[0.25em] -mt-[1px] transition-all duration-300`}
          >
            <Film size={14} strokeWidth={activeTab === "motion" ? 2 : 1.5} />{" "}
            Motions Ghraphic
          </button>
        </div>

        {/* TAB CONTENT */}
        <div className="mt-4 md:mt-8 min-h-[400px]">
          <AnimatePresence mode="wait">
            {/* THUMBNAILS (IMAGES) */}
            {activeTab === "thumbnails" && (
              <motion.div
                key="images"
                variants={tabContentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4"
                >
                  {imagePosts.map((post) => (
                    <motion.div
                      key={post.id}
                      variants={gridItem}
                      // Enforce 1080x1920 ratio
                      className="aspect-[9/16] bg-neutral-900 relative group cursor-pointer overflow-hidden rounded-xl"
                      onClick={() => setSelectedPost(post)}
                    >
                      <motion.img
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.7, ease: customEase }}
                        src={post.src}
                        className="w-full h-full object-cover"
                      />
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center gap-6">
                        <div className="flex items-center gap-2 text-white font-medium tracking-wide transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                          View Project
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}

            {/* MOTION (VIDEOS) */}
            {activeTab === "motion" && (
              <motion.div
                key="videos"
                variants={tabContentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex flex-col"
              >
                {/* RESOLUTION SWITCH */}
                <div className="flex justify-center gap-8 md:gap-16 mb-8 md:mb-12">
                  <button
                    onClick={() => setMotionResolution("1080x1920")}
                    className={`text-[10px] md:text-[11px] tracking-[0.2em] transition-all duration-300 cursor-pointer focus:outline-none ${motionResolution === "1080x1920" ? "text-white font-medium border-b border-white pb-1" : "text-neutral-600 hover:text-neutral-300 border-b border-transparent pb-1"}`}
                  >
                    1080 × 1920
                  </button>
                  <button
                    onClick={() => setMotionResolution("1920x1080")}
                    className={`text-[10px] md:text-[11px] tracking-[0.2em] transition-all duration-300 cursor-pointer focus:outline-none ${motionResolution === "1920x1080" ? "text-white font-medium border-b border-white pb-1" : "text-neutral-600 hover:text-neutral-300 border-b border-transparent pb-1"}`}
                  >
                    1920 × 1080
                  </button>
                </div>

                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="show"
                  className={`grid gap-2 md:gap-4 transition-all duration-500 ${motionResolution === "1080x1920" ? "grid-cols-2 md:grid-cols-3" : "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto w-full"}`}
                >
                  {videoPosts.length === 0 && (
                    <div className="col-span-full py-12 text-center text-neutral-600 tracking-widest text-sm uppercase">
                      No projects found for this resolution.
                    </div>
                  )}
                  {videoPosts.map((post) => (
                    <motion.div
                      key={post.id}
                      variants={gridItem}
                      className={`${motionResolution === "1080x1920" ? "aspect-[9/16]" : "aspect-video"} bg-neutral-900 relative group cursor-pointer overflow-hidden rounded-xl transition-all duration-500`}
                      onClick={() => setSelectedPost(post)}
                    >
                      <motion.video
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.7, ease: customEase }}
                        src={post.src}
                        muted
                        loop
                        playsInline
                        autoPlay
                        className="w-full h-full object-cover opacity-70 group-hover:opacity-90"
                      />

                      {/* Frosted Play Icon Overlay */}
                      <div className="absolute inset-0 flex justify-center items-center pointer-events-none transition-transform duration-500 group-hover:scale-110">
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-black/30 backdrop-blur-md flex justify-center items-center border border-white/20 text-white shadow-xl">
                          <Play className="ml-1 fill-white" size={24} />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* MODAL */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-10 backdrop-blur-md"
            onClick={() => setSelectedPost(null)}
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 md:top-10 md:right-10 text-neutral-500 hover:text-white transition-colors z-50 cursor-pointer focus:outline-none"
              onClick={() => setSelectedPost(null)}
            >
              <X size={36} strokeWidth={1} />
            </button>

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[1200px] flex flex-col items-center justify-center cursor-default"
            >
              <div className="relative flex items-center justify-center w-full max-h-[75vh]">
                {selectedPost.type === "video" ? (
                  <video
                    src={selectedPost.src}
                    controls
                    autoPlay
                    className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl"
                  />
                ) : (
                  <img
                    src={selectedPost.src}
                    alt="Project Details"
                    className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl"
                  />
                )}
              </div>

              {/* Caption Box */}
              <div className="mt-8 md:mt-10 max-w-2xl text-center px-4">
                <p className="text-white text-sm md:text-base font-light tracking-wide leading-relaxed">
                  {selectedPost.caption}
                </p>
                <div className="flex items-center justify-center gap-2 mt-4 text-neutral-500">
                  <Heart size={14} className="fill-neutral-500" />
                  <span className="text-xs uppercase tracking-widest">
                    {selectedPost.likes}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
