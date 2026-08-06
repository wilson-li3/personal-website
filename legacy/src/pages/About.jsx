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
      <div className="page-content about-page-content">
        <h1 className="about-title">hi, i'm wilson li</h1>
        <p className="about-intro">
          I am a software engineering student at the University of Waterloo who learns best by building. Personal projects are my way of exploring my interests and especially testing ideas; more often than not those ideas
          fail but I never fail to learn from them. Many of these projects grow out of my interest in sports, where I enjoy exploring how mathematical models and statistical reasoning are used to make sense of performance and prediction. What keeps me interested is the process itself, starting with an imperfect
          idea, learning from its failures, and slowly refining it into a coherent and useful fullstack application. That constant learning and cycle of iteration is what keeps me going.
        </p>
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
            – love to play poker
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
        <img className="about-photo" src="/images/wilson-about.png" alt="Wilson Li" />
      </div>
    </div>
  )
}

export default About
