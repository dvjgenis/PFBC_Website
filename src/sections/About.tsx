import { AFFILIATIONS, CHURCH, MISSION_POINTS, ORDINANCES } from '../lib/constants'
import './About.css'

export function About() {
  return (
    <section className="section" id="about">
      <div className="section-inner">
        <p className="section-label">Who we are</p>
        <h2 className="section-title">About</h2>
        <p className="body-text">{CHURCH.tagline}</p>
        <div className="mission-grid">
          {MISSION_POINTS.map((point, i) => (
            <div key={point.title} className="mission-tile">
              <p className="mission-tile-num">0{i + 1}</p>
              <h3 className="mission-tile-title">{point.title}</h3>
              <p className="mission-tile-text">{point.text}</p>
            </div>
          ))}
        </div>
        <div className="ordinances">
          <h3 className="ordinances-title">Ordinances</h3>
          <ul className="ordinances-list">
            {ORDINANCES.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="ordinances">
          <h3 className="ordinances-title">Affiliations</h3>
          <ul className="ordinances-list">
            {AFFILIATIONS.map((item) => (
              <li key={item.text}>
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer">
                    {item.text}
                  </a>
                ) : (
                  item.text
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
