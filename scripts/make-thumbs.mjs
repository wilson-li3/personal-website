/**
 * Builds small versions of every image the content stage renders at thumbnail
 * size, into public/images/thumbs/.
 *
 * The originals are 3-6k px wide. Painting one into a 200px grid cell still
 * costs a full-resolution decode — roughly 50-100 MB of bitmap per photo — so
 * scrolling into the gallery stutters even though the bytes are cached. The
 * grid uses these instead; the lightbox still opens the original.
 *
 * Run: npm run thumbs
 */
import sharp from 'sharp'
import { mkdir, access, stat } from 'fs/promises'
import { join, dirname, parse } from 'path'
import { fileURLToPath } from 'url'
import { photos, projects } from '../src/content.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const imagesDir = join(__dirname, '..', 'public', 'images')
const thumbsDir = join(imagesDir, 'thumbs')

// Gallery cells are ~210 CSS px wide and project shots ~104, so these cover
// both at 3x for dense displays without being anywhere near the originals.
const WIDTHS = { gallery: 640, shot: 320 }

const targets = [
  ...photos.featured.map((file) => ({ file, width: WIDTHS.gallery })),
  ...projects.items.flatMap((project) =>
    project.images.map((img) => ({ file: img.src.replace('/images/', ''), width: WIDTHS.shot })),
  ),
]

async function exists(path) {
  try {
    await access(path)
    return true
  } catch {
    return false
  }
}

async function main() {
  await mkdir(thumbsDir, { recursive: true })

  let saved = 0
  for (const { file, width } of targets) {
    const source = join(imagesDir, file)
    if (!(await exists(source))) {
      console.warn(`Skip (not found): ${file}`)
      continue
    }

    // always .webp out, whatever went in
    const out = join(thumbsDir, `${parse(file).name}.webp`)
    const before = (await stat(source)).size
    await sharp(source)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 78, effort: 5 })
      .toFile(out)
    const after = (await stat(out)).size
    saved += before - after

    const kb = (n) => `${Math.round(n / 1024)}kB`
    console.log(`${file}  ${kb(before)} → ${kb(after)}`)
  }

  console.log(`\nDone. ${targets.length} thumbnails, ${Math.round(saved / 1048576)} MB lighter.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
