"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { submitRsvp } from "@/lib/rsvp";

const MAUVE = "#d98394";
const SAND = "#e2d9c8";
const CREAM = "#F7F1E8";
const GREEN = "#9ac54d";
const INK = "#394451";
const EASE = "cubic-bezier(0.33, 0, 0.2, 1)";

type Step =
  | "choice"
  | "decline"
  | "attending"
  | "guests"
  | "events"
  | "saved";

type EventKey = "boatDay" | "welcomeParty" | "ceremony";

type RoomReserved = "yes" | "no";

type ItineraryRsvpModalProps = {
  open: boolean;
  onClose: () => void;
};

const EVENT_OPTIONS: { key: EventKey; label: string }[] = [
  { key: "boatDay", label: "Boat Day" },
  { key: "welcomeParty", label: "Welcome Party" },
  { key: "ceremony", label: "Ceremony" },
];

const fieldClassName =
  "min-h-12 w-full rounded-xl border-2 border-ink/15 bg-white/50 px-3 font-sans text-[1rem] text-ink placeholder:text-ink/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-seafoam";

const primaryButtonClassName =
  "inline-flex min-h-12 w-full items-center justify-center rounded-2xl border-2 px-6 py-3 font-hero text-[clamp(1.05rem,3.5vw,1.2rem)] font-bold tracking-[0.06em] uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-seafoam";

const secondaryButtonClassName =
  "inline-flex min-h-12 w-full items-center justify-center rounded-2xl border-2 border-ink/25 bg-white/40 px-6 py-3 font-hero text-[clamp(1.05rem,3.5vw,1.2rem)] font-bold tracking-[0.06em] text-ink uppercase transition-colors hover:bg-white/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-seafoam";

const primaryButtonStyle = {
  backgroundColor: GREEN,
  borderColor: CREAM,
  color: CREAM,
} as const;

function titleForStep(step: Step): string {
  switch (step) {
    case "choice":
      return "Joining Us?";
    case "decline":
      return "You will be missed";
    case "attending":
      return "We are so glad";
    case "guests":
      return "Guests";
    case "events":
      return "Which Events?";
    case "saved":
      return "We've Saved your RSVP!";
  }
}

export default function ItineraryRsvpModal({
  open,
  onClose,
}: ItineraryRsvpModalProps) {
  const [step, setStep] = useState<Step>("choice");
  const [fullName, setFullName] = useState("");
  const [partyName, setPartyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState<string[]>(["", ""]);
  const [events, setEvents] = useState<Record<EventKey, boolean>>({
    boatDay: true,
    welcomeParty: true,
    ceremony: true,
  });
  const [roomReserved, setRoomReserved] = useState<RoomReserved | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
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

    setStep("choice");
    setFullName("");
    setPartyName("");
    setEmail("");
    setPhone("");
    setGuests(["", ""]);
    setEvents({ boatDay: true, welcomeParty: true, ceremony: true });
    setRoomReserved(null);
    setSubmitting(false);
    setSubmitError(null);

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

  const handleDeclineSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitError(null);
    setSubmitting(true);
    try {
      await submitRsvp({
        status: "declined",
        fullName: fullName.trim(),
      });
      onClose();
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Could not save your RSVP. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleAttendingNext = (event: FormEvent) => {
    event.preventDefault();
    setSubmitError(null);
    setStep("guests");
  };

  const handleGuestsNext = (event: FormEvent) => {
    event.preventDefault();
    setSubmitError(null);
    setStep("events");
  };

  const handleEventsSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!roomReserved) return;

    setSubmitError(null);
    setSubmitting(true);
    try {
      await submitRsvp({
        status: "attending",
        partyName: partyName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        guests: guests.map((guest) => guest.trim()).filter(Boolean),
        boatDay: events.boatDay,
        welcomeParty: events.welcomeParty,
        ceremony: events.ceremony,
        roomReserved,
      });
      setStep("saved");
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Could not save your RSVP. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const updateGuest = (index: number, value: string) => {
    setGuests((prev) => prev.map((guest, i) => (i === index ? value : guest)));
  };

  const addGuest = () => {
    setGuests((prev) => [...prev, ""]);
  };

  const toggleEvent = (key: EventKey) => {
    setEvents((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        aria-label="Close RSVP modal"
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
        className="relative z-10 max-h-[min(92dvh,720px)] w-full max-w-md overflow-y-auto rounded-2xl p-6 shadow-[0_18px_50px_rgba(57,68,81,0.28)] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:rounded-3xl sm:p-8"
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
          {titleForStep(step)}
        </h2>

        {step === "choice" ? (
          <div className="mt-8 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => setStep("decline")}
              className={secondaryButtonClassName}
            >
              Regretfully Can&apos;t
            </button>
            <button
              type="button"
              onClick={() => setStep("attending")}
              className={primaryButtonClassName}
              style={primaryButtonStyle}
            >
              Wouldn&apos;t Miss It
            </button>
          </div>
        ) : null}

        {step === "decline" ? (
          <form className="mt-5" onSubmit={handleDeclineSubmit}>
            <p className="m-0 text-[1.02rem] leading-relaxed text-ink/75">
              But we understand and your love and support still mean the world
              to us.
            </p>
            <label className="mt-7 flex flex-col gap-2 text-left">
              <span className="font-hero text-[0.95rem] tracking-[0.06em] text-primary uppercase">
                Full Name
              </span>
              <input
                type="text"
                name="fullName"
                required
                autoComplete="name"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                className={fieldClassName}
                placeholder="Your full name"
              />
            </label>
            {submitError ? (
              <p className="mt-4 m-0 text-[0.95rem] leading-relaxed text-primary" role="alert">
                {submitError}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={submitting}
              className={`mt-8 ${primaryButtonClassName} disabled:opacity-60`}
              style={primaryButtonStyle}
            >
              {submitting ? "Saving…" : "Submit"}
            </button>
          </form>
        ) : null}

        {step === "attending" ? (
          <form className="mt-5" onSubmit={handleAttendingNext}>
            <p className="m-0 text-[1.02rem] leading-relaxed text-ink/75">
              We can&apos;t wait to celebrate with you
            </p>
            <div className="mt-7 flex flex-col gap-4">
              <label className="flex flex-col gap-2 text-left">
                <span className="font-hero text-[0.95rem] tracking-[0.06em] text-primary uppercase">
                  Primary Party Name
                </span>
                <input
                  type="text"
                  name="partyName"
                  required
                  autoComplete="name"
                  value={partyName}
                  onChange={(event) => setPartyName(event.target.value)}
                  className={fieldClassName}
                  placeholder="Name for your party"
                />
              </label>
              <label className="flex flex-col gap-2 text-left">
                <span className="font-hero text-[0.95rem] tracking-[0.06em] text-primary uppercase">
                  Email
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className={fieldClassName}
                  placeholder="you@example.com"
                />
              </label>
              <label className="flex flex-col gap-2 text-left">
                <span className="font-hero text-[0.95rem] tracking-[0.06em] text-primary uppercase">
                  Phone Number
                </span>
                <input
                  type="tel"
                  name="phone"
                  required
                  autoComplete="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  className={fieldClassName}
                  placeholder="(555) 555-5555"
                />
              </label>
            </div>
            <button
              type="submit"
              className={`mt-8 ${primaryButtonClassName}`}
              style={primaryButtonStyle}
            >
              Next
            </button>
          </form>
        ) : null}

        {step === "guests" ? (
          <form className="mt-7" onSubmit={handleGuestsNext}>
            <div className="flex flex-col gap-4">
              {guests.map((guest, index) => (
                <label key={index} className="flex flex-col gap-2 text-left">
                  <span className="font-hero text-[0.95rem] tracking-[0.06em] text-primary uppercase">
                    Guest {index + 1}
                  </span>
                  <input
                    type="text"
                    name={`guest-${index + 1}`}
                    required={index === 0}
                    autoComplete="name"
                    value={guest}
                    onChange={(event) => updateGuest(index, event.target.value)}
                    className={fieldClassName}
                    placeholder={`Guest ${index + 1} name`}
                  />
                </label>
              ))}
            </div>
            <button
              type="button"
              onClick={addGuest}
              className="mt-4 inline-flex min-h-11 min-w-11 items-center justify-center self-start rounded-xl border-2 border-ink/20 bg-white/40 font-hero text-2xl text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-seafoam"
              aria-label="Add another guest"
            >
              +
            </button>
            <button
              type="submit"
              className={`mt-8 ${primaryButtonClassName}`}
              style={primaryButtonStyle}
            >
              Next
            </button>
          </form>
        ) : null}

        {step === "events" ? (
          <form className="mt-7" onSubmit={handleEventsSubmit}>
            <div>
              <div className="mb-2 grid grid-cols-[1fr_5.5rem] items-center gap-3 px-1">
                <span className="font-hero text-[0.95rem] tracking-[0.06em] text-primary uppercase">
                  Event
                </span>
                <span className="text-center font-hero text-[0.95rem] tracking-[0.06em] text-primary uppercase">
                  Attending
                </span>
              </div>
              <div className="flex flex-col gap-3">
                {EVENT_OPTIONS.map((option) => (
                  <label
                    key={option.key}
                    className="grid cursor-pointer grid-cols-[1fr_5.5rem] items-center gap-3 rounded-xl border-2 border-ink/15 bg-white/40 px-3 py-3"
                  >
                    <span className="font-hero text-[clamp(1.05rem,3.5vw,1.2rem)] tracking-[0.04em] text-ink uppercase">
                      {option.label}
                    </span>
                    <span className="flex justify-center">
                      <input
                        type="checkbox"
                        name={option.key}
                        checked={events[option.key]}
                        onChange={() => toggleEvent(option.key)}
                        className="h-5 w-5 accent-[#9ac54d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-seafoam"
                      />
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <fieldset className="mt-8 m-0 border-0 p-0">
              <legend className="mb-3 font-hero text-[0.95rem] tracking-[0.06em] text-primary uppercase">
                Already reserved your room?
              </legend>
              <div className="flex gap-3">
                {(
                  [
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ] as const
                ).map((option) => {
                  const selected = roomReserved === option.value;
                  return (
                    <label
                      key={option.value}
                      className={`flex min-h-12 flex-1 cursor-pointer items-center justify-center rounded-2xl border-2 px-4 font-hero text-[clamp(1.05rem,3.5vw,1.2rem)] font-bold tracking-[0.06em] uppercase ${
                        selected
                          ? ""
                          : "border-ink/25 bg-white/40 text-ink"
                      }`}
                      style={
                        selected
                          ? {
                              backgroundColor: GREEN,
                              borderColor: CREAM,
                              color: CREAM,
                            }
                          : undefined
                      }
                    >
                      <input
                        type="radio"
                        name="roomReserved"
                        value={option.value}
                        checked={selected}
                        onChange={() => setRoomReserved(option.value)}
                        className="sr-only"
                        required
                      />
                      {option.label}
                    </label>
                  );
                })}
              </div>
            </fieldset>

            {submitError ? (
              <p className="mt-4 m-0 text-[0.95rem] leading-relaxed text-primary" role="alert">
                {submitError}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={submitting || !roomReserved}
              className={`mt-8 ${primaryButtonClassName} disabled:opacity-60`}
              style={primaryButtonStyle}
            >
              {submitting ? "Saving…" : "Submit"}
            </button>
          </form>
        ) : null}

        {step === "saved" ? (
          <div className="mt-5">
            {roomReserved === "no" ? (
              <>
                <p className="m-0 text-[1.02rem] leading-relaxed text-ink/75">
                  See the Resort Details and book your stay:
                </p>
                <Link
                  href="/resort/"
                  onClick={onClose}
                  className={`mt-8 ${primaryButtonClassName}`}
                  style={primaryButtonStyle}
                >
                  Resort Details
                </Link>
              </>
            ) : (
              <>
                <p className="m-0 font-hero text-[0.95rem] tracking-[0.06em] text-primary uppercase">
                  Additional Details:
                </p>
                <div className="mt-4 flex flex-col gap-3">
                  <Link
                    href="/couple/"
                    onClick={onClose}
                    className={primaryButtonClassName}
                    style={primaryButtonStyle}
                  >
                    The Couple
                  </Link>
                  <Link
                    href="/resort/"
                    onClick={onClose}
                    className={primaryButtonClassName}
                    style={primaryButtonStyle}
                  >
                    The Resort
                  </Link>
                  <Link
                    href="/faqs/"
                    onClick={onClose}
                    className={primaryButtonClassName}
                    style={primaryButtonStyle}
                  >
                    FAQs
                  </Link>
                </div>
              </>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
