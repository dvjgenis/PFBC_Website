import { useReducedMotion } from '../hooks/useReducedMotion'
import { useI18n } from '../i18n/language'
import './Marquee.css'

export function Marquee() {
  const reducedMotion = useReducedMotion()
  const { m } = useI18n()
  const repeated = m.marquee.repeat(4)

  return (
    <div className="marquee-wrap" aria-hidden="true">
      <div className={`marquee-track ${reducedMotion ? 'paused' : ''}`}>
        <span className="marquee-text">{repeated}</span>
        {!reducedMotion && <span className="marquee-text">{repeated}</span>}
      </div>
    </div>
  )
}
