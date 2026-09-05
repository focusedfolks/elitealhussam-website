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
  guideMenuCategories,
  hasGuideMenuChildren,
  type GuideMenuItem,
} from '../nav/guideMenu'
import '../components/PackagesMegaMenu.css'

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

export function GuideMegaMenu({ label, onNavigate }: Props) {
  const menuId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(DESKTOP_MQ).matches,
  )
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState<string | null>(
    null,
  )
  const openTimerRef = useRef<number | null>(null)
  const closeTimerRef = useRef<number | null>(null)

  const isGuideActive = location.pathname.startsWith('/guide')

  const activeCategory = guideMenuCategories.find(
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
    setMobileOpen(false)
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

  function firstGroupCategoryId() {
    return (
      guideMenuCategories.find((item) => hasGuideMenuChildren(item))?.id ?? null
    )
  }

  function scheduleOpen() {
    if (!isDesktop) return
    clearTimers()
    closeTimerRef.current = null
    openTimerRef.current = window.setTimeout(() => {
      setMenuOpen(true)
      setActiveCategoryId((cur) => cur ?? firstGroupCategoryId())
    }, HOVER_DELAY_MS)
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

  function onCategoryEnter(item: GuideMenuItem) {
    if (!isDesktop) return
    cancelClose()
    if (hasGuideMenuChildren(item)) {
      setActiveCategoryId(item.id)
      setMenuOpen(true)
    } else {
      setActiveCategoryId(null)
    }
  }

  function onCategoryClick(item: GuideMenuItem, e: MouseEvent) {
    if (isDesktop && hasGuideMenuChildren(item)) {
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
        setMobileOpen((v) => !v)
      }
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setMenuOpen(true)
      if (isDesktop) setActiveCategoryId(guideMenuCategories[0]?.id ?? null)
    }
  }

  function renderDesktopPanel1() {
    return (
      <ul className="pkg-mega-list pkg-mega-list--categories" role="menu">
        {guideMenuCategories.map((item) => {
          const withChildren = hasGuideMenuChildren(item)
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
    if (!activeCategory || !hasGuideMenuChildren(activeCategory)) return null

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
      </div>
    )
  }

  function renderMobileAccordion() {
    return (
      <div
        className={`pkg-mega-mobile${mobileOpen ? ' is-open' : ''}`}
        id={`${menuId}-mobile`}
      >
        {guideMenuCategories.map((item) => {
          if (!hasGuideMenuChildren(item)) {
            return (
              <Link
                key={item.id}
                to={item.href}
                className="pkg-mega-mobile-link"
                onClick={() => {
                  setMobileOpen(false)
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
                                setMobileOpen(false)
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
      className={`pkg-mega${menuOpen ? ' is-open' : ''}${isGuideActive ? ' is-route-active' : ''}`}
      onMouseEnter={scheduleOpen}
      onMouseLeave={scheduleClose}
    >
      <div className="pkg-mega-trigger-wrap">
        <button
          type="button"
          className={`nav-link pkg-mega-trigger${isGuideActive ? ' is-active' : ''}`}
          aria-haspopup="true"
          aria-expanded={isDesktop ? menuOpen : mobileOpen}
          aria-controls={`${menuId}-panel`}
          onClick={() => {
            if (isDesktop) {
              setMenuOpen((v) => {
                const next = !v
                if (next) setActiveCategoryId((cur) => cur ?? firstGroupCategoryId())
                return next
              })
            } else {
              setMobileOpen((v) => !v)
            }
          }}
          onKeyDown={onTriggerKeyDown}
        >
          {label}
          <ChevronDown open={isDesktop ? menuOpen : mobileOpen} />
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
            <p className="pkg-mega-panel-title">Pilgrim guide</p>
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
