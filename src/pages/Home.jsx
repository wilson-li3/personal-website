import Toolbar from '../components/Toolbar'
import './Page.css'

function Home() {
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
        <h1>Welcome to My Personal Website</h1>
        <p>This is my digital space where I share my thoughts, projects, and experiences.</p>
        <p>Feel free to explore the different sections using the sidebar navigation.</p>
      </div>
    </div>
  )
}

export default Home
