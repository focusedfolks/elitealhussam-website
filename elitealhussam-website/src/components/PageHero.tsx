import { Link } from 'react-router-dom'

type Crumb = { label: string; to?: string }

type PageHeroProps = {
  title: string
  subtitle?: string
  image: string
  crumbs?: Crumb[]
}

export function PageHero({ title, subtitle, image, crumbs }: PageHeroProps) {
  return (
    <section
      className="page-hero"
      style={{ ['--page-hero-image' as string]: `url(${image})` }}
    >
      <div className="container rise">
        {crumbs && crumbs.length > 0 ? (
          <nav className="page-hero-crumbs" aria-label="Breadcrumb">
            {crumbs.map((crumb, i) => (
              <span key={`${crumb.label}-${i}`}>
                {i > 0 ? <span className="page-hero-sep">/</span> : null}
                {crumb.to ? (
                  <Link to={crumb.to}>{crumb.label}</Link>
                ) : (
                  <span aria-current="page">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        ) : null}
        <h1>{title}</h1>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
    </section>
  )
}
