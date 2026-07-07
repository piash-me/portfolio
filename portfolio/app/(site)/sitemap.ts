import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://thepiash.com';
  const routes = ['', '/resume', '/blog', '/tools'].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.7,
  }));
  return routes;
}
