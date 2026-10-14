import { useCallback, useEffect, useRef, useState, type TouchEvent } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import './ImageCarousel.css'

export type CarouselSlide = {
  src: string
  alt: string
  position?: string
}

type ImageCarouselProps = {
  slides: CarouselSlide[]
  label: string
  interval?: number
}

export function ImageCarousel({ slides, label, interval = 5200 }: ImageCarouselProps) {
  const reducedMotion = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const touchStart = useRef<number | null>(null)
  const count = slides.length

  const go = useCallback(
    (dir: number) => {
      if (count < 2) return
      setIndex((i) => (i + dir + count) % count)
    },
    [count],
  )

  useEffect(() => {
    if (reducedMotion || paused || count < 2) return
    const id = window.setInterval(() => go(1), interval)
    return () => window.clearInterval(id)
  }, [reducedMotion, paused, count, interval, go])

  if (count === 0) return null

  const safeIndex = count === 0 ? 0 : index % count
  const current = slides[safeIndex]

  const onTouchStart = (e: TouchEvent) => {
    touchStart.current = e.changedTouches[0].clientX
    setPaused(true)
  }

  const onTouchEnd = (e: TouchEvent) => {
    const start = touchStart.current
    touchStart.current = null
    setPaused(false)
    if (start == null) return
    const delta = e.changedTouches[0].clientX - start
    if (Math.abs(delta) < 40) return
    go(delta < 0 ? 1 : -1)
  }

  return (
    <div
      className="image-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="image-carousel-viewport">
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            className={`image-carousel-slide ${i === safeIndex ? 'is-active' : ''}`}
            aria-hidden={i !== safeIndex}
          >
            <img
              src={slide.src}
              alt={i === safeIndex ? slide.alt : ''}
              loading={Math.abs(i - safeIndex) <= 1 || i === 0 ? 'eager' : 'lazy'}
              style={{ objectPosition: slide.position ?? 'center 40%' }}
            />
          </div>
        ))}
      </div>

      <p className="visually-hidden" aria-live="polite">
        {current.alt}. Slide {safeIndex + 1} of {count}.
      </p>

      {count > 1 && (
        <>
          <button
            type="button"
            className="image-carousel-arrow is-prev"
            onClick={() => go(-1)}
            aria-label={`Previous ${label} photo`}
            data-cursor="PREV"
          >
            <span aria-hidden="true">‹</span>
          </button>
          <button
            type="button"
            className="image-carousel-arrow is-next"
            onClick={() => go(1)}
            aria-label={`Next ${label} photo`}
            data-cursor="NEXT"
          >
            <span aria-hidden="true">›</span>
          </button>
          <div className="image-carousel-dots" role="group" aria-label={`${label} photos`}>
            {slides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                aria-current={i === safeIndex}
                aria-label={`Show photo ${i + 1} of ${count}`}
                className={`image-carousel-dot ${i === safeIndex ? 'is-active' : ''}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
