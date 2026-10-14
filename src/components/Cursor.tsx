import { useEffect, useRef } from 'react'
import './Cursor.css'

export function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const pending = useRef<{ x: number; y: number } | null>(null)
  const rafId = useRef(0)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine || !cursorRef.current) return

    const cursor = cursorRef.current
    cursor.classList.add('is-ready')

    const flush = () => {
      rafId.current = 0
      const point = pending.current
      if (!point || !cursorRef.current) return
      cursorRef.current.style.transform = `translate3d(${point.x}px, ${point.y}px, 0) translate(-50%, -50%)`
    }

    const onMove = (e: MouseEvent) => {
      pending.current = { x: e.clientX, y: e.clientY }
      if (!rafId.current) rafId.current = requestAnimationFrame(flush)
    }

    const setHover = (label: string | null) => {
      if (label) {
        cursor.classList.add('hover')
        if (labelRef.current) labelRef.current.textContent = label
      } else {
        cursor.classList.remove('hover')
        if (labelRef.current) labelRef.current.textContent = ''
      }
    }

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest('[data-cursor]') as HTMLElement | null
      setHover(el?.dataset.cursor ?? null)
    }

    const onOut = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement | null
      if (!related?.closest('[data-cursor]')) setHover(null)
    }

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <div ref={cursorRef} className="custom-cursor" aria-hidden="true">
      <div className="custom-cursor-dot" />
      <div ref={labelRef} className="custom-cursor-label" />
    </div>
  )
}
