import { useEffect } from 'react'
import { CHURCH } from '../lib/constants'
import { Faith } from '../sections/Faith'
import './PageHero.css'

export function FaithPage() {
  useEffect(() => {
    document.title = `Statement of Faith | ${CHURCH.name}`
    return () => {
      document.title = `${CHURCH.name} | ${CHURCH.locationLabel}`
    }
  }, [])

  return (
    <>
      <header className="page-hero">
        <div className="page-hero-bg">
          <img
            src="/photos/church-exterior.png"
            alt="Pillar of Faith Baptist Church building exterior with steeple"
            data-loader
          />
          <div className="page-hero-overlay" />
        </div>
        <div className="page-hero-content">
          <p className="section-label page-hero-label">What we believe</p>
          <h1 className="page-hero-title">Statement of Faith</h1>
        </div>
      </header>
      <Faith hideIntro />
    </>
  )
}
