import { useI18n, usePageTitle } from '../i18n/language'
import { CHURCH } from '../lib/constants'
import { Give } from '../sections/Give'
import './PageHero.css'

export function GivePage() {
  const { m } = useI18n()
  usePageTitle(`${m.give.title} | ${CHURCH.name}`)

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
          <p className="section-label page-hero-label">{m.give.label}</p>
          <h1 className="page-hero-title">{m.give.title}</h1>
        </div>
      </header>
      <Give />
    </>
  )
}
