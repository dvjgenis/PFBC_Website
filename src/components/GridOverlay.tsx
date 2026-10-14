import { useEffect, useRef } from 'react'
import { gsap } from '../lib/lenis'
import { useReducedMotion } from '../hooks/useReducedMotion'
import './GridOverlay.css'

const LINE_COUNT = 9

export function GridOverlay() {
  const reducedMotion = useReducedMotion()
  const lineRefs = useRef<HTMLDivElement[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = () => {
      if (reducedMotion) {
        containerRef.current?.classList.add('visible')
        lineRefs.current.forEach((line) => {
          if (line) line.style.transform = 'scaleY(1)'
        })
        return
      }

      gsap.to(lineRefs.current, {
        scaleY: 1,
        duration: 1,
        stagger: 0.08,
        ease: 'power3.inOut',
        delay: 0.3,
      })
      containerRef.current?.classList.add('visible')
    }

    window.addEventListener('loaderComplete', handler)
    return () => window.removeEventListener('loaderComplete', handler)
  }, [reducedMotion])

  return (
    <div className="grid-background" ref={containerRef} aria-hidden="true">
      {Array.from({ length: LINE_COUNT }).map((_, i) => (
        <div
          key={i}
          className="grid-line"
          ref={(el) => {
            if (el) lineRefs.current[i] = el
          }}
        />
      ))}
    </div>
  )
}
