import { Link, Navigate, useParams } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { Seo } from '../components/Seo'
import { images } from '../content/site'
import './InnerPages.css'
import './StructureAndImportantPlacesPage.css'

type StructurePlace = {
  slug: string
  title: string
  subtitle: string
  paragraphs: string[]
}

const places: StructurePlace[] = [
  {
    slug: 'black-stone',
    title: 'Black Stone (Al-Hajar Al-Aswad)',
    subtitle: 'The sacred stone at the eastern corner of the Ka\'bah.',
    paragraphs: [
      'It is a stone from Al-Jannah (Paradise). It was brought by Angel Jibreel (peace be upon him), the Trusted One, to Ibraaheem (peace be upon him), who placed it on the eastern corner of the Sacred House. It stands 1.10 m above the ground where circumambulation is done and has been surrounded with a pure silver frame to protect it. This stone was originally a single piece, but through various events it broke, and only eight pieces of different sizes now remain.',
      "To mark a specific starting point for circling the Ka'bah, Prophet Ibraaheem (peace be upon him) placed this special stone in its eastern corner. According to the Prophet Muhammad's (peace be upon him) explanation, it was originally shining white when brought down from Paradise, but changed to its present dull black color due to the sins of man. [At-Tirmidhi, Hadith no. 877–878, vol. 3, pp. 226] Hence its name, Al-Hajar Al-Aswad (the Black Stone).",
      'The Prophet (peace be upon him) kissed the Black Stone, as did the Prophets before him. It is therefore recommended for one performing Tawaaf to kiss it, or at least touch it with the hand, and if unable to do either, to point at it while saying "Bismillahi Allahu Akbar" (In the name of Allah, Allah is the Greatest).',
      'Abdullah Bin Omar (may Allah be pleased with both of them) said: "I heard the Messenger of Allah (peace be upon him) saying: Indeed the Yemeni Corner and the Station of Ibraaheem (Maqaam Ibraaheem) are two rubies among the rubies of Paradise, but Allah blotted out their light. Had He not blotted out their light, they would have illuminated the distance between the East and West." [At-Tirmidhi, Hadith no. 877–878, vol. 3, pp. 226]',
      'Abdullah Bin Abbas (may Allah be pleased with both of them) said the Messenger of Allah (peace be upon him) said regarding the Black Stone: "By Allah! On the Day of Reckoning, Allah will raise it, having two eyes to see and a tongue to speak. It will bear witness for whoever touched it with certitude." [At-Tirmidhi, Hadith no. 961, vol. 3, pp. 294]',
      'Ibn Omar (may Allah be pleased with both of them) said: "I heard the Messenger of Allah (peace be upon him) saying: rubbing hands on both of them wipes off sins" — referring to the Black Stone and the Yemeni Corner. [At-Tirmidhi, Hadith no. 959, vol. 3, pp. 292]',
    ],
  },
  {
    slug: 'al-hijr',
    title: 'Al-Hijr (Al-Hatweem)',
    subtitle: 'The semi-circular area beside the Ka\'bah.',
    paragraphs: [
      "In Ibraaheem's (peace be upon him) time, the Ka'bah reached a height of 4.5 meters. On the northern angle of the Ka'bah he built a curved (semi-circular) shaft made from the Araak tree to serve as a yard for Ismaa'eel's sheep (peace be upon him); it is 1.30 m high and 1.5 m wide, running 8.5 m from the wall of the Ka'bah. It is said not to be entirely accurate to ascribe the Hijr to Ismaa'eel (peace be upon him) — it became known as Al-Hijr only because when the Quraish rebuilt the Ka'bah, the lawful funds they could gather were not enough to complete the construction at its full original size. Consequently, they reduced about 3 meters from the northern side and built a short wall around the excluded portion so people could still circumambulate the house from behind it.",
      'This is in accordance with what is narrated about Aishah (may Allah be pleased with her): the Messenger of Allah (peace be upon him) said, "Dear Aishah! Had your people not still been fresh in Islam, I would have ordered the House to be demolished so that I could rebuild it, affixing it with the ground and making a door for it from the East and another from the West, adding to it six cubits from the Hijr, because the Quraish reduced it when they were reconstructing it." [Muslim, Hadith no. 1333, vol. 2, pp. 969] This position is also called Al-Hatweem.',
      'Among its virtues is that a prayer offered in it is like a prayer offered inside the Ka\'bah itself. Aishah (may Allah be pleased with her) said: "I used to like entering the Sacred House to offer prayer, but the Messenger of Allah (peace be upon him) held my hand and put me in Al-Hijr and said: \'Pray in this place if you wish to enter inside the Ka\'bah, because it is a portion of the House.\'" [At-Tirmidhi, Hadith no. 876, vol. 3, pp. 225]',
    ],
  },
  {
    slug: 'al-mizaab',
    title: "Al-Mizaab (Water Drain on the Ka'bah's Roof Gutter)",
    subtitle: 'The roof gutter opening onto the Hijr of Ismaa\'eel.',
    paragraphs: [
      'This gutter is on the roof of the Ka\'bah, on the northern angle, opening onto the Hijr of Ismaa\'eel (peace be upon him). It was built to drain water that falls on the roof of the Ka\'bah during rainfall or while washing it.',
      'The current golden roof gutter, approximately two meters long, was installed by King Fahd in 1417 AH.',
    ],
  },
  {
    slug: 'al-multazam',
    title: 'Al-Multazam (Area Between the Black Stone and the Ka\'bah Door)',
    subtitle: 'The area between Al-Hajar Al-Aswad and the Ka\'bah door.',
    paragraphs: [
      'This is one of the most important places around the Sacred House, where supplication is answered. Its boundary lies between Al-Hajar Al-Aswad (the Black Stone) and the door of the Ka\'bah, with a width of roughly two meters.',
      'It is called Al-Multazam because when the Messenger of Allah (peace be upon him) completed his circumambulation of the Ka\'bah, he pressed himself against this place with his chest, cheeks, and both hands. [Ibn Maajah, Hadith no. 2962, vol. 2, pp. 987] Following this tradition, pilgrims strive to observe the Sunnah practice of pressing their chest, cheeks, and hands to it for a while.',
    ],
  },
  {
    slug: 'maqaam-ibraaheem',
    title: 'Maqaam Ibraaheem (The Station of Ibraaheem, peace be upon him)',
    subtitle: 'The standing place of Ibraaheem beside the Ka\'bah.',
    paragraphs: [
      'During the construction of the Ka\'bah, Prophet Ibraaheem (peace be upon him) stood on a large stone from Paradise, brought to him by Angel Jibreel (peace be upon him), the Trusted One, in order to complete the upper part of the wall. The stone measures 40 cm by 40 cm, with a height of 50 cm. When Ibraaheem (peace be upon him) stood on it, his feet sank into it to a depth of 10 cm, with an impression 22 cm long and 11 cm wide.',
      'He used to move the stone around the Ka\'bah as he built it, and upon completion it was left outside the Ka\'bah near the eastern wall, becoming known in later years as Maqaam Ibraaheem (the Standing Place of Ibraaheem, peace be upon him).',
    ],
  },
  {
    slug: 'the-yemeni-corner',
    title: 'The Yemeni Corner (Rukn Al-Yamani)',
    subtitle: 'The southern corner of the Holy Ka\'bah.',
    paragraphs: [
      'It is the southern corner of the Holy Ka\'bah, built on the same foundation laid by Prophet Ibraaheem (peace be upon him). This is why the Prophet (peace be upon him) used to touch it, as reported in the tradition of Ibn Umar (may Allah be pleased with both of them), who said: "I have not seen the Prophet (peace be upon him) touching any part of the Sacred House except the two Yemeni corners."',
      'Among its virtues is that touching it wipes away one\'s sins. Ibn Umar (may Allah be pleased with both of them) reported that the Prophet (peace be upon him) said: "Rubbing hands on the Black Stone and the Yemeni Corner wipes off sins."',
    ],
  },
]

export function StructureAndImportantPlacesPage() {
  const { placeSlug } = useParams<{ placeSlug?: string }>()
  const activePlace = places.find((place) => place.slug === placeSlug)

  if (!activePlace) {
    return <Navigate to={`/guide/history/structure-and-important-places/${places[0].slug}`} replace />
  }

  return (
    <div className="structure-places-page">
      <Seo
        title={`${activePlace.title} | ELITE ALHUSSAM Guide`}
        description={`${activePlace.title} — important places surrounding the Holy Ka'bah.`}
        url={`/guide/history/structure-and-important-places/${activePlace.slug}`}
        image={images.kiswah}
      />
      <PageHero
        title={activePlace.title}
        subtitle={activePlace.subtitle}
        image={images.kiswah}
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'History', to: '/guide' },
          { label: 'Structure & Important Places' },
          { label: activePlace.title },
        ]}
      />

      <section className="inner-section">
        <div className="container structure-places-layout">
          <details className="structure-places-mobile-nav">
            <summary>Explore Structure &amp; Important Places</summary>
            <StructurePlacesNav activeSlug={activePlace.slug} />
          </details>
          <aside className="structure-places-sidebar" aria-label="Structure and important places">
            <p className="eyebrow">Structure &amp; Important Places</p>
            <StructurePlacesNav activeSlug={activePlace.slug} />
          </aside>
          <article className="structure-places-article">
            {activePlace.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
        </div>
      </section>
    </div>
  )
}

function StructurePlacesNav({ activeSlug }: { activeSlug: string }) {
  return (
    <nav aria-label="Structure and important places navigation">
      <ul>
        {places.map((place) => (
          <li key={place.slug}>
            <Link
              to={`/guide/history/structure-and-important-places/${place.slug}`}
              className={place.slug === activeSlug ? 'is-active' : undefined}
              aria-current={place.slug === activeSlug ? 'page' : undefined}
            >
              {place.title.split(' (')[0]}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
