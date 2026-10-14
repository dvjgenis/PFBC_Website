import { useRef, useState, type FormEvent } from 'react'
import { CHURCH, SCHEDULE } from '../lib/constants'
import { sendContactMessage } from '../lib/contact'
import { MagneticButton } from '../components/MagneticButton'
import './Contact.css'

export function Contact() {
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
            <p className="section-label">Our pastor</p>
            <h2 className="pastor-names">
              {CHURCH.pastor.name}
              <span> &amp; {CHURCH.pastor.spouse}</span>
            </h2>
            <p className="pastor-role">{CHURCH.pastor.title}</p>
            <p className="body-text">{CHURCH.pastor.bio}</p>
          </div>
        </div>

        <p className="body-text">
          Have questions or want to learn more? Write us and it goes to{' '}
          <a href={`mailto:${CHURCH.email}`}>{CHURCH.email}</a>.
        </p>
        <p className="review-nudge">
          Visited us on a Sunday?{' '}
          <a href={CHURCH.googleReviewUrl} target="_blank" rel="noopener noreferrer">
            Leave a Google review
          </a>
          {' '}— it helps others discover our church.
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
              <label htmlFor="contact-name">Name</label>
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
              <label htmlFor="contact-email">Email</label>
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
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            {status === 'sent' && (
              <p className="contact-success">
                Thank you. Your message was sent to {CHURCH.email}.
              </p>
            )}
            {status === 'activate' && (
              <p className="contact-success">
                Please open {CHURCH.email} and click the one-time “Activate Form”
                link. After that, messages from this page go straight to that inbox.
              </p>
            )}
            {status === 'mailto' && (
              <p className="contact-success">
                Your email app should open with a note addressed to{' '}
                <a href={`mailto:${CHURCH.email}`}>{CHURCH.email}</a>. If it
                doesn't, write that address directly.
              </p>
            )}
            {status === 'error' && (
              <p className="contact-success">
                We couldn't send that just now. Please email{' '}
                <a href={`mailto:${CHURCH.email}`}>{CHURCH.email}</a>.
              </p>
            )}
            {status !== 'sent' && status !== 'activate' && (
              <MagneticButton type="submit" dataCursor="SEND" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </MagneticButton>
            )}
          </form>

          <div className="contact-info">
            <div className="contact-info-block">
              <h3>Address</h3>
              <p>
                <a href={CHURCH.mapsUrl} target="_blank" rel="noopener noreferrer">
                  {CHURCH.address}
                </a>
              </p>
            </div>
            <div className="contact-info-block">
              <h3>Times</h3>
              {SCHEDULE.map((item) => (
                <p key={`${item.label}-${item.title}`}>
                  {item.label}: {item.title} · {item.time}
                </p>
              ))}
            </div>
            <div className="contact-info-block">
              <h3>Email</h3>
              <a href={`mailto:${CHURCH.email}`}>{CHURCH.email}</a>
            </div>
            <div className="contact-info-block">
              <h3>Facebook</h3>
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
