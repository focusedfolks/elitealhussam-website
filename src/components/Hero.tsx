import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { images } from '../content/site'
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

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'family-makkah',
    image: images.familyMakkah,
    headline: 'Professional Hajj & Umrah packages from Dubai, UAE',
    subtext:
      'ELITE ALHUSSAM delivers organised pilgrimage packages from Dubai, UAE - trusted for 45+ years, built for families and group bookings. Haj services for Indian passport holders only.',
    primaryCta: {
      label: 'Start Your Hajj Journey',
      link: '/contact#lead-form',
    },
    secondaryCta: {
      label: 'View Hajj Packages',
      link: '/packages',
    },
    complianceTag: 'Haj Services – Indian Passport Holders Only',
  },
  {
    id: 'makkah',
    image: images.hero,
    headline: 'Umrah, Made Simple — Any Time of Year',
    subtext:
      'Flexible Umrah packages from Dubai, UAE for individuals, couples, and groups — hotel, transport, and visa handled end-to-end.',
    primaryCta: {
      label: 'Explore Umrah Deals',
      link: '/packages',
    },
    secondaryCta: {
      label: 'Talk to Our Team',
      link: '/contact#lead-form',
    },
    complianceTag: null,
  },
  {
    id: 'madinah',
    image: images.heroMadinah,
    position: 'center 42%',
    headline: '45+ Years of Trusted Hospitality, From Dubai',
    subtext:
      'Real people in Dubai, ready to plan your pilgrimage in person or on WhatsApp — backed by decades of hospitality experience.',
    primaryCta: {
      label: 'Meet Our Dubai Team',
      link: '/about',
    },
    secondaryCta: {
      label: 'Speak to Our Team',
      link: '/contact#lead-form',
    },
    complianceTag: null,
  },
  {
    id: 'umrah',
    image: images.umrah,
    headline: 'Family & Group Bookings, Handled With Care',
    subtext:
      'From coordinated hotel rooms to shared transport, we make group Hajj and Umrah travel simple for families traveling together.',
    primaryCta: {
      label: 'See Family Packages',
      link: '/packages',
    },
    secondaryCta: {
      label: 'Talk to Our Team',
      link: '/contact#lead-form',
    },
    complianceTag: null,
  },
  {
    id: 'pilgrims',
    image: images.pilgrims,
    headline: 'Chosen by 200+ Pilgrims and Counting',
    subtext:
      'See why families across Dubai and the UAE trust Elite Alhussam for their Hajj and Umrah journey.',
    primaryCta: {
      label: 'Check Available Dates',
      link: '/contact#lead-form',
    },
    secondaryCta: {
      label: 'View Hajj Packages',
      link: '/packages',
    },
    complianceTag: null,
  },
]

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

    const id = window.setTimeout(() => {
      setIndex((current) => (current + 1) % HERO_SLIDES.length)
    }, SLIDE_MS)

    return () => window.clearTimeout(id)
  }, [index, paused])

  const slide = HERO_SLIDES[index]

  function goToSlide(i: number) {
    setIndex(i)
  }

  return (
    <section
      className={`hero-single hero-section${ready ? ' is-ready' : ''}`}
      data-active-slide={slide.id}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Sacred journey highlights"
    >
      {HERO_SLIDES.map((item, i) => (
        <div
          key={item.id}
          className={`hero-slide hero-slide--${item.id}${i === index ? ' is-active' : ''}`}
          style={
            Math.abs(i - index) <= 1 ||
            (index === 0 && i === HERO_SLIDES.length - 1)
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
            <IconShieldCheck size={14} /> Licensed Operator
          </span>
          <span>
            <IconSparkle size={14} /> 45+ Years
          </span>
          <span>
            <IconBuilding size={14} /> Dubai, UAE
          </span>
        </div>
        <p className="hero-faith rise rise-delay-3">
          “Labbaik Allahumma Labbaik” - we walk with you in faith.
        </p>
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
        {HERO_SLIDES.map((item, i) => (
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
