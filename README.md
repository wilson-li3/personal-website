# Wilson Li — Pick a Club

A personal website that opens like a 16-bit golf game. The landing screen is a
pixel-art Wilson golf bag standing on a green with six clubs fanned out of it; hover
a club and it lifts out of the bag while a HUD card names what it opens. TEE OFF (or
clicking a lifted club) drops into the clubhouse — the same pixel world, scrollable —
with six sections: who i am, work, toolkit, off the course, out of the rough, and get
in touch.

Every part of the bag and every club is built from CSS rectangles on a 4px grid, so
the artwork stays sharp at any scale. The landing is a pixel-exact port of the design
handoff in [`/design-handoff`](design-handoff/README.md).

The previous Mac / Apple Notes edition of the site is preserved in [`/legacy`](legacy/LEGACY.md).
Old routes (`/about`, `/projects`, `/photos`, …) still work and drop straight into
their section.

## Stack

React + Vite, Tabler icons via unplugin-icons, Google Fonts (Press Start 2P, VT323,
Pacifico). No animation library — the only motion is a stepped CSS transform. Design
system documented in `DESIGN.md`; product context in `PRODUCT.md`.

## Getting Started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build
npm run preview  # preview the production build
```

## Notes

- `src/pixel/clubs.jsx` holds the six clubs: wrapper coordinates, fan angles, head
  counter-rotations, and which section each one opens. Coordinates come from the
  handoff and are on the 4px grid — keep them there.
- Narrow screens have no hover, so the stage scales to the width and the HUD moves
  below it: first tap previews a club, second opens it.
- All site copy lives in `src/content.js`, carried over verbatim from the Notes site.
- Photos live in `/public/images` (webp) — `npm run convert-photos` regenerates them.
