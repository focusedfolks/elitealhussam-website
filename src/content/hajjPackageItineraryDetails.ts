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
  seasonHeading: 'HAJJ 1448/ 2027 PACKAGE ITINERARY',
  makkahHotel: {
    name: 'SWISSOTEL AL MAQAM / SIMILAR',
    distance: '0 - 100 Mtrs from Haram',
  },
  medinahHotel: {
    name: 'DALLAH TAIBA / DAR AL IMAN / SIMILAR',
    distance: '0 - 200 Mtrs from Haram',
  },
  amenitiesColumnA: [
    {
      icon: 'stay',
      text: 'Stay in Makkah outer building (Azizia / Showkia / Haiyal Hizra / Similar) before and after Hajj Arkans.',
    },
    {
      icon: 'stay',
      text: 'Stay in Makkah for 6 nights at Four Star Hotel (Swissotel Al Maqam / Similar) - Distance 0 - 100 Mtrs',
    },
    {
      icon: 'stay',
      text: 'Stay in Medinah for 3 nights at Four Star Hotel (Dallah Taiba / Similar) - Distance 0 - 200 Mtrs from Haram',
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
      text: 'Complements: Travelling trolley 20" & 24\' inch, Sling bag, Slipper bag, Medical Pouch, Hip Pouch (Gents), Makana (Ladies), Cap, Ihram, Umbrella, Mina back bag, Hajj guide book, Tawaf mani and Prayer mat.',
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
      text: 'Stay in 4 - 5 sharing bed room at Makkah outer building (Azizia / Similar). Note: Separate room for Gents & Ladies.',
    },
    {
      icon: 'warning',
      text: 'There is no transport arrangements to haram while staying in Makkah Outer (Azizia/Similar)',
    },
    { icon: 'excluded', text: 'Qurbani not included in package cost' },
  ],
  itinerary: [
    {
      place: 'MAKKAH OUTER',
      date: '10-05-27, Mon TO 13-05-27, Thu',
      hijriDate: '04-ذو الحجة-48 TO 07-ذو الحجة-48',
      description:
        'STAY IN MAKKAH ( AZIZIA / HAIYAL HIJRA / SHOUKIA ) BUILDING AND PROCEED TO MINA MOALLIM CAMP AFTER ISHA PRAYER.',
    },
    {
      place: 'HAJJ DAYS',
      date: '14-05-27, Fri',
      hijriDate: '08-ذو الحجة-48',
      description: 'STAY IN MINA MOALLIM CAMP, AFTER 9 PM PROCEED TO ARAFAT',
    },
    {
      place: 'HAJJ DAYS',
      date: '15-05-27, Sat',
      hijriDate: '09-ذو الحجة-48',
      description: 'STAY IN ARAFAT MOALLIM CAMP, AFTER 6 PM PROCEED TO MUSTALIFA',
    },
    {
      place: 'HAJJ DAYS',
      date: '16-05-27, Sun',
      hijriDate: '10-ذو الحجة-48',
      description: 'STAY IN MINA MOALLIM CAMP',
    },
    {
      place: 'HAJJ DAYS',
      date: '17-05-27, Mon',
      hijriDate: '11-ذو الحجة-48',
      description: 'STAY IN MINA MOALLIM CAMP',
    },
    {
      place: 'HAJJ DAYS',
      date: '18-05-27, Tue',
      hijriDate: '12-ذو الحجة-48',
      description: 'STAY IN MINA MOALLIM CAMP',
    },
    {
      place: 'HAJJ DAYS',
      date: '19-05-27, Wed',
      hijriDate: '13-ذو الحجة-48',
      description: 'STAY IN MINA MOALLIM CAMP, AFTER 4 PM PROCEED TO MAKKAH OUTER',
    },
    {
      place: 'MAKKAH OUTER',
      date: '20-05-27, Thu TO 21-05-27, Fri',
      hijriDate: '14-ذو الحجة-48 TO 15-ذو الحجة-48',
      description:
        'STAY IN MAKKAH ( AZIZIA / HAIYAL HIJRA / SHOUKIA ) BUILDING AND PROCEED TO HARAM NEAREST HOTEL ON 15th DHUL-HAJJAH AFTER ISHA PRAYER.',
    },
    {
      place: 'MAKKAH',
      date: '21-05-27, Fri TO 27-05-27, Thu',
      hijriDate: '15-ذو الحجة-48 TO 21-ذو الحجة-48',
      description:
        'IN SHAA ALLAH STAY IN MAKKAH HARAM NEAREST STAR HOTEL (SWISSOTEL AL MAQAM / SIMILAR) FOR 06 NIGHTS, ON 21st DHUL-HAJJAH AFTER 10AM PROCEED TO MEDINAH HOTEL',
    },
    {
      place: 'MEDINAH',
      date: '27-05-27, Thu TO 30-05-27, Sun',
      hijriDate: '21-ذو الحجة-48 TO 24-ذو الحجة-48',
      description:
        'IN SHAA ALLAH STAY IN MEDINAH STAR HOTEL (DALLAH TAIBA/ DAR AL EMAN INTERCONTINENTAL/ SIMILAR) 3 NIGHTS AND PROCEED TO MADINAH/JEDDAH AIRPORT AS PER FLIGHT AND RULES & REGULATION OF KSA',
    },
    {
      place: 'DEP',
      date: '31-05-27, Mon',
      hijriDate: '25-ذو الحجة-48',
      description: 'IN SHAA ALLAH CHENNAI ARRIVAL ON 31 MAY 2027',
    },
  ],
  notes: [
    'Note: As per the flight schedule, itinerary may change one or two days (before or after) without any prior notice.',
  ],
}

export const businessShortItineraryDetail: HajjPackageItineraryDetail = {
  packageId: 'classic-hajj-2025',
  packageName: 'Business Short Package',
  durationBadge: '20 DAYS',
  seasonHeading: 'HAJJ 1448/ 2027 PACKAGE ITINERARY',
  makkahHotel: {
    name: 'AZIZIA/ SIMILAR',
    distance: '0 - 100 Mtrs from Haram',
  },
  medinahHotel: {
    name: 'PROVINCE SHAM/ SANABEL / SIMILAR',
    distance: '200 - 300 Mtrs from Haram',
  },
  amenitiesColumnA: [
    {
      icon: 'stay',
      text: 'Stay in Makkah outer building (Azizia / Showkia / Haiyal Hizra /Similar)',
    },
    {
      icon: 'stay',
      text: 'Stay in Medinah for 3 nights at Two Star Hotel ( Province Sham/ Sanabel/ Similar ) - Distance 200 - 300 Mtrs from Haram',
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
      text: 'Travel with experienced Guide & bayaan ( discourse ).',
    },
    { icon: 'default', text: 'Tea / Coffee / Fruit' },
  ],
  amenitiesColumnB: [
    {
      icon: 'gift',
      text: 'Complements: Travelling trolley 20" & 24\' inch, Sling bag, Slipper bag, Medical Pouch, Hip Pouch (Gents), Makana (Ladies), Cap, Ihram, Umbrella, Mina back bag, Hajj guide book, Tawaf mani and Prayer mat.',
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
      text: 'Stay in 4 - 5 sharing bed room at Makkah outer building (Azizia / Similar). Note: Separate room for Gents & Ladies.',
    },
    {
      icon: 'warning',
      text: 'There is no transport arrangements to haram while staying in Makkah Outer (Azizia/Similar)',
    },
    { icon: 'excluded', text: 'Qurbani not included in package cost' },
  ],
  itinerary: [
    {
      place: 'MAKKAH OUTER',
      date: '10-05-27, Mon TO 13-05-27, Thu',
      hijriDate: '04-ذو الحجة-48 TO 07-ذو الحجة-48',
      description:
        'STAY IN MAKKAH ( AZIZIA / HAIYAL HIJRA / SHOUKIA ) BUILDING AND PROCEED TO MINA MOALLIM CAMP AFTER ISHA PRAYER.',
    },
    {
      place: 'HAJJ DAYS',
      date: '14-05-27, Fri',
      hijriDate: '08-ذو الحجة-48',
      description: 'STAY IN MINA MOALLIM CAMP, AFTER 9 PM PROCEED TO ARAFAT',
    },
    {
      place: 'HAJJ DAYS',
      date: '15-05-27, Sat',
      hijriDate: '09-ذو الحجة-48',
      description: 'STAY IN ARAFAT MOALLIM CAMP, AFTER 6 PM PROCEED TO MUSTALIFA',
    },
    {
      place: 'HAJJ DAYS',
      date: '16-05-27, Sun',
      hijriDate: '10-ذو الحجة-48',
      description: 'STAY IN MINA MOALLIM CAMP',
    },
    {
      place: 'HAJJ DAYS',
      date: '17-05-27, Mon',
      hijriDate: '11-ذو الحجة-48',
      description: 'STAY IN MINA MOALLIM CAMP',
    },
    {
      place: 'HAJJ DAYS',
      date: '18-05-27, Tue',
      hijriDate: '12-ذو الحجة-48',
      description: 'STAY IN MINA MOALLIM CAMP',
    },
    {
      place: 'HAJJ DAYS',
      date: '19-05-27, Wed',
      hijriDate: '13-ذو الحجة-48',
      description: 'STAY IN MINA MOALLIM CAMP, AFTER 4 PM PROCEED TO MAKKAH OUTER',
    },
    {
      place: 'MAKKAH OUTER',
      date: '21-05-27, Fri TO 27-05-27, Thu',
      hijriDate: '15-ذو الحجة-48 TO 21-ذو الحجة-48',
      description:
        'STAY IN MAKKAH ( AZIZIA / HAIYAL HIJRA / SHOUKIA ) BUILDING ON 21st DHUL-HAJJAH AFTER 10AM PROCEED TO MEDINAH HOTEL',
    },
    {
      place: 'MEDINAH',
      date: '27-05-27, Thu TO 30-05-27, Sun',
      hijriDate: '21-ذو الحجة-48 TO 24-ذو الحجة-48',
      description:
        'IN SHAA ALLAH STAY IN MEDINAH TWO STAR HOTEL (PROVINCE SHAM/ SANABEL/ SIMILAR) 3 NIGHTS AND PROCEED TO MADINAH/JEDDAH AIRPORT AS PER FLIGHT AND RULES & REGULATION OF KSA',
    },
    {
      place: 'DEP',
      date: '31-05-27, Mon',
      hijriDate: '25-ذو الحجة-48',
      description: 'IN SHAA ALLAH CHENNAI ARRIVAL ON 31 MAY 2027',
    },
  ],
  notes: [
    'Note: As per the flight schedule, itinerary may change one or two days (before or after) without any prior notice.',
  ],
}

export const budgetHajjItineraryDetail: HajjPackageItineraryDetail = {
  packageId: 'hajj-budget',
  packageName: 'Budget Package',
  durationBadge: '30 DAYS',
  seasonHeading: 'HAJJ 1448/ 2027 PACKAGE ITINERARY',
  makkahHotel: {
    name: 'MAKKAH TOWER/ PULLMAN/ SIMILAR',
    distance: '0 - 100 Mtrs from Haram',
  },
  medinahHotel: {
    name: 'PROVINCE SHAM/ SANABEL / SIMILAR',
    distance: '200 - 300 Mtrs from Haram',
  },
  amenitiesColumnA: [
    {
      icon: 'stay',
      text: 'Stay in Makkah outer building (Azizia / Showkia / Haiyal Hizra /Similar) before and after Hajj Arkans.',
    },
    {
      icon: 'stay',
      text: 'Stay in Makkah for 6 nights at Four Star Hotel (Swissotel / Similar ) - Distance 0 - 100 Mtrs',
    },
    {
      icon: 'stay',
      text: 'Stay in Medinah for 3 nights at Four Star Hotel (Dallah Taiba / Similar ) - Distance 0 - 200 Mtrs from Haram',
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
      text: 'Travel with experienced Guide & bayaan ( discourse ).',
    },
    { icon: 'default', text: 'Tea / Coffee / Fruit' },
  ],
  amenitiesColumnB: [
    {
      icon: 'gift',
      text: 'Complements: Travelling trolley 20" & 24\' inch, Sling bag, Slipper bag, Medical Pouch, Hip Pouch (Gents), Makana (Ladies), Cap, Ihram, Umbrella, Mina back bag, Hajj guide book, Tawaf mani and Prayer mat.',
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
      text: 'Stay in 4 - 5 sharing bed room at Makkah outer building (Azizia / Similar). Note: Separate room for Gents & Ladies.',
    },
    {
      icon: 'warning',
      text: 'There is no transport arrangements to haram while staying in Makkah Outer (Azizia/Similar)',
    },
    { icon: 'excluded', text: 'Qurbani not included in package cost' },
  ],
  itinerary: [
    {
      place: 'MAKKAH OUTER',
      date: '10-05-27, Mon TO 13-05-27, Thu',
      hijriDate: '04-ذو الحجة-48 TO 07-ذو الحجة-48',
      description:
        'STAY IN MAKKAH ( AZIZIA / HAIYAL HIJRA / SHOUKIA ) BUILDING AND PROCEED TO MINA MOALLIM CAMP AFTER ISHA PRAYER.',
    },
    {
      place: 'HAJJ DAYS',
      date: '14-05-27, Fri',
      hijriDate: '08-ذو الحجة-48',
      description: 'STAY IN MINA MOALLIM CAMP, AFTER 9 PM PROCEED TO ARAFAT',
    },
    {
      place: 'HAJJ DAYS',
      date: '15-05-27, Sat',
      hijriDate: '09-ذو الحجة-48',
      description: 'STAY IN ARAFAT MOALLIM CAMP, AFTER 6 PM PROCEED TO MUSTALIFA',
    },
    {
      place: 'HAJJ DAYS',
      date: '16-05-27, Sun',
      hijriDate: '10-ذو الحجة-48',
      description: 'STAY IN MINA MOALLIM CAMP',
    },
    {
      place: 'HAJJ DAYS',
      date: '17-05-27, Mon',
      hijriDate: '11-ذو الحجة-48',
      description: 'STAY IN MINA MOALLIM CAMP',
    },
    {
      place: 'HAJJ DAYS',
      date: '18-05-27, Tue',
      hijriDate: '12-ذو الحجة-48',
      description: 'STAY IN MINA MOALLIM CAMP',
    },
    {
      place: 'HAJJ DAYS',
      date: '19-05-27, Wed',
      hijriDate: '13-ذو الحجة-48',
      description: 'STAY IN MINA MOALLIM CAMP, AFTER 4 PM PROCEED TO MAKKAH OUTER',
    },
    {
      place: 'MAKKAH OUTER',
      date: '20-05-27, Thu TO 27-05-27, Thu',
      hijriDate: '14-ذو الحجة-48 TO 21-ذو الحجة-48',
      description:
        'STAY IN MAKKAH ( AZIZIA / HAIYAL HIJRA / SHOUKIA ) BUILDING ON 21st DHUL-HAJJAH AFTER ISHA PRAYER PROCEED TO MAKKAH NEAREST HOTEL',
    },
    {
      place: 'MAKKAH',
      date: '27-05-27, Thu TO 05-06-27, Sat',
      hijriDate: '21-ذو الحجة-48 TO 49-محرم-01',
      description:
        'IN SHAA ALLAH STAY IN MAKKAH HARAM NEAREST STAR HOTEL (MAKKAH TOWER/ PULLMAN/ ROTONA / SIMILAR) FOR 09 NIGHTS, ON 1st MUHARRAM AFTER 10AM PROCEED TO MEDINAH HOTEL',
    },
    {
      place: 'MEDINAH',
      date: '05-06-27, Sat TO 09-06-27, Wed',
      hijriDate: '49-محرم-01 TO 49-محرم-05',
      description:
        'IN SHAA ALLAH STAY IN MEDINAH TWO STAR HOTEL (PROVINCE SHAM/ SANABEL/ SIMILAR) 4 NIGHTS AND PROCEED TO MADINAH/JEDDAH AIRPORT AS PER FLIGHT AND RULES & REGULATION OF KSA',
    },
    {
      place: 'DEP',
      date: '10-06-27, Thu',
      hijriDate: '49-محرم-06',
      description: 'IN SHAA ALLAH CHENNAI ARRIVAL ON 10 JUNE 2027',
    },
  ],
  notes: [
    'Note: As per the flight schedule, itinerary may change one or two days (before or after) without any prior notice.',
  ],
}

export const hajjPackageItineraryDetails: Record<
  string,
  HajjPackageItineraryDetail
> = {
  'platinum-2025': platinumShortItineraryDetail,
  'classic-hajj-2025': businessShortItineraryDetail,
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
