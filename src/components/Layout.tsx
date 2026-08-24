import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { WhatsAppButton } from './WhatsApp'
import { LeadBar } from './LeadBar'
import { useScrollReveal } from '../animations/useScrollReveal'

export function Layout() {
  const { pathname } = useLocation()
  useScrollReveal()

  return (
    <div className="site-shell">
      <Header />
      <main className="site-main">
        <Outlet key={pathname} />
      </main>
      <Footer />
      <WhatsAppButton />
      <LeadBar />
    </div>
  )
}
