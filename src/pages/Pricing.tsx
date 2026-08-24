import { Link } from 'react-router-dom'

import { allPackages, type TravelPackage } from '../content/site'
import { CURRENCIES, useCurrency } from '../currency'

import './Pricing.css'

export function Pricing() {
  const {
    currency,
    setCurrency,
    selectedCurrency,
    loading,
    error,
    convertFromInr,
    formatPrice,
  } = useCurrency()

  const convertedPackages = allPackages.map((pkg: TravelPackage) => ({
    ...pkg,
    convertedPricing: {
      adult: convertFromInr(pkg.pricing.adult),
      child: convertFromInr(pkg.pricing.child),
      infant: convertFromInr(pkg.pricing.infant),
    },
  }))

  return (
    <main className="pricing-page">
      <section className="pricing-hero">
        <div className="pricing-hero-inner">
          <span className="pricing-eyebrow">
            ELITE ALHUSSAM · PACKAGE PRICING
          </span>

          <h1>Hajj & Umrah Prices</h1>

          <p>
            Explore our pilgrimage packages and view prices in the currency
            that is most convenient for you.
          </p>

          <div className="pricing-currency-box">
            <label htmlFor="pricing-currency">
              <span>View prices in</span>

              <select
                id="pricing-currency"
                value={currency}
                onChange={(event) =>
                  setCurrency(event.target.value as typeof currency)
                }
              >
                {CURRENCIES.map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.code} - {item.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </section>

      <section className="pricing-section">
        <div className="pricing-container">
          <div className="pricing-heading">
            <div>
              <span className="pricing-kicker">OUR PACKAGES</span>

              <h2>
                Package prices in{' '}
                <strong>
                  {selectedCurrency.code}
                </strong>
              </h2>
            </div>

            {currency !== 'INR' && (
              <span className="pricing-note">
                Converted from INR using the latest available reference rate.
              </span>
            )}
          </div>

          {loading && (
            <div className="pricing-loading">
              Updating currency conversion...
            </div>
          )}

          {error && (
            <div className="pricing-error">
              Currency conversion is temporarily unavailable. Please try again
              or select INR.
            </div>
          )}

          {!loading && !error && (
            <div className="pricing-grid">
              {convertedPackages.map((pkg) => (
                <article
                  className={`pricing-card ${
                    pkg.featured ? 'pricing-card--featured' : ''
                  }`}
                  key={pkg.id}
                >
                  {pkg.featured && (
                    <span className="pricing-popular">
                      MOST POPULAR
                    </span>
                  )}

                  <div className="pricing-card-top">
                    <span className="pricing-tag">{pkg.tag}</span>

                    <span className="pricing-category">
                      {pkg.category === 'hajj' ? 'HAJJ' : 'UMRAH'}
                    </span>
                  </div>

                  <h3>{pkg.title}</h3>

                  <p className="pricing-summary">
                    {pkg.summary}
                  </p>

                  <div className="pricing-duration">
                    <span>{pkg.duration}</span>
                    <span>{pkg.locations}</span>
                  </div>

                  <div className="pricing-person-list">
                    <div className="pricing-person">
                      <span>Adult</span>
                      <strong>
                        {formatPrice(
                          pkg.convertedPricing.adult,
                        )}
                      </strong>
                    </div>

                    <div className="pricing-person">
                      <span>Child</span>
                      <strong>
                        {formatPrice(
                          pkg.convertedPricing.child,
                        )}
                      </strong>
                    </div>

                    <div className="pricing-person">
                      <span>Infant</span>
                      <strong>
                        {formatPrice(
                          pkg.convertedPricing.infant,
                        )}
                      </strong>
                    </div>
                  </div>

                  <p className="pricing-starting">
                    {pkg.pricing.note || 'Starting from · per person'}
                  </p>

                  <Link
                    to={`/contact#lead-form`}
                    className="pricing-quote-btn"
                  >
                    Get a Free Quote
                  </Link>

                  <Link
                    to={`/packages#${pkg.id}`}
                    className="pricing-details-btn"
                  >
                    View Package Details
                  </Link>
                </article>
              ))}
            </div>
          )}

          <div className="pricing-disclaimer">
            <strong>Important:</strong> Displayed currency conversions are
            indicative reference values only. Final package pricing, taxes,
            airline charges, visa charges and availability may vary. Please
            contact ELITE ALHUSSAM for the final quotation.
          </div>
        </div>
      </section>
    </main>
  )
}