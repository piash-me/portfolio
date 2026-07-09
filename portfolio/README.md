# Mohammad Piash — Portfolio

Premium, dynamic portfolio built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Sanity CMS.

## 1. Install

```bash
npm install
```

## 2. Set up environment variables

Copy `.env.example` to `.env.local` and fill in your Sanity project details:

```bash
cp .env.example .env.local
```

Get a project ID by running (from the `/sanity` folder, after `npm install -g sanity` or using `npx`):

```bash
npx sanity init
```

## 3. Run locally

```bash
npm run dev
```

Visit `http://localhost:3000`.

## 4. Replace placeholders

- `/public/photo.jpg` — your professional photo
- `/public/cv.pdf` — your CV file
- `/public/og-image.png` — 1200×630 image for social share previews
- Everything is already personalized with your real name, photo, CV, and experience.
- Social links (LinkedIn/GitHub) in `app/page.tsx`
- Real project/blog data — once Sanity is connected, replace the hardcoded arrays in
  `app/page.tsx` and `app/blog/page.tsx` with `sanityClient.fetch(PROJECTS_QUERY)` calls (see `lib/sanity.ts`)

## 5. Access your admin panel

Your admin panel is embedded directly in the site — visit `yourdomain.com/studio` (or `your-vercel-url.vercel.app/studio`) and log in with your Sanity account. No CLI command needed; it deploys automatically as part of your normal Vercel build.

(Alternative, if you have local CLI access: `cd sanity && npx sanity deploy` gives you a separate hosted panel at `yourname.sanity.studio` instead — either works, the embedded one requires nothing extra.)

## 6. Deploy the website

Push this repo to GitHub, then import it on [vercel.com](https://vercel.com):

1. Connect your GitHub repo
2. Add the same environment variables from `.env.local` in Vercel's project settings
3. Deploy — Vercel auto-builds on every push

## 7. Domain

Buy a domain through Cloudflare Registrar or Namecheap (no markup pricing), then point it at Vercel
via the DNS instructions Vercel provides after your first deploy.

## 8. Adding a future data/automation tool

Two supported patterns (see `app/tools/page.tsx` for a working example of both):

- **Embedded App** — host your Streamlit/Power BI/Python tool externally (Streamlit Community Cloud
  or Hugging Face Spaces are free), then set `toolType: "Embedded App"` and `embedUrl` on a Project
  document in Sanity. It renders in an iframe automatically.
- **API-backed Tool** — for lightweight tools, add a route under `app/api/tools/your-tool/route.ts`
  (see `app/api/tools/sla-risk/route.ts` for the pattern) and a page under `app/tools/your-tool/page.tsx`.

## Current honest status

**Built and working**: Homepage, Resume, Blog listing + detail pages (with PortableText rendering, code highlighting, table of contents), Projects listing + detail pages, Tools template page, embedded admin panel at `/studio`, light/dark theme toggle, contact via direct email link.

**Still not built**: Google Analytics / Search Console / Microsoft Clarity tags in `app/(site)/layout.tsx`, and formal Lighthouse/browser-compatibility test reports (these need to be run against the live deployed site directly, not generated in advance).
