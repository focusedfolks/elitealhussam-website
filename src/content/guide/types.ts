export type GuideSectionId = 'history' | 'ziyarat' | 'rituals' | 'gallery'

export type GuideBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; level: 2 | 3 | 4; text: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'quote'; text: string; cite?: string }
  | {
      type: 'embed'
      kind: 'pdf' | 'video'
      src: string
      title?: string
      height?: number
    }
  | {
      type: 'gallery'
      albums: {
        title: string
        images: { src: string; alt: string }[]
      }[]
    }
  | { type: 'notice'; variant?: 'info' | 'warning'; text: string }

export type GuidePage = {
  slug: string
  title: string
  section: GuideSectionId
  subtitle?: string
  heroImage?: string
  /** Original alhussam.in source URL */
  sourceUrl: string
  blocks: GuideBlock[]
}
