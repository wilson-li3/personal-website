# Product

## Register

brand

## Platform

web

## Users

A mixed audience with no single primary: recruiters and hiring managers, fellow developers and designers, and people who know Wilson personally. Whoever arrives, they're visiting one person's corner of the internet, usually out of curiosity, and they should be able to wander without instructions.

## Product Purpose

Wilson Li's personal website as a **16-bit golf game screen**. The landing is a pixel-art Wilson golf bag on a green with six clubs fanned out of it; hovering a club lifts it and a HUD card names what it opens. TEE OFF drops into the clubhouse — the same pixel world, scrollable — where six sections (who i am, work, toolkit, off the course, out of the rough, get in touch) hold everything from the previous site. All copy is preserved; the original Notes-app site is archived in `/legacy`. Success is delight and memorability: a visitor leaves thinking of it as "that pixel golf bag site" and remembers it later.

## Positioning

A portfolio that opens like a game: pick a club out of the bag and it opens a part of Wilson's life.

## Conversion & proof

- Primary CTA: TEE OFF into the clubhouse — or pick the club for the thing you actually came for.
- Secondary fallback: GitHub / LinkedIn / Email sit under the CTA on the landing screen itself, and the putter opens get-in-touch (github, linkedin, devpost, wyli@uwaterloo.ca).
- The line a visitor remembers after 10 seconds: "the golf bag was made of pixels and the clubs came out when I pointed at them."
- Belief ladder: (1) nobody else's portfolio opens like this → (2) the craft means this person cares about detail → (3) worth opening every club.
- Proof on hand: the site itself, plus the four projects (NFL playbook handtracker, uway, NBA analytics engine, waypost) with real screenshots and the lessons from each.

## Brand Personality

Playful, precise, nostalgic. A 16-bit game screen built entirely out of CSS rectangles on a 4px grid: green felt, a red Wilson bag, cream cards with hard drop shadows, Press Start 2P labels. The charm comes from craft — the clubs are drawn rect by rect and lift in stepped frames, never eased — not from decoration. The wit is Wilson's own voice; his copy stays lowercase and personal inside the pixel frame.

## Anti-references

- Pixel art as a sticker: a normal layout with a retro font pasted on. The whole world is built on the grid, or it isn't pixel art.
- Smooth easing on the club lift. Stepped frames only — eased motion breaks the 16-bit illusion instantly.
- Press Start 2P in paragraphs. It is a label face; body copy is VT323.
- The template developer portfolio: hero + skills grid + project cards + contact form.
- Generic AI slop: purple gradients, glassmorphism, identical card grids, eyebrow labels on every section.

## Design Principles

- The bag is the menu. Six clubs, six sections; picking a club is the primary interaction and the site's whole idea.
- Everything on the 4px grid. Spacing, borders, and shadows are multiples of four with no blur, so the world stays consistent from the landing to the last section.
- Draw it, don't import it. The bag and clubs are CSS rectangles, which is why they stay sharp at any scale.
- Wilson's voice stays. The lowercase, personal copy from the notes site is the content; the pixel frame never rewrites it into marketing speak.
- Playable beats watchable. Where there's a choice, make it interactive (lift the clubs, draw on the practice green, open the photos) rather than another animation.

## Accessibility & Inclusion

Sensible defaults: WCAG AA contrast targets, keyboard navigability (every club is a real button), visible gold focus rings, and `prefers-reduced-motion` honored — the only motion is the stepped club lift, which reduces to an instant state change. Hover-only interactions have a tap equivalent on narrow screens, where the HUD moves below the stage at full size. Novelty never blocks access to content.
