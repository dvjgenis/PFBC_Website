import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CHURCH, NAV_LINKS } from '../lib/constants'
import { getLenis, scrollTo, scrollToHash } from '../lib/lenis'
import './Nav.css'

export function Nav() {
  const [open, setOpen] = useState(false)
  const [time, setTime] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const update = () => {
      setTime(
        new Intl.DateTimeFormat('en-US', {
          timeZone: CHURCH.timezone,
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }).format(new Date()),
      )
    }
    update()
    const id = setInterval(update, 60000)
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
          {CHURCH.shortName}
        </button>
        <div className="nav-meta">
          <span className="nav-clock">{CHURCH.city} {time}</span>
          <button
            type="button"
            className="nav-menu-btn"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="nav-overlay"
          >
            Menu
          </button>
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
        <button type="button" className="nav-overlay-close" onClick={() => setOpen(false)}>
          Close
        </button>
        <ul className="nav-links">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={'hash' in link && link.hash ? `${link.to}${link.hash}` : link.to}
                onClick={(e) => {
                  e.preventDefault()
                  handleNav(link.to, 'hash' in link ? link.hash : undefined)
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
