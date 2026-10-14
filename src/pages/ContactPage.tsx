import { useEffect } from 'react'
import { CHURCH } from '../lib/constants'
import { Contact } from '../sections/Contact'
import './PageHero.css'

export function ContactPage() {
  useEffect(() => {
    document.title = `Contact | ${CHURCH.name}`
    return () => {
      document.title = `${CHURCH.name} | ${CHURCH.locationLabel}`
    }
  }, [])

  return (
    <>
      <header className="page-hero page-hero-plain">
        <div className="page-hero-content">
          <p className="section-label">Reach out</p>
          <h1 className="page-hero-title page-hero-title-ink">Connect With Us</h1>
        </div>
      </header>
      <Contact />
    </>
  )
}
