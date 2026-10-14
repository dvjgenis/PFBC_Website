import { useState } from 'react'
import { FAITH_POINTS } from '../lib/faith'
import './Faith.css'

export function Faith({ hideIntro = false }: { hideIntro?: boolean }) {
  const [openId, setOpenId] = useState<number>(1)

  return (
    <section className="section" id="faith">
      <div className="section-inner">
        {!hideIntro && (
          <>
            <p className="section-label">What we believe</p>
            <h2 className="section-title">Statement of Faith</h2>
            <p className="body-text">
              We are a truly and completely Bible-believing church, committed to
              preach the whole counsel of God.
            </p>
          </>
        )}
        {hideIntro && (
          <p className="body-text faith-lead">
            We are a truly and completely Bible-believing church, committed to
            preach the whole counsel of God.
          </p>
        )}
        <div className="faith-list">
          {FAITH_POINTS.map((point) => (
            <div
              key={point.id}
              className={`faith-item ${openId === point.id ? 'open' : ''}`}
            >
              <button
                type="button"
                className="faith-trigger"
                onClick={() => setOpenId(openId === point.id ? 0 : point.id)}
                aria-expanded={openId === point.id}
                data-cursor="READ"
              >
                <span className="faith-trigger-num">{String(point.id).padStart(2, '0')}</span>
                <span className="faith-trigger-title">{point.title}</span>
                <span className="faith-trigger-icon" aria-hidden="true">
                  {openId === point.id ? '−' : '+'}
                </span>
              </button>
              <div className="faith-panel">
                <div className="faith-panel-inner">
                  <p className="faith-panel-text">{point.text}</p>
                  <p className="faith-panel-refs">{point.refs}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
