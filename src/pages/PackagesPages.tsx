import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { PackageCards } from '../components/PackageCards'
import { LeadForm } from '../components/LeadForm'
import { Seo } from '../components/Seo'
import { pageMeta } from '../seo/pageMeta'
import { images } from '../content/site'
import { useCms } from '../cms/CmsProvider'
import { useI18n } from '../i18n'
import './InnerPages.css'

type Filter = 'all' | 'hajj' | 'umrah'

export function Packages() {
  const { t } = useI18n()
  const { packages: allPackages } = useCms()
  const location = useLocation()
  const [filter, setFilter] = useState<Filter>('all')

  useEffect(() => {
    const hash = location.hash.replace('#', '')
    if (!hash) return
    const match = allPackages.find((pkg) => pkg.id === hash)
    if (match) {
      setFilter(match.category)
      requestAnimationFrame(() => {
        document
          .getElementById(hash)
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }
  }, [location.hash, allPackages])

  return (
    <div>
      <Seo
        title={pageMeta.packages.title}
        description={pageMeta.packages.description}
        url={pageMeta.packages.path}
        image={pageMeta.packages.image}
      />
      <PageHero
        title={t.pages.packagesTitle}
        subtitle={t.pages.packagesSub}
        image={images.themeHero}
        crumbs={[
          { label: 'Home', to: '/' },
          { label: t.pages.packagesTitle },
        ]}
      />

      <section className="inner-section">
        <div className="container">
          <PackageCards
            filter={filter}
            showFilters
            onFilterChange={setFilter}
          />
        </div>
      </section>

      <LeadForm
        title="Request a package quotation"
        subtitle="Select your travellers and preferred package - our sales team will respond with a clear quote."
      />
    </div>
  )
}

/** @deprecated kept for old imports - use Packages */
export function Hajj() {
  return <Packages />
}

/** @deprecated kept for old imports - use Packages */
export function Umrah() {
  return <Packages />
}
