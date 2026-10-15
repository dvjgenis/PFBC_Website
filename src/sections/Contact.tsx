import { useRef, useState, type FormEvent } from 'react'
import { CHURCH } from '../lib/constants'
import { fill, useI18n } from '../i18n/language'
import { sendContactMessage } from '../lib/contact'
import { MagneticButton } from '../components/MagneticButton'
import './Contact.css'

export function Contact() {
  const { m } = useI18n()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'activate' | 'mailto' | 'error'>('idle')
  const inFlight = useRef(false)

  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(CHURCH.address)}&output=embed`

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (inFlight.current) return
    if (honeypot) {
      setStatus('sent')
      return
    }
    inFlight.current = true
    setStatus('sending')
    const result = await sendContactMessage(name, email, message)
    if (!result.ok) {
      inFlight.current = false
      setStatus('error')
      return
    }
    setStatus(result.method === 'email' ? 'sent' : result.method)
    if (result.method === 'email' || result.method === 'activate') {
      setName('')
      setEmail('')
      setMessage('')
    }
  }

  return (
    <section className="section" id="contact">
      <div className="section-inner">
        <div className="pastor-intro">
          <div className="pastor-photo">
            <img
              src={CHURCH.pastor.photo}
              alt={CHURCH.pastor.photoAlt}
              style={{ objectPosition: CHURCH.pastor.photoPosition }}
            />
          </div>
          <div className="pastor-copy">
            <p className="section-label">{m.contact.pastorLabel}</p>
            <h2 className="pastor-names">
              {CHURCH.pastor.name}
              <span> &amp; {CHURCH.pastor.spouse}</span>
            </h2>
            <p className="pastor-role">{m.leadership.roles[CHURCH.pastor.title] ?? CHURCH.pastor.title}</p>
            <p className="body-text">{m.leadership.bios[0]}</p>
          </div>
        </div>

        <p className="body-text">
          {m.contact.intro.split('{email}')[0]}
          <a href={`mailto:${CHURCH.email}`}>{CHURCH.email}</a>
          {m.contact.intro.split('{email}')[1]}
        </p>
        <p className="review-nudge">
          {m.contact.reviewBefore}{' '}
          <a href={CHURCH.googleReviewUrl} target="_blank" rel="noopener noreferrer">
            {m.contact.reviewLink}
          </a>
          {' '}{m.contact.reviewAfter}
        </p>

        <div className="contact-grid">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-honey" aria-hidden="true">
              <label htmlFor="contact-company">Company</label>
              <input
                id="contact-company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>
            <div className="contact-field">
              <label htmlFor="contact-name">{m.contact.name}</label>
              <input
                id="contact-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
            </div>
            <div className="contact-field">
              <label htmlFor="contact-email">{m.contact.email}</label>
              <input
                id="contact-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
            <div className="contact-field">
              <label htmlFor="contact-message">{m.contact.message}</label>
              <textarea
                id="contact-message"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            {status === 'sent' && (
              <p className="contact-success">
                {fill(m.contact.sent, { email: CHURCH.email })}
              </p>
            )}
            {status === 'activate' && (
              <p className="contact-success">
                {fill(m.contact.activate, { email: CHURCH.email })}
              </p>
            )}
            {status === 'mailto' && (
              <p className="contact-success">
                {fill(m.contact.mailto, { email: CHURCH.email })}
              </p>
            )}
            {status === 'error' && (
              <p className="contact-success">
                {fill(m.contact.error, { email: CHURCH.email })}
              </p>
            )}
            {status !== 'sent' && status !== 'activate' && (
              <MagneticButton type="submit" dataCursor="SEND" disabled={status === 'sending'}>
                {status === 'sending' ? m.contact.sending : m.contact.send}
              </MagneticButton>
            )}
          </form>

          <div className="contact-info">
            <div className="contact-info-block">
              <h3>{m.contact.address}</h3>
              <p>
                <a href={CHURCH.mapsUrl} target="_blank" rel="noopener noreferrer">
                  {CHURCH.address}
                </a>
              </p>
            </div>
            <div className="contact-info-block">
              <h3>{m.contact.times}</h3>
              {m.times.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
            <div className="contact-info-block">
              <h3>{m.contact.phone}</h3>
              <a href={`tel:+1${CHURCH.phone.replace(/\D/g, '')}`}>{CHURCH.phone}</a>
            </div>
            <div className="contact-info-block">
              <h3>{m.contact.email}</h3>
              <a href={`mailto:${CHURCH.email}`}>{CHURCH.email}</a>
            </div>
            <div className="contact-info-block">
              <h3>{m.contact.facebook}</h3>
              <a href={CHURCH.facebook} target="_blank" rel="noopener noreferrer">
                {CHURCH.facebookLabel}
              </a>
            </div>
            <iframe
              className="contact-map"
              title="Church location map"
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
