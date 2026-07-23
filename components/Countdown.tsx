"use client";

import { useEffect, useState } from "react";
import { WEDDING_WEEKEND_START } from "@/lib/event";

const CREAM = "#F7F1E8";
const EASE = "cubic-bezier(0.33, 0, 0.2, 1)";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(target: Date, now: number): TimeLeft {
  const remaining = Math.max(0, target.getTime() - now);
  return {
    days: Math.floor(remaining / (1000 * 60 * 60 * 24)),
    hours: Math.floor((remaining / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((remaining / (1000 * 60)) % 60),
    seconds: Math.floor((remaining / 1000) % 60),
  };
}

const UNITS: { key: keyof TimeLeft; label: string }[] = [
  { key: "days", label: "DAYS" },
  { key: "hours", label: "HOURS" },
  { key: "minutes", label: "MINUTES" },
  { key: "seconds", label: "SECONDS" },
];

type CountdownProps = {
  visible: boolean;
  reduceMotion?: boolean;
};

export default function Countdown({
  visible,
  reduceMotion = false,
}: CountdownProps) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const time = getTimeLeft(WEDDING_WEEKEND_START, now);

  return (
    <div
      className="mt-5 grid w-full grid-cols-4 gap-x-3"
      style={{
        color: CREAM,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(0.75rem)",
        transition: reduceMotion
          ? undefined
          : `opacity 900ms ${EASE} 280ms, transform 900ms ${EASE} 280ms`,
      }}
      aria-live="polite"
      aria-atomic="true"
    >
      {UNITS.map(({ key, label }) => (
        <div
          key={key}
          className="min-w-0 text-center font-hero font-bold uppercase"
        >
          <div className="text-[clamp(2.0125rem,8.625vw,2.7025rem)] leading-none tracking-[0.02em] tabular-nums">
            {time[key]}
          </div>
          <div className="mt-1.5 text-[clamp(0.75rem,3vw,0.92rem)] leading-none tracking-[0.08em]">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
