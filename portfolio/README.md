# Your Name — Portfolio

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
- All "Your Name" instances in `app/layout.tsx`, `app/page.tsx`, `components/Navbar.tsx`
- Social links (LinkedIn/GitHub) in `app/page.tsx`
- Real project/blog data — once Sanity is connected, replace the hardcoded arrays in
  `app/page.tsx` and `app/blog/page.tsx` with `sanityClient.fetch(PROJECTS_QUERY)` calls (see `lib/sanity.ts`)

## 5. Deploy the Sanity Studio (your admin panel)

```bash
cd sanity
npx sanity deploy
```

This gives you a free hosted admin panel at `yourname.sanity.studio` — no server to maintain.
Use it to add/edit projects, publish blog posts, update your CV, and manage site settings without touching code.

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

## Still to build (see project chat for full status)

- Single project case-study page (`app/projects/[slug]/page.tsx`)
- Single blog post page with PortableText rendering, code highlighting, table of contents (`app/blog/[slug]/page.tsx`)
- Contact form wired to an email service (Resend recommended)
- Google Analytics / Search Console / Microsoft Clarity script tags in `app/layout.tsx`
