import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { images } from '../content/site'
import './Hero.css'

/** Swap / extend these paths — left panel (Hajj & Umrah) backgrounds */
const HAJJ_UMRAH_IMAGES = [
  images.familyMakkah,
  images.hero,
  images.umrah,
  images.heroMadinah,
  images.pilgrims,
] as const

/** Swap / extend these paths — right panel (Tours) backgrounds */
const TOURS_IMAGES = [
  images.dubai,
  images.touristHero,
  '/images/tours/bangkok-pattaya.jpg',
  '/images/tours/langkawi.jpg',
  '/images/tours/hanoi-sapa-halong.jpg',
] as const

const ROTATE_MS = 5000

function useIndependentSlideIndex(length: number, intervalMs: number) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (length <= 1) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduceMotion.matches) return

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % length)
    }, intervalMs)

    return () => window.clearInterval(id)
  }, [length, intervalMs])

  return index
}

type BgStackProps = {
  sources: readonly string[]
  activeIndex: number
}

function BackgroundStack({ sources, activeIndex }: BgStackProps) {
  return (
    <div className="hero-split-slides" aria-hidden>
      {sources.map((src, i) => (
        <div
          key={`${src}-${i}`}
          className={`hero-split-slide${i === activeIndex ? ' is-active' : ''}`}
          style={{ backgroundImage: `url(${src})` }}
        />
      ))}
    </div>
  )
}

/**
 * Contained 50/50 hero — background images auto-rotate with crossfade per side.
 */
export function Hero() {
  const hajjIndex = useIndependentSlideIndex(HAJJ_UMRAH_IMAGES.length, ROTATE_MS)
  const toursIndex = useIndependentSlideIndex(
    TOURS_IMAGES.length,
    ROTATE_MS + 900,
  )

  return (
    <section className="hero-shell" aria-label="Hajj, Umrah, and Tours">
      <div className="hero-split">
        <article className="hero-split-panel hero-split-panel--hajj">
          <BackgroundStack
            sources={HAJJ_UMRAH_IMAGES}
            activeIndex={hajjIndex}
          />
          <div className="hero-split-veil" aria-hidden />
          <div className="hero-split-content hero-split-content--hajj">
            <p className="hero-split-eyebrow">Sacred Journeys</p>
            <h1>Hajj &amp; Umrah</h1>
            <p className="hero-split-copy">
              Organised pilgrimage packages from Dubai, UAE — visas, hotels,
              transport, and spiritual guidance for families and groups. Flexible
              Umrah departures any time of year; Hajj in season.
            </p>
            <div className="hero-split-actions">
              <Link className="btn btn-gold" to="/packages/hajj-umrah">
                View Hajj &amp; Umrah Packages
              </Link>
            </div>
          </div>
        </article>

        <article className="hero-split-panel hero-split-panel--tours">
          <BackgroundStack sources={TOURS_IMAGES} activeIndex={toursIndex} />
          <div className="hero-split-veil hero-split-veil--tours" aria-hidden />
          <div className="hero-split-content hero-split-content--tours">
            <p className="hero-split-eyebrow">Global Travel</p>
            <h2>Tours</h2>
            <div className="hero-split-tours-row">
              <Link to="/international-tours">International</Link>
              <Link to="/local-tours">Local</Link>
              <Link className="hero-split-tours-cta" to="/international-tours">
                Explore Tours
              </Link>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
