import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useCms } from '../cms/CmsProvider'
import { IconPhone, IconWhatsApp } from './Icons'
import { useI18n } from '../i18n'
import './LeadBar.css'

export function LeadBar() {
  const { t } = useI18n()
  const { company } = useCms()
  const [visible, setVisible] = useState(false)
  const waHref = `https://wa.me/91${company.whatsapp}?text=${encodeURIComponent(
    'Assalamu Alaikum, please share a free Hajj / Umrah package quote.',
  )}`

  useEffect(() => {
    const onScroll = () => {
      const hero =
        document.querySelector('.hero-single') ||
        document.querySelector('.page-hero')
      const threshold =
        hero instanceof HTMLElement ? Math.max(hero.offsetHeight * 0.55, 220) : 280
      const next = window.scrollY > threshold
      setVisible(next)
      document.body.classList.toggle('has-sticky-cta', next)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      document.body.classList.remove('has-sticky-cta')
    }
  }, [])

  return (
    <aside
      className={`lead-bar${visible ? ' is-visible' : ''}`}
      aria-label="Quick enquiry"
      aria-hidden={!visible}
    >
      <div className="lead-bar-inner">
        <p className="lead-bar-copy">
          <strong>{t.home.needHelp}</strong>
          <span>Free consultation · Chennai & Dubai</span>
        </p>
        <div className="lead-bar-actions">
          <a
            className="lead-bar-btn is-wa"
            href={waHref}
            target="_blank"
            rel="noreferrer"
            tabIndex={visible ? 0 : -1}
            aria-label="WhatsApp"
          >
            <IconWhatsApp size={18} />
            <span className="lead-bar-wa-label">WhatsApp</span>
          </a>
          <a
            className="lead-bar-btn is-call"
            href={`tel:${company.phones[0].replace(/\s/g, '')}`}
            tabIndex={visible ? 0 : -1}
          >
            <IconPhone size={16} />
            Call
          </a>
          <Link
            className="lead-bar-btn is-quote"
            to="/contact#lead-form"
            tabIndex={visible ? 0 : -1}
          >
            {t.common.getQuote}
          </Link>
        </div>
      </div>
    </aside>
  )
}
