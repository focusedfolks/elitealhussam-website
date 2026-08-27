import { useMemo, useState, type FormEvent } from 'react'
import { useCms } from '../cms/CmsProvider'
import { submitLead } from '../cms/api'
import { packageTravelModes } from '../content/site'
import {
  IconBuilding,
  IconLock,
  IconMail,
  IconPhone,
  IconSparkle,
  IconUsers,
  IconWhatsApp,
} from './Icons'
import {
  TravelModeFields,
  emptyTravelDetails,
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
  const [travel, setTravel] = useState<TravelDetails>(() => ({
    ...emptyTravelDetails(),
    ...defaultTravel,
    mode: defaultTravel?.mode || 'air',
  }))
  const [travelTouched, setTravelTouched] = useState(false)

  const selectedPkg = useMemo(
    () => allPackages.find((pkg) => pkg.title === interest),
    [interest, allPackages],
  )
  const modes = selectedPkg ? packageTravelModes(selectedPkg) : (['air', 'road'] as const)

  const waHref = whatsappHref(
    company.whatsapp,
    'Assalamu Alaikum, I want a package quote.',
  )

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
    const travellers = String(data.get('travellers') || '')
    const message = String(data.get('message') || '')
    const travelBlock = formatTravelForMessage(travel)

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
      `${travelBlock}\n` +
      `Message: ${message}\n`

    const waText = encodeURIComponent(
      `Assalamu Alaikum, I want a package quote.\n` +
        `Name: ${name}\n` +
        `Phone: ${phone}\n` +
        `Interest: ${packageInterest}\n` +
        `Travellers: ${travellers}\n` +
        `${travelBlock}\n` +
        `${message}`,
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
            <p className="eyebrow">{t.common.getQuote}</p>
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
                    placeholder="+971 56 574 6678"
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
                  {allPackages.map((pkg) => (
                    <option key={pkg.id} value={pkg.title}>
                      {pkg.title}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                {t.common.travellers}
                <input
                  name="travellers"
                  defaultValue={defaultTravellers}
                  placeholder="e.g. 2 Adults, 1 Child, 1 Infant"
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
              <a className="lead-wa-alt" href={waHref} target="_blank" rel="noreferrer">
                <IconWhatsApp size={16} /> WhatsApp us
              </a>
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
