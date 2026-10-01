/** Production site URL — set VITE_SITE_URL in env (e.g. Vercel / custom domain). */
export const SITE_URL =
  (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') ||
  'https://elitealhussam.com'

export const SITE_NAME = 'ELITE ALHUSSAM Travel and Tourism L.L.C'
export const SITE_SHORT = 'ELITE ALHUSSAM'

/** Default Open Graph / Twitter share image (1200×630). Generate via `npm run seo:assets`. */
export const DEFAULT_OG_IMAGE = '/images/og-share.webp'

export function absoluteUrl(path: string) {
  if (path.startsWith('http')) return path
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}
