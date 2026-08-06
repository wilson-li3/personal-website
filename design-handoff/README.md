# Handoff: Pixel Golf Bag Landing Screen

## Overview
Landing screen for Wilson's portfolio site: a 16-bit pixel-art illustration of a red "Wilson" golf bag on a green, with six clubs fanned out of the mouth. Hovering a club lifts it out of the bag and swaps an info card in the top-left HUD (one card per club: who I am, work, toolkit, off the course, lessons, contact). A "TEE OFF" button enters the site; GitHub / LinkedIn / Email links sit below it.

## About the Design Files
The file in this bundle (`Golf Bag Landing v2.dc.html`) is a **design reference created in HTML** — a prototype showing intended look and behavior, not production code to copy directly. Recreate this design in your target codebase's environment (React, Vue, plain JS, etc.) using its established patterns. If no environment exists yet, a single React component (or plain HTML/CSS/JS page) is the most natural fit — the whole screen is one self-contained view. Note: the file references a `support.js` runtime from the design tool; ignore that dependency and treat the markup/styles as the spec.

## Fidelity
**High-fidelity.** Colors, spacing, and pixel geometry are final. Recreate pixel-perfectly. All artwork is built from absolutely positioned rectangles (divs) — no images or SVGs — so it ports 1:1 to any framework.

## Canvas & Scaling
- Fixed 1280×720 scene, centered on a `#0f120e` page background, `box-shadow: 0 0 0 8px #13170f, 0 24px 60px rgba(0,0,0,.6)`.
- Fit-to-viewport: `scale = min(1, (innerWidth−48)/1296, (innerHeight−48)/736)`, recomputed on window resize. The scene is wrapped in a div sized to `1280×scale` by `720×scale` so centering/overflow work; the scene itself uses `transform: scale(s); transform-origin: top left`.
- All artwork coordinates are multiples of 4px (pixel-art grid).

## Screens / Views

### Landing scene (single view)
**Background**
- Wall (green felt): full width, height 596px, `#21402c`, overlaid with two repeating-linear-gradients: `90deg rgba(0,0,0,.07) 0 4px / transparent 4px 8px` and `0deg rgba(255,255,255,.03) 0 4px / rgba(0,0,0,.05) 4px 8px` (4px checker texture).
- Grass strip: y 596–720, `#4b7a44` with the same two-gradient texture (slightly stronger darks), plus an 8px `#2b4c33` transition line at y 588.

**Golf bag** (container at left 452, top 380, size 596×340, z-index 10)
- Black ribbed collar: stacked bars `#1b1d21` (two stepped rows), body `#24262b` with vertical rib gradient `90deg rgba(255,255,255,.05) 0 4px / rgba(0,0,0,.22) 4px 12px`, dark mouth `#0d0e11`, shadow line `#101215`.
- Cream wordmark band: 500×96 at (48, 96), `#eee2c6` with faint 4px vertical stripes, top highlight `#fff6e2`, bottom shade `#c9bda2`, then a 12px `#1b1d21` trim bar.
- Wordmark: "Wilson" in **Pacifico**, 62px, `#96222c`, `text-shadow: 4px 4px 0 rgba(0,0,0,.15)`, centered in the band.
- Red body: 508×136 at (44, 204), `#a02b34` with 4px texture gradients; left highlight strip `rgba(255,255,255,.12)`, right shade `rgba(0,0,0,.22)`.
- Front pocket: 320×100 at (140, 240), `#8c222b` with 8px `#6d181f` border; zipper: 272×12 `#1b1d21` bar with 4px `#cfc7b2` highlight and a 24×28 `#d5dae3` pull at its left.
- Straps: vertical bars `#8c222b` / `#6d181f` on both outer edges; small chain (12×40 `#b9bec9`) and hanging tag (48×76 `#2f2a26`, 8px `#1b1d21` border, 16×32 `#96222c` inner shield) on the right.

**Clubs** — six absolutely positioned wrappers, each `transform-origin: bottom center`, rotated to fan; shafts are 18px-wide `#9aa2af` bars with an 8px `#dfe4ec` left highlight; heads are groups of stacked rects positioned ABOVE the shaft top, connected by a hosel (18px column `#b9c0cb` + 8px `#e6eaf0` highlight) whose bottom meets the shaft; each head group is counter-rotated about the hosel point so faces sit level or tipped slightly up. Anchor (bottom center of every wrapper) is y = 560, hidden behind the bag.

| Club | wrapper left/top | size | fan angle | head counter-rotation | z |
|---|---|---|---|---|---|
| Wedge (low left) | 520, 270 | 240×290 | −28° | +36° | 2 |
| Driver headcover | 580, 120 | 240×440 | −13° | −6° | 6 |
| 7 iron | 620, 130 | 240×430 | −4° | +14° | 8 |
| 9 iron (mirrored right) | 660, 230 | 240×330 | −1° | −9° + scaleX(−1) | 7 |
| 5 wood (mirrored right) | 690, 150 | 240×410 | +14° | −13° + scaleX(−1) | 4 |
| Putter (blade right) | 760, 260 | 240×300 | +24° | −28° | 3 |

- Iron/wedge heads: cream top edges (`#e6eaf0`, `#cfd5de`), grooved face `#8b95a2`/`#97a0ad` with groove overlay `repeating-linear-gradient(0deg, rgba(30,34,40,.5) 0 4px, transparent 4px 10px)`, sole `#5d6672`, bottom highlight `#cfd5de`.
- Driver headcover: rounded stack of `#17191f`/`#22252c`/`#2a2d34` rows with two `#8f2630` red stripes; "Wilson" in Pacifico 32px `#f2e7cf`, rotated −3°.
- 5 wood cover: grey stack `#3a3f47`–`#565d68` with `#6e7580` top highlight, red `#8f2630` stripe near bottom; "W" in Pacifico 26px `#e6dcc4` (inner label counter-mirrored so it reads correctly).
- Putter: cream/bronze blade rows `#ded7bd`, `#b7ae93`, `#8b8269`, `#4c4636`, extending right of the hosel.
- Mirrored heads use `scaleX(-1)` combined into the head-group transform about the hosel origin.

**HUD (top-left, z 11, at 48, 88, width 316)**
- Eyebrow: "PORTFOLIO / 2026", Press Start 2P 13px, letter-spacing 2px, `#cfe0c4`, 20px below-margin.
- Info card (default): `rgba(12,20,14,.75)` panel, 8px `#eee2c6` border, padding 20/24. Title "PICK A CLUB" Press Start 2P 13px `#eee2c6`; body VT323 22px `#cfe0c4`: "Hover any club and it lifts out of the bag."
- Info card (per club): `#eee2c6` panel, 8px `#1b1d21` border, `box-shadow: 10px 10px 0 rgba(0,0,0,.4)`, padding 20/24. Club name Press Start 2P 13px `#96222c`; section label Press Start 2P 11px `#6b6255` (8px top margin); body VT323 23px `#241d18`, line-height 1.1 (14px top margin).
- Card copy (club → label → body):
  - DRIVER → WHO I AM → "Big swings first. I build software and design interfaces, currently studying at Waterloo."
  - 5 WOOD → WORK → "Internships, shipped products, and the projects I keep coming back to."
  - 7 IRON → TOOLKIT → "TypeScript, React, Python, Figma. The club I hit most often."
  - 9 IRON → OFF THE COURSE → "Golf, film photography, and a long list of half-finished side quests."
  - WEDGE → OUT OF THE ROUGH → "Problems I have dug my way out of, and what they taught me."
  - PUTTER → GET IN TOUCH → "Short game, short email. Say hello and I will write back."
- CTA: "TEE OFF" — Press Start 2P 16px `#241d18` on `#e8c76a`, 6px `#1b1d21` border, `box-shadow: 6px 6px 0 rgba(0,0,0,.45)`, padding 16/24. Hover: background `#fff3d2`.
- Links row (VT323 24px, 16px gap): GitHub / LinkedIn / Email — `#eee2c6` with 4px `rgba(238,226,198,.35)` bottom border; hover: text and border `#e8c76a`. **Hrefs are placeholders (`#`) — wire to real URLs.**

## Interactions & Behavior
- Club hover: `mouseenter` sets the active club, `mouseleave` clears it. The hovered club's wrapper gets `translateY(-64px)` added before its rotation; transition `transform .1s steps(2)` (stepped, to keep the pixel feel — do not use smooth easing). Cursor: pointer.
- The HUD card swaps instantly based on the active club (no animation); default card returns when nothing is hovered.
- TEE OFF navigates into the site (destination up to implementer). Links open GitHub / LinkedIn / mailto.
- No touch equivalent is designed; on touch devices, tap could toggle the active club (implementer's choice).

## State Management
- `activeClub: null | 'driver' | 'wood' | 'iron' | 'iron2' | 'wedge' | 'putter'` — the only state besides the resize-driven `scale`.

## Design Tokens
- Fonts (Google Fonts): **Press Start 2P** (headings/labels/buttons), **VT323** (body), **Pacifico** (Wilson script wordmark).
- Greens: wall `#21402c`, grass `#4b7a44`, divider `#2b4c33`, HUD text `#cfe0c4`.
- Reds: bag `#a02b34`, pocket `#8c222b`, dark `#6d181f`, wordmark/accents `#96222c`, club stripes `#8f2630`.
- Creams: band/cards `#eee2c6`, highlight `#fff6e2`, shade `#c9bda2`, putter `#ded7bd`.
- Gold CTA: `#e8c76a`, hover `#fff3d2`.
- Steel/greys: shaft `#9aa2af` + `#dfe4ec`, faces `#8b95a2`/`#97a0ad`, hosel `#b9c0cb`, darks `#1b1d21`/`#22252c`/`#241d18`.
- Pixel unit: 4px; borders 6–8px; hard offset shadows (no blur) except the two page-level shadows.

## Assets
None — all artwork is CSS rectangles. Fonts load from Google Fonts.

## Screenshots
- `screenshots/default.png` — resting state (PICK A CLUB card).
- `screenshots/hover-driver.png` — driver hovered: HUD card swaps to DRIVER / WHO I AM (in the live design the club also lifts 64px; synthetic capture doesn't show the lift).

## Files
- `Golf Bag Landing v2.dc.html` — the full design reference (markup + inline styles + hover/scale logic in a small component class at the bottom of the file).
