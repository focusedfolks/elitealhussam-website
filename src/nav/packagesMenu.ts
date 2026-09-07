/**
 * Packages mega-menu navigation config.
 * International Tours lists only packages with confirmed durations.
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
        country: 'India',
        destinations: [
          {
            label: 'Delhi, Agra & Taj Mahal with Kashmir',
            href: '/international-tours/delhi-agra-taj-mahal-kashmir',
          },
          {
            label: 'Kashmir with Golden Triangle',
            href: '/international-tours/kashmir-golden-triangle',
          },
          {
            label: 'Haridwar & Rishikesh',
            href: '/international-tours/haridwar-rishikesh',
          },
        ],
      },
      {
        country: 'Indonesia',
        destinations: [
          { label: 'Batam', href: '/international-tours/batam' },
        ],
      },
      {
        country: 'Thailand',
        destinations: [
          {
            label: 'Bangkok – Pattaya',
            href: '/international-tours/bangkok-pattaya',
          },
          {
            label: 'Bangkok Free & Easy',
            href: '/international-tours/bangkok-free-easy',
          },
          { label: 'Bangkok Tour', href: '/international-tours/bangkok-tour' },
        ],
      },
      {
        country: 'Malaysia',
        destinations: [
          { label: 'Langkawi', href: '/international-tours/langkawi' },
        ],
      },
      {
        country: 'Vietnam',
        destinations: [
          {
            label: 'Hanoi – Sapa – Ha Long',
            href: '/international-tours/hanoi-sapa-ha-long',
          },
          {
            label: 'Hanoi – Sapa – Ha Long (Extended)',
            href: '/international-tours/hanoi-sapa-ha-long-extended',
          },
          {
            label: 'Hanoi – Ha Long – Ninh Binh',
            href: '/international-tours/hanoi-ha-long-ninh-binh',
          },
          {
            label: 'Hanoi – Sapa – Ninh Binh',
            href: '/international-tours/hanoi-sapa-ninh-binh',
          },
        ],
      },
    ],
  },
]
