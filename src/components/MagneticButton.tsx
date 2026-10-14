import { useRef, type ReactNode, type MouseEvent, type CSSProperties } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import './MagneticButton.css'

interface MagneticButtonProps {
  children: ReactNode
  onClick?: () => void
  href?: string
  variant?: 'primary' | 'outline'
  className?: string
  dataCursor?: string
  style?: CSSProperties
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

export function MagneticButton({
  children,
  onClick,
  href,
  variant = 'primary',
  className = '',
  dataCursor,
  style,
  type = 'button',
  disabled = false,
}: MagneticButtonProps) {
  const reducedMotion = useReducedMotion()
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null)

  const handleMove = (e: MouseEvent) => {
    if (reducedMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const dist = Math.sqrt(x * x + y * y)
    const strength = Math.max(0, 1 - dist / 120)
    ref.current.style.transform = `translate(${x * strength * 0.25}px, ${y * strength * 0.25}px) scale(${1 + strength * 0.08})`
  }

  const handleLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = ''
  }

  const cls = `magnetic-btn ${variant === 'outline' ? 'magnetic-btn-outline' : ''} ${className}`

  if (href) {
    return (
      <a
        ref={ref}
        href={href}
        className={cls}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        data-cursor={dataCursor}
        style={style}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      ref={ref}
      type={type}
      className={cls}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      data-cursor={dataCursor}
      style={style}
    >
      {children}
    </button>
  )
}
