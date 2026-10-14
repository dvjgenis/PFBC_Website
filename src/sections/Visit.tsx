import { CHURCH, VISIT_SCHEDULE } from '../lib/constants'
import './Visit.css'

const EXPECT = [
  'A warm, family-oriented multicultural congregation',
  'Faithful preaching from the whole counsel of God',
  'Worship, prayer, and fellowship for all ages',
  'Kids and youth are welcome — we love growing together',
]

export function Visit() {
  return (
    <section className="section" id="visit">
      <div className="section-inner">
        <p className="section-label">First time here?</p>
        <h2 className="section-title">I'm New</h2>
        <p className="body-text">
          Whether you are seeking a church home or just visiting, we are thrilled
          to welcome you into our family. Come as you are — we'd love to meet you.
        </p>
        <ul className="visit-expect">
          {EXPECT.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="visit-cards">
          {VISIT_SCHEDULE.map((item) => (
            <div key={`${item.label}-${item.title}`} className="visit-card">
              <p className="visit-card-label">{item.label}</p>
              <h3 className="visit-card-title">{item.title}</h3>
              <p className="visit-card-time">{item.time}</p>
              {'livestream' in item && item.livestream && (
                <p className="visit-card-note">
                  Also livestreamed on{' '}
                  <a href={CHURCH.facebook} target="_blank" rel="noopener noreferrer">
                    Facebook
                  </a>
                </p>
              )}
            </div>
          ))}
        </div>
        <a
          href={CHURCH.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="visit-map-link"
          data-cursor="VISIT"
        >
          Get directions — {CHURCH.address}
        </a>
      </div>
    </section>
  )
}
