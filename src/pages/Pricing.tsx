import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { allPackages, type TravelPackage } from '../content/site'

import './Pricing.css'

type CurrencyCode =
  | 'INR'
  | 'AED'
  | 'USD'
  | 'SAR'
  | 'GBP'
  | 'EUR'
  | 'CAD'
  | 'AUD'

type Currency = {
  code: CurrencyCode
  name: string
  symbol: string
  locale: string
}

const CURRENCIES: Currency[] = [
  {
    code: 'INR',
    name: 'Indian Rupee',
    symbol: '₹',
    locale: 'en-IN',
  },
  {
    code: 'AED',
    name: 'UAE Dirham',
    symbol: 'د.إ',
    locale: 'en-AE',
  },
  {
    code: 'USD',
    name: 'US Dollar',
    symbol: '$',
    locale: 'en-US',
  },
  {
    code: 'SAR',
    name: 'Saudi Riyal',
    symbol: '﷼',
    locale: 'en-SA',
  },
  {
    code: 'GBP',
    name: 'British Pound',
    symbol: '£',
    locale: 'en-GB',
  },
  {
    code: 'EUR',
    name: 'Euro',
    symbol: '€',
    locale: 'en-IE',
  },
  {
    code: 'CAD',
    name: 'Canadian Dollar',
    symbol: 'CA$',
    locale: 'en-CA',
  },
  {
    code: 'AUD',
    name: 'Australian Dollar',
    symbol: 'A$',
    locale: 'en-AU',
  },
]

const currencyMap = Object.fromEntries(
  CURRENCIES.map((currency) => [currency.code, currency]),
) as Record<CurrencyCode, Currency>

function formatPrice(amount: number, currency: CurrencyCode) {
  const currencyInfo = currencyMap[currency]

  return new Intl.NumberFormat(currencyInfo.locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function Pricing() {
  const [currency, setCurrency] = useState<CurrencyCode>('INR')
  const [rates, setRates] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (currency === 'INR') {
      setRates({ INR: 1 })
      return
    }

    let cancelled = false

    async function loadRate() {
      try {
        setLoading(true)
        setError(false)

        const response = await fetch(
          `https://api.frankfurter.dev/v2/rate/INR/${currency}`,
        )

        if (!response.ok) {
          throw new Error('Unable to load exchange rate')
        }

        const data = await response.json()

        if (!cancelled) {
          setRates({
            INR: 1,
            [currency]: Number(data.rate),
          })
        }
      } catch {
        if (!cancelled) {
          setError(true)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadRate()

    return () => {
      cancelled = true
    }
  }, [currency])

  const selectedCurrency = currencyMap[currency]

  const convertedPackages = useMemo(() => {
    const rate = currency === 'INR' ? 1 : rates[currency]

    if (!rate) return []

    return allPackages.map((pkg: TravelPackage) => ({
      ...pkg,
      convertedPricing: {
        adult: pkg.pricing.adult * rate,
        child: pkg.pricing.child * rate,
        infant: pkg.pricing.infant * rate,
      },
    }))
  }, [currency, rates])

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
                  setCurrency(event.target.value as CurrencyCode)
                }
              >
                {CURRENCIES.map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.symbol} {item.code} — {item.name}
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
                  {selectedCurrency.symbol} {selectedCurrency.code}
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
                          currency,
                        )}
                      </strong>
                    </div>

                    <div className="pricing-person">
                      <span>Child</span>
                      <strong>
                        {formatPrice(
                          pkg.convertedPricing.child,
                          currency,
                        )}
                      </strong>
                    </div>

                    <div className="pricing-person">
                      <span>Infant</span>
                      <strong>
                        {formatPrice(
                          pkg.convertedPricing.infant,
                          currency,
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