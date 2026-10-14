import { readFileSync, readdirSync, statSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const publicPhotos = join(root, 'public', 'photos')
const srcDir = join(root, 'src')

const photoRefPattern = /\/photos\/[a-zA-Z0-9_\-./()]+\.(?:jpg|jpeg|png|webp|gif)/gi

function walk(dir) {
  const entries = []
  for (const name of readdirSync(dir)) {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) {
      entries.push(...walk(path))
    } else if (/\.(tsx?|jsx?)$/.test(name)) {
      entries.push(path)
    }
  }
  return entries
}

const refs = new Map()

for (const file of walk(srcDir)) {
  const text = readFileSync(file, 'utf8')
  for (const match of text.matchAll(photoRefPattern)) {
    const ref = match[0]
    if (!refs.has(ref)) refs.set(ref, [])
    refs.get(ref).push(relative(root, file))
  }
}

const missing = []

for (const [ref, files] of refs) {
  const diskPath = join(root, 'public', ref)
  if (!statSync(diskPath, { throwIfNoEntry: false })?.isFile()) {
    missing.push({ ref, files })
  }
}

if (missing.length > 0) {
  console.error('Photo validation failed: referenced files are missing from public/photos/\n')
  for (const { ref, files } of missing) {
    console.error(`  ${ref}`)
    for (const file of files) console.error(`    referenced in ${file}`)
  }
  console.error('\nRemove these entries from the source files, or restore the image files.')
  process.exit(1)
}

console.log(`Photo validation passed (${refs.size} references).`)
