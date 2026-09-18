import { Link, Navigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { Seo } from '../components/Seo'
import { TourEnquiryForm } from '../components/TourEnquiryForm'
import { getTourBySlug } from '../content/internationalTours'
import { getPendingDestinationBySlug } from '../content/pendingDestinationPackages'
import { useCms } from '../cms/CmsProvider'
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
  const { packages } = useCms()
  const internationalPackage = slug ? getTourBySlug(slug, packages) : undefined
  const pendingDestination = slug ? getPendingDestinationBySlug(slug) : undefined
  const pkg = internationalPackage ?? (pendingDestination ? {
    slug: pendingDestination.slug,
    title: pendingDestination.name,
    tagline: pendingDestination.tagline,
    description: pendingDestination.description,
    duration: pendingDestination.duration,
    image: pendingDestination.image,
    imageAlt: pendingDestination.imageAlt,
    about: pendingDestination.about,
    highlights: pendingDestination.highlights,
    itinerary: pendingDestination.itinerary,
    inclusions: pendingDestination.inclusions,
    exclusions: pendingDestination.exclusions,
    isPending: true,
  } : undefined)
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
        title={
          internationalPackage
            ? `${pkg.title} | International Tours · ELITE ALHUSSAM`
            : `${pkg.title} | Tours · ELITE ALHUSSAM`
        }
        description={
          internationalPackage
            ? `${pkg.tagline}. ${pkg.description} ${pkg.duration}.`
            : pkg.about
        }
        url={`/international-tours/${pkg.slug}`}
        image={pkg.image}
      />

      <section
        className="tour-detail-hero"
        style={{ ['--tour-hero-image' as string]: `url(${pkg.image})` }}
      >
        <div className="container tour-detail-hero-inner">
          <Link
            className="tour-detail-back"
            to={
              pendingDestination
                ? `/tours?country=india&state=${pendingDestination.stateName.toLowerCase().replaceAll(' ', '-')}`
                : '/international-tours'
            }
          >
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
                  {pkg.highlights.length > 0 ? (
                    <>
                      <h3>Highlights</h3>
                      <ul>
                        {pkg.highlights.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </>
                  ) : null}
                </>
              ) : null}

              {tab === 'itinerary' ? (
                <>
                  <h2>Itinerary</h2>
                  {pkg.itinerary.length > 0 ? (
                    <ol className="tour-itin-list">
                      {pkg.itinerary.map((day) => (
                        <li key={day.day}>
                          <p className="tour-itin-day">{day.day}</p>
                          <h3>{day.title}</h3>
                          <p>{day.text}</p>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <p className="tour-detail-empty-state">Itinerary coming soon</p>
                  )}
                </>
              ) : null}

              {tab === 'inclusions' ? (
                <>
                  <h2>Inclusions</h2>
                  {pkg.inclusions.length > 0 ? (
                    <ul>
                      {pkg.inclusions.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="tour-detail-empty-state">Inclusions coming soon</p>
                  )}
                </>
              ) : null}

              {tab === 'exclusions' ? (
                <>
                  <h2>Exclusions</h2>
                  {pkg.exclusions.length > 0 ? (
                    <ul>
                      {pkg.exclusions.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="tour-detail-empty-state">Exclusions coming soon</p>
                  )}
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
