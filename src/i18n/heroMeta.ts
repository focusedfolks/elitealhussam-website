import { images } from '../content/site'

/** Language-neutral hero slide layout (images + links). Copy lives in locale files. */
export const HERO_SLIDE_META = [
  {
    id: 'makkah',
    image: images.hero,
    primaryLink: '/packages',
    secondaryLink: '/contact#lead-form',
  },
  {
    id: 'family-makkah',
    image: images.familyMakkah,
    primaryLink: '/contact#lead-form',
    secondaryLink: '/packages',
  },
  {
    id: 'umrah',
    image: images.umrah,
    primaryLink: '/packages',
    secondaryLink: '/contact#lead-form',
  },
  {
    id: 'madinah',
    image: images.heroMadinah,
    position: 'center 42%',
    primaryLink: '/about',
    secondaryLink: '/contact#lead-form',
  },
] as const
