import { createClient } from 'next-sanity';

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});

export const PROJECTS_QUERY = `*[_type == "project"] | order(date desc){
  title, "slug": slug.current, category, tags, status, summary, problem, solution, impact,
  tools, coverImage, githubUrl, liveUrl, featured, date, toolType, embedUrl, liveToolPath
}`;

export const POSTS_QUERY = `*[_type == "post" && status == "Published"] | order(publishedAt desc){
  title, "slug": slug.current, category, excerpt, featuredImage, publishedAt, body
}`;

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  name, currentTitle, company, heroEyebrow, heroHeadline, heroSubtext, roleTags, badgeText,
  "photoUrl": photo.asset->url, "cvUrl": cvFile.asset->url, aboutHeadline, timeline, stats,
  email, location, socialLinks, seoTitle, seoDescription, "ogImageUrl": ogImage.asset->url
}`;

export const SKILLS_QUERY = `*[_type == "skillCategory"] | order(order asc){
  label, colorHex, skills
}`;
