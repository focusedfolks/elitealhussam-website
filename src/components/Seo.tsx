import { useEffect } from 'react'
import { absoluteUrl, DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from '../lib/site'

type SeoProps = {
  title: string
  description: string
  image?: string
  url?: string
  type?: 'website' | 'article'
  jsonLd?: Record<string, unknown>
  noindex?: boolean
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`,
  )
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = content
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.rel = rel
    document.head.appendChild(el)
  }
  el.href = href
}

export function Seo({
  title,
  description,
  image = DEFAULT_OG_IMAGE,
  url = '/',
  type = 'website',
  jsonLd,
  noindex = false,
}: SeoProps) {
  useEffect(() => {
    const absImage = absoluteUrl(image)
    const absUrl = absoluteUrl(url)

    document.title = title
    upsertMeta('name', 'description', description)
    upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow')
    upsertMeta('property', 'og:site_name', SITE_NAME)
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:image', absImage)
    upsertMeta('property', 'og:image:width', '1200')
    upsertMeta('property', 'og:image:height', '630')
    upsertMeta('property', 'og:url', absUrl)
    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:locale', 'en_AE')
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', absImage)
    upsertLink('canonical', absUrl)

    let script = document.getElementById('page-jsonld') as HTMLScriptElement | null
    if (jsonLd) {
      if (!script) {
        script = document.createElement('script')
        script.id = 'page-jsonld'
        script.type = 'application/ld+json'
        document.head.appendChild(script)
      }
      script.textContent = JSON.stringify(jsonLd)
    } else if (script) {
      script.remove()
    }

    return () => {
      const s = document.getElementById('page-jsonld')
      if (s) s.remove()
    }
  }, [title, description, image, url, type, jsonLd, noindex])

  return null
}

/** Organization JSON-LD for the homepage. */
export function homeJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl('/images/alhussam-logo.png'),
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    telephone: '+971565746678',
    email: 'alhussamuae@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress:
        'Office Cabin No. 54, Mezzanine Floor, Smart Eye Business Centre, AG House Building',
      addressLocality: 'Dubai',
      addressCountry: 'AE',
      postalCode: '35127',
    },
    areaServed: { '@type': 'Country', name: 'United Arab Emirates' },
    description:
      'Hajj and Umrah pilgrimage packages from Dubai, UAE. Haj services for Indian passport holders only.',
  }
}
