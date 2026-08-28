import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { pageMeta } from '../seo/pageMeta'
import './NotFound.css'

export function NotFound() {
  const meta = pageMeta.notFound

  return (
    <div className="not-found">
      <Seo
        title={meta.title}
        description={meta.description}
        url={meta.path}
        image={meta.image}
      />
      <div className="not-found-inner">
        <p className="not-found-code" aria-hidden="true">404</p>
        <h1>This page could not be found</h1>
        <p>
          The link may be outdated or mistyped. Explore Hajj and Umrah packages
          from our Dubai, UAE office, or contact us for package details.
        </p>
        <div className="not-found-actions">
          <Link className="btn btn-gold" to="/">
            Back to Home
          </Link>
          <Link className="btn btn-ghost" to="/contact#lead-form">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}
