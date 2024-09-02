import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://settur.com.mx',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
      alternates: {
        languages: {
          en: 'https://settur.com.mx/en',
        },
      },
    },
    {
      url: 'https://settur.com.mx/services',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          en: 'https://settur.com.mx/en/services',
        },
      },
    },
    {
      url: 'https://settur.com.mx/private',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          en: 'https://settur.com.mx/en/private',
        },
      },
    },
    {
      url: 'https://settur.com.mx/shared',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          en: 'https://settur.com.mx/en/shared',
        },
      },
    },
  ]
}
