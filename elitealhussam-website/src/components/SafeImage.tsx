import type { ImgHTMLAttributes } from 'react'

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  alt: string
}

/**
 * Standardized image element with lazy loading and async decode.
 * (Vite SPA — no next/image; use width/height when known to reduce layout shift.)
 */
export function SafeImage({
  alt,
  loading = 'lazy',
  decoding = 'async',
  ...props
}: Props) {
  return (
    <img alt={alt} loading={loading} decoding={decoding} {...props} />
  )
}
