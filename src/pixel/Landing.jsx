import { useEffect, useState } from 'react'
import { CLUBS } from './clubs'
import Mark from './Mark'
import Crest from './Crest'
import { Header, Links } from './Chrome'
import './Landing.css'

/*
 * The landing screen: a 16-bit pixel bag with six clubs fanned out of it.
 * Ported from the design handoff — a fixed 1280x720 stage scaled to fit the
 * viewport, every rect at its exact coordinate. Hover (or focus) a club and
 * it lifts out of the bag while the HUD card swaps.
 *
 * Narrow screens have no hover, so the stage scales to the width and the HUD
 * moves below it at readable size: first tap previews a club, second opens it.
 */

const SCENE_W = 1280
const SCENE_H = 720
const NARROW = 900
// height of the fixed top bar; must match .chrome-head in Chrome.css
const BAR = 76

const rect = (left, top, width, height, background, extra) => ({
  position: 'absolute',
  left,
  top,
  width,
  height,
  background,
  ...extra,
})

function Bag() {
  return (
    <div style={{ position: 'absolute', left: 452, top: 380, width: 596, height: 340, zIndex: 10 }}>
      {/* ribbed black collar */}
      <div style={rect(96, 0, 404, 12, '#1b1d21')} />
      <div style={rect(72, 12, 452, 16, '#1b1d21')} />
      <div
        style={rect(56, 28, 484, 56, '#24262b', {
          backgroundImage:
            'repeating-linear-gradient(90deg, rgba(255,255,255,.05) 0 4px, rgba(0,0,0,.22) 4px 12px)',
        })}
      />
      <div style={rect(96, 20, 404, 20, '#0d0e11')} />
      <div style={rect(56, 84, 484, 12, '#101215')} />

      {/* cream wordmark band */}
      <div
        style={rect(48, 96, 500, 96, '#eee2c6', {
          backgroundImage:
            'repeating-linear-gradient(90deg, rgba(0,0,0,.05) 0 4px, rgba(0,0,0,0) 4px 8px)',
        })}
      />
      <div style={rect(48, 96, 500, 8, '#fff6e2')} />
      <div style={rect(48, 184, 500, 8, '#c9bda2')} />
      <div
        style={{
          position: 'absolute',
          left: 48,
          top: 96,
          width: 500,
          height: 96,
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <Mark cell={4} color="#96222c" />
      </div>
      <div style={rect(40, 192, 516, 12, '#1b1d21')} />

      {/* red body */}
      <div
        style={rect(44, 204, 508, 136, '#a02b34', {
          backgroundImage:
            'repeating-linear-gradient(90deg, rgba(0,0,0,.12) 0 4px, rgba(0,0,0,0) 4px 8px), repeating-linear-gradient(0deg, rgba(255,255,255,.05) 0 4px, rgba(0,0,0,.07) 4px 8px)',
        })}
      />
      <div style={rect(44, 204, 24, 136, 'rgba(255,255,255,.12)')} />
      <div style={rect(520, 204, 32, 136, 'rgba(0,0,0,.22)')} />

      {/* front pocket + zipper */}
      <div style={rect(140, 240, 320, 100, '#8c222b', { border: '8px solid #6d181f' })} />
      <div style={rect(164, 268, 272, 12, '#1b1d21')} />
      <div style={rect(164, 268, 272, 4, '#cfc7b2')} />
      <div style={rect(156, 260, 24, 28, '#d5dae3')} />

      {/* straps */}
      <div style={rect(20, 132, 28, 208, '#8c222b')} />
      <div style={rect(4, 156, 20, 184, '#6d181f')} />
      <div style={rect(20, 132, 28, 12, '#b5323c')} />
      <div style={rect(552, 140, 24, 200, '#8c222b')} />
      <div style={rect(572, 168, 20, 172, '#6d181f')} />

      {/* chain + hanging tag */}
      <div style={rect(496, 176, 12, 40, '#b9bec9')} />
      <div style={rect(480, 216, 48, 76, '#2f2a26', { border: '8px solid #1b1d21' })} />
      <div style={rect(496, 236, 16, 32, '#96222c')} />
    </div>
  )
}

/*
 * A club's silhouette: the shaft rects plus the head group. It is rendered
 * twice — once as the art, which lifts, and once as a hit shape left behind
 * at rest — so the pointer never loses the club as it slides out of the bag.
 */
function Silhouette({ club, className }) {
  return (
    <div className={className}>
      <div style={rect(111, 0, 18, club.height, '#9aa2af')} />
      <div style={rect(111, 0, 8, club.height, '#dfe4ec')} />
      {club.head}
    </div>
  )
}

function Club({ club, active, onPreview, onClear, onOpen }) {
  return (
    <div
      className={`club ${active ? 'is-lifted' : ''}`}
      style={{
        left: club.left,
        top: club.top,
        width: club.width,
        height: club.height,
        zIndex: club.z,
        '--rot': `${club.rotate}deg`,
      }}
      onMouseEnter={onPreview}
      onMouseLeave={onClear}
      onClick={() => (active ? onOpen(club.section) : onPreview())}
    >
      {/* a strip over the shaft, plus the painted head rects, are the only
          things that take the pointer — see .club in Landing.css. The button
          exists so the club is reachable and clickable from the keyboard. */}
      <button
        type="button"
        className="club-hit"
        onFocus={onPreview}
        onBlur={onClear}
        aria-label={`${club.card.name} — ${club.card.label}`}
      />
      <Silhouette club={club} className="club-shape club-shape--hit" />
      <Silhouette club={club} className="club-shape club-shape--art" />
    </div>
  )
}

/*
 * The card sits in its own slot so nothing else moves when it appears. It
 * names the club and the section it opens, and nothing more — the clubs are
 * the interface, so the HUD should not narrate them. At rest the slot holds
 * a single unboxed line saying the clubs can be picked up, which is the only
 * thing marking them as interactive.
 */
function InfoCard({ active, narrow }) {
  const card = active?.card
  if (!card) {
    return (
      <p className="hud-hint">{narrow ? 'TAP A CLUB, THEN TAP AGAIN TO OPEN' : 'HOVER A CLUB · CLICK TO OPEN'}</p>
    )
  }
  return (
    <div className="hud-card">
      <p className="hud-card-name">{card.name}</p>
      <p className="hud-card-label">{card.label}</p>
    </div>
  )
}

/* The standing line belongs to the greeting; on narrow it carries the crest. */
function Standing({ narrow }) {
  const line = <p className={`hud-standing ${narrow ? '' : 'hud-standing--stage'}`}>2ND YEAR SE @ UWATERLOO</p>
  if (!narrow) return line
  return (
    <div className="hud-standing-row">
      <Crest />
      {line}
    </div>
  )
}

/*
 * The way in: a Wilson ball sitting on the felt, stamped ENTER. Drawn as a
 * stepped clip-path rather than a border-radius so its edge stays on the
 * pixel grid like everything else here. Opens whichever club is up.
 */
function EnterButton({ active, onOpen }) {
  return (
    <button
      type="button"
      className="enter"
      onClick={() => onOpen(active?.section ?? 'who')}
      aria-label="Enter the site"
    >
      <span className="enter-ball">
        <span className="enter-dimples" aria-hidden="true" />
        <span className="enter-face">
          <Mark cell={1} color="#96222c" title="" />
          <span className="enter-word">ENTER</span>
        </span>
      </span>
    </button>
  )
}

function Landing({ onEnter }) {
  const [hot, setHot] = useState(null)
  const [{ fit, narrow, grassTop }, setLayout] = useState({ fit: 1, narrow: false, grassTop: 596 })

  useEffect(() => {
    const fitNow = () => {
      const isNarrow = window.innerWidth < NARROW
      // The bar is opaque and would cut the tops off the clubs, so the scene
      // is fitted into the height left under it, not the whole window.
      const room = window.innerHeight - BAR
      // Fill that room: scale the stage up as well as down, letting the felt
      // and grass bleed past it so there is never a letterbox.
      const next = isNarrow
        ? (window.innerWidth - 24) / SCENE_W
        : Math.min(window.innerWidth / SCENE_W, room / SCENE_H)
      setLayout({
        fit: next,
        narrow: isNarrow,
        // the stage's divider line (y=588), so the bleed seams onto it exactly
        grassTop: BAR + Math.max(0, (room - SCENE_H * next) / 2) + 588 * next,
      })
    }
    fitNow()
    window.addEventListener('resize', fitNow)
    return () => window.removeEventListener('resize', fitNow)
  }, [])

  const active = CLUBS.find((c) => c.id === hot) ?? null

  return (
    <div
      className={`landing ${narrow ? 'is-narrow' : ''}`}
      style={{ '--grass-top': `${grassTop}px`, '--divider-h': `${8 * fit}px` }}
    >
      {/* Wall and grass are drawn once, edge to edge, underneath everything.
          They are deliberately NOT part of the scaled scene: a scaled weave
          and an unscaled one meeting at the scene's edge shows as a seam. */}
      {!narrow && <div className="landing-wall" aria-hidden="true" />}
      {!narrow && <div className="landing-bleed" aria-hidden="true" />}
      <Header />
      <div className="landing-fit" style={{ width: SCENE_W * fit, height: SCENE_H * fit }}>
        <div className="scene" style={{ transform: `scale(${fit})`, transformOrigin: 'top left' }}>
          {/* Narrow shows the scene as a framed box, so there it carries its
              own wall, grass and divider. Wide gets them full-bleed instead. */}
          {narrow && (
            <>
              <div
                style={rect(0, 0, 1280, 596, '#21402c', {
                  backgroundImage:
                    'repeating-linear-gradient(90deg, rgba(0,0,0,.07) 0 4px, rgba(0,0,0,0) 4px 8px), repeating-linear-gradient(0deg, rgba(255,255,255,.03) 0 4px, rgba(0,0,0,.05) 4px 8px)',
                })}
              />
              <div
                style={rect(0, 596, 1280, 124, '#4b7a44', {
                  backgroundImage:
                    'repeating-linear-gradient(90deg, rgba(0,0,0,.09) 0 4px, rgba(0,0,0,0) 4px 8px), repeating-linear-gradient(0deg, rgba(255,255,255,.05) 0 4px, rgba(0,0,0,.06) 4px 8px)',
                })}
              />
              <div style={rect(0, 588, 1280, 8, '#2b4c33')} />
            </>
          )}

          {/* the greeting runs behind the bag; the bag's own wordmark finishes it */}
          <p className="greeting" aria-hidden="true">
            HI! I&apos;M
          </p>

          {/* the bag and its clubs move as one assembly (see --rig-shift) */}
          <div className="rig">
            {CLUBS.map((club) => (
              <Club
                key={club.id}
                club={club}
                active={hot === club.id}
                onPreview={() => setHot(club.id)}
                onClear={() => !narrow && setHot(null)}
                onOpen={onEnter}
              />
            ))}
            <Bag />
          </div>

          {!narrow && (
            <>
              <Crest className="crest--stage" />
              <div className="hud-slot">
                {/* fixed-height so the button below never moves when the
                    hint swaps for a club's card */}
                <div className="hud-swap">
                  <InfoCard active={active} narrow={narrow} />
                </div>
                <EnterButton active={active} onOpen={onEnter} />
              </div>
              <Standing narrow={narrow} />
            </>
          )}
        </div>
      </div>

      {narrow && (
        <div className="hud-stack">
          <InfoCard active={active} narrow={narrow} />
          <EnterButton active={active} onOpen={onEnter} />
          <Standing narrow={narrow} />
        </div>
      )}

      <Links />
    </div>
  )
}

export default Landing
