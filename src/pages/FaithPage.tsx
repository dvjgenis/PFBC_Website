import { useI18n, usePageTitle } from '../i18n/language'
import { CHURCH } from '../lib/constants'
import { Faith } from '../sections/Faith'
import './PageHero.css'

export function FaithPage() {
  const { m } = useI18n()
  usePageTitle(`${m.faith.title} | ${CHURCH.name}`)

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
          <p className="section-label page-hero-label">{m.faith.label}</p>
          <h1 className="page-hero-title">{m.faith.title}</h1>
        </div>
      </header>
      <Faith hideIntro />
    </>
  )
}
