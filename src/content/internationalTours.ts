import type { TravelPackage } from './site'

/**
 * International tour packages with confirmed durations only.
 * Packages marked Duration: TBD in the source brief are omitted until client confirms.
 */

export type TourCountry =
  | 'India'
  | 'Indonesia'
  | 'Thailand'
  | 'Malaysia'
  | 'Vietnam'
  | 'Dubai, UAE'
  | 'Singapore'

export type TourPackage = {
  slug: string
  country: TourCountry
  title: string
  tagline: string
  description: string
  /** e.g. "7 Days / 6 Nights" or "1 Day" — only confirmed values */
  duration: string
  days: number
  nights: number
  image: string
  imageAlt: string
  about: string
  highlights: string[]
  itinerary: { day: string; title: string; text: string }[]
  inclusions: string[]
  exclusions: string[]
}

export function tourPackageToTravelPackage(pkg: TourPackage): TravelPackage {
  return {
    id: pkg.slug,
    category: 'tour' as const,
    title: pkg.title,
    tag: pkg.country,
    season: '',
    summary: pkg.description,
    locations: pkg.country,
    duration: pkg.duration,
    image: pkg.image,
    pricing: {
      adult: 0,
      child: 0,
      infant: 0,
      currency: 'INR' as const,
      note: 'Enquire for a personalised quote',
    },
    features: pkg.inclusions.slice(0, 5),
    highlights: pkg.highlights,
    amenities: [
      { key: 'hotel' as const, title: 'Hotels', subtitle: 'As quoted' },
      { key: 'transport' as const, title: 'Transfers', subtitle: 'As quoted' },
      { key: 'meals' as const, title: 'Meals', subtitle: 'As quoted' },
      { key: 'support' as const, title: 'Support', subtitle: 'Dubai team' },
      { key: 'visa' as const, title: 'Guidance', subtitle: 'Trip planning' },
    ],
    availableTravelModes: ['air', 'road'],
  }
}

export const internationalTourPackages: TourPackage[] = [
  {
    slug: 'delhi-agra-taj-mahal-kashmir',
    country: 'India',
    title: 'Delhi, Agra & Taj Mahal with Kashmir',
    tagline: 'From Mughal Marble to Mountain Valleys',
    description:
      "The Taj Mahal, Agra Fort, and on to Kashmir's lakes and gardens.",
    duration: '7 Days / 6 Nights',
    days: 7,
    nights: 6,
    image: '/images/tours/delhi-agra-kashmir.jpg',
    imageAlt: 'Taj Mahal at sunrise in Agra, India',
    about:
      'Combine North India’s landmark circuit with the cool valleys of Kashmir. This journey moves from Delhi and Agra’s Mughal heritage to Srinagar’s lakes and gardens — paced for travellers who want both history and mountain scenery in one week.',
    highlights: [
      'Taj Mahal and Agra Fort',
      'Delhi heritage highlights',
      'Kashmir lakes and Mughal gardens',
      'Guided sightseeing with private transfers (as confirmed in your quote)',
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Arrive Delhi',
        text: 'Arrival and hotel check-in. Evening at leisure or optional old-city orientation.',
      },
      {
        day: 'Day 2',
        title: 'Delhi sightseeing',
        text: 'Explore key Old and New Delhi landmarks, monuments, and boulevards.',
      },
      {
        day: 'Day 3',
        title: 'Delhi to Agra',
        text: 'Transfer to Agra. Visit the Taj Mahal and Agra Fort.',
      },
      {
        day: 'Day 4',
        title: 'Agra to Kashmir',
        text: 'Fly onward to Srinagar. Settle in and enjoy a lakeside evening.',
      },
      {
        day: 'Day 5',
        title: 'Srinagar & gardens',
        text: 'Shikara experience and Mughal garden visits around Dal Lake.',
      },
      {
        day: 'Day 6',
        title: 'Kashmir valleys',
        text: 'Day trip into nearby valleys and viewpoints (season and weather permitting).',
      },
      {
        day: 'Day 7',
        title: 'Departure',
        text: 'Transfer to the airport for your onward or return flight.',
      },
    ],
    inclusions: [
      'Accommodation for 6 nights (hotel class as confirmed in quotation)',
      'Daily breakfast (unless otherwise stated in your quote)',
      'Sightseeing as outlined, with private vehicle where included',
      'English-speaking local guidance on touring days',
      'All applicable hotel taxes listed in your quotation',
    ],
    exclusions: [
      'International / domestic airfare unless added to your quote',
      'Visa fees, travel insurance, and personal expenses',
      'Meals not specified, tips, and optional activities',
      'Entrance fees where not listed as included',
    ],
  },
  {
    slug: 'kashmir-golden-triangle',
    country: 'India',
    title: 'Kashmir with Golden Triangle',
    tagline: 'Valleys, Forts, and the Taj',
    description:
      "Delhi, Agra, Jaipur's Golden Triangle extended into Kashmir.",
    duration: '8 Days / 7 Nights',
    days: 8,
    nights: 7,
    image: '/images/tours/kashmir-golden-triangle.jpg',
    imageAlt: 'Houseboats on Dal Lake in Kashmir',
    about:
      'The classic Golden Triangle — Delhi, Agra, and Jaipur — extended into Kashmir’s valleys. Ideal for travellers who want forts, the Taj Mahal, and mountain lakes in a single itinerary.',
    highlights: [
      'Delhi, Agra, and Jaipur circuit',
      'Taj Mahal sunrise or daytime visit',
      'Jaipur forts and palace highlights',
      'Kashmir lake and garden experiences',
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Arrive Delhi',
        text: 'Meet, assist, and hotel check-in. Rest after travel.',
      },
      {
        day: 'Day 2',
        title: 'Delhi',
        text: 'Old and New Delhi sightseeing covering major monuments.',
      },
      {
        day: 'Day 3',
        title: 'Delhi to Agra',
        text: 'Drive to Agra. Taj Mahal and Agra Fort visits.',
      },
      {
        day: 'Day 4',
        title: 'Agra to Jaipur',
        text: 'Continue to Jaipur via Fatehpur Sikri (time permitting).',
      },
      {
        day: 'Day 5',
        title: 'Jaipur',
        text: 'Amber Fort, City Palace area, and bazaar time.',
      },
      {
        day: 'Day 6',
        title: 'Jaipur to Kashmir',
        text: 'Fly to Srinagar. Evening by the lake.',
      },
      {
        day: 'Day 7',
        title: 'Srinagar',
        text: 'Shikara ride and garden visits.',
      },
      {
        day: 'Day 8',
        title: 'Departure',
        text: 'Airport transfer for departure.',
      },
    ],
    inclusions: [
      '7 nights accommodation as confirmed in quotation',
      'Daily breakfast',
      'Golden Triangle sightseeing with vehicle where included',
      'Kashmir touring as outlined',
      'Local guiding on touring days',
    ],
    exclusions: [
      'Flights unless quoted',
      'Visa, insurance, and personal shopping',
      'Meals and entrances not listed as included',
      'Optional pony / gondola / adventure add-ons',
    ],
  },
  {
    slug: 'haridwar-rishikesh',
    country: 'India',
    title: 'Haridwar & Rishikesh',
    tagline: 'On the Banks of the Ganges',
    description:
      'Temple towns, the evening Ganga Aarti, and the foothills of the Himalayas.',
    duration: '3 Days / 2 Nights',
    days: 3,
    nights: 2,
    image: '/images/tours/haridwar-rishikesh.jpg',
    imageAlt: 'Ganga Aarti ceremony on the riverbanks',
    about:
      'A short spiritual break in the Himalayan foothills. Visit Haridwar’s ghats, witness the evening Ganga Aarti, and spend time in Rishikesh — known for temples, yoga ashrams, and riverside calm.',
    highlights: [
      'Haridwar temple and ghat visits',
      'Evening Ganga Aarti',
      'Rishikesh riverside and ashram area',
      'Compact 3-day pacing',
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Arrive Haridwar',
        text: 'Check in and evening Ganga Aarti at the main ghat.',
      },
      {
        day: 'Day 2',
        title: 'Haridwar & Rishikesh',
        text: 'Temple visits in Haridwar and a day exploring Rishikesh.',
      },
      {
        day: 'Day 3',
        title: 'Departure',
        text: 'Morning at leisure and transfer for departure.',
      },
    ],
    inclusions: [
      '2 nights accommodation',
      'Daily breakfast',
      'Local transfers for listed sightseeing',
      'Assistance for Ganga Aarti viewing',
    ],
    exclusions: [
      'Rafting or adventure activities unless added',
      'Flights / trains to Haridwar unless quoted',
      'Personal expenses and tips',
      'Meals other than breakfast',
    ],
  },
  {
    slug: 'batam',
    country: 'Indonesia',
    title: 'Batam',
    tagline: 'A Quick Island Escape',
    description: 'A short island getaway close to Singapore.',
    duration: '1 Day',
    days: 1,
    nights: 0,
    image: '/images/tours/batam.jpg',
    imageAlt: 'Tropical coastline near Batam, Indonesia',
    about:
      'A one-day island escape from the Singapore corridor — easy pacing for shopping, coastal views, and a change of scene without an overnight stay.',
    highlights: [
      'Day-trip format',
      'Coastal and city highlights',
      'Convenient from Singapore',
      'Flexible activity mix on quotation',
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Batam day trip',
        text: 'Ferry or transfer in, island sightseeing and free time, return the same day as confirmed in your schedule.',
      },
    ],
    inclusions: [
      'Day touring as confirmed in quotation',
      'Local transfers for the listed programme',
      'Guide / host assistance where included',
    ],
    exclusions: [
      'Ferry or flight tickets unless quoted',
      'Meals, shopping, and personal expenses',
      'Visa or immigration fees if applicable',
      'Optional spa or attraction tickets',
    ],
  },
  {
    slug: 'bangkok-pattaya',
    country: 'Thailand',
    title: 'Bangkok – Pattaya',
    tagline: 'City Lights to Beach Nights',
    description: "Bangkok's energy paired with Pattaya's coast.",
    duration: '5 Days / 4 Nights',
    days: 5,
    nights: 4,
    image: '/images/tours/Bangkok%20%E2%80%93%20Pattaya.jpg',
    imageAlt: 'Thailand travel landscape',
    about:
      'Split your Thailand short break between Bangkok’s temples and markets and Pattaya’s coastline — a balanced city-and-beach itinerary over five days.',
    highlights: [
      'Bangkok temple and city highlights',
      'Pattaya beach time',
      'City-to-coast transfers',
      'Evening free time for local dining',
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Arrive Bangkok',
        text: 'Airport meet and hotel check-in. Evening at leisure.',
      },
      {
        day: 'Day 2',
        title: 'Bangkok sightseeing',
        text: 'Temples, landmarks, and market time.',
      },
      {
        day: 'Day 3',
        title: 'Bangkok to Pattaya',
        text: 'Transfer to Pattaya. Beach afternoon.',
      },
      {
        day: 'Day 4',
        title: 'Pattaya',
        text: 'Coastal free day or optional island / show add-ons.',
      },
      {
        day: 'Day 5',
        title: 'Departure',
        text: 'Return transfer toward Bangkok airport for departure.',
      },
    ],
    inclusions: [
      '4 nights hotel stay (split Bangkok / Pattaya as quoted)',
      'Daily breakfast',
      'Bangkok sightseeing tour as outlined',
      'Bangkok–Pattaya transfer',
    ],
    exclusions: [
      'International flights',
      'Optional shows, island hops, and water sports',
      'Visa on arrival / related fees if applicable',
      'Personal expenses and tips',
    ],
  },
  {
    slug: 'bangkok-free-easy',
    country: 'Thailand',
    title: 'Bangkok Free & Easy',
    tagline: 'Explore Bangkok at Your Own Pace',
    description: 'A flexible short break in Bangkok.',
    duration: '3 Days / 2 Nights',
    days: 3,
    nights: 2,
    image: '/images/tours/bangkok-free-easy.jpg',
    imageAlt: 'Temple spires in Bangkok, Thailand',
    about:
      'A flexible Bangkok short break with hotel stay and transfers — ideal if you prefer to explore markets, malls, and temples at your own pace.',
    highlights: [
      '2 nights in Bangkok',
      'Airport transfers (as quoted)',
      'Free day for personal exploration',
      'Optional tours available on request',
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Arrive Bangkok',
        text: 'Airport transfer and hotel check-in.',
      },
      {
        day: 'Day 2',
        title: 'Free & easy',
        text: 'Full day at leisure — optional city tour can be added to your quote.',
      },
      {
        day: 'Day 3',
        title: 'Departure',
        text: 'Hotel check-out and airport transfer.',
      },
    ],
    inclusions: [
      '2 nights accommodation',
      'Daily breakfast',
      'Arrival and departure airport transfers (as quoted)',
    ],
    exclusions: [
      'Sightseeing tours unless added',
      'Flights, visa, and insurance',
      'Meals other than breakfast',
      'Personal expenses',
    ],
  },
  {
    slug: 'bangkok-tour',
    country: 'Thailand',
    title: 'Bangkok Tour',
    tagline: "Bangkok's Best in a Short Trip",
    description: 'Temples, markets, and city highlights.',
    duration: '3 Days / 2 Nights',
    days: 3,
    nights: 2,
    image: '/images/tours/bangkok-tour.jpg',
    imageAlt: 'Grand Palace and Wat Phra Kaew in Bangkok',
    about:
      'A compact Bangkok city package with guided highlights — temples, landmarks, and market energy packed into three days.',
    highlights: [
      'Guided Bangkok city highlights',
      'Temple visits',
      'Market / local neighbourhood time',
      'Hotel with breakfast',
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Arrive Bangkok',
        text: 'Transfer to hotel. Evening free.',
      },
      {
        day: 'Day 2',
        title: 'Bangkok highlights',
        text: 'Full-day or half-day city tour covering temples and key landmarks.',
      },
      {
        day: 'Day 3',
        title: 'Departure',
        text: 'Transfer to the airport.',
      },
    ],
    inclusions: [
      '2 nights accommodation',
      'Daily breakfast',
      'Guided city sightseeing as quoted',
      'Airport transfers as quoted',
    ],
    exclusions: [
      'Flights and visa fees',
      'Optional dinner cruises or shows',
      'Personal shopping and tips',
      'Entrance fees if not listed as included',
    ],
  },
  {
    slug: 'langkawi',
    country: 'Malaysia',
    title: 'Langkawi',
    tagline: 'Islands and Cable Car Views',
    description: 'Beaches, the SkyCab, and duty-free shopping.',
    duration: '4 Days / 3 Nights',
    days: 4,
    nights: 3,
    image: '/images/tours/langkawi.jpg',
    imageAlt: 'Langkawi coastline and tropical hills',
    about:
      'Four days on Langkawi — beaches, SkyCab viewpoints, and duty-free browsing — a relaxed island break with room for optional island-hopping.',
    highlights: [
      'Beach hotel stay',
      'SkyCab / viewpoint experience (as quoted)',
      'Duty-free shopping time',
      'Optional island hopping',
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Arrive Langkawi',
        text: 'Airport transfer and beach hotel check-in.',
      },
      {
        day: 'Day 2',
        title: 'Island highlights',
        text: 'SkyCab area and island orientation tour.',
      },
      {
        day: 'Day 3',
        title: 'Free / optional',
        text: 'Beach day or optional island-hopping cruise.',
      },
      {
        day: 'Day 4',
        title: 'Departure',
        text: 'Transfer to Langkawi airport.',
      },
    ],
    inclusions: [
      '3 nights accommodation',
      'Daily breakfast',
      'Airport transfers',
      'Orientation / SkyCab programme as confirmed in quote',
    ],
    exclusions: [
      'Flights to Langkawi',
      'Optional island-hopping unless added',
      'Personal expenses and duty-free purchases',
      'Meals other than breakfast',
    ],
  },
  {
    slug: 'hanoi-sapa-ha-long',
    country: 'Vietnam',
    title: 'Hanoi – Sapa – Ha Long',
    tagline: 'Mountains to Emerald Waters',
    description:
      "Sapa's terraced hills and Ha Long Bay's limestone islands.",
    duration: '5 Days / 4 Nights',
    days: 5,
    nights: 4,
    image: '/images/tours/hanoi-sapa-halong.jpg',
    imageAlt: 'Limestone islands in Ha Long Bay, Vietnam',
    about:
      'A classic northern Vietnam route linking Hanoi’s old quarter energy with Sapa’s terraced highlands and Ha Long Bay’s limestone seascape.',
    highlights: [
      'Hanoi city introduction',
      'Sapa highland scenery',
      'Ha Long Bay cruise segment (as quoted)',
      'Balanced 5-day pacing',
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Arrive Hanoi',
        text: 'Transfer to hotel. Optional old-quarter stroll.',
      },
      {
        day: 'Day 2',
        title: 'Hanoi to Sapa',
        text: 'Travel to Sapa. Village / terrace viewpoints.',
      },
      {
        day: 'Day 3',
        title: 'Sapa to Ha Long',
        text: 'Descend toward Ha Long for overnight or day cruise as quoted.',
      },
      {
        day: 'Day 4',
        title: 'Ha Long to Hanoi',
        text: 'Bay activities then return to Hanoi.',
      },
      {
        day: 'Day 5',
        title: 'Departure',
        text: 'Airport transfer.',
      },
    ],
    inclusions: [
      '4 nights accommodation / cruise night as quoted',
      'Meals listed in your quotation',
      'Transfers between Hanoi, Sapa, and Ha Long',
      'English-speaking guiding on touring days',
    ],
    exclusions: [
      'International flights',
      'Tips, drinks, and personal expenses',
      'Optional trekking upgrades',
      'Visa fees if required',
    ],
  },
  {
    slug: 'hanoi-sapa-ha-long-extended',
    country: 'Vietnam',
    title: 'Hanoi – Sapa – Ha Long (Extended)',
    tagline: 'The Longer Northern Vietnam Route',
    description: 'More time in Sapa and Ha Long Bay.',
    duration: '6 Days / 5 Nights',
    days: 6,
    nights: 5,
    image: '/images/tours/hanoi-sapa-halong-ext.jpg',
    imageAlt: 'Rice terraces in Sapa, Vietnam',
    about:
      'An extended northern Vietnam circuit with extra time in Sapa and Ha Long Bay — better for travellers who want a slower highland and bay experience.',
    highlights: [
      'Extra Sapa exploration time',
      'Longer Ha Long Bay programme',
      'Hanoi cultural introduction',
      '6-day pacing',
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Arrive Hanoi',
        text: 'Hotel check-in and orientation.',
      },
      {
        day: 'Day 2',
        title: 'Hanoi to Sapa',
        text: 'Transfer to the highlands. Evening in Sapa town.',
      },
      {
        day: 'Day 3',
        title: 'Sapa',
        text: 'Full day among terraces and local villages.',
      },
      {
        day: 'Day 4',
        title: 'Sapa to Ha Long',
        text: 'Travel to Ha Long. Begin bay programme.',
      },
      {
        day: 'Day 5',
        title: 'Ha Long to Hanoi',
        text: 'Morning on the bay, return to Hanoi.',
      },
      {
        day: 'Day 6',
        title: 'Departure',
        text: 'Airport transfer.',
      },
    ],
    inclusions: [
      '5 nights accommodation / cruise as quoted',
      'Meals listed in quotation',
      'All route transfers',
      'Guided touring days',
    ],
    exclusions: [
      'Flights and visas',
      'Personal expenses and tips',
      'Optional spa or shopping stops',
      'Travel insurance',
    ],
  },
  {
    slug: 'hanoi-ha-long-ninh-binh',
    country: 'Vietnam',
    title: 'Hanoi – Ha Long – Ninh Binh',
    tagline: 'Bay, Rivers & Rice Fields',
    description: "Ha Long Bay plus Ninh Binh's inland waterways.",
    duration: '5 Days / 4 Nights',
    days: 5,
    nights: 4,
    image: '/images/tours/hanoi-halong-ninhbinh.jpg',
    imageAlt: 'River and limestone karsts in Ninh Binh, Vietnam',
    about:
      'Northern Vietnam without the highland climb — Hanoi, Ha Long Bay’s emerald waters, and Ninh Binh’s river-and-karst landscapes.',
    highlights: [
      'Ha Long Bay',
      'Ninh Binh boat landscape',
      'Hanoi old quarter',
      'No Sapa mountain transfer',
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Arrive Hanoi',
        text: 'Transfer and hotel check-in.',
      },
      {
        day: 'Day 2',
        title: 'Hanoi to Ha Long',
        text: 'Bay cruise programme as quoted.',
      },
      {
        day: 'Day 3',
        title: 'Ha Long to Ninh Binh',
        text: 'Travel inland to Ninh Binh. Evening at leisure.',
      },
      {
        day: 'Day 4',
        title: 'Ninh Binh',
        text: 'River boat through limestone scenery; return toward Hanoi.',
      },
      {
        day: 'Day 5',
        title: 'Departure',
        text: 'Airport transfer.',
      },
    ],
    inclusions: [
      '4 nights stay / cruise night as quoted',
      'Listed meals',
      'Route transfers and sightseeing',
      'Local guiding',
    ],
    exclusions: [
      'International airfare',
      'Personal expenses',
      'Optional bicycle or cave add-ons',
      'Visa and insurance',
    ],
  },
  {
    slug: 'hanoi-sapa-ninh-binh',
    country: 'Vietnam',
    title: 'Hanoi – Sapa – Ninh Binh',
    tagline: 'Highlands to Lowlands',
    description: "Sapa's peaks down to Ninh Binh's karst landscape.",
    duration: '6 Days / 5 Nights',
    days: 6,
    nights: 5,
    image: '/images/tours/hanoi-sapa-ninhbinh.jpg',
    imageAlt: 'Mountain path above Sapa terraces, Vietnam',
    about:
      'From Sapa’s highland terraces down to Ninh Binh’s lowland karsts — a mountains-to-rivers northern Vietnam route with Hanoi as your gateway.',
    highlights: [
      'Sapa highland days',
      'Ninh Binh river landscapes',
      'Hanoi start and finish',
      'No Ha Long Bay segment',
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Arrive Hanoi',
        text: 'Hotel check-in.',
      },
      {
        day: 'Day 2',
        title: 'Hanoi to Sapa',
        text: 'Transfer to Sapa. Orientation walk.',
      },
      {
        day: 'Day 3',
        title: 'Sapa',
        text: 'Terraces and village visit.',
      },
      {
        day: 'Day 4',
        title: 'Sapa to Ninh Binh',
        text: 'Long transfer to Ninh Binh region.',
      },
      {
        day: 'Day 5',
        title: 'Ninh Binh to Hanoi',
        text: 'River landscape tour, then return to Hanoi.',
      },
      {
        day: 'Day 6',
        title: 'Departure',
        text: 'Airport transfer.',
      },
    ],
    inclusions: [
      '5 nights accommodation',
      'Meals listed in quotation',
      'All route transfers',
      'Guided touring days',
    ],
    exclusions: [
      'Flights and visas',
      'Tips and personal expenses',
      'Optional trekking gear rental',
      'Travel insurance',
    ],
  },
  {
    slug: 'dubai-new-glimpses',
    country: 'Dubai, UAE',
    title: 'Dubai New Glimpses',
    tagline: 'Dubai\'s Newest Attractions',
    description:
      "A five-day Dubai itinerary covering the city's newest attractions.",
    duration: '4 Nights / 5 Days',
    days: 5,
    nights: 4,
    image: '/images/tours/Dubai New Glimpses.jpg',
    imageAlt: 'Dubai New Glimpses travel package',
    about:
      "A five-day Dubai itinerary covering the city's newest attractions — from the Museum of the Future to the Dubai Safari Park and a ride over Palm Jumeirah.",
    highlights: [
      'Dubai Crocodile Park',
      'Museum of the Future',
      'Skyviews Observatory',
      'Dubai Safari Park',
      'Palm Jumeirah Monorail & View at the Palm',
      'Aya Universe',
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Arrive Dubai International Airport',
        text: 'Meet and transfer to hotel. Evening visit to Dubai Crocodile Park. Overnight in Dubai.',
      },
      {
        day: 'Day 2',
        title: 'Museum of the Future and Skyviews Observatory',
        text: 'Morning visit to the Museum of the Future. Evening visit to Skyviews Observatory at Downtown Dubai. Overnight in Dubai.',
      },
      {
        day: 'Day 3',
        title: 'Dubai Safari Park',
        text: 'Morning and afternoon visit to Dubai Safari Park. Overnight in Dubai.',
      },
      {
        day: 'Day 4',
        title: 'Palm Jumeirah and Aya Universe',
        text: 'Morning one-way monorail ride over Palm Jumeirah, followed by a visit to View at the Palm Observatory. Evening visit to Aya Universe at Wafi City. Overnight in Dubai.',
      },
      {
        day: 'Day 5',
        title: 'Departure',
        text: 'Check out and transfer back to Dubai International Airport for departure.',
      },
    ],
    inclusions: [
      '4 nights accommodation on twin-sharing basis, inclusive of breakfast and all taxes',
      'Private arrival transfer from Dubai International Airport to hotel',
      'Dubai Crocodile Park visit with entry ticket and private transfers',
      'Museum of the Future visit with entry ticket and private transfers',
      'Skyviews Observatory visit with entry ticket and private transfers',
      'Dubai Safari Park visit with entry ticket and private transfers',
      'One-way monorail ride over Palm Jumeirah',
      'View at the Palm visit with entry ticket and private transfers',
      'Aya Universe visit with entry ticket and private transfers',
      'Private departure transfer from hotel to Dubai International Airport',
      'All applicable taxes, including 5% VAT',
      'Complimentary: 2 x 500ml bottles of mineral water per person per day; facial wipes on arrival day',
    ],
    exclusions: [
      'Air tickets to/from or within the United Arab Emirates',
      'Any meals not mentioned in the itinerary',
      'Any tours, transfers, or services not mentioned in the itinerary',
      'Personal expenses (tips, porterage, room service, laundry, calls, etc.)',
      'Increases in entrance fees, taxes, insurance, or other incidental charges',
      'Meet & greet assistance inside the airport',
      'Visa and OK-to-board charges',
      'Tourism Dirham Fee applied by hotels',
      'Anything not mentioned under Package Inclusions',
    ],
  },
  {
    slug: 'dubai-stop-over',
    country: 'Dubai, UAE',
    title: 'Dubai Stop-Over',
    tagline: 'A Short Dubai Stopover',
    description:
      "A short Dubai stopover covering the city's highlights and a desert safari.",
    duration: '2 Nights / 3 Days',
    days: 3,
    nights: 2,
    image: '/images/tours/Dubai Stop-Over.jpg',
    imageAlt: 'Dubai Stop-Over travel package',
    about:
      "A short Dubai stopover covering the city's highlights and a desert safari — ideal for travelers with limited time between connections.",
    highlights: ['Half-day Dubai city tour', 'Desert Safari with BBQ dinner'],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Arrive Dubai International Airport',
        text: 'Meet and transfer to hotel. Overnight in Dubai.',
      },
      {
        day: 'Day 2',
        title: 'Dubai city tour and Desert Safari',
        text: 'Morning half-day city tour of Dubai. Afternoon to evening Desert Safari with camp activities and BBQ dinner. Overnight in Dubai.',
      },
      {
        day: 'Day 3',
        title: 'Departure',
        text: 'Check out and transfer back to Dubai International Airport for departure.',
      },
    ],
    inclusions: [
      '2 nights accommodation on twin-sharing basis, inclusive of breakfast and all taxes',
      'Private arrival transfer from Dubai International Airport to hotel',
      'Half-day city tour of Dubai on a shared (Seat-in-Coach) basis',
      'Desert Safari with camp activities and BBQ dinner on a shared basis',
      'Private departure transfer from hotel to Dubai International Airport',
      'All applicable taxes, including 5% VAT',
      'Complimentary: 2 x 500ml bottles of mineral water per person per day; facial wipes on arrival day',
    ],
    exclusions: [
      'Air tickets to/from or within the United Arab Emirates',
      'Any meals not mentioned in the itinerary',
      'Any tours, transfers, or services not mentioned in the itinerary',
      'Personal expenses (tips, porterage, room service, laundry, calls, etc.)',
      'Increases in entrance fees, taxes, insurance, or other incidental charges',
      'Meet & greet assistance inside the airport',
      'Visa and OK-to-board charges',
      'Tourism Dirham Fee applied by hotels',
      'Anything not mentioned under Package Inclusions',
    ],
  },
  {
    slug: 'emirates-heritage',
    country: 'Dubai, UAE',
    title: 'Emirates Heritage',
    tagline: 'Across the Emirates to Musandam',
    description:
      "A six-day tour across the UAE's seven emirates, ending with a dhow cruise into Musandam's Omani fjords.",
    duration: '5 Nights / 6 Days',
    days: 6,
    nights: 5,
    image: '/images/tours/Emirates Heritage.jpg',
    imageAlt: 'Emirates Heritage travel package',
    about:
      "A six-day tour across the UAE's seven emirates — Dubai, Sharjah, Abu Dhabi, Fujairah, and Khorfakkan — ending with a dhow cruise into Musandam's Omani fjords.",
    highlights: [
      'Dubai & Sharjah city tours',
      'Full-day Abu Dhabi',
      'Northern Emirates (Fujairah & Khorfakkan)',
      'Musandam Dibba Dhow Cruise',
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Arrive Dubai International Airport',
        text: 'Meet and transfer to hotel. Overnight in Dubai.',
      },
      {
        day: 'Day 2',
        title: 'Dubai and Sharjah city tours',
        text: 'Morning half-day city tour of Dubai. Afternoon to evening half-day city tour of Sharjah. Overnight in Dubai.',
      },
      {
        day: 'Day 3',
        title: 'Abu Dhabi',
        text: "Full-day Abu Dhabi city tour covering the city's important landmarks. Overnight in Dubai.",
      },
      {
        day: 'Day 4',
        title: 'Northern Emirates',
        text: 'Full-day city tour of the Northern Emirates — Fujairah and Khorfakkan. Overnight in Dubai.',
      },
      {
        day: 'Day 5',
        title: 'Musandam Dibba',
        text: 'Full-day trip to Musandam Dibba: Dhow cruise with lunch and activities. Note: this excursion crosses into Omani territory — guests must carry their original passport (valid at least 6 months); a day-pass/border formality is arranged by the operator, and a small border fee is typically payable separately on-site. Overnight in Dubai.',
      },
      {
        day: 'Day 6',
        title: 'Departure',
        text: 'Check out and transfer back to Dubai International Airport for departure.',
      },
    ],
    // TODO: Inclusions not yet received from client for this package — do not publish until confirmed. Do not copy another package's inclusions list as a placeholder.
    inclusions: [],
    exclusions: [
      'Air tickets to/from or within the United Arab Emirates',
      'Any meals not mentioned in the itinerary',
      'Any tours, transfers, or services not mentioned in the itinerary',
      'Personal expenses (tips, porterage, room service, laundry, calls, etc.)',
      'Increases in entrance fees, taxes, insurance, or other incidental charges',
      'Meet & greet assistance inside the airport',
      'Visa and OK-to-board charges',
      'Tourism Dirham Fee applied by hotels',
      'Anything not mentioned under Package Inclusions',
    ],
  },
  {
    slug: 'dubai-luxury-travel',
    country: 'Dubai, UAE',
    title: 'Dubai Luxury Travel',
    tagline: 'Dubai and Abu Dhabi in Luxury',
    description:
      'A five-day premium Dubai experience with private touring, a Marina yacht cruise, and a VIP desert camp.',
    duration: '4 Nights / 5 Days',
    days: 5,
    nights: 4,
    image: '/images/tours/Dubai Luxury Travel.jpg',
    imageAlt: 'Dubai Luxury Travel package',
    about:
      "A five-day premium Dubai experience — private touring by luxury SUV, a Marina yacht cruise, the Burj Khalifa's highest lounge, Ferrari World, and a VIP desert camp.",
    highlights: [
      'Private Yacht Cruise at the Marina',
      'Burj Khalifa Lounge (152nd–154th floor)',
      'Ferrari World (Fast Track)',
      'Inside Burj Al Arab Tour',
      'Luxury Desert Safari with VIP camp',
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Arrive Dubai International Airport',
        text: 'With meet & greet assistance, transfer to hotel. Evening 2-hour private yacht cruise at Dubai Marina. Overnight in Dubai.',
      },
      {
        day: 'Day 2',
        title: 'Dubai city tour and Burj Khalifa',
        text: 'Morning half-day private city tour of Dubai covering important landmarks in a luxury vehicle. Evening Dubai Mall visit and Burj Khalifa Highest Floor Lounge (152nd/153rd/154th floor). Overnight in Dubai.',
      },
      {
        day: 'Day 3',
        title: 'Abu Dhabi and Ferrari World',
        text: 'Full-day Abu Dhabi excursion: morning city tour covering important landmarks, afternoon to evening Ferrari World visit with fast-track entry. Overnight in Dubai.',
      },
      {
        day: 'Day 4',
        title: 'Burj Al Arab and luxury Desert Safari',
        text: 'Morning Inside Burj Al Arab Tour. Afternoon to evening Desert Safari with camp activities and BBQ dinner at a luxury camp with VIP table service. Overnight in Dubai.',
      },
      {
        day: 'Day 5',
        title: 'Departure',
        text: 'Check out and transfer back to Dubai International Airport for departure.',
      },
    ],
    inclusions: [
      '4 nights accommodation on twin-sharing basis, inclusive of breakfast and all taxes',
      'Private arrival transfer from Dubai International Airport to hotel',
      '2-hour exclusive yacht cruise at the Marina with private transfers',
      'Half-day private city tour of Dubai',
      'Burj Khalifa Lounge visit (152nd/153rd/154th floor) with entry ticket and private transfers',
      'Full-day private city tour of Abu Dhabi',
      'Ferrari World visit with fast-track entry ticket',
      'Inside Burj Al Arab Tour with entry ticket and private transfers',
      'Desert Safari with camp activities and BBQ dinner in a private vehicle, luxury camp with VIP table service',
      'Private departure transfer from hotel to Dubai International Airport',
      'All tours and transfers by GMC Yukon or similar category vehicle; Desert Safari by Land Cruiser or similar category vehicle',
      'Meet & greet assistance inside the airport for arrival and departure',
      'All applicable taxes, including 5% VAT',
      'Tourism Dirham Fee applied by hotels',
      'Complimentary: 2 x 500ml bottles of mineral water per person per day; facial wipes on arrival day',
    ],
    exclusions: [
      'Air tickets to/from or within the United Arab Emirates',
      'Any meals not mentioned in the itinerary',
      'Any tours, transfers, or services not mentioned in the itinerary',
      'Personal expenses (tips, porterage, room service, laundry, calls, etc.)',
      'Increases in entrance fees, taxes, insurance, or other incidental charges',
      'Meet & greet assistance inside the airport',
      'Visa and OK-to-board charges',
      'Anything not mentioned under Package Inclusions',
    ],
  },
  {
    slug: 'dubai-at-a-glance',
    country: 'Dubai, UAE',
    title: 'Dubai At A Glance',
    tagline: 'Dubai Highlights in Four Days',
    description:
      "A compact four-day Dubai introduction covering the city's signature experiences.",
    duration: '3 Nights / 4 Days',
    days: 4,
    nights: 3,
    image: '/images/tours/Dubai At A Glance.jpg',
    imageAlt: 'Dubai At A Glance travel package',
    about:
      "A compact four-day Dubai introduction covering the city's signature experiences — a Marina dhow dinner cruise, the Burj Khalifa, and a desert safari.",
    highlights: [
      'Dhow Cruise with Dinner (Dubai Marina)',
      'Burj Khalifa (124th/125th floor)',
      'Dubai Mall Fountain Show',
      'Desert Safari with BBQ dinner',
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Arrive Dubai International Airport',
        text: 'Meet and transfer to hotel. Evening 2-hour Dhow Cruise with dinner at Dubai Marina. Overnight in Dubai.',
      },
      {
        day: 'Day 2',
        title: 'Dubai city tour and Burj Khalifa',
        text: 'Morning half-day city tour of Dubai covering important landmarks. Evening Dubai Mall visit, Burj Khalifa 124th/125th Floor Observatory, and the Fountain Show at Dubai Mall. Overnight in Dubai.',
      },
      {
        day: 'Day 3',
        title: 'Desert Safari',
        text: 'Afternoon to evening Desert Safari with camp activities and BBQ dinner on a shared basis. Overnight in Dubai.',
      },
      {
        day: 'Day 4',
        title: 'Departure',
        text: 'Check out and transfer back to Dubai International Airport for departure.',
      },
    ],
    inclusions: [
      '3 nights accommodation on twin-sharing basis, inclusive of breakfast and all taxes',
      'Private arrival transfer from Dubai International Airport to hotel',
      'Dhow Cruise with dinner and shared transfers, Dubai Marina side',
      'Half-day city tour of Dubai on a shared (Seat-in-Coach) basis',
      'Burj Khalifa visit with entry ticket (124th/125th Floor Observatory, non-prime time) and private transfers',
      'Desert Safari with camp activities and BBQ dinner on a shared basis',
      'Private departure transfer from hotel to Dubai International Airport',
      'All applicable taxes, including 5% VAT',
      'Complimentary: 2 x 500ml bottles of mineral water per person per day; facial wipes on arrival day',
    ],
    exclusions: [
      'Air tickets to/from or within the United Arab Emirates',
      'Any meals not mentioned in the itinerary',
      'Any tours, transfers, or services not mentioned in the itinerary',
      'Personal expenses (tips, porterage, room service, laundry, calls, etc.)',
      'Increases in entrance fees, taxes, insurance, or other incidental charges',
      'Meet & greet assistance inside the airport',
      'Visa and OK-to-board charges',
      'Tourism Dirham Fee applied by hotels',
      'Anything not mentioned under Package Inclusions',
    ],
  },
]

export function editableInternationalTourPackages(
  cmsPackages: TravelPackage[] = [],
): TourPackage[] {
  return internationalTourPackages.map((pkg) => {
    const edited = cmsPackages.find(
      (candidate) => candidate.category === 'tour' && candidate.id === pkg.slug,
    )
    if (!edited) return pkg
    return {
      ...pkg,
      title: edited.title,
      description: edited.summary,
      duration: edited.duration,
      image: edited.image,
      highlights: edited.highlights.length ? edited.highlights : pkg.highlights,
    }
  })
}

export function getTourBySlug(
  slug: string,
  cmsPackages: TravelPackage[] = [],
): TourPackage | undefined {
  return editableInternationalTourPackages(cmsPackages).find(
    (pkg) => pkg.slug === slug,
  )
}

export function toursByCountry(
  cmsPackages: TravelPackage[] = [],
): { country: TourCountry; packages: TourPackage[] }[] {
  const packages = editableInternationalTourPackages(cmsPackages)
  const order: TourCountry[] = [
    'India',
    'Indonesia',
    'Thailand',
    'Malaysia',
    'Vietnam',
    'Dubai, UAE',
    'Singapore',
  ]
  return order
    .map((country) => ({
      country,
        packages: packages.filter((p) => p.country === country),
    }))
    .filter((group) => group.packages.length > 0)
}

export const PREFERRED_MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
  'Flexible / Not sure',
] as const
