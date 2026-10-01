import { Link, Navigate, useParams } from 'react-router-dom'
import { PackageItinerary } from '../components/PackageItinerary'
import { Seo } from '../components/Seo'
import { getHajjItineraryDetail } from '../content/hajjPackageItineraryDetails'
import { useCms } from '../cms/CmsProvider'
import { useI18n } from '../i18n'
import { HAJJ_PASSPORT_NOTE } from '../lib/contact'
import './InnerPages.css'
import './PackageItineraryPage.css'

export function PackageItineraryPage() {
  const { packageId } = useParams<{ packageId: string }>()
  const { t } = useI18n()
  const { packages } = useCms()

  if (!packageId) return <Navigate to="/packages" replace />

  const detail = getHajjItineraryDetail(packageId)
  const pkg = packages.find((p) => p.id === packageId)

  if (!detail || !pkg) return <Navigate to="/404" replace />

  const title = `${detail.packageName} Itinerary | ELITE ALHUSSAM`
  const description = `${detail.packageName} — ${detail.durationBadge} Hajj ${detail.seasonHeading}. Full day-by-day itinerary from Dubai, UAE.`

  return (
    <div className="pkg-itin-page">
      <Seo
        title={title}
        description={description}
        url={`/packages/${packageId}/itinerary`}
        image={pkg.image}
      />

      <section className="inner-section pkg-itin-page-intro">
        <div className="container">
          <nav className="pkg-itin-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/packages">{t.pages.packagesTitle}</Link>
            <span aria-hidden="true">/</span>
            <span>{detail.packageName}</span>
          </nav>
          <p className="pkg-itin-passport-note">{HAJJ_PASSPORT_NOTE}</p>
        </div>
      </section>

      <section className="inner-section alt pkg-itin-page-body">
        <div className="container">
          <PackageItinerary detail={detail} />
          <div className="pkg-itin-page-cta">
            <Link
              className="btn btn-gold"
              to={`/contact?package=${packageId}#lead-form`}
            >
              {t.common.viewItineraryEnquire}
            </Link>
            <Link className="btn btn-ghost" to="/packages">
              {t.common.back} to {t.pages.packagesTitle}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
