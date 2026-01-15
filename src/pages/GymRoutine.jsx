import Toolbar from '../components/Toolbar'
import './Page.css'

function GymRoutine() {
  const noteDate = new Date(Date.now() - 6 * 86400000)
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
        <h1 className="about-title">gym routine</h1>
        <p className="projects-description">i like to stay active and go to the gym, here is the workout split ive used for the last 3 year (p.s. i have kinda been slacking on legs)</p>
        <p className="gym-routine-subdescription">i follow this routine twice a week and go about 5-6 times a week. if its 5 days then its because i only felt like hitting legs once that week</p>
        <div className="gym-routine-content">
          <div className="workout-category">
            <h2 className="workout-category-title">Chest + back:</h2>
            <ul className="about-list">
              <li>– 2x8 barbell bench press</li>
              <li>– 2x8 lat pulldown</li>
              <li>– 2x8 incline dumbell press</li>
              <li>– 2x8 cable rows</li>
              <li>– 2x8 machine chest flies</li>
              <li>– 2x10 machine reverse flies</li>
            </ul>
          </div>
          <div className="workout-category">
            <h2 className="workout-category-title">Arms:</h2>
            <ul className="about-list">
              <li>– 2x8 dumbell shoulder press</li>
              <li>– 2x8 preacher curl</li>
              <li>– 2x8 single arm tricep extensions</li>
              <li>– 2x10 lat raises</li>
              <li>– 2x8 hammer curls</li>
              <li>– 2x8 tricep pushdowns</li>
            </ul>
          </div>
          <div className="workout-category">
            <h2 className="workout-category-title">legs and abs (i really hate this day + all drop sets):</h2>
            <ul className="about-list">
              <li>– 3x6 barbell squat</li>
              <li>– 2x12 calf extensions</li>
              <li>– 2x10 hamstring curls</li>
              <li>– 2x10 quad extensions</li>
              <li>– 2x12 decline abs</li>
              <li>– 2x15 cable crunch</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GymRoutine
