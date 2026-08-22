import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function isDesktopMotion() {
  return window.matchMedia('(min-width: 768px)').matches
}

export function refreshScrollTriggers() {
  ScrollTrigger.refresh()
}

export function killAllScrollTriggers() {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
}
