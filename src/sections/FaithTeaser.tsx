import { Link } from 'react-router-dom'
import './FaithTeaser.css'

export function FaithTeaser() {
  return (
    <section className="section" id="believe">
      <div className="section-inner faith-teaser">
        <p className="section-label">What we believe</p>
        <h2 className="section-title">Statement of Faith</h2>
        <p className="body-text">
          We are a truly and completely Bible-believing church, committed to
          preach the whole counsel of God.
        </p>
        <Link to="/faith" className="faith-teaser-link" data-cursor="READ">
          Read the statement
        </Link>
      </div>
    </section>
  )
}
