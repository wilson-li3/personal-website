import Mark from './Mark'
import { contact } from '../content'
import './Chrome.css'

/*
 * The chrome both screens share: a bar across the top carrying the Wilson
 * wordmark, and the outbound links below.
 *
 * Markup and placement are shared; the type and colour are not, because the
 * landing sits on green felt and the stage sits on a sky that runs from
 * near-white to near-black. Each screen's stylesheet tunes its own.
 *
 * The bar's height is a fixed 76px — Landing.jsx measures its scene against
 * the height left under it, so BAR there must match .chrome-head here.
 */

const LINK_IDS = ['github', 'linkedin', 'email']
const LINK_LABELS = { github: 'GitHub', linkedin: 'LinkedIn', email: 'Email' }

export function Header({ onHome }) {
  return (
    <header className="chrome-head">
      {onHome ? (
        <button type="button" className="chrome-mark" onClick={onHome} aria-label="Back to the bag">
          <Mark cell={2} color="currentColor" />
        </button>
      ) : (
        <Mark cell={2} color="currentColor" />
      )}
    </header>
  )
}

export function Links() {
  return (
    <nav className="chrome-links" aria-label="Elsewhere">
      {LINK_IDS.map((id) => {
        const link = contact.links.find((l) => l.id === id)
        return (
          <a
            key={id}
            href={link.href}
            {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {LINK_LABELS[id]}
          </a>
        )
      })}
    </nav>
  )
}
