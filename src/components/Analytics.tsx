import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

function isPublicRoute(pathname: string) {
  return !pathname.startsWith('/admin')
}

/** Loads GA4 once and sends page_view on every public route change. */
export function Analytics() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    if (!GA_ID || !isPublicRoute(pathname)) return

    if (!window.gtag) {
      window.dataLayer = window.dataLayer || []
      window.gtag = function gtag(...args: unknown[]) {
        window.dataLayer?.push(args)
      }
      window.gtag('js', new Date())
      window.gtag('config', GA_ID, { send_page_view: false })

      const script = document.createElement('script')
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
      document.head.appendChild(script)
    }

    window.gtag?.('event', 'page_view', {
      page_path: `${pathname}${search}`,
      page_location: window.location.href,
      page_title: document.title,
    })
  }, [pathname, search])

  return null
}
