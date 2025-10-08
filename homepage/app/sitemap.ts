import type { MetadataRoute } from 'next'

import { SITE_URL } from '@/lib/brand'

const BASE_URL = SITE_URL.replace(/\/$/, '')
const LAST_UPDATED = new Date('2025-10-08T22:55:00Z')

const ROUTES: Array<{
  path: string
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>
  priority: number
}> = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/pricing', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/playbook', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/legal/sla', changeFrequency: 'monthly', priority: 0.5 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: LAST_UPDATED,
    changeFrequency,
    priority,
  }))
}
