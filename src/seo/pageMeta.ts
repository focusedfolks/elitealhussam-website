import { images } from '../content/site'
import { DEFAULT_OG_IMAGE } from '../lib/site'

export type PageMeta = {
  title: string
  description: string
  path: string
  image?: string
  type?: 'website' | 'article'
}

export const pageMeta = {
  home: {
    title: 'ELITE ALHUSSAM | Hajj & Umrah Packages · Dubai, UAE',
    description:
      'Professional Hajj and Umrah packages from Dubai, UAE. 45+ years of trusted pilgrimage service. Haj services for Indian passport holders only. Contact us for package details.',
    path: '/',
    image: images.familyMakkah,
  },
  about: {
    title: 'About Us | ELITE ALHUSSAM · Dubai Hajj & Umrah',
    description:
      'Learn about ELITE ALHUSSAM — Saudi hospitality roots, 45+ years of Hajj & Umrah service, and dedicated support from our Dubai, UAE office.',
    path: '/about',
    image: images.hotel,
  },
  packages: {
    title: 'Hajj & Umrah Packages | ELITE ALHUSSAM Dubai',
    description:
      'Browse Hajj and Umrah packages from Dubai, UAE. Contact us for pricing and package details. Haj services — Indian passport holders only.',
    path: '/packages',
    image: images.pilgrimsHero,
  },
  pricing: {
    title: 'Pricing & Package Details | ELITE ALHUSSAM',
    description:
      'Request a custom Hajj & Umrah quotation from our Dubai office. Share hotels, dates, rooms, and services — our team follows up with pricing. No auto-calculated totals.',
    path: '/pricing',
    image: images.dubai,
  },
  blog: {
    title: 'Blog | ELITE ALHUSSAM Hajj & Umrah Guidance',
    description:
      'Guidance, tips, and stories for your pilgrimage journey — packing checklists, Umrah vs Hajj advice, and travel tips from Dubai.',
    path: '/blog',
    image: images.makkahArch,
  },
  contact: {
    title: 'Contact Us | ELITE ALHUSSAM Dubai Office',
    description:
      'Call +971 56 574 6678 or email alhussamuae@gmail.com. Dubai office: Smart Eye Business Centre, AG House Building, Dubai, UAE.',
    path: '/contact',
    image: images.dubai,
  },
  internationalTours: {
    title: 'International Tours | ELITE ALHUSSAM Dubai',
    description:
      'International holiday and group tour packages from ELITE ALHUSSAM, Dubai, UAE. Contact our team for destinations and itineraries.',
    path: '/international-tours',
    image: images.touristHero,
  },
  notFound: {
    title: 'Page Not Found | ELITE ALHUSSAM',
    description:
      'The page you requested could not be found. Return to ELITE ALHUSSAM for Hajj and Umrah packages from Dubai, UAE.',
    path: '/404',
    image: DEFAULT_OG_IMAGE,
  },
} satisfies Record<string, PageMeta>
