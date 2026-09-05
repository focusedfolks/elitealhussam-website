import { useMemo, useState, type FormEvent } from 'react'
import { useCms } from '../cms/CmsProvider'
import { submitLead } from '../cms/api'
import { MADINA_HOTEL_OPTIONS, MAKKAH_HOTEL_OPTIONS } from '../content/site'
import { IconLock, IconPhone, IconUsers } from './Icons'
import { formatDisplayDate } from './TravelModeFields'
import { whatsappHref } from '../lib/contact'
import './LeadForm.css'
import './CustomQuoteForm.css'

type Props = {
  id?: string
  title?: string
  subtitle?: string
}

const ROOM_TYPES = [
  { key: 'dbl', label: 'Double (DBL)' },
  { key: 'trpl', label: 'Triple (TRPL)' },
  { key: 'quad', label: 'Quad (QUAD)' },
  { key: 'quint', label: 'Quint (QUINT)' },
] as const

type RoomKey = (typeof ROOM_TYPES)[number]['key']

const SERVICE_FLAGS = [
  {
    key: 'transport',
    label:
      'Transport (Medina airport transfer, Ziyara Makkah, Ziyara Medina, Medina–Makkah transfer, Makkah–Jeddah drop)',
  },
  { key: 'umrahVisa', label: 'Umrah Visa' },
  { key: 'guide', label: 'Guide' },
  { key: 'airTickets', label: 'Air Tickets' },
  { key: 'trainTickets', label: 'Train Tickets' },
] as const

type ServiceKey = (typeof SERVICE_FLAGS)[number]['key']

function todayISO() {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function nightsBetween(checkIn: string, checkOut: string): number | null {
  if (!checkIn || !checkOut) return null
  const start = new Date(`${checkIn}T12:00:00`)
  const end = new Date(`${checkOut}T12:00:00`)
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return null
  const diff = Math.round((end.getTime() - start.getTime()) / 86_400_000)
  return diff >= 0 ? diff : null
}

function qtyLabel(n: number) {
  return String(Math.max(0, Math.floor(n) || 0))
}

export function CustomQuoteForm({
  id = 'quote-request',
  title = 'Request a custom quotation',
  subtitle = 'Share your stay preferences and services — our Dubai team will follow up with pricing. This form does not calculate totals.',
}: Props) {
  const { company } = useCms()
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const [guestName, setGuestName] = useState('')
  const [pax, setPax] = useState(1)
  const [phone, setPhone] = useState('')

  const [makkahHotel, setMakkahHotel] = useState('')
  const [makkahCheckIn, setMakkahCheckIn] = useState('')
  const [makkahCheckOut, setMakkahCheckOut] = useState('')

  const [madinahHotel, setMadinahHotel] = useState('')
  const [madinahCheckIn, setMadinahCheckIn] = useState('')
  const [madinahCheckOut, setMadinahCheckOut] = useState('')

  const [rooms, setRooms] = useState<Record<RoomKey, number>>({
    dbl: 0,
    trpl: 0,
    quad: 0,
    quint: 0,
  })

  const [services, setServices] = useState<Record<ServiceKey, boolean>>({
    transport: false,
    umrahVisa: false,
    guide: false,
    airTickets: false,
    trainTickets: false,
  })
  const [makkahFood, setMakkahFood] = useState(false)
  const [makkahFoodTimes, setMakkahFoodTimes] = useState(0)
  const [madinahFood, setMadinahFood] = useState(false)
  const [madinahFoodTimes, setMadinahFoodTimes] = useState(0)

  const minDate = todayISO()
  const makkahNights = useMemo(
    () => nightsBetween(makkahCheckIn, makkahCheckOut),
    [makkahCheckIn, makkahCheckOut],
  )
  const madinahNights = useMemo(
    () => nightsBetween(madinahCheckIn, madinahCheckOut),
    [madinahCheckIn, madinahCheckOut],
  )

  function mark(name: string) {
    setTouched((prev) => ({ ...prev, [name]: true }))
  }

  function setRoomQty(key: RoomKey, value: string) {
    const n = Math.max(0, Math.min(99, Number(value) || 0))
    setRooms((prev) => ({ ...prev, [key]: n }))
  }

  function buildSummary() {
    const roomLines = ROOM_TYPES.map(
      (r) => `  ${r.label}: ${qtyLabel(rooms[r.key])}`,
    ).join('\n')

    const serviceLines: string[] = []
    for (const s of SERVICE_FLAGS) {
      if (services[s.key]) serviceLines.push(`  [x] ${s.label}`)
    }
    if (makkahFood) {
      serviceLines.push(
        `  [x] Makkah Food (packing food) — ${qtyLabel(makkahFoodTimes)} time(s) per day`,
      )
    }
    if (madinahFood) {
      serviceLines.push(
        `  [x] Madinah Food (packing food) — ${qtyLabel(madinahFoodTimes)} time(s) per day`,
      )
    }
    if (!serviceLines.length) serviceLines.push('  (none selected)')

    return (
      `Custom Quote Request - ELITE ALHUSSAM\n` +
      `------------------------------------\n` +
      `GUEST DETAILS\n` +
      `Guest Name: ${guestName.trim()}\n` +
      `Number of Pax: ${pax}\n` +
      `Phone / Contact: ${phone.trim()}\n` +
      `\n` +
      `MAKKAH STAY\n` +
      `Preferred Hotel — Makkah: ${makkahHotel || '-'}\n` +
      `Check-in: ${makkahCheckIn ? formatDisplayDate(makkahCheckIn) : '-'}\n` +
      `Check-out: ${makkahCheckOut ? formatDisplayDate(makkahCheckOut) : '-'}\n` +
      `Nights: ${makkahNights === null ? '-' : makkahNights}\n` +
      `\n` +
      `MADINAH STAY\n` +
      `Preferred Hotel — Madinah: ${madinahHotel || '-'}\n` +
      `Check-in: ${madinahCheckIn ? formatDisplayDate(madinahCheckIn) : '-'}\n` +
      `Check-out: ${madinahCheckOut ? formatDisplayDate(madinahCheckOut) : '-'}\n` +
      `Nights: ${madinahNights === null ? '-' : madinahNights}\n` +
      `\n` +
      `ROOM CONFIGURATION\n` +
      `${roomLines}\n` +
      `\n` +
      `SERVICES REQUIRED\n` +
      `${serviceLines.join('\n')}\n`
    )
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.checkValidity()) {
      setTouched({ guestName: true, phone: true, pax: true })
      form.reportValidity()
      return
    }

    setStatus('sending')
    const summary = buildSummary()

    void submitLead({
      name: guestName.trim(),
      phone: phone.trim(),
      email: '',
      interest: 'Custom Quote Request',
      travellers: `${pax} Pax`,
      message: summary,
      travel_mode: '',
      departure_date: makkahCheckIn || madinahCheckIn || '',
      departure_airport: '',
      preferred_airline: '',
      departure_city: '',
      pickup_point: '',
    })

    const waText =
      `Assalamu Alaikum, I would like a custom quotation.\n\n` + summary

    window.setTimeout(() => {
      window.open(
        whatsappHref(company.whatsapp, waText),
        '_blank',
        'noopener,noreferrer',
      )
      window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(
        `Custom Quote Request - ${guestName.trim()}`,
      )}&body=${encodeURIComponent(summary)}`
      setStatus('sent')
    }, 450)
  }

  return (
    <section className="lead-section cq-section" id={id}>
      <div className="container">
        <div className="lead-panel cq-panel">
          <div className="lead-copy">
            <p className="eyebrow">Custom quotation</p>
            <h2>{title}</h2>
            <p>{subtitle}</p>
            <ul className="lead-bullets">
              <li>
                <IconUsers size={14} /> Mirrors our staff quotation sheet
              </li>
              <li>
                <IconPhone size={14} /> Human pricing follow-up — no auto totals
              </li>
            </ul>
          </div>

          <form className="lead-form cq-form" onSubmit={onSubmit} noValidate>
            <div className="lead-step" data-step="1">
              <p className="lead-step-label">
                <span>1</span> Guest details
              </p>
              <label className={touched.guestName ? 'is-touched' : ''}>
                Guest Name
                <span className="lead-field">
                  <IconUsers size={15} />
                  <input
                    name="guestName"
                    autoComplete="name"
                    required
                    minLength={2}
                    value={guestName}
                    placeholder="Full name"
                    onChange={(e) => setGuestName(e.target.value)}
                    onBlur={() => mark('guestName')}
                  />
                </span>
              </label>
              <div className="cq-row-2">
                <label className={touched.pax ? 'is-touched' : ''}>
                  Number of Pax
                  <input
                    name="pax"
                    type="number"
                    inputMode="numeric"
                    min={1}
                    max={200}
                    required
                    value={pax}
                    onChange={(e) =>
                      setPax(Math.max(1, Math.min(200, Number(e.target.value) || 1)))
                    }
                    onBlur={() => mark('pax')}
                  />
                </label>
                <label className={touched.phone ? 'is-touched' : ''}>
                  Phone / Contact number
                  <span className="lead-field">
                    <IconPhone size={15} />
                    <input
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      minLength={8}
                      value={phone}
                      placeholder="+971 5X XXX XXXX"
                      onChange={(e) => setPhone(e.target.value)}
                      onBlur={() => mark('phone')}
                    />
                  </span>
                </label>
              </div>
            </div>

            <div className="lead-step" data-step="2">
              <p className="lead-step-label">
                <span>2</span> Makkah stay
              </p>
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
              <div className="cq-row-2">
                <label>
                  Check-in date
                  <input
                    type="date"
                    name="makkahCheckIn"
                    min={minDate}
                    value={makkahCheckIn}
                    onChange={(e) => {
                      const v = e.target.value
                      setMakkahCheckIn(v)
                      if (makkahCheckOut && v && makkahCheckOut < v) {
                        setMakkahCheckOut('')
                      }
                    }}
                  />
                </label>
                <label>
                  Check-out date
                  <input
                    type="date"
                    name="makkahCheckOut"
                    min={makkahCheckIn || minDate}
                    value={makkahCheckOut}
                    onChange={(e) => setMakkahCheckOut(e.target.value)}
                  />
                </label>
              </div>
              <p className="cq-nights" aria-live="polite">
                Nights:{' '}
                <strong>
                  {makkahNights === null ? '—' : makkahNights}
                </strong>
                <span className="cq-nights-hint"> (auto-calculated)</span>
              </p>
            </div>

            <div className="lead-step" data-step="3">
              <p className="lead-step-label">
                <span>3</span> Madinah stay
              </p>
              <label>
                Preferred Hotel — Madinah
                <select
                  name="madinahHotel"
                  value={madinahHotel}
                  onChange={(e) => setMadinahHotel(e.target.value)}
                >
                  <option value="">Select hotel (optional)</option>
                  {MADINA_HOTEL_OPTIONS.map((hotel) => (
                    <option key={hotel} value={hotel}>
                      {hotel}
                    </option>
                  ))}
                </select>
              </label>
              <div className="cq-row-2">
                <label>
                  Check-in date
                  <input
                    type="date"
                    name="madinahCheckIn"
                    min={minDate}
                    value={madinahCheckIn}
                    onChange={(e) => {
                      const v = e.target.value
                      setMadinahCheckIn(v)
                      if (madinahCheckOut && v && madinahCheckOut < v) {
                        setMadinahCheckOut('')
                      }
                    }}
                  />
                </label>
                <label>
                  Check-out date
                  <input
                    type="date"
                    name="madinahCheckOut"
                    min={madinahCheckIn || minDate}
                    value={madinahCheckOut}
                    onChange={(e) => setMadinahCheckOut(e.target.value)}
                  />
                </label>
              </div>
              <p className="cq-nights" aria-live="polite">
                Nights:{' '}
                <strong>
                  {madinahNights === null ? '—' : madinahNights}
                </strong>
                <span className="cq-nights-hint"> (auto-calculated)</span>
              </p>
            </div>

            <div className="lead-step" data-step="4">
              <p className="lead-step-label">
                <span>4</span> Room configuration
              </p>
              <div className="cq-room-grid">
                {ROOM_TYPES.map((room) => (
                  <label key={room.key}>
                    {room.label}
                    <input
                      type="number"
                      inputMode="numeric"
                      min={0}
                      max={99}
                      value={rooms[room.key]}
                      onChange={(e) => setRoomQty(room.key, e.target.value)}
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="lead-step" data-step="5">
              <p className="lead-step-label">
                <span>5</span> Services required
              </p>
              <p className="cq-services-note">
                Tick what to include in your quote — these are not priced on
                this form.
              </p>
              <ul className="cq-services">
                {SERVICE_FLAGS.map((s) => (
                  <li key={s.key}>
                    <label className="cq-check">
                      <input
                        type="checkbox"
                        checked={services[s.key]}
                        onChange={(e) =>
                          setServices((prev) => ({
                            ...prev,
                            [s.key]: e.target.checked,
                          }))
                        }
                      />
                      <span>{s.label}</span>
                    </label>
                  </li>
                ))}
                <li>
                  <label className="cq-check cq-check--food">
                    <input
                      type="checkbox"
                      checked={makkahFood}
                      onChange={(e) => setMakkahFood(e.target.checked)}
                    />
                    <span>Makkah Food (packing food)</span>
                    <input
                      className="cq-food-times"
                      type="number"
                      inputMode="numeric"
                      min={0}
                      max={10}
                      aria-label="Makkah food times per day"
                      disabled={!makkahFood}
                      value={makkahFoodTimes}
                      onChange={(e) =>
                        setMakkahFoodTimes(
                          Math.max(0, Math.min(10, Number(e.target.value) || 0)),
                        )
                      }
                    />
                    <span className="cq-food-unit">times / day</span>
                  </label>
                </li>
                <li>
                  <label className="cq-check cq-check--food">
                    <input
                      type="checkbox"
                      checked={madinahFood}
                      onChange={(e) => setMadinahFood(e.target.checked)}
                    />
                    <span>Madinah Food (packing food)</span>
                    <input
                      className="cq-food-times"
                      type="number"
                      inputMode="numeric"
                      min={0}
                      max={10}
                      aria-label="Madinah food times per day"
                      disabled={!madinahFood}
                      value={madinahFoodTimes}
                      onChange={(e) =>
                        setMadinahFoodTimes(
                          Math.max(0, Math.min(10, Number(e.target.value) || 0)),
                        )
                      }
                    />
                    <span className="cq-food-unit">times / day</span>
                  </label>
                </li>
              </ul>
            </div>

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
                  'Submit quote request'
                )}
              </button>
            </div>

            <div className="lead-trust-row">
              <span>
                <IconLock size={14} /> No prices shown — staff will quote you
                personally
              </span>
            </div>

            {status === 'sent' ? (
              <p className="lead-success" role="status">
                Your quote request has been sent — our team will follow up with
                pricing.
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  )
}
