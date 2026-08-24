import { marked } from 'marked'
import {
  aboutCopy,
  allPackages,
  company as staticCompany,
  testimonials as staticSiteTestimonials,
  type TravelPackage,
} from '../content/site'
import { isSupabaseConfigured, supabase } from '../lib/supabase'
import type {
  CmsAbout,
  CmsBlogPost,
  CmsCompany,
  CmsLead,
  CmsTestimonial,
} from './types'

marked.setOptions({ gfm: true })

const fallbackTestimonials: CmsTestimonial[] = [
  {
    name: 'Fathima R.',
    place: 'Chennai pilgrim · Umrah',
    quote:
      'From visa to Ziyarat, everything was organised with sincerity. We could focus on our prayers.',
  },
  {
    name: 'Imran S.',
    place: 'Family group · Hajj',
    quote:
      'They treated our elderly parents with respect and patience. A trustworthy guide for the sacred journey.',
  },
  {
    name: 'Ayesha K.',
    place: 'Kilpauk · Economy package',
    quote:
      'Clear communication, honest pricing, and spiritual support. ELITE ALHUSSAM feels like family.',
  },
]

function mapPackage(row: Record<string, unknown>): TravelPackage {
  const pricing = (row.pricing as TravelPackage['pricing']) || {
    adult: 0,
    child: 0,
    infant: 0,
    currency: 'INR' as const,
  }
  return {
    id: String(row.id),
    category: row.category as TravelPackage['category'],
    title: String(row.title),
    tag: String(row.tag || ''),
    season: String(row.season || ''),
    summary: String(row.summary || ''),
    locations: String(row.locations || ''),
    duration: String(row.duration || ''),
    image: String(row.image || '/images/theme-hero.webp'),
    pricing,
    features: (row.features as string[]) || [],
    highlights: (row.highlights as string[]) || [],
    amenities: (row.amenities as TravelPackage['amenities']) || [],
    availableTravelModes: row.available_travel_modes
      ? (row.available_travel_modes as TravelPackage['availableTravelModes'])
      : undefined,
    popular: Boolean(row.popular),
    featured: Boolean(row.featured),
  }
}

function mapBlog(row: Record<string, unknown>): CmsBlogPost {
  const bodyMarkdown = String(row.body_markdown || '')
  return {
    id: String(row.id),
    title: String(row.title),
    slug: String(row.slug),
    date: String(row.date),
    author: String(row.author || 'ELITE ALHUSSAM Team'),
    category: row.category as CmsBlogPost['category'],
    excerpt: String(row.excerpt || ''),
    coverImage: String(row.cover_image || '/images/family-makkah.webp'),
    readTime: String(row.read_time || '5 min read'),
    bodyMarkdown,
    html: marked.parse(bodyMarkdown) as string,
    published: row.published !== false,
  }
}

export async function fetchCmsPackages(): Promise<TravelPackage[]> {
  if (!supabase) return allPackages
  const { data, error } = await supabase
    .from('packages')
    .select('*')
    .eq('published', true)
    .order('sort_order', { ascending: true })
  if (error || !data?.length) return allPackages
  return data.map((row) => mapPackage(row as Record<string, unknown>))
}

export async function fetchCmsBlogPosts(): Promise<CmsBlogPost[]> {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('date', { ascending: false })
  if (error || !data) return []
  return data.map((row) => mapBlog(row as Record<string, unknown>))
}

export async function fetchCmsTestimonials(): Promise<CmsTestimonial[]> {
  if (!supabase) return fallbackTestimonials
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('published', true)
    .order('sort_order', { ascending: true })
  if (error || !data?.length) {
    return staticSiteTestimonials.length
      ? staticSiteTestimonials.map((t) => ({
          name: t.name,
          place: '',
          quote: t.quote,
        }))
      : fallbackTestimonials
  }
  return data.map((row) => ({
    id: String(row.id),
    name: String(row.name),
    place: String(row.place || ''),
    quote: String(row.quote),
  }))
}

export async function fetchCmsCompany(): Promise<CmsCompany> {
  if (!supabase) return staticCompany as unknown as CmsCompany
  const { data, error } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'company')
    .maybeSingle()
  if (error || !data?.value) return staticCompany as unknown as CmsCompany
  return data.value as CmsCompany
}

export async function fetchCmsAbout(): Promise<CmsAbout> {
  if (!supabase) return aboutCopy
  const { data, error } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'about')
    .maybeSingle()
  if (error || !data?.value) return aboutCopy
  return data.value as CmsAbout
}

export async function submitLead(payload: {
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
}) {
  if (!supabase) return { ok: false as const, error: 'Supabase not configured' }
  const { error } = await supabase.from('leads').insert(payload)
  if (error) return { ok: false as const, error: error.message }
  return { ok: true as const }
}

/* ---------- Admin helpers ---------- */

export async function adminListPackages() {
  if (!supabase) throw new Error('Supabase not configured')
  const { data, error } = await supabase
    .from('packages')
    .select('*')
    .order('sort_order', { ascending: true })
  if (error) throw error
  return (data || []).map((row) => ({
    ...mapPackage(row as Record<string, unknown>),
    published: Boolean(row.published),
    sortOrder: Number(row.sort_order || 0),
  }))
}

export async function adminUpsertPackage(
  pkg: TravelPackage & { published?: boolean; sortOrder?: number },
) {
  if (!supabase) throw new Error('Supabase not configured')
  const { error } = await supabase.from('packages').upsert({
    id: pkg.id,
    category: pkg.category,
    title: pkg.title,
    tag: pkg.tag,
    season: pkg.season,
    summary: pkg.summary,
    locations: pkg.locations,
    duration: pkg.duration,
    image: pkg.image,
    pricing: pkg.pricing,
    features: pkg.features,
    highlights: pkg.highlights,
    amenities: pkg.amenities,
    available_travel_modes: pkg.availableTravelModes ?? null,
    popular: Boolean(pkg.popular),
    featured: Boolean(pkg.featured),
    published: pkg.published !== false,
    sort_order: pkg.sortOrder ?? 0,
  })
  if (error) throw error
}

export async function adminDeletePackage(id: string) {
  if (!supabase) throw new Error('Supabase not configured')
  const { error } = await supabase.from('packages').delete().eq('id', id)
  if (error) throw error
}

export async function adminListBlogPosts() {
  if (!supabase) throw new Error('Supabase not configured')
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('date', { ascending: false })
  if (error) throw error
  return (data || []).map((row) => mapBlog(row as Record<string, unknown>))
}

export async function adminUpsertBlogPost(post: CmsBlogPost) {
  if (!supabase) throw new Error('Supabase not configured')
  const payload = {
    title: post.title,
    slug: post.slug,
    date: post.date,
    author: post.author,
    category: post.category,
    excerpt: post.excerpt,
    cover_image: post.coverImage,
    read_time: post.readTime,
    body_markdown: post.bodyMarkdown,
    published: post.published !== false,
  }
  if (post.id) {
    const { error } = await supabase
      .from('blog_posts')
      .update(payload)
      .eq('id', post.id)
    if (error) throw error
  } else {
    const { error } = await supabase.from('blog_posts').insert(payload)
    if (error) throw error
  }
}

export async function adminDeleteBlogPost(id: string) {
  if (!supabase) throw new Error('Supabase not configured')
  const { error } = await supabase.from('blog_posts').delete().eq('id', id)
  if (error) throw error
}

export async function adminListTestimonials() {
  if (!supabase) throw new Error('Supabase not configured')
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('sort_order', { ascending: true })
  if (error) throw error
  return (data || []).map((row) => ({
    id: String(row.id),
    name: String(row.name),
    place: String(row.place || ''),
    quote: String(row.quote),
    published: Boolean(row.published),
    sortOrder: Number(row.sort_order || 0),
  }))
}

export async function adminUpsertTestimonial(item: CmsTestimonial) {
  if (!supabase) throw new Error('Supabase not configured')
  const payload = {
    name: item.name,
    place: item.place,
    quote: item.quote,
    published: item.published !== false,
    sort_order: item.sortOrder ?? 0,
  }
  if (item.id) {
    const { error } = await supabase
      .from('testimonials')
      .update(payload)
      .eq('id', item.id)
    if (error) throw error
  } else {
    const { error } = await supabase.from('testimonials').insert(payload)
    if (error) throw error
  }
}

export async function adminDeleteTestimonial(id: string) {
  if (!supabase) throw new Error('Supabase not configured')
  const { error } = await supabase.from('testimonials').delete().eq('id', id)
  if (error) throw error
}

export async function adminSaveSetting(key: string, value: unknown) {
  if (!supabase) throw new Error('Supabase not configured')
  const { error } = await supabase.from('site_settings').upsert({ key, value })
  if (error) throw error
}

export async function adminListLeads(): Promise<CmsLead[]> {
  if (!supabase) throw new Error('Supabase not configured')
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return (data || []) as CmsLead[]
}

export async function adminUpdateLeadStatus(
  id: string,
  status: CmsLead['status'],
) {
  if (!supabase) throw new Error('Supabase not configured')
  const { error } = await supabase.from('leads').update({ status }).eq('id', id)
  if (error) throw error
}

export { isSupabaseConfigured }
