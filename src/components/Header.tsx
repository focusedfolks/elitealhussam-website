import { NavLink, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useI18n } from '../i18n'
import { BrandMark } from './BrandMark'
import { useCms } from '../cms/CmsProvider'
import { IconPhone } from './Icons'
import { telHref } from '../lib/contact'
import './Header.css'

export function Header() {
  const { t, lang, setLang, languages } = useI18n()
  const { company } = useCms()
  const primaryPhone = company.phones[0]
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    function onPointerDown(e: MouseEvent) {
      const target = e.target as HTMLElement | null
      if (!target?.closest('.nav-drop')) setOpenMenu(null)
    }
    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [])

  function closeNav() {
    setOpen(false)
    setOpenMenu(null)
  }

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="header-bar">
        <Link
          to="/"
          className="brand"
          onClick={closeNav}
          aria-label="ELITE ALHUSSAM Travel and Tourism L.L.C"
        >
          <img
            src="/images/alhussam-logo.png?v=2"
            alt=""
            className="brand-logo"
            width={52}
            height={52}
          />
          <BrandMark size="md" showTagline />
        </Link>

        <button
          className={`nav-toggle ${open ? 'is-open' : ''}`}
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <div
          className={`nav-backdrop${open ? ' is-open' : ''}`}
          aria-hidden={!open}
          onClick={closeNav}
        />

        <nav id="site-nav" className={`nav-menu ${open ? 'is-open' : ''}`}>
          <div className="nav-menu-head">
            <span className="nav-menu-title">Menu</span>
            <button
              type="button"
              className="nav-close"
              aria-label="Close menu"
              onClick={closeNav}
            >
              ✕
            </button>
          </div>

          <div className="nav-menu-links">
            {t.nav.map((item) =>
              item.children ? (
                <div
                  key={item.to}
                  className={`nav-drop ${openMenu === item.to ? 'is-open' : ''}`}
                  onMouseEnter={() => setOpenMenu(item.to)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <div className="nav-drop-trigger">
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `nav-link${isActive ? ' is-active' : ''}`
                      }
                      onClick={closeNav}
                    >
                      {item.label}
                    </NavLink>
                    <button
                      type="button"
                      className="nav-caret"
                      aria-label={`${item.label} menu`}
                      aria-expanded={openMenu === item.to}
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setOpenMenu((cur) => (cur === item.to ? null : item.to))
                      }}
                    >
                      ▾
                    </button>
                  </div>
                  <div className="nav-submenu">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.to}
                        to={child.to}
                        onClick={closeNav}
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ) : (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `nav-link${isActive ? ' is-active' : ''}`
                  }
                  onClick={closeNav}
                >
                  {item.label}
                </NavLink>
              ),
            )}
          </div>

          <div className="nav-prefs">
            <p className="nav-prefs-title">Language</p>
            <label className="nav-pref-field" htmlFor="mobile-language">
              <span>Language</span>
              <select
                id="mobile-language"
                value={lang}
                onChange={(e) => setLang(e.target.value as typeof lang)}
              >
                {languages.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.label}
                  </option>
                ))}
              </select>
            </label>
            <a className="nav-pref-call" href={telHref(primaryPhone)}>
              <IconPhone size={16} />
              <span>{primaryPhone}</span>
            </a>
          </div>

          <div className="nav-menu-actions">
            <a
              className="talk-btn talk-btn--drawer"
              href={telHref(primaryPhone)}
              onClick={closeNav}
            >
              <span>Call {primaryPhone}</span>
            </a>
            <Link
              className="talk-btn talk-btn--drawer talk-btn--ghost"
              to="/contact#lead-form"
              onClick={closeNav}
            >
              <span>{t.common.getQuote}</span>
            </Link>
          </div>
        </nav>

        <div className="header-actions">
          <a className="header-phone" href={telHref(primaryPhone)}>
            <IconPhone size={15} />
            <span>{primaryPhone}</span>
          </a>
          <label className="lang-switch" aria-label="Language">
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as typeof lang)}
            >
              {languages.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.label}
                </option>
              ))}
            </select>
          </label>
          <Link
            className="talk-btn"
            to="/contact#lead-form"
            onClick={closeNav}
          >
            <span>{t.common.getQuote}</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
