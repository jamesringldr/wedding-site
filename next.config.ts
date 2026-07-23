import type { NextConfig } from "next";

/**
 * Static export for Cloudflare Pages and GitHub Pages.
 * Set NEXT_PUBLIC_BASE_PATH=/wedding-site for GitHub project pages.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") || "";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Hide the Next.js "N" badge in local `next dev`
  devIndicators: false,
  ...(basePath
    ? {
        basePath,
        assetPrefix: basePath,
      }
    : {}),
};

export default nextConfig;
