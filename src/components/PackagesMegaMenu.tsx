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
  packagesMenuCategories,
  type PackagesCountryGroup,
  type PackagesMenuItem,
} from '../nav/packagesMenu'
import './PackagesMegaMenu.css'

const HOVER_DELAY_MS = 150
const DESKTOP_MQ = '(min-width: 1280px)'

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
  const [activeCountryName, setActiveCountryName] = useState<string | null>(null)
  const [mobilePackagesOpen, setMobilePackagesOpen] = useState(false)
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState<string | null>(
    null,
  )
  const [mobileCountryOpen, setMobileCountryOpen] = useState<string | null>(null)
  const openTimerRef = useRef<number | null>(null)
  const closeTimerRef = useRef<number | null>(null)

  const isPackagesActive =
    location.pathname.startsWith('/packages') ||
    location.pathname.startsWith('/international-tours')

  const activeCategory = packagesMenuCategories.find(
    (item) => item.id === activeCategoryId,
  )
  const isInternationalTours = activeCategory?.id === 'international-tours'
  const activeCountry =
    isInternationalTours && activeCategory && hasPackageMenuChildren(activeCategory)
      ? activeCategory.children.find(
          (group) => group.country === activeCountryName,
        )
      : undefined

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
    setActiveCountryName(null)
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
    setMobileCountryOpen(null)
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
      setActiveCountryName(null)
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
      setActiveCountryName(null)
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

    if (activeCategory.id === 'international-tours') {
      return (
        <div className="pkg-mega-panel pkg-mega-panel--country-list">
          <p className="pkg-mega-panel-title">Countries</p>
          <ul className="pkg-mega-list pkg-mega-list--categories" role="menu">
            {activeCategory.children.map((group) => (
              <li key={group.country} role="none">
                <button
                  type="button"
                  role="menuitem"
                  className={`pkg-mega-category${activeCountryName === group.country ? ' is-active' : ''}`}
                  aria-expanded={activeCountryName === group.country}
                  onMouseEnter={() => setActiveCountryName(group.country)}
                  onFocus={() => setActiveCountryName(group.country)}
                  onClick={() => setActiveCountryName(group.country)}
                >
                  <span>{group.country}</span>
                  <ChevronRight />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )
    }

    return (
      <div className="pkg-mega-panel pkg-mega-panel--destinations">
        <p className="pkg-mega-panel-title">{activeCategory.label}</p>
        <div className="pkg-mega-dest-grid">
          {activeCategory.children.map((group) => (
            <div className="pkg-mega-country" key={group.country}>
              <h4>{group.country}</h4>
              {group.sections
                ? group.sections.map((section) => (
                    <div className="pkg-mega-subgroup" key={section.label}>
                      <h5>{section.label}</h5>
                      {renderDestinationLinks(
                        `${group.country}-${section.label}`,
                        section.destinations,
                      )}
                    </div>
                  ))
                : renderDestinationLinks(group.country, group.destinations)}
              {group.subgroups?.map((subgroup) => (
                <div className="pkg-mega-subgroup" key={subgroup.label}>
                  <h5>{subgroup.label}</h5>
                  {renderDestinationLinks(
                    `${group.country}-${subgroup.label}`,
                    subgroup.destinations,
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }

  function renderDesktopPanel3() {
    if (!activeCountry) return null

    return (
      <div className="pkg-mega-panel pkg-mega-panel--destinations">
        <p className="pkg-mega-panel-title">{activeCountry.country}</p>
        <div className="pkg-mega-dest-grid">
          {activeCountry.sections
            ? activeCountry.sections.map((section) => (
                <div className="pkg-mega-subgroup" key={section.label}>
                  <h5>{section.label}</h5>
                  {renderDestinationLinks(
                    `${activeCountry.country}-${section.label}`,
                    section.destinations,
                  )}
                </div>
              ))
            : renderDestinationLinks(
                activeCountry.country,
                activeCountry.destinations,
              )}
          {activeCountry.subgroups?.map((subgroup) => (
            <div className="pkg-mega-subgroup" key={subgroup.label}>
              <h5>{subgroup.label}</h5>
              {renderDestinationLinks(
                `${activeCountry.country}-${subgroup.label}`,
                subgroup.destinations,
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  function renderDestinationLinks(
    keyPrefix: string,
    destinations: { label: string; href: string }[],
  ) {
    return (
      <ul>
        {destinations.map((dest, i) => (
          <li key={`${keyPrefix}-${dest.label}-${i}`}>
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
                      {item.id !== 'international-tours' ? (
                        <p>{group.country}</p>
                      ) : null}
                      {item.id === 'international-tours' ? (
                        <>
                          <button
                            type="button"
                            className="pkg-mega-mobile-trigger pkg-mega-mobile-country-trigger"
                            aria-expanded={mobileCountryOpen === group.country}
                            onClick={() =>
                              setMobileCountryOpen((cur) =>
                                cur === group.country ? null : group.country,
                              )
                            }
                          >
                            <span>{group.country}</span>
                            <ChevronDown open={mobileCountryOpen === group.country} />
                          </button>
                          {mobileCountryOpen === group.country
                            ? renderMobileCountryItems(group)
                            : null}
                        </>
                      ) : (
                        renderMobileCountryItems(group)
                      )}
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

  function renderMobileDestinationLinks(
    destinations: { label: string; href: string }[],
  ) {
    return (
      <ul>
        {destinations.map((dest, i) => (
          <li key={`${dest.label}-${i}`}>
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
    )
  }

  function renderMobileCountryItems(
    group: PackagesCountryGroup,
  ) {
    return (
      <div className="pkg-mega-mobile-country-items">
        {group.sections
          ? group.sections.map((section) => (
              <div className="pkg-mega-mobile-subgroup" key={section.label}>
                <p>{section.label}</p>
                {renderMobileDestinationLinks(section.destinations)}
              </div>
            ))
          : renderMobileDestinationLinks(group.destinations)}
        {group.subgroups?.map((subgroup) => (
          <div className="pkg-mega-mobile-subgroup" key={subgroup.label}>
            <p>{subgroup.label}</p>
            {renderMobileDestinationLinks(subgroup.destinations)}
          </div>
        ))}
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
          {renderDesktopPanel3()}
        </div>
      ) : (
        renderMobileAccordion()
      )}
    </div>
  )
}
