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
  aboutHeadline: 'Same job, sharper method: operations run on data now.',
  timeline: [
    { year: '2019', title: 'Delivery Driver — Mrsool & HungerStation', company: 'Buraydah, Al Qasim', description: 'Frontline last-mile delivery — where the operational instincts started.' },
    { year: '2022', title: 'Delivery Driver', company: 'Al-Dawaa Medical Services Co. — Jazan', description: 'Moved into e-commerce delivery operations.' },
    { year: '2022', title: 'Promoted to Regional E-commerce Operations Team Leader', company: 'Al-Dawaa Medical Services Co. — East Region', description: 'Took ownership of OTD, cost-per-delivery, rider utilization, and team performance across the East Region.' },
    { year: 'Now', title: 'Promoted to E-commerce Operations Team Leader', company: 'Al-Dawaa Medical Services Co. — All Regions', description: 'Expanded from East Region to operations monitoring and performance oversight across all regions nationwide.' },
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
