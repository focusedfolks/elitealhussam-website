/**
 * Downloads 25 unique high-quality pilgrimage/travel images (Unsplash + Pexels, free license)
 * and saves optimized WebP files to public/images/
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import sharp from 'sharp'

const OUT = join(import.meta.dirname, '../public/images')

/** @type {{ file: string, url: string, w?: number }[]} */
const SOURCES = [
  // Hero & homepage
  {
    file: 'hero-makkah',
    url: 'https://images.unsplash.com/photo-1513072064285-240f87fa81e8?w=2200&q=90&auto=format&fit=crop',
  },
  {
    file: 'family-makkah',
    url: 'https://images.unsplash.com/photo-1693590614566-1d3ea9ef32f7?w=2200&q=90&auto=format&fit=crop',
  },
  {
    file: 'family-pilgrims',
    url: 'https://images.unsplash.com/photo-1633546707050-88e2b545831c?w=2200&q=90&auto=format&fit=crop',
  },
  {
    file: 'family-travel',
    url: 'https://images.unsplash.com/photo-1704104501136-8f35402af395?w=2200&q=90&auto=format&fit=crop',
  },
  {
    file: 'pilgrims-bright',
    url: 'https://images.unsplash.com/photo-1691566264354-88491ba17f15?w=2200&q=90&auto=format&fit=crop',
  },
  // Holy cities
  {
    file: 'madinah-nabawi',
    url: 'https://images.unsplash.com/photo-1739029995207-c633ff65afcc?w=2200&q=90&auto=format&fit=crop',
  },
  {
    file: 'hero-madinah',
    url: 'https://images.unsplash.com/photo-1646424857576-2a66db82a65c?w=3200&q=95&auto=format&fit=crop',
  },
  {
    file: 'madinah-green-dome',
    url: 'https://images.unsplash.com/photo-1692977579997-948328cdb7d2?w=2200&q=90&auto=format&fit=crop',
  },
  {
    file: 'umrah-tawaf',
    url: 'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?w=2200&q=90&auto=format&fit=crop',
  },
  {
    file: 'kiswah-detail',
    url: 'https://images.unsplash.com/photo-1588987278192-09fd57dd55ad?w=2200&q=90&auto=format&fit=crop',
  },
  {
    file: 'safa-marwa',
    url: 'https://images.unsplash.com/photo-1713239060784-e6ed820a0715?w=2200&q=90&auto=format&fit=crop',
  },
  {
    file: 'hajj-arafat',
    url: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?w=2200&q=90&auto=format&fit=crop',
  },
  {
    file: 'mount-uhud',
    url: 'https://images.unsplash.com/photo-1646424857576-2a66db82a65c?w=2200&q=90&auto=format&fit=crop',
  },
  {
    file: 'makkah-clock-tower',
    url: 'https://images.unsplash.com/photo-1627728734379-a5f8c099763e?w=2200&q=90&auto=format&fit=crop',
  },
  {
    file: 'makkah-arch-view',
    url: 'https://images.unsplash.com/photo-1713302752681-0b14c1034707?w=2200&q=90&auto=format&fit=crop',
  },
  // Stays & travel (Unsplash only — pilgrimage / Middle East themed)
  {
    file: 'luxury-stay',
    url: 'https://images.unsplash.com/photo-1770786106021-52580470e31e?w=2200&q=90&auto=format&fit=crop',
  },
  {
    file: 'hotel-lobby',
    url: 'https://images.unsplash.com/photo-1692977579997-948328cdb7d2?w=2200&q=90&auto=format&fit=crop',
  },
  {
    file: 'airport-travel',
    url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=2200&q=90&auto=format&fit=crop',
  },
  {
    file: 'dubai-skyline',
    url: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=2200&q=90&auto=format&fit=crop',
  },
  {
    file: 'chennai-city',
    url: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=2200&q=90&auto=format&fit=crop',
  },
  // Gallery / packages / themes
  {
    file: 'theme-arch-1',
    url: 'https://images.unsplash.com/photo-1572358899655-f63ece97bfa5?w=2200&q=90&auto=format&fit=crop',
  },
  {
    file: 'theme-arch-2',
    url: 'https://images.unsplash.com/photo-1692566123227-0f68f1b9dac6?w=2200&q=90&auto=format&fit=crop',
  },
  {
    file: 'theme-arch-3',
    url: 'https://images.unsplash.com/photo-1667456416191-43ba057635c1?w=2200&q=90&auto=format&fit=crop',
  },
  {
    file: 'theme-arch-4',
    url: 'https://images.unsplash.com/photo-1551041777-ed277b8dd348?w=2200&q=90&auto=format&fit=crop',
  },
  {
    file: 'theme-learn',
    url: 'https://images.unsplash.com/photo-1588987278192-09fd57dd55ad?w=2200&q=90&auto=format&fit=crop',
  },
  {
    file: 'theme-pilgrim',
    url: 'https://images.unsplash.com/photo-1693590614566-1d3ea9ef32f7?w=2200&q=90&auto=format&fit=crop',
  },
  // Package / offer card images (Unsplash — Hajj/Umrah only)
  {
    file: 'theme-offer-1',
    url: 'https://images.unsplash.com/photo-1704104501136-8f35402af395?w=2200&q=90&auto=format&fit=crop',
  },
  {
    file: 'theme-offer-2',
    url: 'https://images.unsplash.com/photo-1633546707050-88e2b545831c?w=2200&q=90&auto=format&fit=crop',
  },
  {
    file: 'theme-offer-3',
    url: 'https://images.unsplash.com/photo-1713239060784-e6ed820a0715?w=2200&q=90&auto=format&fit=crop',
  },
  {
    file: 'theme-offer-4',
    url: 'https://images.unsplash.com/photo-1667456416191-43ba057635c1?w=2200&q=90&auto=format&fit=crop',
  },
  {
    file: 'theme-hero',
    url: 'https://images.unsplash.com/photo-1513072064285-240f87fa81e8?w=2200&q=90&auto=format&fit=crop',
  },
  {
    file: 'blog-cover-packing',
    url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=2200&q=90&auto=format&fit=crop',
  },
  {
    file: 'blog-cover-umrah-hajj',
    url: 'https://images.unsplash.com/photo-1770786106021-52580470e31e?w=2200&q=90&auto=format&fit=crop',
  },
  {
    file: 'blog-cover-chennai',
    url: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=2200&q=90&auto=format&fit=crop&crop=entropy&h=1200',
  },
]

async function download(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'ELITE-ALHUSSAM-site-builder/1.0' },
  })
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  return Buffer.from(await res.arrayBuffer())
}

async function main() {
  await mkdir(OUT, { recursive: true })
  const ids = new Set()

  for (const { file, url } of SOURCES) {
    if (ids.has(file)) throw new Error(`Duplicate file key: ${file}`)
    ids.add(file)
    process.stdout.write(`→ ${file}.webp … `)
    const raw = await download(url)
    const webp = await sharp(raw)
      .rotate()
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 82, effort: 4 })
      .toBuffer()
    await writeFile(join(OUT, `${file}.webp`), webp)
    console.log(`${(webp.length / 1024).toFixed(0)} KB`)
  }

  console.log(`\nDone — ${SOURCES.length} unique images saved to public/images/`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
