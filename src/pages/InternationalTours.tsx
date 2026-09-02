import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { Seo } from '../components/Seo'
import { pageMeta } from '../seo/pageMeta'
import { images } from '../content/site'
import { useI18n } from '../i18n'
import './InnerPages.css'

export function InternationalTours() {
  const { t } = useI18n()

  return (
    <div>
      <Seo
        title={pageMeta.internationalTours.title}
        description={pageMeta.internationalTours.description}
        url={pageMeta.internationalTours.path}
        image={pageMeta.internationalTours.image}
      />
      <PageHero
        title="International Tours"
        subtitle="Curated global travel experiences from our Dubai, UAE office — full details coming soon."
        image={images.dubai}
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'International Tours' },
        ]}
      />

      <section className="inner-section">
        <div className="container" style={{ maxWidth: '42rem', textAlign: 'center' }}>
          <p className="eyebrow">Coming soon</p>
          <h2 className="section-title">International tour packages</h2>
          <p style={{ color: 'var(--muted)', lineHeight: 1.75 }}>
            We are preparing a dedicated range of international holiday and group
            tour options. Speak with our Dubai team today and we will share
            available destinations and itineraries.
          </p>
          <div className="cta-row" style={{ justifyContent: 'center', marginTop: '1.5rem' }}>
            <Link className="btn btn-gold" to="/contact#lead-form">
              {t.common.enquire}
            </Link>
            <Link className="btn btn-ghost" to="/packages">
              {t.pages.packagesTitle}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
