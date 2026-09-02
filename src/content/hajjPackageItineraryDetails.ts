/**
 * Season-specific Hajj package itinerary data (1448H / 2027).
 * Update this file each Hajj season — components read from here, not hardcoded JSX.
 */

export type AmenityIconKind =
  | 'stay'
  | 'gift'
  | 'ihram'
  | 'bed'
  | 'warning'
  | 'excluded'
  | 'default'

export type PackageAmenityItem = {
  text: string
  icon?: AmenityIconKind
}

export type PackageHotelBlock = {
  name: string
  distance: string
}

export type DetailedItineraryRow = {
  place: string
  date: string
  hijriDate: string
  description: string
}

export type HajjPackageItineraryDetail = {
  packageId: string
  packageName: string
  durationBadge: string
  seasonHeading: string
  itineraryTableTitle?: string
  makkahHotel: PackageHotelBlock
  medinahHotel: PackageHotelBlock
  amenitiesColumnA: PackageAmenityItem[]
  amenitiesColumnB: PackageAmenityItem[]
  itinerary: DetailedItineraryRow[]
  notes: string[]
}

export const HAJJ_ITINERARY_SEASON = '1448H / 2027'

export const platinumShortItineraryDetail: HajjPackageItineraryDetail = {
  packageId: 'platinum-2025',
  packageName: 'Platinum Short Package',
  durationBadge: '20 DAYS',
  seasonHeading: `HAJJ ${HAJJ_ITINERARY_SEASON} PACKAGE ITINERARY`,
  makkahHotel: {
    name: 'Swissotel Al Maqam / Similar',
    distance: '0–100 Mtrs from Haram',
  },
  medinahHotel: {
    name: 'Dallah Taiba / Dar Al Iman / Similar',
    distance: '0–200 Mtrs from Haram',
  },
  amenitiesColumnA: [
    {
      icon: 'stay',
      text: 'Stay in Makkah outer building (Azizia / Showkia / Haiyal Hizra / Similar) before and after Hajj Arkans.',
    },
    {
      icon: 'stay',
      text: 'Stay in Makkah for 6 nights at Four Star Hotel (Swissotel Al Maqam / Similar) — Distance 0–100 Mtrs',
    },
    {
      icon: 'stay',
      text: 'Stay in Medinah for 3 nights at Four Star Hotel (Dallah Taiba / Similar) — Distance 0–200 Mtrs from Haram',
    },
    {
      icon: 'default',
      text: 'Hajj Arkan days (Additional COST as per availability and preferred)',
    },
    {
      icon: 'default',
      text: 'Special A/C Bus arrangement for local transport (Moulim provided buses at Hajj Days).',
    },
    {
      icon: 'default',
      text: 'Travel with experienced Guide & bayaan (discourse).',
    },
    { icon: 'default', text: 'Tea / Coffee / Fruit' },
  ],
  amenitiesColumnB: [
    {
      icon: 'gift',
      text: 'Complements: Travelling trolley 20" & 24" inch, Sling bag, Slipper bag, Medical Pouch, Hip Pouch (Gents), Makana (Ladies), Cap',
    },
    {
      icon: 'ihram',
      text: 'Ihram, Umbrella, Mina back bag, Hajj guide book, Tawaf mani and Prayer mat.',
    },
    {
      icon: 'default',
      text: 'Virtual Session on Haj / Umrah Procedure at Chennai.',
    },
    {
      icon: 'ihram',
      text: '5 Liters of Zam Zam water at return departure (Subject to KSA government rules and regulations).',
    },
    {
      icon: 'bed',
      text: 'Room Type: Double / Triple / Quad as per guest booked.',
    },
    {
      icon: 'bed',
      text: 'Stay in 4–5 sharing bed room at Makkah outer building (Azizia / Similar). Note: Separate room for Gents & Ladies.',
    },
    {
      icon: 'warning',
      text: 'There is no transport arrangements to haram while staying in Makkah Outer (Azizia/Similar)',
    },
    { icon: 'excluded', text: 'Qurbani not included in package cost' },
  ],
  itinerary: [
    {
      place: 'Makkah Outer',
      date: '10-05-27 (Mon) to 13-05-27 (Thu)',
      hijriDate: '04 to 07 Dhul-Hijjah',
      description:
        'Stay in Makkah (Azizia / Haiyal Hijra / Shoukia) building and proceed to Mina Moallim Camp after Isha prayer.',
    },
    {
      place: 'Hajj Days',
      date: '14-05-27 (Fri)',
      hijriDate: '08 Dhul-Hijjah',
      description: 'Stay in Mina Moallim Camp, after 9 PM proceed to Arafat',
    },
    {
      place: 'Hajj Days',
      date: '15-05-27 (Sat)',
      hijriDate: '09 Dhul-Hijjah',
      description: 'Stay in Arafat Moallim Camp, after 6 PM proceed to Mustalifa',
    },
    {
      place: 'Hajj Days',
      date: '16-05-27 (Sun)',
      hijriDate: '10 Dhul-Hijjah',
      description: 'Stay in Mina Moallim Camp',
    },
    {
      place: 'Hajj Days',
      date: '17-05-27 (Mon)',
      hijriDate: '11 Dhul-Hijjah',
      description: 'Stay in Mina Moallim Camp',
    },
    {
      place: 'Hajj Days',
      date: '18-05-27 (Tue)',
      hijriDate: '12 Dhul-Hijjah',
      description: 'Stay in Mina Moallim Camp',
    },
    {
      place: 'Hajj Days',
      date: '19-05-27 (Wed)',
      hijriDate: '13 Dhul-Hijjah',
      description:
        'Stay in Mina Moallim Camp, after 4 PM proceed to Makkah Outer',
    },
    {
      place: 'Makkah Outer',
      date: '20-05-27 (Thu) to 21-05-27 (Fri)',
      hijriDate: '14 to 15 Dhul-Hijjah',
      description:
        'Stay in Makkah (Azizia / Haiyal Hijra / Shoukia) building and proceed to Haram nearest hotel on 15th Dhul-Hajjah after Isha prayer.',
    },
    {
      place: 'Makkah',
      date: '21-05-27 (Fri) to 27-05-27 (Thu)',
      hijriDate: '15 to 21 Dhul-Hijjah',
      description:
        'InshaAllah stay in Makkah Haram nearest star hotel (Swissotel Al Maqam / Similar) for 06 nights, on 21st Dhul-Hajjah after 10 AM proceed to Medinah hotel',
    },
    {
      place: 'Medinah',
      date: '27-05-27 (Thu) to 30-05-27 (Sun)',
      hijriDate: '21 to 24 Dhul-Hijjah',
      description:
        'InshaAllah stay in Medinah star hotel (Dallah Taiba / Dar Al Eman Intercontinental / Similar) 3 nights and proceed to Madinah/Jeddah airport as per flight and rules & regulation of KSA',
    },
    {
      place: 'Departure',
      date: '31-05-27 (Mon)',
      hijriDate: '25 Dhul-Hijjah',
      description: 'InshaAllah Chennai arrival on 31 May 2027',
    },
  ],
  notes: [
    'Based on whatever the quotation we have given that Saudi is not yet confirmed once they will confirm, we will update the Mina tower and tent details Insha Allah.',
  ],
}

export const budgetHajjItineraryDetail: HajjPackageItineraryDetail = {
  packageId: 'hajj-budget',
  packageName: 'Budget Package',
  durationBadge: '30 DAYS',
  seasonHeading: `HAJJ ${HAJJ_ITINERARY_SEASON} PACKAGE ITINERARY`,
  itineraryTableTitle: 'Itinerary — InshaAllah by the Grace of Almighty',
  makkahHotel: {
    name: 'Makkah Tower / Pullman / Similar',
    distance: '0–100 Mtrs from Haram',
  },
  medinahHotel: {
    name: 'Province Sham / Sanabel / Similar',
    distance: '200–300 Mtrs from Haram',
  },
  amenitiesColumnA: [
    {
      icon: 'stay',
      text: 'Stay in Makkah outer building (Azizia / Showkia / Haiyal Hizra / Similar) before and after Hajj Arkans.',
    },
    {
      icon: 'stay',
      text: 'Stay in Makkah for 6 nights at Four Star Hotel (Swissotel / Similar) — Distance 0–100 Mtrs',
    },
    {
      icon: 'stay',
      text: 'Stay in Medinah for 3 nights at Four Star Hotel (Dallah Taiba / Similar) — Distance 0–200 Mtrs from Haram',
    },
    {
      icon: 'default',
      text: 'Hajj Arkan days (Additional COST as per availability and preferred)',
    },
    {
      icon: 'default',
      text: 'Special A/C Bus arrangement for local transport (Moulim provided buses at Hajj Days).',
    },
    {
      icon: 'default',
      text: 'Travel with experienced Guide & bayaan (discourse).',
    },
    { icon: 'default', text: 'Tea / Coffee / Fruit' },
  ],
  amenitiesColumnB: [
    {
      icon: 'gift',
      text: 'Complements: Travelling trolley 20" & 24" inch, Sling bag, Slipper bag, Medical Pouch, Hip Pouch (Gents), Makana (Ladies), Cap',
    },
    {
      icon: 'ihram',
      text: 'Ihram, Umbrella, Mina back bag, Hajj guide book, Tawaf mani and Prayer mat.',
    },
    {
      icon: 'default',
      text: 'Virtual Session on Haj / Umrah Procedure at Chennai.',
    },
    {
      icon: 'ihram',
      text: '5 Liters of Zam Zam water at return departure (Subject to KSA government rules and regulations).',
    },
    {
      icon: 'bed',
      text: 'Room Type: Double / Triple / Quad as per guest booked.',
    },
    {
      icon: 'bed',
      text: 'Stay in 4–5 sharing bed room at Makkah outer building (Azizia / Similar). Note: Separate room for Gents & Ladies.',
    },
    {
      icon: 'default',
      text: 'Food amount has calculated SR.100/per day for full board limited menu at Hotel and SR.70/per day South Indian limited menu at Azizia building only. As per food contract, Saudi service provider will provide food in Haj Arkan days.',
    },
    {
      icon: 'warning',
      text: 'There is no transport arrangements to haram while staying in Makkah Outer (Azizia/Similar)',
    },
    { icon: 'excluded', text: 'Qurbani not included in package cost' },
  ],
  itinerary: [
    {
      place: 'Makkah Outer',
      date: '10-05-27 (Mon) to 13-05-27 (Thu)',
      hijriDate: '04 to 07 Dhul-Hijjah 1448',
      description:
        'Stay in Makkah (Azizia / Haiyal Hijra / Shoukia) building and proceed to Mina Moallim Camp after Isha prayer.',
    },
    {
      place: 'Hajj Days',
      date: '14-05-27 (Fri)',
      hijriDate: '08 Dhul-Hijjah 1448',
      description: 'Stay in Mina Moallim Camp, after 9 PM proceed to Arafat',
    },
    {
      place: 'Hajj Days',
      date: '15-05-27 (Sat)',
      hijriDate: '09 Dhul-Hijjah 1448',
      description: 'Stay in Arafat Moallim Camp, after 6 PM proceed to Mustalifa',
    },
    {
      place: 'Hajj Days',
      date: '16-05-27 (Sun)',
      hijriDate: '10 Dhul-Hijjah 1448',
      description: 'Stay in Mina Moallim Camp',
    },
    {
      place: 'Hajj Days',
      date: '17-05-27 (Mon)',
      hijriDate: '11 Dhul-Hijjah 1448',
      description: 'Stay in Mina Moallim Camp',
    },
    {
      place: 'Hajj Days',
      date: '18-05-27 (Tue)',
      hijriDate: '12 Dhul-Hijjah 1448',
      description: 'Stay in Mina Moallim Camp',
    },
    {
      place: 'Hajj Days',
      date: '19-05-27 (Wed)',
      hijriDate: '13 Dhul-Hijjah 1448',
      description:
        'Stay in Mina Moallim Camp, after 4 PM proceed to Makkah Outer',
    },
    {
      place: 'Makkah Outer',
      date: '20-05-27 (Thu) to 27-05-27 (Thu)',
      hijriDate: '14 to 21 Dhul-Hijjah 1448',
      description:
        'Stay in Makkah (Azizia / Haiyal Hijra / Shoukia) building on 21st Dhul-Hajjah after Isha prayer, proceed to Makkah nearest hotel',
    },
    {
      place: 'Makkah',
      date: '27-05-27 (Thu) to 05-06-27 (Sat)',
      hijriDate: '21 Dhul-Hijjah 1448 to 01 Muharram 1449',
      description:
        'InshaAllah stay in Makkah Haram nearest star hotel (Makkah Tower / Pullman / Rotana / Similar) for 09 nights, on 1st Muharram after 10 AM proceed to Medinah hotel',
    },
    {
      place: 'Medinah',
      date: '05-06-27 (Sat) to 09-06-27 (Wed)',
      hijriDate: '01 to 05 Muharram 1449',
      description:
        'InshaAllah stay in Medinah two star hotel (Province Sham / Sanabel / Similar) 4 nights and proceed to Madinah/Jeddah airport as per flight and rules & regulation of KSA',
    },
    {
      place: 'Departure',
      date: '10-06-27 (Thu)',
      hijriDate: '06 Muharram 1449',
      description: 'InshaAllah Chennai arrival on 10 June 2027',
    },
  ],
  notes: [
    'As per the flight schedule, itinerary may change one or two days (before or after) without any prior notice.',
    'Based on whatever the quotation we have given that Saudi is not yet confirmed once they will confirm, we will update the Mina tower and tent details Insha Allah.',
  ],
}

export const hajjPackageItineraryDetails: Record<
  string,
  HajjPackageItineraryDetail
> = {
  'platinum-2025': platinumShortItineraryDetail,
  'hajj-budget': budgetHajjItineraryDetail,
}

export function getHajjItineraryDetail(
  packageId: string,
): HajjPackageItineraryDetail | undefined {
  return hajjPackageItineraryDetails[packageId]
}

export function hasDetailedHajjItinerary(packageId: string): boolean {
  return packageId in hajjPackageItineraryDetails
}

/** Flatten grouped Hajj Days rows for compact card previews */
export function itineraryPreviewRows(
  detail: HajjPackageItineraryDetail,
  max = 4,
) {
  return detail.itinerary.slice(0, max)
}
