/**
 * Converts all Photos page PNGs in public/images to WebP.
 * Run: node scripts/convert-photos-to-webp.mjs
 */
import sharp from 'sharp'
import { readdir, access } from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const imagesDir = join(__dirname, '..', 'public', 'images')

const photoBasenames = [
  'IMG_0001', 'IMG_0002', 'IMG_0003', 'IMG_0004', 'IMG_0032',
  'IMG_0569', 'IMG_0579', 'IMG_0587', 'IMG_0622', 'IMG_0960',
  'IMG_1003', 'IMG_1036', 'IMG_1049', 'IMG_1278', 'IMG_1706',
  'IMG_2367', 'IMG_3074', 'IMG_3129', 'IMG_3131', 'IMG_4926',
  'IMG_4933', 'IMG_5444_jpg', 'IMG_5855', 'IMG_5942', 'IMG_6093',
  'IMG_6105', 'IMG_6209', 'IMG_6735', 'IMG_6738', 'IMG_7025',
  'IMG_9482', 'IMG_9590', 'IMG_9709', 'IMG_9723', 'IMG_9736', 'IMG_9771',
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
  for (const base of photoBasenames) {
    const pngPath = join(imagesDir, `${base}.png`)
    const webpPath = join(imagesDir, `${base}.webp`)
    if (!(await exists(pngPath))) {
      console.warn(`Skip (not found): ${base}.png`)
      continue
    }
    await sharp(pngPath)
      .webp({ quality: 82, effort: 4 })
      .toFile(webpPath)
    console.log(`Converted: ${base}.png → ${base}.webp`)
  }
  console.log('Done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
