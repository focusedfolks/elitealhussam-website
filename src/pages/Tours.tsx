import { useState } from 'react'
import { PageHero } from '../components/PageHero'
import { Seo } from '../components/Seo'
import {
  destinationCountries,
  type DestinationCategory,
  type DestinationCountry,
} from '../content/destinations'
import { images } from '../content/site'
import { pageMeta } from '../seo/pageMeta'
import './Tours.css'

function categoriesFor(country: DestinationCountry, stateName: string | null) {
  if (country.kind === 'destinations') return country.categories
  return country.states.find((state) => state.name === stateName)?.categories ?? []
}

export function Tours() {
  const [selectedCountryId, setSelectedCountryId] = useState<string | null>(null)
  const [selectedStateName, setSelectedStateName] = useState<string | null>(null)
  const selectedCountry = destinationCountries.find(
    (country) => country.id === selectedCountryId,
  )
  const categories = selectedCountry
    ? categoriesFor(selectedCountry, selectedStateName)
    : []
  const selectedState =
    selectedCountry?.kind === 'states'
      ? selectedCountry.states.find((state) => state.name === selectedStateName)
      : undefined

  function selectCountry(country: DestinationCountry) {
    setSelectedCountryId(country.id)
    setSelectedStateName(null)
  }

  return (
    <div className="tours-page">
      <Seo
        title={pageMeta.tours.title}
        description={pageMeta.tours.description}
        url={pageMeta.tours.path}
        image={pageMeta.tours.image}
      />
      <PageHero
        title="Explore Destinations"
        subtitle="Browse places we are preparing for future travel programmes."
        image={images.touristHero}
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Destinations' }]}
      />

      <section className="inner-section tours-section">
        <div className="container">
          <div className="tours-selector" aria-label="Choose a country">
            <p className="eyebrow">Choose a country</p>
            <div className="tours-country-list" role="tablist" aria-label="Countries">
              {destinationCountries.map((country) => (
                <button
                  key={country.id}
                  type="button"
                  role="tab"
                  aria-selected={selectedCountryId === country.id}
                  className={`tours-country-tab${selectedCountryId === country.id ? ' is-active' : ''}`}
                  onClick={() => selectCountry(country)}
                >
                  {country.name}
                </button>
              ))}
            </div>
          </div>

          {!selectedCountry ? (
            <div className="tours-empty-state">
              <h2>Select a country to begin</h2>
              <p>Destination details coming soon.</p>
            </div>
          ) : selectedCountry.kind === 'states' && !selectedState ? (
            <StateGrid country={selectedCountry} onSelect={setSelectedStateName} />
          ) : (
            <DestinationGroups
              country={selectedCountry}
              stateName={selectedStateName}
              categories={categories}
              onBack={() => setSelectedStateName(null)}
            />
          )}
        </div>
      </section>
    </div>
  )
}

function StateGrid({
  country,
  onSelect,
}: {
  country: Extract<DestinationCountry, { kind: 'states' }>
  onSelect: (stateName: string) => void
}) {
  return (
    <div className="tours-content">
      <div className="tours-heading">
        <p className="eyebrow">{country.name}</p>
        <h2 className="section-title">Choose a state</h2>
      </div>
      <div className="state-grid">
        {country.states.map((state) => (
          <button
            key={state.name}
            type="button"
            className="state-card"
            onClick={() => onSelect(state.name)}
          >
            <span>{state.name}</span>
            <span aria-hidden="true">→</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function DestinationGroups({
  country,
  stateName,
  categories,
  onBack,
}: {
  country: DestinationCountry
  stateName: string | null
  categories: DestinationCategory[]
  onBack: () => void
}) {
  return (
    <div className="tours-content">
      <div className="tours-heading tours-heading--with-back">
        <div>
          <p className="eyebrow">{stateName ?? country.name}</p>
          <h2 className="section-title">Destinations</h2>
        </div>
        {country.kind === 'states' ? (
          <button type="button" className="tours-back" onClick={onBack}>
            ← All states
          </button>
        ) : null}
      </div>
      {categories.map((category) => (
        <section key={category.name} className="destination-category">
          <h3>{category.name}</h3>
          <div className="destination-grid">
            {category.destinations.map((item) => (
              <article key={item.name} className="destination-card">
                <img src={item.image} alt={item.imageAlt} loading="lazy" />
                <div className="destination-card-body">
                  <h4>{item.name}</h4>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}