import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/language'
import { CHURCH } from '../lib/constants'
import './Give.css'

export function GiveTeaser() {
  const { m } = useI18n()
  return (
    <section className="section" id="give">
      <div className="section-inner give-teaser">
        <p className="section-label">{m.give.label}</p>
        <h2 className="section-title">{m.give.title}</h2>
        <p className="body-text">{m.give.teaser}</p>
        <Link to="/give" className="give-link" data-cursor="GIVE">
          {m.give.how}
        </Link>
      </div>
    </section>
  )
}

export function Give() {
  const { m } = useI18n()
  const [copied, setCopied] = useState(false)

  const copyZelle = async () => {
    try {
      await navigator.clipboard.writeText(CHURCH.zelle)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section className="section">
      <div className="section-inner">
        <p className="body-text">{m.give.intro}</p>
        <div className="give-cards">
          <article className="give-card">
            <p className="give-card-label">{m.give.zelleLabel}</p>
            <h2 className="give-card-title">{m.give.zelleTitle}</h2>
            <p className="give-card-text">{m.give.zelleBody}</p>
            <p className="give-zelle">{CHURCH.zelle}</p>
            <button type="button" className="give-copy" onClick={() => void copyZelle()}>
              {copied ? m.give.copied : m.give.copy}
            </button>
          </article>
          <article className="give-card">
            <p className="give-card-label">{m.give.envelopeLabel}</p>
            <h2 className="give-card-title">{m.give.envelopeTitle}</h2>
            <p className="give-card-text">{m.give.envelopeBody}</p>
          </article>
        </div>
      </div>
    </section>
  )
}
