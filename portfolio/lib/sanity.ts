import { createClient } from 'next-sanity';

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});

export const PROJECTS_QUERY = `*[_type == "project"] | order(date desc){
  title, slug, category, tags, status, summary, coverImage, githubUrl, liveUrl, featured,
  toolType, embedUrl, liveToolPath
}`;

export const POSTS_QUERY = `*[_type == "post" && status == "Published"] | order(publishedAt desc){
  title, slug, category, excerpt, featuredImage, publishedAt
}`;

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  heroHeadline, heroSubtext, cvFile, photo, email, location, linkedin, github
}`;
