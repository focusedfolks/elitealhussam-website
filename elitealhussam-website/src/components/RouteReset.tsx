import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { killAllScrollTriggers } from '../animations/gsap'

/** Reset scroll/GSAP leftovers so client-side route changes actually show the new page. */
export function RouteReset() {
  const { pathname } = useLocation()

  useEffect(() => {
    killAllScrollTriggers()
    document.body.style.overflow = ''
    document.body.style.position = ''
    document.body.style.height = ''
    document.body.style.top = ''
    document.body.style.width = ''
    document.documentElement.style.overflow = ''
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
