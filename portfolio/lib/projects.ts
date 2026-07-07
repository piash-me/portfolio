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
  liveToolPath?: string; // internal path like /tools/sla-risk, for tools built directly into this site
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

