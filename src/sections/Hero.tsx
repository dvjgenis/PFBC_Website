import { useEffect, useState } from 'react'
import { CHURCH } from '../lib/constants'
import { scrollTo } from '../lib/lenis'
import { MagneticButton } from '../components/MagneticButton'
import { useLoaderComplete } from '../hooks/useLoaderComplete'
import './Hero.css'

export function Hero() {
  const { complete } = useLoaderComplete()
  const [loaded, setLoaded] = useState(complete)

  useEffect(() => {
    if (complete) {
      setLoaded(true)
      return
    }
    const handler = () => setLoaded(true)
    window.addEventListener('loaderComplete', handler)
    return () => window.removeEventListener('loaderComplete', handler)
  }, [complete])

  return (
    <section className={`hero ${loaded ? 'loaded' : ''}`} id="hero" aria-label="Welcome">
      <div className="hero-bg">
        <img
          src="/photos/sunday-gathering/842970337_29488165190771761_4257027920477132162_n.jpg"
          alt="PFBC congregation at the 23rd anniversary — shining the light of Christ for generations"
          data-loader
        />
        <div className="hero-overlay" />
      </div>
      <div className="hero-content">
        <p className="hero-meta">
          {CHURCH.heroMeta}
        </p>
        <div className="hero-line-wrap">
          <h1 className="hero-title">
            <span className="hero-line">Welcome</span>
          </h1>
        </div>
        <div className="hero-line-wrap">
          <p className="hero-subtitle hero-line">{CHURCH.name}</p>
        </div>
        <div className="hero-cta">
          <MagneticButton
            onClick={() => scrollTo('#visit')}
            dataCursor="VISIT"
          >
            Plan your visit
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
