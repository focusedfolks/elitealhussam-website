/**
 * Packages mega-menu navigation config.
 *
 * PLACEHOLDER: International Tours country/destination lists are TBD —
 * replace with the client's actual catalog when confirmed.
 */

export type PackagesDestinationLink = {
  label: string
  href: string
}

export type PackagesCountryGroup = {
  country: string
  destinations: PackagesDestinationLink[]
}

export type PackagesMenuFlatItem = {
  id: string
  label: string
  href: string
  children?: undefined
}

export type PackagesMenuGroupItem = {
  id: string
  label: string
  href?: undefined
  children: PackagesCountryGroup[]
}

export type PackagesMenuItem = PackagesMenuFlatItem | PackagesMenuGroupItem

export function hasPackageMenuChildren(
  item: PackagesMenuItem,
): item is PackagesMenuGroupItem {
  return Boolean(item.children?.length)
}

/** Top-level Packages categories shown in mega-menu panel 1 */
export const packagesMenuCategories: PackagesMenuItem[] = [
  {
    id: 'hajj-umrah',
    label: 'Hajj & Umrah',
    href: '/packages/hajj-umrah',
  },
  {
    id: 'international-tours',
    label: 'International Tours',
    children: [
      {
        country: 'TBD Country 1',
        destinations: [
          { label: 'TBD Destination', href: '/international-tours' },
          { label: 'TBD Destination', href: '/international-tours' },
        ],
      },
      {
        country: 'TBD Country 2',
        destinations: [
          { label: 'TBD Destination', href: '/international-tours' },
          { label: 'TBD Destination', href: '/international-tours' },
        ],
      },
    ],
  },
]

export const PACKAGES_MENU_PLACEHOLDER_NOTE =
  'International Tours destinations are placeholders pending client content.'
