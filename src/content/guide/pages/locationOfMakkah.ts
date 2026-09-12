import type { GuidePage } from '../types'
import { page, paragraphs } from '../helpers'

export const locationOfMakkah: GuidePage = page({
  slug: 'history/location-of-makkah',
  title: 'Location of Makkah',
  section: 'history',
  heroImage: '/images/hero-makkah.webp',
  sourceUrl: '',
  blocks: paragraphs(
    'Makkah Al-Mukarramah lies in the Hejaz region of western Saudi Arabia, cradled in a narrow valley among the Sarawat mountain range. The city sits roughly 70 km inland from Jeddah, its nearest port on the Red Sea coast, and approximately 450 km south of Madinah. Its position — hemmed in by barren, rocky hills on nearly every side — is central to its history: Prophet Ibraaheem (peace be upon him) described it in his supplication as "an uncultivable valley," yet it grew, around the Zamzam well and the Ka\'bah, into a resting point for caravans and eventually the most important city in the Islamic world.',
    "Before Islam, Makkah's location placed it on key trade routes linking Yemen in the south to Syria in the north, which is part of why the Quraysh — as custodians of the Ka'bah — held such standing among the Arab tribes; camel caravans passing through relied on the safety Makkah's sacred status guaranteed them. Today, Makkah is accessible via King Abdulaziz International Airport in Jeddah, and is connected to Madinah by the Haramain High-Speed Railway as well as major highways.",
    'Makkah is exclusively open to Muslims — non-Muslims are not permitted to enter the city, a restriction enforced at checkpoints on all roads leading in.',
  ),
})
