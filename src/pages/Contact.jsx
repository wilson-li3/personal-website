import Toolbar from '../components/Toolbar'
import './Page.css'

function Contact() {
  const noteDate = new Date(Date.now() - 3 * 86400000)
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
        <h2>Get In Touch</h2>
        <p>Feel free to reach out if you'd like to connect!</p>
        <p>You can add your email, social media links, or a contact form here.</p>
      </div>
    </div>
  )
}

export default Contact
