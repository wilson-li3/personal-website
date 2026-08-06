# Design System — "Pick a Club"

A 16-bit golf world. The landing screen is a pixel-art Wilson golf bag standing on a
green: six clubs fan out of it, and hovering one lifts it out of the bag while a HUD
card names what it opens. TEE OFF (or clicking a lifted club) drops into the
clubhouse — the same world, scrollable, holding everything Wilson has written.

Built from the design handoff `Golf Bag Landing v2.dc.html` (bundled in
`/design-handoff`). The landing is a **pixel-exact** port: every rect keeps its
coordinate from the spec.

## The pixel rules

- **Everything on a 4px grid.** Spacing tokens are `--u1`…`--u16` (4→64px). Borders
  are 4–8px. Shadows are hard offsets with no blur (`10px 10px 0 rgba(0,0,0,.4)`).
- **No curves, no gradients as decoration.** The only gradients are the 4px checker
  textures on felt and grass, and they exist to read as dithering.
- **All artwork is CSS rectangles** — no images or SVG in the bag or the clubs, so
  it stays crisp at any scale (`image-rendering: pixelated`).

## Color

| Token | Value | Role |
|---|---|---|
| `--pix-page` | `#0f120e` | Page behind the stage |
| `--pix-wall` / `--pix-grass` / `--pix-divider` | `#21402c` / `#4b7a44` / `#2b4c33` | Felt wall, grass strip, the line between |
| `--pix-bag` / `--pix-pocket` / `--pix-dark-red` | `#a02b34` / `#8c222b` / `#6d181f` | The bag |
| `--pix-red` | `#96222c` | Wordmark, card titles, accents |
| `--pix-cream` / `-hi` / `-lo` | `#eee2c6` / `#fff6e2` / `#c9bda2` | Wordmark band, every card, body text on felt |
| `--pix-gold` / `-hi` | `#e8c76a` / `#fff3d2` | TEE OFF, current nav, section rules |
| `--pix-ink` / `--pix-black` | `#241d18` / `#1b1d21` | Text on cream, all borders |
| `--pix-hud-text` | `#cfe0c4` | Body text on the felt |
| steel | `#9aa2af` + `#dfe4ec` | Shafts and iron faces |

## Typography

Two faces, each with one job:

- **Press Start 2P** — headings, labels, buttons, nav. Never body copy; it is
  unreadable in paragraphs. 9–26px only.
- **VT323** — all body text, at 22–24px (it runs small, so it needs the size).

The **Wilson script** is not a font. It is the real Wilson Sporting Goods wordmark
traced onto the pixel grid (`src/pixel/wilsonMark.js`, an 88×22 bitmap stored as
run-length spans) and drawn by `Mark.jsx` as one rect per run — so it matches the
rest of the artwork instead of sitting on top of it as smooth type. It appears on
the bag band (4px cells, red), the driver headcover (2px cells, cream), the 5 wood
as a W monogram (columns 0–26), and the clubhouse nav (1px cells).

To retrace it from a new source image, `scripts/trace-wilson-mark.mjs <width>` finds
the wordmark's bounding box, downsamples, thresholds, and regenerates the module.

## The landing screen

A 1280×720 stage that **fills the window**: `min(vw/1280, vh/720)`, recomputed on
resize, scaling up as well as down. The handoff centred the stage as a letterboxed
card; here the felt runs edge to edge behind it and a grass layer (`.landing-bleed`)
continues past the stage, seamed onto the stage's own divider line at y=588 — so
there are no black bars at any window size, and nothing is ever cropped.

Six clubs (`src/pixel/clubs.jsx`), each a wrapper rotated about `bottom center`, all
anchored at y=560 so their butts hide behind the bag.

**Shafts stay straight.** The hosel is drawn in the wrapper, in line with the shaft
(x 111–129), and only the head group rotates — pivoting at the point where the hosel
meets the head's body. The handoff put the hosel *inside* the rotated group, which
bent every shaft into a dogleg; at the wedge's 36° it read as a broken club. Two
rules follow: the pivot must land on solid head material (the driver's and 5 wood's
sat in notches between rects and their heads floated free), and the hosel must run
far enough up to be buried under the head.

Face angles are the wrapper plus the head rotation, kept in a tight band (−5° to
+6°) so all six read as level or barely lofted: wedge −28/+34, driver −13/+8,
7 iron −4/+10, 9 iron −1/+7+mirror, 5 wood +14/−16+mirror, putter +24/−26.

**Interaction:** hover (or focus) sets the active club — `translateY(-64px)` with
`transition: transform .1s steps(2)`, stepped so it reads as pixel animation, never
eased. The HUD card swaps instantly, no animation. Each club maps to a section:
driver→who, 5 wood→work, 7 iron→toolkit, 9 iron→off the course, wedge→out of the
rough, putter→contact.

**Layout.** Three fixed slots, deliberately independent so nothing reflows when the
card changes:

- `.greeting` — "HI! I'M" at 56px, painted on the wall at z-index 1 so the clubs
  pass in front of it. It runs into the bag's own Wilson wordmark below-right, so
  the two read as one sentence.
- `.hud-slot` (top-left, 316px) — holds only the info card, whose height changes
  with the hovered club. Because it owns its slot, that growth moves nothing.
- `.hud-corner` (bottom-left, pinned 148px up so it clears the grass) — the
  standing line `2ND YEAR SE @ UWATERLOO`, TEE OFF, and the three links. Anchored
  to the bottom, never shifts.

**Narrow screens (<900px)** have no hover, so the stage scales to the width and the
HUD moves below it at full size: first tap previews a club, second opens it.

## The clubhouse

Six sections behind TEE OFF, one per club, in the same world: felt background, cream
`.card` panels with hard shadows, dark `.panel` boxes for lists, gold dashed section
rules, a sticky pixel nav. All of Wilson's copy is carried over verbatim — his
lowercase voice is never rewritten.

| Section | Club | Holds |
|---|---|---|
| who i am | DRIVER | about intro, the notebook note, now playing, the Smiski video |
| work | 5 WOOD | the four projects: tech, blurb, screenshots, what they do |
| toolkit | 7 IRON | every tool counted off the projects (derived, not invented) |
| off the course | 9 IRON | player facts, the gym split, the photo album, HIMYM quotes |
| out of the rough | WEDGE | the lessons from each project |
| get in touch | PUTTER | the links, plus the practice green (4px-snapped drawing) |

## Motion

Almost none, by design: the stepped club lift, and instant state swaps. No scroll
animation, no reveals, no eased transitions anywhere.

## Routes

Single page. Legacy Notes-era routes drop straight into their section, skipping the
landing (`/about`→who, `/projects`→work, `/photos`→photos, `/gym-routine`→gym,
`/quotes-himym`→quotes, `/contact`→contact, `/doodle`→green). The original Notes-app
site is preserved in `/legacy`.
