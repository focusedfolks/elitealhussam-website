import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { IconPhone, IconWhatsApp } from '../components/Icons'
import { Seo } from '../components/Seo'
import { pageMeta } from '../seo/pageMeta'
import { images } from '../content/site'
import { useCms } from '../cms/CmsProvider'
import { useI18n } from '../i18n'
import {
  HAJJ_PASSPORT_NOTE,
  PRICING_CTA_LABEL,
  telHref,
  whatsappHref,
} from '../lib/contact'
import './Pricing.css'

export function Pricing() {
  const { t } = useI18n()
  const { company } = useCms()
  const primaryPhone = company.phones[0]
  const waHref = whatsappHref(
    company.whatsapp,
    'Assalamu Alaikum, please share pricing and package details.',
  )

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
            <a
              className="btn btn-ghost"
              href={waHref}
              target="_blank"
              rel="noreferrer"
            >
              <IconWhatsApp size={16} /> WhatsApp
            </a>
            <Link className="btn btn-ghost" to="/contact#lead-form">
              {t.common.getQuote}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
