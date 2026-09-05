import type { GuidePage } from '../types'
import { heading, page, paragraphs } from '../helpers'

/** Content from scripts/output/alhussam-guide-scrape.json — zam_zam.php */
export const storyOfZamzam: GuidePage = page({
  slug: 'story-of-zamzam',
  title: 'Story of Zam Zam',
  section: 'history',
  subtitle: 'The blessed well of Makkah — faith, history, and hydrogeology',
  heroImage: '/images/safa-marwa.webp',
  sourceUrl: 'https://www.alhussam.in/zam_zam.php',
  blocks: [
    ...paragraphs(
      "Abdullah Bin Abbas (May Allah be pleased with both of them) reported that the Messenger of Allah (May the blessings and peace of Allah be upon him ) said: the best water on the surface of the earth is the water of ZamZam; it nourishes as food and cures from diseases'. [At-Tabaraani transmitted it in Al-Mu'jam Al-Kabir vol. 11 pp.98].",
      "Jabir (May Allah be pleased with him ) reported that the messenger of Allah (peace be upon him) said: 'The water of zamzam will be for that for which it is drunk'. [ Ibn Maajah vol.2, pp.1018. Ahmad vol.3, pp.357].",
      'It is the blessed water by which the heart of the prophet (peace be upon him) was washed. The holy prophet (peace be upon him) also blessed it with his spittle. Since then the water of ZamZam had remained for the inhabitants of Makkah and its visitors to drink from.',
      "All able-bodied Muslims with sufficient financial means are obliged to make the pilgrimage to Makkah, known as the Hajj, at least once in lifetime. During the Hajj, pilgrims perform a number of rituals in the Al-Haram and outside Makkah at Muna, Arafat, and Muzdalifa. One of the rituals known as the Umrah, includes Tawaf (seven times circling) of Ka'bah and Sai between the hills of Safa and Marwa, which is to re-enact Haajar's search for water. Hajj is performed on specific dates during Dhu Al-Hijja the last month of the Islamic year while Umrah is optional and can be performed at any time of the year. Millions of Muslims visit Makkah to perform Umrah and Hajj throughout the year; the peak season being the month of Ramadan and Dhu al Hijja. Visitors cherish drinking Zamzam water during their visit and carry it back home.",
    ),
    heading(2, 'Structure and hydrogeology of the Well'),
    ...paragraphs(
      'Zamzam Well is hand-dug and is about 30.5 m deep, with an internal diameter ranging from 1.08 to 2.66 m. Hydrogeologically, the well lies within Wadi Ibraaheem, which runs through the Holy City of Makkah, and taps groundwater from the wadi alluvium and, to a much lesser extent, the underlying fresh bedrock. The well is now housed in a basement room, protected by glass panels that allow a clear view of the well.',
      'Electric pumps are used to draw water from the well, replacing the ropes and buckets of the olden days. No visitor is allowed to enter the Zamzam Well room and surroundings. Outside this room, there was a service area, where cold Zamzam water fountains and dispensing containers were provided for drinking purposes. Recently, the Al-Haram Tawaf area has been extended to cover the entrance to this area and it is no more accessible to pilgrims. Instead, cold Zamzam water fountains and dispensing containers are now placed at the periphery of Tawaf area and within the Grand Mosque, and open piazzas or Al-Sahat surrounding the Al-Haram building Moreover, a bottling plant and public distribution Sabeel have been established at Kudai, south of Al-Haram for the visitors who want to carry Zamzam home.',
      'The upper 13.5 m of the well is excavated in the sandy alluvium of the Wadi Ibraaheem, and the lower 17.0 m in the underlying diorite bedrock. In between lies a 0.5 m thick highly permeable weathered rock. Most of the alluvial section of the well is lined with stone masonry except for the uppermost 1 m, which has a reinforced concrete collar. The weathered rock section is lined with stone and it is this section that provides the main water entry into the well.',
    ),
  ],
})
