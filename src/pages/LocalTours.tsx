import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { Seo } from '../components/Seo'
import { pageMeta } from '../seo/pageMeta'
import { images } from '../content/site'
import { useI18n } from '../i18n'
import './InnerPages.css'

export function LocalTours() {
  const { t } = useI18n()

  return (
    <div>
      <Seo
        title={pageMeta.localTours.title}
        description={pageMeta.localTours.description}
        url={pageMeta.localTours.path}
        image={pageMeta.localTours.image}
      />
      <PageHero
        title="Local Tours"
        subtitle="UAE experiences arranged from our Dubai office — full details coming soon."
        image={images.dubai}
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Local Tours' },
        ]}
      />

      <section className="inner-section">
        <div className="container" style={{ maxWidth: '42rem', textAlign: 'center' }}>
          <p className="eyebrow">Coming soon</p>
          <h2 className="section-title">Local tour packages</h2>
          <p style={{ color: 'var(--muted)', lineHeight: 1.75 }}>
            We are preparing a dedicated range of local UAE day trips and short
            breaks. In the meantime, explore our international holiday packages
            or speak with our Dubai team.
          </p>
          <div className="cta-row" style={{ justifyContent: 'center', marginTop: '1.5rem' }}>
            <Link className="btn btn-gold" to="/contact#lead-form">
              {t.common.enquire}
            </Link>
            <Link className="btn btn-ghost" to="/international-tours">
              International Tours
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
