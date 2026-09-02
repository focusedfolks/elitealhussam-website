import { Link, useLocation } from 'react-router-dom'
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
} from 'react'
import {
  hasPackageMenuChildren,
  PACKAGES_MENU_PLACEHOLDER_NOTE,
  packagesMenuCategories,
  type PackagesMenuItem,
} from '../nav/packagesMenu'
import './PackagesMegaMenu.css'

const HOVER_DELAY_MS = 150
const DESKTOP_MQ = '(min-width: 981px)'

type Props = {
  label: string
  onNavigate?: () => void
}

function ChevronRight() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M7.5 5.5 12 10l-4.5 4.5 1 1L14 10 8.5 4.5l-1 1Z" />
    </svg>
  )
}

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      className={`pkg-mega-chevron${open ? ' is-open' : ''}`}
    >
      <path d="M5.5 7.5 10 12l4.5-4.5 1 1-5.5 5.5-5.5-5.5 1-1Z" />
    </svg>
  )
}

export function PackagesMegaMenu({ label, onNavigate }: Props) {
  const menuId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(DESKTOP_MQ).matches,
  )
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null)
  const [mobilePackagesOpen, setMobilePackagesOpen] = useState(false)
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState<string | null>(
    null,
  )
  const openTimerRef = useRef<number | null>(null)
  const closeTimerRef = useRef<number | null>(null)

  const isPackagesActive =
    location.pathname.startsWith('/packages') ||
    location.pathname.startsWith('/international-tours')

  const activeCategory = packagesMenuCategories.find(
    (item) => item.id === activeCategoryId,
  )

  const clearTimers = useCallback(() => {
    if (openTimerRef.current !== null) {
      window.clearTimeout(openTimerRef.current)
      openTimerRef.current = null
    }
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }, [])

  const closeMenu = useCallback(() => {
    clearTimers()
    setMenuOpen(false)
    setActiveCategoryId(null)
  }, [clearTimers])

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MQ)
    const onChange = () => setIsDesktop(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    closeMenu()
    setMobilePackagesOpen(false)
    setMobileCategoryOpen(null)
  }, [location.pathname, closeMenu])

  useEffect(() => {
    function onPointerDown(e: globalThis.MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) closeMenu()
    }
    function onKeyDown(e: globalThis.KeyboardEvent) {
      if (e.key === 'Escape') closeMenu()
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [closeMenu])

  useEffect(() => () => clearTimers(), [clearTimers])

  function scheduleOpen() {
    if (!isDesktop) return
    clearTimers()
    closeTimerRef.current = null
    openTimerRef.current = window.setTimeout(
      () => setMenuOpen(true),
      HOVER_DELAY_MS,
    )
  }

  function scheduleClose() {
    if (!isDesktop) return
    clearTimers()
    openTimerRef.current = null
    closeTimerRef.current = window.setTimeout(() => {
      setMenuOpen(false)
      setActiveCategoryId(null)
    }, HOVER_DELAY_MS)
  }

  function cancelClose() {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }

  function onCategoryEnter(item: PackagesMenuItem) {
    if (!isDesktop) return
    cancelClose()
    if (hasPackageMenuChildren(item)) {
      setActiveCategoryId(item.id)
      setMenuOpen(true)
    } else {
      setActiveCategoryId(null)
    }
  }

  function onCategoryClick(item: PackagesMenuItem, e: MouseEvent) {
    if (isDesktop && hasPackageMenuChildren(item)) {
      e.preventDefault()
      setMenuOpen(true)
      setActiveCategoryId(item.id)
    }
  }

  function onTriggerKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (isDesktop) {
        setMenuOpen((v) => !v)
      } else {
        setMobilePackagesOpen((v) => !v)
      }
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setMenuOpen(true)
      if (isDesktop) setActiveCategoryId(packagesMenuCategories[0]?.id ?? null)
    }
  }

  function renderDesktopPanel1() {
    return (
      <ul className="pkg-mega-list pkg-mega-list--categories" role="menu">
        {packagesMenuCategories.map((item) => {
          const withChildren = hasPackageMenuChildren(item)
          const isActive = activeCategoryId === item.id

          if (withChildren) {
            return (
              <li key={item.id} role="none">
                <button
                  type="button"
                  role="menuitem"
                  className={`pkg-mega-category${isActive ? ' is-active' : ''}`}
                  aria-expanded={isActive}
                  onMouseEnter={() => onCategoryEnter(item)}
                  onFocus={() => onCategoryEnter(item)}
                  onClick={(e) => onCategoryClick(item, e)}
                >
                  <span>{item.label}</span>
                  <ChevronRight />
                </button>
              </li>
            )
          }

          return (
            <li key={item.id} role="none">
              <Link
                role="menuitem"
                to={item.href}
                className={`pkg-mega-category${location.pathname.startsWith(item.href) ? ' is-active' : ''}`}
                onMouseEnter={() => onCategoryEnter(item)}
                onClick={() => {
                  closeMenu()
                  onNavigate?.()
                }}
              >
                <span>{item.label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    )
  }

  function renderDesktopPanel2() {
    if (!activeCategory || !hasPackageMenuChildren(activeCategory)) return null

    return (
      <div className="pkg-mega-panel pkg-mega-panel--destinations">
        <p className="pkg-mega-panel-title">{activeCategory.label}</p>
        <div className="pkg-mega-dest-grid">
          {activeCategory.children.map((group) => (
            <div className="pkg-mega-country" key={group.country}>
              <h4>{group.country}</h4>
              <ul>
                {group.destinations.map((dest, i) => (
                  <li key={`${group.country}-${dest.label}-${i}`}>
                    <Link
                      to={dest.href}
                      onClick={() => {
                        closeMenu()
                        onNavigate?.()
                      }}
                    >
                      {dest.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="pkg-mega-placeholder-note">
          {PACKAGES_MENU_PLACEHOLDER_NOTE}
        </p>
      </div>
    )
  }

  function renderMobileAccordion() {
    return (
      <div
        className={`pkg-mega-mobile${mobilePackagesOpen ? ' is-open' : ''}`}
        id={`${menuId}-mobile`}
      >
        {packagesMenuCategories.map((item) => {
          if (!hasPackageMenuChildren(item)) {
            return (
              <Link
                key={item.id}
                to={item.href}
                className="pkg-mega-mobile-link"
                onClick={() => {
                  setMobilePackagesOpen(false)
                  onNavigate?.()
                }}
              >
                {item.label}
              </Link>
            )
          }

          const expanded = mobileCategoryOpen === item.id
          return (
            <div className="pkg-mega-mobile-group" key={item.id}>
              <button
                type="button"
                className="pkg-mega-mobile-trigger"
                aria-expanded={expanded}
                onClick={() =>
                  setMobileCategoryOpen((cur) =>
                    cur === item.id ? null : item.id,
                  )
                }
              >
                <span>{item.label}</span>
                <ChevronDown open={expanded} />
              </button>
              {expanded ? (
                <div className="pkg-mega-mobile-nested">
                  {item.children.map((group) => (
                    <div className="pkg-mega-mobile-country" key={group.country}>
                      <p>{group.country}</p>
                      <ul>
                        {group.destinations.map((dest, i) => (
                          <li key={`${group.country}-${i}`}>
                            <Link
                              to={dest.href}
                              onClick={() => {
                                setMobilePackagesOpen(false)
                                setMobileCategoryOpen(null)
                                onNavigate?.()
                              }}
                            >
                              {dest.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <p className="pkg-mega-placeholder-note">
                    {PACKAGES_MENU_PLACEHOLDER_NOTE}
                  </p>
                </div>
              ) : null}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div
      ref={rootRef}
      className={`pkg-mega${menuOpen ? ' is-open' : ''}${isPackagesActive ? ' is-route-active' : ''}`}
      onMouseEnter={scheduleOpen}
      onMouseLeave={scheduleClose}
    >
      <div className="pkg-mega-trigger-wrap">
        <button
          type="button"
          className={`nav-link pkg-mega-trigger${isPackagesActive ? ' is-active' : ''}`}
          aria-haspopup="true"
          aria-expanded={isDesktop ? menuOpen : mobilePackagesOpen}
          aria-controls={`${menuId}-panel`}
          onClick={() => {
            if (isDesktop) {
              setMenuOpen((v) => !v)
            } else {
              setMobilePackagesOpen((v) => !v)
            }
          }}
          onKeyDown={onTriggerKeyDown}
        >
          {label}
          <ChevronDown open={isDesktop ? menuOpen : mobilePackagesOpen} />
        </button>
      </div>

      {isDesktop ? (
        <div
          id={`${menuId}-panel`}
          className={`pkg-mega-flyout${menuOpen ? ' is-visible' : ''}`}
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          <div className="pkg-mega-panel pkg-mega-panel--categories">
            <p className="pkg-mega-panel-title">Browse packages</p>
            {renderDesktopPanel1()}
          </div>
          {renderDesktopPanel2()}
        </div>
      ) : (
        renderMobileAccordion()
      )}
    </div>
  )
}
