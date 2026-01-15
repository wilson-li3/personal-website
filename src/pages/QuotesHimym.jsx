import Toolbar from '../components/Toolbar'
import './Page.css'
import himymImage from '../images/himym.png'

function QuotesHimym() {
  const noteDate = new Date(Date.now() - 4 * 86400000)
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
        <h1 className="about-title">quotes from himym</h1>
        <p className="quotes-description">how i met your mother is one of my favorite shows of all time along side ted lasso and suits. here are some of the quotes that resonated with me</p>
        <img src={himymImage} alt="How I Met Your Mother" className="quotes-image" />
        <div className="quotes-container">
          <ul className="about-list quotes-list">
            <li>
              <div className="quote-text">– "and most importantly, whatever you do in this life, it's not legendary unless your friends are there to see it"</div>
              <div className="quote-thought">your thoughts here</div>
            </li>
            <li>
              <div className="quote-text">– "you will be shocked kids, when you discover how easy it is in life to part ways with people forever. that's why when you find someone you wanna keep around, you do something about it"</div>
              <div className="quote-thought">your thoughts here</div>
            </li>
            <li>
              <div className="quote-text">– "you can ask the universe for all the signs you want but ultimately, we only see what we want to see when we're ready to see it"</div>
              <div className="quote-thought">your thoughts here</div>
            </li>
            <li>
              <div className="quote-text">– "sometimes things have to fall apart to make way for better things"</div>
              <div className="quote-thought">your thoughts here</div>
            </li>
            <li>
              <div className="quote-text">– "kids, you can't cling to the past because no matter how hard you hold on, it's already gone"</div>
              <div className="quote-thought">your thoughts here</div>
            </li>
            <li>
              <div className="quote-text">– "because sometimes even if you know how something's going to end, that doesn't mean you can't enjoy the ride"</div>
              <div className="quote-thought">your thoughts here</div>
            </li>
            <li>
              <div className="quote-text">– "shouldn't we hold out for the person who doesn't just tolerate our little quirks but actually kinda likes them"</div>
              <div className="quote-thought">your thoughts here</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default QuotesHimym
