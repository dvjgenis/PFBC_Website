import { useEffect } from 'react'
import { CHURCH } from '../lib/constants'
import { Give } from '../sections/Give'
import './PageHero.css'

export function GivePage() {
  useEffect(() => {
    document.title = `Ways to Give | ${CHURCH.name}`
    return () => {
      document.title = `${CHURCH.name} | ${CHURCH.locationLabel}`
    }
  }, [])

  return (
    <>
      <header className="page-hero page-hero-give">
        <div className="page-hero-bg">
          <img
            src="/photos/fellowship/844341208_29488163077438639_9015671461636739895_n.jpg"
            alt="The Pillar of Faith church family sharing a meal together"
            data-loader
          />
          <div className="page-hero-overlay" />
        </div>
        <div className="page-hero-content">
          <p className="section-label page-hero-label">Tithes & offerings</p>
          <h1 className="page-hero-title">Ways to Give</h1>
        </div>
      </header>
      <Give />
    </>
  )
}
