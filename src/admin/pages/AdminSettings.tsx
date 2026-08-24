import { useEffect, useState, type FormEvent } from 'react'
import { adminSaveSetting, fetchCmsAbout, fetchCmsCompany } from '../../cms/api'
import type { CmsAbout, CmsCompany } from '../../cms/types'

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
