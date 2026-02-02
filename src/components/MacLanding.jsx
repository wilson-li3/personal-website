import './MacLanding.css'

function MacLanding({ onEnter }) {
  const handleEnter = (e) => {
    e.preventDefault()
    e.stopPropagation()
    onEnter?.()
  }

  return (
    <div className="mac-landing">
      {/* macOS desktop background */}
      <div className="mac-desktop" aria-hidden />

      {/* Top menu bar - visual only */}
      <header className="mac-menu-bar">
        <div className="mac-menu-left">
          <span className="mac-apple-icon" aria-hidden>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
              <path d="M10.12 7.48c.03-1.85 1.51-2.75 1.58-2.79-.86-1.26-2.2-1.43-2.68-1.45-1.14-.12-2.23.67-2.75.67-.53 0-1.19-.65-1.96-.63-1.01.02-1.94.59-2.46 1.5-1.05 1.82-.27 4.51.75 5.99.5.72 1.07 1.53 1.8 1.5.69-.03.95-.44 1.78-.44.83 0 1.06.44 1.78.43.73-.01 1.2-.73 1.7-1.45.54-.78.76-1.53.77-1.57-.04-.02-1.49-.57-1.5-2.27zM8.67 2.36c.39-.47.66-1.12.59-1.77-.57.02-1.27.38-1.69.85-.37.42-.69 1.1-.6 1.76.64.05 1.29-.33 1.68-.84z" />
            </svg>
          </span>
          <span className="mac-menu-item mac-menu-app">Notes</span>
          <span className="mac-menu-item">File</span>
          <span className="mac-menu-item">Edit</span>
          <span className="mac-menu-item">View</span>
          <span className="mac-menu-item">Window</span>
          <span className="mac-menu-item">Help</span>
        </div>
        <div className="mac-menu-right">
          <span className="mac-status-icon" aria-hidden>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
              <path d="M1 5.5h1v3H1v-3zm2-1.5h1v4.5H3V4zm2 1h1v3.5H5V5zm2-2h1v5.5H7V3zm2 3h1v2.5H9V6zm2-1.5h1v4H11v-4zm2 0h1v4h-1v-4z" />
            </svg>
          </span>
          <span className="mac-status-icon" aria-hidden>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
              <path d="M2 2h10v9H2V2zm1 1v7h8V3H3zm1 5h1v1H4V8zm2 0h1v1H6V8zm2 0h1v1H8V8z" />
            </svg>
          </span>
          <span className="mac-menu-time">
            {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true })}
          </span>
        </div>
      </header>

      {/* Floating Notes window - click anywhere to enter notes */}
      <div className="mac-notes-window" onClick={handleEnter} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleEnter(e); } }} aria-label="Enter notes">
        <div className="mac-window-inner">
          <div className="mac-window-titlebar" aria-hidden>
            <div className="mac-window-buttons">
              <span className="mac-window-btn mac-window-btn-close" />
              <span className="mac-window-btn mac-window-btn-minimize" />
              <span className="mac-window-btn mac-window-btn-maximize" />
            </div>
          </div>
          <div className="mac-window-content">
            <h1 className="mac-notes-title">wilson — personal notes</h1>
            <div className="mac-notes-card">
              <p className="mac-notes-preview">
                notes has become a go to app for me. whether that is scribbling down tim horton's orders for my friends, writing down my thoughts, or reminders of what my friends love, what ive realized is that my notes have become a memorabilia of who I am today.
              </p>
              <p className="mac-notes-preview">
                check out my about me and click around on the different notes to pick my brain
              </p>
            </div>
            <span className="mac-browse-link">← browse all notes</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MacLanding
