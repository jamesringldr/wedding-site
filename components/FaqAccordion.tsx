"use client";

import { useId, useState } from "react";
import type { FaqItem } from "@/lib/faqs";

const EASE = "cubic-bezier(0.33, 0, 0.2, 1)";

type FaqAccordionProps = {
  items: FaqItem[];
};

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <ul className="m-0 list-none space-y-3 p-0">
      {items.map((item, index) => {
        const open = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <li
            key={item.question}
            className="overflow-hidden rounded-2xl border border-cyan/50 bg-[#F7F1E8]/70 shadow-[0_1px_0_rgba(57,68,81,0.06)] backdrop-blur-sm"
          >
            <h2 className="m-0 text-base font-medium">
              <button
                type="button"
                id={buttonId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : index)}
                className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left text-ink transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-seafoam"
              >
                <span className="font-serif text-[1.05rem] leading-snug font-semibold sm:text-lg">
                  {item.question}
                </span>
                <span
                  aria-hidden
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 font-hero text-xl leading-none text-primary"
                  style={{
                    transform: open ? "rotate(45deg)" : "rotate(0deg)",
                    transition: `transform 320ms ${EASE}`,
                  }}
                >
                  +
                </span>
              </button>
            </h2>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={!open}
              className="grid"
              style={{
                gridTemplateRows: open ? "1fr" : "0fr",
                transition: `grid-template-rows 360ms ${EASE}`,
              }}
            >
              <div className="min-h-0 overflow-hidden">
                <p
                  className="m-0 px-5 pt-0 pb-5 text-[1rem] leading-relaxed text-ink/85"
                  style={{
                    opacity: open ? 1 : 0,
                    transform: open ? "translateY(0)" : "translateY(-0.35rem)",
                    transition: `opacity 280ms ${EASE}, transform 280ms ${EASE}`,
                  }}
                >
                  {item.answer}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
