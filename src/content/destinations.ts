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
              destination('Munnar', '/images/tours/Munnar.jpg', 'Munnar hill station Kerala tea plantations', 'munnar'),
              destination('Wayanad', '/images/tours/Wayanad.jpg', 'Wayanad hill station Kerala forest', 'wayanad'),
              destination('Vagamon', '/images/tours/Vagamon.jpg', 'Vagamon hill station Kerala meadows', 'vagamon'),
            ],
          },
          {
            name: 'Backwaters and Lakes',
            destinations: [
              destination('Alleppey', '/images/tours/Alleppey.jpg', 'Alleppey backwaters Kerala houseboat', 'alleppey'),
              destination('Kumarakom', '/images/tours/Kumarakom.jpg', 'Kumarakom lake Kerala backwaters', 'kumarakom'),
            ],
          },
          {
            name: 'Beaches and Coastal Towns',
            destinations: [
              destination('Varkala', '/images/tours/Varkala.jpg', 'Varkala beach cliff Kerala', 'varkala'),
              destination('Kovalam', '/images/tours/Kovalam.jpg', 'Kovalam beach Kerala lighthouse', 'kovalam'),
              destination('Fort Kochi', '/images/tours/fort%20kochi.jpg', 'Fort Kochi Chinese fishing nets', 'fort-kochi'),
            ],
          },
          {
            name: 'Wildlife and Nature',
            destinations: [
              destination('Periyar National Park, Thekkady', '/images/tours/Periyar%20National%20Park%2C%20Thekkady.jpg', 'Periyar National Park Thekkady wildlife', 'periyar-national-park'),
              destination('Eravikulam National Park', '/images/tours/Eravikulam%20National%20Park.jpg', 'Eravikulam National Park Nilgiri Tahr', 'eravikulam-national-park'),
              destination('Athirappilly Waterfalls', '/images/tours/Athirappilly%20Waterfalls.jpg', 'Athirappilly Waterfalls Kerala', 'athirappilly-waterfalls'),
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
              destination('Ooty', '/images/tours/Ooty%20tamil%20nadu.jpg', 'Ooty hill station Tamil Nadu', 'ooty'),
              destination('Kodaikanal', '/images/tours/Kodaikanal%20tamil%20nadu.jpg', 'Kodaikanal hill station lake Tamil Nadu', 'kodaikanal'),
              destination('Yercaud', '/images/tours/Yercaud%20tamil%20nadu.jpg', 'Yercaud hill station Tamil Nadu', 'yercaud'),
              destination('Yelagiri', '/images/tours/Yelagiri%20tamil%20nadu.jpg', 'Yelagiri hill station Tamil Nadu', 'yelagiri'),
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
