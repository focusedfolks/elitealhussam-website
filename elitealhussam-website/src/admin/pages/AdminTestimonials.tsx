import { useEffect, useState, type FormEvent } from 'react'
import {
  adminDeleteTestimonial,
  adminListTestimonials,
  adminUpsertTestimonial,
} from '../../cms/api'
import type { CmsTestimonial } from '../../cms/types'

const emptyItem = (): CmsTestimonial => ({
  name: '',
  place: '',
  quote: '',
  published: true,
  sortOrder: 0,
})

export function AdminTestimonials() {
  const [rows, setRows] = useState<CmsTestimonial[]>([])
  const [form, setForm] = useState(emptyItem())
  const [editingId, setEditingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  async function load() {
    try {
      setRows(await adminListTestimonials())
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load')
    }
  }

  useEffect(() => {
    void load()
  }, [])

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setMessage(null)
    try {
      await adminUpsertTestimonial({
        ...form,
        id: editingId || undefined,
      })
      setForm(emptyItem())
      setEditingId(null)
      setMessage('Saved')
      await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed')
    }
  }

  return (
    <>
      {error ? <div className="admin-alert admin-alert-error">{error}</div> : null}
      {message ? <div className="admin-alert admin-alert-ok">{message}</div> : null}

      <form className="admin-card admin-form" onSubmit={onSubmit}>
        <h2>{editingId ? 'Edit testimonial' : 'Add testimonial'}</h2>
        <div className="admin-form-grid">
          <div className="admin-field">
            <label>Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="admin-field">
            <label>Place / label</label>
            <input
              value={form.place}
              onChange={(e) => setForm({ ...form, place: e.target.value })}
            />
          </div>
          <div className="admin-field full">
            <label>Quote</label>
            <textarea
              required
              value={form.quote}
              onChange={(e) => setForm({ ...form, quote: e.target.value })}
            />
          </div>
          <div className="admin-field">
            <label>Sort order</label>
            <input
              type="number"
              value={form.sortOrder ?? 0}
              onChange={(e) =>
                setForm({ ...form, sortOrder: Number(e.target.value) })
              }
            />
          </div>
          <div className="admin-field">
            <label className="admin-check">
              <input
                type="checkbox"
                checked={form.published !== false}
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
            {editingId ? 'Update' : 'Add'}
          </button>
          {editingId ? (
            <button
              type="button"
              className="admin-btn admin-btn-ghost"
              onClick={() => {
                setEditingId(null)
                setForm(emptyItem())
              }}
            >
              Cancel
            </button>
          ) : null}
        </div>
      </form>

      <div className="admin-card admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Quote</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>
                  <strong>{row.name}</strong>
                  <div className="admin-muted">{row.place}</div>
                </td>
                <td>{row.quote}</td>
                <td>
                  <div className="admin-actions">
                    <button
                      type="button"
                      className="admin-btn admin-btn-ghost"
                      onClick={() => {
                        setEditingId(row.id || null)
                        setForm(row)
                      }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="admin-btn admin-btn-danger"
                      onClick={async () => {
                        if (!row.id || !confirm('Delete this testimonial?'))
                          return
                        await adminDeleteTestimonial(row.id)
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
    </>
  )
}
