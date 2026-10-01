import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { BrandMark } from '../components/BrandMark'
import { useAdminAuth } from './AdminAuth'
import './Admin.css'

const links = [
  { to: '/admin', end: true, label: 'Dashboard' },
  { to: '/admin/packages', label: 'Packages' },
  { to: '/admin/blog', label: 'Blog' },
  { to: '/admin/leads', label: 'Leads' },
  { to: '/admin/testimonials', label: 'Testimonials' },
  { to: '/admin/company', label: 'Company' },
  { to: '/admin/about', label: 'About' },
]

export function AdminLayout() {
  const { user, signOut } = useAdminAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [navOpen, setNavOpen] = useState(false)

  useEffect(() => {
    let el = document.querySelector<HTMLMetaElement>('meta[name="robots"]')
    if (!el) {
      el = document.createElement('meta')
      el.name = 'robots'
      document.head.appendChild(el)
    }
    el.content = 'noindex, nofollow'
  }, [])

  const title = location.pathname.startsWith('/admin/packages')
    ? 'Packages'
    : location.pathname.startsWith('/admin/blog')
      ? 'Blog'
      : location.pathname.startsWith('/admin/leads')
        ? 'Leads'
        : location.pathname.startsWith('/admin/testimonials')
          ? 'Testimonials'
          : location.pathname.startsWith('/admin/company')
            ? 'Company'
            : location.pathname.startsWith('/admin/about')
              ? 'About copy'
              : 'Dashboard'

  return (
    <div className={`admin-shell${navOpen ? ' is-nav-open' : ''}`}>
      <div
        className={`admin-nav-backdrop${navOpen ? ' is-open' : ''}`}
        onClick={() => setNavOpen(false)}
        aria-hidden={!navOpen}
      />

      <aside className="admin-sidebar">
        <div className="admin-sidebar-top">
          <NavLink
            to="/admin"
            end
            className="admin-brand"
            onClick={() => setNavOpen(false)}
          >
            <img src="/images/alhussam-logo.png?v=2" alt="ELITE ALHUSSAM logo" />
            <BrandMark size="sm" showTagline={false} light />
          </NavLink>
          <button
            type="button"
            className="admin-nav-close"
            aria-label="Close menu"
            onClick={() => setNavOpen(false)}
          >
            ✕
          </button>
        </div>

        <nav className="admin-nav" aria-label="Admin">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setNavOpen(false)}
              className={({ isActive }) =>
                `admin-nav-link${isActive ? ' is-active' : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar-foot">
          <p className="admin-sidebar-email" title={user?.email || ''}>
            {user?.email}
          </p>
          <button
            type="button"
            className="admin-side-link"
            onClick={async () => {
              await signOut()
              navigate('/admin/login')
            }}
          >
            Sign out
          </button>
          <NavLink
            to="/"
            className="admin-side-link"
            onClick={() => setNavOpen(false)}
          >
            View website
          </NavLink>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <button
              type="button"
              className="admin-menu-btn"
              aria-label="Open menu"
              aria-expanded={navOpen}
              onClick={() => setNavOpen(true)}
            >
              <span />
              <span />
              <span />
            </button>
            <h1>{title}</h1>
          </div>
          <div className="admin-topbar-right">
            <span className="admin-topbar-user">{user?.email}</span>
          </div>
        </header>
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
