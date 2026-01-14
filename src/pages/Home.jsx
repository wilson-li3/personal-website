import { useRef, useEffect } from 'react'
import Toolbar from '../components/Toolbar'
import './Page.css'
import videoSrc from '../images/waterloocrestsmiski.mp4'

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
      <div className="page-content">
        <div className="home-video-container">
          <video
            ref={videoRef}
            src={videoSrc}
            className="home-video"
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnded}
          />
          <p className="home-video-text">Software Engineering at the University of Waterloo</p>
        </div>
        <h1>Welcome to My Personal Website</h1>
        <p>This is my digital space where I share my thoughts, projects, and experiences.</p>
        <p>Feel free to explore the different sections using the sidebar navigation.</p>
      </div>
    </div>
  )
}

export default Home
