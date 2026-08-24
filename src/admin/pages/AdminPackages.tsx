import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  adminDeletePackage,
  adminListPackages,
  adminUpsertPackage,
} from '../../cms/api'
import type { TravelPackage } from '../../content/site'

const emptyPackage = (): TravelPackage & {
  published: boolean
  sortOrder: number
} => ({
  id: '',
  category: 'umrah',
  title: '',
  tag: '',
  season: '',
  summary: '',
  locations: 'Makkah • Madinah',
  duration: '',
  image: '/images/theme-hero.webp',
  pricing: {
    adult: 0,
    child: 0,
    infant: 0,
    currency: 'INR',
    note: 'Starting from · per person',
  },
  features: [],
  highlights: [],
  amenities: [
    { key: 'hotel', title: 'Hotel', subtitle: 'Stay' },
    { key: 'transport', title: 'Transport', subtitle: 'Transfers' },
    { key: 'meals', title: 'Meals', subtitle: 'Included' },
    { key: 'support', title: 'Support', subtitle: '24/7' },
    { key: 'visa', title: 'Visa', subtitle: 'Help' },
  ],
  availableTravelModes: ['air', 'road'],
  popular: false,
  featured: false,
  published: true,
  sortOrder: 0,
})

export function AdminPackagesList() {
  const [rows, setRows] = useState<
    (TravelPackage & { published?: boolean; sortOrder?: number })[]
  >([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  async function load() {
    try {
      setLoading(true)
      setRows(await adminListPackages())
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load packages')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void load()
  }, [])

  return (
    <>
      <div className="admin-toolbar">
        <p className="admin-muted">Manage Hajj & Umrah packages and pricing.</p>
        <Link className="admin-btn admin-btn-primary" to="/admin/packages/new">
          Add package
        </Link>
      </div>
      {error ? <div className="admin-alert admin-alert-error">{error}</div> : null}
      {loading ? (
        <div className="admin-card">
          <p className="admin-muted">Loading packages…</p>
        </div>
      ) : null}
      {!loading ? (
      <div className="admin-card admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Adult (INR)</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {rows.map((pkg) => (
              <tr key={pkg.id}>
                <td>
                  <strong>{pkg.title}</strong>
                  <div className="admin-muted">{pkg.id}</div>
                </td>
                <td>{pkg.category}</td>
                <td>{pkg.pricing.adult.toLocaleString('en-IN')}</td>
                <td>
                  <span
                    className={`admin-badge ${pkg.published === false ? 'admin-badge-muted' : 'admin-badge-ok'}`}
                  >
                    {pkg.published === false ? 'Draft' : 'Live'}
                  </span>
                </td>
                <td>
                  <div className="admin-actions">
                    <Link
                      className="admin-btn admin-btn-ghost"
                      to={`/admin/packages/${pkg.id}`}
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      className="admin-btn admin-btn-danger"
                      onClick={async () => {
                        if (!confirm(`Delete ${pkg.title}?`)) return
                        await adminDeletePackage(pkg.id)
                        await load()
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      ) : null}
    </>
  )
}

export function AdminPackageEdit() {
  const { id } = useParams()
  const isNew = id === 'new'
  const navigate = useNavigate()
  const [form, setForm] = useState(emptyPackage())
  const [featuresText, setFeaturesText] = useState('')
  const [highlightsText, setHighlightsText] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isNew) return
    ;(async () => {
      try {
        const rows = await adminListPackages()
        const found = rows.find((p) => p.id === id)
        if (!found) {
          setError('Package not found')
          return
        }
        setForm({
          ...emptyPackage(),
          ...found,
          published: found.published !== false,
          sortOrder: found.sortOrder ?? 0,
        })
        setFeaturesText(found.features.join('\n'))
        setHighlightsText(found.highlights.join('\n'))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load')
      }
    })()
  }, [id, isNew])

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setMessage(null)
    try {
      await adminUpsertPackage({
        ...form,
        features: featuresText
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean),
        highlights: highlightsText
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean),
      })
      setMessage('Package saved')
      if (isNew) navigate(`/admin/packages/${form.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed')
    }
  }

  return (
    <form className="admin-card admin-form" onSubmit={onSubmit}>
      <div className="admin-toolbar">
        <h2>{isNew ? 'New package' : 'Edit package'}</h2>
        <Link className="admin-btn admin-btn-ghost" to="/admin/packages">
          Back
        </Link>
      </div>
      {error ? <div className="admin-alert admin-alert-error">{error}</div> : null}
      {message ? <div className="admin-alert admin-alert-ok">{message}</div> : null}

      <div className="admin-form-grid">
        <div className="admin-field">
          <label>ID (slug)</label>
          <input
            required
            disabled={!isNew}
            value={form.id}
            onChange={(e) => setForm({ ...form, id: e.target.value.trim() })}
          />
        </div>
        <div className="admin-field">
          <label>Category</label>
          <select
            value={form.category}
            onChange={(e) =>
              setForm({
                ...form,
                category: e.target.value as TravelPackage['category'],
              })
            }
          >
            <option value="hajj">Hajj</option>
            <option value="umrah">Umrah</option>
          </select>
        </div>
        <div className="admin-field">
          <label>Title</label>
          <input
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>
        <div className="admin-field">
          <label>Tag</label>
          <input
            value={form.tag}
            onChange={(e) => setForm({ ...form, tag: e.target.value })}
          />
        </div>
        <div className="admin-field">
          <label>Season</label>
          <input
            value={form.season}
            onChange={(e) => setForm({ ...form, season: e.target.value })}
          />
        </div>
        <div className="admin-field">
          <label>Duration</label>
          <input
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
          />
        </div>
        <div className="admin-field full">
          <label>Summary</label>
          <textarea
            value={form.summary}
            onChange={(e) => setForm({ ...form, summary: e.target.value })}
          />
        </div>
        <div className="admin-field">
          <label>Locations</label>
          <input
            value={form.locations}
            onChange={(e) => setForm({ ...form, locations: e.target.value })}
          />
        </div>
        <div className="admin-field">
          <label>Image path</label>
          <input
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />
        </div>
        <div className="admin-field">
          <label>Adult price (INR)</label>
          <input
            type="number"
            value={form.pricing.adult}
            onChange={(e) =>
              setForm({
                ...form,
                pricing: { ...form.pricing, adult: Number(e.target.value) },
              })
            }
          />
        </div>
        <div className="admin-field">
          <label>Child price (INR)</label>
          <input
            type="number"
            value={form.pricing.child}
            onChange={(e) =>
              setForm({
                ...form,
                pricing: { ...form.pricing, child: Number(e.target.value) },
              })
            }
          />
        </div>
        <div className="admin-field">
          <label>Infant price (INR)</label>
          <input
            type="number"
            value={form.pricing.infant}
            onChange={(e) =>
              setForm({
                ...form,
                pricing: { ...form.pricing, infant: Number(e.target.value) },
              })
            }
          />
        </div>
        <div className="admin-field">
          <label>Price note</label>
          <input
            value={form.pricing.note || ''}
            onChange={(e) =>
              setForm({
                ...form,
                pricing: { ...form.pricing, note: e.target.value },
              })
            }
          />
        </div>
        <div className="admin-field">
          <label>Features (one per line)</label>
          <textarea
            value={featuresText}
            onChange={(e) => setFeaturesText(e.target.value)}
          />
        </div>
        <div className="admin-field">
          <label>Highlights (one per line)</label>
          <textarea
            value={highlightsText}
            onChange={(e) => setHighlightsText(e.target.value)}
          />
        </div>
        <div className="admin-field">
          <label>Sort order</label>
          <input
            type="number"
            value={form.sortOrder}
            onChange={(e) =>
              setForm({ ...form, sortOrder: Number(e.target.value) })
            }
          />
        </div>
        <div className="admin-field">
          <label className="admin-check">
            <input
              type="checkbox"
              checked={form.popular}
              onChange={(e) => setForm({ ...form, popular: e.target.checked })}
            />
            Popular
          </label>
          <label className="admin-check">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            />
            Featured
          </label>
          <label className="admin-check">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) =>
                setForm({ ...form, published: e.target.checked })
              }
            />
            Published
          </label>
        </div>
      </div>

      <div className="admin-actions">
        <button className="admin-btn admin-btn-primary" type="submit">
          Save package
        </button>
      </div>
    </form>
  )
}
