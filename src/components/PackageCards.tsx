import { Link } from 'react-router-dom'
import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
} from 'react'
import {
  packageTravelModes,
  type ItineraryRow,
  type PackageCategory,
  type TravelPackage,
} from '../content/site'
import {
  getHajjItineraryDetail,
  hasDetailedHajjItinerary,
} from '../content/hajjPackageItineraryDetails'
import { useCms } from '../cms/CmsProvider'
import { useI18n } from '../i18n'
import { telHref } from '../lib/contact'
import {
  TravelModeFields,
  emptyTravelDetails,
  isTravelComplete,
  travelSummaryChip,
  type TravelDetails,
} from './TravelModeFields'
import { PackageCard } from './PackageCard'
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
  excludeIds?: string[]
  compact?: boolean
  onFilterChange?: (filter: Filter) => void
}

export function PackageCards({
  filter = 'all',
  showFilters = false,
  limit,
  popularOnly = false,
  excludeIds = [],
  compact = false,
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
    .filter((pkg) => !excludeIds.includes(pkg.id))
    .sort((a, b) => {
      if (a.category !== b.category) {
        return a.category === 'umrah' ? -1 : 1
      }
      return 0
    })
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
    <div
      className={`pkg-wrap${popularOnly ? ' pkg-wrap--popular-only' : ''}${compact ? ' pkg-wrap--compact' : ''}`}
    >
      {showFilters && !popularOnly ? (
        <div className="pkg-filters-block">
          <div className="pkg-topbar">
            <div className="pkg-topbar-copy">
              <p className="pkg-filter-meta">
                {t.packagesUi.showingPackages
                  .replace('{shown}', String(packages.length))
                  .replace('{total}', String(totalCount))}
              </p>
              <p className="pkg-grid-trust">{t.packagesUi.gridTrust}</p>
              <p className="pkg-passport-note">{t.hero.passportNote}</p>
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
                ['umrah', t.pages.umrahTitle],
                ['hajj', t.pages.hajjTitle],
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
          <TravelPackageCard
            key={pkg.id}
            pkg={pkg}
            index={index}
            compact={compact}
          />
        ))}
      </div>
    </div>
  )
}

function TravelPackageCard({
  pkg,
  index,
  compact = false,
}: {
  pkg: TravelPackage
  index: number
  compact?: boolean
}) {
  const { company } = useCms()
  const { t } = useI18n()
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
  const catalog = t.packageCatalog[pkg.id]
  const title = catalog?.title ?? pkg.title
  const summary = catalog?.summary ?? pkg.summary

  const totalLabel = useMemo(() => {
    const parts: string[] = []
    if (passengers.adults)
      parts.push(
        `${passengers.adults} ${passengers.adults === 1 ? t.packagesUi.adultLabel : t.common.adults}`,
      )
    if (passengers.children)
      parts.push(
        `${passengers.children} ${passengers.children === 1 ? t.packagesUi.childLabel : t.common.children}`,
      )
    if (passengers.infants)
      parts.push(
        `${passengers.infants} ${passengers.infants === 1 ? t.packagesUi.infantLabel : t.common.infant}`,
      )
    return parts.join(' + ')
  }, [
    passengers,
    t.common.adults,
    t.common.children,
    t.common.infant,
    t.packagesUi.adultLabel,
    t.packagesUi.childLabel,
    t.packagesUi.infantLabel,
  ])

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
  const hasDetailedItinerary = hasDetailedHajjItinerary(pkg.id)
  const itineraryDetail = getHajjItineraryDetail(pkg.id)
  const hasItinerary = Boolean(pkg.itinerary?.length) && !hasDetailedItinerary
  const enquireCtaLabel = t.common.viewItineraryEnquire
  const primaryPhone = company.phones[0]

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

  const detailsContent = hasDetailedItinerary && itineraryDetail ? (
    <div className="pkg-itinerary-teaser">
      <p className="pkg-itinerary-season">{itineraryDetail.seasonHeading}</p>
      <ul className="pkg-highlights">
        {pkg.highlights.slice(0, 3).map((point) => (
          <li key={point}>
            <CheckIcon />
            <span>{point}</span>
          </li>
        ))}
      </ul>
      <Link
        className="pkg-itinerary-full-link"
        to={`/packages/${pkg.id}/itinerary`}
      >
        View Full Itinerary <span aria-hidden="true">→</span>
      </Link>
    </div>
  ) : hasItinerary ? (
    <PackageItineraryTable rows={pkg.itinerary!} />
  ) : undefined

  return (
    <PackageCard
      id={pkg.id}
      index={index}
      image={pkg.image}
      imageAlt={`${title} — ${pkg.category} package`}
      badgeLabel={pkg.tag}
      featured={Boolean(pkg.featured)}
      featuredRibbon={t.packagesUi.recommended}
      featuredBadgeLabel={t.packagesUi.mostPopular}
      category={pkg.category}
      compact={compact}
      season={pkg.season || null}
      title={title}
      passportNote={pkg.category === 'hajj' ? t.hero.passportNote : null}
      rating={t.packagesUi.socialProof}
      description={summary}
      icons={pkg.amenities}
      detailsTitle={
        hasDetailedItinerary || hasItinerary
          ? t.common.itineraryTitle
          : t.common.packageDetails
      }
      detailsSubtitle={t.packagesUi.dubaiDepartures}
      detailsContent={detailsContent}
      bullets={detailsContent ? null : pkg.highlights}
      placeholderNote={
        pkg.placeholder ? t.common.placeholderPackageNote : null
      }
      itineraryHref={enquireTo}
      itineraryLabel={enquireCtaLabel}
      phone={primaryPhone}
      phoneHref={telHref(primaryPhone)}
      callPrefix={t.packagesUi.callPrefix}
      hideBookCta={!compact}
    >
      {!compact ? (
        <>
          <div className="pkg-passengers">
            <div className="pkg-passengers-head">
              <strong>
                <UserIcon /> {t.packagesUi.selectPassengers}
              </strong>
              <span>{t.packagesUi.travelingQuestion}</span>
            </div>
            <div className="pkg-pax-grid">
              <PassengerCounter
                label={t.packagesUi.adultLabel}
                hint={t.packagesUi.adultHint}
                value={passengers.adults}
                min={1}
                onDec={() => update('adults', -1)}
                onInc={() => update('adults', 1)}
              />
              <PassengerCounter
                label={t.packagesUi.childLabel}
                hint={t.packagesUi.childHint}
                value={passengers.children}
                min={0}
                onDec={() => update('children', -1)}
                onInc={() => update('children', 1)}
              />
              <PassengerCounter
                label={t.packagesUi.infantLabel}
                hint={t.packagesUi.infantHint}
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
              <span>{t.packagesUi.travellerSummary}</span>
              <strong className="pkg-total-amount">{totalLabel}</strong>
              {chip ? (
                <span className="travel-chip">
                  {travel.mode === 'road' ? '🚌' : '✈'} {chip}
                </span>
              ) : null}
            </div>
            <div className="pkg-trust">
              <ShieldIcon />
              <p>
                {t.packagesUi.trustedPartner}
                <span>{t.packagesUi.trustedPartnerSub}</span>
              </p>
            </div>
            <div className="pkg-book-cta">
              <Link
                className={`pkg-book-btn${travelOk ? '' : ' is-blocked'}`}
                to={enquireTo}
                onClick={guardBook}
                aria-disabled={!travelOk}
              >
                {enquireCtaLabel} <span aria-hidden="true">→</span>
              </Link>
              <span className="pkg-secure">
                <LockIcon /> {t.packagesUi.secureEnquiry}
              </span>
            </div>
          </div>
        </>
      ) : null}
    </PackageCard>
  )
}

function PackageItineraryTable({ rows }: { rows: ItineraryRow[] }) {
  const { t } = useI18n()
  return (
    <div className="pkg-itinerary-wrap">
      <table className="pkg-itinerary-table">
        <thead>
          <tr>
            <th scope="col">{t.common.itineraryPlace}</th>
            <th scope="col">{t.common.itineraryDate}</th>
            <th scope="col">{t.common.itineraryHijri}</th>
            <th scope="col">{t.common.itineraryDescription}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={`${row.place}-${i}`}>
              <td>{row.place}</td>
              <td>{row.date}</td>
              <td>{row.hijriDate}</td>
              <td>{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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

function CheckIcon() {
  return (
    <span className="pkg-check" aria-hidden="true">
      <svg viewBox="0 0 20 20" fill="currentColor">
        <path d="M8.2 13.4 4.8 10l-1.3 1.3 4.7 4.7L17 7.2 15.7 5.9z" />
      </svg>
    </span>
  )
}

function UserIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
    >
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
