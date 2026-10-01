import type { GuideBlock, GuidePage } from './types'

export function paragraphs(...texts: string[]): GuideBlock[] {
  return texts.filter(Boolean).map((text) => ({ type: 'paragraph' as const, text }))
}

export function heading(level: 2 | 3 | 4, text: string): GuideBlock {
  return { type: 'heading', level, text }
}

export function list(items: string[], ordered = false): GuideBlock {
  return { type: 'list', items, ordered }
}

export function quote(text: string, cite?: string): GuideBlock {
  return { type: 'quote', text, cite }
}

/** Embed a local asset path (e.g. `/media/guide/foo.pdf`) — never a remote URL. */
export function pdfEmbed(src: string, title?: string): GuideBlock {
  return {
    type: 'embed',
    kind: 'pdf',
    src,
    title,
    height: 900,
  }
}

export function notice(text: string, variant: 'info' | 'warning' = 'info'): GuideBlock {
  return { type: 'notice', variant, text }
}

export function page(
  partial: Omit<GuidePage, 'blocks'> & { blocks: GuideBlock[] },
): GuidePage {
  return partial
}
