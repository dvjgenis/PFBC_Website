import { Link } from 'react-router-dom'
import { CHURCH, SCHEDULE } from '../lib/constants'
import './Footer.css'

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <p className="footer-wordmark">{CHURCH.shortName}</p>
            <p className="footer-tagline">
              An independent, Bible-believing Baptist church in Naperville, in
              fellowship with the General Association of Regular Baptist Churches.
            </p>
          </div>
          <div className="footer-col">
            <h3>Visit</h3>
            <p>
              <a href={CHURCH.mapsUrl} target="_blank" rel="noopener noreferrer">
                {CHURCH.address}
              </a>
            </p>
            {SCHEDULE.map((item) => (
              <p key={`${item.label}-${item.title}`}>
                {item.label}: {item.title} · {item.time}
              </p>
            ))}
          </div>
          <div className="footer-col">
            <h3>Contact</h3>
            <p>
              <a href={`mailto:${CHURCH.email}`}>{CHURCH.email}</a>
            </p>
            <p>
              <a href={CHURCH.facebook} target="_blank" rel="noopener noreferrer">
                {CHURCH.facebookLabel}
              </a>
            </p>
            <p>
              <Link to="/contact">Write to us</Link>
            </p>
            <p>
              <Link to="/leadership">Leadership</Link>
            </p>
            <p>
              <Link to="/faith">Statement of Faith</Link>
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {CHURCH.name}. All rights reserved.</span>
          <span>{CHURCH.locationLabel}</span>
        </div>
      </div>
    </footer>
  )
}
