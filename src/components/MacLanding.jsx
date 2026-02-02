import MacMenuBar from './MacMenuBar'
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

      <MacMenuBar title="Notes" />

      {/* Floating Notes window */}
      <div className="mac-notes-window">
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
            <button type="button" className="mac-browse-button" onClick={handleEnter}>
              ← browse all notes
            </button>
          </div>
        </div>
      </div>

      {/* macOS-style dock at bottom - custom icon images */}
      <div className="mac-dock-wrapper">
        <p className="mac-dock-label">for deccoration purposes only, more to come in the future</p>
        <div className="mac-dock" aria-hidden>
          <div className="mac-dock-icon" title="Messages">
            <img src="/images/dock/messages.png" alt="Messages" />
          </div>
          <div className="mac-dock-icon" title="VS Code">
            <img src="/images/dock/vscode.png" alt="VS Code" />
          </div>
          <div className="mac-dock-icon" title="Terminal">
            <img src="/images/dock/terminal.png" alt="Terminal" />
          </div>
          <div className="mac-dock-icon" title="Books">
            <img src="/images/dock/books.png" alt="Books" />
          </div>
          <div className="mac-dock-icon" title="Spotify">
            <img src="/images/dock/spotify.png" alt="Spotify" />
          </div>
          <div className="mac-dock-icon" title="Mail">
            <img src="/images/dock/mail.png" alt="Mail" />
          </div>
          <div className="mac-dock-icon" title="Cursor">
            <img src="/images/dock/cursor.png" alt="Cursor" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MacLanding
