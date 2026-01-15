import Toolbar from '../components/Toolbar'
import './Page.css'
import waterlooCrest from '../images/waterloocrest.png'
import libertyBell from '../images/libertybell.png'
import eaglesLogo from '../images/eagles.png'
import nflLogo from '../images/nfl.png'
import nbaLogo from '../images/nba.png'
import soccer from '../images/soccer.png'
import gym from '../images/gym.png'
import run from '../images/run.png'
import music from '../images/music.png'
import art from '../images/art.png'
import poker from '../images/poker.png'

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
            <img className="inline-image" src={waterlooCrest} alt="Waterloo crest" />
          </li>
          <li>– i like building personal projects and learning by doing</li>
          <li>– this site is my notebook for ideas, projects, and things in progress</li>
          <li>– grew up just outside of philadelphia</li>
          <li>
            – big philly pride
            <img className="inline-image" src={libertyBell} alt="Liberty bell" />
          </li>
          <li>
            – huge eagles fan: go birds dh
            <img className="inline-image" src={eaglesLogo} alt="Eagles logo" />
          </li>
          <li>
            – love watching sports, especially the nfl and nba
            <img className="inline-image" src={nflLogo} alt="NFL logo" />
            <img className="inline-image" src={nbaLogo} alt="NBA logo" />
          </li>
          <li>
            – loves to play poker
            <img className="inline-image" src={poker} alt="Poker" />
          </li>
          <li>
            – outside of school i stay active: soccer + gym
            <img className="inline-image" src={soccer} alt="Soccer" />
            <img className="inline-image" src={gym} alt="Gym" />
          </li>
          <li>
            – training for my first half marathon this fall
            <img className="inline-image" src={run} alt="Running" />
          </li>
          <li>
            – also into music and art
            <img className="inline-image" src={music} alt="Music" />
            <img className="inline-image" src={art} alt="Art" />
          </li>
        </ul>
      </div>
    </div>
  )
}

export default About
