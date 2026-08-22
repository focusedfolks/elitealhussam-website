import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { heroSlides } from '../content/site'
import { IconBuilding, IconShieldCheck, IconSparkle } from './Icons'
import { useI18n } from '../i18n'
import './Hero.css'

const SLIDE_MS = 2000

export function Hero() {
  const { t } = useI18n()
  const [ready, setReady] = useState(false)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [])

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduceMotion.matches || paused) return

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % heroSlides.length)
    }, SLIDE_MS)

    return () => window.clearInterval(id)
  }, [paused])

  return (
    <section
      className={`hero-single hero-section${ready ? ' is-ready' : ''}`}
      data-active-slide={heroSlides[index]?.id}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Sacred journey highlights"
    >
      {heroSlides.map((slide, i) => (
        <div
          key={slide.id}
          className={`hero-slide hero-slide--${slide.id}${i === index ? ' is-active' : ''}`}
          style={
            Math.abs(i - index) <= 1 || (index === 0 && i === heroSlides.length - 1)
              ? {
                  backgroundImage: `url(${slide.image})`,
                  ...(slide.position
                    ? { backgroundPosition: slide.position }
                    : {}),
                }
              : undefined
          }
          aria-hidden={i !== index}
        />
      ))}
      <div className="hero-single-veil" aria-hidden />

      <div className="container hero-single-content">
        <p className="hero-kicker rise">
          <span className="hero-kicker-icon" aria-hidden>
            ★
          </span>
          {t.home.kicker} · {t.common.years}
        </p>
        <h1 className="rise rise-delay-1">
          <span className="hero-title-main">{t.home.headline}</span>
        </h1>
        <p className="hero-copy rise rise-delay-2">{t.home.support}</p>
        <div className="hero-actions rise rise-delay-3">
          <Link className="btn btn-gold hero-cta-pulse" to="/contact#lead-form">
            {t.home.explore}
          </Link>
          <Link className="btn btn-ghost hero-cta-secondary" to="/packages">
            {t.pages.packagesTitle}
          </Link>
        </div>
        <div className="hero-trust-bar rise rise-delay-3">
          <span>
            <IconShieldCheck size={14} /> Licensed Operator
          </span>
          <span>
            <IconSparkle size={14} /> 45+ Years
          </span>
          <span>
            <IconBuilding size={14} /> Chennai & Dubai
          </span>
        </div>
        <p className="hero-faith rise rise-delay-3">
          “Labbaik Allahumma Labbaik” - we walk with you in faith.
        </p>
      </div>

      <div className="hero-dots" role="tablist" aria-label="Hero slides">
        {heroSlides.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Show ${slide.label} image`}
            className={`hero-dot${i === index ? ' is-active' : ''}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </section>
  )
}
