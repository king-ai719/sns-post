import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/pricing', '/legal', '/terms', '/privacy'],
        disallow: ['/generate', '/history', '/dashboard', '/sign-in', '/sign-up', '/api/'],
      },
    ],
    sitemap: 'https://snapick-92.com/sitemap.xml',
  }
}