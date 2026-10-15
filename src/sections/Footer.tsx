import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/language'
import { CHURCH } from '../lib/constants'
import './Footer.css'

export function Footer() {
  const { m } = useI18n()
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <p className="footer-wordmark">{CHURCH.shortName}</p>
            <p className="footer-tagline">
              {m.footer.tagline}
            </p>
          </div>
          <div className="footer-col">
            <h3>{m.footer.visit}</h3>
            <p>
              <a href={CHURCH.mapsUrl} target="_blank" rel="noopener noreferrer">
                {CHURCH.address}
              </a>
            </p>
            {m.times.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
          <div className="footer-col">
            <h3>{m.footer.contact}</h3>
            <p>
              <a href={`tel:+1${CHURCH.phone.replace(/\D/g, '')}`}>{CHURCH.phone}</a>
            </p>
            <p>
              <a href={`mailto:${CHURCH.email}`}>{CHURCH.email}</a>
            </p>
            <p>
              <a href={CHURCH.facebook} target="_blank" rel="noopener noreferrer">
                {CHURCH.facebookLabel}
              </a>
            </p>
            <p>
              <Link to="/contact">{m.footer.write}</Link>
            </p>
            <p>
              <Link to="/leadership">{m.footer.leadership}</Link>
            </p>
            <p>
              <Link to="/faith">{m.footer.faith}</Link>
            </p>
            <p>
              <Link to="/give">{m.footer.give}</Link>
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {CHURCH.name}. {m.footer.rights}</span>
          <p className="review-nudge footer-review-nudge">
            <a href={CHURCH.googleReviewUrl} target="_blank" rel="noopener noreferrer">
              {m.footer.review}
            </a>
          </p>
          <span>{CHURCH.locationLabel}</span>
        </div>
      </div>
    </footer>
  )
}
