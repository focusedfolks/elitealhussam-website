import { PageHero } from '../components/PageHero'
import { Seo } from '../components/Seo'
import { images } from '../content/site'
import './InnerPages.css'
import './History.css'

const historyParagraphs = [
  'Placeholder text: The story of the Ka’bah begins with Prophet Ibrahim and his son Prophet Ismail, who raised its foundations in obedience to Allah. This sacred house became a place of worship and a centre of devotion for generations.',
  'Placeholder text: The Black Stone is set into one corner of the Ka’bah. Muslims honour it as part of the rites of tawaf, following the example of the Prophet Muhammad and remembering the long spiritual history of the sanctuary.',
  'Placeholder text: The Zamzam well is connected with the story of Hajar and her search for water for her son Ismail. Its water remains a cherished part of the experience of pilgrims visiting the Sacred Mosque.',
  'Placeholder text: Today, the Ka’bah is the qibla toward which Muslims around the world turn in prayer. It remains the heart of the Masjid al-Haram and a powerful sign of unity for the global Muslim community.',
]

export function History() {
  return (
    <div className="history-page">
      <Seo
        title="History of the Ka'bah | ELITE ALHUSSAM"
        description="A concise introduction to the origins and significance of the Ka'bah, the Black Stone, and Zamzam."
        url="/history"
        image={images.kiswah}
      />
      <PageHero
        title="History"
        subtitle="A brief story of the Ka’bah and its place in the life of Muslims."
        image={images.kiswah}
        crumbs={[{ label: 'Home', to: '/' }, { label: 'History' }]}
      />

      <section className="inner-section">
        <div className="container history-content">
          <div className="history-intro">
            <p className="eyebrow">The Sacred House</p>
            <h2 className="section-title">A place of worship, memory, and unity</h2>
            <p>
              Replace the placeholder paragraphs below with the final historical
              account. The structure is intentionally concise for easy reading.
            </p>
          </div>
          <article className="history-prose">
            {historyParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
        </div>
      </section>
    </div>
  )
}