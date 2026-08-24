import { useEffect, useState } from 'react'
import { adminListLeads, adminUpdateLeadStatus } from '../../cms/api'
import type { CmsLead } from '../../cms/types'

export function AdminLeads() {
  const [rows, setRows] = useState<CmsLead[]>([])
  const [error, setError] = useState<string | null>(null)

  async function load() {
    try {
      setRows(await adminListLeads())
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load leads')
    }
  }

  useEffect(() => {
    void load()
  }, [])

  return (
    <>
      <div className="admin-toolbar">
        <p className="admin-muted">
          Enquiries submitted from the website contact form.
        </p>
        <button
          type="button"
          className="admin-btn admin-btn-ghost"
          onClick={() => void load()}
        >
          Refresh
        </button>
      </div>
      {error ? <div className="admin-alert admin-alert-error">{error}</div> : null}
      <div className="admin-card admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>When</th>
              <th>Contact</th>
              <th>Interest</th>
              <th>Travel</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((lead) => (
              <tr key={lead.id}>
                <td>{new Date(lead.created_at).toLocaleString()}</td>
                <td>
                  <strong>{lead.name}</strong>
                  <div className="admin-muted">{lead.phone}</div>
                  <div className="admin-muted">{lead.email}</div>
                </td>
                <td>
                  {lead.interest}
                  <div className="admin-muted">{lead.travellers}</div>
                  {lead.message ? (
                    <div className="admin-muted">{lead.message}</div>
                  ) : null}
                </td>
                <td>
                  <div>{lead.travel_mode || '—'}</div>
                  <div className="admin-muted">{lead.departure_date}</div>
                  <div className="admin-muted">
                    {lead.departure_airport || lead.departure_city}
                  </div>
                </td>
                <td>
                  <select
                    value={lead.status}
                    onChange={async (e) => {
                      const status = e.target.value as CmsLead['status']
                      await adminUpdateLeadStatus(lead.id, status)
                      await load()
                    }}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
                  </select>
                </td>
              </tr>
            ))}
            {!rows.length ? (
              <tr>
                <td colSpan={5} className="admin-muted">
                  No leads yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </>
  )
}
