import { useEffect } from 'react'

type SeoProps = {
  title: string
  description: string
  image?: string
  url?: string
  type?: 'website' | 'article'
  jsonLd?: Record<string, unknown>
}

const SITE = 'https://elitealhussam.com'

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
  image = '/images/family-makkah.webp',
  url = '/',
  type = 'website',
  jsonLd,
}: SeoProps) {
  useEffect(() => {
    const absImage = image.startsWith('http') ? image : `${SITE}${image}`
    const absUrl = url.startsWith('http') ? url : `${SITE}${url}`

    document.title = title
    upsertMeta('name', 'description', description)
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:image', absImage)
    upsertMeta('property', 'og:url', absUrl)
    upsertMeta('property', 'og:type', type)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', absImage)
    upsertLink('canonical', absUrl)

    let script = document.getElementById('blog-jsonld') as HTMLScriptElement | null
    if (jsonLd) {
      if (!script) {
        script = document.createElement('script')
        script.id = 'blog-jsonld'
        script.type = 'application/ld+json'
        document.head.appendChild(script)
      }
      script.textContent = JSON.stringify(jsonLd)
    } else if (script) {
      script.remove()
    }

    return () => {
      const s = document.getElementById('blog-jsonld')
      if (s) s.remove()
    }
  }, [title, description, image, url, type, jsonLd])

  return null
}
