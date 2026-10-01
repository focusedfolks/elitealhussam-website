import { Link, Navigate, useLocation, useParams } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { Seo } from '../components/Seo'
import {
  GUIDE_DEFAULT_PATH,
  getGuidePage,
  guidePages,
} from '../content/guide'
import type { GuideBlock } from '../content/guide/types'
import { images } from '../content/site'
import './InnerPages.css'
import './GuidePage.css'

function renderBlock(block: GuideBlock, index: number) {
  switch (block.type) {
    case 'paragraph':
      return <p key={index}>{block.text}</p>
    case 'heading': {
      const Tag = `h${block.level}` as 'h2' | 'h3' | 'h4'
      return (
        <Tag key={index} className="guide-heading">
          {block.text}
        </Tag>
      )
    }
    case 'list': {
      const ListTag = block.ordered ? 'ol' : 'ul'
      return (
        <ListTag key={index} className="guide-list">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ListTag>
      )
    }
    case 'quote':
      return (
        <blockquote key={index} className="guide-quote">
          <p>{block.text}</p>
          {block.cite ? <cite>{block.cite}</cite> : null}
        </blockquote>
      )
    case 'notice':
      return (
        <p
          key={index}
          className={`guide-notice guide-notice--${block.variant ?? 'info'}`}
        >
          {block.text}
        </p>
      )
    default:
      return null
  }
}

export function GuidePage() {
  const { slug, region, ziyaratSlug } = useParams()
  const location = useLocation()
  const guideSlug = location.pathname.startsWith('/guide/history/')
    ? `history/${slug ?? ''}`
    : location.pathname.startsWith('/guide/ziyarat/')
      ? `ziyarat/${region ?? ''}/${ziyaratSlug ?? ''}`
      : slug
  const page = guideSlug ? getGuidePage(guideSlug) : undefined

  if (!guideSlug) return <Navigate to={GUIDE_DEFAULT_PATH} replace />
  if (!page) return <Navigate to={GUIDE_DEFAULT_PATH} replace />

  const hero = page.heroImage ?? images.pilgrimsHero
  const ziyaratRegion = page.slug.match(/^ziyarat\/([^/]+)\//)?.[1]
  const related = Array.from(
    new Map(
      guidePages
        .filter((item) =>
          ziyaratRegion
            ? item.slug.startsWith(`ziyarat/${ziyaratRegion}/`) &&
              item.slug !== page.slug
            : item.section === 'history' && item.slug !== page.slug,
        )
        .map((item) => [item.slug, item]),
    ).values(),
  )
  const relatedLabel = ziyaratRegion
    ? `More in ${ziyaratRegion[0].toUpperCase()}${ziyaratRegion.slice(1)} Ziyarat`
    : 'More in History'

  return (
    <div className="guide-page">
      <Seo
        title={`${page.title} | ELITE ALHUSSAM Guide`}
        description={
          page.subtitle ??
          `${page.title} — pilgrim guidance from ELITE ALHUSSAM, Dubai.`
        }
        url={`/guide/${page.slug}`}
        image={hero}
      />
      <PageHero
        title={page.title}
        subtitle={page.subtitle}
        image={hero}
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'History', to: GUIDE_DEFAULT_PATH },
          ...(ziyaratRegion
            ? [{ label: `Ziyarat · ${ziyaratRegion[0].toUpperCase()}${ziyaratRegion.slice(1)}` }]
            : []),
          { label: page.title },
        ]}
      />

      <section className="inner-section">
        <div className="container guide-layout">
          <article className="guide-prose">
            {page.blocks.map(renderBlock)}
          </article>

          {related.length > 0 ? (
            <aside className="guide-aside" aria-label="More guide articles">
              <p className="eyebrow">{relatedLabel}</p>
              <ul className="guide-related">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link to={`/guide/${item.slug}`}>{item.title}</Link>
                  </li>
                ))}
              </ul>
              <div className="cta-row">
                <Link className="btn btn-gold" to="/packages">
                  View packages
                </Link>
                <Link className="btn btn-ghost" to="/contact">
                  Talk to us
                </Link>
              </div>
            </aside>
          ) : null}
        </div>
      </section>
    </div>
  )
}
