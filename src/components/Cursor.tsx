import { useEffect, useRef, useState } from 'react'
import './Cursor.css'

export function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState<string | null>(null)
  const [hovering, setHovering] = useState(false)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine) return
    setEnabled(true)

    const onMove = (e: MouseEvent) => {
      if (!cursorRef.current) return
      cursorRef.current.style.left = `${e.clientX}px`
      cursorRef.current.style.top = `${e.clientY}px`
    }

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest('[data-cursor]') as HTMLElement | null
      if (el) {
        setLabel(el.dataset.cursor ?? null)
        setHovering(true)
      }
    }

    const onOut = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement | null
      if (!related?.closest('[data-cursor]')) {
        setLabel(null)
        setHovering(false)
      }
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
    }
  }, [])

  if (!enabled) return null

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${hovering ? 'hover' : ''}`}
      aria-hidden="true"
    >
      <div className="custom-cursor-dot" />
      {label && <div className="custom-cursor-label">{label}</div>}
    </div>
  )
}
