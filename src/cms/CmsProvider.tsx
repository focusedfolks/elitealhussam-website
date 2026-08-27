import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { posts as staticPosts } from 'virtual:blog-posts'
import {
  aboutCopy,
  allPackages,
  company as staticCompany,
  type TravelPackage,
} from '../content/site'
import {
  fetchCmsAbout,
  fetchCmsBlogPosts,
  fetchCmsCompany,
  fetchCmsPackages,
  fetchCmsTestimonials,
  isSupabaseConfigured,
} from './api'
import type { CmsAbout, CmsBlogPost, CmsCompany, CmsTestimonial } from './types'

type CmsContextValue = {
  configured: boolean
  loading: boolean
  packages: TravelPackage[]
  posts: CmsBlogPost[]
  testimonials: CmsTestimonial[]
  company: CmsCompany
  about: CmsAbout
  refresh: () => Promise<void>
}

const CmsContext = createContext<CmsContextValue | null>(null)

function staticBlogAsCms(): CmsBlogPost[] {
  return staticPosts.map((p) => ({
    title: p.title,
    slug: p.slug,
    date: p.date,
    author: p.author,
    category: p.category,
    excerpt: p.excerpt,
    coverImage: p.coverImage,
    readTime: p.readTime,
    bodyMarkdown: '',
    html: p.html,
  }))
}

export function CmsProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(isSupabaseConfigured)
  const [packages, setPackages] = useState<TravelPackage[]>(allPackages)
  const [posts, setPosts] = useState<CmsBlogPost[]>(staticBlogAsCms())
  const [testimonials, setTestimonials] = useState<CmsTestimonial[]>([
    {
      name: 'Fathima R.',
      place: 'Dubai pilgrim · Umrah',
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
      place: 'Dubai · Economy package',
      quote:
        'Clear communication, dedicated support, and spiritual care. ELITE ALHUSSAM feels like family.',
    },
  ])
  const [company, setCompany] = useState<CmsCompany>(
    staticCompany as unknown as CmsCompany,
  )
  const [about, setAbout] = useState<CmsAbout>(aboutCopy)

  const refresh = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setPackages(allPackages)
      setPosts(staticBlogAsCms())
      setTestimonials([
        {
          name: 'Fathima R.',
          place: 'Dubai pilgrim · Umrah',
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
          place: 'Dubai · Economy package',
          quote:
            'Clear communication, dedicated support, and spiritual care. ELITE ALHUSSAM feels like family.',
        },
      ])
      setCompany(staticCompany as unknown as CmsCompany)
      setAbout(aboutCopy)
      setLoading(false)
      return
    }

    setLoading(true)
    try {
      const [pkgs, blog, testi, comp, ab] = await Promise.all([
        fetchCmsPackages(),
        fetchCmsBlogPosts(),
        fetchCmsTestimonials(),
        fetchCmsCompany(),
        fetchCmsAbout(),
      ])
      setPackages(pkgs.length ? pkgs : allPackages)
      setPosts(blog.length ? blog : staticBlogAsCms())
      setTestimonials(testi)
      // Keep Dubai contact details authoritative even if CMS seed is stale
      setCompany({
        ...comp,
        phones: staticCompany.phones,
        whatsapp: staticCompany.whatsapp,
        email: staticCompany.email,
        address: staticCompany.address,
        offices: staticCompany.offices,
        positioning: staticCompany.positioning,
        background: staticCompany.background,
      } as CmsCompany)
      setAbout({
        ...ab,
        india: aboutCopy.india,
        profile: aboutCopy.profile,
      })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const value = useMemo(
    () => ({
      configured: isSupabaseConfigured,
      loading,
      packages,
      posts,
      testimonials,
      company,
      about,
      refresh,
    }),
    [loading, packages, posts, testimonials, company, about, refresh],
  )

  return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>
}

export function useCms() {
  const ctx = useContext(CmsContext)
  if (!ctx) throw new Error('useCms must be used within CmsProvider')
  return ctx
}
