import type { ReactNode, SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

function Icon({ size = 22, children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </svg>
  )
}

export function IconCalendar(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
      <path d="M8 14h2M12 14h2M16 14h.01M8 17h2M12 17h2" />
    </Icon>
  )
}

export function IconShieldCheck(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6l8-3Z" />
      <path d="M9 12l2 2 4-4" />
    </Icon>
  )
}

export function IconBook(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5V5.5Z" />
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    </Icon>
  )
}

export function IconHotel(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 21h18M5 21V8l7-4 7 4v13" />
      <path d="M9 21v-6h6v6M9 10h.01M15 10h.01M12 10h.01" />
    </Icon>
  )
}

export function IconBuilding(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 21V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16M14 10h5a1 1 0 0 1 1 1v10" />
      <path d="M8 8h2M8 12h2M8 16h2M17 14h.01M17 17h.01" />
    </Icon>
  )
}

export function IconGlobe(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.8 3.8 5.8 3.8 9S14.5 18.2 12 21c-2.5-2.8-3.8-5.8-3.8-9S9.5 5.8 12 3Z" />
    </Icon>
  )
}

export function IconBadge(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3l2.2 4.5 5 .7-3.6 3.5.9 5L12 14.8 7.5 16.7l.9-5L4.8 8.2l5-.7L12 3Z" />
    </Icon>
  )
}

export function IconHeadset(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 13a8 8 0 0 1 16 0" />
      <path d="M4 13v4a2 2 0 0 0 2 2h1v-6H6a2 2 0 0 0-2 2Zm16 0v4a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2Z" />
      <path d="M12 19v2" />
    </Icon>
  )
}

export function IconSparkle(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3Z" />
      <path d="M19 15l.7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z" />
    </Icon>
  )
}

export function IconShield(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6l8-3Z" />
    </Icon>
  )
}

export function IconScroll(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M8 5h9a3 3 0 0 1 3 3v9a2 2 0 0 1-2 2H9" />
      <path d="M8 5a3 3 0 0 0-3 3v11a2 2 0 0 0 2 2h1V8a3 3 0 0 1 3-3" />
      <path d="M11 10h6M11 14h6" />
    </Icon>
  )
}

export function IconLandmark(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 21h18M5 21V10l7-5 7 5v11" />
      <path d="M9 21v-6h6v6M10 13h4" />
    </Icon>
  )
}

export function IconKaaba(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 8l8-4 8 4v10l-8 4-8-4V8Z" />
      <path d="M4 8l8 4 8-4M12 12v10" />
      <path d="M7 14.5h4M13 16h4" />
    </Icon>
  )
}

export function IconMapPin(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </Icon>
  )
}

export function IconPhone(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M7.2 3.8h3.1l1.4 4.2-2.1 1.3a14 14 0 0 0 5.6 5.6l1.3-2.1 4.2 1.4v3.1a2 2 0 0 1-2.2 2A17 17 0 0 1 3.2 6a2 2 0 0 1 2-2.2h2Z" />
    </Icon>
  )
}

export function IconMail(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 7 9-7" />
    </Icon>
  )
}

export function IconUsers(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="9" cy="8" r="3.2" />
      <circle cx="16.5" cy="9" r="2.4" />
      <path d="M3.5 19c1.4-3 3.5-4.5 5.5-4.5S13.1 16 14.5 19" />
      <path d="M14 14.8c1.2-.7 2.5-1 3.8-1 1.6 0 3 .5 4.2 1.8" />
    </Icon>
  )
}

export function IconPlane(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M21 15.5 14 12l-2.5 7L10 15l-6 1.5L5.5 14 2 12.5 5.5 11 4 8.5 10 10l1.5-4L14 12l7-3.5v7Z" />
    </Icon>
  )
}

export function IconLock(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </Icon>
  )
}

export function IconWhatsApp(props: IconProps) {
  return (
    <svg
      width={props.size ?? 22}
      height={props.size ?? 22}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      {...props}
    >
      <path d="M12 2.04c-5.46 0-9.9 4.44-9.9 9.9 0 1.74.45 3.45 1.32 4.95L2.04 22l5.25-1.38a9.86 9.86 0 0 0 4.71 1.2h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.65-1.03-5.14-2.9-7.01A9.84 9.84 0 0 0 12 2.04Zm0 18.09h-.01a8.17 8.17 0 0 1-4.16-1.14l-.3-.18-3.11.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.25-4.36c0-4.52 3.68-8.2 8.2-8.2 2.19 0 4.25.85 5.8 2.4a8.17 8.17 0 0 1 2.4 5.8c0 4.52-3.68 8.2-8.2 8.2Zm4.49-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.09-.39-.12-.56.12-.16.25-.64.8-.78.96-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74 1.49.64 1.95.7 2.65.59.4-.07 1.46-.6 1.67-1.17.21-.58.21-1.07.14-1.17-.06-.11-.23-.17-.48-.29Z" />
    </svg>
  )
}

export function IconFacebook(props: IconProps) {
  return (
    <svg
      width={props.size ?? 18}
      height={props.size ?? 18}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      {...props}
    >
      <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1Z" />
    </svg>
  )
}

export function IconTwitter(props: IconProps) {
  return (
    <svg
      width={props.size ?? 18}
      height={props.size ?? 18}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      {...props}
    >
      <path d="M18.9 2H21l-6.5 7.4L22 22h-6.2l-4.9-6.4L5.3 22H3.2l7-8L2 2h6.3l4.4 5.8L18.9 2Zm-1.1 18h1.7L7.3 3.9H5.5L17.8 20Z" />
    </svg>
  )
}

export function IconYouTube(props: IconProps) {
  return (
    <svg
      width={props.size ?? 18}
      height={props.size ?? 18}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      {...props}
    >
      <path d="M23 12.2s0-3.2-.4-4.7c-.2-.9-.9-1.6-1.8-1.8C18.4 5.2 12 5.2 12 5.2s-6.4 0-8.8.5c-.9.2-1.6.9-1.8 1.8C1 9 1 12.2 1 12.2s0 3.2.4 4.7c.2.9.9 1.6 1.8 1.8 2.4.5 8.8.5 8.8.5s6.4 0 8.8-.5c.9-.2 1.6-.9 1.8-1.8.4-1.5.4-4.7.4-4.7ZM9.8 15.5v-6.6l6.3 3.3-6.3 3.3Z" />
    </svg>
  )
}

export const highlightIcons = {
  weekly: IconCalendar,
  bestPrice: IconShieldCheck,
  guidance: IconBook,
  luxury: IconHotel,
  chennaiSupport: IconBuilding,
  multilingual: IconGlobe,
} as const

export const featureIcons = [
  IconBadge,
  IconHeadset,
  IconSparkle,
  IconShield,
] as const
