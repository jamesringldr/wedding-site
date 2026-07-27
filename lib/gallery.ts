import fs from "node:fs";
import path from "node:path";

const IMAGE_EXT = /\.(jpe?g|png|webp|gif)$/i;

/** Reads `public/assets/gallery` at build time so new drops show up automatically. */
export function getGalleryPhotos(): string[] {
  const dir = path.join(process.cwd(), "public/assets/gallery");
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((name) => IMAGE_EXT.test(name))
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }))
    .map((name) => `/assets/gallery/${encodeURIComponent(name)}`);
}
