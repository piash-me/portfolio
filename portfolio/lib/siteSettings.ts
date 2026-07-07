export type TimelineEntry = {
  year: string;
  title: string;
  company: string;
  description: string;
};

export type StatEntry = {
  label: string;
  value: number;
  suffix: string;
};

export type SocialLink = {
  platform: 'LinkedIn' | 'GitHub' | 'Facebook' | 'Instagram' | 'X (Twitter)' | 'WhatsApp' | 'YouTube' | 'TikTok' | 'Other';
  url: string;
  label?: string;
};

export type ExperienceEntry = {
  role: string;
  org: string;
  period: string;
  points: string[];
};

export type EducationEntry = {
  title: string;
  org: string;
  period: string;
};

export type SiteSettings = {
  name: string;
  currentTitle: string;
  company: string;
  heroEyebrow: string;
  heroHeadline: string;
  heroSubtext: string;
  roleTags: string[];
  badgeText: string;
  aboutHeadline: string;
  timeline: TimelineEntry[];
  stats: StatEntry[];
  email: string;
  location: string;
  socialLinks: SocialLink[];
  photoUrl?: string; // from Sanity Site Settings — falls back to /public/photo.jpg when not set
  cvUrl?: string;    // from Sanity Site Settings — falls back to /public/cv.pdf when not set
  experience: ExperienceEntry[];
  education: EducationEntry[];
  certifications: string[];
};

// This is the actual current content of the site. Once real values are added in
// Sanity's Site Settings document, getSiteSettings() returns those instead —
// nothing here needs to change; it's purely the safety net.
export const fallbackSiteSettings: SiteSettings = {
  name: 'Mohammad Piash',
  currentTitle: 'E-commerce Operations Team Leader | Last-Mile Delivery Operations | Operations Analytics | Process Optimization | Performance Improvement',
  company: 'Al-Dawaa Medical Services Co.',
  heroEyebrow: 'OPERATIONS, IMPROVED THROUGH DATA',
  heroHeadline: 'I improve operations by|analyzing the data.',
  heroSubtext: 'I lead last-mile delivery operations at Al-Dawaa Medical Services Co. across all regions of Saudi Arabia — accountable for fleet performance, SLA compliance, and driver output. I use SQL, Power BI, and Python to turn On-Time Delivery, cost-per-delivery, and rider utilization data into decisions that measurably improve performance.',
  roleTags: [
    'Operations Data Analyst',
    'Process Improvement through Data',
    'SLA & Fleet Performance Analytics',
    'Data-Driven Operations Leader',
  ],
  badgeText: 'OPEN TO DATA ANALYST ROLES',
  aboutHeadline: 'Same responsibilities. Sharper tools.',
  timeline: [
    { year: '2019', title: 'Delivery Driver — Mrsool & HungerStation', company: 'Buraydah, Al Qasim', description: 'Frontline last-mile delivery — the starting point for everything that followed.' },
    { year: '2022', title: 'Delivery Driver', company: 'Al-Dawaa Medical Services Co. — Jazan', description: 'Moved into e-commerce delivery operations.' },
    { year: '2022', title: 'Promoted to Regional E-commerce Operations Team Leader', company: 'Al-Dawaa Medical Services Co. — East Region', description: 'Took ownership of OTD, rider utilization, and team performance across the East Region.' },
    { year: '2026 – Present', title: 'Promoted to E-commerce Operations Team Leader', company: 'Al-Dawaa Medical Services Co. — All Regions', description: 'Expanded from East Region to operations monitoring and performance oversight across all regions nationwide.' },
  ],
  stats: [
    { label: 'Years in E-commerce Ops', value: 4, suffix: '+' },
    { label: 'Years in Last-Mile Delivery', value: 7, suffix: '+' },
    { label: 'Core KPIs Owned', value: 5, suffix: '' },
    { label: 'Certifications', value: 5, suffix: '' },
  ],
  email: 'piashm03@gmail.com',
  location: 'Al Khobar, Eastern, Saudi Arabia',
  socialLinks: [
    { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/mohammadpiash' },
    { platform: 'WhatsApp', url: 'https://wa.me/966562677858' },
  ],
  experience: [
    { role: 'E-commerce Operations Team Leader', org: 'Al-Dawaa Medical Services Co. — All Regions', period: '2026 – Present', points: [
      'Promoted from Regional E-commerce Operations Team Leader (East Region) to oversee last-mile operations monitoring and performance across all regions nationwide.',
      'Own On-Time Delivery (OTD), cost-per-delivery (CPD/CPO), and rider utilization across the last-mile fleet at national scale.',
      'Manage delivery workflows through last-mile technology platforms and coordinate with support teams on issue resolution.',
      'Use a data-driven approach — Excel, Power BI — to identify improvement opportunities and drive continuous improvement.',
    ]},
    { role: 'Regional E-commerce Operations Team Leader', org: 'Al-Dawaa Medical Services Co. — East Region', period: 'Sep 2022 – 2026', points: [
      'Promoted from Delivery Driver to Regional E-commerce Operations Team Leader, taking ownership of OTD, rider utilization, and team performance across the East Region.',
    ]},
    { role: 'Delivery Driver', org: 'Al-Dawaa Medical Services Co. — Jazan Region', period: 'Mar 2022 – Sep 2022', points: [
      'Frontline last-mile delivery execution ahead of promotion to Regional E-commerce Operations Team Leader.',
    ]},
    { role: 'Delivery Driver', org: 'HungerStation & Mrsool — Buraydah, Al Qasim', period: 'Jan 2019 – Feb 2022', points: [
      'Three years of frontline last-mile delivery across two major Saudi delivery platforms.',
    ]},
    { role: 'WordPress Developer & Frontend Web Developer', org: 'Fiverr (Freelance) — Riyadh', period: 'Jan 2019 – Mar 2021', points: [
      'Built and customized WordPress sites and frontend web projects for freelance clients.',
    ]},
  ],
  education: [
    { title: 'Higher Secondary Certificate, Entrepreneurship Development', org: 'Islamia Technical And Business Management College', period: 'Jan 2013 – Dec 2014' },
  ],
  certifications: [
    'Microsoft Excel — Data Analysis with Excel Pivot Tables',
    'Microsoft PowerPoint: School to Corporate — Basic to Advance',
    'ChatGPT Artificial Intelligence',
    'Google Bard',
    'Cyber Security (Honors: Cyber Security Expert)',
  ],
};

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return fallbackSiteSettings;
  try {
    const { sanityClient, SITE_SETTINGS_QUERY } = await import('./sanity');
    const live = await sanityClient.fetch(SITE_SETTINGS_QUERY);
    if (!live) return fallbackSiteSettings;
    // Merge so a partially-filled Sanity document doesn't blank out fields you haven't set yet.
    return { ...fallbackSiteSettings, ...live };
  } catch {
    return fallbackSiteSettings;
  }
}
