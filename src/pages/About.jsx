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
            <img className="inline-image" src="INSERT_WATERLOO_CREST_IMAGE_PATH_HERE" alt="Waterloo crest" />
          </li>
          <li>– i like building personal projects and learning by doing</li>
          <li>– this site is my notebook for ideas, projects, and things in progress</li>
          <li>– grew up just outside of philadelphia</li>
          <li>
            – big philly pride
            <img className="inline-image" src="INSERT_LIBERTY_BELL_IMAGE_PATH_HERE" alt="Liberty bell" />
          </li>
          <li>
            – huge eagles fan: go birds dh
            <img className="inline-image" src="INSERT_EAGLES_LOGO_IMAGE_PATH_HERE" alt="Eagles logo" />
          </li>
          <li>
            – love watching sports, especially the nfl and nba
            <img className="inline-image" src="INSERT_NFL_LOGO_IMAGE_PATH_HERE" alt="NFL logo" />
            <img className="inline-image" src="INSERT_NBA_LOGO_IMAGE_PATH_HERE" alt="NBA logo" />
          </li>
          <li>
            – outside of school i stay active: soccer + gym
            <img className="inline-image" src="INSERT_SOCCER_IMAGE_PATH_HERE" alt="Soccer" />
            <img className="inline-image" src="INSERT_GYM_IMAGE_PATH_HERE" alt="Gym" />
          </li>
          <li>
            – training for my first half marathon this fall
            <img className="inline-image" src="INSERT_WEIGHTS_IMAGE_PATH_HERE" alt="Weights" />
          </li>
          <li>
            – also into music and art
            <img className="inline-image" src="INSERT_MUSIC_IMAGE_PATH_HERE" alt="Music" />
            <img className="inline-image" src="INSERT_ART_IMAGE_PATH_HERE" alt="Art" />
          </li>
        </ul>
      </div>
    </div>
  )
}

export default About
