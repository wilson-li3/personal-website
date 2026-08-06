import { hero, about, projects, photos, quotes, contact } from '../content'

/*
 * The six sections of the content stage, built from src/content.js.
 * All prose is Wilson's, carried over verbatim — only labels, metas and
 * groupings are written here, and those are chrome rather than copy.
 *
 * The section ids match the landing's clubs (see clubs.jsx), so a club still
 * opens what its card says it opens. The order matches the counter: 01..06.
 */

/* Toolkit ------------------------------------------------------------------ */

// Grouped so the section reads as five rows rather than nineteen. Every tool
// below appears in some project's `tech` string in content.js.
const TOOL_GROUPS = [
  { title: 'Languages', tools: ['python', 'java', 'C', 'C++', 'typescript', 'sql'] },
  { title: 'Frontend', tools: ['angular','react', 'three.js', 'tailwind css'] },
  { title: 'Backend and APIs', tools: ['fastapi', 'rest apis', 'json'] },
  { title: 'Data and ML', tools: ['pandas', 'numpy', 'scikit-learn', 'matplotlib', 'opencv', 'mediapipe'] },
  {
    title: 'Storage and services',
    tools: ['postgresql', 'pgvector', 'supabase', 'mongodb', 'firebase', 'cloudinary'],
  },
  { title: 'Infrastructure and AI', tools: ['docker', 'aws', 'openai api'] },
]

// One wrapping line per group rather than a bullet each: with every row open
// at once, nineteen bullets would not fit the panel.
const toolkitRows = TOOL_GROUPS.map(({ title, tools }) => ({
  title,
  body: tools.join(' · '),
}))

/* Images ------------------------------------------------------------------- */

/*
 * Everything shown at thumbnail size is served from public/images/thumbs,
 * built by `npm run thumbs`. The originals run 3-6k px wide and decoding one
 * into a 200px cell costs tens of megabytes of bitmap, which is what made
 * scrolling into the gallery stutter. Full files are still what the lightbox
 * opens, so nothing is lost — only the grid gets the small copy.
 */
const thumbOf = (src) => `/images/thumbs/${src.split('/').pop().replace(/\.[^.]+$/, '')}.webp`

const withThumb = (image) => ({ ...image, thumb: thumbOf(image.src) })

// Which six appear, and their order, is content — see photos.featured. The
// caption follows from the photo's own description.
const frames = photos.featured.map((file, i) => {
  const photo = photos.items.find((p) => p.src.endsWith(`/${file}`))
  return {
    src: photo.src,
    thumb: thumbOf(photo.src),
    alt: photo.description,
    caption: `${String(i + 1).padStart(2, '0')} · ${photo.description.toUpperCase()}`,
  }
})

// Every thumbnail the stage can show, warmed on mount so the first scroll
// into a section does not pay for the fetch.
export const THUMBS = [
  ...frames.map((f) => f.thumb),
  ...projects.items.flatMap((p) => p.images.map((img) => thumbOf(img.src))),
]

/* Quotes ------------------------------------------------------------------- */

// The row title is the quote's opening, cut at a word boundary; the full line
// and Wilson's thought on it sit in the open body.
const preview = (text, max = 44) => {
  const clean = text.replace(/^"|"$/g, '')
  if (clean.length <= max) return clean
  const cut = clean.slice(0, max)
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`
}

// No meta: the section is named for the show, so tagging every row with it
// would just repeat the header.
const quoteRows = quotes.items.map((q) => ({
  title: preview(q.quote),
  body: q.quote,
  note: q.thought,
}))

/* Contact ------------------------------------------------------------------ */

const HOSTS = {
  github: 'GITHUB.COM/WILSON-LI3',
  linkedin: 'LINKEDIN.COM/IN/WILSONLI3',
  devpost: 'DEVPOST.COM/WILSON-LI3',
  // the address is already this row's title, so the meta names the channel
  email: 'EMAIL',
}

const contactRows = contact.links.map((link) => ({
  title: link.label,
  meta: HOSTS[link.id],
  link,
}))

/* The six ------------------------------------------------------------------ */

/*
 * `expanded` opens every row at once and drops the click-to-open behaviour —
 * for sections short enough to read whole, where an accordion would just be
 * hiding two paragraphs behind a click.
 */
export const SECTIONS = [
  {
    id: 'who',
    label: 'WHO I AM',
    expanded: true,
    items: [
      {
        title: 'Currently',
        meta: 'WATERLOO, ON',
        groups: [{ items: hero.currently }],
      },
      { title: 'In short', meta: '2ND YEAR SE', body: about.intro },
    ],
  },
  {
    id: 'work',
    label: 'WORK',
    items: projects.items.map((project) => ({
      title: project.name,
      meta: project.position,
      body: project.blurb,
      shots: project.images.map(withThumb),
      // a project with no lessons written yet just omits the block
      groups: [
        { label: 'WHAT IT DOES', items: project.bullets },
        ...(project.lessons?.length ? [{ label: 'WHAT IT TAUGHT ME', items: project.lessons }] : []),
      ],
    })),
  },
  { id: 'toolkit', label: 'TECH STACK', expanded: true, items: toolkitRows },
  { id: 'off', label: 'OFF THE COURSE', gallery: true, lead: photos.description, frames },
  {
    id: 'rough',
    label: 'HOW I MET YOUR MOTHER QUOTES',
    ball: 'HIMYM QUOTES',
    lead: quotes.description,
    items: quoteRows,
  },
  {
    id: 'contact',
    label: 'GET IN TOUCH',
    expanded: true,
    lead: contact.description,
    items: contactRows,
  },
]

export const TOTAL = String(SECTIONS.length).padStart(2, '0')
