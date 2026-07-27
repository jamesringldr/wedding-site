"use client";

import { useEffect, useState } from "react";
import ResortRatesModal from "@/components/ResortRatesModal";

const PINK = "rgba(217, 131, 148, 0.9)";
const CREAM = "#F7F1E8";
const GREEN = "#9ac54d";
const EASE = "cubic-bezier(0.33, 0, 0.2, 1)";
const DELAY_MS = 2000;

export default function ResortReserveDrawer() {
  const [visible, setVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [ratesOpen, setRatesOpen] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReduceMotion(media.matches);
    syncMotion();
    media.addEventListener("change", syncMotion);

    const delay = media.matches ? 0 : DELAY_MS;
    const id = window.setTimeout(() => setVisible(true), delay);

    return () => {
      media.removeEventListener("change", syncMotion);
      window.clearTimeout(id);
    };
  }, []);

  return (
    <>
      <aside
        aria-label="Resort reservation offer"
        className="fixed inset-x-0 bottom-0 z-40 rounded-t-2xl px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:rounded-t-3xl sm:px-6 sm:pt-5"
        style={{
          backgroundColor: PINK,
          transform: visible ? "translateY(0)" : "translateY(100%)",
          opacity: visible ? 1 : 0,
          transition: reduceMotion
            ? undefined
            : `transform 620ms ${EASE}, opacity 420ms ${EASE}`,
          pointerEvents: visible ? "auto" : "none",
        }}
      >
        <div className="mx-auto flex w-full max-w-[1100px] flex-col items-center gap-3 text-center sm:gap-4">
          <h2
            className="m-0 font-hero text-[clamp(1.35rem,5vw,1.85rem)] leading-[0.95] tracking-[0.04em] uppercase"
            style={{ color: CREAM }}
          >
            Use Our Discount Code
          </h2>

          <button
            type="button"
            onClick={() => setRatesOpen(true)}
            className="inline-flex min-h-12 w-full max-w-xs items-center justify-center rounded-2xl border-2 px-6 py-3 text-center font-hero text-[clamp(1.05rem,3.5vw,1.2rem)] font-bold tracking-[0.06em] uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-seafoam sm:w-auto sm:min-w-[12rem]"
            style={{
              backgroundColor: GREEN,
              borderColor: CREAM,
              color: CREAM,
            }}
          >
            Reserve Now
          </button>

          <p
            className="m-0 text-[0.95rem] leading-snug sm:text-[1rem]"
            style={{ color: CREAM }}
          >
            Charged 30 Days Before Stay
            <br />
            100% refund up to 24 Hours before arrival
          </p>
        </div>
      </aside>

      <ResortRatesModal open={ratesOpen} onClose={() => setRatesOpen(false)} />
    </>
  );
}
