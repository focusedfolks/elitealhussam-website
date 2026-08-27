import { Link } from 'react-router-dom'
import { useRef, type ComponentType, type ReactNode, type SVGProps } from 'react'
import {
  IconBook,
  IconBuilding,
  IconGlobe,
  IconHeadset,
  IconHotel,
  IconKaaba,
  IconLandmark,
  IconPlane,
  IconShieldCheck,
  IconSparkle,
  IconUsers,
} from '../components/Icons'
import { images } from '../content/site'
import { useCms } from '../cms/CmsProvider'
import { useI18n } from '../i18n'
import { Hero } from '../components/Hero'
import { PackageCards } from '../components/PackageCards'
import { LeadForm } from '../components/LeadForm'
import { useHomeScrollEffects } from '../animations/useHomeScrollEffects'
import './Home.css'

type IconComp = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>

function GsapReveal({
  children,
  className = '',
  stagger = false,
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  stagger?: boolean
  as?: 'div' | 'section' | 'header' | 'article'
}) {
  return (
    <Tag
      className={`${stagger ? 'gsap-reveal-stagger' : 'gsap-reveal'}${className ? ` ${className}` : ''}`}
    >
      {children}
    </Tag>
  )
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

export function Home() {
  const { t } = useI18n()
  const { testimonials, about } = useCms()
  const homeRef = useRef<HTMLDivElement>(null)
  useHomeScrollEffects(homeRef)

  const services = [
    { label: 'Hotel Booking', Icon: IconHotel },
    { label: 'Visa Processing', Icon: IconBook },
    { label: 'Ziyarat Tours', Icon: IconLandmark },
    { label: 'Transport Care', Icon: IconGlobe },
    { label: 'Religious Guidance', Icon: IconKaaba },
    { label: 'Dubai, UAE Support', Icon: IconBuilding },
  ]

  const steps: {
    n: string
    title: string
    text: string
    featured?: boolean
    Icon: IconComp
  }[] = [
    {
      n: '01',
      title: 'Share your requirements',
      text: 'Tell us travellers, dates, and Hajj or Umrah preference.',
      Icon: IconHeadset,
    },
    {
      n: '02',
      title: 'Receive a clear quotation',
      text: 'We share package details and a clear quotation for your group.',
      featured: true,
      Icon: IconBook,
    },
    {
      n: '03',
      title: 'Confirm & travel with support',
      text: 'Dedicated guidance from booking through return.',
      Icon: IconPlane,
    },
  ]

  const inclusive = [
    {
      title: 'ELITE ALHUSSAM Packages',
      text: 'Complete Hajj & Umrah arrangements with trusted hospitality.',
      image: images.galleryPackages,
      to: '/packages',
      Icon: IconKaaba,
    },
    {
      title: 'Guided Umrah',
      text: 'Group and individual Umrah with Makkah & Madinah stays.',
      image: images.galleryUmrah,
      to: '/packages',
      Icon: IconLandmark,
    },
    {
      title: 'Premium Stays',
      text: 'Comfortable hotels close to the Haramain experience.',
      image: images.galleryStays,
      to: '/about',
      Icon: IconHotel,
    },
    {
      title: 'Family Care',
      text: 'Support for families, elders, and first-time pilgrims.',
      image: images.galleryFamily,
      to: '/contact#lead-form',
      Icon: IconUsers,
    },
  ]

  const proof = [
    { value: '45+', label: t.common.years, Icon: IconSparkle },
    { value: '1', label: 'Office · Dubai, UAE', Icon: IconBuilding },
    { value: '4', label: t.common.multilingual, Icon: IconGlobe },
    { value: '24/7', label: 'Pilgrim support on journey', Icon: IconKaaba },
  ]

  const familyTrust = [
    'Family-friendly stays',
    'Elderly care',
    'Indian passport Hajj eligibility',
  ]

  const partners = [
    { name: 'Saudi Airlines', kind: 'air' as const },
    { name: 'Qatar Airways', kind: 'air' as const },
    { name: 'Turkish Airlines', kind: 'air' as const },
    { name: 'Emirates', kind: 'air' as const },
    { name: 'Hilton', kind: 'hotel' as const },
    { name: 'Hyatt', kind: 'hotel' as const },
  ]

  return (
    <div className="home" ref={homeRef}>
      <Hero />

      <section
        className="proof-section hero-curtain"
        aria-label="Business credentials"
      >
        <div className="container">
          <GsapReveal className="proof-grid" stagger>
            {proof.map((item) => (
              <article className="proof-card" key={item.label}>
                <span className="proof-icon" aria-hidden>
                  <item.Icon size={18} />
                </span>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </article>
            ))}
          </GsapReveal>
          <div className="trust-divider" aria-hidden="true" />
          <GsapReveal className="trust-row">
            <div className="trust-item">
              <IconShieldCheck size={16} />
              <span>Licensed pilgrimage operator</span>
            </div>
            <div className="trust-item">
              <IconSparkle size={16} />
              <span>45+ Years Experience</span>
            </div>
            <div className="trust-item">
              <IconGlobe size={16} />
              <span>Dubai, UAE presence</span>
            </div>
            <div className="trust-item">
              <IconKaaba size={16} />
              <span>Hajj & Umrah Specialist</span>
            </div>
          </GsapReveal>
        </div>
      </section>

      <section className="data-readout-section" aria-label="Trust metrics">
        <div className="container data-readout-inner">
          <svg
            className="data-readout-icon"
            viewBox="0 0 120 120"
            fill="none"
            aria-hidden="true"
          >
            <path
              className="icon-path"
              d="M60 8 L72 38 H98 L78 56 L86 86 L60 70 L34 86 L42 56 L22 38 H48 Z"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <path
              className="icon-path"
              d="M60 70 V108"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              className="icon-path"
              d="M42 108 H78"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
          <div className="data-readout-stats">
            <div className="data-readout-stat">
              <span className="data-readout-label">Years active</span>
              <strong data-count="45" data-suffix="+">
                0
              </strong>
            </div>
            <div className="data-readout-stat">
              <span className="data-readout-label">Offices</span>
              <strong data-count="1">0</strong>
            </div>
            <div className="data-readout-stat">
              <span className="data-readout-label">Pilgrims served</span>
              <strong data-count="500" data-suffix="+">
                0
              </strong>
            </div>
          </div>
        </div>
      </section>

      <section className="family-feature">
        <div className="family-pattern" aria-hidden="true" />
        <div className="container family-feature-grid">
          <GsapReveal className="family-feature-media-wrap">
            <div
              className="family-feature-media"
              style={{ backgroundImage: `url(${images.family})` }}
              role="img"
              aria-label="Family walking together at Masjid an-Nabawi in Madinah"
            />
            <aside className="family-float-stat">
              <strong>500+</strong>
              <span>Families Served</span>
            </aside>
          </GsapReveal>
          <GsapReveal className="family-feature-copy">
            <span className="pill-tag">Family pilgrimage</span>
            <h2>Travel together. Pray together. Return blessed.</h2>
            <p>
              ELITE ALHUSSAM plans Hajj and Umrah for the whole family - adults,
              children, and infants - with comfortable stays and guidance you
              can trust from our Dubai, UAE office. Haj services are for Indian
              passport holders only.
            </p>
            <ul className="family-trust-list">
              {familyTrust.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="cta-row-home">
              <Link className="btn btn-gold" to="/contact#lead-form">
                {t.common.getQuote}
              </Link>
              <Link className="btn btn-ghost" to="/packages">
                {t.pages.packagesTitle}
              </Link>
            </div>
          </GsapReveal>
        </div>
      </section>

      <section className="process-section">
        <div className="container">
          <GsapReveal as="header" className="section-head">
            <p className="eyebrow">Simple process</p>
            <h2>From enquiry to departure in 3 steps</h2>
            <p>
              A clear business process designed to convert interest into
              confirmed bookings.
            </p>
          </GsapReveal>
          <GsapReveal className="process-grid" stagger>
            {steps.map((step) => (
              <article
                className={`process-card${step.featured ? ' is-featured' : ''}`}
                key={step.n}
              >
                <span className="process-n" aria-hidden="true">
                  {step.n}
                </span>
                <span className="process-icon" aria-hidden="true">
                  <step.Icon size={20} />
                </span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </GsapReveal>
          <div className="packages-more">
            <Link className="btn btn-gold" to="/contact#lead-form">
              {t.common.requestQuote}
            </Link>
          </div>
        </div>
      </section>

      <section className="offers-section" id="packages">
        <div className="container">
          <GsapReveal as="header" className="section-head">
            <p className="eyebrow">{t.home.packagesEyebrow}</p>
            <h2>{t.home.packagesTitle}</h2>
            <p>
              Our most popular Hajj and Umrah packages from Dubai - contact us
              for pricing and package details.
            </p>
          </GsapReveal>
          <PackageCards popularOnly />
          <div className="packages-more">
            <Link className="btn btn-ghost" to="/packages">
              {t.common.viewDetails}
            </Link>
            <Link className="btn btn-gold" to="/contact#lead-form">
              {t.common.getQuote}
            </Link>
          </div>
        </div>
      </section>

      <section className="offerings-section">
        <div className="offerings-pattern" aria-hidden="true" />
        <div className="container offerings-grid feature-list-wrapper">
          <GsapReveal className="offerings-copy">
            <p className="eyebrow">{t.home.whoTitle}</p>
            <h2>{t.home.exploreTitle}</h2>
            <p>{t.home.whyText}</p>
            <div className="cta-row-home">
              <Link className="btn btn-gold" to="/about">
                {t.home.viewMore}
              </Link>
              <Link className="btn btn-ghost" to="/contact#lead-form">
                {t.common.enquire}
              </Link>
            </div>
            <div className="service-grid">
              {services.map((item) => (
                <div className="service-item feature-item" key={item.label}>
                  <span className="service-icon" aria-hidden>
                    <item.Icon size={18} />
                  </span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </GsapReveal>
          <div className="offerings-visual sticky-image">
            <div
              className="offerings-photo"
              style={{ backgroundImage: `url(${images.pilgrims})` }}
              role="img"
              aria-label="Pilgrims on their sacred journey"
            />
            <div className="offerings-blob" aria-hidden />
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="container">
          <GsapReveal as="header" className="section-head">
            <p className="eyebrow">Social proof</p>
            <h2>{t.home.testimonials}</h2>
            <p>
              Families and groups who chose ELITE ALHUSSAM for organised,
              trustworthy pilgrimage service.
            </p>
            <p className="rating-metric">
              <span>4.9/5</span> average rating from 200+ reviews
            </p>
          </GsapReveal>
          <GsapReveal className="testimonial-grid" stagger>
            {testimonials.map((item) => (
              <blockquote className="testimonial-card" key={item.name}>
                <span className="testimonial-quote" aria-hidden="true">
                  “
                </span>
                <div className="star-row" aria-label="5 star rating">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p>{item.quote}</p>
                <footer>
                  <span className="testimonial-avatar" aria-hidden="true">
                    {initials(item.name)}
                  </span>
                  <div>
                    <strong>{item.name}</strong>
                    <span>{item.place}</span>
                  </div>
                </footer>
              </blockquote>
            ))}
          </GsapReveal>
          <div className="testimonial-cta">
            <Link className="btn btn-gold" to="/contact#lead-form">
              {t.common.getQuote}
            </Link>
          </div>
        </div>
      </section>

      <section className="affiliations">
        <div className="affiliations-pattern" aria-hidden="true" />
        <div className="container">
          <GsapReveal>
            <h3>Airline & hotel affiliations</h3>
            <div className="partner-row">
              {partners.map((item) => (
                <span key={item.name} className="partner-chip">
                  {item.kind === 'air' ? (
                    <IconPlane size={14} />
                  ) : (
                    <IconHotel size={14} />
                  )}
                  {item.name}
                </span>
              ))}
            </div>
          </GsapReveal>
        </div>
      </section>

      <section className="inclusive-section">
        <div className="container">
          <GsapReveal as="header" className="section-head">
            <p className="eyebrow">Service coverage</p>
            <h2>Complete pilgrimage solutions</h2>
            <p>
              {about.intro}{' '}
              <Link className="inline-more" to="/about">
                {t.common.readMore} →
              </Link>
            </p>
          </GsapReveal>
        </div>
        <div className="container">
          <GsapReveal className="inclusive-showcase" stagger>
            {inclusive.map((item) => (
              <article className="inclusive-card" key={item.title}>
                <Link className="inclusive-card-link" to={item.to}>
                  <div className="inclusive-frame">
                    <div
                      className="inclusive-media"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                    <span className="inclusive-badge" aria-hidden="true">
                      <item.Icon size={18} />
                    </span>
                    <span className="inclusive-shine" aria-hidden="true" />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <span className="inclusive-link">
                    {t.common.readMore} <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </article>
            ))}
          </GsapReveal>
          <div className="packages-more">
            <Link className="btn btn-gold" to="/contact#lead-form">
              {t.common.getQuote}
            </Link>
          </div>
        </div>
      </section>

      <LeadForm />
    </div>
  )
}
