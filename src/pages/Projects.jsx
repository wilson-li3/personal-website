import Toolbar from '../components/Toolbar'
import './Page.css'
import handTrackerImg1 from '../images/handtracker1.png'
import handTrackerImg2 from '../images/handtracker2.png'
import uwayImg1 from '../images/uway1.png'
import uwayImg2 from '../images/uway2.png'
import waypostImg1 from '../images/waypost1.png'
import waypostImg2 from '../images/waypost2.png'
import waypostImg3 from '../images/waypost3.png'

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
        <h1 className="projects-title">projects</h1>
        <p className="projects-description">side projects and lessons learned:</p>
        <div className="projects-container">
          <div className="project-item">
            <h2 className="project-title">nfl playbook handtracker</h2>
            <p className="project-description">heavily inspired by being an eagles fan and wanting to explore computer vision</p>
            <img className="project-image" src={handTrackerImg1} alt="Hand Tracker 1" />
            <ul className="project-list">
              <li>– uses real-time hand tracking to control input and interactions</li>
              <li>– renders an interactive 3D football field using Three.js</li>
            </ul>
            <img className="project-image" src={handTrackerImg2} alt="Hand Tracker 2" />
            <ul className="project-list">
              <li>– draws and edits football routes through gesture-based input</li>
              <li>– stores and replays custom play designs for later use</li>
            </ul>
          </div>
          <div className="project-item">
            <h2 className="project-title">uway</h2>
            <p className="project-description">EDIT_PROJECT_DESCRIPTION_HERE</p>
            <img className="project-image" src={uwayImg1} alt="Uway 1" />
            <ul className="project-list">
              <li>– EDIT_BULLET_POINT_1_HERE</li>
              <li>– EDIT_BULLET_POINT_2_HERE</li>
            </ul>
            <img className="project-image" src={uwayImg2} alt="Uway 2" />
            <ul className="project-list">
              <li>– EDIT_BULLET_POINT_1_HERE</li>
              <li>– EDIT_BULLET_POINT_2_HERE</li>
            </ul>
          </div>
          <div className="project-item">
            <h2 className="project-title">waypost</h2>
            <p className="project-description">EDIT_PROJECT_DESCRIPTION_HERE</p>
            <img className="project-image" src={waypostImg1} alt="Waypost 1" />
            <ul className="project-list">
              <li>– EDIT_BULLET_POINT_1_HERE</li>
              <li>– EDIT_BULLET_POINT_2_HERE</li>
            </ul>
            <img className="project-image" src={waypostImg2} alt="Waypost 2" />
            <ul className="project-list">
              <li>– EDIT_BULLET_POINT_1_HERE</li>
              <li>– EDIT_BULLET_POINT_2_HERE</li>
            </ul>
            <img className="project-image" src={waypostImg3} alt="Waypost 3" />
            <ul className="project-list">
              <li>– EDIT_BULLET_POINT_1_HERE</li>
              <li>– EDIT_BULLET_POINT_2_HERE</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Projects
