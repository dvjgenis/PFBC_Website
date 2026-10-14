import { useReducedMotion } from '../hooks/useReducedMotion'
import './Marquee.css'

const PHRASE = 'worship · gospel · discipleship · community · '

export function Marquee() {
  const reducedMotion = useReducedMotion()
  const repeated = PHRASE.repeat(4)

  return (
    <div className="marquee-wrap" aria-hidden="true">
      <div className={`marquee-track ${reducedMotion ? 'paused' : ''}`}>
        <span className="marquee-text">{repeated}</span>
        {!reducedMotion && <span className="marquee-text">{repeated}</span>}
      </div>
    </div>
  )
}
