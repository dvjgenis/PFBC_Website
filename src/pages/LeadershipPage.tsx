import { useEffect } from 'react'
import { CHURCH } from '../lib/constants'
import { Leadership } from '../sections/Leadership'
import './PageHero.css'

export function LeadershipPage() {
  useEffect(() => {
    document.title = `Leadership | ${CHURCH.name}`
    return () => {
      document.title = `${CHURCH.name} | ${CHURCH.locationLabel}`
    }
  }, [])

  return (
    <>
      <header className="page-hero page-hero-leadership">
        <div className="page-hero-bg">
          <img
            src="/photos/DSC05052.jpeg"
            alt="The Pillar of Faith Baptist Church family gathered together"
            data-loader
          />
          <div className="page-hero-overlay" />
        </div>
        <div className="page-hero-content">
          <p className="section-label page-hero-label">Our shepherds</p>
          <h1 className="page-hero-title">Leadership</h1>
        </div>
      </header>
      <Leadership />
    </>
  )
}
