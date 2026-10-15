import { useI18n, usePageTitle } from '../i18n/language'
import { CHURCH } from '../lib/constants'
import { Leadership } from '../sections/Leadership'
import './PageHero.css'

export function LeadershipPage() {
  const { m } = useI18n()
  usePageTitle(`${m.leadership.title} | ${CHURCH.name}`)

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
          <p className="section-label page-hero-label">{m.leadership.heroLabel}</p>
          <h1 className="page-hero-title">{m.leadership.title}</h1>
        </div>
      </header>
      <Leadership />
    </>
  )
}
