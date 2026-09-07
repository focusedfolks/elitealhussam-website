import { useState, type FormEvent } from 'react'
import { useCms } from '../cms/CmsProvider'
import { submitLead } from '../cms/api'
import { PREFERRED_MONTHS } from '../content/internationalTours'
import { whatsappHref } from '../lib/contact'
import './TourEnquiryForm.css'

type Props = {
  packageTitle: string
  packageSlug: string
}

export function TourEnquiryForm({ packageTitle, packageSlug }: Props) {
  const { company } = useCms()
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [month, setMonth] = useState('')
  const [travellers, setTravellers] = useState(2)

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    setStatus('sending')
    const summary =
      `International Tour Enquiry - ELITE ALHUSSAM\n` +
      `------------------------------------------\n` +
      `Package: ${packageTitle}\n` +
      `Slug: ${packageSlug}\n` +
      `Name: ${name.trim()}\n` +
      `Phone: ${phone.trim()}\n` +
      `Preferred Month: ${month}\n` +
      `Number of Travelers: ${travellers}\n`

    void submitLead({
      name: name.trim(),
      phone: phone.trim(),
      email: '',
      interest: `International Tour: ${packageTitle}`,
      travellers: `${travellers} Travelers`,
      message: summary,
      travel_mode: '',
      departure_date: month,
      departure_airport: '',
      preferred_airline: '',
      departure_city: '',
      pickup_point: '',
    })

    window.setTimeout(() => {
      window.open(
        whatsappHref(
          company.whatsapp,
          `Assalamu Alaikum, I would like to enquire about:\n${packageTitle}\n\n${summary}`,
        ),
        '_blank',
        'noopener,noreferrer',
      )
      window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(
        `Tour Enquiry: ${packageTitle} - ${name.trim()}`,
      )}&body=${encodeURIComponent(summary)}`
      setStatus('sent')
    }, 450)
  }

  return (
    <aside className="tour-enquire" aria-label="Package enquiry">
      <h2>Enquire about this package</h2>
      <p>
        Share your details — our Dubai team will follow up with availability and
        pricing. Nothing is live-bookable online yet.
      </p>
      <form className="tour-enquire-form" onSubmit={onSubmit} noValidate>
        <label>
          Name
          <input
            name="name"
            required
            minLength={2}
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
          />
        </label>
        <label>
          Phone
          <input
            name="phone"
            type="tel"
            required
            minLength={8}
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+971 5X XXX XXXX"
          />
        </label>
        <label>
          Preferred Month
          <select
            name="month"
            required
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            <option value="" disabled>
              Select month
            </option>
            {PREFERRED_MONTHS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </label>
        <label>
          Number of Travelers
          <input
            name="travellers"
            type="number"
            min={1}
            max={100}
            required
            value={travellers}
            onChange={(e) =>
              setTravellers(Math.max(1, Math.min(100, Number(e.target.value) || 1)))
            }
          />
        </label>
        <button
          type="submit"
          className="tour-enquire-submit"
          disabled={status === 'sending'}
        >
          {status === 'sending' ? 'Sending…' : 'Submit enquiry'}
        </button>
      </form>
      {status === 'sent' ? (
        <p className="tour-enquire-success" role="status">
          Your enquiry has been sent — our team will follow up shortly.
        </p>
      ) : null}
    </aside>
  )
}
