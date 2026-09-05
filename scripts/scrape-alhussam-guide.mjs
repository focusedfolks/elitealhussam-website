/**
 * One-off scraper: extract main content from alhussam.in guide pages.
 * Run: node scripts/scrape-alhussam-guide.mjs
 */
import { writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

const BASE = 'https://www.alhussam.in/'

const PAGES = [
  { slug: 'history-of-kabah', file: 'history_kabah.php', title: "History Of Ka'bah" },
  { slug: 'foundation-of-makkah', file: 'foundation.php', title: 'Foundation & Development of Makkah' },
  { slug: 'location-of-makkah', file: 'location_makkah.php', title: 'Location of Makkah' },
  { slug: 'quran-names-of-makkah', file: 'Quraan.php', title: 'Quran-Mentioned Names Of Makkah' },
  { slug: 'story-of-zamzam', file: 'zam_zam.php', title: 'Story of Zam Zam' },
  { slug: 'masjid-e-nabawi', file: 'e_nabawt.php', title: 'Masjid-E-Nabawi' },
  { slug: 'structure-of-kabah', file: 'Structure.php', title: "Structure & Important Places Surrounding the Holy Ka'bah" },
  { slug: 'jabal-al-nour', file: 'makkah_Jabal.php', title: 'Jabal Al-Nour', city: 'Makkah' },
  { slug: 'jabal-thawr', file: 'makkah_Jabal_tw.php', title: 'Jabal Thawr', city: 'Makkah' },
  { slug: 'masjid-ayesha', file: 'makkah_ayesha.php', title: 'Masjid Ayesha', city: 'Makkah' },
  { slug: 'masjid-jinn', file: 'makkah_jinn.php', title: 'Masjid Jinn', city: 'Makkah' },
  { slug: 'jannatul-maala', file: 'makkah_jannatulmala.php', title: 'Jannatul Maala', city: 'Makkah' },
  { slug: 'masjid-nimrah', file: 'makkah_masjid_nimrah.php', title: 'Masjid Nimrah', city: 'Makkah' },
  { slug: 'arafath', file: 'makkah_arafath.php', title: 'Arafath (Jabal Ur Rehman)', city: 'Makkah' },
  { slug: 'roula-shareef', file: 'madinah_roula.php', title: 'Roula Shareef', city: 'Madinah' },
  { slug: 'rauudathul-jannah', file: 'madinah_rauudathul.php', title: 'Rauudathul Jannah', city: 'Madinah' },
  { slug: 'masjid-qiblatain', file: 'madinah_qiblatain.php', title: 'Masjid Qiblatain', city: 'Madinah' },
  { slug: 'masjid-quba', file: 'madinah_quba.php', title: 'Masjid Quba', city: 'Madinah' },
  { slug: 'jabal-al-uhad', file: 'madinah_uhad.php', title: 'Jabal Al Uhad', city: 'Madinah' },
  { slug: 'jannatul-baqi', file: 'madinah_baqi.php', title: 'Jannatul Baqi', city: 'Madinah' },
  { slug: 'hajj-rituals', file: 'rit_hajj_performance.php', title: 'Hajj — How to perform Hajj & Umrah' },
  { slug: 'photo-gallery', file: 'photo_gallery.php', title: 'Photo Gallery' },
  { slug: 'video-gallery', file: 'video_gallery.php', title: 'Video Gallery' },
]

function stripScripts(html) {
  return html.replace(/<script[\s\S]*?<\/script>/gi, '')
}

function extractMain(html) {
  const cleaned = stripScripts(html)
  const mainMatch = cleaned.match(
    /<section[^>]*id="main-container"[\s\S]*?<div class="col-md-12">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/i,
  )
  if (!mainMatch) return { html: '', note: 'no-main-container' }
  let inner = mainMatch[1]
  // Remove duplicate h3 titles (keep body)
  inner = inner.replace(/<h3[^>]*>[\s\S]*?<\/h3>/i, '')
  // Normalize
  inner = inner
    .replace(/\s+/g, ' ')
    .replace(/>\s+</g, '><')
    .trim()
  const isPdf = /iframe[^>]*\.pdf/i.test(inner)
  const isGallery = /gallery|owl-carousel|fancybox/i.test(inner)
  return { html: inner, isPdf, isGallery, note: isPdf ? 'pdf-embed' : isGallery ? 'gallery' : 'html' }
}

async function fetchPage(file) {
  const res = await fetch(`${BASE}${file}`, {
    headers: { 'User-Agent': 'EliteAlhussam-Migration/1.0' },
  })
  if (!res.ok) throw new Error(`${file}: HTTP ${res.status}`)
  return res.text()
}

const out = {}
for (const page of PAGES) {
  try {
    const html = await fetchPage(page.file)
    const extracted = extractMain(html)
    out[page.slug] = { ...page, ...extracted, source: `${BASE}${page.file}` }
    console.log(`OK ${page.slug} (${extracted.note}, ${extracted.html.length} chars)`)
  } catch (e) {
    out[page.slug] = { ...page, html: '', note: 'fetch-failed', error: String(e) }
    console.error(`FAIL ${page.slug}:`, e.message)
  }
}

mkdirSync('scripts/output', { recursive: true })
writeFileSync(
  join('scripts', 'output', 'alhussam-guide-scrape.json'),
  JSON.stringify(out, null, 2),
)
console.log('Wrote scripts/output/alhussam-guide-scrape.json')
