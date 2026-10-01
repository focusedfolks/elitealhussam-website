import type { GuidePage } from './types'
import { historyOfKabah } from './pages/historyOfKabah'
import { foundationAndDevelopmentOfMakkah } from './pages/foundationAndDevelopmentOfMakkah'
import { arafathJabalUrRehman } from './pages/arafathJabalUrRehman'
import { jabalAlNour } from './pages/jabalAlNour'
import { jabalThawr } from './pages/jabalThawr'
import { jannatulMaala } from './pages/jannatulMaala'
import { jannatulBaqi } from './pages/jannatulBaqi'
import { jabalAlUhad } from './pages/jabalAlUhad'
import { locationOfMakkah } from './pages/locationOfMakkah'
import { masjidAyesha } from './pages/masjidAyesha'
import { masjidJinn } from './pages/masjidJinn'
import { masjidNimrah } from './pages/masjidNimrah'
import { masjidQiblatain } from './pages/masjidQiblatain'
import { masjidQuba } from './pages/masjidQuba'
import { masjidENabawi } from './pages/masjidENabawi'
import { quraanMentionedNamesOfMakkah } from './pages/quraanMentionedNamesOfMakkah'
import { rauudathulJannah } from './pages/rauudathulJannah'
import { roulaShareef } from './pages/roulaShareef'
import { storyOfZamzam } from './pages/storyOfZamzam'

export const guidePages: GuidePage[] = [
  historyOfKabah,
  foundationAndDevelopmentOfMakkah,
  locationOfMakkah,
  quraanMentionedNamesOfMakkah,
  storyOfZamzam,
  masjidENabawi,
  jabalAlNour,
  jabalThawr,
  masjidAyesha,
  masjidJinn,
  jannatulMaala,
  masjidNimrah,
  arafathJabalUrRehman,
  roulaShareef,
  rauudathulJannah,
  masjidQiblatain,
  masjidQuba,
  jabalAlUhad,
  jannatulBaqi,
]

export const guidePagesBySlug: Record<string, GuidePage> = Object.fromEntries(
  guidePages.map((p) => [p.slug, p]),
)

export function getGuidePage(slug: string): GuidePage | undefined {
  return guidePagesBySlug[slug]
}

export const GUIDE_DEFAULT_PATH = `/guide/${guidePages[0].slug}`
