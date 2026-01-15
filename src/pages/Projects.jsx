import { useState, useEffect } from 'react'
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
  const [activeSection, setActiveSection] = useState('projects')

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'projects',
        'handtracker',
        'handtracker-lessons',
        'uway',
        'uway-lessons',
        'waypost',
        'waypost-lessons'
      ]

      const scrollOffset = 100
      let currentSection = 'projects'
      
      // Find the section that's currently visible in the viewport
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          // Check if section is in the viewport (with some offset)
          if (rect.top <= scrollOffset && rect.bottom >= 0) {
            currentSection = section
            break
          }
        }
      }
      
      setActiveSection(currentSection)
    }

    // Listen to both window scroll and page-content scroll
    const scrollContainer = document.querySelector('.page-content')
    
    const onScroll = () => {
      handleScroll()
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', onScroll, { passive: true })
    }
    handleScroll() // Check on mount
    
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', onScroll)
      }
    }
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
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
      <div className="page-content projects-page-content">
        <div className="projects-main">
          <h1 className="projects-title" id="projects">projects</h1>
          <p className="projects-description">side projects and lessons learned:</p>
          <p className="projects-description">documentation of what i learned while building these projects</p>
          <div className="projects-container">
            <div className="project-item" id="handtracker">
              <h2 className="project-title">nfl playbook handtracker</h2>
            <p className="project-tech">python, opencv, mediapipe, three.js, supabase</p>
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
            <div className="project-lessons" id="handtracker-lessons">
              <h3 className="lessons-title">lessons i learned</h3>
              <ul className="lessons-list">
                <li>– Working on something I cared about made learning easier</li>
                <li>– Hand tracking needs temporal smoothing and gesture state transitions</li>
                <li>– 3D route rendering depends on consistent coordinate mapping</li>
              </ul>
            </div>
          </div>
          <div className="project-item" id="uway">
            <h2 className="project-title">uway</h2>
            <p className="project-tech">react, javascript, fastapi, python, sql, rest apis, json</p>
            <p className="project-description">built for se101 after we realized how brutally cold it is in waterloo</p>
            <img className="project-image" src={uwayImg1} alt="Uway 1" />
            <ul className="project-list">
              <li>– parses pasted Quest schedules with Python and regex into clean structured data</li>
              <li>– uses dijkstra’s algorithm to compute the shortest indoor paths between classes</li>
            </ul>
            <img className="project-image" src={uwayImg2} alt="Uway 2" />
            <ul className="project-list">
              <li>– serves schedule and location data through an API for routing logic</li>
              <li>– provides a web interface for users to visualize their schedules</li>
            </ul>
            <div className="project-lessons" id="uway-lessons">
              <h3 className="lessons-title">lessons i learned</h3>
              <ul className="lessons-list">
                <li>– project ideas are hidden in plain sight</li>
                <li>– finally understood version control with git</li>
                <li>– learned the importance of user feedback in shaping features and agile development</li>
              </ul>
            </div>
          </div>
          <div className="project-item" id="waypost">
            <h2 className="project-title">waypost</h2>
            <p className="project-tech">fastapi, react, tailwind css, firebase, cloudinary</p>
            <p className="project-description">new hacks 2025 2nd place - circular tourist economy. built on energy drinks and midnight mcd's</p>
            <img className="project-image" src={waypostImg1} alt="Waypost 1" />
            <img className="project-image" src={waypostImg2} alt="Waypost 2" />
            <ul className="project-list">
              <li>– Built a circular-economy platform to reduce tourist waste</li>
              <li>– Designed backend data models to represent items, availability windows, and locations</li>
            </ul>
            <img className="project-image" src={waypostImg3} alt="Waypost 3" />
            <ul className="project-list">
              <li>– Implemented point system for users to earn rewards</li>
              <li>– Stored point balances and transaction history in the backend for consistency</li>
            </ul>
            <div className="project-lessons" id="waypost-lessons">
              <h3 className="lessons-title">lessons i learned</h3>
              <ul className="lessons-list">
                <li>– no matter how hard things get, having friends to go through it with you makes it 10x easier</li>
                <li>– learned i can sit and code for 24 hours</li>
                <li>– mcdonalds tastes 1000x better at 2am</li>
              </ul>
            </div>
          </div>
        </div>
        </div>
        <div className="projects-sidebar">
          <div 
            className={`sidebar-item ${activeSection === 'projects' ? 'active' : ''}`}
            onClick={() => scrollToSection('projects')}
          >
            projects
          </div>
          <div 
            className={`sidebar-item ${activeSection === 'handtracker' ? 'active' : ''}`}
            onClick={() => scrollToSection('handtracker')}
          >
            nfl playbook handtracker
          </div>
          <div 
            className={`sidebar-item ${activeSection === 'handtracker-lessons' ? 'active' : ''}`}
            onClick={() => scrollToSection('handtracker-lessons')}
          >
            lessons learned from nfl playbook handtracker
          </div>
          <div 
            className={`sidebar-item ${activeSection === 'uway' ? 'active' : ''}`}
            onClick={() => scrollToSection('uway')}
          >
            uway
          </div>
          <div 
            className={`sidebar-item ${activeSection === 'uway-lessons' ? 'active' : ''}`}
            onClick={() => scrollToSection('uway-lessons')}
          >
            lessons learned from uway
          </div>
          <div 
            className={`sidebar-item ${activeSection === 'waypost' ? 'active' : ''}`}
            onClick={() => scrollToSection('waypost')}
          >
            waypost
          </div>
          <div 
            className={`sidebar-item ${activeSection === 'waypost-lessons' ? 'active' : ''}`}
            onClick={() => scrollToSection('waypost-lessons')}
          >
            lessons learned from waypost
          </div>
        </div>
      </div>
    </div>
  )
}

export default Projects
