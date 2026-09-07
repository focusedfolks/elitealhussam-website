import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { images } from '../content/site'
import { IconMountain, IconMosque } from './Icons'
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
            <IconMosque className="hero-split-icon" size={34} />
            <h1>Umrah</h1>
            <p className="hero-split-copy">A Journey of Faith, Peace &amp; Blessings</p>
            <span className="hero-split-ornament" aria-hidden="true">◆</span>
            <div className="hero-split-actions">
              <Link className="hero-split-button hero-split-button--hajj" to="/packages/hajj-umrah">
                Start Your Umrah Journey <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </article>

        <article className="hero-split-panel hero-split-panel--tours">
          <BackgroundStack sources={TOURS_IMAGES} activeIndex={toursIndex} />
          <div className="hero-split-veil hero-split-veil--tours" aria-hidden />
          <div className="hero-split-content hero-split-content--tours">
            <IconMountain className="hero-split-icon" size={34} />
            <h2>Tours</h2>
            <p className="hero-split-copy">Explore the World, Create Memories</p>
            <span className="hero-split-ornament" aria-hidden="true">◆</span>
            <div className="hero-split-actions">
              <Link className="hero-split-button hero-split-button--tours" to="/international-tours">
                Explore More <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
