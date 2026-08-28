import { PageHero } from '../components/PageHero'
import { IconPhone } from '../components/Icons'
import { Seo } from '../components/Seo'
import { pageMeta } from '../seo/pageMeta'
import { images } from '../content/site'
import { useCms } from '../cms/CmsProvider'
import {
  HAJJ_PASSPORT_NOTE,
  PRICING_CTA_LABEL,
  telHref,
} from '../lib/contact'
import './Pricing.css'

export function Pricing() {
  const { company } = useCms()
  const primaryPhone = company.phones[0]

  return (
    <main className="pricing-page">
      <Seo
        title={pageMeta.pricing.title}
        description={pageMeta.pricing.description}
        url={pageMeta.pricing.path}
        image={pageMeta.pricing.image}
      />
      <PageHero
        title="Pricing & Package Details"
        subtitle="Contact our Dubai office for current package pricing. Prices are shared privately on enquiry."
        image={images.dubai}
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Pricing' },
        ]}
      />

      <section className="pricing-section">
        <div className="pricing-container pricing-cta-only">
          <p className="pricing-kicker">DUBAI · UAE</p>
          <h2>{PRICING_CTA_LABEL}</h2>
          <p>
            Package rates vary by season, hotel class, and traveller mix. Our
            Dubai team will share a clear quotation for adults, children, and
            infants.
          </p>
          <p className="pricing-passport">{HAJJ_PASSPORT_NOTE}</p>
          <div className="pricing-cta-actions">
            <a className="btn btn-gold" href={telHref(primaryPhone)}>
              <IconPhone size={16} /> Call {primaryPhone}
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
