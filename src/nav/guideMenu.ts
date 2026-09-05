/**
 * Pilgrim Guide mega-menu navigation config.
 * Only links with confirmed published content are listed.
 */

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

/** History articles with confirmed scrape content only */
const historyLinks: GuideDestinationLink[] = [
  { label: "History Of Ka'bah", href: '/guide/history-of-kabah' },
  { label: 'Story of Zam Zam', href: '/guide/story-of-zamzam' },
  { label: 'Masjid-E-Nabawi', href: '/guide/masjid-e-nabawi' },
]

/** Top-level Guide categories — omit sections until content exists */
export const guideMenuCategories: GuideMenuItem[] = [
  {
    id: 'history',
    label: 'History',
    children: [{ country: 'Sacred history', destinations: historyLinks }],
  },
]
