/**
 * Quick internal/external link audit for public source files.
 * Run: node scripts/check-links.mjs
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, extname } from 'node:path'

const root = join(import.meta.dirname, '..')
const srcDirs = ['src', 'content', 'public']
const exts = new Set(['.tsx', '.ts', '.md', '.html'])

const hrefRe = /href=["']([^"']+)["']/g
const telRe = /tel:[+\d\s-]+/g
const mailRe = /mailto:[^"'\s]+/g
const waRe = /https?:\/\/(?:wa\.me\/[^"'\s]+|api\.whatsapp\.com\/send[^"'\s]*)/g
const badWaRe = /web\.whatsapp\.com/g

const issues = []
const seen = new Set()

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name)
    const st = statSync(path)
    if (st.isDirectory()) {
      if (name === 'node_modules' || name === 'admin') continue
      walk(path)
      continue
    }
    if (!exts.has(extname(name))) continue
    const text = readFileSync(path, 'utf8')
    if (badWaRe.test(text)) {
      issues.push(`${path}: uses web.whatsapp.com (use wa.me instead)`)
    }
    for (const re of [hrefRe, telRe, mailRe, waRe]) {
      re.lastIndex = 0
      let m
      while ((m = re.exec(text))) {
        const link = m[1] || m[0]
        if (link.startsWith('#') || link.startsWith('/admin')) continue
        seen.add(link)
      }
    }
  }
}

for (const dir of srcDirs) {
  const full = join(root, dir)
  try {
    walk(full)
  } catch {
    /* ignore */
  }
}

const external = [...seen].filter(
  (u) => u.startsWith('http') && !u.includes('elitealhussam'),
)

console.log(`Checked ${seen.size} unique link patterns`)
console.log('External URLs found:', external.length)
for (const url of external.slice(0, 20)) console.log('  ', url)

if (issues.length) {
  console.error('\nIssues:')
  issues.forEach((i) => console.error('  ', i))
  process.exit(1)
}

console.log('\nNo web.whatsapp.com links found. WhatsApp links use wa.me format.')
