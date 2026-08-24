import { useState, type FormEvent } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { BrandMark } from '../../components/BrandMark'
import { isSupabaseConfigured } from '../../lib/supabase'
import { useAdminAuth } from '../AdminAuth'
import '../Admin.css'

export function AdminLogin() {
  const { ready, user, signIn } = useAdminAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from =
    (location.state as { from?: string } | null)?.from &&
    String((location.state as { from?: string }).from).startsWith('/admin')
      ? String((location.state as { from?: string }).from)
      : '/admin'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  if (ready && user) return <Navigate to={from} replace />

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError(null)
    const message = await signIn(email.trim(), password)
    setBusy(false)
    if (message) {
      setError(message)
      return
    }
    navigate(from)
  }

  return (
    <div className="admin-login">
      <form className="admin-login-card" onSubmit={onSubmit}>
        <div className="admin-login-brand">
          <img src="/images/alhussam-logo.png?v=2" alt="" />
          <BrandMark size="md" showTagline />
        </div>
        <div>
          <h1>Admin CMS</h1>
          <p className="admin-muted">
            Sign in with your Supabase Auth admin user.
          </p>
        </div>

        {!isSupabaseConfigured ? (
          <div className="admin-alert admin-alert-error">
            Add <code>VITE_SUPABASE_URL</code> and{' '}
            <code>VITE_SUPABASE_ANON_KEY</code> to your <code>.env</code> file,
            then restart the dev server.
          </div>
        ) : null}

        {error ? <div className="admin-alert admin-alert-error">{error}</div> : null}

        <div className="admin-field">
          <label htmlFor="admin-email">Email</label>
          <input
            id="admin-email"
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="admin-field">
          <label htmlFor="admin-password">Password</label>
          <input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="admin-btn admin-btn-primary"
          type="submit"
          disabled={busy || !isSupabaseConfigured}
        >
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}
