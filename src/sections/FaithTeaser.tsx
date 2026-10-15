import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/language'
import './FaithTeaser.css'

export function FaithTeaser() {
  const { m } = useI18n()
  return (
    <section className="section" id="believe">
      <div className="section-inner faith-teaser">
        <p className="section-label">{m.faith.label}</p>
        <h2 className="section-title">{m.faith.title}</h2>
        <p className="body-text">{m.faith.lead}</p>
        <Link to="/faith" className="faith-teaser-link" data-cursor="READ">
          {m.faith.read}
        </Link>
      </div>
    </section>
  )
}
