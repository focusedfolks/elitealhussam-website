import {
  AIRLINES,
  AIRPORTS,
  UAE_CITIES,
  type TravelMode,
} from '../content/site'
import './TravelModeFields.css'

export type TravelDetails = {
  mode: TravelMode | ''
  airport: string
  airline: string
  departureCity: string
  pickupPoint: string
  departureDate: string
}

export const emptyTravelDetails = (): TravelDetails => ({
  mode: 'air',
  airport: '',
  airline: '',
  departureCity: '',
  pickupPoint: '',
  departureDate: '',
})

function todayISO() {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function formatDisplayDate(iso: string): string {
  if (!iso) return ''
  try {
    return new Date(`${iso}T12:00:00`).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return iso
  }
}

export function isTravelComplete(
  details: TravelDetails,
  modes: TravelMode[],
): boolean {
  const mode = details.mode || (modes.length === 1 ? modes[0] : '')
  if (!mode || !modes.includes(mode)) return false
  if (!details.departureDate) return false
  if (mode === 'air') return Boolean(details.airport)
  return Boolean(details.departureCity)
}

export function travelSummaryChip(details: TravelDetails): string | null {
  if (!details.mode) return null
  const dateBit = details.departureDate
    ? ` · ${formatDisplayDate(details.departureDate)}`
    : ''
  if (details.mode === 'air') {
    const airport =
      AIRPORTS.find((a) => a.value === details.airport)?.label || details.airport
    return airport ? `By Air · ${airport}${dateBit}` : `By Air${dateBit}`
  }
  return details.departureCity
    ? `By Road · ${details.departureCity}${dateBit}`
    : `By Road${dateBit}`
}

export function formatTravelForMessage(details: TravelDetails): string {
  const dateLine = details.departureDate
    ? `Preferred Departure Date: ${formatDisplayDate(details.departureDate)}\n`
    : ''
  if (!details.mode) return `${dateLine}Travel Mode: Not specified`
  if (details.mode === 'air') {
    const airport =
      AIRPORTS.find((a) => a.value === details.airport)?.label ||
      details.airport ||
      '-'
    const airline = details.airline || 'No preference'
    return (
      `${dateLine}Travel Mode: By Air\nDeparture Airport: ${airport}\nPreferred Airline: ${airline}`
    )
  }
  const pickup = details.pickupPoint || 'To be confirmed'
  return (
    `${dateLine}Travel Mode: By Road\nDeparture: ${details.departureCity || '-'}` +
    `\nPickup Point / Area: ${pickup}\n` +
    `Note: Exact pickup and schedule will be confirmed by ELITE ALHUSSAM.`
  )
}

type Props = {
  modes?: TravelMode[]
  value: TravelDetails
  onChange: (next: TravelDetails) => void
  showError?: boolean
  asFormFields?: boolean
  idPrefix?: string
}

export function TravelModeFields({
  modes = ['air', 'road'],
  value,
  onChange,
  showError = false,
  asFormFields = false,
  idPrefix = 'travel',
}: Props) {
  const mode = value.mode || (modes.length === 1 ? modes[0] : '')
  const incomplete =
    showError && !isTravelComplete({ ...value, mode }, modes)
  const minDate = todayISO()

  function setMode(next: TravelMode) {
    onChange({
      ...value,
      mode: next,
      airport: next === 'air' ? value.airport : '',
      airline: next === 'air' ? value.airline : '',
      departureCity: next === 'road' ? value.departureCity : '',
      pickupPoint: next === 'road' ? value.pickupPoint : '',
    })
  }

  return (
    <div className={`travel-fields${incomplete ? ' is-invalid' : ''}`}>
      <div className="travel-fields-head">
        <strong>Travel Mode & Departure</strong>
        <span>How will you travel to Makkah & Madinah?</span>
      </div>

      {asFormFields ? (
        <input type="hidden" name="travelMode" value={mode} />
      ) : null}

      <div
        className="travel-mode-toggle"
        role="radiogroup"
        aria-label="Travel mode"
      >
        {modes.includes('air') ? (
          <button
            type="button"
            role="radio"
            aria-checked={mode === 'air'}
            className={`travel-mode-btn${mode === 'air' ? ' is-active' : ''}`}
            onClick={() => setMode('air')}
          >
            <span className="travel-mode-icon" aria-hidden="true">
              ✈
            </span>
            By Air
          </button>
        ) : null}
        {modes.includes('road') ? (
          <button
            type="button"
            role="radio"
            aria-checked={mode === 'road'}
            className={`travel-mode-btn${mode === 'road' ? ' is-active' : ''}`}
            onClick={() => setMode('road')}
          >
            <span className="travel-mode-icon" aria-hidden="true">
              🚌
            </span>
            By Road
          </button>
        ) : null}
      </div>

      <label className="travel-date-field" htmlFor={`${idPrefix}-date`}>
        Preferred Departure Date
        <span className="travel-date-wrap">
          <span className="travel-date-icon" aria-hidden="true">
            📅
          </span>
          <input
            id={`${idPrefix}-date`}
            type="date"
            name={asFormFields ? 'departureDate' : undefined}
            required={asFormFields}
            min={minDate}
            value={value.departureDate}
            onChange={(e) =>
              onChange({ ...value, departureDate: e.target.value })
            }
          />
        </span>
      </label>

      {mode === 'air' ? (
        <div className="travel-conditional">
          <label htmlFor={`${idPrefix}-airport`}>
            Departure Airport
            <select
              id={`${idPrefix}-airport`}
              name={asFormFields ? 'departureAirport' : undefined}
              required={asFormFields}
              value={value.airport}
              onChange={(e) =>
                onChange({ ...value, mode: 'air', airport: e.target.value })
              }
            >
              <option value="" disabled>
                Select airport
              </option>
              {AIRPORTS.map((a) => (
                <option key={a.value} value={a.value}>
                  {a.label}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor={`${idPrefix}-airline`}>
            Preferred Airline <em>(optional)</em>
            <select
              id={`${idPrefix}-airline`}
              name={asFormFields ? 'preferredAirline' : undefined}
              value={value.airline}
              onChange={(e) =>
                onChange({ ...value, mode: 'air', airline: e.target.value })
              }
            >
              <option value="">No preference</option>
              {AIRLINES.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </label>
        </div>
      ) : null}

      {mode === 'road' ? (
        <div className="travel-conditional">
          <label htmlFor={`${idPrefix}-city`}>
            Departure Emirate / City
            <select
              id={`${idPrefix}-city`}
              name={asFormFields ? 'departureCity' : undefined}
              required={asFormFields}
              value={value.departureCity}
              onChange={(e) =>
                onChange({
                  ...value,
                  mode: 'road',
                  departureCity: e.target.value,
                })
              }
            >
              <option value="" disabled>
                Select emirate
              </option>
              {UAE_CITIES.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor={`${idPrefix}-pickup`}>
            Pickup Point / Area
            <input
              id={`${idPrefix}-pickup`}
              name={asFormFields ? 'pickupPoint' : undefined}
              value={value.pickupPoint}
              onChange={(e) =>
                onChange({
                  ...value,
                  mode: 'road',
                  pickupPoint: e.target.value,
                })
              }
              placeholder="e.g. Al Nahda, Dubai"
            />
          </label>
          <p className="travel-note">
            Road travel to Makkah &amp; Madinah is organized via coordinated
            group coaches. Our team will confirm your exact pickup point and
            schedule after booking.
          </p>
        </div>
      ) : null}

      {incomplete ? (
        <p className="travel-error" role="alert">
          Please choose travel mode, departure date, and departure details to
          continue.
        </p>
      ) : null}
    </div>
  )
}
