import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import NoteList from './NoteList'
import './Layout.css'

function Layout({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [selectedNote, setSelectedNote] = useState(location.pathname)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const [showDetail, setShowDetail] = useState(false)

  const notes = [
    { id: 'home', path: '/', title: 'Home', preview: 'Welcome to my personal website', date: new Date() },
    { id: 'about', path: '/about', title: 'About', preview: 'Learn more about me and my background', date: new Date(Date.now() - 86400000) },
    { id: 'projects', path: '/projects', title: 'Projects', preview: 'Check out my recent work and projects', date: new Date(Date.now() - 2 * 86400000) },
    { id: 'contact', path: '/contact', title: 'Contact', preview: 'Get in touch with me', date: new Date(Date.now() - 3 * 86400000) },
  ]

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768
      setIsMobile(mobile)
      if (!mobile) {
        setShowDetail(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    setSelectedNote(location.pathname)
    if (isMobile && location.pathname !== '/') {
      setShowDetail(true)
    } else if (isMobile) {
      setShowDetail(false)
    }
  }, [location.pathname, isMobile])

  const handleNoteClick = (path) => {
    setSelectedNote(path)
    navigate(path)
    if (isMobile) {
      setShowDetail(true)
    }
  }

  const handleBack = () => {
    setShowDetail(false)
    navigate('/')
    setSelectedNote('/')
  }

  return (
    <div className="layout">
      {!isMobile && <Sidebar />}
      <div className={`mobile-header ${isMobile && !showDetail ? 'visible' : ''}`}>
        <div className="mobile-header-content">
          <div className="mobile-back-button" onClick={handleBack}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="mobile-title">Notes</div>
          <div className="mobile-count">{notes.length} Notes</div>
        </div>
      </div>
      <div className={`note-list-container ${isMobile && showDetail ? 'hidden' : ''}`}>
        <NoteList 
          notes={notes} 
          selectedNote={selectedNote}
          onNoteClick={handleNoteClick}
        />
      </div>
      <div className={`content-pane ${isMobile && !showDetail ? 'hidden' : ''}`}>
        {isMobile && showDetail && (
          <div className="mobile-detail-header">
            <button className="mobile-back-button-detail" onClick={handleBack}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  )
}

export default Layout
