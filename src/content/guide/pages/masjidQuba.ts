import type { GuidePage } from '../types'
import { page, paragraphs } from '../helpers'

export const masjidQuba: GuidePage = page({
  slug: 'ziyarat/madinah/masjid-quba',
  title: 'Masjid Quba',
  section: 'ziyarat',
  heroImage: '/images/hero-madinah.webp',
  sourceUrl: '',
  blocks: paragraphs(
    'Masjid Quba is widely regarded as the first mosque established in Islam. Prophet Muhammad (peace be upon him) laid its foundations upon arriving in the outskirts of Madinah during his migration from Makkah in 622 CE, before entering the city itself — he is reported to have personally taken part in its construction alongside his companions.',
    'Many scholars connect Masjid Quba to the Qur\'anic description of "a mosque founded on righteousness from the first day" (Surah At-Tawbah 9:108), which is fitting to its role as the first place of communal worship built after the Hijra. A well-known hadith states that offering two rak\'ahs of prayer at Masjid Quba carries the reward equivalent to performing an Umrah — for this reason, many pilgrims visiting Madinah make a point of praying there. The mosque has been expanded many times over the centuries and today is one of the largest mosques in Madinah, easily accessible from the city center.',
  ),
})
