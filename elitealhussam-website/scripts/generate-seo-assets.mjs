/**
 * Generates favicon.ico, apple-touch-icon.png, and og-share.webp (1200×630)
 * from existing site images. Run after `npm run images:fetch`.
 */
import { existsSync } from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import sharp from 'sharp'

const root = join(import.meta.dirname, '..')
const imagesDir = join(root, 'public/images')
const publicDir = join(root, 'public')

async function sourceBuffer() {
  const candidates = [
    join(imagesDir, 'alhussam-logo.png'),
    join(imagesDir, 'fav.png'),
    join(imagesDir, 'family-makkah.webp'),
    join(imagesDir, 'hero-makkah.webp'),
  ]
  for (const path of candidates) {
    if (existsSync(path)) return { path, buffer: await sharp(path).toBuffer() }
  }
  throw new Error(
    'No source image found. Run `npm run images:fetch` first, or add public/images/alhussam-logo.png',
  )
}

async function ogSource() {
  const candidates = [
    join(imagesDir, 'family-makkah.webp'),
    join(imagesDir, 'hero-makkah.webp'),
    join(imagesDir, 'dubai-skyline.webp'),
  ]
  for (const path of candidates) {
    if (existsSync(path)) return await sharp(path).toBuffer()
  }
  const { buffer } = await sourceBuffer()
  return buffer
}

async function main() {
  await mkdir(publicDir, { recursive: true })
  await mkdir(imagesDir, { recursive: true })

  const { path: logoPath, buffer: logoBuf } = await sourceBuffer()
  console.log(`Using source: ${logoPath}`)

  const favicon = await sharp(logoBuf)
    .resize(32, 32, { fit: 'cover' })
    .png()
    .toBuffer()
  await writeFile(join(publicDir, 'favicon.ico'), favicon)
  console.log('→ public/favicon.ico')

  const apple = await sharp(logoBuf)
    .resize(180, 180, { fit: 'cover' })
    .png()
    .toBuffer()
  await writeFile(join(publicDir, 'apple-touch-icon.png'), apple)
  console.log('→ public/apple-touch-icon.png')

  const ogBuf = await ogSource()
  const og = await sharp(ogBuf)
    .resize(1200, 630, { fit: 'cover', position: 'centre' })
    .webp({ quality: 85 })
    .toBuffer()
  await writeFile(join(imagesDir, 'og-share.webp'), og)
  console.log('→ public/images/og-share.webp (1200×630)')

  const favPng = await sharp(logoBuf)
    .resize(192, 192, { fit: 'cover' })
    .png()
    .toBuffer()
  await writeFile(join(imagesDir, 'fav.png'), favPng)
  console.log('→ public/images/fav.png')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
