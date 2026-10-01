import { PageHero } from '../components/PageHero'
import { CustomQuoteForm } from '../components/CustomQuoteForm'
import { IconPhone } from '../components/Icons'
import { Seo } from '../components/Seo'
import { pageMeta } from '../seo/pageMeta'
import { images } from '../content/site'
import { useCms } from '../cms/CmsProvider'
import {
  HAJJ_PASSPORT_NOTE,
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
        subtitle="Request a custom quotation — our Dubai team prices your stay and services personally. No totals are calculated on this page."
        image={images.dubai}
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Pricing' },
        ]}
      />

      <section className="pricing-section">
        <div className="pricing-container pricing-cta-only">
          <p className="pricing-kicker">DUBAI · UAE</p>
          <h2>Human-priced quotations</h2>
          <p>
            Fill in the request form below with the same details our team uses
            on the quotation sheet. We will follow up with clear pricing for
            your group — nothing is auto-calculated here.
          </p>
          <p className="pricing-passport">{HAJJ_PASSPORT_NOTE}</p>
          <div className="pricing-cta-actions">
            <a className="btn btn-gold" href={telHref(primaryPhone)}>
              <IconPhone size={16} /> Call {primaryPhone}
            </a>
            <a className="btn btn-ghost" href="#quote-request">
              Jump to quote form
            </a>
          </div>
        </div>
      </section>

      <CustomQuoteForm />
    </main>
  )
}
