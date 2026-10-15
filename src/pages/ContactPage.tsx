import { useI18n, usePageTitle } from '../i18n/language'
import { CHURCH } from '../lib/constants'
import { Contact } from '../sections/Contact'
import './PageHero.css'

export function ContactPage() {
  const { m } = useI18n()
  usePageTitle(`${m.nav.contact} | ${CHURCH.name}`)

  return (
    <>
      <header className="page-hero page-hero-plain">
        <div className="page-hero-content">
          <p className="section-label">{m.contact.heroLabel}</p>
          <h1 className="page-hero-title page-hero-title-ink">{m.contact.heroTitle}</h1>
        </div>
      </header>
      <Contact />
    </>
  )
}
