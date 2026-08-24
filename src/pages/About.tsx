import { Link } from 'react-router-dom'
import { useEffect, useRef, type ReactNode } from 'react'
import { PageHero } from '../components/PageHero'
import { BrandMark } from '../components/BrandMark'
import { highlightIcons, IconWhatsApp } from '../components/Icons'
import { highlights, images } from '../content/site'
import { useCms } from '../cms/CmsProvider'
import { useI18n } from '../i18n'
import './InnerPages.css'
import './About.css'

function Reveal({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('is-in')
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`about-reveal${className ? ` ${className}` : ''}`}>
      {children}
    </div>
  )
}

const highlightCopy: Record<string, string> = {
  weekly: 'Regular scheduled trips throughout the season.',
  bestPrice: 'Transparent packages with honest adult, child, and infant rates.',
  guidance: 'Experienced spiritual support from briefing to return.',
  luxury: 'Comfortable hotels close to the Haramain experience.',
  chennaiSupport: 'Dedicated assistance from our Kilpauk office team.',
  multilingual: 'Guidance in languages your family understands.',
}

const leaders = [
  {
    initials: 'KB',
    name: 'Mr. K.A. Basheer Ahmed',
    title: 'Chairman',
    quote:
      'Four decades of hospitality for pilgrims - service rooted in sincerity.',
  },
  {
    initials: 'SA',
    name: 'Mr. B. Sameer Ahmed',
    title: 'Managing Director',
    quote:
      'Organised, experienced, and genuine tour operation for every pilgrim.',
  },
]

const milestones = [
  {
    year: '45+',
    label: 'Years of hospitality lineage',
    detail: 'Aziz Khogeer Group Hotels roots in the Holy Land',
  },
  {
    year: '1998',
    label: 'Chennai franchise established',
    detail: 'Al Hussam Travel & Tours India (P) Ltd inaugurated',
  },
  {
    year: 'Today',
    label: 'Chennai & Dubai support',
    detail: 'ELITE ALHUSSAM serving pilgrims with clear packages',
  },
]

export function About() {
  const { t } = useI18n()
  const { company, about: aboutCopy } = useCms()
  const labels: Record<string, string> = {
    weekly: t.common.weekly,
    bestPrice: t.common.bestPrice,
    guidance: t.common.guidance,
    luxury: t.common.luxury,
    chennaiSupport: t.common.chennaiSupport,
    multilingual: t.common.multilingual,
  }

  const waHref = `https://wa.me/91${company.whatsapp}?text=${encodeURIComponent(
    'Assalamu Alaikum, I would like to learn more about ELITE ALHUSSAM packages.',
  )}`

  return (
    <div className="about-page">
      <PageHero
        title={t.pages.aboutTitle}
        subtitle={t.pages.aboutSub}
        image={images.hotel}
        crumbs={[
          { label: 'Home', to: '/' },
          { label: t.pages.aboutTitle },
        ]}
      />

      <section className="inner-section about-intro">
        <div className="container about-intro-grid">
          <Reveal className="about-intro-copy">
            <div className="contact-brand-block">
              <BrandMark size="lg" showTagline showRule />
            </div>
            <p className="eyebrow">Our story</p>
            <h2 className="section-title">{t.home.whoTitle}</h2>
            <div className="about-prose">
              <p>{aboutCopy.intro}</p>
              <p>{aboutCopy.legacy}</p>
              <p>{aboutCopy.profile}</p>
              <p>{aboutCopy.india}</p>
              <p>{aboutCopy.leadership}</p>
            </div>
            <div className="cta-row">
              <Link className="btn btn-gold" to="/packages">
                {t.pages.packagesTitle}
              </Link>
              <Link className="btn btn-ghost" to="/contact">
                {t.talkToUs}
              </Link>
            </div>
          </Reveal>

          <Reveal className="about-intro-aside">
            <div
              className="prose-media about-media"
              style={{ backgroundImage: `url(${images.madinahDome})` }}
              role="img"
              aria-label="Masjid an-Nabawi in Madinah"
            />
            <aside className="about-stat-card">
              <strong>45+</strong>
              <span>Years of trusted service</span>
              <em>Est. 1998 in Chennai</em>
            </aside>
          </Reveal>
        </div>
      </section>

      <section className="inner-section alt about-why">
        <div className="container">
          <Reveal className="section-head about-section-head">
            <p className="eyebrow">Why choose us</p>
            <h2>What sets ELITE ALHUSSAM apart</h2>
            <p>
              Practical strengths families look for when choosing a pilgrimage
              partner - from departures to guidance and local support.
            </p>
          </Reveal>
          <Reveal className="highlight-grid about-stagger">
            {highlights.map((item) => {
              const Icon = highlightIcons[item.key]
              return (
                <article key={item.key} className="highlight-card">
                  <span className="highlight-icon" aria-hidden>
                    <Icon size={20} />
                  </span>
                  <h3>{labels[item.key]}</h3>
                  <p>{highlightCopy[item.key]}</p>
                </article>
              )
            })}
          </Reveal>
        </div>
      </section>

      <section className="inner-section about-timeline-section">
        <div className="container">
          <Reveal className="section-head about-section-head">
            <p className="eyebrow">Our journey</p>
            <h2>Decades of trust, carried forward</h2>
            <p>
              From Holy Land hospitality roots to organised pilgrimage support
              in India and the UAE.
            </p>
          </Reveal>
          <Reveal className="about-timeline">
            {milestones.map((item, i) => (
              <div className="about-milestone" key={item.year}>
                <span className="about-milestone-dot" aria-hidden="true" />
                {i < milestones.length - 1 ? (
                  <span className="about-milestone-line" aria-hidden="true" />
                ) : null}
                <strong>{item.year}</strong>
                <h3>{item.label}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="inner-section alt about-leadership">
        <div className="container">
          <Reveal className="section-head about-section-head">
            <p className="eyebrow">Leadership</p>
            <h2>People behind the pilgrimage care</h2>
            <p>
              A family tradition of organised, experienced, and sincere service
              for elite and regular guests alike.
            </p>
          </Reveal>
          <Reveal className="about-leaders about-stagger">
            {leaders.map((person) => (
              <article className="about-leader-card" key={person.name}>
                <span className="about-leader-avatar" aria-hidden="true">
                  {person.initials}
                </span>
                <div>
                  <h3>{person.name}</h3>
                  <p className="about-leader-title">{person.title}</p>
                  <blockquote>“{person.quote}”</blockquote>
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="about-cta-band">
        <div className="container about-cta-inner">
          <div>
            <p className="eyebrow">Start your journey</p>
            <h2>Ready for a clear package quotation?</h2>
            <p>
              Talk to our Chennai or Dubai team for Hajj and Umrah options with
              adult, child, and infant pricing.
            </p>
          </div>
          <div className="about-cta-actions">
            <Link className="btn btn-gold" to="/contact#lead-form">
              {t.common.getQuote}
            </Link>
            <a className="btn about-wa-btn" href={waHref} target="_blank" rel="noreferrer">
              <IconWhatsApp size={16} /> WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
