export const company = {
  name: 'Elite Alhussam Travel and Tourism L.L.C',
  shortName: 'ELITE ALHUSSAM',
  legalName: 'Elite Alhussam Travel and Tourism L.L.C',
  indiaName: 'AL HUSSAM Travel & Tours India (P) LTD',
  tagline: 'TRAVEL AND TOURISM L.L.C',
  positioning:
    'Premium pilgrimage brand with Saudi hospitality roots - Chennai and Dubai office support for pilgrims.',
  experience: '45+ years of trusted Hajj & Umrah service',
  background:
    'Saudi-based hospitality lineage connected with Aziz Khogeer Group Hotels. Al Hussam Travel & Tours India (P) Ltd was established in 1998 in Chennai as a franchise of Al Hussam Co. Makkah, with Elite Alhussam Travel and Tourism L.L.C serving from Dubai, UAE.',
  phones: [
    '044-2640 2420',
    '044-2640 2421',
    '044-2640 0422',
    '7299460725',
    '9941372228',
  ],
  whatsapp: '9941372228',
  email: 'alhussamchennai@gmail.com',
  address: 'No.3, Balfours Road, 3rd Floor, Kilpauk, Chennai - 600 010',
  offices: [
    {
      id: 'chennai',
      city: 'Chennai',
      label: 'Chennai Office',
      companyName: 'AL HUSSAM Travel & Tours India (P) LTD',
      lines: [
        'No.3, Balfours Road, 3rd Floor',
        'Kilpauk, Chennai - 600 010',
        'India',
      ],
    },
    {
      id: 'dubai',
      city: 'Dubai',
      label: 'Dubai Office',
      companyName: 'Elite Alhussam Travel and Tourism L.L.C',
      lines: [
        'Office No.: 54, Smart Eyes Business Center,',
        'AG House Building,',
        'P.O.Box: 35127, Dubai, UAE',
      ],
    },
  ],
  social: {
    facebook:
      'https://www.facebook.com/AlhussamToursandtravel/?modal=admin_todo_tour',
    twitter: 'https://twitter.com/AlhussamTravel',
    youtube: 'https://www.youtube.com/@alhussamhajumrahservice6083',
  },
}

export const aboutCopy = {
  intro:
    'A pilgrimage to the holy land is a sacred mission for spiritual enlightenment. Makkah is Allah’s chosen land. Millions of Muslims visit the city of Qibla for peace and tranquillity. Al Hussam is a reliable name with four decades of spotless reputation for Hajj & Umrah services.',
  legacy:
    'Al Hussam is a Saudi-based company predominantly operating in hospitality management, originally known as Aziz Khogeer group Hotels, with 45 years of experience in rendering Hajj & Umrah services. The company has impeccable lineage from Abdul Aziz Khogeer Hotels Establishment.',
  profile:
    'Mr. K.A. Basheer Ahmed from Tamil Nadu worked as Senior Manager since 1975, rendering world-class hospitality to pilgrims from Europe, Africa and South East Asia - serving 5,000 to 7,000 pilgrims every year.',
  india:
    'In 1998, Mr. K.A. Basheer Ahmed (Chairman) established Al Hussam Travel & Tours India (P) Ltd as a franchise of Al Hussam Co. Makkah. It was inaugurated by Mr. Mazen Khogeer (son of Sheikh Abdul Aziz Khogeer) to provide the same class of facilities for pilgrims from India.',
  leadership:
    'Managing Director Mr. B. Sameer Ahmed continues this tradition of organised, experienced and genuine tour operation with top-class accommodation and efficient service for elite and regular guests alike.',
}

export const highlights = [
  { key: 'weekly', title: 'Weekly Departures' },
  { key: 'bestPrice', title: 'Best Price Guarantee' },
  { key: 'guidance', title: 'Complete Religious Guidance' },
  { key: 'luxury', title: 'Luxurious Accommodations' },
  { key: 'chennaiSupport', title: 'Chennai Office Support' },
  { key: 'multilingual', title: 'Multilingual Pilgrim Guidance' },
] as const

export const features = [
  {
    title: 'Trusted & Experienced',
    text: '45+ years of excellence in Hajj & Umrah hospitality.',
  },
  {
    title: '24/7 Support',
    text: 'Dedicated support before, during and after your journey.',
  },
  {
    title: 'Best Services',
    text: 'Quality hotels, transport and religious guidance.',
  },
  {
    title: 'Safe & Secure',
    text: 'Your safety and comfort remain our top priority.',
  },
]

export type PackageCategory = 'hajj' | 'umrah'

export type PackagePricing = {
  adult: number
  child: number
  infant: number
  currency: 'INR'
  note?: string
}

export type PackageAmenity = {
  key: 'hotel' | 'transport' | 'meals' | 'support' | 'visa'
  title: string
  subtitle: string
}

export type TravelMode = 'air' | 'road'

export type TravelPackage = {
  id: string
  category: PackageCategory
  title: string
  tag: string
  season: string
  summary: string
  locations: string
  duration: string
  image: string
  pricing: PackagePricing
  features: string[]
  highlights: string[]
  amenities: PackageAmenity[]
  popular?: boolean
  /** Standout “Most Popular” treatment on cards */
  featured?: boolean
  /** Modes offered for this package; defaults to both air + road */
  availableTravelModes?: TravelMode[]
}

export const AIRPORTS = [
  { value: 'DXB', label: 'Dubai (DXB)' },
  { value: 'AUH', label: 'Abu Dhabi (AUH)' },
  { value: 'SHJ', label: 'Sharjah (SHJ)' },
  { value: 'MAA', label: 'Chennai (MAA)' },
] as const

export const AIRLINES = [
  'Emirates',
  'Saudia',
  'Qatar Airways',
  'Etihad',
  'IndiGo',
  'Air India',
  'Other / No preference',
] as const

export const UAE_CITIES = [
  'Dubai',
  'Abu Dhabi',
  'Sharjah',
  'Ajman',
  'Ras Al Khaimah',
  'Fujairah',
  'Umm Al Quwain',
] as const

export function packageTravelModes(pkg: TravelPackage): TravelMode[] {
  return pkg.availableTravelModes?.length
    ? pkg.availableTravelModes
    : ['air', 'road']
}

const defaultAmenities: PackageAmenity[] = [
  { key: 'hotel', title: 'Hotel Stay', subtitle: 'Quality lodging' },
  { key: 'transport', title: 'Transport', subtitle: 'All transfers' },
  { key: 'meals', title: 'Daily Meals', subtitle: 'As per package' },
  { key: 'support', title: '24/7 Support', subtitle: 'Always available' },
  { key: 'visa', title: 'Visa Help', subtitle: 'Documentation' },
]

export const hajjPackages: TravelPackage[] = [
  {
    id: 'platinum-short-2025',
    category: 'hajj',
    title: 'Platinum Short Package',
    tag: 'Platinum',
    season: '2025 – 26',
    summary:
      'Premium short-duration Hajj with guided spiritual care and close Haramain stays.',
    locations: 'Makkah • Madinah • Arafat',
    duration: '18–22 Days',
    image: '/images/hajj-arafat.webp',
    availableTravelModes: ['air'],
    pricing: {
      adult: 485000,
      child: 365000,
      infant: 85000,
      currency: 'INR',
      note: 'Starting from · per person',
    },
    features: ['Visa assistance', 'Hotels near Haram', 'Religious guidance'],
    highlights: ['Close Haram stays', 'Guided spiritual care', 'Short-duration Hajj'],
    amenities: [
      { key: 'hotel', title: 'Hotel', subtitle: 'Near Haram' },
      { key: 'transport', title: 'Transport', subtitle: 'All transfers' },
      { key: 'meals', title: 'Meals', subtitle: 'Package meals' },
      { key: 'support', title: 'Support', subtitle: 'Group leader' },
      { key: 'visa', title: 'Visa', subtitle: 'Full help' },
    ],
  },
  {
    id: 'platinum-2025',
    category: 'hajj',
    title: 'Platinum Hajj Package',
    tag: 'Platinum',
    season: '2025 – 26',
    summary:
      'Full platinum Hajj experience with hospitality rooted in decades of Holy Land service.',
    locations: 'Makkah • Madinah • Arafat',
    duration: '30–35 Days',
    image: '/images/kiswah-detail.webp',
    popular: true,
    featured: true,
    availableTravelModes: ['air', 'road'],
    pricing: {
      adult: 545000,
      child: 415000,
      infant: 95000,
      currency: 'INR',
      note: 'Starting from · per person',
    },
    features: ['Premium hotels', 'Transport care', 'Group leader support'],
    highlights: ['Premium hotels', 'Full spiritual care', 'Trusted 45+ years'],
    amenities: [
      { key: 'hotel', title: 'Hotel', subtitle: 'Luxury stay' },
      { key: 'transport', title: 'Transport', subtitle: 'Comfort coaches' },
      { key: 'meals', title: 'Meals', subtitle: 'Quality dining' },
      { key: 'support', title: 'Support', subtitle: 'Dedicated team' },
      { key: 'visa', title: 'Visa', subtitle: 'Full help' },
    ],
  },
  {
    id: 'classic-hajj-2025',
    category: 'hajj',
    title: 'Classic Hajj Package',
    tag: 'Classic',
    season: '2025 – 26',
    summary:
      'Balanced comfort and value for first-time and returning pilgrims from Chennai.',
    locations: 'Makkah • Madinah • Arafat',
    duration: '28–32 Days',
    image: '/images/makkah-clock-tower.webp',
    popular: true,
    availableTravelModes: ['air', 'road'],
    pricing: {
      adult: 385000,
      child: 295000,
      infant: 72000,
      currency: 'INR',
      note: 'Starting from · per person',
    },
    features: ['Shared transport', 'Ziyarat included', 'Chennai briefing'],
    highlights: ['Best value Hajj', 'Ziyarat included', 'Chennai briefing'],
    amenities: defaultAmenities,
  },
  {
    id: 'individual-hajj',
    category: 'hajj',
    title: 'Individual Hajj Planning',
    tag: 'Custom',
    season: 'Flexible',
    summary:
      'Personalised Hajj planning with enquiry-based dates, rooms, and family support.',
    locations: 'Makkah • Madinah',
    duration: 'Flexible',
    image: '/images/theme-pilgrim.webp',
    availableTravelModes: ['air', 'road'],
    pricing: {
      adult: 425000,
      child: 325000,
      infant: 78000,
      currency: 'INR',
      note: 'Custom quote · per person',
    },
    features: ['Private options', 'Family rooms', 'Flexible dates'],
    highlights: ['Private options', 'Family rooms', 'Flexible dates'],
    amenities: defaultAmenities,
  },
]

export const umrahPackages: TravelPackage[] = [
  {
    id: 'umrah-economy',
    category: 'umrah',
    title: 'Economy Umrah Package',
    tag: 'Economy',
    season: '2026 – 27',
    summary:
      'A comfortable & affordable Umrah experience with quality service and care.',
    locations: 'Makkah • Madinah',
    duration: '10–12 Days',
    image: '/images/safa-marwa.webp',
    popular: true,
    availableTravelModes: ['air', 'road'],
    pricing: {
      adult: 89999,
      child: 72999,
      infant: 24999,
      currency: 'INR',
      note: 'Starting from · per person',
    },
    features: ['Group departure', 'Shared transport', 'Visa help'],
    highlights: ['Best for budget travelers', 'Comfortable stay', 'Hassle-free journey'],
    amenities: [
      { key: 'hotel', title: 'Hotel', subtitle: 'Economy stay' },
      { key: 'transport', title: 'Transport', subtitle: 'All ground' },
      { key: 'meals', title: 'Meals', subtitle: 'Daily included' },
      { key: 'support', title: 'Support', subtitle: '24/7 care' },
      { key: 'visa', title: 'Visa', subtitle: 'Docs help' },
    ],
  },
  {
    id: 'umrah-classic',
    category: 'umrah',
    title: 'Classic Umrah Package',
    tag: 'Classic',
    season: '2026 – 27',
    summary:
      'Comfortable Makkah & Madinah stays with a balanced itinerary for families.',
    locations: 'Makkah • Madinah',
    duration: '12–14 Days',
    image: '/images/mount-uhud.webp',
    availableTravelModes: ['air', 'road'],
    pricing: {
      adult: 125000,
      child: 99000,
      infant: 32000,
      currency: 'INR',
      note: 'Starting from · per person',
    },
    features: ['Better hotels', 'Ziyarat tours', 'Multilingual guide'],
    highlights: ['Family-friendly', 'Ziyarat tours', 'Better hotels'],
    amenities: [
      { key: 'hotel', title: 'Hotel', subtitle: 'Comfort stay' },
      { key: 'transport', title: 'Transport', subtitle: 'All ground' },
      { key: 'meals', title: 'Meals', subtitle: 'Daily included' },
      { key: 'support', title: 'Support', subtitle: 'Guide care' },
      { key: 'visa', title: 'Visa', subtitle: 'Docs help' },
    ],
  },
  {
    id: 'umrah-premium',
    category: 'umrah',
    title: 'Premium Umrah Package',
    tag: 'Premium',
    season: '2026 – 27',
    summary:
      'Closer hotels, smoother transfers, and attentive care for a peaceful Umrah.',
    locations: 'Makkah • Madinah',
    duration: '14–16 Days',
    image: '/images/luxury-stay.webp',
    availableTravelModes: ['air'],
    pricing: {
      adult: 185000,
      child: 145000,
      infant: 42000,
      currency: 'INR',
      note: 'Starting from · per person',
    },
    features: ['Near Haram hotels', 'Private transfers option', 'Priority support'],
    highlights: ['Near Haram hotels', 'Smoother transfers', 'Priority support'],
    amenities: [
      { key: 'hotel', title: 'Hotel', subtitle: 'Near Haram' },
      { key: 'transport', title: 'Transport', subtitle: 'Private option' },
      { key: 'meals', title: 'Meals', subtitle: 'Quality dining' },
      { key: 'support', title: 'Support', subtitle: 'Priority care' },
      { key: 'visa', title: 'Visa', subtitle: 'Docs help' },
    ],
  },
  {
    id: 'umrah-individual',
    category: 'umrah',
    title: 'Individual Umrah Package',
    tag: 'Custom',
    season: 'Flexible',
    summary:
      'Travel on your preferred dates with rooms sized for adults, children, and infants.',
    locations: 'Makkah • Madinah',
    duration: 'Flexible',
    image: '/images/theme-offer-1.webp',
    pricing: {
      adult: 145000,
      child: 112000,
      infant: 35000,
      currency: 'INR',
      note: 'Custom quote · per person',
    },
    features: ['Choose your dates', 'Room preference', 'Family-friendly'],
    highlights: ['Choose your dates', 'Room preference', 'Family-friendly'],
    amenities: defaultAmenities,
  },
]

export const allPackages: TravelPackage[] = [...hajjPackages, ...umrahPackages]

export function formatInr(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

export const testimonials = [
  {
    name: 'Col Syed Yasin, SM (Retd).',
    quote:
      'We were totally impressed with the conduct of the whole tour. Your company showed an excellent sense of professionalism.',
  },
  {
    name: 'Dr. Zaheeruddin & Tasneem',
    quote: 'Alhamdulillah... My best period of life has been my Hajj trip...',
  },
  {
    name: 'M. Farook',
    quote: 'Assalamu Alaikum... Grateful for the care throughout the pilgrimage.',
  },
]

export const images = {
  logoLocal: '/images/alhussam-logo.png',
  hero: '/images/hero-makkah.webp',
  family: '/images/family-pilgrims.webp',
  familyMakkah: '/images/family-makkah.webp',
  familyTravel: '/images/family-travel.webp',
  pilgrims: '/images/pilgrims-bright.webp',
  kiswah: '/images/kiswah-detail.webp',
  madinah: '/images/madinah-nabawi.webp',
  heroMadinah: '/images/hero-madinah.webp?v=6',
  madinahDome: '/images/madinah-green-dome.webp',
  hajj: '/images/hajj-arafat.webp',
  umrah: '/images/umrah-tawaf.webp',
  safa: '/images/safa-marwa.webp',
  uhud: '/images/mount-uhud.webp',
  stay: '/images/luxury-stay.webp',
  hotel: '/images/hotel-lobby.webp',
  learn: '/images/theme-learn.webp',
  makkahClock: '/images/makkah-clock-tower.webp',
  makkahArch: '/images/makkah-arch-view.webp',
  airport: '/images/airport-travel.webp',
  dubai: '/images/dubai-skyline.webp',
  chennai: '/images/chennai-city.webp',
  themeHero: '/images/theme-hero.webp',
  offer1: '/images/theme-offer-1.webp',
  offer2: '/images/theme-offer-2.webp',
  offer3: '/images/theme-offer-3.webp',
  offer4: '/images/theme-offer-4.webp',
  arch1: '/images/theme-arch-1.webp',
  arch2: '/images/theme-arch-2.webp',
  arch3: '/images/theme-arch-3.webp',
  arch4: '/images/theme-arch-4.webp',
  galleryPackages: '/images/gallery-packages.webp',
  galleryUmrah: '/images/gallery-umrah.webp',
  galleryStays: '/images/gallery-stays.webp',
  galleryFamily: '/images/gallery-family.webp',
  pilgrim: '/images/theme-pilgrim.webp',
  blogPacking: '/images/blog-cover-packing.webp',
  blogUmrahHajj: '/images/blog-cover-umrah-hajj.webp',
  blogChennai: '/images/blog-cover-chennai.webp',
} as const

/** Home hero slideshow - unique images only (no repeats) */
export const heroSlides: {
  id: string
  image: string
  label: string
  position?: string
}[] = [
  {
    id: 'family-makkah',
    image: images.familyMakkah,
    label: 'Family in Makkah',
  },
  {
    id: 'makkah',
    image: images.hero,
    label: 'Makkah',
  },
  {
    id: 'madinah',
    image: images.heroMadinah,
    label: 'Madinah',
    position: 'center 42%',
  },
  {
    id: 'umrah',
    image: images.umrah,
    label: 'Umrah',
  },
  {
    id: 'pilgrims',
    image: images.pilgrims,
    label: 'Pilgrims',
  },
]
