import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  gsap,
  killAllScrollTriggers,
  prefersReducedMotion,
  refreshScrollTriggers,
} from './gsap'

const REVEAL_SELECTORS = [
  '.page-hero .container',
  '.section-head',
  '.contact-card',
  '.blog-card',
  '.lead-panel',
  '.about-stat-card',
  '.highlight-card',
].join(', ')

/** Site-wide subtle fade-up reveals on inner pages (homepage has its own hook). */
export function useScrollReveal() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname === '/' || prefersReducedMotion()) return

    const root = document.querySelector('.site-main')
    if (!root) return

    const elements = Array.from(
      root.querySelectorAll<HTMLElement>(REVEAL_SELECTORS),
    ).filter((el) => !el.closest('.home'))

    const ctx = gsap.context(() => {
      elements.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          },
        )
      })
    }, root)

    const onLoad = () => refreshScrollTriggers()
    window.addEventListener('load', onLoad)

    return () => {
      window.removeEventListener('load', onLoad)
      ctx.revert()
      killAllScrollTriggers()
    }
  }, [pathname])
}
