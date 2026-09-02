import { useMemo, useState, type FormEvent } from 'react'
import { useCms } from '../cms/CmsProvider'
import { submitLead } from '../cms/api'
import {
  FORM_UMRAH_PACKAGE_OPTIONS,
  MADINA_HOTEL_OPTIONS,
  MAKKAH_HOTEL_OPTIONS,
  packageTravelModes,
} from '../content/site'
import {
  IconBuilding,
  IconLock,
  IconMail,
  IconPhone,
  IconSparkle,
  IconUsers,
} from './Icons'
import {
  TravelModeFields,
  emptyTravelDetails,
  formatDisplayDate,
  formatTravelForMessage,
  isTravelComplete,
  type TravelDetails,
} from './TravelModeFields'
import { useI18n } from '../i18n'
import { whatsappHref } from '../lib/contact'
import './LeadForm.css'

type Props = {
  title?: string
  subtitle?: string
  compact?: boolean
  defaultPackage?: string
  defaultTravellers?: string
  defaultTravel?: Partial<TravelDetails>
  id?: string
}

function parseDefaultAdults(defaultTravellers: string): number {
  const match = defaultTravellers.match(/(\d+)\s*Adult/i)
  if (match) return Math.max(1, Number(match[1]))
  return 1
}

function formatTravellersLabel(adults: number, children: number): string {
  const parts = [`${adults} Adult${adults === 1 ? '' : 's'}`]
  if (children > 0) {
    parts.push(`${children} Child${children === 1 ? '' : 'ren'}`)
  }
  return parts.join(', ')
}

function formatTripPreferencesForMessage(opts: {
  makkahHotel: string
  madinaHotel: string
  makkahCheckIn: string
  madinaCheckIn: string
}): string {
  const lines: string[] = []
  if (opts.makkahHotel) lines.push(`Preferred Hotel — Makkah: ${opts.makkahHotel}`)
  if (opts.madinaHotel) lines.push(`Preferred Hotel — Madina: ${opts.madinaHotel}`)
  if (opts.makkahCheckIn) {
    lines.push(
      `Makkah check-in: ${formatDisplayDate(opts.makkahCheckIn)}`,
    )
  }
  if (opts.madinaCheckIn) {
    lines.push(
      `Madina check-in: ${formatDisplayDate(opts.madinaCheckIn)}`,
    )
  }
  return lines.length ? lines.join('\n') : ''
}

function todayISO() {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function LeadForm({
  title,
  subtitle,
  compact = false,
  defaultPackage = '',
  defaultTravellers = '',
  defaultTravel,
  id = 'lead-form',
}: Props) {
  const { t } = useI18n()
  const { company, packages: allPackages } = useCms()
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [interest, setInterest] = useState(defaultPackage)
  const [adults, setAdults] = useState(() =>
    parseDefaultAdults(defaultTravellers),
  )
  const [children, setChildren] = useState(0)
  const [makkahHotel, setMakkahHotel] = useState('')
  const [madinaHotel, setMadinaHotel] = useState('')
  const [makkahCheckIn, setMakkahCheckIn] = useState('')
  const [madinaCheckIn, setMadinaCheckIn] = useState('')
  const [travel, setTravel] = useState<TravelDetails>(() => ({
    ...emptyTravelDetails(),
    ...defaultTravel,
    mode: defaultTravel?.mode || 'air',
  }))
  const [travelTouched, setTravelTouched] = useState(false)
  const minDate = todayISO()

  const travellersLabel = formatTravellersLabel(adults, children)

  const selectedPkg = useMemo(
    () => allPackages.find((pkg) => pkg.title === interest),
    [interest, allPackages],
  )
  const modes = selectedPkg ? packageTravelModes(selectedPkg) : (['air', 'road'] as const)

  function mark(name: string) {
    setTouched((prev) => ({ ...prev, [name]: true }))
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const travelOk = isTravelComplete(travel, [...modes])
    if (!form.checkValidity() || !travelOk) {
      setTouched({
        name: true,
        phone: true,
        email: true,
        interest: true,
      })
      setTravelTouched(true)
      form.reportValidity()
      return
    }

    setStatus('sending')
    const data = new FormData(form)
    const name = String(data.get('name') || '')
    const phone = String(data.get('phone') || '')
    const email = String(data.get('email') || '')
    const packageInterest = String(data.get('interest') || '')
    const travellers = String(data.get('travellers') || travellersLabel)
    const messageInput = String(data.get('message') || '')
    const travelBlock = formatTravelForMessage(travel)
    const tripBlock = formatTripPreferencesForMessage({
      makkahHotel,
      madinaHotel,
      makkahCheckIn,
      madinaCheckIn,
    })
    const message = [messageInput, tripBlock].filter(Boolean).join('\n\n')

    void submitLead({
      name,
      phone,
      email,
      interest: packageInterest,
      travellers,
      message,
      travel_mode: travel.mode || '',
      departure_date: travel.departureDate || '',
      departure_airport: travel.airport || '',
      preferred_airline: travel.airline || '',
      departure_city: travel.departureCity || '',
      pickup_point: travel.pickupPoint || '',
    })

    const body =
      `New Website Lead - ELITE ALHUSSAM\n` +
      `----------------------------\n` +
      `Name: ${name}\n` +
      `Phone: ${phone}\n` +
      `Email: ${email}\n` +
      `Package interest: ${packageInterest}\n` +
      `Travellers: ${travellers}\n` +
      `${tripBlock ? `${tripBlock}\n` : ''}` +
      `${travelBlock}\n` +
      `Message: ${messageInput || '-'}\n`

    const waText = encodeURIComponent(
      `Assalamu Alaikum, I want a package quote.\n` +
        `Name: ${name}\n` +
        `Phone: ${phone}\n` +
        `Interest: ${packageInterest}\n` +
        `Travellers: ${travellers}\n` +
        `${tripBlock ? `${tripBlock}\n` : ''}` +
        `${travelBlock}\n` +
        `${messageInput}`,
    )

    window.setTimeout(() => {
      window.open(
        whatsappHref(company.whatsapp, decodeURIComponent(waText)),
        '_blank',
        'noopener,noreferrer',
      )

      window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(
        `Lead: ${packageInterest || 'Hajj/Umrah'} quote - ${name}`,
      )}&body=${encodeURIComponent(body)}`

      setStatus('sent')
    }, 450)
  }

  return (
    <section className={`lead-section${compact ? ' is-compact' : ''}`} id={id}>
      <div className={compact ? undefined : 'container'}>
        <div className="lead-panel">
          <div className="lead-copy">
            <p className="eyebrow">{t.common.enquire}</p>
            <h2>{title ?? t.common.leadTitle}</h2>
            <p>{subtitle ?? t.common.leadSubtitle}</p>
            <ul className="lead-bullets">
              <li>
                <IconSparkle size={14} /> {t.common.years} of trusted service
              </li>
              <li>
                <IconBuilding size={14} /> Dubai, UAE office support
              </li>
              <li>
                <IconUsers size={14} /> Free package consultation
              </li>
              <li>
                <IconPhone size={14} /> Reply within business hours
              </li>
            </ul>
          </div>

          <form className="lead-form" onSubmit={onSubmit} noValidate>
            <div className="lead-step" data-step="1">
              <p className="lead-step-label">
                <span>1</span> Your details
              </p>
              <label className={touched.name ? 'is-touched' : ''}>
                {t.common.name}
                <span className="lead-field">
                  <IconUsers size={15} />
                  <input
                    name="name"
                    autoComplete="name"
                    required
                    minLength={2}
                    placeholder="Your full name"
                    onBlur={() => mark('name')}
                  />
                </span>
              </label>
              <label className={touched.phone ? 'is-touched' : ''}>
                {t.common.phone}
                <span className="lead-field">
                  <IconPhone size={15} />
                  <input
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    minLength={8}
                    placeholder="+971 5X XXX XXXX"
                    onBlur={() => mark('phone')}
                  />
                </span>
              </label>
              <label className={touched.email ? 'is-touched' : ''}>
                {t.common.email}
                <span className="lead-field">
                  <IconMail size={15} />
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="you@email.com"
                    onBlur={() => mark('email')}
                  />
                </span>
              </label>
            </div>

            <div className="lead-step" data-step="2">
              <p className="lead-step-label">
                <span>2</span> Trip preferences
              </p>
              <label className={touched.interest ? 'is-touched' : ''}>
                {t.common.packageInterest}
                <select
                  name="interest"
                  value={interest}
                  required
                  onChange={(e) => {
                    setInterest(e.target.value)
                    const pkg = allPackages.find((p) => p.title === e.target.value)
                    const nextModes = pkg
                      ? packageTravelModes(pkg)
                      : (['air', 'road'] as const)
                    if (travel.mode && !nextModes.includes(travel.mode)) {
                      setTravel({
                        ...emptyTravelDetails(),
                        mode: nextModes[0],
                      })
                    }
                  }}
                  onBlur={() => mark('interest')}
                >
                  <option value="" disabled>
                    Select package
                  </option>
                  <option value="Hajj - General">Hajj - General enquiry</option>
                  <option value="Umrah - General">Umrah - General enquiry</option>
                  {FORM_UMRAH_PACKAGE_OPTIONS.map((label) => (
                    <option key={label} value={label}>
                      {label}
                    </option>
                  ))}
                  {allPackages.map((pkg) => (
                    <option key={pkg.id} value={pkg.title}>
                      {pkg.title}
                    </option>
                  ))}
                </select>
              </label>

              <div className="lead-travellers">
                <span className="lead-travellers-label">{t.common.travellers}</span>
                <div className="lead-stepper-row">
                  <span>Adults</span>
                  <div className="lead-stepper">
                    <button
                      type="button"
                      aria-label="Decrease adults"
                      disabled={adults <= 1}
                      onClick={() => setAdults((n) => Math.max(1, n - 1))}
                    >
                      −
                    </button>
                    <output aria-live="polite">{adults}</output>
                    <button
                      type="button"
                      aria-label="Increase adults"
                      onClick={() => setAdults((n) => n + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="lead-stepper-row">
                  <span>Children</span>
                  <div className="lead-stepper">
                    <button
                      type="button"
                      aria-label="Decrease children"
                      disabled={children <= 0}
                      onClick={() => setChildren((n) => Math.max(0, n - 1))}
                    >
                      −
                    </button>
                    <output aria-live="polite">{children}</output>
                    <button
                      type="button"
                      aria-label="Increase children"
                      onClick={() => setChildren((n) => n + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <input type="hidden" name="travellers" value={travellersLabel} />
              </div>

              <label>
                Preferred Hotel — Makkah
                <select
                  name="makkahHotel"
                  value={makkahHotel}
                  onChange={(e) => setMakkahHotel(e.target.value)}
                >
                  <option value="">Select hotel (optional)</option>
                  {MAKKAH_HOTEL_OPTIONS.map((hotel) => (
                    <option key={hotel} value={hotel}>
                      {hotel}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Preferred Hotel — Madina
                <select
                  name="madinaHotel"
                  value={madinaHotel}
                  onChange={(e) => setMadinaHotel(e.target.value)}
                >
                  <option value="">Select hotel (optional)</option>
                  {MADINA_HOTEL_OPTIONS.map((hotel) => (
                    <option key={hotel} value={hotel}>
                      {hotel}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Makkah check-in date
                <input
                  type="date"
                  name="makkahCheckIn"
                  min={minDate}
                  value={makkahCheckIn}
                  onChange={(e) => setMakkahCheckIn(e.target.value)}
                />
              </label>
              <label>
                Madina check-in date
                <input
                  type="date"
                  name="madinaCheckIn"
                  min={minDate}
                  value={madinaCheckIn}
                  onChange={(e) => setMadinaCheckIn(e.target.value)}
                />
              </label>
            </div>

            <div className="lead-step" data-step="3">
              <p className="lead-step-label">
                <span>3</span> Travel mode & departure
              </p>
              <TravelModeFields
                modes={[...modes]}
                value={travel}
                onChange={setTravel}
                showError={travelTouched}
                asFormFields
                idPrefix={`${id}-travel`}
              />
            </div>

            {!compact ? (
              <div className="lead-step" data-step="4">
                <p className="lead-step-label">
                  <span>4</span> Message
                </p>
                <label>
                  {t.common.message}
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Preferred dates or notes (optional)"
                  />
                </label>
              </div>
            ) : (
              <input type="hidden" name="message" value="" />
            )}

            <p className="lead-social-proof">
              Join 500+ families who booked with confidence
            </p>

            <div className="lead-actions">
              <button
                className={`btn btn-gold lead-submit${status === 'sending' ? ' is-loading' : ''}`}
                type="submit"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? (
                  <>
                    <span className="lead-spinner" aria-hidden="true" />
                    Sending…
                  </>
                ) : (
                  t.common.requestQuote
                )}
              </button>
            </div>

            <div className="lead-trust-row">
              <span>
                <IconLock size={14} /> Your details are safe with us
              </span>
            </div>

            <p className="lead-privacy">
              By submitting, you agree to be contacted by ELITE ALHUSSAM via
              phone, WhatsApp, or email.
            </p>
            {status === 'sent' ? (
              <p className="lead-success" role="status">
                {t.common.leadSuccess}
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  )
}
