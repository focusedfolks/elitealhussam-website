import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { LeadForm } from '../components/LeadForm'
import { BrandMark } from '../components/BrandMark'
import {
  IconFacebook,
  IconGlobe,
  IconMail,
  IconMapPin,
  IconPhone,
  IconTwitter,
  IconWhatsApp,
  IconYouTube,
} from '../components/Icons'
import { images } from '../content/site'
import { useCms } from '../cms/CmsProvider'
import { useI18n } from '../i18n'
import './InnerPages.css'

export function Contact() {
  const { t } = useI18n()
  const { company, packages: allPackages } = useCms()
  const [params] = useSearchParams()
  const packageId = params.get('package') || ''
  const adults = params.get('adults') || ''
  const children = params.get('children') || ''
  const infants = params.get('infants') || ''
  const travelMode = params.get('travelMode') || ''
  const airport = params.get('airport') || ''
  const airline = params.get('airline') || ''
  const departureCity = params.get('departureCity') || ''
  const pickupPoint = params.get('pickupPoint') || ''
  const departureDate = params.get('departureDate') || ''
  const defaultPackage = useMemo(() => {
    const match = allPackages.find((pkg) => pkg.id === packageId)
    return match?.title ?? ''
  }, [packageId, allPackages])
  const defaultTravellers = useMemo(() => {
    if (!adults && !children && !infants) return ''
    const parts = []
    if (adults) parts.push(`${adults} Adult${adults === '1' ? '' : 's'}`)
    if (children && children !== '0')
      parts.push(`${children} Child${children === '1' ? '' : 'ren'}`)
    if (infants && infants !== '0')
      parts.push(`${infants} Infant${infants === '1' ? '' : 's'}`)
    return parts.join(', ')
  }, [adults, children, infants])
  const defaultTravel = useMemo(
    () => ({
      mode: (travelMode === 'road' || travelMode === 'air'
        ? travelMode
        : 'air') as 'air' | 'road',
      airport,
      airline,
      departureCity,
      pickupPoint,
      departureDate,
    }),
    [travelMode, airport, airline, departureCity, pickupPoint, departureDate],
  )

  return (
    <div>
      <PageHero
        title={t.pages.contactTitle}
        subtitle={t.pages.contactSub}
        image={images.dubai}
        crumbs={[
          { label: 'Home', to: '/' },
          { label: t.pages.contactTitle },
        ]}
      />
      <section className="inner-section">
        <div className="container contact-grid">
          <div className="contact-card">
            <p className="eyebrow">{t.footer.contact}</p>
            <div className="contact-brand-block">
              <BrandMark size="lg" showTagline showRule />
            </div>
            <p className="contact-intro">
              Speak with our sales team for a free package quotation. Offices in
              Chennai and Dubai.
            </p>

            {company.offices.map((office) => (
              <div className="contact-row" key={office.id}>
                <span className="contact-icon" aria-hidden>
                  <IconMapPin size={18} />
                </span>
                <div>
                  <strong>{office.label}</strong>
                  <p className="office-company">{office.companyName}</p>
                  <p>
                    {office.lines.map((line) => (
                      <span key={line} className="address-line">
                        {line}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            ))}

            <div className="contact-row">
              <span className="contact-icon" aria-hidden>
                <IconPhone size={18} />
              </span>
              <div>
                <strong>Phone</strong>
                <p>
                  {company.phones.map((phone) => (
                    <a
                      key={phone}
                      className="phone-link"
                      href={`tel:${phone.replace(/\s/g, '')}`}
                    >
                      {phone}
                    </a>
                  ))}
                </p>
              </div>
            </div>

            <div className="contact-row">
              <span className="contact-icon" aria-hidden>
                <IconWhatsApp size={18} />
              </span>
              <div>
                <strong>WhatsApp Sales</strong>
                <p>
                  <a
                    href={`https://wa.me/91${company.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {company.whatsapp}
                  </a>
                </p>
              </div>
            </div>

            <div className="contact-row">
              <span className="contact-icon" aria-hidden>
                <IconMail size={18} />
              </span>
              <div>
                <strong>Email</strong>
                <p>
                  <a href={`mailto:${company.email}`}>{company.email}</a>
                </p>
              </div>
            </div>

            <div className="contact-row">
              <span className="contact-icon" aria-hidden>
                <IconGlobe size={18} />
              </span>
              <div>
                <strong>Social</strong>
                <p className="contact-social">
                  <a href={company.social.facebook} target="_blank" rel="noreferrer">
                    <IconFacebook size={16} /> Facebook
                  </a>
                  <a href={company.social.twitter} target="_blank" rel="noreferrer">
                    <IconTwitter size={16} /> Twitter
                  </a>
                  <a href={company.social.youtube} target="_blank" rel="noreferrer">
                    <IconYouTube size={16} /> YouTube
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="contact-lead-wrap">
            <LeadForm
              key={`${packageId}-${travelMode}-${airport}-${departureCity}-${departureDate}`}
              compact
              defaultPackage={defaultPackage}
              defaultTravellers={defaultTravellers}
              defaultTravel={defaultTravel}
              title={t.common.leadTitle}
              subtitle={t.common.leadSubtitle}
            />
          </div>
        </div>
      </section>
    </div>
  )
}
