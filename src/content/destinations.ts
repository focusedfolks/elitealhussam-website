export type Destination = {
  name: string
  slug: string
  image: string
  imageAlt: string
  description: string
}

export type DestinationCategory = {
  name: string
  destinations: Destination[]
}

export type DestinationState = {
  name: string
  categories: DestinationCategory[]
}

export type DestinationCountry =
  | { id: string; name: string; kind: 'states'; states: DestinationState[] }
  | { id: string; name: string; kind: 'destinations'; categories: DestinationCategory[] }

const comingSoon = 'Destination details coming soon.'

const destination = (name: string, image: string, imageAlt: string, slug: string): Destination => ({
  name,
  slug,
  image,
  imageAlt,
  description: comingSoon,
})

export const destinationCountries: DestinationCountry[] = [
  {
    id: 'india',
    name: 'India',
    kind: 'states',
    states: [
      {
        name: 'Kerala',
        categories: [
          {
            name: 'Hill Station',
            destinations: [
              destination('Munnar', '/images/hero section  tour.png', 'Munnar hill station Kerala tea plantations', 'munnar'),
              destination('Wayanad', '/images/tours/hero-tours-mountain.jpeg', 'Wayanad hill station Kerala forest', 'wayanad'),
              destination('Vagamon', '/images/theme-hero.webp', 'Vagamon hill station Kerala meadows', 'vagamon'),
            ],
          },
          {
            name: 'Backwaters and Lakes',
            destinations: [
              destination('Alleppey', '/images/gallery-stays.webp', 'Alleppey backwaters Kerala houseboat', 'alleppey'),
              destination('Kumarakom', '/images/gallery-family.webp', 'Kumarakom lake Kerala backwaters', 'kumarakom'),
            ],
          },
          {
            name: 'Beaches and Coastal Towns',
            destinations: [
              destination('Varkala', '/images/theme-offer-1.webp', 'Varkala beach cliff Kerala', 'varkala'),
              destination('Kovalam', '/images/theme-offer-2.webp', 'Kovalam beach Kerala lighthouse', 'kovalam'),
              destination('Fort Kochi', '/images/theme-offer-3.webp', 'Fort Kochi Chinese fishing nets', 'fort-kochi'),
            ],
          },
          {
            name: 'Wildlife and Nature',
            destinations: [
              destination('Periyar National Park, Thekkady', '/images/theme-offer-4.webp', 'Periyar National Park Thekkady wildlife', 'periyar-national-park'),
              destination('Eravikulam National Park', '/images/mount-uhud.webp', 'Eravikulam National Park Nilgiri Tahr', 'eravikulam-national-park'),
              destination('Athirappilly Waterfalls', '/images/hajj-arafat.webp', 'Athirappilly Waterfalls Kerala', 'athirappilly-waterfalls'),
            ],
          },
        ],
      },
      {
        name: 'Tamil Nadu',
        categories: [
          {
            name: 'Hill Station',
            destinations: [
              destination('Ooty', '/images/hero-madinah.webp', 'Ooty hill station Tamil Nadu', 'ooty'),
              destination('Kodaikanal', '/images/gallery-packages.webp', 'Kodaikanal hill station lake Tamil Nadu', 'kodaikanal'),
              destination('Yercaud', '/images/family-travel.webp', 'Yercaud hill station Tamil Nadu', 'yercaud'),
              destination('Yelagiri', '/images/airport-travel.webp', 'Yelagiri hill station Tamil Nadu', 'yelagiri'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'dubai-uae',
    name: 'Dubai, UAE',
    kind: 'destinations',
    categories: [
      {
        name: 'Destinations',
        destinations: [destination('Dubai', '/images/dubai-skyline.webp', 'Dubai skyline UAE', 'dubai')],
      },
    ],
  },
]
