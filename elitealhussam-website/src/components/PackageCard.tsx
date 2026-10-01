import { Link } from 'react-router-dom'
import {
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'
import './PackageCards.css'

export type PackageCardIconItem = {
  key: string
  title: string
  subtitle?: string
}

export type PackageCardProps = {
  id?: string
  image: string
  imageAlt?: string
  badgeLabel: string
  title: string
  /** Star rating / social-proof line; omit or null to hide */
  rating?: string | null
  description: string
  /** Amenity icon row; omit/empty to hide */
  icons?: PackageCardIconItem[] | null
  /** Checkmarked bullets in the navy details box */
  bullets?: string[] | null
  detailsTitle?: string
  detailsSubtitle?: string
  /** Optional override for the navy box body (e.g. itinerary table) */
  detailsContent?: ReactNode
  itineraryHref: string
  itineraryLabel?: string
  phone?: string | null
  /** Optional custom tel: href; defaults from phone digits */
  phoneHref?: string | null
  callPrefix?: string
  season?: string | null
  featured?: boolean
  featuredRibbon?: string
  /** When featured, badge text (defaults to badgeLabel) */
  featuredBadgeLabel?: string
  category?: 'hajj' | 'umrah' | 'tour' | string
  compact?: boolean
  className?: string
  style?: CSSProperties
  passportNote?: string | null
  placeholderNote?: string | null
  /**
   * Content between the navy details panel and the gold book CTA
   * (e.g. passengers / travel mode on Hajj & Umrah cards).
   */
  children?: ReactNode
  /** Extra content inside the book footer after the gold button */
  footerExtra?: ReactNode
  /** Hide the default gold book CTA (use when children render a custom footer) */
  hideBookCta?: boolean
  onItineraryClick?: (e: MouseEvent<HTMLAnchorElement>) => void
  itineraryAriaDisabled?: boolean
  index?: number
}

export const DEFAULT_PACKAGE_ICONS: PackageCardIconItem[] = [
  { key: 'hotel', title: 'Hotel Stay', subtitle: 'Quality lodging' },
  { key: 'transport', title: 'Transport', subtitle: 'All transfers' },
  { key: 'meals', title: 'Daily Meals', subtitle: 'As per package' },
  { key: 'support', title: '24/7 Support', subtitle: 'Always available' },
  { key: 'visa', title: 'Visa Help', subtitle: 'Documentation' },
]

export const DEFAULT_TOUR_ICONS: PackageCardIconItem[] = [
  { key: 'hotel', title: 'Hotels', subtitle: 'As quoted' },
  { key: 'transport', title: 'Transfers', subtitle: 'As quoted' },
  { key: 'meals', title: 'Meals', subtitle: 'As quoted' },
  { key: 'support', title: 'Support', subtitle: 'Dubai team' },
  { key: 'visa', title: 'Guidance', subtitle: 'Trip planning' },
]

/**
 * Shared package card shell matching the Umrah Economic/Premium/Group design.
 * Optional fields omit their UI when missing.
 */
export function PackageCard({
  id,
  image,
  imageAlt,
  badgeLabel,
  title,
  rating,
  description,
  icons,
  bullets,
  detailsTitle = 'Package Details',
  detailsSubtitle,
  detailsContent,
  itineraryHref,
  itineraryLabel = 'View Itinerary & Enquire',
  phone,
  phoneHref,
  callPrefix = 'Call',
  season,
  featured = false,
  featuredRibbon = 'Recommended',
  featuredBadgeLabel,
  category = 'umrah',
  compact = false,
  className = '',
  style,
  passportNote,
  placeholderNote,
  children,
  footerExtra,
  hideBookCta = false,
  onItineraryClick,
  itineraryAriaDisabled,
  index = 0,
}: PackageCardProps) {
  const cardRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

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

  const iconList = icons && icons.length > 0 ? icons : null
  const bulletList = bullets && bullets.length > 0 ? bullets : null
  const tel =
    phoneHref ??
    (phone ? `tel:${phone.replace(/[^\d+]/g, '')}` : null)
  const delayStyle = {
    '--pkg-delay': `${Math.min(index, 5) * 80}ms`,
    ...style,
  } as CSSProperties

  return (
    <article
      ref={cardRef}
      id={id}
      className={`pkg-card pkg-card--${category}${featured ? ' pkg-card--featured' : ''}${compact ? ' pkg-card--compact' : ''}${visible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
      style={delayStyle}
    >
      {featured ? <span className="pkg-ribbon">{featuredRibbon}</span> : null}

      <div className="pkg-hero">
        <img
          src={image}
          alt={imageAlt ?? title}
          className="pkg-hero-img"
          loading="lazy"
          decoding="async"
          width={640}
          height={360}
        />
        <div className="pkg-hero-fade" aria-hidden="true" />
        <PackageBadge
          label={
            featured ? (featuredBadgeLabel ?? badgeLabel) : badgeLabel
          }
          featured={featured}
        />
      </div>

      <div className="pkg-body">
        <header className="pkg-intro">
          {season ? <p className="pkg-season">{season}</p> : null}
          <h3>{title}</h3>
          {passportNote ? (
            <p className="pkg-passport-badge">{passportNote}</p>
          ) : null}
          {rating ? <p className="pkg-social-proof">{rating}</p> : null}
          <span className="pkg-title-rule" aria-hidden="true" />
          <p className="pkg-summary">{description}</p>
        </header>

        {iconList ? (
          <div className="pkg-amenities" aria-label="Package inclusions">
            {iconList.map((item) => (
              <div
                className="pkg-amenity"
                key={`${item.key}-${item.title}`}
                title={
                  item.subtitle
                    ? `${item.title} - ${item.subtitle}`
                    : item.title
                }
              >
                <span className="pkg-amenity-icon" aria-hidden="true">
                  <AmenityIcon type={item.key} />
                </span>
                <strong>{item.title}</strong>
              </div>
            ))}
          </div>
        ) : null}

        <div className="pkg-price-panel pkg-price-panel--cta">
          <div className="pkg-price-start">
            <span>{detailsTitle}</span>
            {detailsSubtitle ? <em>{detailsSubtitle}</em> : null}
          </div>

          {detailsContent ? (
            detailsContent
          ) : bulletList ? (
            <ul className="pkg-highlights">
              {bulletList.map((point) => (
                <li key={point}>
                  <CheckIcon />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {placeholderNote ? (
            <p className="pkg-placeholder-note">{placeholderNote}</p>
          ) : null}

          <div className="pkg-pricing-cta">
            <Link
              className="pkg-pricing-cta-btn"
              to={itineraryHref}
              onClick={onItineraryClick}
              aria-disabled={itineraryAriaDisabled || undefined}
            >
              {itineraryLabel}
            </Link>
            {phone && tel ? (
              <a className="pkg-pricing-cta-phone" href={tel}>
                {callPrefix} {phone}
              </a>
            ) : null}
          </div>
        </div>

        {children}

        {!hideBookCta ? (
          <div className={`pkg-footer${compact ? ' pkg-footer--compact' : ''}`}>
            <div className="pkg-book-cta">
              <Link
                className={`pkg-book-btn${itineraryAriaDisabled ? ' is-blocked' : ''}`}
                to={itineraryHref}
                onClick={onItineraryClick}
                aria-disabled={itineraryAriaDisabled || undefined}
              >
                {itineraryLabel} <span aria-hidden="true">→</span>
              </Link>
              {footerExtra}
            </div>
          </div>
        ) : null}
      </div>
    </article>
  )
}

function PackageBadge({
  label,
  featured,
}: {
  label: string
  featured?: boolean
}) {
  if (featured) {
    return (
      <span className="pkg-badge pkg-badge--popular">
        <PopularStar /> {label}
      </span>
    )
  }

  const kind = label.toLowerCase()
  const icon =
    kind.includes('platinum') ||
    kind.includes('business') ||
    kind.includes('premium') ? (
      <CrownIcon />
    ) : kind.includes('custom') || kind.includes('customise') ? (
      <BadgeSpark />
    ) : (
      <BadgeDot />
    )

  return (
    <span className="pkg-badge pkg-badge--tier">
      {icon}
      {label}
    </span>
  )
}

function AmenityIcon({ type }: { type: string }) {
  const key = type.toLowerCase()
  switch (key) {
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
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v4l2.5 1.5" />
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
