import { useCms } from '../cms/CmsProvider'
import {
  PackageCard,
  DEFAULT_TOUR_ICONS,
} from './PackageCard'
import type { TourPackage } from '../content/internationalTours'
import { telHref } from '../lib/contact'
import './PackageCards.css'

type Props = {
  pkg: TourPackage
  index?: number
}

/**
 * International tour listing card — same shell as Hajj/Umrah PackageCard.
 */
export function TourPackageCard({ pkg, index = 0 }: Props) {
  const { company } = useCms()
  const href = `/international-tours/${pkg.slug}`
  const phone = company.phones[0]
  const bullets =
    pkg.highlights.length > 0
      ? pkg.highlights.slice(0, 5)
      : pkg.inclusions.slice(0, 5)

  return (
    <PackageCard
      id={pkg.slug}
      index={index}
      image={pkg.image}
      imageAlt={pkg.imageAlt}
      badgeLabel={pkg.country}
      category="tour"
      compact
      title={pkg.title}
      season={pkg.duration}
      rating="★★★★★ · Enquire for a personalised quote"
      description={pkg.description}
      icons={DEFAULT_TOUR_ICONS}
      detailsTitle="Package Details"
      detailsSubtitle={pkg.tagline}
      bullets={bullets.length > 0 ? bullets : null}
      itineraryHref={href}
      itineraryLabel="View Itinerary & Enquire"
      phone={phone || null}
      phoneHref={phone ? telHref(phone) : null}
      callPrefix="Call"
    />
  )
}
