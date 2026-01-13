import Toolbar from '../components/Toolbar'
import './Page.css'

function Projects() {
  const noteDate = new Date(Date.now() - 2 * 86400000)
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
        <h2>My Projects</h2>
        <p>Here you can showcase your work and projects.</p>
        <p>Add descriptions, links, and images of what you've built.</p>
      </div>
    </div>
  )
}

export default Projects
