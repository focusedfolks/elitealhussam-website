/// <reference types="vite/client" />

declare module 'virtual:blog-posts' {
  export type BlogCategory =
    | 'Hajj Guide'
    | 'Umrah Tips'
    | 'Travel Advice'
    | 'Company News'

  export type BlogPost = {
    title: string
    slug: string
    date: string
    author: string
    category: BlogCategory
    excerpt: string
    coverImage: string
    readTime: string
    html: string
  }

  export const posts: BlogPost[]
}
