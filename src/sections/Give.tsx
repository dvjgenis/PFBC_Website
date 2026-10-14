import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CHURCH } from '../lib/constants'
import './Give.css'

export function GiveTeaser() {
  return (
    <section className="section" id="give">
      <div className="section-inner give-teaser">
        <p className="section-label">Tithes & offerings</p>
        <h2 className="section-title">Ways to Give</h2>
        <p className="body-text">
          You can give a tithe or offering by Zelle, or with a church offering
          envelope on Sunday.
        </p>
        <Link to="/give" className="give-link" data-cursor="GIVE">
          How to give
        </Link>
      </div>
    </section>
  )
}

export function Give() {
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
        <p className="body-text">
          Your giving supports the worship, missions, and ministry of {CHURCH.name}.
          Tithes and offerings can be sent by Zelle or brought in a church offering
          envelope.
        </p>
        <div className="give-cards">
          <article className="give-card">
            <p className="give-card-label">Zelle</p>
            <h2 className="give-card-title">Send a gift</h2>
            <p className="give-card-text">
              In Zelle, send your tithe or offering to the address below. Add a
              short note such as “Tithe” or “Offering.” This is the church’s Zelle
              address, separate from the office email.
            </p>
            <p className="give-zelle">{CHURCH.zelle}</p>
            <button type="button" className="give-copy" onClick={() => void copyZelle()}>
              {copied ? 'Copied' : 'Copy address'}
            </button>
          </article>
          <article className="give-card">
            <p className="give-card-label">In person</p>
            <h2 className="give-card-title">Offering envelope</h2>
            <p className="give-card-text">
              Place your tithe or offering in a church offering envelope and give
              it during the Sunday service.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
