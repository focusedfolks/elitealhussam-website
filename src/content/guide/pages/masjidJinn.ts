import type { GuidePage } from '../types'
import { page, paragraphs } from '../helpers'

export const masjidJinn: GuidePage = page({
  slug: 'ziyarat/makkah/masjid-jinn',
  title: 'Masjid Jinn',
  section: 'ziyarat',
  heroImage: '/images/hero-makkah.webp',
  sourceUrl: '',
  blocks: paragraphs(
    "Masjid Al-Jinn, also known as Masjid Al-Bay'ah (the Mosque of the Pledge), stands near the Jannatul Mualla cemetery in Makkah. It marks the site associated with an event described in the Qur'an: a group of Jinn overheard Prophet Muhammad (peace be upon him) reciting the Qur'an, were moved by what they heard, and embraced Islam, later pledging their allegiance to him.",
    'The event is referenced directly in Surah Al-Jinn: "Say, [O Muhammad], \'It has been revealed to me that a group of the jinn listened and said: Indeed, we have heard an amazing Qur\'an. It guides to the right course, and we have believed in it...\'" (72:1–2)',
    'The mosque has also historically been known as Masjid Al-Haras (Mosque of the Guard), from a later period when nightwatchmen responsible for order in Makkah would gather and change shifts there. It remains a functioning mosque today, open for regular prayers.',
  ),
})
