import './NoteList.css'

function NoteList({ notes, selectedNote, onNoteClick }) {
  const formatDate = (date) => {
    const now = new Date()
    const diffTime = now - date
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      const timeStr = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
      return timeStr.toLowerCase().replace(/\s/g, '')
    } else if (diffDays === 1) {
      return 'Yesterday'
    } else if (diffDays < 7) {
      return date.toLocaleDateString('en-US', { weekday: 'long' })
    } else if (diffDays < 30) {
      return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
    } else {
      return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
    }
  }

  const groupNotesByDate = (notes) => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const yesterday = new Date(today.getTime() - 86400000)
    const sevenDaysAgo = new Date(today.getTime() - 7 * 86400000)
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 86400000)

    const groups = {
      today: [],
      yesterday: [],
      week: [],
      month: [],
      older: []
    }

    notes.forEach(note => {
      const noteDate = note.date
      if (noteDate >= today) {
        groups.today.push(note)
      } else if (noteDate >= yesterday) {
        groups.yesterday.push(note)
      } else if (noteDate >= sevenDaysAgo) {
        groups.week.push(note)
      } else if (noteDate >= thirtyDaysAgo) {
        groups.month.push(note)
      } else {
        groups.older.push(note)
      }
    })

    return groups
  }

  const groupedNotes = groupNotesByDate(notes)

  const renderGroup = (title, notesList) => {
    if (notesList.length === 0) return null

    return (
      <div key={title} className="note-group">
        <div className="note-group-header">{title}</div>
        {notesList.map(note => (
          <div
            key={note.id}
            className={`note-item ${selectedNote === note.path ? 'selected' : ''}`}
            onClick={() => onNoteClick(note.path)}
          >
            <div className="note-item-title">{note.title}</div>
            <div className="note-item-preview">
              {formatDate(note.date)} {note.preview}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="note-list">
      <div className="note-list-header">
        <div className="note-list-header-title">Notes</div>
        <div className="note-list-header-count">{notes.length} Notes</div>
      </div>
      <div className="note-list-content">
        {renderGroup('Today', groupedNotes.today)}
        {renderGroup('Yesterday', groupedNotes.yesterday)}
        {renderGroup('Previous 7 Days', groupedNotes.week)}
        {renderGroup('Previous 30 Days', groupedNotes.month)}
        {renderGroup('Older', groupedNotes.older)}
      </div>
    </div>
  )
}

export default NoteList
