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
  | {
      id: string
      name: string
      kind: 'states'
      states: DestinationState[]
    }
  | {
      id: string
      name: string
      kind: 'destinations'
      categories: DestinationCategory[]
    }

const comingSoon = 'Destination details coming soon.'

const destination = (
  name: string,
  image: string,
  imageAlt: string,
  slug = image,
): Destination => ({
  name,
  slug,
  image: `/images/tours/${image}.jpg`,
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
              destination('Munnar', 'munnar', 'Munnar hill station Kerala tea plantations'),
              destination('Wayanad', 'wayanad', 'Wayanad hill station Kerala forest'),
              destination('Vagamon', 'vagamon', 'Vagamon hill station Kerala meadows'),
            ],
          },
          {
            name: 'Backwaters and Lakes',
            destinations: [
              destination('Alleppey', 'alleppey', 'Alleppey backwaters Kerala houseboat'),
              destination('Kumarakom', 'kumarakom', 'Kumarakom lake Kerala backwaters'),
            ],
          },
          {
            name: 'Beaches and Coastal Towns',
            destinations: [
              destination('Varkala', 'varkala', 'Varkala beach cliff Kerala'),
              destination('Kovalam', 'kovalam', 'Kovalam beach Kerala lighthouse'),
              destination('Fort Kochi', 'fort-kochi', 'Fort Kochi Chinese fishing nets'),
            ],
          },
          {
            name: 'Wildlife and Nature',
            destinations: [
              destination(
                'Periyar National Park, Thekkady',
                'periyar-national-park-thekkady',
                'Periyar National Park Thekkady wildlife',
                'periyar-national-park',
              ),
              destination(
                'Eravikulam National Park',
                'eravikulam-national-park',
                'Eravikulam National Park Nilgiri Tahr',
              ),
              destination(
                'Athirappilly Waterfalls',
                'athirappilly-waterfalls',
                'Athirappilly Waterfalls Kerala',
              ),
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
              destination('Ooty', 'ooty', 'Ooty hill station Tamil Nadu'),
              destination('Kodaikanal', 'kodaikanal', 'Kodaikanal hill station lake Tamil Nadu'),
              destination('Yercaud', 'yercaud', 'Yercaud hill station Tamil Nadu'),
              destination('Yelagiri', 'yelagiri', 'Yelagiri hill station Tamil Nadu'),
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
        destinations: [destination('Dubai', 'dubai', 'Dubai skyline UAE')],
      },
    ],
  },
]