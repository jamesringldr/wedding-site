export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-[1024px] flex-1 flex-col items-center justify-center gap-6 px-4 py-16 text-center sm:px-6 md:px-8">
      <p className="text-sm font-medium tracking-widest text-coral uppercase">
        Save the date
      </p>
      <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl">
        Wedding Site
      </h1>
      <p className="max-w-md text-base text-ink/80 sm:text-lg">
        Project scaffolding is ready. Pages, RSVP, and schedule come next.
      </p>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        <a
          href="#coming-soon"
          className="inline-flex min-h-11 items-center justify-center rounded-[12px] bg-primary px-6 text-base font-medium text-white transition-colors hover:bg-coral focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-seafoam"
        >
          Coming soon
        </a>
        <span className="inline-flex min-h-11 items-center justify-center rounded-[12px] border border-peach bg-transparent px-6 text-base font-medium text-ink">
          Mobile-first
        </span>
      </div>
      <div
        id="coming-soon"
        className="mt-12 w-full max-w-sm rounded-[12px] border border-cyan bg-background/60 p-6 text-left text-sm text-ink/70"
        aria-label="Design system preview"
      >
        <p className="mb-2 font-medium text-ink">Palette check</p>
        <ul className="flex flex-wrap gap-2">
          <li className="h-8 w-8 rounded-[8px] bg-primary" title="Mauve Rose" />
          <li className="h-8 w-8 rounded-[8px] bg-coral" title="Coral" />
          <li className="h-8 w-8 rounded-[8px] bg-peach" title="Peach" />
          <li className="h-8 w-8 rounded-[8px] bg-seafoam" title="Seafoam" />
          <li className="h-8 w-8 rounded-[8px] bg-cyan" title="Light Cyan" />
          <li className="h-8 w-8 rounded-[8px] bg-ink" title="Charcoal" />
        </ul>
      </div>
    </main>
  );
}
