import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { WhatsAppButton } from './WhatsApp'
import { LeadBar } from './LeadBar'
import { useScrollReveal } from '../animations/useScrollReveal'

export function Layout() {
  useScrollReveal()

  return (
    <div className="site-shell">
      <Header />
      <main className="site-main">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <LeadBar />
    </div>
  )
}
