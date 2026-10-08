import { useEffect, useState, type FormEvent } from 'react'
import {
  adminSaveSetting,
  fetchCmsAbout,
  fetchCmsCompany,
  fetchCmsHome,
} from '../../cms/api'
import { homeCopy } from '../../content/site'
import type { CmsAbout, CmsCompany, CmsHome } from '../../cms/types'

export function AdminCompany() {
  const [form, setForm] = useState<CmsCompany | null>(null)
  const [phones, setPhones] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    ;(async () => {
      try {
        const company = await fetchCmsCompany()
        setForm(company)
        setPhones(company.phones.join('\n'))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load')
      }
    })()
  }, [])

  if (!form) {
    return error ? (
      <div className="admin-alert admin-alert-error">{error}</div>
    ) : (
      <p className="admin-muted">Loading…</p>
    )
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!form) return
    setMessage(null)
    try {
      await adminSaveSetting('company', {
        ...form,
        phones: phones
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean),
      })
      setMessage('Company details saved')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed')
    }
  }

  return (
    <form className="admin-card admin-form" onSubmit={onSubmit}>
      <h2>Company details</h2>
      {error ? <div className="admin-alert admin-alert-error">{error}</div> : null}
      {message ? <div className="admin-alert admin-alert-ok">{message}</div> : null}
      <div className="admin-form-grid">
        <div className="admin-field">
          <label>Short name</label>
          <input
            value={form.shortName}
            onChange={(e) => setForm({ ...form, shortName: e.target.value })}
          />
        </div>
        <div className="admin-field">
          <label>Legal name</label>
          <input
            value={form.legalName}
            onChange={(e) => setForm({ ...form, legalName: e.target.value })}
          />
        </div>
        <div className="admin-field">
          <label>Email</label>
          <input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div className="admin-field">
          <label>WhatsApp (digits)</label>
          <input
            value={form.whatsapp}
            onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
          />
        </div>
        <div className="admin-field full">
          <label>Phones (one per line)</label>
          <textarea value={phones} onChange={(e) => setPhones(e.target.value)} />
        </div>
        <div className="admin-field full">
          <label>Address</label>
          <textarea
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
        </div>
        <div className="admin-field full">
          <label>Positioning</label>
          <textarea
            value={form.positioning}
            onChange={(e) => setForm({ ...form, positioning: e.target.value })}
          />
        </div>
        <div className="admin-field">
          <label>Facebook URL</label>
          <input
            value={form.social.facebook}
            onChange={(e) =>
              setForm({
                ...form,
                social: { ...form.social, facebook: e.target.value },
              })
            }
          />
        </div>
        <div className="admin-field">
          <label>YouTube URL</label>
          <input
            value={form.social.youtube}
            onChange={(e) =>
              setForm({
                ...form,
                social: { ...form.social, youtube: e.target.value },
              })
            }
          />
        </div>
      </div>
      <button className="admin-btn admin-btn-primary" type="submit">
        Save company
      </button>
    </form>
  )
}

export function AdminAbout() {
  const [form, setForm] = useState<CmsAbout | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    ;(async () => {
      try {
        setForm(await fetchCmsAbout())
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load')
      }
    })()
  }, [])

  if (!form) {
    return error ? (
      <div className="admin-alert admin-alert-error">{error}</div>
    ) : (
      <p className="admin-muted">Loading…</p>
    )
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!form) return
    setMessage(null)
    try {
      await adminSaveSetting('about', form)
      setMessage('About copy saved')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed')
    }
  }

  return (
    <form className="admin-card admin-form" onSubmit={onSubmit}>
      <h2>About page copy</h2>
      {error ? <div className="admin-alert admin-alert-error">{error}</div> : null}
      {message ? <div className="admin-alert admin-alert-ok">{message}</div> : null}
      {(
        [
          ['intro', 'Intro'],
          ['legacy', 'Legacy'],
          ['profile', 'Profile'],
          ['india', 'India story'],
          ['leadership', 'Leadership'],
        ] as const
      ).map(([key, label]) => (
        <div className="admin-field" key={key}>
          <label>{label}</label>
          <textarea
            value={form[key]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          />
        </div>
      ))}
      <button className="admin-btn admin-btn-primary" type="submit">
        Save about copy
      </button>
    </form>
  )
}

const HOME_FIELDS: readonly (readonly [keyof CmsHome, string, string])[] = [
  ['totalPilgrims', 'Total pilgrims served', 'e.g. 20,000+'],
  ['hajjPilgrims', 'Hajj pilgrims', 'e.g. 5,000+'],
  ['umrahPilgrims', 'Umrah pilgrims', 'e.g. 15,000+'],
  ['years', 'Years of experience', 'e.g. 45+'],
  ['familiesServed', 'Families served', 'e.g. 500+'],
  ['ratingScore', 'Average rating (out of 5)', 'e.g. 4.9'],
  ['reviewCount', 'Number of reviews', 'e.g. 200+'],
  ['supportLabel', 'Support label', 'e.g. Pilgrim Support on Journey'],
]

export function AdminHome() {
  const [form, setForm] = useState<CmsHome | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    ;(async () => {
      try {
        setForm(await fetchCmsHome())
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load')
      }
    })()
  }, [])

  if (!form) {
    return error ? (
      <div className="admin-alert admin-alert-error">{error}</div>
    ) : (
      <p className="admin-muted">Loading…</p>
    )
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!form) return
    setMessage(null)
    setError(null)
    try {
      await adminSaveSetting('home', form)
      setMessage('Home section saved')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed')
    }
  }

  return (
    <form className="admin-card admin-form" onSubmit={onSubmit}>
      <h2>Home section</h2>
      <p className="admin-muted">
        Numbers and text shown in the home page hero and trust strip. Include
        the “+” yourself, e.g. 20,000+.
      </p>
      {error ? <div className="admin-alert admin-alert-error">{error}</div> : null}
      {message ? <div className="admin-alert admin-alert-ok">{message}</div> : null}
      <div className="admin-field">
        <label>Quote line</label>
        <textarea
          value={form.quote}
          onChange={(e) => setForm({ ...form, quote: e.target.value })}
        />
      </div>
      <div className="admin-form-grid">
        {HOME_FIELDS.map(([key, label, placeholder]) => (
          <div className="admin-field" key={key}>
            <label>{label}</label>
            <input
              value={form[key]}
              placeholder={placeholder}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            />
          </div>
        ))}
      </div>
      <div className="admin-actions">
        <button className="admin-btn admin-btn-primary" type="submit">
          Save home section
        </button>
        <button
          className="admin-btn"
          type="button"
          onClick={() => setForm({ ...homeCopy })}
        >
          Reset to defaults
        </button>
      </div>
    </form>
  )
}
