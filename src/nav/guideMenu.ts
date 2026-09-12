/** Guide mega-menu navigation config. */

export type GuideDestinationLink = {
  label: string
  href: string
}

export type GuideCountryGroup = {
  country: string
  destinations: GuideDestinationLink[]
}

export type GuideMenuFlatItem = {
  id: string
  label: string
  href: string
  children?: undefined
}

export type GuideMenuGroupItem = {
  id: string
  label: string
  href?: undefined
  children: GuideCountryGroup[]
}

export type GuideMenuItem = GuideMenuFlatItem | GuideMenuGroupItem

export function hasGuideMenuChildren(
  item: GuideMenuItem,
): item is GuideMenuGroupItem {
  return Boolean(item.children?.length)
}

const historyLinks: GuideDestinationLink[] = [
  { label: "History Of Ka'bah", href: '/guide/history/history-of-kabah' },
  {
    label: 'Foundation & Development of Makkah',
    href: '/guide/history/foundation-and-development-of-makkah',
  },
  { label: 'Location of Makkah', href: '/guide/history/location-of-makkah' },
  {
    label: 'Quraan Mentioned Names Of Makkah',
    href: '/guide/history/quraan-mentioned-names-of-makkah',
  },
  { label: 'Story of Zam Zam', href: '/guide/history/story-of-zam-zam' },
  { label: 'Masjid-E-Nabawi', href: '/guide/history/masjid-e-nabawi' },
  {
    label: 'Structure & Important Places Surrounding Holy Kabah',
    href: '/guide/history/structure-and-important-places',
  },
]

const ziyaratLinks: GuideCountryGroup[] = [
  {
    country: 'Makkah',
    destinations: [
      { label: 'Jabal Al-Nour', href: '/guide/ziyarat/makkah/jabal-al-nour' },
      { label: 'Jabal Thawr', href: '/guide/ziyarat/makkah/jabal-thawr' },
      { label: 'Masjid Ayesha', href: '/guide/ziyarat/makkah/masjid-ayesha' },
      { label: 'Masjid Jinn', href: '/guide/ziyarat/makkah/masjid-jinn' },
      { label: 'Jannatul Maala', href: '/guide/ziyarat/makkah/jannatul-maala' },
      { label: 'Masjid Nimrah', href: '/guide/ziyarat/makkah/masjid-nimrah' },
      {
        label: 'Arafath (Jabal Ur Rehman)',
        href: '/guide/ziyarat/makkah/arafath-jabal-ur-rehman',
      },
    ],
  },
  {
    country: 'Madinah',
    destinations: [
      { label: 'Roula Shareef', href: '/guide/ziyarat/madinah/roula-shareef' },
      { label: 'Rauudathul Jannah', href: '/guide/ziyarat/madinah/rauudathul-jannah' },
      { label: 'Masjid Qiblatain', href: '/guide/ziyarat/madinah/masjid-qiblatain' },
      { label: 'Masjid Quba', href: '/guide/ziyarat/madinah/masjid-quba' },
      { label: 'Jabal Al Uhad', href: '/guide/ziyarat/madinah/jabal-al-uhad' },
      { label: 'Jannatul Baqi', href: '/guide/ziyarat/madinah/jannatul-baqi' },
    ],
  },
]

export const guideMenuCategories: GuideMenuItem[] = [
  {
    id: 'history',
    label: 'HISTORY',
    children: [{ country: 'History', destinations: historyLinks }],
  },
  {
    id: 'ziyarat',
    label: 'ZIYARAT',
    children: ziyaratLinks,
  },
]
