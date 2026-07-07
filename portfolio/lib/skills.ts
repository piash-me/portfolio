export type Skill = { name: string; level: number };

export type SkillCategory = {
  label: string;
  colorHex: string;
  skills: Skill[];
};

export const fallbackSkills: SkillCategory[] = [
  { label: 'Operations', colorHex: '#C77D3D', skills: [
    { name: 'Last-Mile Delivery Ops', level: 95 }, { name: 'OTD & SLA Management', level: 92 },
    { name: 'Rider/3PL Coordination', level: 90 }, { name: 'Root Cause Analysis', level: 85 },
  ]},
  { label: 'Data Analysis Applied to Ops', colorHex: '#8B7CF6', skills: [
    { name: 'Data Visualization & Dashboarding', level: 85 }, { name: 'Excel (Pivot Tables)', level: 92 },
    { name: 'Power BI', level: 70 }, { name: 'SQL', level: 45 },
  ]},
  { label: 'Automation & AI', colorHex: '#5EC8D8', skills: [
    { name: 'ChatGPT / AI Tools', level: 80 }, { name: 'Google Bard', level: 70 },
    { name: 'Cyber Security Awareness', level: 75 }, { name: 'Python', level: 35 },
  ]},
  { label: 'Leadership', colorHex: '#D89EC7', skills: [
    { name: 'Team Leadership', level: 92 }, { name: 'Driver Performance Coaching', level: 88 },
    { name: 'Cross-Functional Coordination', level: 85 },
  ]},
];

export async function getSkills(): Promise<SkillCategory[]> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return fallbackSkills;
  try {
    const { sanityClient, SKILLS_QUERY } = await import('./sanity');
    const live = await sanityClient.fetch(SKILLS_QUERY);
    return Array.isArray(live) && live.length > 0 ? live : fallbackSkills;
  } catch {
    return fallbackSkills;
  }
}
