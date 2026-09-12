import type { GuidePage } from '../types'
import { page, paragraphs } from '../helpers'

export const masjidQiblatain: GuidePage = page({
  slug: 'ziyarat/madinah/masjid-qiblatain',
  title: 'Masjid Qiblatain',
  section: 'ziyarat',
  heroImage: '/images/hero-madinah.webp',
  sourceUrl: '',
  blocks: paragraphs(
    'Masjid Qiblatain, the "Mosque of the Two Qiblas," stands in Madinah on the site where, during the second year after the Hijra, Prophet Muhammad (peace be upon him) was leading a prayer facing Jerusalem when he received the revelation commanding Muslims to instead face the Ka\'bah in Makkah: "We have certainly seen the turning of your face, [O Muhammad], toward the heaven, and We will surely turn you to a qiblah with which you will be pleased. So turn your face toward Al-Masjid Al-Haram." (Qur\'an 2:144)',
    "According to tradition, the Prophet and the congregation immediately turned to face Makkah mid-prayer, making this one of the few recorded instances of a prayer's direction changing while it was still being performed. For centuries the mosque retained two mihrabs, marking both the original and the new qibla, though modern renovations have updated the structure so it now faces only Makkah. The mosque remains an active place of worship and one of the most visited historical sites in Madinah.",
  ),
})
