import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  adminDeleteBlogPost,
  adminListBlogPosts,
  adminUpsertBlogPost,
} from '../../cms/api'
import { BLOG_CATEGORIES, type CmsBlogPost } from '../../cms/types'

const emptyPost = (): CmsBlogPost => ({
  title: '',
  slug: '',
  date: new Date().toISOString().slice(0, 10),
  author: 'ELITE ALHUSSAM Team',
  category: 'Travel Advice',
  excerpt: '',
  coverImage: '/images/family-makkah.webp',
  readTime: '5 min read',
  bodyMarkdown: '',
  published: true,
})

export function AdminBlogList() {
  const [rows, setRows] = useState<CmsBlogPost[]>([])
  const [error, setError] = useState<string | null>(null)

  async function load() {
    try {
      setRows(await adminListBlogPosts())
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load posts')
    }
  }

  useEffect(() => {
    void load()
  }, [])

  return (
    <>
      <div className="admin-toolbar">
        <p className="admin-muted">Write and publish blog articles.</p>
        <Link className="admin-btn admin-btn-primary" to="/admin/blog/new">
          New post
        </Link>
      </div>
      {error ? <div className="admin-alert admin-alert-error">{error}</div> : null}
      <div className="admin-card admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Date</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {rows.map((post) => (
              <tr key={post.id || post.slug}>
                <td>
                  <strong>{post.title}</strong>
                  <div className="admin-muted">/{post.slug}</div>
                </td>
                <td>{post.category}</td>
                <td>{post.date}</td>
                <td>
                  <span
                    className={`admin-badge ${post.published === false ? 'admin-badge-muted' : 'admin-badge-ok'}`}
                  >
                    {post.published === false ? 'Draft' : 'Live'}
                  </span>
                </td>
                <td>
                  <div className="admin-actions">
                    <Link
                      className="admin-btn admin-btn-ghost"
                      to={`/admin/blog/${post.id}`}
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      className="admin-btn admin-btn-danger"
                      onClick={async () => {
                        if (!post.id || !confirm(`Delete ${post.title}?`)) return
                        await adminDeleteBlogPost(post.id)
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

export function AdminBlogEdit() {
  const { id } = useParams()
  const isNew = id === 'new'
  const navigate = useNavigate()
  const [form, setForm] = useState(emptyPost())
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isNew) return
    ;(async () => {
      try {
        const rows = await adminListBlogPosts()
        const found = rows.find((p) => p.id === id)
        if (!found) {
          setError('Post not found')
          return
        }
        setForm(found)
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
      await adminUpsertBlogPost(form)
      setMessage('Post saved')
      if (isNew) navigate('/admin/blog')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed')
    }
  }

  return (
    <form className="admin-card admin-form" onSubmit={onSubmit}>
      <div className="admin-toolbar">
        <h2>{isNew ? 'New blog post' : 'Edit blog post'}</h2>
        <Link className="admin-btn admin-btn-ghost" to="/admin/blog">
          Back
        </Link>
      </div>
      {error ? <div className="admin-alert admin-alert-error">{error}</div> : null}
      {message ? <div className="admin-alert admin-alert-ok">{message}</div> : null}

      <div className="admin-form-grid">
        <div className="admin-field">
          <label>Title</label>
          <input
            required
            value={form.title}
            onChange={(e) => {
              const title = e.target.value
              setForm((prev) => ({
                ...prev,
                title,
                slug:
                  isNew && !prev.slug
                    ? title
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/^-|-$/g, '')
                    : prev.slug,
              }))
            }}
          />
        </div>
        <div className="admin-field">
          <label>Slug</label>
          <input
            required
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value.trim() })}
          />
        </div>
        <div className="admin-field">
          <label>Date</label>
          <input
            type="date"
            required
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
        </div>
        <div className="admin-field">
          <label>Category</label>
          <select
            value={form.category}
            onChange={(e) =>
              setForm({
                ...form,
                category: e.target.value as CmsBlogPost['category'],
              })
            }
          >
            {BLOG_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="admin-field">
          <label>Author</label>
          <input
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
          />
        </div>
        <div className="admin-field">
          <label>Read time</label>
          <input
            value={form.readTime}
            onChange={(e) => setForm({ ...form, readTime: e.target.value })}
          />
        </div>
        <div className="admin-field full">
          <label>Cover image path</label>
          <input
            value={form.coverImage}
            onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
          />
        </div>
        <div className="admin-field full">
          <label>Excerpt</label>
          <textarea
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
          />
        </div>
        <div className="admin-field full">
          <label>Body (Markdown)</label>
          <textarea
            className="tall"
            required
            value={form.bodyMarkdown}
            onChange={(e) => setForm({ ...form, bodyMarkdown: e.target.value })}
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

      <button className="admin-btn admin-btn-primary" type="submit">
        Save post
      </button>
    </form>
  )
}
