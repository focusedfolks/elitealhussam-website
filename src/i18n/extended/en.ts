import type { Dictionary } from '../types'

export const homeExtended: Pick<
  Dictionary['home'],
  | 'packagesIntro'
  | 'familyPill'
  | 'familyTitle'
  | 'familyText'
  | 'processEyebrow'
  | 'processTitle'
  | 'processSub'
> = {
  packagesIntro:
    'Umrah packages from Dubai, UAE — view itineraries and enquire with our team.',
  familyPill: 'Family pilgrimage',
  familyTitle: 'Travel together. Pray together. Return blessed.',
  familyText:
    'ELITE ALHUSSAM plans Hajj and Umrah for the whole family - adults, children, and infants - with comfortable stays and guidance you can trust from our Dubai, UAE office. Haj services are for Indian passport holders only.',
  processEyebrow: 'Simple process',
  processTitle: 'From enquiry to departure in 3 steps',
  processSub:
    'A clear business process designed to convert interest into confirmed bookings.',
}

export const hero: Dictionary['hero'] = {
  licensedOperator: 'Licensed Operator',
  yearsExperience: '45+ Years',
  dubaiUae: 'Dubai, UAE',
  faithQuote: '"Labbaik Allahumma Labbaik" - we walk with you in faith.',
  passportNote: 'Haj Services – Indian Passport Holders Only',
  slides: [
    {
      headline: 'Umrah, Made Simple — Any Time of Year',
      subtext:
        'Flexible Umrah packages from Dubai, UAE for individuals, couples, and groups — hotel, transport, and visa handled end-to-end.',
      primaryCta: 'Explore Umrah Deals',
      secondaryCta: 'Talk to Our Team',
      complianceTag: null,
    },
    {
      headline: 'Professional Hajj & Umrah packages from Dubai, UAE',
      subtext:
        'ELITE ALHUSSAM delivers organised pilgrimage packages from Dubai, UAE - trusted for 45+ years, built for families and group bookings. Haj services for Indian passport holders only.',
      primaryCta: 'Start Your Hajj Journey',
      secondaryCta: 'View Hajj Packages',
      complianceTag: 'Haj Services – Indian Passport Holders Only',
    },
    {
      headline: 'Family & Group Bookings, Handled With Care',
      subtext:
        'From coordinated hotel rooms to shared transport, we make group Hajj and Umrah travel simple for families traveling together.',
      primaryCta: 'See Family Packages',
      secondaryCta: 'Talk to Our Team',
      complianceTag: null,
    },
    {
      headline: '45+ Years of Trusted Hospitality, From Dubai',
      subtext:
        'Real people in Dubai, ready to plan your pilgrimage in person or on WhatsApp — backed by decades of hospitality experience.',
      primaryCta: 'Meet Our Dubai Team',
      secondaryCta: 'Speak to Our Team',
      complianceTag: null,
    },
    {
      headline: 'Chosen by 200+ Pilgrims and Counting',
      subtext:
        'See why families across Dubai and the UAE trust Elite Alhussam for their Hajj and Umrah journey.',
      primaryCta: 'Check Available Dates',
      secondaryCta: 'View Hajj Packages',
      complianceTag: null,
    },
  ],
}

export const packageCatalog: Dictionary['packageCatalog'] = {
  'umrah-economy': {
    title: 'Economic Umrah Package',
    summary:
      'A comfortable & affordable Umrah from Dubai, UAE — quality hotels, transport, and visa support handled end-to-end.',
  },
  'umrah-premium': {
    title: 'Premium Umrah Package',
    summary:
      'Closer hotels, smoother transfers, and attentive care for a peaceful Umrah from Dubai, UAE.',
  },
  'umrah-group': {
    title: 'Group Umrah Package',
    summary:
      'Coordinated group Umrah departures from Dubai, UAE — shared hotels, transport, and dedicated group leader support.',
  },
  'umrah-customise': {
    title: 'Customise Your Umrah',
    summary:
      'Tell us your preferred dates, group size, and hotel class — our Dubai team will tailor your Umrah itinerary.',
  },
  'platinum-2025': {
    title: 'Platinum Hajj Package',
    summary:
      'Full platinum Hajj from Dubai, UAE — premium Haramain stays, guided spiritual care, and decades of trusted hospitality.',
  },
  'classic-hajj-2025': {
    title: 'Business Hajj Package',
    summary:
      'Business Class Hajj from Dubai, UAE — elevated stays, priority transfers, and dedicated support for Indian passport holders.',
  },
  'hajj-budget': {
    title: 'Budget Hajj Package',
    summary:
      'Value-focused Hajj from Dubai, UAE for Indian passport holders — organised rites, comfortable stays, and group support.',
  },
}

export const packagesUi: Dictionary['packagesUi'] = {
  socialProof: '★★★★★ 4.9 · Chosen by 200+ pilgrims',
  dubaiDepartures: 'Dubai · UAE departures',
  selectPassengers: 'Select Passengers',
  travelingQuestion: 'How many are traveling?',
  adultLabel: 'Adult',
  childLabel: 'Child',
  infantLabel: 'Infant',
  adultHint: '12+ Years',
  childHint: '2–12 Years',
  infantHint: 'Below 2 Years',
  travellerSummary: 'Traveller summary',
  trustedPartner: 'Trusted Travel Partner',
  trustedPartnerSub: 'Safe journey · Spiritual experience',
  secureEnquiry: 'Secure enquiry · Your details stay private',
  callPrefix: 'Call',
  mostPopular: 'Most Popular',
  recommended: 'Recommended',
  showingPackages: 'Showing {shown} of {total} packages',
  gridTrust: 'Chosen by 500+ families who booked with confidence · Dubai, UAE',
}
