import './Sidebar.css'

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="sidebar-item no-hover">
          <div className="sidebar-item-icon matcha-square">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <rect width="12" height="12" rx="2" fill="#A8C09A"/>
            </svg>
          </div>
          <span className="sidebar-item-text">Quick Notes</span>
          <span className="sidebar-item-count">1</span>
        </div>
        <div className="sidebar-item no-hover">
          <div className="sidebar-item-icon matcha-square-root">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <rect width="12" height="12" rx="2" fill="#A8C09A"/>
              <path d="M3 9L6 6L9 9" stroke="#1d1d1f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 3V9" stroke="#1d1d1f" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="sidebar-item-text">Math Notes</span>
          <span className="sidebar-item-count">1</span>
        </div>
        <div className="sidebar-item no-hover">
          <div className="sidebar-item-icon coral-circles">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="4" cy="4" r="2.5" fill="#FF8A80"/>
              <circle cx="8" cy="8" r="2.5" fill="#FF8A80" opacity="0.6"/>
            </svg>
          </div>
          <span className="sidebar-item-text">Shared</span>
          <span className="sidebar-item-count">9</span>
        </div>
        <div className="sidebar-divider"></div>
        <div className="sidebar-section-header">iCloud</div>
        <div className="sidebar-item active">
          <div className="sidebar-item-icon folder">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 3h5l1 2h5v7H2V3z" fill="#6B7A66"/>
            </svg>
          </div>
          <span className="sidebar-item-text">Notes</span>
          <span className="sidebar-item-count">113</span>
        </div>
        <div className="sidebar-section-header">Google</div>
        <div className="sidebar-section-header">Tags</div>
        <div className="sidebar-new-folder">
          <button className="new-folder-button">
            <span className="new-folder-icon">+</span>
            <span className="new-folder-text">New Folder</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
