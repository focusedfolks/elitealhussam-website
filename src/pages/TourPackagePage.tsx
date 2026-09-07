import { Link, Navigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { Seo } from '../components/Seo'
import { TourEnquiryForm } from '../components/TourEnquiryForm'
import { getTourBySlug } from '../content/internationalTours'
import './TourPackagePage.css'

type TabId = 'info' | 'itinerary' | 'inclusions' | 'exclusions'

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 7v5l3 2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function TourPackagePage() {
  const { slug } = useParams()
  const pkg = slug ? getTourBySlug(slug) : undefined
  const [tab, setTab] = useState<TabId>('info')

  if (!pkg) return <Navigate to="/international-tours" replace />

  const tabs: { id: TabId; label: string }[] = [
    { id: 'info', label: 'Package Info' },
    { id: 'itinerary', label: 'Itinerary' },
    { id: 'inclusions', label: 'Inclusions' },
    { id: 'exclusions', label: 'Exclusions' },
  ]

  return (
    <div className="tour-detail">
      <Seo
        title={`${pkg.title} | International Tours · ELITE ALHUSSAM`}
        description={`${pkg.tagline}. ${pkg.description} ${pkg.duration}.`}
        url={`/international-tours/${pkg.slug}`}
        image={pkg.image}
      />

      <section
        className="tour-detail-hero"
        style={{ ['--tour-hero-image' as string]: `url(${pkg.image})` }}
      >
        <div className="container tour-detail-hero-inner">
          <Link className="tour-detail-back" to="/international-tours">
            ← Back to Packages
          </Link>
          <span className="tour-detail-badge">Package</span>
          <p className="tour-detail-duration">
            <ClockIcon />
            {pkg.duration}
          </p>
          <h1>{pkg.title}</h1>
          <p className="tour-detail-tagline">{pkg.tagline}</p>
        </div>
      </section>

      <section className="tour-detail-main">
        <div className="container tour-detail-layout">
          <div className="tour-detail-content">
            <div className="tour-detail-tabs" role="tablist" aria-label="Package sections">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={tab === t.id}
                  className={`tour-detail-tab${tab === t.id ? ' is-active' : ''}`}
                  onClick={() => setTab(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="tour-detail-panel" role="tabpanel">
              {tab === 'info' ? (
                <>
                  <h2>About This Package</h2>
                  <p>{pkg.about}</p>
                  <h3>Highlights</h3>
                  <ul>
                    {pkg.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </>
              ) : null}

              {tab === 'itinerary' ? (
                <>
                  <h2>Itinerary</h2>
                  <ol className="tour-itin-list">
                    {pkg.itinerary.map((day) => (
                      <li key={day.day}>
                        <p className="tour-itin-day">{day.day}</p>
                        <h3>{day.title}</h3>
                        <p>{day.text}</p>
                      </li>
                    ))}
                  </ol>
                </>
              ) : null}

              {tab === 'inclusions' ? (
                <>
                  <h2>Inclusions</h2>
                  <ul>
                    {pkg.inclusions.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </>
              ) : null}

              {tab === 'exclusions' ? (
                <>
                  <h2>Exclusions</h2>
                  <ul>
                    {pkg.exclusions.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </>
              ) : null}
            </div>
          </div>

          <TourEnquiryForm packageTitle={pkg.title} packageSlug={pkg.slug} />
        </div>
      </section>
    </div>
  )
}
