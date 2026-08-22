import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useI18n } from '../i18n'
import './StickyQuoteBar.css'

export function StickyQuoteBar() {
  const { t } = useI18n()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const hero = document.querySelector('.hero-single')
      const threshold = hero instanceof HTMLElement ? hero.offsetHeight * 0.7 : 420
      setVisible(window.scrollY > threshold)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <aside
      className={`sticky-quote-bar${visible ? ' is-visible' : ''}`}
      aria-hidden={!visible}
    >
      <div className="sticky-quote-inner">
        <p>
          <strong>{t.common.getQuote}</strong>
          <span>Clear packages · Chennai & Dubai support</span>
        </p>
        <Link className="btn btn-gold sticky-quote-btn" to="/contact#lead-form" tabIndex={visible ? 0 : -1}>
          {t.home.explore}
        </Link>
      </div>
    </aside>
  )
}
