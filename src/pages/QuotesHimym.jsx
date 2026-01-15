import Toolbar from '../components/Toolbar'
import './Page.css'

function QuotesHimym() {
  const noteDate = new Date(Date.now() - 4 * 86400000)
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
        <h2>Quotes from HIMYM</h2>
        <p>This is where you can add quotes from How I Met Your Mother.</p>
      </div>
    </div>
  )
}

export default QuotesHimym
