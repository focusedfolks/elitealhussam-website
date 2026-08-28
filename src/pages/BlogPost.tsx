import { Link, Navigate, useParams } from 'react-router-dom'
import { useMemo } from 'react'
import { BlogCard } from '../components/BlogCard'
import { LeadForm } from '../components/LeadForm'
import { Seo } from '../components/Seo'
import { useCms } from '../cms/CmsProvider'
import { absoluteUrl } from '../lib/site'
import './Blog.css'

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  } catch {
    return iso
  }
}

export function BlogPost() {
  const { slug } = useParams()
  const { posts, company } = useCms()
  const post = posts.find((p) => p.slug === slug)

  const related = useMemo(() => {
    if (!post) return []
    return posts
      .filter((p) => p.slug !== post.slug && p.category === post.category)
      .slice(0, 3)
  }, [post, posts])

  if (!post) return <Navigate to="/blog" replace />

  const shareUrl =
    typeof window !== 'undefined'
      ? window.location.href
      : absoluteUrl(`/blog/${post.slug}`)
  const shareText = encodeURIComponent(post.title)
  const waShare = `https://wa.me/?text=${shareText}%20${encodeURIComponent(shareUrl)}`
  const fbShare = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl)
    } catch {
      /* ignore */
    }
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: absoluteUrl(post.coverImage),
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: company.shortName,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/images/alhussam-logo.png'),
      },
    },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
  }

  return (
    <div className="blog-page blog-post-page">
      <Seo
        title={`${post.title} | ELITE ALHUSSAM Blog`}
        description={post.excerpt}
        image={post.coverImage}
        url={`/blog/${post.slug}`}
        type="article"
        jsonLd={jsonLd}
      />

      <header className="blog-post-hero">
        <img
          src={post.coverImage}
          alt={`Cover image for ${post.title}`}
          className="blog-post-hero-img"
          fetchPriority="high"
          decoding="async"
          width={1200}
          height={630}
        />
        <div className="blog-post-hero-veil" aria-hidden="true" />
        <div className="container blog-post-hero-content">
          <nav className="page-hero-crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="page-hero-sep">/</span>
            <Link to="/blog">Blog</Link>
            <span className="page-hero-sep">/</span>
            <span aria-current="page">{post.title}</span>
          </nav>
          <span className="blog-post-cat">{post.category}</span>
          <h1>{post.title}</h1>
          <div className="blog-post-meta">
            <span>{post.author}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </header>

      <div className="blog-post-layout">
        <aside className="blog-share" aria-label="Share this article">
          <p>Share</p>
          <a href={waShare} target="_blank" rel="noreferrer" aria-label="Share on WhatsApp">
            WhatsApp
          </a>
          <a href={fbShare} target="_blank" rel="noreferrer" aria-label="Share on Facebook">
            Facebook
          </a>
          <button type="button" onClick={copyLink}>
            Copy link
          </button>
        </aside>

        <article
          className="blog-prose"
          dangerouslySetInnerHTML={{ __html: post.html || '' }}
        />
      </div>

      <div className="container">
        <div className="blog-author-card">
          <span className="blog-author-avatar" aria-hidden="true">
            EA
          </span>
          <div>
            <strong>{post.author}</strong>
            <p>45+ years guiding pilgrims from Dubai, UAE.</p>
          </div>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="blog-related">
          <div className="container">
            <header className="section-head">
              <p className="eyebrow">Keep reading</p>
              <h2 className="section-title">Related posts</h2>
            </header>
            <div className="blog-grid blog-grid--related">
              {related.map((item) => (
                <BlogCard key={item.slug} post={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <LeadForm
        title="Ready to plan your pilgrimage?"
        subtitle="Share a few details and our Dubai team will send a clear package quotation."
      />
    </div>
  )
}
