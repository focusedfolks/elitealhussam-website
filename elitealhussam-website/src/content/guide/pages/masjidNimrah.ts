import type { GuidePage } from '../types'
import { page, paragraphs } from '../helpers'

export const masjidNimrah: GuidePage = page({
  slug: 'ziyarat/makkah/masjid-nimrah',
  title: 'Masjid Nimrah',
  section: 'ziyarat',
  heroImage: '/images/hero-makkah.webp',
  sourceUrl: '',
  blocks: paragraphs(
    "Masjid Nimrah (also transliterated Masjid Namirah) sits on the plain of Arafat, near Jabal Ar-Rahmah, on the site associated with Prophet Muhammad's (peace be upon him) Farewell Sermon during his final Hajj in 10 AH. After arriving at Arafat and resting at midday, the Prophet delivered his address in the Uranah valley from atop his camel, then led his companions — reported to number over 100,000 — in the combined and shortened Dhuhr and Asr prayers.",
    'Today, Masjid Nimrah is one of the largest mosques in the Makkah region, expanded significantly under Saudi administration to hold hundreds of thousands of worshippers. It is unique in that a congregational prayer is only held there once a year: on the 9th of Dhul Hijjah, the Day of Arafah, when the Hajj sermon is delivered from its pulpit to the assembled pilgrims before they proceed with the rites of the day.',
  ),
})
