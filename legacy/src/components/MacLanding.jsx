import { useState, useEffect, useRef } from 'react'
import Lottie from 'lottie-react'
import MacMenuBar from './MacMenuBar'
import './MacLanding.css'

const FACEID_SWITCH_DELAY_MS = 1600

function MacLanding({ onEnter }) {
  const [showFaceId, setShowFaceId] = useState(false)
  const [faceIdData, setFaceIdData] = useState(null)
  const hasSwitchedRef = useRef(false)

  // Preload animation when landing mounts so it's ready when user clicks
  useEffect(() => {
    let cancelled = false
    fetch('/animations/face-id.json')
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setFaceIdData(data)
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [])

  // Fallback: if user clicks before prefetch finished, fetch when overlay opens
  useEffect(() => {
    if (!showFaceId || faceIdData) return
    let cancelled = false
    fetch('/animations/face-id.json')
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setFaceIdData(data)
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [showFaceId, faceIdData])

  const doSwitch = () => {
    if (hasSwitchedRef.current) return
    hasSwitchedRef.current = true
    setShowFaceId(false)
    onEnter?.()
  }

  const handleFaceIdComplete = () => {
    doSwitch()
  }

  // Start page switch a bit before animation ends so there's no stall
  useEffect(() => {
    if (!showFaceId || !faceIdData) return
    hasSwitchedRef.current = false
    const t = setTimeout(doSwitch, FACEID_SWITCH_DELAY_MS)
    return () => clearTimeout(t)
  }, [showFaceId, faceIdData])

  const handleBrowseClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setShowFaceId(true)
  }

  return (
    <div className="mac-landing">
      {/* macOS desktop background */}
      <div className="mac-desktop" aria-hidden />

      <img className="mac-landing-photo" src="/images/wilson-about.png" alt="Wilson Li" aria-hidden />

      <MacMenuBar title="Notes" />

      {showFaceId && (
        <div className="mac-faceid-overlay" aria-live="polite">
          <div className="mac-faceid-container">
            {faceIdData && (
              <Lottie
                animationData={faceIdData}
                loop={false}
                onComplete={handleFaceIdComplete}
                className="mac-faceid-lottie"
                aria-label="Face ID authentication"
              />
            )}
          </div>
        </div>
      )}

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
            <h1 className="mac-notes-title">wilson li — personal portfolio</h1>
            <div className="mac-notes-card">
              <p className="mac-notes-preview">
                Notes is where everything ends up for me. Quick reminders, half-formed ideas, random thoughts, and things I don't want to forget all live here. Over time, those small entries have added up into a quiet record of how I think and what I care about. Because of that, I thought It'd be perfect to present my portfolio using notes.
              </p>
              <p className="mac-notes-preview">
                Browse around, open a few notes, and get a glimpse into how my mind works.
              </p>
            </div>
            <button type="button" className="mac-browse-button" onClick={handleBrowseClick}>
              ← browse all notes
            </button>
          </div>
        </div>
      </div>

      {/* macOS-style dock at bottom - custom icon images */}
      <div className="mac-dock-wrapper">
        <p className="mac-dock-label">for decoration purposes only, more to come in the future</p>
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
