import Toolbar from '../components/Toolbar'
import './Page.css'

function About() {
  const noteDate = new Date(Date.now() - 86400000)
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
        <h1 className="about-title">hi, i'm wilson li</h1>
        <ul className="about-list">
          <li>
            – software engineering student at the university of waterloo
            <img className="inline-image" src="/images/waterloocrest.png" alt="Waterloo crest" />
          </li>
          <li>– i like building personal projects and learning by doing</li>
          <li>– this site is my notebook for ideas, projects, and things in progress</li>
          <li>– grew up just outside of philadelphia</li>
          <li>
            – big philly pride
            <img className="inline-image" src="/images/libertybell.png" alt="Liberty bell" />
          </li>
          <li>
            – huge eagles fan: go birds dh
            <img className="inline-image" src="/images/eagles.png" alt="Eagles logo" />
          </li>
          <li>
            – love watching sports, especially the nfl and nba
            <img className="inline-image" src="/images/nfl.png" alt="NFL logo" />
            <img className="inline-image" src="/images/nba.png" alt="NBA logo" />
          </li>
          <li>
            – loves to play poker
            <img className="inline-image" src="/images/poker.png" alt="Poker" />
          </li>
          <li>
            – outside of school i stay active: soccer + gym
            <img className="inline-image" src="/images/soccer.png" alt="Soccer" />
            <img className="inline-image" src="/images/gym.png" alt="Gym" />
          </li>
          <li>
            – training for my first half marathon this fall
            <img className="inline-image" src="/images/run.png" alt="Running" />
          </li>
          <li>
            – also into music and art
            <img className="inline-image" src="/images/music.png" alt="Music" />
            <img className="inline-image" src="/images/art.png" alt="Art" />
          </li>
        </ul>
      </div>
    </div>
  )
}

export default About
