import {
  destinationCountries,
  type Destination,
} from './destinations'

export type PendingDestinationPackage = Destination & {
  stateName: string
  duration: string
  tagline: string
  about: string
  highlights: string[]
  itinerary: { day: string; title: string; text: string }[]
  inclusions: string[]
  exclusions: string[]
}

const sharedInclusions = [
  'Accommodation as per itinerary (hotel category to be confirmed by operations before publishing)',
  'Daily breakfast',
  'All transfers and sightseeing by private/shared vehicle as per itinerary',
  'Driver-cum-guide services where applicable',
  'Applicable tolls, parking, and driver allowances',
  'Currently applicable taxes',
]

const sharedExclusions = [
  'Airfare/train fare to and from the destination',
  'Lunch and dinner unless specified',
  'Entry fees to monuments, parks, and adventure/boating activities',
  'Personal expenses (tips, laundry, calls, etc.)',
  'Travel insurance',
  'Anything not listed under Inclusions',
]

type PendingPackageDetails = Omit<
  PendingDestinationPackage,
  keyof Destination | 'stateName'
>

const pendingPackageDetails: Record<string, PendingPackageDetails> = {
  munnar: {
    duration: '2 Days / 1 Night',
    tagline: 'Tea Plantations and Cool Hill Air',
    about:
      'A classic Munnar getaway through rolling tea plantations and cool hill air in the Western Ghats.',
    highlights: ['Tea Museum & plantation walk', 'Echo Point', 'Mattupetty Dam', 'Top Station viewpoint'],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Munnar', text: 'Visit the Tea Museum and a working tea plantation; Echo Point and Mattupetty Dam in the afternoon.' },
      { day: 'Day 2', title: 'Top Station and departure', text: 'Morning visit to Top Station viewpoint; local sightseeing; departure.' },
    ],
    inclusions: sharedInclusions,
    exclusions: sharedExclusions,
  },
  wayanad: {
    duration: '2 Days / 1 Night',
    tagline: 'Misty Hills and Ancient Caves',
    about:
      "Misty hills, wildlife, and ancient caves make Wayanad one of Kerala's most complete nature escapes.",
    highlights: ['Edakkal Caves', 'Banasura Sagar Dam', 'Soochipara Falls', 'Spice plantation walk'],
    itinerary: [
      { day: 'Day 1', title: 'Arrival and Edakkal Caves', text: 'Arrival; Edakkal Caves and a guided spice plantation walk.' },
      { day: 'Day 2', title: 'Banasura and Soochipara', text: 'Banasura Sagar Dam and Soochipara Falls; departure.' },
    ],
    inclusions: sharedInclusions,
    exclusions: sharedExclusions,
  },
  vagamon: {
    duration: '2 Days / 1 Night',
    tagline: 'Rolling Meadows and Pine Forests',
    about:
      'Known as the "Scotland of Asia" for its rolling meadows and pine forests — a quieter, offbeat alternative to Kerala\'s better-known hill stations.',
    highlights: ['Vagamon Meadows', 'Pine Forest', 'Marmala Waterfalls', 'Seasonal paragliding at Kolahalamedu'],
    itinerary: [
      { day: 'Day 1', title: 'Arrival and Vagamon', text: 'Arrival; Vagamon Meadows and Pine Forest walk.' },
      { day: 'Day 2', title: 'Waterfalls and departure', text: 'Marmala Waterfalls and Kurisumala viewpoint; optional paragliding (seasonal, October–May, weather-dependent, at additional cost); departure.' },
    ],
    inclusions: sharedInclusions,
    exclusions: [...sharedExclusions, 'Paragliding is weather-dependent and not guaranteed; charged separately if booked'],
  },
  alleppey: {
    duration: '2 Days / 1 Night',
    tagline: 'Vembanad Lake and Palm-lined Canals',
    about:
      "Kerala's backwater capital — a houseboat cruise through Vembanad Lake's palm-lined canals is the centerpiece of any Alleppey trip.",
    highlights: ['Overnight houseboat stay', 'Vembanad Lake cruise', 'Village and canal views'],
    itinerary: [
      { day: 'Day 1', title: 'Houseboat check-in', text: "Houseboat check-in by afternoon; backwater cruise through Alleppey's canals; overnight on board." },
      { day: 'Day 2', title: 'Morning cruise and departure', text: 'Morning cruise continues; houseboat checkout; departure.' },
    ],
    inclusions: [...sharedInclusions, 'One night houseboat stay with meals on board (in place of standard hotel accommodation)'],
    exclusions: sharedExclusions,
  },
  kumarakom: {
    duration: '2 Days / 1 Night',
    tagline: 'A Quieter Vembanad Backwater Escape',
    about:
      'A quieter backwater destination on Vembanad Lake, known for its bird sanctuary alongside the classic houseboat experience.',
    highlights: ['Kumarakom Bird Sanctuary', 'Vembanad Lake backwaters', 'Houseboat option'],
    itinerary: [
      { day: 'Day 1', title: 'Arrival and backwaters', text: 'Arrival; Kumarakom Bird Sanctuary; backwater cruise.' },
      { day: 'Day 2', title: 'Leisure morning and departure', text: 'Leisure morning on the backwaters; departure.' },
    ],
    inclusions: [...sharedInclusions, 'Houseboat stay available as an upgrade in place of standard hotel accommodation'],
    exclusions: sharedExclusions,
  },
  varkala: {
    duration: '2 Days / 1 Night',
    tagline: 'Cliffs Above the Arabian Sea',
    about:
      'A dramatic cliffside beach town on Kerala\'s coast, popular for its red laterite cliffs overlooking the Arabian Sea.',
    highlights: ['Varkala Cliff', 'Papanasam Beach', 'Janardanaswamy Temple', 'Sivagiri Mutt'],
    itinerary: [
      { day: 'Day 1', title: 'Arrival and Varkala Cliff', text: 'Arrival; Varkala Cliff walk and Papanasam Beach at sunset.' },
      { day: 'Day 2', title: 'Sivagiri and departure', text: 'Sivagiri Mutt and local sightseeing; departure.' },
    ],
    inclusions: sharedInclusions,
    exclusions: sharedExclusions,
  },
  kovalam: {
    duration: '2 Days / 1 Night',
    tagline: 'Lighthouse and Crescent Beaches',
    about:
      "One of Kerala's original beach destinations, known for its lighthouse and calm crescent beaches.",
    highlights: ['Lighthouse Beach', 'Hawah Beach', 'Ayurvedic spa options'],
    itinerary: [
      { day: 'Day 1', title: 'Arrival and Lighthouse Beach', text: 'Arrival; Lighthouse Beach and sunset.' },
      { day: 'Day 2', title: 'Leisure morning and departure', text: 'Leisure morning, optional Ayurvedic treatment; departure.' },
    ],
    inclusions: sharedInclusions,
    exclusions: sharedExclusions,
  },
  'fort-kochi': {
    duration: '2 Days / 1 Night',
    tagline: 'A Walkable Colonial Coastal Old Town',
    about:
      'A walkable coastal old town layered with Portuguese, Dutch, and British colonial history.',
    highlights: ['Chinese fishing nets', 'Mattancherry Palace', 'Paradesi Synagogue', 'St. Francis Church'],
    itinerary: [
      { day: 'Day 1', title: 'Arrival and Fort Kochi', text: 'Arrival; Chinese fishing nets and a Fort Kochi beach walk.' },
      { day: 'Day 2', title: 'Mattancherry and departure', text: 'Mattancherry Palace, Paradesi Synagogue, and St. Francis Church; local markets; departure.' },
    ],
    inclusions: sharedInclusions,
    exclusions: sharedExclusions,
  },
  'periyar-national-park': {
    duration: '2 Days / 1 Night',
    tagline: 'Wildlife and Spice in the Western Ghats',
    about:
      'A wildlife reserve in the Western Ghats, best known for its boat safari across Periyar Lake.',
    highlights: ['Periyar Lake boat safari', 'Spice plantation tour', 'Wildlife trekking'],
    itinerary: [
      { day: 'Day 1', title: 'Arrival and spice plantation', text: 'Arrival; guided spice plantation tour.' },
      { day: 'Day 2', title: 'Safari and departure', text: 'Periyar Lake boat safari and short wildlife trek; departure.' },
    ],
    inclusions: sharedInclusions,
    exclusions: [...sharedExclusions, 'Boat safari tickets and any additional trekking permits charged separately'],
  },
  'eravikulam-national-park': {
    duration: 'Day excursion (typically combined with a Munnar stay)',
    tagline: 'Nilgiri Tahr and Anamudi Views',
    about:
      "Home to the endangered Nilgiri Tahr and Anamudi, South India's highest peak — a short excursion best paired with a Munnar package.",
    highlights: ['Nilgiri Tahr sighting', 'Rajamala viewpoint', 'Anamudi peak views'],
    itinerary: [
      { day: 'Day 1', title: 'Rajamala excursion', text: 'Entry via Rajamala; shuttle to the viewing zone; guided walk to spot Nilgiri Tahr; return by afternoon.' },
    ],
    inclusions: sharedInclusions.filter((item) => !item.startsWith('Accommodation as per itinerary')),
    exclusions: [...sharedExclusions, 'Park entry and shuttle fees charged separately'],
  },
  'athirappilly-waterfalls': {
    duration: 'Day excursion',
    tagline: 'Waterfalls in the Sholayar Forest Range',
    about:
      'Kerala\'s largest waterfall, often called the "Niagara of India," set inside the Sholayar forest range.',
    highlights: ['Athirappilly Falls viewpoint', 'Vazhachal Falls', 'Forest nature walk'],
    itinerary: [
      { day: 'Day 1', title: 'Athirappilly and Vazhachal', text: 'Athirappilly Falls viewpoint in the morning; Vazhachal Falls and a short forest walk; return by evening.' },
    ],
    inclusions: sharedInclusions.filter((item) => !item.startsWith('Accommodation as per itinerary')),
    exclusions: sharedExclusions,
  },
  ooty: {
    duration: '2 Days / 1 Night',
    tagline: 'Cool Climate and the Nilgiri Hills',
    about:
      'The best known hill station in Tamil Nadu, famous for its heritage toy train and cool climate.',
    highlights: ['Nilgiri Mountain Railway (UNESCO heritage toy train)', 'Ooty Lake', 'Government Botanical Garden', 'Doddabetta Peak'],
    itinerary: [
      { day: 'Day 1', title: 'Arrival and Ooty Lake', text: 'Arrival; Ooty Lake boating and the Botanical Garden.' },
      { day: 'Day 2', title: 'Doddabetta and departure', text: 'Doddabetta Peak viewpoint; optional Nilgiri toy train ride; departure.' },
    ],
    inclusions: sharedInclusions,
    exclusions: [...sharedExclusions, 'Toy train tickets charged separately, subject to availability'],
  },
  kodaikanal: {
    duration: '2 Days / 1 Night',
    tagline: 'Misty Lakes and Palani Hills',
    about:
      "A misty lake-town in the Palani Hills, known for Coaker's Walk and its star-shaped lake.",
    highlights: ['Kodaikanal Lake', "Coaker's Walk", 'Pillar Rocks', 'Bryant Park'],
    itinerary: [
      { day: 'Day 1', title: 'Arrival and Kodaikanal Lake', text: 'Arrival; Kodaikanal Lake boating and Bryant Park.' },
      { day: 'Day 2', title: 'Coaker\'s Walk and departure', text: "Coaker's Walk and Pillar Rocks viewpoint; departure." },
    ],
    inclusions: sharedInclusions,
    exclusions: sharedExclusions,
  },
  yercaud: {
    duration: '2 Days / 1 Night',
    tagline: 'Coffee Country in the Shevaroy Hills',
    about:
      "Tamil Nadu's quieter coffee-country hill station in the Shevaroy Hills.",
    highlights: ['Yercaud Lake', 'Coffee estate visit', "Lady's Seat viewpoint", 'Killiyur Falls'],
    itinerary: [
      { day: 'Day 1', title: 'Arrival and Yercaud Lake', text: 'Arrival; Yercaud Lake boating and a coffee estate visit.' },
      { day: 'Day 2', title: 'Viewpoint and departure', text: "Lady's Seat viewpoint and Killiyur Falls; departure." },
    ],
    inclusions: sharedInclusions,
    exclusions: sharedExclusions,
  },
  yelagiri: {
    duration: '2 Days / 1 Night',
    tagline: 'A Quieter Eastern Ghats Hill Station',
    about:
      'A lesser-known hill station spread across 14 hamlets in the Eastern Ghats, quieter than Ooty or Kodaikanal.',
    highlights: ['Punganoor Lake', 'Nature Park', 'Swamimalai trekking point', 'Velavan Temple'],
    itinerary: [
      { day: 'Day 1', title: 'Arrival and Punganoor Lake', text: 'Arrival; Punganoor Lake boating and Nature Park.' },
      { day: 'Day 2', title: 'Swamimalai and departure', text: 'Swamimalai trekking point and Velavan Temple viewpoint; departure.' },
    ],
    inclusions: sharedInclusions,
    exclusions: sharedExclusions,
  },
}

const pendingDestinationSlugs = new Set([
  'munnar',
  'wayanad',
  'vagamon',
  'alleppey',
  'kumarakom',
  'varkala',
  'kovalam',
  'fort-kochi',
  'periyar-national-park',
  'eravikulam-national-park',
  'athirappilly-waterfalls',
  'ooty',
  'kodaikanal',
  'yercaud',
  'yelagiri',
])

function destinationsWithStates() {
  const india = destinationCountries.find(
    (country) => country.id === 'india' && country.kind === 'states',
  )
  if (!india || india.kind !== 'states') return []

  return india.states.flatMap((state) =>
    state.categories.flatMap((category) =>
      category.destinations.map((destination) => ({
        ...destination,
        stateName: state.name,
      })),
    ),
  )
}

export function getPendingDestinationBySlug(
  slug: string,
): PendingDestinationPackage | undefined {
  if (!pendingDestinationSlugs.has(slug)) return undefined
  const destination = destinationsWithStates().find((item) => item.slug === slug)
  const details = pendingPackageDetails[slug]
  return destination && details ? { ...destination, ...details } : undefined
}

export function isPendingDestinationSlug(slug: string): boolean {
  return pendingDestinationSlugs.has(slug)
}