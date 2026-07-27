import fs from "node:fs";
import path from "node:path";

const IMAGE_EXT = /\.(jpe?g|png|webp|gif)$/i;

export const RESORT_OFFICIAL_URL =
  "https://www.finestresorts.com/cancun/finest-playa-mujeres/";

export const RESORT_HERO_IMAGE =
  "/assets/Resort/all-inclusive-family-caribbean-resorts.jpg";

export type ResortHighlight = {
  title: string;
  body: string;
};

/** Guest-facing copy adapted from Finest Playa Mujeres’ public resort page. */
export const RESORT_INTRO =
  "Finest Playa Mujeres is an all-inclusive, all-suite resort on the Playa Mujeres peninsula outside Cancún — pristine beaches, sparkling pools, and space to celebrate together or slip away when you need to.";

export const RESORT_HIGHLIGHTS: ResortHighlight[] = [
  {
    title: "All-suite stays",
    body: "Aesthetic simplicity runs through the suites and grounds — elevated inclusions designed for guests of every age.",
  },
  {
    title: "Beach & dunes",
    body: "Set on a peninsula with virgin beaches and endless sand dunes, looking out over deep Caribbean blues.",
  },
  {
    title: "Dining, spa & play",
    body: "Restaurants and bars, ONE Spa, live music, fitness, golf, and all-day activities — plus wedding-ready celebration spaces.",
  },
  {
    title: "Families & grown-ups",
    body: "Finest Club pairs grown-up pampering with kid-friendly services. Excellence Club is a resort-within-a-resort for adults only — private pool, fine dining, and concierge.",
  },
];

function filenameToLabel(name: string): string {
  const base = name.replace(IMAGE_EXT, "");
  return base
    .replace(/^Finest-Playa-Mujeres-/i, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

export type ResortGalleryPhoto = {
  src: string;
  label: string;
};

/** Reads `public/assets/Resort/Gallery` at build time. */
export function getResortGalleryPhotos(): ResortGalleryPhoto[] {
  const dir = path.join(process.cwd(), "public/assets/Resort/Gallery");
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((name) => IMAGE_EXT.test(name))
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }))
    .map((name) => ({
      src: `/assets/Resort/Gallery/${encodeURIComponent(name)}`,
      label: filenameToLabel(name),
    }));
}
