import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { WhatsAppButton } from './WhatsApp'
import { useScrollReveal } from '../animations/useScrollReveal'
import { useI18n } from '../i18n'

export function Layout() {
  const { pathname } = useLocation()
  const { lang } = useI18n()
  useScrollReveal()

  return (
    <div className="site-shell">
      <Header />
      <main className="site-main">
        <Outlet key={`${pathname}-${lang}`} />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
