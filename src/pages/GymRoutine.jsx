import Toolbar from '../components/Toolbar'
import './Page.css'

function GymRoutine() {
  const noteDate = new Date(Date.now() - 6 * 86400000)
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
        <h2>Gym Routine</h2>
        <p>This is where you can add your gym routine.</p>
      </div>
    </div>
  )
}

export default GymRoutine
