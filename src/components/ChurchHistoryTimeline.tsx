import { useCallback, useEffect, useRef, useState } from 'react'
import { useI18n } from '../i18n/language'
import { CHURCH_HISTORY_MILESTONES } from '../lib/history'
import { TextWithFabcLinks } from './TextWithFabcLinks'
import { useReducedMotion } from '../hooks/useReducedMotion'
import './ChurchHistoryTimeline.css'

const DRAG_THRESHOLD = 4

export function ChurchHistoryTimeline() {
  const { m } = useI18n()
  const reducedMotion = useReducedMotion()
  const viewportRef = useRef<HTMLDivElement>(null)
  const dragState = useRef({ active: false, moved: false, startX: 0, scrollLeft: 0, pointerId: -1 })
  const [dragging, setDragging] = useState(false)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateScrollHints = useCallback(() => {
    const viewport = viewportRef.current
    if (!viewport) return
    const maxScroll = viewport.scrollWidth - viewport.clientWidth
    setCanScrollLeft(viewport.scrollLeft > 8)
    setCanScrollRight(viewport.scrollLeft < maxScroll - 8)
  }, [])

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return

    updateScrollHints()
    viewport.addEventListener('scroll', updateScrollHints, { passive: true })
    window.addEventListener('resize', updateScrollHints)

    return () => {
      viewport.removeEventListener('scroll', updateScrollHints)
      window.removeEventListener('resize', updateScrollHints)
    }
  }, [updateScrollHints])

  const endDrag = useCallback((pointerId?: number) => {
    const viewport = viewportRef.current
    const state = dragState.current
    if (!state.active) return

    state.active = false
    state.moved = false
    setDragging(false)

    if (viewport && pointerId != null && viewport.hasPointerCapture(pointerId)) {
      viewport.releasePointerCapture(pointerId)
    }
  }, [])

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return
    const viewport = viewportRef.current
    if (!viewport) return

    dragState.current = {
      active: true,
      moved: false,
      startX: event.clientX,
      scrollLeft: viewport.scrollLeft,
      pointerId: event.pointerId,
    }
    viewport.setPointerCapture(event.pointerId)
  }

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current
    const state = dragState.current
    if (!state.active || !viewport) return

    const delta = event.clientX - state.startX
    if (!state.moved && Math.abs(delta) < DRAG_THRESHOLD) return

    state.moved = true
    setDragging(true)
    viewport.scrollLeft = state.scrollLeft - delta
    updateScrollHints()
  }

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    endDrag(event.pointerId)
  }

  const onPointerCancel = (event: React.PointerEvent<HTMLDivElement>) => {
    endDrag(event.pointerId)
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current
    if (!viewport) return

    if (event.key === 'ArrowRight') {
      event.preventDefault()
      viewport.scrollBy({ left: 280, behavior: reducedMotion ? 'auto' : 'smooth' })
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      viewport.scrollBy({ left: -280, behavior: reducedMotion ? 'auto' : 'smooth' })
    }
  }

  const onWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current
    if (!viewport) return

    const horizontal = Math.abs(event.deltaX) > Math.abs(event.deltaY)
    if (!horizontal && !event.shiftKey) return

    event.preventDefault()
    viewport.scrollLeft += horizontal ? event.deltaX : event.deltaY
    updateScrollHints()
  }

  return (
    <div className="history-timeline">
      <div className="history-timeline-head">
        <p className="section-label">{m.history.label}</p>
        <h3 className="history-timeline-title">{m.history.title}</h3>
        <p className="body-text history-timeline-intro">
          <TextWithFabcLinks text={m.history.intro} />
        </p>
        <p className="history-timeline-hint" aria-hidden="true">
          {m.history.hint}
          <span className={`history-timeline-hint-arrow ${canScrollRight ? 'is-visible' : ''}`}>→</span>
        </p>
      </div>

      <div
        className={`history-timeline-shell ${dragging ? 'is-dragging' : ''} ${canScrollLeft ? 'can-scroll-left' : ''} ${canScrollRight ? 'can-scroll-right' : ''}`}
      >
        <div
          ref={viewportRef}
          className="history-timeline-viewport"
          data-lenis-prevent
          role="region"
          aria-label={m.history.region}
          tabIndex={0}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
          onKeyDown={onKeyDown}
          onWheel={onWheel}
        >
          <ol className="history-timeline-track">
            {CHURCH_HISTORY_MILESTONES.map((milestone, index) => (
              <li
                key={`${milestone.date}-${milestone.text}`}
                className={`history-milestone ${index % 2 === 0 ? 'is-above' : 'is-below'} ${milestone.year >= 2026 ? 'is-recent' : ''}`}
              >
                <article className="history-milestone-card">
                  <time className="history-milestone-date" dateTime={String(milestone.year)}>
                    {milestone.date}
                  </time>
                  <p className="history-milestone-text">
                    <TextWithFabcLinks text={milestone.text} />
                  </p>
                </article>
                <span className="history-milestone-node" aria-hidden="true" />
                <span className="history-milestone-year" aria-hidden="true">
                  {milestone.year}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}
