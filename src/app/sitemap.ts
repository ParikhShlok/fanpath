import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/dashboard', '/assistant', '/updates', '/profile'];

  return routes.map((route) => ({
    url: `https://fanpath-demo.vercel.app${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.7,
  }));
}
