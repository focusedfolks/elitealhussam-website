import { Link } from 'react-router-dom'
import {
  IconFacebook,
  IconMail,
  IconMapPin,
  IconPhone,
  IconTwitter,
  IconWhatsApp,
  IconYouTube,
} from './Icons'
import { company } from '../content/site'
import { useI18n } from '../i18n'
import { BrandMark } from './BrandMark'
import './Footer.css'

export function Footer() {
  const { t } = useI18n()
  const waHref = `https://wa.me/91${company.whatsapp}`

  return (
    <footer className="site-footer">
      <div className="footer-cta">
        <div className="container footer-cta-row">
          <div className="footer-cta-copy">
            <h2>{t.home.needHelp}</h2>
            <p>{t.home.needHelpText}</p>
          </div>
          <div className="footer-cta-actions">
            <Link className="btn btn-gold" to="/contact#lead-form">
              {t.common.getQuote}
            </Link>
            <a
              className="btn footer-wa-btn"
              href={waHref}
              target="_blank"
              rel="noreferrer"
            >
              <IconWhatsApp size={16} />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="footer-brand-row">
            <img
              src="/images/alhussam-logo.png?v=2"
              alt=""
              className="footer-logo"
              width={64}
              height={64}
              loading="lazy"
              decoding="async"
            />
            <BrandMark size="md" showTagline showRule light />
          </div>
          <p className="footer-blurb">{company.background}</p>
          <div className="footer-social">
            <a href={company.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
              <IconFacebook size={16} />
            </a>
            <a href={company.social.twitter} target="_blank" rel="noreferrer" aria-label="Twitter">
              <IconTwitter size={16} />
            </a>
            <a href={company.social.youtube} target="_blank" rel="noreferrer" aria-label="YouTube">
              <IconYouTube size={16} />
            </a>
            <a href={waHref} target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <IconWhatsApp size={16} />
            </a>
          </div>
        </div>

        <div className="footer-col">
          <details className="footer-acc" open>
            <summary>{t.footer.quick}</summary>
            <ul>
              {t.nav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </details>
        </div>

        <div className="footer-col">
          <details className="footer-acc" open>
            <summary>{t.footer.packages}</summary>
            <ul>
              <li>
                <Link to="/packages">{t.pages.packagesTitle}</Link>
              </li>
              <li>
                <Link to="/about">{t.pages.aboutTitle}</Link>
              </li>
              <li>
                <Link to="/contact">{t.pages.contactTitle}</Link>
              </li>
            </ul>
          </details>
        </div>

        <div className="footer-col footer-contact">
          <details className="footer-acc" open>
            <summary>{t.footer.contact}</summary>
            <div className="footer-contact-card">
              {company.offices.map((office) => (
                <p className="footer-contact-line" key={office.id}>
                  <span className="footer-contact-icon" aria-hidden>
                    <IconMapPin size={15} />
                  </span>
                  <span>
                    <strong className="footer-office-label">{office.label}</strong>
                    <span className="footer-office-name">{office.companyName}</span>
                    {office.lines.map((line) => (
                      <span key={line} className="address-line">
                        {line}
                      </span>
                    ))}
                  </span>
                </p>
              ))}
              <p className="footer-contact-line">
                <span className="footer-contact-icon" aria-hidden>
                  <IconPhone size={15} />
                </span>
                <span>
                  {company.phones.map((phone) => (
                    <a key={phone} href={`tel:${phone.replace(/\s/g, '')}`}>
                      {phone}
                    </a>
                  ))}
                </span>
              </p>
              <p className="footer-contact-line">
                <span className="footer-contact-icon" aria-hidden>
                  <IconMail size={15} />
                </span>
                <a href={`mailto:${company.email}`}>{company.email}</a>
              </p>
              <p className="footer-contact-line">
                <span className="footer-contact-icon" aria-hidden>
                  <IconWhatsApp size={15} />
                </span>
                <a href={waHref} target="_blank" rel="noreferrer">
                  {company.whatsapp}
                </a>
              </p>
            </div>
          </details>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>
            © {new Date().getFullYear()} {company.shortName}. {t.footer.rights}
          </span>
          <span className="footer-bottom-note">{t.tagline}</span>
        </div>
      </div>
    </footer>
  )
}
