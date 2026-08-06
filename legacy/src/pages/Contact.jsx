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
        <h1 className="about-title">get in touch</h1>
        <p className="projects-description">feel free to reach out whenever if youd like to connect about anything. im a pretty fast responder and will get back to you asap. here are some of my contacts:</p>
        <ul className="about-list contact-list">
          <li>
            <a href="https://github.com/wilson-li3" target="_blank" rel="noopener noreferrer" className="contact-link">
              <svg className="contact-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" fill="#52681D"/>
              </svg>
              – github
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/wilsonli3" target="_blank" rel="noopener noreferrer" className="contact-link">
              <svg className="contact-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3.58 5.5h2.13v7.5H3.58V5.5zm1.06-3.5C3.8 2 3.16 2.65 3.16 3.5c0 .8.64 1.46 1.47 1.46.82 0 1.48-.66 1.48-1.46C6.11 2.65 5.47 2 4.64 2zm7.36 5.5c-1.18 0-1.71.64-2.02 1.1V5.5H7.55v7.5h2.11v-4.2c0-.28.02-.56.1-.77.22-.55.72-1.12 1.56-1.12 1.1 0 1.54.84 1.54 2.07v4.02h2.11V9.17c0-1.75-.94-2.56-2.19-2.56z" fill="#52681D"/>
              </svg>
              – linkedin
            </a>
          </li>
          <li>
            <a href="https://devpost.com/wilson-li3?ref_content=user-portfolio&ref_feature=portfolio&ref_medium=global-nav" target="_blank" rel="noopener noreferrer" className="contact-link">
              <svg className="contact-icon" width="16" height="16" viewBox="0 0 64 64" fill="none">
                <path d="M48.7,4.8H15.3L0,32l15.7,27.2h33.1L64,32L48.7,4.8z" fill="#52681D"/>
                <path d="M32.2,16.9H21.4v30.3h10.8c8.2,0,14.9-6.8,14.9-15.1S40.5,16.9,32.2,16.9z M32,41.1h-4.5V22.9H32c5,0,9.1,4.1,9.1,9.1S37,41.1,32,41.1z" fill="white"/>
              </svg>
              – devpost
            </a>
          </li>
          <li>
            <a href="mailto:wyli@uwaterloo.ca" className="contact-link">
              <svg className="contact-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 3h12c.55 0 1 .45 1 1v8c0 .55-.45 1-1 1H2c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1zm1 1v8h10V4H3zm1.5 1L8 7.5 11.5 5h-7zm0 1.5v4.5h7V6.5L8 9 4.5 6.5z" fill="#52681D"/>
              </svg>
              – wyli@uwaterloo.ca
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Contact
