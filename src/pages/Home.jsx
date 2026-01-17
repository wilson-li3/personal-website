import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Toolbar from '../components/Toolbar'
import './Page.css'

function Home() {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.play()
    }
  }, [])

  const handleVideoEnded = () => {
    const video = videoRef.current
    if (video) {
      video.pause()
      video.currentTime = video.duration
    }
  }

  const handleReplay = () => {
    const video = videoRef.current
    if (video) {
      video.currentTime = 0
      video.play()
    }
  }

  const currentDate = new Date()
  const formattedDate = currentDate.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  })
  const formattedTime = currentDate.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit', 
    hour12: true 
  })

  return (
    <div className="page">
      <div className="page-header">
        <Toolbar />
        <div className="page-date">{formattedDate} at {formattedTime}</div>
      </div>
      <div className="page-content home-note">
        <div className="home-navigation-hint">
          <div className="nav-hint-arrow">←</div>
          <div className="nav-hint-text">click on different notes in the sidebar to navigate to different pages</div>
          <div className="nav-hint-arrow">←</div>
        </div>
        <div className="home-note-header">
          <h1 className="home-note-title">wilson — personal notes</h1>
          <div className="home-note-subtitle">last edited just now</div>
        </div>
        <div className="home-note-body">
          <p>notes has become a go to app for me. whether that is scribbling down tim horton's orders for my friends, writing down my thoughts, or reminders of what my friends love, what ive realized is that my notes have become a memorabilia of who I am today.</p>
          <br />
          <p>check out my <Link to="/about" className="home-note-link">about me</Link> and click around on the different notes to pick my brain</p>
          <br />
          <p>here's a glimpse into my life.</p>
          <p>not everything about me, but enough to take note</p>
          <br />
          <p>currently:</p>
          <div className="home-note-currently-wrapper">
            <ul className="home-note-list">
              <li>
                – studying software engineering at waterloo
                <ul className="home-note-nested-list">
                  <li className="home-note-nested-item">
                    <span className="home-note-nested-text">click here to watch me draw my smiski waterloo crest again</span>
                    <button className="replay-button-inline" onClick={handleReplay}>
                      ↻
                    </button>
                  </li>
                </ul>
              </li>
              <li>
                - building a sports betting line aggregator
              </li>
              <li>
                - part of watonomous (uw's autonomous vehicle team)
              </li>
            </ul>
            <div className="home-video-wrapper">
              <video
                ref={videoRef}
                src="/images/waterloocrestsmiski.mp4"
                className="home-video-inline"
                autoPlay
                muted
                playsInline
                onEnded={handleVideoEnded}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
