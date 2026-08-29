import { Link } from 'react-router-dom'
import { useEffect, useMemo, useRef, useState, type TouchEvent } from 'react'
import { HERO_SLIDE_META } from '../i18n/heroMeta'
import { IconBuilding, IconShieldCheck, IconSparkle } from './Icons'
import { useI18n } from '../i18n'
import './Hero.css'

const SLIDE_MS = 2000

type HeroSlideCta = {
  label: string
  link: string
}

type HeroSlide = {
  id: string
  image: string
  position?: string
  headline: string
  subtext: string
  primaryCta: HeroSlideCta
  secondaryCta: HeroSlideCta
  complianceTag: string | null
}

export function Hero() {
  const { t } = useI18n()
  const slides = useMemo<HeroSlide[]>(
    () =>
      HERO_SLIDE_META.map((meta, i) => {
        const copy = t.hero.slides[i]
        return {
          id: meta.id,
          image: meta.image,
          position: 'position' in meta ? meta.position : undefined,
          headline: copy.headline,
          subtext: copy.subtext,
          primaryCta: { label: copy.primaryCta, link: meta.primaryLink },
          secondaryCta: { label: copy.secondaryCta, link: meta.secondaryLink },
          complianceTag: copy.complianceTag,
        }
      }),
    [t.hero.slides],
  )
  const [ready, setReady] = useState(false)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const touchStartX = useRef<number | null>(null)

  useEffect(() => {
    setReady(true)
  }, [])

  useEffect(() => {
    setIndex((current) => Math.min(current, slides.length - 1))
  }, [slides.length])

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduceMotion.matches || paused) return

    const id = window.setTimeout(() => {
      setIndex((current) => (current + 1) % slides.length)
    }, SLIDE_MS)

    return () => window.clearTimeout(id)
  }, [index, paused, slides.length])

  const slide = slides[index]

  function goToSlide(i: number) {
    setIndex(i)
  }

  function onTouchStart(e: TouchEvent) {
    touchStartX.current = e.touches[0]?.clientX ?? null
  }

  function onTouchEnd(e: TouchEvent) {
    if (touchStartX.current === null) return
    const endX = e.changedTouches[0]?.clientX
    if (endX == null) return
    const delta = endX - touchStartX.current
    touchStartX.current = null
    if (Math.abs(delta) < 48) return
    if (delta < 0) {
      setIndex((current) => (current + 1) % slides.length)
    } else {
      setIndex((current) => (current - 1 + slides.length) % slides.length)
    }
  }

  if (!slide) return null

  return (
    <section
      className={`hero-single hero-section${ready ? ' is-ready' : ''}`}
      data-active-slide={slide.id}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-roledescription="carousel"
      aria-label="Sacred journey highlights"
    >
      {slides.map((item, i) => (
        <div
          key={item.id}
          className={`hero-slide hero-slide--${item.id}${i === index ? ' is-active' : ''}`}
          style={
            Math.abs(i - index) <= 1 ||
            (index === 0 && i === slides.length - 1)
              ? {
                  backgroundImage: `url(${item.image})`,
                  ...(item.position ? { backgroundPosition: item.position } : {}),
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
        <h1 className="rise rise-delay-1" key={`headline-${slide.id}`}>
          <span className="hero-title-main">{slide.headline}</span>
        </h1>
        <p className="hero-copy rise rise-delay-2" key={`subtext-${slide.id}`}>
          {slide.subtext}
        </p>
        <div className="hero-actions rise rise-delay-3" key={`cta-${slide.id}`}>
          <Link
            className="btn btn-gold hero-cta-pulse"
            to={slide.primaryCta.link}
          >
            {slide.primaryCta.label}
          </Link>
          <Link
            className="btn btn-ghost hero-cta-secondary"
            to={slide.secondaryCta.link}
          >
            {slide.secondaryCta.label}
          </Link>
        </div>
        <div className="hero-trust-bar rise rise-delay-3">
          <span>
            <IconShieldCheck size={14} /> {t.hero.licensedOperator}
          </span>
          <span>
            <IconSparkle size={14} /> {t.hero.yearsExperience}
          </span>
          <span>
            <IconBuilding size={14} /> {t.hero.dubaiUae}
          </span>
        </div>
        <p className="hero-faith rise rise-delay-3">{t.hero.faithQuote}</p>
        {slide.complianceTag ? (
          <p
            className="hero-passport rise rise-delay-3"
            key={`compliance-${slide.id}`}
          >
            {slide.complianceTag}
          </p>
        ) : null}
      </div>

      <div className="hero-dots" role="tablist" aria-label="Hero slides">
        {slides.map((item, i) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Show slide ${i + 1}: ${item.headline}`}
            className={`hero-dot${i === index ? ' is-active' : ''}`}
            onClick={() => goToSlide(i)}
          />
        ))}
      </div>
    </section>
  )
}

