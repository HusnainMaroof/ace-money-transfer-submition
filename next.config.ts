import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // A stray pnpm-lock.yaml in C:\Users\husna made Turbopack infer the
    // workspace root as the whole user profile, so dev scanned/watched far
    // outside this project. Pin the root to this project folder.
    root: path.join(import.meta.dirname),
  },
  experimental: {
    // Turbopack's persistent dev cache is ON by default in Next 16 and it
    // bloated `.next` to 500+ MB of disk writes, which made `next dev`
    // thrash the disk on Windows. This project is tiny, so the cache gives
    // no real benefit — keep it off.
    turbopackFileSystemCacheForDev: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
      },
    ],
  },
};

export default nextConfig;
