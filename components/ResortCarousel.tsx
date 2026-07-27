"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import type { ResortGalleryPhoto } from "@/lib/resort";

type ResortCarouselProps = {
  photos: ResortGalleryPhoto[];
};

const EASE = "cubic-bezier(0.33, 0, 0.2, 1)";

export default function ResortCarousel({ photos }: ResortCarouselProps) {
  const [index, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const labelId = useId();

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  if (photos.length === 0) {
    return (
      <p className="text-ink/70">Gallery photos will appear here once added.</p>
    );
  }

  const go = (next: number) => {
    setIndex((next + photos.length) % photos.length);
  };

  const current = photos[index]!;

  return (
    <div
      className="relative w-full"
      role="region"
      aria-roledescription="carousel"
      aria-labelledby={labelId}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          go(index + 1);
        }
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          go(index - 1);
        }
      }}
    >
      <p id={labelId} className="sr-only">
        Resort photo gallery
      </p>

      <div
        className="relative aspect-[4/3] w-full overflow-hidden bg-ink/5 sm:aspect-[16/10]"
        onTouchStart={(event) => {
          touchStartX.current = event.changedTouches[0]?.clientX ?? null;
        }}
        onTouchEnd={(event) => {
          const start = touchStartX.current;
          const end = event.changedTouches[0]?.clientX;
          touchStartX.current = null;
          if (start == null || end == null) return;
          const delta = end - start;
          if (Math.abs(delta) < 48) return;
          go(delta < 0 ? index + 1 : index - 1);
        }}
      >
        {photos.map((photo, i) => (
          <div
            key={photo.src}
            className="absolute inset-0"
            aria-hidden={i !== index}
            style={{
              opacity: i === index ? 1 : 0,
              transition: reduceMotion ? undefined : `opacity 520ms ${EASE}`,
              pointerEvents: i === index ? "auto" : "none",
            }}
          >
            <Image
              src={photo.src}
              alt={photo.label}
              fill
              sizes="(max-width: 1100px) 100vw, 1100px"
              className="object-cover"
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <p
          className="min-w-0 flex-1 font-hero text-[0.95rem] tracking-[0.06em] text-ink/75 uppercase"
          aria-live="polite"
        >
          {current.label}
          <span className="ml-2 text-ink/45">
            {index + 1} / {photos.length}
          </span>
        </p>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => go(index - 1)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center font-hero text-2xl text-ink transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-seafoam"
            aria-label="Previous photo"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center font-hero text-2xl text-ink transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-seafoam"
            aria-label="Next photo"
          >
            ›
          </button>
        </div>
      </div>

      <div
        className="mt-3 flex flex-wrap justify-center gap-2"
        role="tablist"
        aria-label="Gallery slides"
      >
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Show photo ${i + 1}: ${photo.label}`}
            onClick={() => setIndex(i)}
            className="h-2.5 w-2.5 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-seafoam"
            style={{
              backgroundColor: i === index ? "#d98394" : "rgba(57, 68, 81, 0.28)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
