"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Countdown from "@/components/Countdown";

type Phase = "enter" | "hold" | "settle";

const ENTER_MS = 800;
const HOLD_MS = 700;
const SETTLE_MS = 1400;
const EASE = "cubic-bezier(0.33, 0, 0.2, 1)";
const HERO_SCALE = 3.85;
const CREAM = "#F7F1E8";

type Offset = { dx: number; dy: number };

export default function LandingHero() {
  const [phase, setPhase] = useState<Phase>("enter");
  const [reduceMotion, setReduceMotion] = useState(false);
  const [offset, setOffset] = useState<Offset | null>(null);
  const joinRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const el = joinRef.current;
    if (!el) return;

    const measure = () => {
      el.style.transition = "none";
      el.style.transform = "translate(0px, 0px) scale(1)";
      const rect = el.getBoundingClientRect();
      const next = {
        dx: (window.innerWidth - rect.width * HERO_SCALE) / 2 - rect.left,
        dy: (window.innerHeight - rect.height * HERO_SCALE) / 2 - rect.top,
      };
      setOffset(next);
      el.style.transform = "";
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReduceMotion(media.matches);
    syncMotion();
    media.addEventListener("change", syncMotion);

    if (media.matches) {
      setPhase("settle");
      return () => media.removeEventListener("change", syncMotion);
    }

    if (!offset) {
      return () => media.removeEventListener("change", syncMotion);
    }

    const holdId = window.setTimeout(() => setPhase("hold"), 40);
    const settleId = window.setTimeout(
      () => setPhase("settle"),
      ENTER_MS + HOLD_MS,
    );

    return () => {
      media.removeEventListener("change", syncMotion);
      window.clearTimeout(holdId);
      window.clearTimeout(settleId);
    };
  }, [offset]);

  const joinTransform = (() => {
    if (!offset || reduceMotion || phase === "settle") {
      return "translate(0px, 0px) scale(1)";
    }
    if (phase === "enter") {
      return `translate(${offset.dx}px, ${offset.dy}px) scale(${HERO_SCALE * 0.78})`;
    }
    return `translate(${offset.dx}px, ${offset.dy}px) scale(${HERO_SCALE})`;
  })();

  const joinDuration = phase === "settle" ? SETTLE_MS : ENTER_MS;
  const settled = phase === "settle";
  const ready = offset !== null || reduceMotion;

  return (
    <main className="relative min-h-dvh w-full overflow-hidden">
      <Image
        src="/assets/LandingPage.jpg"
        alt="Couple on the beach in Mexico"
        fill
        priority
        sizes="100vw"
        className={`object-cover object-center ${
          reduceMotion
            ? "scale-100"
            : "scale-105 transition-transform duration-[12000ms] ease-out"
        }`}
      />

      <div className="absolute inset-0 bg-[#d98394]/50" aria-hidden />

      <div className="relative z-10 flex min-h-dvh items-center justify-center px-6">
        <div className="relative w-[min(88vw,22rem)]">
          <p
            ref={joinRef}
            className="relative z-20 mb-2 w-max origin-top-left text-left font-hero text-[clamp(1.15rem,4.6vw,1.45rem)] leading-[0.9] tracking-[0.02em] uppercase will-change-transform"
            style={{
              color: CREAM,
              opacity: ready ? 1 : 0,
              transform: joinTransform,
              transition: !ready || reduceMotion
                ? undefined
                : `transform ${joinDuration}ms ${EASE}`,
            }}
          >
            <span className="block">Join us</span>
            <span className="block">in Mexico</span>
          </p>

          <h1
            className="text-left font-hero text-[clamp(4.5rem,20vw,7.8125rem)] leading-[0.9] tracking-[0.02em] uppercase"
            style={{
              color: CREAM,
              opacity: settled ? 1 : 0,
              transform: settled ? "translateY(0)" : "translateY(1.25rem)",
              transition: reduceMotion
                ? undefined
                : `opacity ${SETTLE_MS}ms ${EASE} 160ms, transform ${SETTLE_MS}ms ${EASE} 160ms`,
            }}
          >
            <span className="sr-only">
              Join us in Mexico. Save the weekend.
            </span>
            <span aria-hidden className="block">
              Save
            </span>
            <span aria-hidden className="block">
              the
            </span>
            <span aria-hidden className="block">
              Weekend
            </span>
          </h1>

          <Countdown visible={settled} reduceMotion={reduceMotion} />
        </div>
      </div>

      <a
        href="#details"
        className={`absolute right-5 bottom-5 z-20 inline-flex min-h-11 items-center justify-center rounded-2xl border-2 px-6 py-2.5 font-hero text-[clamp(1.1rem,3.85vw,1.265rem)] font-bold tracking-[0.06em] uppercase transition-opacity duration-700 sm:right-6 sm:bottom-6 ${
          settled && !reduceMotion ? "details-pulse" : ""
        }`}
        style={{
          backgroundColor: "#9ac54d",
          borderColor: CREAM,
          color: CREAM,
          opacity: settled ? 1 : 0,
          transitionTimingFunction: EASE,
          transitionDelay: settled && !reduceMotion ? "320ms" : "0ms",
        }}
      >
        Details
      </a>
    </main>
  );
}
