export const company = {
  name: 'Elite Alhussam Travel and Tourism L.L.C',
  shortName: 'ELITE ALHUSSAM',
  legalName: 'Elite Alhussam Travel and Tourism L.L.C',
  indiaName: 'Elite Alhussam Travel and Tourism L.L.C',
  tagline: 'TRAVEL AND TOURISM L.L.C',
  positioning:
    'Premium pilgrimage brand with Saudi hospitality roots - serving pilgrims from our Dubai, UAE office.',
  experience: '45+ years of trusted Hajj & Umrah service',
  background:
    'Saudi-based hospitality lineage connected with Aziz Khogeer Group Hotels. Elite Alhussam Travel and Tourism L.L.C operates from Dubai, UAE, arranging Hajj and Umrah with dedicated local support.',
  phones: ['+971 56 574 6678'],
  whatsapp: '971565746678',
  email: 'alhussamuae@gmail.com',
  address:
    'Office Cabin No. 54, Mezzanine Floor, Smart Eye Business Centre, AG House Building, P.O. Box 35127, Dubai, UAE',
  offices: [
    {
      id: 'dubai',
      city: 'Dubai',
      label: 'Dubai Office',
      companyName: 'Elite Alhussam Travel and Tourism L.L.C',
      lines: [
        'Mezzanine Floor',
        'Smart Eye Business Centre',
        'Office Cabin No. 54',
        'AG House Building',
        'P.O. Box 35127',
        'Dubai, UAE',
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
    'Our leadership brings decades of Holy Land hospitality experience - serving pilgrims with organised care, quality stays, and sincere guidance throughout the sacred journey.',
  india:
    'Elite Alhussam Travel and Tourism L.L.C operates from Dubai, UAE. Hajj services are strictly for Indian passport holders only, with Umrah packages arranged for eligible travellers through our Dubai office.',
  leadership:
    'Managing Director B Sameer Ahmed Basheer Ahmed continues this tradition of organised, experienced and genuine tour operation with top-class accommodation and efficient service for elite and regular guests alike.',
}

export const highlights = [
  { key: 'weekly', title: 'Weekly Departures' },
  { key: 'bestPrice', title: 'Trusted Package Guidance' },
  { key: 'guidance', title: 'Complete Religious Guidance' },
  { key: 'luxury', title: 'Luxurious Accommodations' },
  { key: 'chennaiSupport', title: 'Dubai Office Support' },
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

export type PackageCategory = 'hajj' | 'umrah' | 'tour'

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

export type { ItineraryRow } from './hajjItineraries'

export type TravelMode = 'air' | 'road'

export type TourDetailContent = {
  tagline: string
  about: string
  highlights: string[]
  itinerary: { day: string; title: string; text: string }[]
  inclusions: string[]
  exclusions: string[]
}

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
  /** Hajj packages: day-by-day itinerary table */
  itinerary?: import('./hajjItineraries').ItineraryRow[]
  /** Placeholder card — copy to be supplied */
  placeholder?: boolean
  popular?: boolean
  /** Standout “Most Popular” treatment on cards */
  featured?: boolean
  /** Modes offered for this package; defaults to both air + road */
  availableTravelModes?: TravelMode[]
  pendingContent?: boolean
  tourDetails?: TourDetailContent
}

export const AIRPORTS = [
  { value: 'DXB', label: 'Dubai (DXB)' },
  { value: 'AUH', label: 'Abu Dhabi (AUH)' },
  { value: 'SHJ', label: 'Sharjah (SHJ)' },
  { value: 'JED', label: 'Jeddah (JED)' },
  { value: 'MED', label: 'Madinah (MED)' },
] as const

/** PLACEHOLDER — airport list pending confirmation from client. */
export const AIRPORTS_PLACEHOLDER_NOTE =
  'Airport options are placeholders — client list pending.'

/** Makkah hotel names from Hajj package itineraries */
export const MAKKAH_HOTEL_OPTIONS = [
  'Swissotel Al Maqam',
  'Makkah Tower / Pullman / Rotana',
  'Other / No preference',
] as const

/** Madinah hotel names from Hajj package itineraries */
export const MADINA_HOTEL_OPTIONS = [
  'Dallah Taiba',
  'Dar Al Iman',
  'Province Sham',
  'Sanabel',
  'Other / No preference',
] as const

/** Extra Umrah package labels for the enquiry form (alongside CMS package titles). */
export const FORM_UMRAH_PACKAGE_OPTIONS = [
  'Customise Umrah Package',
  'Umrah Package (Economic & Premium)',
  'Umrah Group Package',
] as const

export const AIRLINES = [
  'Emirates',
  'Saudia',
  'Qatar Airways',
  'Etihad',
  'flydubai',
  'Air Arabia',
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
  { key: 'hotel', title: 'Hotel', subtitle: 'Quality lodging' },
  { key: 'transport', title: 'Transport', subtitle: 'All transfers' },
  { key: 'meals', title: 'Meals', subtitle: 'As per package' },
  { key: 'support', title: 'Support', subtitle: 'Always available' },
  { key: 'visa', title: 'Visa', subtitle: 'Documentation' },
]

export const PACKAGE_CONTENT_PENDING =
  '// TODO: Awaiting final Economic/Group package content from client — do not publish without replacing this placeholder\n[Package description and feature list pending]'

export const umrahPackages: TravelPackage[] = [
  {
    id: 'umrah-economy',
    category: 'umrah',
    title: 'Economic Umrah Package',
    tag: 'Economic',
    season: '',
    summary: PACKAGE_CONTENT_PENDING,
    locations: 'Makkah • Madinah',
    duration: '10–12 Days',
    image: '/images/hero-makkah.webp',
    popular: true,
    availableTravelModes: ['air', 'road'],
    pricing: {
      adult: 89999,
      child: 72999,
      infant: 24999,
      currency: 'INR',
      note: 'Details on enquiry',
    },
    features: [PACKAGE_CONTENT_PENDING],
    highlights: [PACKAGE_CONTENT_PENDING],
    amenities: [
      ...defaultAmenities,
    ],
    pendingContent: true,
  },
  {
    id: 'umrah-group',
    category: 'umrah',
    title: 'Group Umrah Package',
    tag: 'Group',
    season: '',
    summary: PACKAGE_CONTENT_PENDING,
    locations: 'Makkah • Madinah',
    duration: 'TBC',
    image: '/images/kiswah-detail.webp',
    placeholder: true,
    availableTravelModes: ['air', 'road'],
    pricing: {
      adult: 0,
      child: 0,
      infant: 0,
      currency: 'INR',
      note: 'Details on enquiry',
    },
    features: [PACKAGE_CONTENT_PENDING],
    highlights: [PACKAGE_CONTENT_PENDING],
    amenities: defaultAmenities,
    pendingContent: true,
  },
  {
    id: 'umrah-customise',
    category: 'umrah',
    title: 'Customize Your Umrah',
    tag: 'Customize',
    season: '',
    summary: PACKAGE_CONTENT_PENDING,
    locations: 'Makkah • Madinah',
    duration: 'Flexible',
    image: '/images/kiswah-detail.webp',
    placeholder: true,
    pricing: {
      adult: 145000,
      child: 112000,
      infant: 35000,
      currency: 'INR',
      note: 'Details on enquiry',
    },
    features: [PACKAGE_CONTENT_PENDING],
    highlights: [PACKAGE_CONTENT_PENDING],
    amenities: defaultAmenities,
    pendingContent: true,
  },
]

export const hajjPackages: TravelPackage[] = [
  {
    id: 'hajj-economic',
    category: 'hajj',
    title: 'Economic Hajj Package',
    tag: 'Economic',
    season: 'Hajj 1448H / 2027',
    summary: PACKAGE_CONTENT_PENDING,
    locations: 'Makkah • Madinah • Arafat',
    duration: '20 Days',
    image: '/images/hero-makkah.webp',
    availableTravelModes: ['air', 'road'],
    pricing: {
      adult: 545000,
      child: 415000,
      infant: 95000,
      currency: 'INR',
      note: 'Details on enquiry',
    },
    features: [PACKAGE_CONTENT_PENDING],
    highlights: [PACKAGE_CONTENT_PENDING],
    amenities: defaultAmenities,
    pendingContent: true,
  },
  {
    id: 'hajj-group',
    category: 'hajj',
    title: 'Group Hajj Package',
    tag: 'Group',
    season: 'Hajj 1448H / 2027',
    summary: PACKAGE_CONTENT_PENDING,
    locations: 'Makkah • Madinah • Arafat',
    duration: '28–32 Days',
    image: '/images/madinah-green-dome.webp',
    popular: true,
    placeholder: true,
    availableTravelModes: ['air', 'road'],
    pricing: {
      adult: 385000,
      child: 295000,
      infant: 72000,
      currency: 'INR',
      note: 'Details on enquiry',
    },
    features: [PACKAGE_CONTENT_PENDING],
    highlights: [PACKAGE_CONTENT_PENDING],
    amenities: defaultAmenities,
    pendingContent: true,
  },
  {
    id: 'hajj-customise',
    category: 'hajj',
    title: 'Customize Your Hajj',
    tag: 'Customize',
    season: 'Hajj 1448H / 2027',
    summary: PACKAGE_CONTENT_PENDING,
    locations: 'Makkah • Madinah • Arafat',
    duration: '30 Days',
    image: '/images/hero-makkah.webp',
    availableTravelModes: ['air', 'road'],
    pricing: {
      adult: 385000,
      child: 295000,
      infant: 72000,
      currency: 'INR',
      note: 'Details on enquiry',
    },
    features: [PACKAGE_CONTENT_PENDING],
    highlights: [PACKAGE_CONTENT_PENDING],
    amenities: defaultAmenities,
    pendingContent: true,
  },
]

export const allPackages: TravelPackage[] = [...umrahPackages, ...hajjPackages]

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
  /** Pilgrims landing (Hajj & Umrah packages) */
  pilgrimsHero: '/images/hero-makkah.webp',
  /** Tourist landing (International Tours) */
  touristHero: '/images/dubai-skyline.webp',
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
export type HeroSlideCta = {
  label: string
  link: string
}

export type HeroSlide = {
  id: string
  image: string
  label: string
  position?: string
  primaryCta: HeroSlideCta
  secondaryCta: HeroSlideCta
}

export const heroSlides: HeroSlide[] = [
  {
    id: 'family-makkah',
    image: images.familyMakkah,
    label: 'Family in Makkah',
    primaryCta: {
      label: 'Start Your Hajj Journey',
      link: '/contact#lead-form',
    },
    secondaryCta: {
      label: 'View Hajj Packages',
      link: '/packages',
    },
  },
  {
    id: 'makkah',
    image: images.hero,
    label: 'Makkah',
    primaryCta: {
      label: 'Umrah, Made Simple',
      link: '/packages',
    },
    secondaryCta: {
      label: 'Explore Umrah Deals',
      link: '/packages',
    },
  },
  {
    id: 'madinah',
    image: images.heroMadinah,
    label: 'Madinah',
    position: 'center 42%',
    primaryCta: {
      label: '45+ Years From Dubai',
      link: '/about',
    },
    secondaryCta: {
      label: 'Speak to Our Team',
      link: '/contact',
    },
  },
  {
    id: 'umrah',
    image: images.umrah,
    label: 'Umrah',
    primaryCta: {
      label: 'Family & Group Bookings',
      link: '/contact#lead-form',
    },
    secondaryCta: {
      label: 'See Family Packages',
      link: '/packages',
    },
  },
  {
    id: 'pilgrims',
    image: images.pilgrims,
    label: 'Pilgrims',
    primaryCta: {
      label: 'Trusted by 200+ Pilgrims',
      link: '/about',
    },
    secondaryCta: {
      label: 'Check Available Dates',
      link: '/contact#lead-form',
    },
  },
]
