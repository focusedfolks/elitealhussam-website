import type { GuidePage } from './types'
import { historyOfKabah } from './pages/historyOfKabah'
import { masjidENabawi } from './pages/masjidENabawi'
import { storyOfZamzam } from './pages/storyOfZamzam'

/** Published guide pages — only entries with confirmed body content. */
export const guidePages: GuidePage[] = [
  historyOfKabah,
  storyOfZamzam,
  masjidENabawi,
]

export const guidePagesBySlug: Record<string, GuidePage> = Object.fromEntries(
  guidePages.map((p) => [p.slug, p]),
)

export function getGuidePage(slug: string): GuidePage | undefined {
  return guidePagesBySlug[slug]
}

export const GUIDE_DEFAULT_PATH = `/guide/${guidePages[0].slug}`
