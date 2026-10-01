import { IconWhatsApp } from './Icons'
import { useCms } from '../cms/CmsProvider'
import { useI18n } from '../i18n'
import { whatsappHref } from '../lib/contact'
import './WhatsApp.css'

export function WhatsAppButton() {
  const { t } = useI18n()
  const { company } = useCms()
  const href = whatsappHref(
    company.whatsapp,
    'Assalamu Alaikum, I would like to enquire about Hajj / Umrah packages.',
  )

  return (
    <a
      className="wa-float"
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={t.whatsapp}
    >
      <IconWhatsApp size={22} />
      <span>{t.whatsapp}</span>
    </a>
  )
}
