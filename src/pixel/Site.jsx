import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import IconX from '~icons/tabler/x'
import { hero } from '../content'
import { Header, Links } from './Chrome'
import { SECTIONS, THUMBS, TOTAL } from './sections'
import './pixel-ball'
import './Site.css'

/*
 * The content stage — everything behind TEE OFF.
 *
 * A fixed, non-scrolling screen: the pixel golf ball is docked on the left,
 * the content panel occupies the right. Scrolling does not move a document,
 * it flies the ball up through the sky (ground → haze → altitude → space) and
 * advances the panel one section at a time. An empty 700vh track supplies the
 * scroll range; everything else is position: fixed.
 *
 * Only two things are React state — which section is showing and which row is
 * open. Sky offset, cloud parallax, star opacity, bar width and the hero/panel
 * crossfade are all derived per frame and written straight to the DOM, because
 * routing them through state would thrash on every scroll event.
 */

const HAND = 0.85 // hero → panel handoff point, in viewport heights
const SKY_TRAVEL = 6 // how many viewport heights the sky drifts over the scroll
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v))

/*
 * Sections mount and unmount as you scroll, so their images are created fresh
 * each time you arrive. Fetching and decoding all the thumbnails once, up
 * front, means that costs nothing on the way past — together they are smaller
 * than a single one of the original photos. Held at module scope so the
 * decoded frames are not collected between visits.
 */
const warmed = []
function warmThumbs() {
  if (warmed.length) return
  THUMBS.forEach((src) => {
    const img = new Image()
    img.src = src
    warmed.push(img)
    img.decode?.().catch(() => {}) // decode is best-effort; a miss just means a late paint
  })
}

/* Ball + sky ---------------------------------------------------------------- */

/* Three stacked layers, all behind the ball. Nothing ever passes in front of
   it. The sky descends as the ball climbs, so both the gradient offset and the
   cloud parallax move content down the screen as scroll increases. */
function Sky({ skyRef, starsRef, cloudsRef }) {
  return (
    <>
      <div ref={skyRef} className="sky" aria-hidden="true" />
      <div ref={starsRef} className="stars" aria-hidden="true" />
      <div ref={cloudsRef} className="clouds" aria-hidden="true">
        <div className="cloud cloud--low" />
        <div className="cloud cloud--mid" />
        <div className="cloud cloud--cirrus" />
      </div>
      <div className="scanlines" aria-hidden="true" />
    </>
  )
}

/* Rows ---------------------------------------------------------------------- */

function Shots({ shots, onZoom }) {
  return (
    <div className="shots">
      {shots.map((shot) => (
        <button
          key={shot.src}
          type="button"
          className="frame frame--shot"
          onClick={(e) => {
            e.stopPropagation()
            onZoom({ src: shot.src, description: shot.alt })
          }}
          aria-label={`Enlarge ${shot.alt}`}
        >
          <img src={shot.thumb} alt={shot.alt} decoding="async" />
        </button>
      ))}
    </div>
  )
}

function Row({ row, n, open, fixed, onPick, onZoom }) {
  const head = (
    <>
      <span className="row-idx">{n}</span>
      <span className="row-title">{row.title}</span>
      <span className="row-spacer" />
      {row.meta && <span className="row-meta">{row.meta}</span>}
    </>
  )

  return (
    <div className={`row ${open ? 'is-open' : ''} ${fixed ? 'is-fixed' : ''}`}>
      {/* in a fixed section every row is already open, so the head is not a
          control — offering a click that changes nothing reads as broken */}
      {fixed ? (
        <div className="row-head">{head}</div>
      ) : (
        <button type="button" className="row-head" onClick={onPick} aria-expanded={open}>
          {head}
        </button>
      )}

      {open && (
        <div className="row-body">
          {row.shots && <Shots shots={row.shots} onZoom={onZoom} />}
          {row.body && <p className="body">{row.body}</p>}
          {row.note && <p className="note">— {row.note}</p>}
          {row.groups?.map((group, i) => (
            <div className="group" key={group.label ?? i}>
              {group.label && <p className="group-label">{group.label}</p>}
              <ul className="group-list">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
          {row.link && (
            <a
              className="row-link"
              href={row.link.href}
              onClick={(e) => e.stopPropagation()}
              {...(row.link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {row.link.href.replace(/^mailto:/, '')}
            </a>
          )}
        </div>
      )}
    </div>
  )
}

/* Gallery ------------------------------------------------------------------- */

function Gallery({ section, onZoom }) {
  return (
    <div className="gallery">
      <p className="lead">{section.lead}</p>
      <div className="grid">
        {section.frames.map((frame) => (
          <figure className="cell" key={frame.src}>
            <button
              type="button"
              className="frame"
              onClick={() => onZoom({ src: frame.src, description: frame.alt })}
              aria-label={`Enlarge ${frame.alt}`}
            >
              <img src={frame.thumb} alt={frame.alt} decoding="async" />
            </button>
            <figcaption className="caption">{frame.caption}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}

/* Lightbox ------------------------------------------------------------------ */

function Lightbox({ item, onClose }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (item && !dialog.open) dialog.showModal()
    if (!item && dialog.open) dialog.close()
  }, [item])

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose()
      }}
      onClose={onClose}
      aria-label={item ? item.description : 'photo'}
    >
      {item && (
        <figure className="lightbox-body">
          <button type="button" className="lightbox-close" onClick={onClose} aria-label="Close photo">
            <IconX aria-hidden="true" />
          </button>
          <img src={item.src} alt={item.description} />
          <figcaption>{item.description}</figcaption>
        </figure>
      )}
    </dialog>
  )
}

/* The stage ----------------------------------------------------------------- */

function Site({ target, onHome }) {
  const [index, setIndex] = useState(() => Math.max(0, SECTIONS.findIndex((s) => s.id === target)))
  const [pick, setPick] = useState(0)
  const [zoomed, setZoomed] = useState(null)

  const skyRef = useRef(null)
  const starsRef = useRef(null)
  const cloudsRef = useRef(null)
  const barRef = useRef(null)
  const heroRef = useRef(null)
  const panelRef = useRef(null)
  const ballRef = useRef(null)
  const indexRef = useRef(index)

  const section = SECTIONS[index]
  const rows = section.items ?? []
  // an expanded section ignores the selection entirely — every row is open
  const opened = Math.min(pick, Math.max(0, rows.length - 1))

  /* One sync function, called from both the rAF loop and the scroll listener.
     The listener is what guarantees the panel still advances when frames are
     being throttled; the loop is what keeps the sky smooth between events. */
  const sync = useCallback(() => {
    const vh = window.innerHeight
    const max = Math.max(1, document.documentElement.scrollHeight - vh)
    const y = window.scrollY
    const p = clamp(y / max, 0, 1)

    if (skyRef.current) {
      skyRef.current.style.backgroundPositionY = `${-(1 - p) * SKY_TRAVEL * vh}px`
    }
    if (cloudsRef.current) {
      cloudsRef.current.style.transform = `translateY(${p * SKY_TRAVEL * vh * 0.9}px)`
    }
    if (starsRef.current) {
      starsRef.current.style.opacity = String(clamp((p - 0.46) / 0.3, 0, 1))
    }
    if (barRef.current) barRef.current.style.width = `${p * 100}%`

    const hand = vh * HAND
    const heroOut = Math.min(1, y / hand)
    if (heroRef.current) {
      heroRef.current.style.opacity = String(1 - heroOut)
      heroRef.current.style.transform = `translateY(calc(-50% - ${heroOut * 34}px))`
      // past 98% it must not be able to intercept clicks meant for the panel
      heroRef.current.style.visibility = heroOut > 0.98 ? 'hidden' : 'visible'
    }
    if (panelRef.current) {
      panelRef.current.style.opacity = String(heroOut)
      panelRef.current.style.visibility = heroOut < 0.04 ? 'hidden' : 'visible'
    }

    const step = Math.max(1, (max - hand) / SECTIONS.length)
    const next = clamp(Math.floor((y - hand) / step), 0, SECTIONS.length - 1)
    if (next !== indexRef.current) {
      indexRef.current = next
      setIndex(next)
      setPick(0) // a new section always opens on its first row
    }

    // The label is engraved on the ball's surface and rotates away with it.
    // A long section name rasterises too small to read curved, so sections
    // may carry a shorter name for the ball.
    const engraved = SECTIONS[next].ball ?? SECTIONS[next].label
    ballRef.current?.setLabel?.(heroOut > 0.5 ? engraved : '')
  }, [])

  /* Land on the section the club promised. Index 0 starts at the very top so
     the hero introduction reads first — section 01 is the next thing down.
     Scroll restoration has to be taken off the browser first: on a reload of a
     deep link it puts the page back where it was, after this has run. */
  useLayoutEffect(() => {
    const previous = window.history.scrollRestoration
    if (previous) window.history.scrollRestoration = 'manual'

    const i = Math.max(0, SECTIONS.findIndex((s) => s.id === target))
    const land = () => {
      if (i === 0) {
        window.scrollTo(0, 0)
        return
      }
      const vh = window.innerHeight
      const hand = vh * HAND
      const max = Math.max(1, document.documentElement.scrollHeight - vh)
      const step = (max - hand) / SECTIONS.length
      window.scrollTo(0, hand + (i + 0.5) * step)
    }

    land()
    sync()
    // Once more after paint, in case the track had not been laid out yet. Only
    // if nothing has moved us in the meantime — in a background tab this frame
    // can be throttled for seconds, and re-landing then would yank a reader
    // who had already started scrolling.
    const settled = window.scrollY
    const raf = requestAnimationFrame(() => {
      if (Math.abs(window.scrollY - settled) > 2) return
      land()
      sync()
    })
    return () => {
      cancelAnimationFrame(raf)
      if (previous) window.history.scrollRestoration = previous
    }
  }, [target, sync])

  useEffect(warmThumbs, [])

  useEffect(() => {
    let raf = 0
    const tick = () => {
      sync()
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    window.addEventListener('scroll', sync, { passive: true })
    window.addEventListener('resize', sync)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', sync)
      window.removeEventListener('resize', sync)
    }
  }, [sync])

  const goHome = () => {
    window.scrollTo(0, 0)
    onHome()
  }

  return (
    <div className="stage">
      <Sky skyRef={skyRef} starsRef={starsRef} cloudsRef={cloudsRef} />

      <div className="dock" aria-hidden="true">
        <pixel-ball ref={ballRef} idle="0" start-angle="4.95" max-size="580" />
      </div>

      <Header
        onHome={goHome}
        action={
          <button type="button" className="back" onClick={goHome}>
            <span aria-hidden="true">←</span> BACK TO THE BAG
          </button>
        }
      />

      <div className="progress" aria-hidden="true">
        <div ref={barRef} className="progress-fill" />
      </div>

      <div ref={heroRef} className="hero">
        <h1 className="hero-name">{hero.name}</h1>
        <p className="hero-line">{hero.tagline}</p>
        <p className="hero-sub">{hero.taglineSub}</p>
        <div className="hero-scroll">SCROLL</div>
      </div>

      <div ref={panelRef} className="panel">
        <div className="panel-inner">
          <div className="panel-head">
            <span className="panel-label">{section.label}</span>
            <span className="panel-rule" />
            <span className="panel-count">
              {String(index + 1).padStart(2, '0')} / {TOTAL}
            </span>
          </div>

          {section.gallery ? (
            <Gallery section={section} onZoom={setZoomed} />
          ) : (
            <>
              {section.lead && <p className="lead">{section.lead}</p>}
              <div className="rows">
                {rows.map((row, i) => (
                  <Row
                    key={row.title}
                    row={row}
                    n={String(i + 1).padStart(2, '0')}
                    open={section.expanded || i === opened}
                    fixed={section.expanded}
                    onPick={() => setPick(i)}
                    onZoom={setZoomed}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <Links />

      <div className="track" aria-hidden="true" />
      <Lightbox item={zoomed} onClose={() => setZoomed(null)} />
    </div>
  )
}

export default Site
