export type ItineraryRow = {
  place: string
  date: string
  hijriDate: string
  description: string
}

/** Platinum Hajj — full programme outline (Dubai, UAE departures). */
export const platinumHajjItinerary: ItineraryRow[] = [
  {
    place: 'Dubai, UAE',
    date: 'Pre-departure',
    hijriDate: '—',
    description:
      'Group briefing, document check, and departure coordination from Dubai office.',
  },
  {
    place: 'Jeddah → Makkah',
    date: 'Day 1',
    hijriDate: '—',
    description:
      'Arrival from Dubai, transfer to premium hotel near Masjid al-Haram.',
  },
  {
    place: 'Makkah',
    date: 'Days 2–6',
    hijriDate: '—',
    description:
      'Umrah rituals, spiritual preparation, and guided support throughout your stay.',
  },
  {
    place: 'Mina',
    date: 'Day of Tarwiyah',
    hijriDate: '8 Dhul Hijjah',
    description: 'Enter Mina; tents and meals arranged. Hajj rites briefing.',
  },
  {
    place: 'Arafat',
    date: 'Day of Arafah',
    hijriDate: '9 Dhul Hijjah',
    description:
      'Standing at Arafat — the pinnacle of Hajj — with group leader support.',
  },
  {
    place: 'Muzdalifah',
    date: 'Night',
    hijriDate: '9 Dhul Hijjah',
    description: 'Overnight stay and pebbles for Rami al-Jamarat.',
  },
  {
    place: 'Mina',
    date: 'Days of Tashreeq',
    hijriDate: '10–13 Dhul Hijjah',
    description: 'Rami, sacrifice, halq/taqsir, and Tawaf al-Ifadah.',
  },
  {
    place: 'Madinah',
    date: 'Final phase',
    hijriDate: '—',
    description:
      'Transfer to Madinah; stay near Masjid Nabawi with Ziyarat programme.',
  },
  {
    place: 'Dubai, UAE',
    date: 'Return',
    hijriDate: '—',
    description: 'Return flight to Dubai with post-Hajj debrief support.',
  },
]

/** Budget Hajj — value programme outline (Indian passport holders). */
export const budgetHajjItinerary: ItineraryRow[] = [
  {
    place: 'Dubai, UAE',
    date: 'Pre-departure',
    hijriDate: '—',
    description: 'Essential briefing and group departure from Dubai, UAE.',
  },
  {
    place: 'Makkah',
    date: 'Days 1–5',
    hijriDate: '—',
    description:
      'Comfortable stay with shared transport; Umrah and Hajj preparation.',
  },
  {
    place: 'Mina / Arafat',
    date: 'Hajj days',
    hijriDate: '8–9 Dhul Hijjah',
    description: 'Core Hajj rites at Mina, Arafat, and Muzdalifah with group leader.',
  },
  {
    place: 'Mina',
    date: 'Tashreeq',
    hijriDate: '10–13 Dhul Hijjah',
    description: 'Rami and completion rites with organised group support.',
  },
  {
    place: 'Madinah',
    date: 'Ziyarat',
    hijriDate: '—',
    description: 'Madinah stay and key Ziyarat with shared ground transport.',
  },
  {
    place: 'Dubai, UAE',
    date: 'Return',
    hijriDate: '—',
    description: 'Return to Dubai, UAE.',
  },
]

/** Business Hajj — placeholder rows; final itinerary to be supplied. */
export const businessHajjItineraryPlaceholder: ItineraryRow[] = [
  {
    place: 'Dubai, UAE',
    date: 'TBC',
    hijriDate: '—',
    description:
      'Business Class departure programme — detailed itinerary coming soon. Contact our Dubai team.',
  },
  {
    place: 'Makkah',
    date: 'TBC',
    hijriDate: '—',
    description: 'Premium hotel allocation and Haram proximity — details to follow.',
  },
  {
    place: 'Hajj rites',
    date: 'TBC',
    hijriDate: 'TBC',
    description: 'Full Hajj itinerary with priority support — content to be supplied.',
  },
  {
    place: 'Madinah',
    date: 'TBC',
    hijriDate: '—',
    description: 'Madinah stay and Ziyarat schedule — details to follow.',
  },
]
