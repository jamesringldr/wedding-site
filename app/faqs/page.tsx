import type { Metadata } from "next";
import Link from "next/link";
import FaqAccordion from "@/components/FaqAccordion";
import { FAQS } from "@/lib/faqs";

export const metadata: Metadata = {
  title: "FAQs — Join us in Mexico",
  description:
    "Answers about the wedding weekend in Mexico — travel, RSVP, dress code, and resort details.",
};

export default function FaqsPage() {
  return (
    <main className="relative min-h-dvh overflow-hidden">
      {/* Atmosphere — soft beach wash, not a flat cream slab */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background: `
            radial-gradient(ellipse 90% 55% at 12% -10%, rgba(191, 221, 223, 0.7), transparent 55%),
            radial-gradient(ellipse 70% 45% at 100% 8%, rgba(217, 131, 148, 0.28), transparent 50%),
            radial-gradient(ellipse 60% 40% at 80% 100%, rgba(255, 174, 110, 0.22), transparent 55%),
            linear-gradient(165deg, #ebe3d4 0%, #e2d9c8 45%, #d9cfc0 100%)
          `,
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1024px] flex-col px-6 pt-8 pb-16 sm:px-8 sm:pt-10 sm:pb-24">
        <Link
          href="/"
          className="mb-10 inline-flex min-h-11 w-fit items-center gap-2 font-hero text-[0.95rem] tracking-[0.06em] text-ink/70 uppercase transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-seafoam"
        >
          <span aria-hidden>←</span>
          Home
        </Link>

        <header className="mb-10 max-w-xl sm:mb-12">
          <p className="mb-3 font-hero text-[clamp(0.95rem,3.2vw,1.1rem)] tracking-[0.08em] text-primary uppercase">
            Join us in Mexico
          </p>
          <h1 className="m-0 font-hero text-[clamp(3.25rem,14vw,5.5rem)] leading-[0.9] tracking-[0.02em] text-ink uppercase">
            FAQs
          </h1>
          <p className="mt-4 max-w-md text-[1.05rem] leading-relaxed text-ink/80">
            Travel, RSVPs, and weekend basics — tap a question for the details.
          </p>
        </header>

        <FaqAccordion items={FAQS} />
      </div>
    </main>
  );
}
