import type { TravelPackage } from '../content/site'

export type CmsBlogPost = {
  id?: string
  title: string
  slug: string
  date: string
  author: string
  category: 'Hajj Guide' | 'Umrah Tips' | 'Travel Advice' | 'Company News'
  excerpt: string
  coverImage: string
  readTime: string
  bodyMarkdown: string
  html?: string
  published?: boolean
}

export type CmsTestimonial = {
  id?: string
  name: string
  place: string
  quote: string
  published?: boolean
  sortOrder?: number
}

export type CmsCompany = {
  name: string
  shortName: string
  legalName: string
  indiaName: string
  tagline: string
  positioning: string
  experience: string
  background: string
  phones: string[]
  whatsapp: string
  email: string
  address: string
  offices: {
    id: string
    city: string
    label: string
    companyName: string
    lines: string[]
  }[]
  social: {
    facebook: string
    twitter: string
    youtube: string
  }
}

export type CmsAbout = {
  intro: string
  legacy: string
  profile: string
  india: string
  leadership: string
}

export type CmsLead = {
  id: string
  name: string
  phone: string
  email: string
  interest: string
  travellers: string
  message: string
  travel_mode: string
  departure_date: string
  departure_airport: string
  preferred_airline: string
  departure_city: string
  pickup_point: string
  status: 'new' | 'contacted' | 'closed'
  created_at: string
}

export type CmsPackageRow = TravelPackage & {
  published?: boolean
  sortOrder?: number
}

export const BLOG_CATEGORIES = [
  'Hajj Guide',
  'Umrah Tips',
  'Travel Advice',
  'Company News',
] as const
