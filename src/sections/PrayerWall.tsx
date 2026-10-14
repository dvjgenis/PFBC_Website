import { useCallback, useEffect, useState, type FormEvent } from 'react'
import { useInView } from '../hooks/useInView'
import { usePageVisible } from '../hooks/usePageVisible'
import { isSupabaseConfigured } from '../lib/supabase'
import {
  CUSTOM_LIMIT,
  PRAYER_TOPICS,
  addCustomSticker,
  addSticker,
  fetchStickers,
  removeSticker,
  subscribeStickers,
  type PrayerSticker,
  type PrayerTopic,
} from '../lib/prayerStickers'
import './PrayerWall.css'

export function PrayerWall() {
  const { ref: sectionRef, inView } = useInView<HTMLElement>({ rootMargin: '80px', once: false })
  const pageVisible = usePageVisible()
  const active = inView && pageVisible

  const [stickers, setStickers] = useState<PrayerSticker[]>([])
  const [customOpen, setCustomOpen] = useState(false)
  const [customText, setCustomText] = useState('')
  const [loading, setLoading] = useState(isSupabaseConfigured)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(
    isSupabaseConfigured ? null : 'The prayer wall is unavailable right now.',
  )

  const refresh = useCallback(async () => {
    if (!isSupabaseConfigured) return
    try {
      const next = await fetchStickers()
      setStickers(next)
      setError(null)
    } catch (err) {
      if (import.meta.env.DEV) console.error('[PrayerWall]', err)
      setError('The prayer wall is unavailable right now. Please try again later.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!active || !isSupabaseConfigured) return

    void refresh()
    const unsubscribe = subscribeStickers(() => {
      void refresh()
    })
    const poll = window.setInterval(() => {
      void refresh()
    }, 30000)
    return () => {
      unsubscribe()
      window.clearInterval(poll)
    }
  }, [refresh, active])

  const placeSticker = async (topic: PrayerTopic) => {
    if (busy || !isSupabaseConfigured) return
    setBusy(true)
    try {
      await addSticker(topic)
      await refresh()
    } catch {
      setError('We could not place that note. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  const takeDown = async (id: string) => {
    if (busy || !isSupabaseConfigured) return
    setBusy(true)
    try {
      await removeSticker(id)
      await refresh()
    } catch {
      setError('We could not take that note down. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  const placeCustom = async (e: FormEvent) => {
    e.preventDefault()
    if (busy || !isSupabaseConfigured) return
    setBusy(true)
    try {
      const placed = await addCustomSticker(customText)
      if (!placed) return
      setCustomText('')
      setCustomOpen(false)
      await refresh()
    } catch {
      setError('We could not place that note. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="section prayer-section" id="pray" ref={sectionRef}>
      <div className="section-inner">
        <p className="section-label">A quiet moment</p>
        <h2 className="section-title">How can we pray for you today?</h2>
        <p className="body-text">
          Choose a note, or write your own. Notes are public — everyone visiting
          this page can see them. Up to twenty stay on the wall for a day, then
          they fade.
        </p>

        <div className="prayer-topics">
          {PRAYER_TOPICS.map((topic) => (
            <button
              key={topic.id}
              type="button"
              className="prayer-topic"
              onClick={() => void placeSticker(topic)}
              disabled={busy || !isSupabaseConfigured}
              data-cursor="PRAY"
            >
              {topic.label}
            </button>
          ))}
          <button
            type="button"
            className={`prayer-topic prayer-topic-custom ${customOpen ? 'is-open' : ''}`}
            onClick={() => setCustomOpen((open) => !open)}
            disabled={!isSupabaseConfigured}
            aria-expanded={customOpen}
            aria-controls="prayer-custom-form"
            data-cursor="WRITE"
          >
            Write a note
          </button>
        </div>

        {customOpen && (
          <form id="prayer-custom-form" className="prayer-custom" onSubmit={(e) => void placeCustom(e)}>
            <label className="prayer-custom-label" htmlFor="prayer-custom-input">
              Your note
            </label>
            <div className="prayer-custom-row">
              <input
                id="prayer-custom-input"
                className="prayer-custom-input"
                type="text"
                maxLength={CUSTOM_LIMIT}
                value={customText}
                onChange={(e) => setCustomText(e.target.value.slice(0, CUSTOM_LIMIT))}
                placeholder="A short prayer…"
                autoFocus
              />
              <button
                type="submit"
                className="prayer-custom-submit"
                disabled={busy || !customText.trim()}
              >
                {busy ? 'Placing…' : 'Place'}
              </button>
            </div>
            <p className="prayer-custom-count">{customText.length} / {CUSTOM_LIMIT}</p>
          </form>
        )}

        {error && <p className="prayer-status">{error}</p>}

        <div className="prayer-wall" aria-live="polite">
          {loading && stickers.length === 0 && (
            <p className="prayer-empty">Gathering notes…</p>
          )}
          {!loading && stickers.length === 0 && (
            <p className="prayer-empty">The wall is quiet. Leave a note if you like.</p>
          )}
          {stickers.map((sticker) => (
            <button
              key={sticker.id}
              type="button"
              className={`prayer-sticker prayer-sticker-${sticker.tone}${sticker.topicId === 'custom' ? ' is-custom' : ''}`}
              style={{
                left: `${sticker.x}%`,
                top: `${sticker.y}%`,
                transform: `rotate(${sticker.rotate}deg)`,
              }}
              onDoubleClick={() => void takeDown(sticker.id)}
              disabled={busy}
              data-cursor="LIFT"
              aria-label={sticker.label}
            >
              {sticker.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
