import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useI18n } from '../i18n/language'
import { LANGUAGES, type LangId } from '../i18n/types'
import { CHURCH, NAV_LINKS } from '../lib/constants'
import { isGatheringOpen } from '../lib/gatheringHours'
import { getLenis, scrollTo, scrollToHash } from '../lib/lenis'
import './Nav.css'

export function Nav() {
  const [open, setOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const [time, setTime] = useState('')
  const [gatheringOpen, setGatheringOpen] = useState(() => isGatheringOpen())
  const navigate = useNavigate()
  const location = useLocation()
  const { lang, setLang, m } = useI18n()
  const navLabels = [m.nav.imNew, m.nav.faith, m.nav.leadership, m.nav.word, m.nav.prayer, m.nav.contact, m.nav.give]

  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(
        new Intl.DateTimeFormat('en-US', {
          timeZone: CHURCH.timezone,
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }).format(now),
      )
      setGatheringOpen(isGatheringOpen(now))
    }
    update()
    const id = setInterval(update, 30000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const lenis = getLenis()
    if (open) {
      document.body.style.overflow = 'hidden'
      lenis?.stop()
    } else {
      document.body.style.overflow = ''
      lenis?.start()
      lenis?.resize()
    }
    return () => {
      document.body.style.overflow = ''
      lenis?.start()
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    closeButtonRef.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      menuButtonRef.current?.focus()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const goHome = () => {
    setOpen(false)
    if (location.pathname === '/') {
      scrollTo(0)
    } else {
      navigate('/')
    }
  }

  const handleNav = (to: string, hash?: string) => {
    setOpen(false)
    if (!hash) {
      navigate(to)
      return
    }

    if (location.pathname !== to) {
      navigate(`${to}${hash}`)
      return
    }

    if (location.hash !== hash) {
      navigate(`${to}${hash}`)
    }

    // Wait until the overlay unlocks the page so Lenis has the full scroll height.
    window.setTimeout(() => scrollToHash(hash), 120)
  }

  return (
    <>
      <nav
        className={`nav ${location.pathname === '/contact' ? 'is-light' : 'is-dark'}`}
        aria-label="Main navigation"
      >
        <button type="button" className="nav-wordmark" onClick={goHome}>
          {CHURCH.navWordmark}
        </button>
        <div className="nav-meta">
          <span className="nav-clock" title={gatheringOpen ? m.hours.open : m.hours.closed}>
            <span
              className={`nav-open-dot${gatheringOpen ? ' is-open' : ''}`}
              aria-hidden
            />
            {CHURCH.city} {time}
            <span className="nav-open-label" aria-live="polite">
              {gatheringOpen ? m.nav.open : m.nav.closed}
            </span>
          </span>
          <button
            ref={menuButtonRef}
            type="button"
            className="nav-menu-btn"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="nav-overlay"
          >
            {m.nav.menu}
          </button>
          <label className="nav-lang">
            <span className="sr-only">{m.nav.language}</span>
            <select
              value={lang}
              aria-label={m.nav.language}
              onChange={(event) => setLang(event.target.value as LangId)}
            >
              {LANGUAGES.map((language) => (
                <option key={language.id} value={language.id}>
                  {language.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </nav>

      <div
        id="nav-overlay"
        className={`nav-overlay ${open ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        hidden={!open}
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="nav-overlay-close"
          onClick={() => {
            setOpen(false)
            menuButtonRef.current?.focus()
          }}
        >
          {m.nav.close}
        </button>
        <ul className="nav-links">
          {NAV_LINKS.map((link, index) => (
            <li key={link.label}>
              <a
                href={'hash' in link && link.hash ? `${link.to}${link.hash}` : link.to}
                onClick={(e) => {
                  e.preventDefault()
                  handleNav(link.to, 'hash' in link ? link.hash : undefined)
                }}
              >
                {navLabels[index]}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
