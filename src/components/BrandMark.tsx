import './BrandMark.css'

type Props = {
  size?: 'sm' | 'md' | 'lg'
  showTagline?: boolean
  showRule?: boolean
  light?: boolean
  className?: string
}

export function BrandMark({
  size = 'md',
  showTagline = true,
  showRule = false,
  light = false,
  className = '',
}: Props) {
  return (
    <span
      className={`brand-mark brand-mark--${size}${light ? ' is-light' : ''} ${className}`.trim()}
    >
      <span className="brand-mark-name" aria-label="Elite Alhussam">
        <span className="brand-mark-elite">ELITE</span>
        <span className="brand-mark-alhussam"> ALHUSSAM</span>
      </span>
      {showTagline ? (
        <span className="brand-mark-tagline">TRAVEL AND TOURISM L.L.C</span>
      ) : null}
      {showRule ? <span className="brand-mark-rule" aria-hidden /> : null}
    </span>
  )
}
