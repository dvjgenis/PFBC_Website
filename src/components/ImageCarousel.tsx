import { useCallback, useEffect, useMemo, useRef, useState, type TouchEvent } from 'react'
import { useInView } from '../hooks/useInView'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { subscribeScrolling } from '../lib/scrollActivity'
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

function neighborIndices(current: number, count: number): Set<number> {
  if (count <= 1) return new Set([0])
  const prev = (current - 1 + count) % count
  const next = (current + 1) % count
  return new Set([current, prev, next])
}

export function ImageCarousel({ slides, label, interval = 5200 }: ImageCarouselProps) {
  const reducedMotion = useReducedMotion()
  const { ref: rootRef, inView } = useInView<HTMLDivElement>({
    rootMargin: '160px',
    threshold: 0.01,
    once: false,
  })
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [scrolling, setScrolling] = useState(false)
  const touchStart = useRef<number | null>(null)
  const count = slides.length

  useEffect(() => subscribeScrolling(setScrolling), [])

  const go = useCallback(
    (dir: number) => {
      if (count < 2) return
      setIndex((i) => (i + dir + count) % count)
    },
    [count],
  )

  useEffect(() => {
    if (reducedMotion || paused || scrolling || count < 2 || !inView) return
    const id = window.setInterval(() => go(1), interval)
    return () => window.clearInterval(id)
  }, [reducedMotion, paused, scrolling, count, interval, go, inView])

  const safeIndex = count === 0 ? 0 : index % count
  const current = slides[safeIndex]
  const mountedSlides = useMemo(() => {
    if (!inView) return new Set<number>()
    if (scrolling) return new Set([safeIndex])
    return neighborIndices(safeIndex, count)
  }, [inView, scrolling, safeIndex, count])

  if (count === 0) return null

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
      ref={rootRef}
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
            {mountedSlides.has(i) && (
              <img
                src={slide.src}
                alt={i === safeIndex ? slide.alt : ''}
                loading="lazy"
                decoding="async"
                fetchPriority={i === safeIndex && inView ? 'auto' : 'low'}
                style={{ objectPosition: slide.position ?? 'center 40%' }}
              />
            )}
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
