import type { ReactNode } from 'react'

const INDIAN_PASSPORT_PHRASE = 'Indian passport holders'

/** Bold "Indian passport holders" wherever it appears in CMS copy. */
export function emphasizeIndianPassport(text: string): ReactNode {
  const idx = text.indexOf(INDIAN_PASSPORT_PHRASE)
  if (idx === -1) return text
  return (
    <>
      {text.slice(0, idx)}
      <strong>{INDIAN_PASSPORT_PHRASE}</strong>
      {text.slice(idx + INDIAN_PASSPORT_PHRASE.length)}
    </>
  )
}
