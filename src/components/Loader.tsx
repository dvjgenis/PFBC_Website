import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/lenis'
import { useLoaderComplete } from '../hooks/useLoaderComplete'
import { useReducedMotion } from '../hooks/useReducedMotion'
import './Loader.css'

const ROW_COUNT_DESKTOP = 8
const ROW_COUNT_MOBILE = 4

export function Loader() {
  const reducedMotion = useReducedMotion()
  const { setComplete } = useLoaderComplete()
  const [count, setCount] = useState(0)
  const [hidden, setHidden] = useState(false)
  const rowRefs = useRef<HTMLDivElement[]>([])
  const counterRef = useRef<HTMLDivElement>(null)
  const doneRef = useRef(false)

  const rowCount =
    typeof window !== 'undefined' && window.innerWidth <= 768
      ? ROW_COUNT_MOBILE
      : ROW_COUNT_DESKTOP

  useEffect(() => {
    if (reducedMotion) {
      const t = setTimeout(() => {
        setHidden(true)
        setComplete()
        window.dispatchEvent(new CustomEvent('loaderComplete'))
      }, 400)
      return () => clearTimeout(t)
    }

    let loaded = 0
    const images = document.querySelectorAll('img[data-loader]')
    const total = Math.max(images.length, 1)

    const tick = () => {
      loaded += 1
      const pct = Math.min(Math.round((loaded / total) * 100), 100)
      setCount(pct)
      if (pct >= 100 && !doneRef.current) finishLoader()
    }

    if (images.length === 0) {
      let progress = 0
      const interval = setInterval(() => {
        progress += 8
        setCount(Math.min(progress, 100))
        if (progress >= 100) {
          clearInterval(interval)
          finishLoader()
        }
      }, 60)
      return () => clearInterval(interval)
    }

    images.forEach((img) => {
      if ((img as HTMLImageElement).complete) tick()
      else {
        img.addEventListener('load', tick)
        img.addEventListener('error', tick)
      }
    })

    const fallback = setTimeout(() => {
      if (!doneRef.current) finishLoader()
    }, 8000)

    function finishLoader() {
      if (doneRef.current) return
      doneRef.current = true
      setCount(100)

      const tl = gsap.timeline({
        onComplete: () => {
          setHidden(true)
          setComplete()
          window.dispatchEvent(new CustomEvent('loaderComplete'))
        },
      })

      if (counterRef.current) {
        tl.to({}, { duration: 0.25 })
        tl.to(counterRef.current, { opacity: 0, duration: 0.45, ease: 'power2.in' })
      }

      tl.to(
        rowRefs.current,
        {
          scaleX: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: 'power4.inOut',
        },
        '-=0.2',
      )
    }

    return () => clearTimeout(fallback)
  }, [reducedMotion, setComplete])

  if (reducedMotion) {
    return (
      <div className={`loader-reduced ${hidden ? 'done' : ''}`} aria-hidden="true">
        <span className="loader-reduced-text">Loading</span>
      </div>
    )
  }

  return (
    <div className={`loader ${hidden ? 'done' : ''}`} aria-hidden="true">
      <div className="loader-rows">
        {Array.from({ length: rowCount }).map((_, i) => (
          <div
            key={i}
            className={`loader-row ${i % 2 === 0 ? 'from-right' : 'from-left'}`}
            ref={(el) => {
              if (el) rowRefs.current[i] = el
            }}
          />
        ))}
      </div>
      <div className="loader-counter" ref={counterRef}>
        {count}
      </div>
    </div>
  )
}
