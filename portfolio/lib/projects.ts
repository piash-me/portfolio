// Shared project data — the `projects` array below is the fallback/example content.
// getProjects() actually fetches live data from Sanity when NEXT_PUBLIC_SANITY_PROJECT_ID
// is set, and falls back to this array otherwise (before setup, or if Sanity is unreachable).

export type Project = {
  slug: string;
  title: string;
  category: string; // any value works — new categories on new projects appear automatically as filters
  tag: string;
  status: 'Live' | 'In Progress' | 'Archived';
  summary: string;
  problem: string;
  solution: string;
  impact: string;
  tools: string[];
  githubUrl?: string;
  liveUrl?: string;
  date: string;
  // Interactive tool support — how a live Power BI report, Streamlit app,
  // Colab notebook, or in-house tool actually gets shown on the project page.
  toolType?: 'Embedded App' | 'API-backed Tool' | 'External Link';
  embedUrl?: string;     // Power BI public embed URL, Streamlit app URL, etc. — renders in an iframe
  toolFileUrl?: string;  // a self-contained HTML tool uploaded directly in Sanity — preferred over embedUrl when both exist
  liveToolPath?: string; // internal path like /tools/sla-risk, for tools built directly into this site
  featured?: boolean; // featured projects sort to the top of the grid
};

export const projects: Project[] = [
  {
    slug: 'otd-performance-dashboard',
    title: 'OTD Performance Dashboard',
    category: 'BI',
    tag: 'Power BI + Excel',
    status: 'Live',
    summary: 'Tracks On-Time Delivery, delivery success rate, and cost-per-delivery (CPD/CPO) across the fleet in real time.',
    problem: 'On-Time Delivery and cost-per-delivery numbers were scattered across daily manual spreadsheets, rebuilt from scratch each morning. By the time a trend was visible, three or four days of underperformance had already happened.',
    solution: 'Built a Power BI dashboard connected to the daily export from the delivery platform, with OTD, delivery success rate, and CPD/CPO broken down by zone and shift. Excel Pivot Tables handle the intermediate cleanup before the data reaches Power BI.',
    impact: 'Cut the daily reporting task from roughly 45 minutes to under 5, and made it possible to catch an SLA slip on the same day instead of three days later.',
    tools: ['Power BI', 'Excel Pivot Tables', 'Delivery Platform Exports'],
    date: '2025-11-01',
    toolType: 'Embedded App',
    embedUrl: '', // paste your Power BI "Publish to web" embed URL here — renders live on the project page
  },
  {
    slug: 'rider-utilization-analysis',
    title: 'Rider Utilization Analysis',
    category: 'BI',
    tag: 'Excel Pivot Tables',
    status: 'Live',
    summary: 'Breaks down rider utilization by zone and shift to guide fleet allocation decisions.',
    problem: 'Some zones were consistently overstaffed during quiet hours while others were short-handed during peak windows, but this was only ever noticed anecdotally, never measured.',
    solution: 'Built a Pivot Table model breaking down rider utilization (active delivery time vs idle time) by zone and shift, refreshed weekly from raw delivery logs.',
    impact: 'Reallocated riders across two zones based on the data, improving peak-hour coverage without adding headcount.',
    tools: ['Excel Pivot Tables', 'Delivery Logs'],
    date: '2025-09-15',
  },
  {
    slug: 'root-cause-tracker',
    title: 'Root Cause Tracker',
    category: 'Operations',
    tag: 'Process Improvement',
    status: 'Live',
    summary: 'A structured framework for logging and resolving recurring delivery exceptions with delivery partners.',
    problem: 'Delivery exceptions (failed attempts, address issues, customer unavailability) were handled case by case with no record of recurring patterns, so the same root causes kept resurfacing.',
    solution: 'Created a simple categorized log for every exception, tagged by root cause type, and a weekly review process with delivery partners to address the top recurring categories.',
    impact: 'Identified that a single root cause — incomplete address data at order time — accounted for over a quarter of failed first attempts, leading to a fix upstream in the ordering flow.',
    tools: ['Excel', 'Weekly Partner Review Process'],
    date: '2025-06-01',
  },
  {
    slug: 'sql-learning-log',
    title: 'SQL Learning Log',
    category: 'Automation',
    tag: 'SQL',
    status: 'In Progress',
    summary: 'Documenting the transition from Excel-based reporting to SQL queries for operational data.',
    problem: 'Excel-based reporting works but doesn\u2019t scale — every new question means a new manual pivot table, and joining data from multiple sources gets unwieldy fast.',
    solution: 'Working through SQL fundamentals using real (anonymized) operational data structures, rebuilding existing Excel reports as SQL queries as a learning exercise.',
    impact: 'In progress — early queries have already replicated reports that used to take 3 separate Excel pivot tables in a single query.',
    tools: ['SQL', 'SQLite (practice environment)'],
    date: '2026-05-01',
    toolType: 'External Link',
    liveUrl: '', // paste your Google Colab share link here — shown as a "Run it yourself" button
  },
  // --- DEMO CONTENT: for testing at scale on the live site. Delete this whole block when done. ---
  {
    slug: 'demo-fleet-idle-time-tracker', title: '[DEMO] Fleet Idle-Time Tracker', category: 'Operations', tag: 'Excel', status: 'Live',
    summary: 'Flags riders with unusually long idle windows between deliveries.',
    problem: 'Idle time between drops was invisible until someone manually reviewed timestamps.',
    solution: 'A daily Excel macro flags any rider with over 20 minutes idle between two consecutive deliveries.',
    impact: 'Surfaced three recurring bottleneck zones within the first two weeks.',
    tools: ['Excel'], date: '2025-08-01',
  },
  {
    slug: 'demo-customer-complaint-categorizer', title: '[DEMO] Customer Complaint Categorizer', category: 'BI', tag: 'Power BI', status: 'Live',
    summary: 'Groups incoming complaints into root-cause buckets automatically.',
    problem: 'Complaints were logged as free text with no structure, making patterns hard to see.',
    solution: 'A Power BI model tags complaints by keyword into categories (late delivery, damaged item, wrong address, other).',
    impact: 'Cut manual complaint triage time by roughly half.',
    tools: ['Power BI'], date: '2025-07-01',
  },
  {
    slug: 'demo-shift-handover-dashboard', title: '[DEMO] Shift Handover Dashboard', category: 'Operations', tag: 'Power BI', status: 'Live',
    summary: 'One-screen summary for shift leads handing over to the next shift.',
    problem: 'Handovers relied on verbal summaries, and details were regularly lost.',
    solution: 'A live dashboard showing open exceptions, pending deliveries, and flagged riders at shift-change time.',
    impact: 'Reduced repeated/duplicate follow-ups on already-resolved issues.',
    tools: ['Power BI'], date: '2025-06-01',
  },
  {
    slug: 'demo-weekend-demand-forecast', title: '[DEMO] Weekend Demand Forecast', category: 'Automation', tag: 'Python', status: 'In Progress',
    summary: 'A simple model predicting weekend order volume from historical data.',
    problem: 'Weekend staffing was based on gut feel, leading to under- or overstaffing.',
    solution: 'A basic regression model using the last 12 weeks of order data to project the coming weekend\u2019s volume.',
    impact: 'Still validating accuracy before rolling into actual staffing decisions.',
    tools: ['Python'], date: '2025-05-01',
  },
  {
    slug: 'demo-rider-onboarding-checklist', title: '[DEMO] Rider Onboarding Checklist Tool', category: 'Operations', tag: 'Google Sheets', status: 'Live',
    summary: 'Digitized the paper onboarding checklist for new riders.',
    problem: 'Paper checklists went missing, and onboarding steps were regularly skipped.',
    solution: 'A Google Form feeding a tracked Sheet, with automatic reminders for incomplete steps.',
    impact: 'Onboarding completion visibility went from "unknown" to fully tracked.',
    tools: ['Google Forms', 'Google Sheets'], date: '2025-04-01',
  },
  {
    slug: 'demo-cost-per-zone-breakdown', title: '[DEMO] Cost-per-Zone Breakdown', category: 'BI', tag: 'Excel Pivot Tables', status: 'Live',
    summary: 'Compares delivery cost efficiency across operating zones.',
    problem: 'Zone-level cost differences were assumed, never actually measured.',
    solution: 'A pivot-table model breaking down cost per delivery by zone and vehicle type.',
    impact: 'Identified one zone running notably less efficiently, prompting a route review.',
    tools: ['Excel Pivot Tables'], date: '2025-03-01',
  },
];

// Fetches live projects from Sanity if it's configured and has content; otherwise
// falls back to the examples above. This is what makes "upload a project in the
// admin panel and it appears on the site" actually true, not just a schema on paper.
export async function getProjects(): Promise<Project[]> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return projects;
  try {
    const { sanityClient, PROJECTS_QUERY } = await import('./sanity');
    const live = await sanityClient.fetch(PROJECTS_QUERY);
    return Array.isArray(live) && live.length > 0 ? live : projects;
  } catch {
    return projects; // Sanity unreachable or misconfigured — never let the homepage break
  }
}

// Decides where clicking a project card should actually go.
// Tool-type projects skip the write-up page entirely and open the working
// tool directly — better UX for something someone wants to actually *use*,
// not read about first. Non-tool projects still go to the full write-up page.
export function projectLinkTarget(p: Project): { href: string; external: boolean; skipsWriteup: boolean } {
  if (p.toolType === 'Embedded App' && (p.toolFileUrl || p.embedUrl)) {
    // Routes through /run/[slug] on your own domain so the address bar always shows
    // thepiash.com, even though the actual file might be hosted on Sanity's CDN,
    // Streamlit, etc. underneath.
    return { href: `/run/${p.slug}`, external: false, skipsWriteup: true };
  }
  if (p.toolType === 'External Link' && p.embedUrl) {
    // Colab (and similar) actively block iframe embedding, so this one has to be
    // a real external link — there's no way to wrap it under your own domain.
    return { href: p.embedUrl, external: true, skipsWriteup: true };
  }
  if (p.toolType === 'API-backed Tool' && p.liveToolPath) {
    return { href: p.liveToolPath, external: false, skipsWriteup: true };
  }
  return { href: `/projects/${p.slug}`, external: false, skipsWriteup: false };
}

