import Toolbar from '../components/Toolbar'
import './Page.css'

function About() {
  const noteDate = new Date(Date.now() - 86400000)
  const formattedDate = noteDate.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  })
  const formattedTime = new Date().toLocaleTimeString('en-US', { 
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
        <h2>About Me</h2>
        <p>This is where you can add information about yourself.</p>
        <p>Share your background, interests, and what you're passionate about.</p>
      </div>
    </div>
  )
}

export default About
