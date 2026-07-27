"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";

type CoupleGalleryProps = {
  photos: string[];
};

export default function CoupleGallery({ photos }: CoupleGalleryProps) {
  const [active, setActive] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (active === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") {
        setActive((i) => (i === null ? i : (i + 1) % photos.length));
      }
      if (event.key === "ArrowLeft") {
        setActive((i) =>
          i === null ? i : (i - 1 + photos.length) % photos.length,
        );
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [active, photos.length]);

  if (photos.length === 0) {
    return (
      <p className="text-ink/70">Photos will appear here once they’re added.</p>
    );
  }

  const activeSrc = active !== null ? photos[active] : null;

  return (
    <>
      <ul className="m-0 columns-2 gap-3 p-0 list-none sm:columns-3 sm:gap-4 lg:columns-4">
        {photos.map((src, index) => (
          <li key={src} className="mb-3 break-inside-avoid sm:mb-4">
            <button
              type="button"
              onClick={() => setActive(index)}
              className="group relative block w-full overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-seafoam"
              aria-label={`View photo ${index + 1} of ${photos.length}`}
            >
              <Image
                src={src}
                alt=""
                width={800}
                height={1000}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="h-auto w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
            </button>
          </li>
        ))}
      </ul>

      {activeSrc !== null && active !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#394451]/92 p-4 sm:p-8"
          onClick={() => setActive(null)}
        >
          <p id={titleId} className="sr-only">
            Photo {active + 1} of {photos.length}
          </p>

          <button
            ref={closeRef}
            type="button"
            onClick={() => setActive(null)}
            className="absolute top-4 right-4 z-10 inline-flex min-h-11 min-w-11 items-center justify-center font-hero text-2xl text-[#F7F1E8] uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-seafoam"
            aria-label="Close photo"
          >
            ×
          </button>

          {photos.length > 1 ? (
            <>
              <button
                type="button"
                className="absolute top-1/2 left-2 z-10 inline-flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center font-hero text-3xl text-[#F7F1E8] sm:left-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-seafoam"
                aria-label="Previous photo"
                onClick={(event) => {
                  event.stopPropagation();
                  setActive((i) =>
                    i === null ? i : (i - 1 + photos.length) % photos.length,
                  );
                }}
              >
                ‹
              </button>
              <button
                type="button"
                className="absolute top-1/2 right-2 z-10 inline-flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center font-hero text-3xl text-[#F7F1E8] sm:right-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-seafoam"
                aria-label="Next photo"
                onClick={(event) => {
                  event.stopPropagation();
                  setActive((i) =>
                    i === null ? i : (i + 1) % photos.length,
                  );
                }}
              >
                ›
              </button>
            </>
          ) : null}

          <div
            className="relative max-h-[min(88dvh,900px)] max-w-[min(96vw,1100px)]"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={activeSrc}
              alt=""
              width={1600}
              height={2000}
              sizes="96vw"
              className="max-h-[min(88dvh,900px)] w-auto max-w-full object-contain"
              priority
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
