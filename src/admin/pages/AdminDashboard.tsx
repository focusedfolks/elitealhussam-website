import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  adminListBlogPosts,
  adminListLeads,
  adminListPackages,
  adminListTestimonials,
  fetchCmsAbout,
  fetchCmsCompany,
} from '../../cms/api'
import type { CmsAbout, CmsBlogPost, CmsCompany, CmsLead, CmsTestimonial } from '../../cms/types'
import type { TravelPackage } from '../../content/site'
import { isSupabaseConfigured } from '../../lib/supabase'

type DashPackage = TravelPackage & { published?: boolean }

type DashboardData = {
  packages: DashPackage[]
  posts: CmsBlogPost[]
  leads: CmsLead[]
  testimonials: CmsTestimonial[]
  company: CmsCompany | null
  about: CmsAbout | null
}

const empty: DashboardData = {
  packages: [],
  posts: [],
  leads: [],
  testimonials: [],
  company: null,
  about: null,
}

function BarChart({
  items,
}: {
  items: { label: string; value: number; color: string }[]
}) {
  const max = Math.max(...items.map((i) => i.value), 1)
  return (
    <div className="dash-bars" role="img" aria-label="Content overview bar chart">
      {items.map((item) => (
        <div className="dash-bar-row" key={item.label}>
          <div className="dash-bar-meta">
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
          <div className="dash-bar-track">
            <div
              className="dash-bar-fill"
              style={{
                width: `${Math.max(8, (item.value / max) * 100)}%`,
                background: item.color,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function DonutChart({
  segments,
}: {
  segments: { label: string; value: number; color: string }[]
}) {
  const rawTotal = segments.reduce((sum, s) => sum + s.value, 0)
  const total = rawTotal || 1
  const visual =
    rawTotal === 0
      ? [{ label: 'Empty', value: 1, color: '#e8e1d4' }]
      : segments
  let offset = 0
  const rings = visual.map((s) => {
    const pct = (s.value / total) * 100
    const start = offset
    offset += pct
    return { ...s, pct, start }
  })
  const gradient = rings
    .map((r) => `${r.color} ${r.start}% ${r.start + r.pct}%`)
    .join(', ')

  return (
    <div className="dash-donut-wrap">
      <div
        className="dash-donut"
        style={{ background: `conic-gradient(${gradient})` }}
        role="img"
        aria-label="Lead status chart"
      >
        <div className="dash-donut-hole">
          <strong>{rawTotal}</strong>
          <span>leads</span>
        </div>
      </div>
      <ul className="dash-legend">
        {segments.map((s) => (
          <li key={s.label}>
            <i style={{ background: s.color }} />
            <span>{s.label}</span>
            <strong>{s.value}</strong>
          </li>
        ))}
      </ul>
    </div>
  )
}

function MiniBars({
  values,
  color,
}: {
  values: number[]
  color: string
}) {
  const max = Math.max(...values, 1)
  return (
    <div className="dash-mini-bars" aria-hidden="true">
      {values.map((v, i) => (
        <span
          key={i}
          style={{ height: `${Math.max(12, (v / max) * 100)}%`, background: color }}
        />
      ))}
    </div>
  )
}

function leadDayBuckets(leads: CmsLead[]) {
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    d.setDate(d.getDate() - (6 - i))
    return d
  })
  return days.map((day) => {
    const next = new Date(day)
    next.setDate(day.getDate() + 1)
    return leads.filter((l) => {
      const t = new Date(l.created_at).getTime()
      return t >= day.getTime() && t < next.getTime()
    }).length
  })
}

export function AdminDashboard() {
  const [data, setData] = useState<DashboardData>(empty)
  const [loading, setLoading] = useState(isSupabaseConfigured)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false)
      return
    }
    let cancelled = false
    ;(async () => {
      try {
        setLoading(true)
        const [packages, posts, leads, testimonials, company, about] =
          await Promise.all([
            adminListPackages(),
            adminListBlogPosts(),
            adminListLeads(),
            adminListTestimonials(),
            fetchCmsCompany(),
            fetchCmsAbout(),
          ])
        if (cancelled) return
        setData({ packages, posts, leads, testimonials, company, about })
        setError(null)
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load dashboard')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const stats = useMemo(() => {
    const hajj = data.packages.filter((p) => p.category === 'hajj').length
    const umrah = data.packages.filter((p) => p.category === 'umrah').length
    const livePackages = data.packages.filter((p) => p.published !== false).length
    const draftPackages = data.packages.length - livePackages
    const livePosts = data.posts.filter((p) => p.published !== false).length
    const newLeads = data.leads.filter((l) => l.status === 'new').length
    const contacted = data.leads.filter((l) => l.status === 'contacted').length
    const closed = data.leads.filter((l) => l.status === 'closed').length
    const liveTestimonials = data.testimonials.filter(
      (t) => t.published !== false,
    ).length
    return {
      hajj,
      umrah,
      livePackages,
      draftPackages,
      livePosts,
      newLeads,
      contacted,
      closed,
      liveTestimonials,
      totalLeads: data.leads.length,
    }
  }, [data])

  const contentBars = [
    { label: 'Packages', value: data.packages.length, color: '#0f1f3d' },
    { label: 'Blog posts', value: data.posts.length, color: '#c9a227' },
    { label: 'Leads', value: data.leads.length, color: '#1a2f56' },
    { label: 'Testimonials', value: data.testimonials.length, color: '#e0b84a' },
  ]

  const leadSegments = [
    { label: 'New', value: stats.newLeads, color: '#c9a227' },
    { label: 'Contacted', value: stats.contacted, color: '#1a2f56' },
    { label: 'Closed', value: stats.closed, color: '#0f766e' },
  ]

  const weekLeads = leadDayBuckets(data.leads)
  const recentLeads = data.leads.slice(0, 5)
  const topPackages = [...data.packages]
    .sort((a, b) => b.pricing.adult - a.pricing.adult)
    .slice(0, 5)
  const recentPosts = data.posts.slice(0, 4)

  return (
    <div className="dash">
      {!isSupabaseConfigured ? (
        <div className="admin-alert admin-alert-info">
          Supabase is not configured. Add keys to <code>.env</code>, run{' '}
          <code>supabase/schema.sql</code>, then restart the dev server.
        </div>
      ) : null}

      {error ? <div className="admin-alert admin-alert-error">{error}</div> : null}

      {loading ? (
        <div className="admin-card">
          <p className="admin-muted">Loading dashboard insights…</p>
        </div>
      ) : null}

      <section className="dash-hero">
        <div>
          <p className="dash-kicker">ELITE ALHUSSAM · CMS</p>
          <h2>Operations overview</h2>
          <p>
            Live snapshot of packages, blog content, enquiries, testimonials, and
            company profile.
          </p>
        </div>
        <div className="dash-hero-actions">
          <Link className="admin-btn admin-btn-primary" to="/admin/packages/new">
            Add package
          </Link>
          <Link className="admin-btn admin-btn-navy" to="/admin/blog/new">
            Write post
          </Link>
          <Link className="admin-btn admin-btn-ghost" to="/admin/leads">
            Review leads
          </Link>
        </div>
      </section>

      <section className="admin-grid-stats dash-stats">
        <article className="admin-stat dash-stat">
          <span>Packages</span>
          <strong>{data.packages.length}</strong>
          <em>
            {stats.livePackages} live · {stats.draftPackages} draft
          </em>
          <MiniBars values={[stats.hajj, stats.umrah, stats.livePackages]} color="#0f1f3d" />
        </article>
        <article className="admin-stat dash-stat">
          <span>Blog posts</span>
          <strong>{data.posts.length}</strong>
          <em>{stats.livePosts} published</em>
          <MiniBars
            values={data.posts.slice(0, 7).map((_, i) => 7 - i)}
            color="#c9a227"
          />
        </article>
        <article className="admin-stat dash-stat">
          <span>Leads</span>
          <strong>{stats.totalLeads}</strong>
          <em>{stats.newLeads} new · last 7 days</em>
          <MiniBars values={weekLeads} color="#1a2f56" />
        </article>
        <article className="admin-stat dash-stat">
          <span>Testimonials</span>
          <strong>{data.testimonials.length}</strong>
          <em>{stats.liveTestimonials} live on site</em>
          <MiniBars
            values={[
              stats.liveTestimonials,
              Math.max(data.testimonials.length - stats.liveTestimonials, 0),
              data.testimonials.length,
            ]}
            color="#e0b84a"
          />
        </article>
      </section>

      <section className="dash-charts">
        <article className="admin-card">
          <div className="dash-card-head">
            <h2>Content volume</h2>
            <span className="admin-muted">All CMS sections</span>
          </div>
          <BarChart items={contentBars} />
        </article>

        <article className="admin-card">
          <div className="dash-card-head">
            <h2>Lead pipeline</h2>
            <span className="admin-muted">Status mix</span>
          </div>
          <DonutChart segments={leadSegments} />
        </article>

        <article className="admin-card">
          <div className="dash-card-head">
            <h2>Package mix</h2>
            <span className="admin-muted">Hajj vs Umrah</span>
          </div>
          <div className="dash-split">
            <div>
              <strong>{stats.hajj}</strong>
              <span>Hajj packages</span>
              <div className="dash-progress">
                <i
                  style={{
                    width: `${(stats.hajj / Math.max(data.packages.length, 1)) * 100}%`,
                    background: '#0f1f3d',
                  }}
                />
              </div>
            </div>
            <div>
              <strong>{stats.umrah}</strong>
              <span>Umrah packages</span>
              <div className="dash-progress">
                <i
                  style={{
                    width: `${(stats.umrah / Math.max(data.packages.length, 1)) * 100}%`,
                    background: '#c9a227',
                  }}
                />
              </div>
            </div>
          </div>
          <div className="dash-week">
            <p className="admin-muted">Leads this week</p>
            <div className="dash-week-bars">
              {weekLeads.map((v, i) => {
                const day = new Date()
                day.setDate(day.getDate() - (6 - i))
                return (
                  <div key={i} className="dash-week-col">
                    <div
                      className="dash-week-bar"
                      style={{ height: `${Math.max(8, v * 18 + 8)}px` }}
                    />
                    <span>
                      {day.toLocaleDateString('en-IN', { weekday: 'narrow' })}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </article>
      </section>

      <section className="dash-panels">
        <article className="admin-card">
          <div className="dash-card-head">
            <h2>Packages</h2>
            <Link to="/admin/packages">Manage →</Link>
          </div>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Package</th>
                  <th>Type</th>
                  <th>Adult INR</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {topPackages.map((pkg) => (
                  <tr key={pkg.id}>
                    <td>
                      <strong>{pkg.title}</strong>
                      <div className="admin-muted">{pkg.tag}</div>
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
                  </tr>
                ))}
                {!topPackages.length ? (
                  <tr>
                    <td colSpan={4} className="admin-muted">
                      No packages yet.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </article>

        <article className="admin-card">
          <div className="dash-card-head">
            <h2>Recent leads</h2>
            <Link to="/admin/leads">View all →</Link>
          </div>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Interest</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((lead) => (
                  <tr key={lead.id}>
                    <td>
                      <strong>{lead.name}</strong>
                      <div className="admin-muted">{lead.phone}</div>
                    </td>
                    <td>{lead.interest || '—'}</td>
                    <td>
                      <span
                        className={`admin-badge ${
                          lead.status === 'new'
                            ? 'admin-badge-warn'
                            : lead.status === 'closed'
                              ? 'admin-badge-ok'
                              : 'admin-badge-muted'
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {!recentLeads.length ? (
                  <tr>
                    <td colSpan={3} className="admin-muted">
                      No leads yet — form submissions will appear here.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </article>
      </section>

      <section className="dash-panels dash-panels-3">
        <article className="admin-card">
          <div className="dash-card-head">
            <h2>Blog</h2>
            <Link to="/admin/blog">Manage →</Link>
          </div>
          <ul className="dash-list">
            {recentPosts.map((post) => (
              <li key={post.id || post.slug}>
                <strong>{post.title}</strong>
                <span>
                  {post.category} · {post.date}
                </span>
              </li>
            ))}
            {!recentPosts.length ? (
              <li className="admin-muted">No CMS blog posts yet. Add one from Blog.</li>
            ) : null}
          </ul>
        </article>

        <article className="admin-card">
          <div className="dash-card-head">
            <h2>Testimonials</h2>
            <Link to="/admin/testimonials">Manage →</Link>
          </div>
          <ul className="dash-list">
            {data.testimonials.slice(0, 4).map((item) => (
              <li key={item.id || item.name}>
                <strong>{item.name}</strong>
                <span>{item.place || item.quote.slice(0, 72)}</span>
              </li>
            ))}
            {!data.testimonials.length ? (
              <li className="admin-muted">No testimonials yet.</li>
            ) : null}
          </ul>
        </article>

        <article className="admin-card">
          <div className="dash-card-head">
            <h2>Company & about</h2>
            <Link to="/admin/company">Edit →</Link>
          </div>
          {data.company ? (
            <div className="dash-company">
              <p>
                <strong>{data.company.shortName}</strong>
              </p>
              <p className="admin-muted">{data.company.email}</p>
              <p className="admin-muted">WhatsApp · {data.company.whatsapp}</p>
              <p className="admin-muted">
                {data.company.phones.slice(0, 2).join(' · ')}
              </p>
              {data.about ? (
                <p className="dash-about-preview">{data.about.intro.slice(0, 140)}…</p>
              ) : null}
              <div className="admin-actions" style={{ marginTop: '0.75rem' }}>
                <Link className="admin-btn admin-btn-ghost" to="/admin/about">
                  About copy
                </Link>
              </div>
            </div>
          ) : (
            <p className="admin-muted">Company settings not loaded.</p>
          )}
        </article>
      </section>
    </div>
  )
}
