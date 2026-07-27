"use client";

import { useEffect, useId, useRef, useState } from "react";

const MAUVE = "#d98394";
const SAND = "#e2d9c8";
const CREAM = "#F7F1E8";
const GREEN = "#9ac54d";
const INK = "#394451";
const EASE = "cubic-bezier(0.33, 0, 0.2, 1)";

const CHECK_IN_OPTIONS = [
  { value: "2027-06-07", label: "Monday, June 7th" },
  { value: "2027-06-08", label: "Tuesday, June 8th" },
  { value: "2027-06-09", label: "Wednesday, June 9th" },
  { value: "2027-06-10", label: "Thursday, June 10th" },
  { value: "2027-06-11", label: "Friday, June 11th" },
] as const;

const CHECK_OUT_OPTIONS = [
  { value: "2027-06-13", label: "Sunday, June 13th" },
  { value: "2027-06-14", label: "Monday, June 14th" },
  { value: "2027-06-15", label: "Tuesday, June 15th" },
] as const;

const WEEKEND_EVENTS = [
  { title: "Boat Day", day: "10th" },
  { title: "Welcome Party", day: "11th" },
  { title: "Wedding", day: "12th" },
] as const;

const DEFAULT_CHECK_IN = "2027-06-09";
const DEFAULT_CHECK_OUT = "2027-06-13";

const selectClassName =
  "min-h-12 w-full appearance-none rounded-xl border-2 border-ink/15 bg-white/50 bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat px-3 pr-10 font-sans text-[0.95rem] text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-seafoam";

type ResortRatesModalProps = {
  open: boolean;
  onClose: () => void;
  reserveUrl: string;
};

function GuestStepper({
  label,
  value,
  min,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  onChange: (next: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="font-hero text-[0.95rem] tracking-[0.06em] text-ink uppercase">
        {label}
      </span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label={`Decrease ${label}`}
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - 1))}
          className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-xl border-2 border-ink/20 bg-white/40 font-hero text-xl text-ink disabled:opacity-35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-seafoam"
        >
          −
        </button>
        <span
          className="min-w-8 text-center font-hero text-xl text-ink tabular-nums"
          aria-live="polite"
        >
          {value}
        </span>
        <button
          type="button"
          aria-label={`Increase ${label}`}
          onClick={() => onChange(value + 1)}
          className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-xl border-2 border-ink/20 bg-white/40 font-hero text-xl text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-seafoam"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default function ResortRatesModal({
  open,
  onClose,
  reserveUrl,
}: ResortRatesModalProps) {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [checkIn, setCheckIn] = useState(DEFAULT_CHECK_IN);
  const [checkOut, setCheckOut] = useState(DEFAULT_CHECK_OUT);
  const [reduceMotion, setReduceMotion] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleCheckRates = () => {
    window.open(reserveUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        aria-label="Close availability modal"
        className="absolute inset-0"
        style={{
          backgroundColor: MAUVE,
          opacity: 0.8,
          transition: reduceMotion ? undefined : `opacity 320ms ${EASE}`,
        }}
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 max-h-[min(92dvh,720px)] w-full max-w-md overflow-y-auto rounded-2xl p-6 shadow-[0_18px_50px_rgba(57,68,81,0.28)] sm:rounded-3xl sm:p-8"
        style={{
          backgroundColor: SAND,
          color: INK,
        }}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 inline-flex min-h-11 min-w-11 items-center justify-center font-hero text-2xl text-ink/60 transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-seafoam"
          aria-label="Close"
        >
          ×
        </button>

        <h2
          id={titleId}
          className="m-0 pr-10 font-hero text-[clamp(1.6rem,6vw,2.1rem)] leading-[0.95] tracking-[0.02em] text-ink uppercase"
        >
          Check Availability & Rates
        </h2>

        <section className="mt-7">
          <h3 className="m-0 mb-4 font-hero text-[clamp(1.05rem,3.5vw,1.2rem)] tracking-[0.06em] text-primary uppercase">
            Total Guests
          </h3>
          <div className="flex flex-col gap-3">
            <GuestStepper
              label="Adults"
              value={adults}
              min={1}
              onChange={setAdults}
            />
            <GuestStepper
              label="Children"
              value={children}
              min={0}
              onChange={setChildren}
            />
          </div>
        </section>

        <section className="mt-7" aria-labelledby="key-events-heading">
          <h3
            id="key-events-heading"
            className="m-0 mb-4 font-hero text-[clamp(1.05rem,3.5vw,1.2rem)] tracking-[0.06em] text-primary uppercase"
          >
            Key Events
          </h3>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {WEEKEND_EVENTS.map((event) => (
              <div
                key={event.title}
                className="flex flex-col items-center justify-center rounded-xl px-2 py-3 text-center"
                style={{ backgroundColor: MAUVE }}
              >
                <span
                  className="font-hero text-[clamp(0.9rem,3.2vw,1.1rem)] leading-tight tracking-[0.04em] uppercase"
                  style={{ color: CREAM }}
                >
                  {event.title}
                </span>
                <span
                  className="mt-1.5 font-hero text-[clamp(1.35rem,5vw,1.75rem)] leading-none tracking-[0.02em]"
                  style={{ color: CREAM }}
                >
                  {event.day}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-7 grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-left">
            <span className="font-hero text-[0.95rem] tracking-[0.06em] text-primary uppercase">
              Check In Day
            </span>
            <select
              value={checkIn}
              onChange={(event) => setCheckIn(event.target.value)}
              className={selectClassName}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23394451' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
              }}
            >
              {CHECK_IN_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-left">
            <span className="font-hero text-[0.95rem] tracking-[0.06em] text-primary uppercase">
              Check Out Day
            </span>
            <select
              value={checkOut}
              onChange={(event) => setCheckOut(event.target.value)}
              className={selectClassName}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23394451' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
              }}
            >
              {CHECK_OUT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </section>

        <p className="mt-7 mb-0 text-center text-[0.95rem] leading-snug text-ink/75">
          Discount Code Will be Automatically applied
        </p>

        <button
          type="button"
          onClick={handleCheckRates}
          className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-2xl border-2 px-6 py-3 font-hero text-[clamp(1.05rem,3.5vw,1.2rem)] font-bold tracking-[0.06em] uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-seafoam"
          style={{
            backgroundColor: GREEN,
            borderColor: CREAM,
            color: CREAM,
          }}
        >
          Check Rates
        </button>
      </div>
    </div>
  );
}
