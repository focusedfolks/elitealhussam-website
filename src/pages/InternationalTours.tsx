import { PageHero } from '../components/PageHero'
import { Seo } from '../components/Seo'
import { TourPackageCard } from '../components/TourPackageCard'
import '../components/PackageCards.css'
import '../components/TourPackageCards.css'
import { pageMeta } from '../seo/pageMeta'
import { images } from '../content/site'
import { toursByCountry } from '../content/internationalTours'
import './InnerPages.css'

export function InternationalTours() {
  const groups = toursByCountry()

  return (
    <div>
      <Seo
        title={pageMeta.internationalTours.title}
        description={pageMeta.internationalTours.description}
        url={pageMeta.internationalTours.path}
        image={pageMeta.internationalTours.image}
      />
      <PageHero
        title="International Tours"
        subtitle="Curated holiday packages from our Dubai, UAE office — enquire for personalised pricing. Durations shown are confirmed; more destinations coming soon."
        image={images.touristHero}
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'International Tours' },
        ]}
      />

      <section className="inner-section">
        <div className="container">
          {groups.map((group) => (
            <div
              className="tour-country-block"
              key={group.country}
              id={group.country.toLowerCase()}
            >
              <h2 className="tour-country-title">{group.country}</h2>
              <div className="pkg-grid">
                {group.packages.map((pkg, index) => (
                  <TourPackageCard key={pkg.slug} pkg={pkg} index={index} />
                ))}
              </div>
            </div>
          ))}
          <p
            style={{
              marginTop: '1rem',
              color: 'var(--muted)',
              fontSize: '0.9rem',
              lineHeight: 1.6,
              maxWidth: '42rem',
            }}
          >
            Additional destinations (including several India, Indonesia,
            Malaysia, and Singapore options) will be published once durations
            are confirmed with our operations team.
          </p>
        </div>
      </section>
    </div>
  )
}
