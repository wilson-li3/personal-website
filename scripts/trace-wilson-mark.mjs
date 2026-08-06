/*
 * Traces the Wilson wordmark from a source image onto the pixel grid and
 * regenerates src/pixel/wilsonMark.js.
 *
 *   node scripts/trace-wilson-mark.mjs [width] [source.png]
 *
 * The source should be the wordmark in a light colour on a solid darker field
 * (the standard white-on-red lockup works as-is).
 */
import sharp from 'sharp'
import { writeFileSync } from 'node:fs'

const TARGET_W = Number(process.argv[2] || 88)
const SRC = process.argv[3] || 'design-handoff/wilson-logo.png'

// 1. find the bounding box of the white wordmark on the red field
const base = sharp(SRC).ensureAlpha()
const { width, height } = await base.metadata()
const raw = await base.raw().toBuffer()

let minX = width
let maxX = -1
let minY = height
let maxY = -1
const isInk = (i) => {
  const r = raw[i]
  const g = raw[i + 1]
  const b = raw[i + 2]
  // the mark is white; the field is red
  return r > 170 && g > 170 && b > 170
}
for (let y = 0; y < height; y += 1) {
  for (let x = 0; x < width; x += 1) {
    if (isInk((y * width + x) * 4)) {
      if (x < minX) minX = x
      if (x > maxX) maxX = x
      if (y < minY) minY = y
      if (y > maxY) maxY = y
    }
  }
}
const bw = maxX - minX + 1
const bh = maxY - minY + 1
console.log(`logo bbox: ${bw}x${bh} at ${minX},${minY}`)

// 2. downsample the crop to the pixel grid
const targetH = Math.max(1, Math.round((bh / bw) * TARGET_W))
const small = await sharp(SRC)
  .extract({ left: minX, top: minY, width: bw, height: bh })
  .resize(TARGET_W, targetH, { kernel: 'lanczos3', fit: 'fill' })
  .raw()
  .ensureAlpha()
  .toBuffer()

// 3. threshold into a bitmap
const rows = []
for (let y = 0; y < targetH; y += 1) {
  let row = ''
  for (let x = 0; x < TARGET_W; x += 1) {
    const i = (y * TARGET_W + x) * 4
    const r = small[i]
    const g = small[i + 1]
    const b = small[i + 2]
    // luminance well above the red field reads as ink
    const lum = 0.299 * r + 0.587 * g + 0.114 * b
    row += lum > 140 ? '#' : '.'
  }
  rows.push(row)
}

// 4. run-length encode each row so we render spans, not single pixels
const runs = []
rows.forEach((row, y) => {
  let x = 0
  while (x < row.length) {
    if (row[x] === '#') {
      let len = 1
      while (row[x + len] === '#') len += 1
      runs.push([x, y, len])
      x += len
    } else {
      x += 1
    }
  }
})

console.log(`bitmap ${TARGET_W}x${targetH}, ${runs.length} runs`)
console.log(rows.join('\n'))

const out = `// The Wilson wordmark, traced from the brand logo onto the pixel grid.
// Each run is [x, y, length] in grid cells; Mark.jsx draws one rect per run.
// Regenerate with: node scripts/trace-wilson-mark.mjs ${TARGET_W}
export const WILSON_MARK = {
  w: ${TARGET_W},
  h: ${targetH},
  runs: ${JSON.stringify(runs)},
}
`
writeFileSync('src/pixel/wilsonMark.js', out)
console.log('wrote src/pixel/wilsonMark.js')
