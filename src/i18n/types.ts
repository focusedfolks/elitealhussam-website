export type Lang = 'en' | 'hi' | 'gu' | 'ur'

export type NavChild = { to: string; label: string }
export type NavItem = { to: string; label: string; children?: NavChild[] }

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
  }
  common: {
    enquire: string
    viewDetails: string
    contactForPricing: string
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
