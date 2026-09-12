import type { GuidePage } from '../types'
import { page, paragraphs } from '../helpers'

export const masjidAyesha: GuidePage = page({
  slug: 'ziyarat/makkah/masjid-ayesha',
  title: 'Masjid Ayesha',
  section: 'ziyarat',
  heroImage: '/images/hero-makkah.webp',
  sourceUrl: '',
  blocks: paragraphs(
    "Masjid Ayesha, also known as Masjid At-Tan'eem, stands in the Tan'eem area, roughly 7–8 km north of Masjid al-Haram on the road toward Madinah. It marks one of the miqat points — the boundary where pilgrims already inside Makkah enter the state of Ihram before performing an additional Umrah.",
    "The mosque takes its name from an incident during the Prophet's Farewell Pilgrimage: Aishah (may Allah be pleased with her) had been unable to complete Umrah due to menstruation. After she completed the rites of Hajj, the Prophet (peace be upon him) instructed her brother, Abdur Rahman ibn Abi Bakr, to take her to Tan'eem so she could enter Ihram there and perform Umrah separately. This established Tan'eem as a legitimate miqat, still used today by residents of Makkah and pilgrims wishing to perform a second or third Umrah during their stay.",
    'The original mosque is believed to date to the Abbasid period, with major expansions carried out under Saudi administration to accommodate the volume of pilgrims who pass through it, especially during Ramadan and the Hajj season.',
  ),
})
