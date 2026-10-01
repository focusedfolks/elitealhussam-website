import { Link } from 'react-router-dom'
import type { CmsBlogPost } from '../cms/types'
import { SafeImage } from './SafeImage'
import './BlogCard.css'

type Props = {
  post: CmsBlogPost
  priority?: boolean
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return iso
  }
}

export function BlogCard({ post, priority = false }: Props) {
  return (
    <Link to={`/blog/${post.slug}`} className="blog-card">
      <div className="blog-card-media">
        <SafeImage
          src={post.coverImage}
          alt={`${post.title} — ${post.category}`}
          loading={priority ? 'eager' : 'lazy'}
          width={640}
          height={360}
        />
        <span className="blog-card-badge">{post.category}</span>
      </div>
      <div className="blog-card-body">
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <div className="blog-card-meta">
          <span>{post.author}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readTime}</span>
        </div>
      </div>
    </Link>
  )
}
