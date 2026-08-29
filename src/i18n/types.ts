export type Lang = 'en' | 'hi' | 'gu' | 'ur' | 'ta'

export type NavChild = { to: string; label: string }
export type NavItem = { to: string; label: string; children?: NavChild[] }

export type HeroSlideCopy = {
  headline: string
  subtext: string
  primaryCta: string
  secondaryCta: string
  complianceTag: string | null
}

export type PackageCatalogCopy = {
  title: string
  summary: string
}

export type Dictionary = {
  dir: 'ltr' | 'rtl'
  metaTitle: string
  brand: string
  brandFull: string
  tagline: string
  talkToUs: string
  whatsapp: string
  nav: NavItem[]
  home: {
    kicker: string
    headline: string
    headlineScript: string
    support: string
    explore: string
    watch: string
    whyTitle: string
    whyText: string
    packagesTitle: string
    packagesEyebrow: string
    whoTitle: string
    viewMore: string
    exploreTitle: string
    testimonials: string
    needHelp: string
    needHelpText: string
    packagesIntro: string
    familyPill: string
    familyTitle: string
    familyText: string
    processEyebrow: string
    processTitle: string
    processSub: string
  }
  hero: {
    licensedOperator: string
    yearsExperience: string
    dubaiUae: string
    faithQuote: string
    passportNote: string
    slides: HeroSlideCopy[]
  }
  packageCatalog: Record<string, PackageCatalogCopy>
  packagesUi: {
    socialProof: string
    dubaiDepartures: string
    selectPassengers: string
    travelingQuestion: string
    adultLabel: string
    childLabel: string
    infantLabel: string
    adultHint: string
    childHint: string
    infantHint: string
    travellerSummary: string
    trustedPartner: string
    trustedPartnerSub: string
    secureEnquiry: string
    callPrefix: string
    mostPopular: string
    recommended: string
    showingPackages: string
    gridTrust: string
  }
  common: {
    enquire: string
    viewDetails: string
    contactForPricing: string
    viewItineraryEnquire: string
    packageDetails: string
    itineraryTitle: string
    itineraryPlace: string
    itineraryDate: string
    itineraryHijri: string
    itineraryDescription: string
    placeholderPackageNote: string
    sourceNote: string
    readMore: string
    back: string
    send: string
    name: string
    email: string
    phone: string
    message: string
    adults: string
    children: string
    infant: string
    rooms: string
    dates: string
    comments: string
    traveller: string
    hotelPref: string
    transport: string
    submitBooking: string
    since: string
    years: string
    weekly: string
    bestPrice: string
    guidance: string
    luxury: string
    chennaiSupport: string
    multilingual: string
    allPackages: string
    startingFrom: string
    perPerson: string
    getQuote: string
    requestQuote: string
    leadTitle: string
    leadSubtitle: string
    packageInterest: string
    travellers: string
    leadSuccess: string
  }
  pages: {
    aboutTitle: string
    aboutSub: string
    packagesTitle: string
    packagesSub: string
    hajjTitle: string
    hajjSub: string
    umrahTitle: string
    umrahSub: string
    contactTitle: string
    contactSub: string
    blogTitle: string
    blogSub: string
  }
  footer: {
    about: string
    quick: string
    packages: string
    contact: string
    rights: string
  }
}
