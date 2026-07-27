import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ResortCarousel from "@/components/ResortCarousel";
import ResortReserveDrawer from "@/components/ResortReserveDrawer";
import {
  RESORT_HERO_IMAGE,
  RESORT_HIGHLIGHTS,
  RESORT_INTRO,
  RESORT_OFFICIAL_URL,
  getResortGalleryPhotos,
} from "@/lib/resort";

export const metadata: Metadata = {
  title: "Resort Info — Join us in Mexico",
  description:
    "Finest Playa Mujeres — the all-inclusive Cancún resort hosting our wedding weekend.",
};

export default function ResortPage() {
  const photos = getResortGalleryPhotos();

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

      <div className="relative z-10 mx-auto flex w-full max-w-[1100px] flex-col px-6 pt-8 pb-40 sm:px-8 sm:pt-10 sm:pb-44">
        <Link
          href="/"
          className="mb-10 inline-flex min-h-11 w-fit items-center gap-2 font-hero text-[0.95rem] tracking-[0.06em] text-ink/70 uppercase transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-seafoam"
        >
          <span aria-hidden>←</span>
          Home
        </Link>

        <header className="mb-8 max-w-xl sm:mb-10">
          <p className="mb-3 font-hero text-[clamp(0.95rem,3.2vw,1.1rem)] tracking-[0.08em] text-primary uppercase">
            Join us in Mexico
          </p>
          <h1 className="m-0 font-hero text-[clamp(3.25rem,14vw,5.5rem)] leading-[0.9] tracking-[0.02em] text-ink uppercase">
            Resort Info
          </h1>
          <p className="mt-4 max-w-md text-[1.05rem] leading-relaxed text-ink/80">
            Finest Playa Mujeres — all-inclusive luxury in Cancún for our
            wedding weekend.
          </p>
        </header>

        <div className="relative mb-12 aspect-[16/10] w-full overflow-hidden sm:mb-16 sm:aspect-[21/9]">
          <Image
            src={RESORT_HERO_IMAGE}
            alt="Finest Playa Mujeres all-inclusive resort pools and Caribbean coastline"
            fill
            priority
            sizes="(max-width: 1100px) 100vw, 1100px"
            className="object-cover object-center"
          />
        </div>

        <section className="mb-14 max-w-2xl sm:mb-16">
          <h2 className="m-0 font-hero text-[clamp(1.75rem,6vw,2.5rem)] leading-[0.95] tracking-[0.02em] text-ink uppercase">
            Finest Playa Mujeres
          </h2>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-ink/80">
            {RESORT_INTRO}
          </p>
        </section>

        <section className="mb-14 sm:mb-16">
          <h2 className="m-0 mb-8 font-hero text-[clamp(1.75rem,6vw,2.5rem)] leading-[0.95] tracking-[0.02em] text-ink uppercase">
            What to expect
          </h2>
          <ul className="m-0 grid list-none gap-8 p-0 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-12">
            {RESORT_HIGHLIGHTS.map((item) => (
              <li key={item.title}>
                <h3 className="m-0 font-hero text-[clamp(1.1rem,3.5vw,1.35rem)] tracking-[0.06em] text-primary uppercase">
                  {item.title}
                </h3>
                <p className="mt-2 text-[1.02rem] leading-relaxed text-ink/80">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-14 sm:mb-16">
          <h2 className="m-0 mb-6 font-hero text-[clamp(1.75rem,6vw,2.5rem)] leading-[0.95] tracking-[0.02em] text-ink uppercase">
            Gallery
          </h2>
          <ResortCarousel photos={photos} />
        </section>

        <section className="max-w-xl border-t border-ink/15 pt-10">
          <h2 className="m-0 font-hero text-[clamp(1.35rem,4.5vw,1.85rem)] leading-[0.95] tracking-[0.02em] text-ink uppercase">
            Official resort site
          </h2>
          <p className="mt-3 text-[1.02rem] leading-relaxed text-ink/80">
            Suites, dining, spa, and booking details live on Finest Resorts’
            Playa Mujeres page.
          </p>
          <a
            href={RESORT_OFFICIAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex min-h-11 items-center font-hero text-[0.95rem] tracking-[0.06em] text-primary uppercase transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-seafoam"
          >
            Visit Finest Playa Mujeres
            <span aria-hidden className="ml-2">
              ↗
            </span>
          </a>
        </section>
      </div>

      <ResortReserveDrawer reserveUrl={RESORT_OFFICIAL_URL} />
    </main>
  );
}
