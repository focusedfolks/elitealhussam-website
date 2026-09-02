import { useMemo } from 'react'
import type {
  AmenityIconKind,
  DetailedItineraryRow,
  HajjPackageItineraryDetail,
  PackageAmenityItem,
} from '../content/hajjPackageItineraryDetails'
import { useI18n } from '../i18n'
import './PackageItinerary.css'

type ItinerarySegment =
  | { kind: 'row'; row: DetailedItineraryRow }
  | { kind: 'hajj-days'; rows: DetailedItineraryRow[] }

function groupItineraryRows(rows: DetailedItineraryRow[]): ItinerarySegment[] {
  const segments: ItinerarySegment[] = []
  let hajjBuffer: DetailedItineraryRow[] = []

  function flushHajj() {
    if (hajjBuffer.length) {
      segments.push({ kind: 'hajj-days', rows: hajjBuffer })
      hajjBuffer = []
    }
  }

  for (const row of rows) {
    if (row.place === 'Hajj Days') {
      hajjBuffer.push(row)
    } else {
      flushHajj()
      segments.push({ kind: 'row', row })
    }
  }
  flushHajj()
  return segments
}

type Props = {
  detail: HajjPackageItineraryDetail
}

export function PackageItinerary({ detail }: Props) {
  const { t } = useI18n()
  const segments = useMemo(
    () => groupItineraryRows(detail.itinerary),
    [detail.itinerary],
  )

  return (
    <article className="pkg-itin">
      <header className="pkg-itin-header">
        <p className="pkg-itin-season">{detail.seasonHeading}</p>
        <div className="pkg-itin-title-row">
          <h1 className="pkg-itin-name">{detail.packageName}</h1>
          <span className="pkg-itin-duration">{detail.durationBadge}</span>
        </div>
      </header>

      <div className="pkg-itin-hotels">
        <div className="pkg-itin-hotel">
          <span className="pkg-itin-hotel-icon" aria-hidden="true">
            <BuildingIcon />
          </span>
          <div>
            <strong>Makkah</strong>
            <p>{detail.makkahHotel.name}</p>
            <em>{detail.makkahHotel.distance}</em>
          </div>
        </div>
        <div className="pkg-itin-hotel">
          <span className="pkg-itin-hotel-icon" aria-hidden="true">
            <DomeIcon />
          </span>
          <div>
            <strong>Medinah</strong>
            <p>{detail.medinahHotel.name}</p>
            <em>{detail.medinahHotel.distance}</em>
          </div>
        </div>
      </div>

      <section className="pkg-itin-amenities" aria-label="Package amenities">
        <AmenityColumn items={detail.amenitiesColumnA} />
        <AmenityColumn items={detail.amenitiesColumnB} />
      </section>

      <section className="pkg-itin-table-section" aria-label="Itinerary schedule">
        {detail.itineraryTableTitle ? (
          <h2 className="pkg-itin-table-title">{detail.itineraryTableTitle}</h2>
        ) : (
          <h2 className="pkg-itin-table-title">{t.common.itineraryTitle}</h2>
        )}
        <div className="pkg-itin-table-wrap">
          <table className="pkg-itin-table">
            <thead>
              <tr>
                <th scope="col">{t.common.itineraryPlace}</th>
                <th scope="col">{t.common.itineraryDate} (2027)</th>
                <th scope="col">{t.common.itineraryHijri}</th>
                <th scope="col">{t.common.itineraryDescription}</th>
              </tr>
            </thead>
            <tbody>
              {segments.map((segment, segIdx) => {
                if (segment.kind === 'row') {
                  return (
                    <tr key={`seg-${segIdx}`}>
                      <th scope="row">{segment.row.place}</th>
                      <td>{segment.row.date}</td>
                      <td>{segment.row.hijriDate}</td>
                      <td>{segment.row.description}</td>
                    </tr>
                  )
                }

                return segment.rows.map((row, rowIdx) => (
                  <tr
                    key={`seg-${segIdx}-hajj-${rowIdx}`}
                    className={rowIdx > 0 ? 'pkg-itin-hajj-cont' : 'pkg-itin-hajj-group'}
                  >
                    {rowIdx === 0 ? (
                      <th scope="rowgroup" rowSpan={segment.rows.length}>
                        <span className="pkg-itin-hajj-label">
                          <TentIcon />
                          Hajj Days
                        </span>
                      </th>
                    ) : null}
                    <td>{row.date}</td>
                    <td>{row.hijriDate}</td>
                    <td>{row.description}</td>
                  </tr>
                ))
              })}
            </tbody>
          </table>
        </div>
      </section>

      {detail.notes.length ? (
        <aside className="pkg-itin-notes" aria-label="Important notes">
          {detail.notes.map((note) => (
            <p key={note}>{note}</p>
          ))}
        </aside>
      ) : null}
    </article>
  )
}

function AmenityColumn({ items }: { items: PackageAmenityItem[] }) {
  return (
    <ul className="pkg-itin-amenity-col">
      {items.map((item) => (
        <li
          key={item.text}
          className={`pkg-itin-amenity${item.icon === 'warning' ? ' is-warning' : ''}${item.icon === 'excluded' ? ' is-excluded' : ''}`}
        >
          <AmenityBullet icon={item.icon ?? 'default'} />
          <span>{item.text}</span>
        </li>
      ))}
    </ul>
  )
}

function AmenityBullet({ icon }: { icon: AmenityIconKind }) {
  switch (icon) {
    case 'stay':
      return (
        <span className="pkg-itin-bullet" aria-hidden="true">
          <StarIcon />
        </span>
      )
    case 'gift':
      return (
        <span className="pkg-itin-bullet" aria-hidden="true">
          <GiftIcon />
        </span>
      )
    case 'ihram':
      return (
        <span className="pkg-itin-bullet" aria-hidden="true">
          <WaterIcon />
        </span>
      )
    case 'bed':
      return (
        <span className="pkg-itin-bullet" aria-hidden="true">
          <BedIcon />
        </span>
      )
    case 'warning':
      return (
        <span className="pkg-itin-bullet is-warning" aria-hidden="true">
          <WarningIcon />
        </span>
      )
    case 'excluded':
      return (
        <span className="pkg-itin-bullet is-excluded" aria-hidden="true">
          <ExcludedIcon />
        </span>
      )
    default:
      return (
        <span className="pkg-itin-bullet" aria-hidden="true">
          <DotIcon />
        </span>
      )
  }
}

function BuildingIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M4 21h16M6 21V8l6-4 6 4v13M10 21v-6h4v6" />
    </svg>
  )
}

function DomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M12 3c-5 0-9 4-9 9v9h18V12c0-5-4-9-9-9Z" />
      <path d="M12 3v18M8 21h8" />
    </svg>
  )
}

function TentIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2 2 20h20L12 2Zm0 5.5 5.8 10.5H6.2L12 7.5Z" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor">
      <path d="m10 1.5 2.4 4.9 5.4.8-3.9 3.8.9 5.4L10 13.8 5.2 16.4l.9-5.4L2.2 7.2l5.4-.8L10 1.5z" />
    </svg>
  )
}

function GiftIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 2v16M2 7h16v11H2V7Zm8-5a2.5 2.5 0 0 1 0 5H10V2h0a2.5 2.5 0 0 1 2 0ZM2 7h16V5H2v2Z" />
    </svg>
  )
}

function WaterIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 2c3 4.5 6 7.2 6 10.5A6 6 0 1 1 4 12.5C4 9.2 7 6.5 10 2Z" />
    </svg>
  )
}

function BedIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor">
      <path d="M2 14V8a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v6h-1V9H3v5H2Zm0 2v-2h16v2H2Z" />
    </svg>
  )
}

function WarningIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 2 1 18h18L10 2Zm-1 5h2v6H9V7Zm0 8h2v2H9v-2Z" />
    </svg>
  )
}

function ExcludedIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm3.5 4.5-7 7 1 1 7-7-1-1Z" />
    </svg>
  )
}

function DotIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor">
      <circle cx="10" cy="10" r="4" />
    </svg>
  )
}
