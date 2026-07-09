# Complete Admin Guide — GitHub & Sanity

This is the single reference document for maintaining your site going forward. It assumes no prior knowledge and covers every part of the system: what lives where, how to change each thing, and what to do when something goes wrong.

---

# Part 1 — The Two Systems (Read This First)

Your site is built from two completely separate systems that only meet when the site is displayed:

| | **GitHub** | **Sanity** |
|---|---|---|
| Holds | Code — pages, design, layout, schemas | Content — projects, blog posts, photos, CV, skills, text |
| You access it via | github.dev (browser editor) | `/studio` on your live site |
| Changes need | A commit + Vercel redeploy (~1 min) | Nothing — instant, live in ~1 minute automatically |
| If you delete your account | You lose your code | You lose your content |

**Rule of thumb:** if you're changing *words, numbers, or files* (a project description, a blog post, a skill level, your CV) → Sanity. If you're changing *how the site looks or works* (layout, new page types, new features) → GitHub.

---

# Part 2 — GitHub Workflow

Use this every time you need to change code (not content).

## 2.1 Getting the current code onto GitHub

1. Get the latest project zip (from me, or your own local copy) and extract it — you'll have a folder named `portfolio`
2. Go to your repo on **github.com**
3. Press the **`.`** key on your keyboard (or change the URL from `github.com` to `github.dev`) — this opens a full code editor in your browser
4. Drag the **entire `portfolio` folder** into the file Explorer panel on the left
5. **Before committing**, open `lib/projects.ts` or another file you know changed, and confirm the new content is actually there
6. Click the **Source Control icon** (branch/fork icon, left sidebar)
7. Type a commit message (e.g., "Update site")
8. Click the **checkmark (✓)**
9. **Watch the bottom-left corner** for a few seconds — you should see "Publishing Changes" or a sync spinner. Don't close the tab until this finishes.
10. Open a **new tab** to your normal github.com repo page, refresh, and confirm the change is actually there

## 2.2 Common GitHub mistakes (from real experience building this site)

| Symptom | Cause | Fix |
|---|---|---|
| Files appear flattened, no folders | Dragged individual files instead of the whole folder | Redo the drag with the outer `portfolio` folder itself |
| Commit seems to do nothing | Closed the tab before sync finished | Redo the commit, wait for the sync indicator |
| Site shows 404 after a successful build | Vercel's Root Directory or Framework Preset is wrong | See Part 4 (Troubleshooting) |
| Two files with the same name overwrote each other | Multiple files named `page.tsx` flattened into one folder | Always verify folder structure after any drag-and-drop |

## 2.3 Deploying to Vercel (after any GitHub push)

If your GitHub repo is already connected to Vercel, **this happens automatically** — every push triggers a new deployment within seconds. You only need to:
1. Go to your Vercel project → **Deployments** tab
2. Confirm a new deployment appears and reaches **"Ready"** status
3. Visit the live URL and confirm your change is there

---

# Part 3 — Sanity Studio: Complete Field Reference

Go to `thepiash.com/studio` and log in. You'll see four document types in the left sidebar.

## 3.1 Site Settings (one single document — controls the homepage & resume)

| Field | What it controls |
|---|---|
| Full Name | Shown in the Resume page header |
| Current Job Title | The exact title line under your name on Resume |
| Current Company | Shown next to your name on Resume |
| Hero Small Label | The small orange label above your headline (e.g., "OPERATIONS, IMPROVED THROUGH DATA") |
| Hero Headline | The big white headline. **Use a `\|` to mark where the gradient color starts** — e.g. `I improve operations by\|analyzing the data.` |
| Hero Paragraph | The paragraph under the headline |
| Rotating Role Titles | The words that type/rotate under the headline (add/remove/reorder freely) |
| Photo Badge Text | The small pill on your photo (e.g., "OPEN TO DATA ANALYST ROLES") |
| Photo | Your headshot — replaces the one in the code |
| CV File | Your resume PDF — replaces the one in the code, powers both the Download and Preview buttons |
| About Section Headline | The heading above your career timeline |
| Career Timeline | Add/remove/reorder timeline entries — each has Year, Title, Company/Scope, Description |
| Stat Counters | The 4 animated numbers on the homepage — each has Label, Number, Suffix (e.g. "+", "%") |
| Email | Used for the "Email Me" button and the copy-to-clipboard button |
| Location | Shown next to the location pin icon |
| Social Links | **Add, remove, or reorder any platform** — pick from the list (LinkedIn, GitHub, Facebook, Instagram, X, WhatsApp, YouTube, TikTok, Other) and paste the URL |
| Resume: Experience | Add/remove/reorder job entries — each has Role, Organization/Scope, Period, and multiple Bullet Points |
| Resume: Education | Add/remove entries — each has Title, Organization, Period |
| Resume: Certifications | A simple list — add or remove any line |

## 3.2 Project (one document per project)

| Field | What it does |
|---|---|
| Title | Project name |
| Slug | Auto-generated from title — this becomes the URL (`/projects/your-slug`) |
| Category | Type anything — BI, Automation, Operations, or something brand new. Filter buttons on the site update automatically. |
| Tag | One short badge shown on the card, e.g. "Power BI + Excel" |
| Status | Live / In Progress / Archived |
| Summary | Short description shown on the card |
| Problem / Solution / Impact | The three sections on the project's detail page |
| Cover Image / Gallery | Images for the project (gallery display not yet built into the detail page — flagged honestly, see Part 5) |
| GitHub Url | Shows a "Code" button if filled |
| Live Url | Shows a "Live" button if filled |
| Date | Used for sorting (newest first) |
| Featured | Sorts this project to the top of the grid and adds a "★ Featured" badge |
| Interactive Tool Type | Controls how a live tool displays — see 3.3 below |
| Embed URL | Used with "Embedded App" (Power BI/Streamlit link) or "External Link" (Colab link) |
| **Upload Tool File** | Upload a self-contained `.html` tool directly — no code push needed. Preferred over Embed URL when you have an actual file. |
| Native Tool Path | Only for "API-backed Tool" type — an internal page path like `/tools/sla-predictor` |

## 3.3 The three ways a tool can appear on a project page

| Tool Type | Use for | What happens |
|---|---|---|
| **Embedded App** | Power BI, Streamlit, or an uploaded self-contained HTML file | Renders live, inline, inside the project page |
| **External Link** | Google Colab notebooks (these block embedding) | Shows an "Open Notebook" button instead |
| **API-backed Tool** | A tool built directly into this site's code | Links to that internal page |

**To share a working tool with a colleague**, upload it via "Upload Tool File," set Type to "Embedded App," publish — then send them `thepiash.com/projects/your-project-slug`.

## 3.4 Blog Post

| Field | What it does |
|---|---|
| Title / Slug | Post title and URL |
| Category | Same flexible behavior as Projects |
| Featured Image | Shown on the post (rendering not yet wired — see Part 5) |
| Excerpt | Shown on the blog listing page |
| Body | Rich text editor — supports headings, paragraphs, code blocks (with syntax highlighting) |
| Published At | Controls sort order |
| Status | Must be "Published" to appear on the live site — "Draft" hides it |
| SEO Title / Description | Optional, for search engines |

## 3.5 Skill Category

| Field | What it does |
|---|---|
| Category Name | e.g. "Data Analysis Applied to Ops" |
| Accent Color (hex) | The color used for that category's icon and progress bars |
| Display Order | Controls the order categories appear in |
| Skills | Add/remove individual skills, each with a Name and a Level (0–100, controls the progress bar fill) |

---

# Part 4 — Troubleshooting (Real Issues From Building This Site)

| Symptom | Likely Cause | Fix |
|---|---|---|
| Live site shows old content after a push | The push never actually reached GitHub | Check github.com directly (not github.dev) to confirm the file changed |
| 404: NOT_FOUND after a successful build | Vercel's Framework Preset is set to "Other" instead of "Next.js" | Settings → Build and Development → set Framework Preset to Next.js → trigger a fresh commit (not just "Redeploy," which reuses old settings) |
| "This site can't be reached" on custom domain | DNS/nameservers still propagating | Can take up to 48 hours; use the `.vercel.app` URL in the meantime |
| Studio shows "Schema errors" | A plugin is missing for a field type (e.g., "code" blocks need `@sanity/code-input`) | Already fixed in the current codebase — if it recurs, check `sanity.config.ts` plugins list |
| Studio asks for CORS origin | Sanity's security setting doesn't recognize your domain yet | sanity.io/manage → your project → API → CORS Origins → add your domain, check "Allow credentials" |
| Colors look washed out / wrong shade | Tailwind's default color used instead of the custom brand color | Check for classes like `violet-300` (wrong) vs `violet` (correct, the custom brand color) |
| Site works on desktop, animation missing on mobile | Some animations are intentionally desktop-only (the side background chart) | Not a bug — there's no equivalent empty space to fill on mobile |

---

# Part 5 — Honest Current Limitations

Things flagged as not yet built, so you're never surprised:

- Project **Gallery** images and Blog **Featured Image** have schema fields but aren't rendered on the detail pages yet
- No analytics (Google Analytics / Search Console) wired in yet
- No formal Lighthouse/browser-compatibility test reports (these need to be run against the live site directly)

---

# Part 6 — Backing Up Your Content

Your GitHub repo backs up your **code**. It does not back up your **Sanity content**. To back that up too:

```bash
npx sanity dataset export production backup.tar.gz
```

Run this from your `sanity/` folder (needs Node.js locally). Save the resulting file into a `backups/` folder in your repo and push it like any other file. To restore from a backup later:

```bash
npx sanity dataset import backup.tar.gz production
```

---

# Quick Reference Card

| I want to... | Go to |
|---|---|
| Change any homepage text | Sanity → Site Settings |
| Add/edit a project | Sanity → Project |
| Write a blog post | Sanity → Blog Post |
| Update a skill level | Sanity → Skill Category |
| Upload a working tool | Sanity → Project → Upload Tool File |
| Change the site's layout/design | GitHub (code push required) |
| Add a new page type | GitHub (code push required) |
| Fix a broken deployment | Vercel → Deployments / Settings |
| Back up everything content-wise | `npx sanity dataset export` |
