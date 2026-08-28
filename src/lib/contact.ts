/** Canonical Dubai / UAE contact helpers for public CTAs. */

export const CONTACT_PHONE_DISPLAY = '+971 56 574 6678'
export const CONTACT_PHONE_E164 = '+971565746678'
export const CONTACT_WHATSAPP_E164 = '971565746678'
export const CONTACT_EMAIL = 'alhussamuae@gmail.com'

export const PRICING_CTA_LABEL = 'Contact Us for Pricing & Package Details'
export const BUSINESS_CLASS_HAJJ_PACKAGE_ID = 'classic-hajj-2025'
export const BUSINESS_CLASS_HAJJ_CTA_LABEL = 'Contact Us for Business Class Rates'
export const HAJJ_PASSPORT_NOTE = 'Haj Services – Indian Passport Holders Only'

export function telHref(phone: string = CONTACT_PHONE_DISPLAY) {
  const cleaned = phone.replace(/[^\d+]/g, '')
  return `tel:${cleaned}`
}

export function whatsappHref(
  whatsapp: string = CONTACT_WHATSAPP_E164,
  text?: string,
) {
  const num = whatsapp.replace(/\D/g, '')
  const base = `https://wa.me/${num}`
  return text ? `${base}?text=${encodeURIComponent(text)}` : base
}
