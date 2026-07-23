# Wedding Site

Mobile-first wedding website for RSVP, schedule, and guest information.

## Tech stack

| Choice | Why |
|--------|-----|
| **Next.js 16** (App Router) | React + TypeScript, strong DX, static export for free hosting |
| **Tailwind CSS 4** | Design-brief palette as tokens; mobile-first utilities |
| **Static export** (`output: 'export'`) | Deploys to **Cloudflare Pages** or **GitHub Pages** with no Node server |

## Prerequisites

- Node.js 20+ (22 recommended)
- npm 10+

## Local development

```bash
cd /Users/jameso/DevWork/wedding-site
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build      # static site → out/
npm run start      # preview out/ via serve
npm run lint
npm run typecheck
```

## Design tokens

Palette and type from the website sector design brief (`Maiztro-Library/.../design-brief.md`):

- Primary mauve `#D98394`, cream bg `#E2D9C8`, coral / peach / seafoam / cyan accents, charcoal text `#394451`
- Display: Cormorant Garamond · Body: Source Sans 3
- Breakpoints: mobile-first → `sm` 640 / `md` 768 / `lg` 1024

## Deploy

### Cloudflare Pages (preferred)

1. Connect the GitHub repo in Cloudflare Pages
2. Build command: `npm run build`
3. Output directory: `out`
4. Or use Wrangler locally: `npx wrangler pages deploy out`

`wrangler.toml` sets `pages_build_output_dir = "out"`. Leave `NEXT_PUBLIC_BASE_PATH` unset for a custom domain or `*.pages.dev` root.

### GitHub Pages

1. Repo **Settings → Pages → Source**: GitHub Actions
2. Push to `main` (workflow: `.github/workflows/deploy-pages.yml`)
3. Site serves at `https://<user>.github.io/wedding-site/` (`NEXT_PUBLIC_BASE_PATH=/wedding-site`)

For a custom domain on GitHub Pages, clear `NEXT_PUBLIC_BASE_PATH` in the workflow.

## Project layout

```
app/                 # App Router pages
  globals.css        # Tailwind + design tokens
  layout.tsx
  page.tsx           # Scaffold home (placeholder)
public/              # Static assets (.nojekyll, _redirects)
wrangler.toml        # Cloudflare Pages output dir
.github/workflows/   # GitHub Pages deploy
```

## Related docs

- Mission PRD / architecture: `../Maiztro/Maiztro-Library/missions/wedding-site/`
- Design brief: `.../sectors/website/design-brief.md`
