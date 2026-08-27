import { Link } from 'react-router-dom'
import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from 'react'
import {
  packageTravelModes,
  type PackageAmenity,
  type PackageCategory,
  type TravelPackage,
} from '../content/site'
import { useCms } from '../cms/CmsProvider'
import { useI18n } from '../i18n'
import {
  HAJJ_PASSPORT_NOTE,
  PRICING_CTA_LABEL,
  telHref,
  whatsappHref,
} from '../lib/contact'
import {
  TravelModeFields,
  emptyTravelDetails,
  isTravelComplete,
  travelSummaryChip,
  type TravelDetails,
} from './TravelModeFields'
import './PackageCards.css'

type Filter = 'all' | PackageCategory

type Passengers = {
  adults: number
  children: number
  infants: number
}

type Props = {
  filter?: Filter
  showFilters?: boolean
  limit?: number
  popularOnly?: boolean
  onFilterChange?: (filter: Filter) => void
}

export function PackageCards({
  filter = 'all',
  showFilters = false,
  limit,
  popularOnly = false,
  onFilterChange,
}: Props) {
  const { t } = useI18n()
  const { packages: allPackages } = useCms()
  const [internalFilter, setInternalFilter] = useState<Filter>(filter)
  const controlled = typeof onFilterChange === 'function'
  const active = controlled ? filter : internalFilter
  const tabsRef = useRef<HTMLDivElement>(null)
  const [pill, setPill] = useState({ left: 0, width: 0 })

  useEffect(() => {
    if (!controlled) setInternalFilter(filter)
  }, [controlled, filter])

  function setFilter(next: Filter) {
    if (controlled) onFilterChange?.(next)
    else setInternalFilter(next)
  }

  const totalCount = allPackages.filter((pkg) =>
    popularOnly ? Boolean(pkg.popular) : true,
  ).length

  const packages = allPackages
    .filter((pkg) => (popularOnly ? Boolean(pkg.popular) : true))
    .filter((pkg) => (active === 'all' ? true : pkg.category === active))
    .slice(0, limit)

  useLayoutEffect(() => {
    if (!showFilters || popularOnly) return
    const root = tabsRef.current
    if (!root) return
    const btn = root.querySelector<HTMLButtonElement>(
      `button[data-filter="${active}"]`,
    )
    if (!btn) return
    setPill({ left: btn.offsetLeft, width: btn.offsetWidth })
  }, [active, showFilters, popularOnly, t.common.allPackages])

  return (
    <div className={`pkg-wrap${popularOnly ? ' pkg-wrap--popular-only' : ''}`}>
      {showFilters && !popularOnly ? (
        <div className="pkg-filters-block">
          <div className="pkg-topbar">
            <div className="pkg-topbar-copy">
              <p className="pkg-filter-meta">
                Showing {packages.length} of {totalCount} packages
              </p>
              <p className="pkg-grid-trust">
                Chosen by 500+ families who booked with confidence · Dubai, UAE
              </p>
              <p className="pkg-passport-note">{HAJJ_PASSPORT_NOTE}</p>
            </div>
          </div>
          <div
            className="pkg-filters"
            role="tablist"
            aria-label="Package type"
            ref={tabsRef}
          >
            <span
              className="pkg-filter-pill"
              style={{
                transform: `translateX(${pill.left}px)`,
                width: pill.width,
              }}
              aria-hidden="true"
            />
            {(
              [
                ['all', t.common.allPackages],
                ['hajj', t.pages.hajjTitle],
                ['umrah', t.pages.umrahTitle],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                role="tab"
                data-filter={key}
                aria-selected={active === key}
                className={`pkg-filter${active === key ? ' is-active' : ''}`}
                onClick={() => setFilter(key)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="pkg-grid">
        {packages.map((pkg, index) => (
          <PackageCard key={pkg.id} pkg={pkg} index={index} />
        ))}
      </div>
    </div>
  )
}

function PackageCard({
  pkg,
  index,
}: {
  pkg: TravelPackage
  index: number
}) {
  const { company } = useCms()
  const { t } = useI18n()
  const cardRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [passengers, setPassengers] = useState<Passengers>({
    adults: 1,
    children: 0,
    infants: 0,
  })
  const modes = packageTravelModes(pkg)
  const [travel, setTravel] = useState<TravelDetails>(() => ({
    ...emptyTravelDetails(),
    mode: modes.length === 1 ? modes[0] : 'air',
  }))
  const [travelTouched, setTravelTouched] = useState(false)
  const primaryPhone = company.phones[0]
  const pricingHref = whatsappHref(
    company.whatsapp,
    `Assalamu Alaikum, please share pricing & package details for ${pkg.title}.`,
  )

  useEffect(() => {
    const node = cardRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const totalLabel = useMemo(() => {
    const parts: string[] = []
    if (passengers.adults)
      parts.push(
        `${passengers.adults} ${passengers.adults === 1 ? 'Adult' : 'Adults'}`,
      )
    if (passengers.children)
      parts.push(
        `${passengers.children} ${passengers.children === 1 ? 'Child' : 'Children'}`,
      )
    if (passengers.infants)
      parts.push(
        `${passengers.infants} ${passengers.infants === 1 ? 'Infant' : 'Infants'}`,
      )
    return parts.join(' + ')
  }, [passengers])

  const enquireTo = useMemo(() => {
    const params = new URLSearchParams({
      package: pkg.id,
      adults: String(passengers.adults),
      children: String(passengers.children),
      infants: String(passengers.infants),
      travelMode: travel.mode || 'air',
    })
    if (travel.mode === 'air') {
      if (travel.airport) params.set('airport', travel.airport)
      if (travel.airline) params.set('airline', travel.airline)
    } else if (travel.mode === 'road') {
      if (travel.departureCity) params.set('departureCity', travel.departureCity)
      if (travel.pickupPoint) params.set('pickupPoint', travel.pickupPoint)
    }
    if (travel.departureDate) params.set('departureDate', travel.departureDate)
    return `/contact?${params.toString()}#lead-form`
  }, [pkg.id, passengers, travel])

  const travelOk = isTravelComplete(travel, modes)
  const chip = travelSummaryChip(travel)
  const isFeatured = Boolean(pkg.featured)

  function guardBook(e: MouseEvent) {
    if (travelOk) return
    e.preventDefault()
    setTravelTouched(true)
  }

  function update(key: keyof Passengers, delta: number) {
    setPassengers((prev) => {
      const min = key === 'adults' ? 1 : 0
      const next = Math.max(min, Math.min(12, prev[key] + delta))
      return { ...prev, [key]: next }
    })
  }

  return (
    <article
      ref={cardRef}
      className={`pkg-card pkg-card--${pkg.category}${isFeatured ? ' pkg-card--featured' : ''}${visible ? ' is-visible' : ''}`}
      id={pkg.id}
      style={{ '--pkg-delay': `${Math.min(index, 5) * 80}ms` } as CSSProperties}
    >
      {isFeatured ? <span className="pkg-ribbon">Recommended</span> : null}

      <div className="pkg-hero">
        <img
          src={pkg.image}
          alt=""
          className="pkg-hero-img"
          loading="lazy"
          decoding="async"
        />
        <div className="pkg-hero-fade" aria-hidden="true" />
        <PackageBadge tag={pkg.tag} featured={pkg.featured} />
      </div>

      <div className="pkg-body">
        <header className="pkg-intro">
          <p className="pkg-season">{pkg.season}</p>
          <h3>{pkg.title}</h3>
          {pkg.category === 'hajj' ? (
            <p className="pkg-passport-badge">{HAJJ_PASSPORT_NOTE}</p>
          ) : null}
          <p className="pkg-social-proof">
            <span aria-hidden="true">★★★★★</span> 4.9 · Chosen by 200+ pilgrims
          </p>
          <span className="pkg-title-rule" aria-hidden="true" />
          <p className="pkg-summary">{pkg.summary}</p>
        </header>

        <div className="pkg-amenities" aria-label="Package inclusions">
          {pkg.amenities.map((item) => (
            <div
              className="pkg-amenity"
              key={item.key}
              title={`${item.title} - ${item.subtitle}`}
            >
              <span className="pkg-amenity-icon" aria-hidden="true">
                <AmenityIcon type={item.key} />
              </span>
              <strong>{item.title}</strong>
            </div>
          ))}
        </div>

        <div className="pkg-price-panel pkg-price-panel--cta">
          <div className="pkg-price-start">
            <span>Package details</span>
            <strong>{pkg.duration}</strong>
            <em>Dubai · UAE departures</em>
          </div>
          <ul className="pkg-highlights">
            {pkg.highlights.map((point) => (
              <li key={point}>
                <CheckIcon />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <div className="pkg-pricing-cta">
            <a className="pkg-pricing-cta-btn" href={pricingHref} target="_blank" rel="noreferrer">
              {PRICING_CTA_LABEL}
            </a>
            <a className="pkg-pricing-cta-phone" href={telHref(primaryPhone)}>
              Call {primaryPhone}
            </a>
          </div>
        </div>

        <div className="pkg-passengers">
          <div className="pkg-passengers-head">
            <strong>
              <UserIcon /> Select Passengers
            </strong>
            <span>How many are traveling?</span>
          </div>
          <div className="pkg-pax-grid">
            <PassengerCounter
              label="Adult"
              hint="12+ Years"
              value={passengers.adults}
              min={1}
              onDec={() => update('adults', -1)}
              onInc={() => update('adults', 1)}
            />
            <PassengerCounter
              label="Child"
              hint="2–12 Years"
              value={passengers.children}
              min={0}
              onDec={() => update('children', -1)}
              onInc={() => update('children', 1)}
            />
            <PassengerCounter
              label="Infant"
              hint="Below 2 Years"
              value={passengers.infants}
              min={0}
              onDec={() => update('infants', -1)}
              onInc={() => update('infants', 1)}
            />
          </div>
        </div>

        <div className="pkg-travel">
          <TravelModeFields
            modes={modes}
            value={travel}
            onChange={setTravel}
            showError={travelTouched}
            idPrefix={`${pkg.id}-travel`}
          />
        </div>

        <div className="pkg-footer">
          <div className="pkg-total-block pkg-total-block--enquiry">
            <span>Traveller summary</span>
            <strong className="pkg-total-amount">{totalLabel}</strong>
            <em>Contact us for pricing</em>
            {chip ? (
              <span className="travel-chip">
                {travel.mode === 'road' ? '🚌' : '✈'} {chip}
              </span>
            ) : null}
          </div>
          <div className="pkg-trust">
            <ShieldIcon />
            <p>
              Trusted Travel Partner
              <span>Safe journey · Spiritual experience</span>
            </p>
          </div>
          <div className="pkg-book-cta">
            <Link
              className={`pkg-book-btn${travelOk ? '' : ' is-blocked'}`}
              to={enquireTo}
              onClick={guardBook}
              aria-disabled={!travelOk}
            >
              {t.common.contactForPricing} <span aria-hidden="true">→</span>
            </Link>
            <a
              className="pkg-ask-btn"
              href={pricingHref}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp Now
            </a>
            <span className="pkg-secure">
              <LockIcon /> Secure enquiry · Your details stay private
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}

function PackageBadge({
  tag,
  featured,
}: {
  tag: string
  featured?: boolean
}) {
  if (featured) {
    return (
      <span className="pkg-badge pkg-badge--popular">
        <PopularStar /> Most Popular
      </span>
    )
  }

  const kind = tag.toLowerCase()
  const icon =
    kind.includes('platinum') ? (
      <CrownIcon />
    ) : kind.includes('classic') ? (
      <BadgeDot />
    ) : kind.includes('custom') ? (
      <BadgeSpark />
    ) : kind.includes('economy') ? (
      <BadgeDot />
    ) : kind.includes('premium') ? (
      <CrownIcon />
    ) : (
      <BadgeDot />
    )

  return (
    <span className="pkg-badge pkg-badge--tier">
      {icon}
      {tag}
    </span>
  )
}

function PassengerCounter({
  label,
  hint,
  value,
  min,
  onDec,
  onInc,
}: {
  label: string
  hint: string
  value: number
  min: number
  onDec: () => void
  onInc: () => void
}) {
  const atMin = value <= min
  const atMax = value >= 12
  return (
    <div className="pkg-pax-card">
      <strong>{label}</strong>
      <span>{hint}</span>
      <div className="pkg-pax-ctrl" role="group" aria-label={label}>
        <button
          type="button"
          aria-label={`Decrease ${label}`}
          onClick={onDec}
          disabled={atMin}
        >
          −
        </button>
        <em aria-live="polite">{value}</em>
        <button
          type="button"
          aria-label={`Increase ${label}`}
          onClick={onInc}
          disabled={atMax}
        >
          +
        </button>
      </div>
    </div>
  )
}

function AmenityIcon({ type }: { type: PackageAmenity['key'] }) {
  switch (type) {
    case 'hotel':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6" />
        </svg>
      )
    case 'transport':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
          <rect x="3" y="5" width="18" height="12" rx="2" />
          <path d="M3 11h18M7 21v-2M17 21v-2M7 5V3M17 5V3" />
        </svg>
      )
    case 'meals':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M8 3v8M6 3v5a2 2 0 0 0 4 0V3M10 11v10M16 3v7a3 3 0 0 0 3 3h0V3M16 21V13" />
        </svg>
      )
    case 'support':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M4 14v-2a8 8 0 0 1 16 0v2M4 14a2 2 0 0 0 2 2h1v-5H6a2 2 0 0 0-2 2Zm16 0a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 2Z" />
          <path d="M18 18a4 4 0 0 1-4 3h-1" />
        </svg>
      )
    case 'visa':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M8 3h8l4 4v14H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
          <path d="M16 3v4h4M10 12h6M10 16h4" />
        </svg>
      )
  }
}

function CheckIcon() {
  return (
    <span className="pkg-check" aria-hidden="true">
      <svg viewBox="0 0 20 20" fill="currentColor">
        <path d="M8.2 13.4 4.8 10l-1.3 1.3 4.7 4.7L17 7.2 15.7 5.9z" />
      </svg>
    </span>
  )
}

function PopularStar() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="m10 1.5 2.4 4.9 5.4.8-3.9 3.8.9 5.4L10 13.8 5.2 16.4l.9-5.4L2.2 7.2l5.4-.8L10 1.5z" />
    </svg>
  )
}

function CrownIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3 17h18l-1.2-9.2a1 1 0 0 0-1.5-.7L14 10l-1.4-4.2a1 1 0 0 0-1.9 0L9.3 10 4.7 7.1a1 1 0 0 0-1.5.7L3 17Zm1.5 2h15v2h-15v-2Z" />
    </svg>
  )
}

function BadgeDot() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <circle cx="10" cy="10" r="4" />
    </svg>
  )
}

function BadgeSpark() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M10 2l1.2 4.2L15.5 7.5 11.2 9.3 10 13.5 8.8 9.3 4.5 7.5l4.3-1.3L10 2Z" />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 19.5c1.8-3.2 4.2-4.8 7-4.8s5.2 1.6 7 4.8" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <span className="pkg-shield" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2 4 5v6c0 5.2 3.4 9.9 8 11 4.6-1.1 8-5.8 8-11V5l-8-3Zm-1.2 14.2-3.5-3.5 1.4-1.4 2.1 2.1 4.3-4.3 1.4 1.4-5.7 5.7Z" />
      </svg>
    </span>
  )
}

function LockIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M10 2a4 4 0 0 0-4 4v2H5a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-1V6a4 4 0 0 0-4-4Zm-2 6V6a2 2 0 1 1 4 0v2H8Z" />
    </svg>
  )
}
