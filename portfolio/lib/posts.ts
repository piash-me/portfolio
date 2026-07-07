// Shared blog post data — used by both the blog listing and single post pages.
// Once Sanity is connected, replace this array with a fetch of POSTS_QUERY and
// render `body` (PortableText blocks) via @portabletext/react instead of this
// simplified block array. The block shape mirrors that swap intentionally.

export type PostBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string; id: string }
  | { type: 'code'; language: string; code: string };

export type Post = {
  slug: string;
  title: string;
  category: 'BI' | 'Automation' | 'Operations';
  readTime: string;
  date: string;
  excerpt: string;
  body: PostBlock[];
};

export const posts: Post[] = [
  {
    slug: 'automating-sla-report-with-power-bi',
    title: 'How I Automated Our Weekly SLA Report with Power BI',
    category: 'BI',
    readTime: '6 min',
    date: 'Jun 2026',
    excerpt: 'What used to take six hours of manual spreadsheet work now refreshes itself every morning.',
    body: [
      { type: 'paragraph', text: 'Every week, building the SLA report meant exporting raw delivery data, cleaning it in Excel, building three separate pivot tables, and formatting a summary for the team. That was roughly six hours of manual work, every single week.' },
      { type: 'heading', text: 'The starting point', id: 'starting-point' },
      { type: 'paragraph', text: 'The raw data came from the delivery platform as a daily CSV export. Every field needed cleaning: dates in inconsistent formats, duplicate rows from retried deliveries, and zone names that didn\u2019t match across systems.' },
      { type: 'heading', text: 'Building the Power BI model', id: 'power-bi-model' },
      { type: 'paragraph', text: 'Instead of cleaning in Excel every week, I built a Power Query step that does the cleaning automatically on import. On-Time Delivery, delivery success rate, and cost-per-delivery are now calculated as measures directly in the model, not manually in a spreadsheet.' },
      { type: 'code', language: 'DAX', code: 'OTD % = \n  DIVIDE(\n    CALCULATE(COUNTROWS(Deliveries), Deliveries[OnTime] = TRUE()),\n    COUNTROWS(Deliveries)\n  )' },
      { type: 'heading', text: 'What changed', id: 'what-changed' },
      { type: 'paragraph', text: 'The report now refreshes automatically each morning. The six hours of manual work became about five minutes of checking the dashboard looks right before sharing it.' },
    ],
  },
  {
    slug: 'sql-before-python',
    title: 'Why Operations People Should Learn SQL Before Python',
    category: 'Automation',
    readTime: '5 min',
    date: 'May 2026',
    excerpt: 'SQL got me querying real delivery data in a week. Here is the order I would recommend learning in.',
    body: [
      { type: 'paragraph', text: 'When I started learning to code, the internet\u2019s advice was almost universally "learn Python first." For someone coming from an operations background who mainly deals with structured tables of delivery data, that turned out to be the wrong order.' },
      { type: 'heading', text: 'What operational data actually looks like', id: 'what-data-looks-like' },
      { type: 'paragraph', text: 'Delivery records, driver logs, SLA exceptions — almost everything in operations lives in tables with rows and columns. That is exactly what SQL is built for, and exactly what Excel already trained me to think in.' },
      { type: 'heading', text: 'Where Python helps later', id: 'where-python-helps' },
      { type: 'paragraph', text: 'Python became useful once I needed to automate something SQL alone couldn\u2019t — like pulling data from an API on a schedule, or building a small tool with a form and a calculation behind it.' },
      { type: 'code', language: 'SQL', code: 'SELECT zone, AVG(delivery_time_minutes) AS avg_time\nFROM deliveries\nWHERE delivery_date >= CURRENT_DATE - INTERVAL \'7 days\'\nGROUP BY zone\nORDER BY avg_time DESC;' },
      { type: 'paragraph', text: 'If you\u2019re coming from operations, my honest recommendation: SQL first, Excel-to-SQL translation exercises second, Python only once you hit something SQL genuinely can\u2019t do.' },
    ],
  },
  {
    slug: 'real-cost-of-missed-sla',
    title: 'The Real Cost of a Missed SLA (And How We Track It)',
    category: 'Operations',
    readTime: '7 min',
    date: 'Apr 2026',
    excerpt: 'A breakdown of the cost model we use to translate late deliveries into a number leadership reacts to.',
    body: [
      { type: 'paragraph', text: '"We missed SLA on 4% of deliveries this week" doesn\u2019t move a room the way a cost figure does. Translating operational metrics into cost is often the difference between a shrug and a real conversation.' },
      { type: 'heading', text: 'Building the cost model', id: 'cost-model' },
      { type: 'paragraph', text: 'Every missed SLA carries a mix of direct cost (redelivery, compensation) and indirect cost (customer support time, churn risk). We built a simple weighted model combining both into a single "cost per missed SLA" figure.' },
      { type: 'heading', text: 'Why this changed the conversation', id: 'why-it-changed' },
      { type: 'paragraph', text: 'A 4% miss rate sounds small. The same 4% expressed as a monthly cost figure was large enough that it became a standing agenda item in leadership reviews.' },
    ],
  },
  {
    slug: 'excel-to-power-bi-migration',
    title: 'From Excel to Power BI: A Practical Migration Path',
    category: 'BI',
    readTime: '8 min',
    date: 'Mar 2026',
    excerpt: 'Moving a team off spreadsheets does not happen overnight. Here is the phased approach that worked.',
    body: [
      { type: 'paragraph', text: 'Migrating an entire reporting process off Excel in one go is a good way to break everything the team relies on. A phased approach worked much better in practice.' },
      { type: 'heading', text: 'Phase 1 \u2014 Mirror the existing report', id: 'phase-1' },
      { type: 'paragraph', text: 'The first Power BI dashboard didn\u2019t add anything new — it just replicated the existing Excel report exactly, so the team could trust the numbers matched before relying on it.' },
      { type: 'heading', text: 'Phase 2 \u2014 Add what Excel couldn\u2019t do', id: 'phase-2' },
      { type: 'paragraph', text: 'Only after the numbers were trusted did we add drill-downs, zone-level filtering, and daily auto-refresh — the things that were genuinely painful or impossible in the old spreadsheet workflow.' },
      { type: 'heading', text: 'Phase 3 \u2014 Retire the spreadsheet', id: 'phase-3' },
      { type: 'paragraph', text: 'The Excel version was only switched off once three consecutive weeks of both versions matched exactly. That trust-building step is easy to skip and expensive to skip.' },
    ],
  },
];
