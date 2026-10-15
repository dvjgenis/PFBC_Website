import { useI18n } from '../i18n/language'
import { CHURCH, VISIT_SCHEDULE } from '../lib/constants'
import './Visit.css'

export function Visit() {
  const { m } = useI18n()

  return (
    <section className="section" id="visit">
      <div className="section-inner">
        <p className="section-label">{m.visit.label}</p>
        <h2 className="section-title">{m.visit.title}</h2>
        <p className="body-text">{m.visit.body}</p>
        <p className="visit-fact">{m.visit.fact}</p>
        <ul className="visit-expect">
          {m.visit.expect.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="visit-cards">
          {VISIT_SCHEDULE.map((item, index) => {
            const copy = m.visit.cards[index]
            return (
            <div key={`${item.label}-${item.title}`} className="visit-card">
              <p className="visit-card-label">{copy.label}</p>
              <h3 className="visit-card-title">{copy.title}</h3>
              <p className="visit-card-time">{copy.time}</p>
              {'livestream' in item && item.livestream && (
                <p className="visit-card-note">
                  {m.visit.live}{' '}
                  <a href={CHURCH.facebook} target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
                </p>
              )}
            </div>
            )
          })}
        </div>
        <a
          href={CHURCH.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="visit-map-link"
          data-cursor="VISIT"
        >
          {m.visit.directions} — {CHURCH.address}
        </a>
      </div>
    </section>
  )
}
