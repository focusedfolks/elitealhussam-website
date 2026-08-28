import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { marked } from 'marked'

marked.setOptions({ gfm: true, breaks: false })
import type { Plugin } from 'vite'

export type BlogCategory =
  | 'Hajj Guide'
  | 'Umrah Tips'
  | 'Travel Advice'
  | 'Company News'

export type BlogPostMeta = {
  title: string
  slug: string
  date: string
  author: string
  category: BlogCategory
  excerpt: string
  coverImage: string
  readTime: string
}

export type BlogPost = BlogPostMeta & {
  html: string
}

const VIRTUAL_ID = 'virtual:blog-posts'
const RESOLVED_ID = '\0' + VIRTUAL_ID

function blogDir(root: string) {
  return path.resolve(root, 'content/blog')
}

function loadPosts(root: string): BlogPost[] {
  const dir = blogDir(root)
  if (!fs.existsSync(dir)) return []

  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))

  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), 'utf8')
    const { data, content } = matter(raw)
    const html = marked.parse(content.trim(), { async: false }) as string
    return {
      title: String(data.title ?? ''),
      slug: String(data.slug ?? file.replace(/\.mdx?$/, '')),
      date: String(data.date ?? ''),
      author: String(data.author ?? 'ELITE ALHUSSAM Team'),
      category: data.category as BlogCategory,
      excerpt: String(data.excerpt ?? ''),
      coverImage: String(data.coverImage ?? '/images/family-makkah.webp'),
      readTime: String(data.readTime ?? '5 min read'),
      html,
    } satisfies BlogPost
  })

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

function buildSitemap(root: string, posts: BlogPost[], site: string) {
  const staticRoutes = [
    '/',
    '/about',
    '/packages',
    '/pricing',
    '/blog',
    '/contact',
  ]
  const urls = [
    ...staticRoutes.map((loc) => ({ loc: `${site}${loc}`, priority: loc === '/' ? '1.0' : '0.8' })),
    ...posts.map((p) => ({
      loc: `${site}/blog/${p.slug}`,
      priority: '0.7',
      lastmod: p.date,
    })),
  ]

  const body = urls
    .map(
      (u) => `  <url>
    <loc>${u.loc}</loc>
    ${'lastmod' in u && u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}
    <changefreq>weekly</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
    )
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`
  fs.writeFileSync(path.resolve(root, 'public/sitemap.xml'), xml)
}

export function blogPlugin(): Plugin {
  let root = process.cwd()
  let siteUrl = 'https://elitealhussam.com'

  return {
    name: 'elite-alhussam-blog',
    configResolved(config) {
      root = config.root
      const fromEnv = config.env.VITE_SITE_URL
      if (fromEnv) siteUrl = fromEnv.replace(/\/$/, '')
    },
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID
    },
    load(id) {
      if (id !== RESOLVED_ID) return
      const posts = loadPosts(root)
      buildSitemap(root, posts, siteUrl)
      return `export const posts = ${JSON.stringify(posts)};`
    },
    configureServer(server) {
      server.watcher.add(blogDir(root))
      server.watcher.on('change', (file) => {
        if (!file.includes(`${path.sep}content${path.sep}blog`)) return
        const mod = server.moduleGraph.getModuleById(RESOLVED_ID)
        if (mod) void server.reloadModule(mod)
      })
    },
  }
}
