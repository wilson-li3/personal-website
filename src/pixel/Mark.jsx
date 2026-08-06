import { WILSON_MARK } from './wilsonMark'

/*
 * The Wilson wordmark, drawn on the pixel grid: one rect per horizontal run
 * of ink. `cell` is the size of a grid pixel, `cols` crops to a column range
 * (used for the W monogram on the 5 wood headcover).
 */
function Mark({ cell = 4, color = 'currentColor', cols, title = 'Wilson' }) {
  const [from, to] = cols ?? [0, WILSON_MARK.w]
  const width = (to - from) * cell
  const height = WILSON_MARK.h * cell

  return (
    <div
      className="mark"
      style={{ width, height }}
      role="img"
      aria-label={title}
    >
      {WILSON_MARK.runs.map(([x, y, len]) => {
        const start = Math.max(x, from)
        const end = Math.min(x + len, to)
        if (end <= start) return null
        return (
          <span
            key={`${x}-${y}`}
            style={{
              position: 'absolute',
              left: (start - from) * cell,
              top: y * cell,
              width: (end - start) * cell,
              height: cell,
              background: color,
            }}
          />
        )
      })}
    </div>
  )
}

export default Mark
