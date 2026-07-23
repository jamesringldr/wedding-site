"use client";

import { useEffect, useId, useRef, useState } from "react";

const CREAM = "#F7F1E8";
const GREEN = "#9ac54d";
const CHARCOAL = "#394451";
const EASE = "cubic-bezier(0.33, 0, 0.2, 1)";
/** Approx row height (button + gap) for spiral offset toward the trigger. */
const ROW = 52;

type MenuItem = {
  label: string;
  href: string;
};

/** Top → bottom; FAQs sits level with the Details / × trigger. */
const MENU_ITEMS: MenuItem[] = [
  { label: "The Couple", href: "#couple" },
  { label: "Resort Info", href: "#resort" },
  { label: "Itinerary RSVPs", href: "#itinerary" },
  { label: "FAQs", href: "#faqs" },
];

type DetailsMenuProps = {
  visible: boolean;
  reduceMotion?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export default function DetailsMenu({
  visible,
  reduceMotion = false,
  onOpenChange,
}: DetailsMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    onOpenChange?.(open);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointer = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (target && rootRef.current && !rootRef.current.contains(target)) {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onPointer);
    window.addEventListener("touchstart", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onPointer);
      window.removeEventListener("touchstart", onPointer);
    };
  }, [open]);

  useEffect(() => {
    if (!visible) setOpen(false);
  }, [visible]);

  const toggle = () => setOpen((prev) => !prev);
  const lastIndex = MENU_ITEMS.length - 1;

  return (
    <div
      ref={rootRef}
      className="absolute right-5 bottom-5 z-30 sm:right-6 sm:bottom-6"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: reduceMotion
          ? undefined
          : `opacity 700ms ${EASE} ${visible ? "320ms" : "0ms"}`,
      }}
    >
      <div className="relative inline-flex items-end gap-3">
        <ul
          id={menuId}
          className="absolute right-full bottom-0 mr-3 flex w-max min-w-[9.5rem] list-none flex-col gap-2"
          aria-hidden={!open}
        >
          {MENU_ITEMS.map((item, index) => {
            const rowsAboveTrigger = lastIndex - index;
            const openDelay = rowsAboveTrigger * 55;
            const closeDelay = index * 55;

            return (
              <li key={item.href} className="w-full">
                <a
                  href={item.href}
                  tabIndex={open ? 0 : -1}
                  className="flex min-h-11 w-full items-center justify-center rounded-2xl border-2 px-4 py-2 text-center font-hero text-[clamp(0.95rem,3.2vw,1.1rem)] font-bold tracking-[0.05em] uppercase will-change-transform"
                  style={{
                    backgroundColor: GREEN,
                    borderColor: CREAM,
                    color: CREAM,
                    pointerEvents: open ? "auto" : "none",
                    transform: open
                      ? "translate(0, 0) rotate(0deg) scale(1)"
                      : `translate(72px, ${rowsAboveTrigger * ROW}px) rotate(-55deg) scale(0.35)`,
                    opacity: open ? 1 : 0,
                    transition: reduceMotion
                      ? undefined
                      : `transform 480ms ${EASE}, opacity 320ms ${EASE}`,
                    transitionDelay: reduceMotion
                      ? "0ms"
                      : open
                        ? `${openDelay}ms`
                        : `${closeDelay}ms`,
                  }}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? "Close details menu" : "Open details menu"}
          onClick={toggle}
          className={`relative z-10 inline-flex min-h-11 min-w-11 items-center justify-center rounded-2xl border-2 px-5 py-2.5 font-hero text-[clamp(1.1rem,3.85vw,1.265rem)] font-bold tracking-[0.06em] uppercase ${
            !open && visible && !reduceMotion ? "details-pulse" : ""
          }`}
          style={{
            backgroundColor: open ? CHARCOAL : GREEN,
            borderColor: CREAM,
            color: CREAM,
            transition: reduceMotion
              ? undefined
              : `background-color 280ms ${EASE}`,
          }}
        >
          {open ? (
            <span aria-hidden className="text-[1.35em] leading-none">
              ×
            </span>
          ) : (
            "Details"
          )}
        </button>
      </div>
    </div>
  );
}
