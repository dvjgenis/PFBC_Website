import { useI18n } from '../i18n/language'
import { AFFILIATIONS, MISSION_POINTS, ORDINANCES } from '../lib/constants'
import './About.css'

export function About() {
  const { m } = useI18n()
  return (
    <section className="section" id="about">
      <div className="section-inner">
        <p className="section-label">{m.about.label}</p>
        <h2 className="section-title">{m.about.title}</h2>
        <p className="body-text">{m.about.tagline}</p>
        <div className="mission-grid">
          {MISSION_POINTS.map((point, i) => (
            <div key={point.title} className="mission-tile">
              <p className="mission-tile-num">0{i + 1}</p>
              <h3 className="mission-tile-title">{m.about.missions[i].title}</h3>
              <p className="mission-tile-text">{m.about.missions[i].text}</p>
            </div>
          ))}
        </div>
        <div className="ordinances">
          <h3 className="ordinances-title">{m.about.ordinancesTitle}</h3>
          <ul className="ordinances-list">
            {ORDINANCES.map((item, i) => (
              <li key={item}>{m.about.ordinances[i]}</li>
            ))}
          </ul>
        </div>
        <div className="ordinances">
          <h3 className="ordinances-title">{m.about.affiliationsTitle}</h3>
          <ul className="ordinances-list">
            {AFFILIATIONS.map((item, i) => (
              <li key={item.text}>
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer">
                    {m.about.affiliations[i]}
                  </a>
                ) : (
                  m.about.affiliations[i]
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
