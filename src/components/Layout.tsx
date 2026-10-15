import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useI18n } from '../i18n/language'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { destroyLenis, getLenis, initLenis, scrollToHash } from '../lib/lenis'
import { bindScrollActivity } from '../lib/scrollActivity'
import { Loader } from './Loader'
import { Cursor } from './Cursor'
import { GridOverlay } from './GridOverlay'
import { Nav } from './Nav'
import { Footer } from '../sections/Footer'

export function Layout() {
  const reducedMotion = useReducedMotion()
  const { m } = useI18n()
  const location = useLocation()

  useEffect(() => {
    bindScrollActivity()
    initLenis(reducedMotion)
    return () => destroyLenis()
  }, [reducedMotion])

  useEffect(() => {
    const lenis = getLenis()
    if (location.hash) {
      const hash = location.hash
      const run = () => scrollToHash(hash)
      const raf = requestAnimationFrame(run)
      const later = window.setTimeout(run, 350)
      window.addEventListener('loaderComplete', run)
      return () => {
        cancelAnimationFrame(raf)
        window.clearTimeout(later)
        window.removeEventListener('loaderComplete', run)
      }
    }

    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [location.pathname, location.hash])

  const skipHref = location.pathname === '/' ? '#visit' : '#main'

  return (
    <>
      <a href={skipHref} className="skip-link">
        {m.nav.skip}
      </a>
      <Loader />
      <Cursor />
      <GridOverlay />
      <Nav />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
