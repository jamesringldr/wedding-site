import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ItineraryRsvpDrawer from "@/components/ItineraryRsvpDrawer";
import { ITINERARY_EVENTS } from "@/lib/itinerary";

export const metadata: Metadata = {
  title: "Key Events & RSVP — Join us in Mexico",
  description:
    "Boat Day, Welcome Party, and Ceremony details for the wedding weekend in Mexico.",
};

export default function ItineraryPage() {
  return (
    <main className="relative min-h-dvh overflow-hidden">
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

      <div className="relative z-10 mx-auto flex w-full max-w-[1100px] flex-col px-6 pt-8 pb-36 sm:px-8 sm:pt-10 sm:pb-40">
        <Link
          href="/"
          className="mb-10 inline-flex min-h-11 w-fit items-center gap-2 font-hero text-[0.95rem] tracking-[0.06em] text-ink/70 uppercase transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-seafoam"
        >
          <span aria-hidden>←</span>
          Home
        </Link>

        <header className="mb-12 max-w-xl sm:mb-16">
          <p className="mb-3 font-hero text-[clamp(0.95rem,3.2vw,1.1rem)] tracking-[0.08em] text-primary uppercase">
            Join us in Mexico
          </p>
          <h1 className="m-0 font-hero text-[clamp(3rem,12vw,5rem)] leading-[0.9] tracking-[0.02em] text-ink uppercase">
            <span className="block">Key Events</span>
            <span className="block">&amp; RSVP</span>
          </h1>
        </header>

        <div className="flex flex-col gap-14 sm:gap-20">
          {ITINERARY_EVENTS.map((event, index) => {
            const imageFirst = index % 2 === 1;

            return (
              <article
                key={event.title}
                className={`flex flex-col items-stretch gap-6 md:items-center md:gap-10 lg:gap-14 ${
                  imageFirst ? "md:flex-row-reverse" : "md:flex-row"
                }`}
              >
                <div className="flex min-w-0 flex-1 flex-col justify-center text-left">
                  <h2 className="m-0 font-hero text-[clamp(1.75rem,5vw,2.35rem)] leading-[0.95] tracking-[0.02em] text-ink uppercase">
                    {event.title}
                  </h2>
                  <p className="mt-4 max-w-md text-[1.02rem] leading-relaxed text-ink/75">
                    {event.description}
                  </p>
                  <p className="mt-5 m-0 font-hero text-[clamp(1.15rem,3.5vw,1.45rem)] tracking-[0.04em] text-ink uppercase">
                    {event.date}
                  </p>
                </div>

                <div className="relative aspect-[4/3] w-full flex-1 overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] md:max-w-[50%]">
                  <Image
                    src={event.imageSrc}
                    alt={event.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <ItineraryRsvpDrawer />
    </main>
  );
}
