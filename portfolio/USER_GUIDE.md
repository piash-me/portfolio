# User Guide — Going Live, Updating Content, and Managing Your Site

This is the plain-language version of the README: what to do, in order, with no code knowledge assumed beyond running a few commands once.

---

## Part 1 — Going Live (one-time setup)

### Step 1: Install the tools on your computer
You need [Node.js](https://nodejs.org) (LTS version) installed once. Then:

```bash
npm install
```

### Step 2: Create your free Sanity project (this becomes your admin panel) — no CLI needed
Go to [sanity.io/manage](https://www.sanity.io/manage) in your browser → sign up (free) → **"Create new project"** → give it a name → choose the free "Default" dataset. Copy the **Project ID** it shows you.

This is fully browser-based — you don't need to run any command to do this step.

### Step 3: Connect the website to your admin panel
Copy `.env.example` to `.env.local` and paste your Project ID in:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
```

### Step 4: Preview it locally
```bash
npm run dev
```
Open `http://localhost:3000` — this is your site, running on your computer.

### Step 5: Put your content in
- Replace `public/photo.jpg` with your photo (already done — your real photo is in there)
- Replace `public/cv.pdf` with your latest CV (already done — your uploaded resume is in there)

### Step 6: Publish the code to GitHub
Push this project to a GitHub repo (see the "Filling the Repository" guidance from earlier in our conversation if you're doing this without a local terminal).

### Step 7: Go live on Vercel (free hosting)
1. Go to [vercel.com](https://vercel.com), sign up with your GitHub account
2. Click "New Project," select your portfolio repository
3. **Important**: set **Root Directory** to `portfolio` if your repo has that folder structure, and set **Framework Preset** to **Next.js** explicitly if it isn't auto-detected
4. Add your environment variables (the same ones from `.env.local`) in the Vercel settings screen
5. Click Deploy

### Step 8: Connect your own domain (optional)
Buy a domain, add it in Vercel → Settings → Domains, then either add the DNS records Vercel shows you, or point your domain's nameservers to Vercel's (`ns1.vercel-dns.com` / `ns2.vercel-dns.com`) — nameservers can take up to 48 hours to propagate.

### Step 9: Access your admin panel — no CLI needed at all
Your admin panel is **built directly into your website** at:
```
https://yourdomain.com/studio
```
(or `https://your-project.vercel.app/studio` if you haven't connected a custom domain yet)

Just visit that URL in any browser and log in with the same account you used at sanity.io/manage. No terminal, no `npx sanity deploy`, nothing to install beyond what Vercel already builds automatically. This was specifically built this way because local CLI access isn't always available (e.g., restricted office networks) — the entire admin panel now travels with your site's normal deployment.

**You're live. Everything from here is Part 2 and 3 — no developer needed.**

---

## Part 2 — Updating Content (using the admin panel)

Go to `yourdomain.com/studio` (or `your-project.vercel.app/studio`) and log in.

### Adding a new project
1. Click "Project" in the left sidebar → "Create new"
2. Fill in Title, Category, Tags, Status, Summary, Cover Image
3. If it's an automation/data tool you built:
   - Set **Interactive Tool Type** to "Embedded App" (if hosted elsewhere, like Streamlit) or "API-backed Tool" (if it's a simple calculator-style tool)
   - Paste the URL in **Embed URL** if applicable
4. Click Publish — it appears on your live site within seconds, no redeploy needed

### Writing and publishing a blog post
1. Click "Blog Post" → "Create new"
2. Write your title, pick a category, add a featured image
3. Write the body using the rich text editor (supports headings, code blocks, images)
4. Set Status to "Draft" while writing, "Published" when ready
5. Click Publish

### Updating your CV
1. Click "Site Settings"
2. Under **CV File**, upload your new PDF
3. Publish — the Download CV button now serves the new file

### Updating your photo
Same as above, under **Photo** in Site Settings.

### Updating your email, location, or social links
All under Site Settings — edit the field, click Publish.

---

## Part 3 — The Update Process (when you want to change the site's design or add a page)

Content changes (above) never need a developer. Design/structural changes — like adding a whole new page or changing the layout — go through this cycle:

1. Make the change in the code (ask me any time, or edit the `.tsx` files directly if you're comfortable)
2. Test it locally: `npm run dev`
3. Push the change to GitHub: `git add . && git commit -m "describe the change" && git push`
4. Vercel automatically redeploys — usually live within a minute, no manual steps

---

## Part 4 — Making the Contact Form Actually Send Emails

The contact form on your homepage is already built and functional in the code — it just needs one free account to actually deliver messages to your inbox:

1. Go to [resend.com](https://resend.com) → sign up free
2. Create an API key from their dashboard
3. Add it to `.env.local` (and in Vercel's project settings): `RESEND_API_KEY=your_key_here`
4. Redeploy (or just `git push` if already live) — the form now emails `piashm03@gmail.com` directly when someone submits it

Until this is set up, submissions are safely logged on the server instead of failing, so nothing breaks — they just won't reach your inbox yet.

## Part 5 — Adding a Future Data/Automation Tool

Two ways, both explained with a working example in `app/tools/page.tsx`:

- **Built in Streamlit/Python?** Host it free on Streamlit Community Cloud or Hugging Face Spaces, then add it as a Project in Sanity with Tool Type "Embedded App" and the URL.
- **A simple in-browser tool (a form → a result)?** I can build you a matching API route under `app/api/tools/your-tool/route.ts` — just describe what it should calculate.

---

## Part 6 — Maintenance & Troubleshooting

| Issue | What to do |
|---|---|
| Site looks broken after a deploy | Check the Vercel dashboard's "Deployments" tab for the build error log, or ask me to review it |
| Forgot Sanity Studio password | Use "Forgot password" on the Sanity login screen — it's tied to your email |
| Want to back up your content | Sanity keeps a full history of every document automatically; for a manual export, run `npx sanity dataset export` from the `/sanity` folder |
| Domain not working after adding DNS records | DNS changes can take up to 24–48 hours; check propagation at whatsmydns.net |
| Want to check site speed/SEO health | Run a free scan at pagespeed.web.dev with your live URL |

---

## What's Included in This Package

- Full Next.js source code (`app/`, `components/`, `lib/`)
- Sanity CMS schemas and config (`sanity/`) — this is your admin panel's data model
- Your real photo and CV already placed in `public/`
- `README.md` — the technical version of this guide
- This file — the plain-language version

## What Still Needs Building (flagged honestly, not hidden)

- Single project case-study page and single blog post page (detail views)
- The contact form's backend (currently the form fields aren't wired to send email — needs a service like Resend, ~15 minutes to add)
- Analytics script tags (Google Analytics / Search Console verification)

Ask me for any of these whenever you're ready — each is a small, self-contained addition to what's already here.
