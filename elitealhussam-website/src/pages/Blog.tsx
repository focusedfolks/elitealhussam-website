import { useMemo, useState } from 'react'
import { PageHero } from '../components/PageHero'
import { BlogCard } from '../components/BlogCard'
import { LeadForm } from '../components/LeadForm'
import { Seo } from '../components/Seo'
import { useCms } from '../cms/CmsProvider'
import { pageMeta } from '../seo/pageMeta'
import type { CmsBlogPost } from '../cms/types'
import { images } from '../content/site'
import './Blog.css'

const PAGE_SIZE = 9

type BlogCategory = CmsBlogPost['category']

const filters: Array<{ key: 'all' | BlogCategory; label: string }> = [
  { key: 'all', label: 'All Posts' },
  { key: 'Hajj Guide', label: 'Hajj Guide' },
  { key: 'Umrah Tips', label: 'Umrah Tips' },
  { key: 'Travel Advice', label: 'Travel Advice' },
  { key: 'Company News', label: 'Company News' },
]

export function Blog() {
  const { posts } = useCms()
  const [filter, setFilter] = useState<'all' | BlogCategory>('all')
  const [visible, setVisible] = useState(PAGE_SIZE)

  const filtered = useMemo(
    () =>
      filter === 'all' ? posts : posts.filter((p) => p.category === filter),
    [filter, posts],
  )

  const shown = filtered.slice(0, visible)

  return (
    <div className="blog-page">
      <Seo
        title={pageMeta.blog.title}
        description={pageMeta.blog.description}
        url={pageMeta.blog.path}
        image={pageMeta.blog.image}
      />
      <PageHero
        title="Blog"
        subtitle="Guidance, tips, and stories for your pilgrimage journey."
        image={images.makkahArch}
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Blog' },
        ]}
      />

      <section className="inner-section blog-listing">
        <div className="container">
          <div className="blog-filters" role="tablist" aria-label="Blog categories">
            {filters.map((item) => (
              <button
                key={item.key}
                type="button"
                role="tab"
                aria-selected={filter === item.key}
                className={`blog-filter${filter === item.key ? ' is-active' : ''}`}
                onClick={() => {
                  setFilter(item.key)
                  setVisible(PAGE_SIZE)
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <p className="blog-filter-meta">
            Showing {shown.length} of {filtered.length} posts
          </p>

          {shown.length === 0 ? (
            <p className="blog-empty">No posts in this category yet. Check back soon.</p>
          ) : (
            <div className="blog-grid">
              {shown.map((post, i) => (
                <BlogCard key={post.slug} post={post} priority={i < 3} />
              ))}
            </div>
          )}

          {visible < filtered.length ? (
            <div className="blog-load-more">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setVisible((n) => n + PAGE_SIZE)}
              >
                Load More
              </button>
            </div>
          ) : null}
        </div>
      </section>

      <LeadForm
        title="Ready to plan your pilgrimage?"
        subtitle="Share a few details and our Dubai team will send a clear package quotation."
      />
    </div>
  )
}
