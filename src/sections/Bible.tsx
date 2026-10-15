import { useCallback, useEffect, useRef, useState, type TouchEvent } from 'react'
import {
  CHAPTER_COUNTS,
  NEW_TESTAMENT,
  NKJV_CREDIT,
  OLD_TESTAMENT,
  chunkVerses,
  fetchChapter,
  getCachedChapter,
  PAGE_CHARS,
  type BibleBook,
  type BibleChapter,
  type BibleVerse,
} from '../lib/bible'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useI18n } from '../i18n/language'
import './Bible.css'

function useTwoPage() {
  const [twoPage, setTwoPage] = useState(
    () => typeof window !== 'undefined' && window.innerWidth >= 860,
  )

  useEffect(() => {
    const onResize = () => setTwoPage(window.innerWidth >= 860)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return twoPage
}

function lastPageIndex(pageCount: number, twoPage: boolean): number {
  if (pageCount <= 1) return 0
  if (!twoPage) return pageCount - 1
  return Math.floor((pageCount - 1) / 2) * 2
}

function VerseList({ verses }: { verses: BibleVerse[] }) {
  if (!verses.length) {
    return <p className="bible-blank" aria-hidden="true" />
  }
  return (
    <div className="bible-verses">
      {verses.map((v) => (
        <p key={v.verse} className="bible-verse">
          <span className="bible-verse-num">{v.verse}</span>
          {v.text.replace(/\s+/g, ' ')}
        </p>
      ))}
    </div>
  )
}

export function Bible() {
  const { m } = useI18n()
  const reducedMotion = useReducedMotion()
  const twoPage = useTwoPage()
  const sectionRef = useRef<HTMLElement>(null)
  const [book, setBook] = useState<BibleBook>('John')
  const [chapter, setChapter] = useState(1)
  const [retryTick, setRetryTick] = useState(0)
  const [data, setData] = useState<BibleChapter | null>(null)
  const [pageIndex, setPageIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [turning, setTurning] = useState<'next' | 'prev' | null>(null)
  const inView = useRef(false)
  const touchStart = useRef(0)
  const openAt = useRef<'start' | 'end'>('start')
  const turnTimer = useRef<number>(0)

  const pages = data ? chunkVerses(data.verses, twoPage ? PAGE_CHARS.two : PAGE_CHARS.one) : []
  const step = twoPage ? 2 : 1
  const pageCount = Math.max(1, pages.length)
  const spreadCount = Math.max(1, Math.ceil(pageCount / step))
  const currentSpread = Math.floor(pageIndex / step)
  const left = pages[pageIndex] ?? []
  const right = twoPage ? (pages[pageIndex + 1] ?? []) : []
  const maxChapter = CHAPTER_COUNTS[book]
  const atStart = pageIndex <= 0 && chapter === 1
  const atEnd = pageIndex >= lastPageIndex(pageCount, twoPage) && chapter >= maxChapter

  useEffect(() => {
    if (twoPage) {
      setPageIndex((i) => i - (i % 2))
    }
  }, [twoPage])

  useEffect(() => {
    let cancelled = false
    const target = openAt.current
    openAt.current = 'start'
    const cached = getCachedChapter(book, chapter)
    if (cached) {
      const wide = window.innerWidth >= 860
      const nextPages = chunkVerses(cached.verses, wide ? PAGE_CHARS.two : PAGE_CHARS.one)
      setData(cached)
      setPageIndex(target === 'end' ? lastPageIndex(nextPages.length, wide) : 0)
      setLoading(false)
      setError(null)
      return
    }

    setLoading(true)
    setError(null)
    fetchChapter(book, chapter)
      .then((result) => {
        if (cancelled) return
        const wide = window.innerWidth >= 860
        const nextPages = chunkVerses(result.verses, wide ? PAGE_CHARS.two : PAGE_CHARS.one)
        setData(result)
        setPageIndex(target === 'end' ? lastPageIndex(nextPages.length, wide) : 0)
        setError(null)
      })
      .catch(() => {
        if (!cancelled) setError('Unable to load this chapter. Please try again.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [book, chapter, retryTick])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting
      },
      { threshold: 0.2 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    return () => window.clearTimeout(turnTimer.current)
  }, [])

  const goPage = useCallback((direction: 1 | -1) => {
    if (turning) return
    const next = pageIndex + direction * step

    if (next < 0) {
      if (chapter > 1) {
        openAt.current = 'end'
        setChapter((c) => c - 1)
      }
      return
    }

    if (next >= pageCount) {
      if (chapter < maxChapter) {
        openAt.current = 'start'
        setChapter((c) => c + 1)
      }
      return
    }

    setPageIndex(next)
    if (reducedMotion) return

    setTurning(direction > 0 ? 'next' : 'prev')
    window.clearTimeout(turnTimer.current)
    turnTimer.current = window.setTimeout(() => {
      setTurning(null)
    }, 220)
  }, [turning, pageIndex, step, pageCount, chapter, maxChapter, reducedMotion])

  const handleBookChange = (newBook: BibleBook) => {
    openAt.current = 'start'
    setBook(newBook)
    setChapter(1)
    setPageIndex(0)
  }

  const handleChapterChange = (newChapter: number) => {
    if (newChapter < 1 || newChapter > maxChapter || newChapter === chapter) return
    openAt.current = 'start'
    setChapter(newChapter)
    setPageIndex(0)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!inView.current) return
      const target = e.target as HTMLElement
      if (target.closest('input, textarea, select')) return
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        goPage(1)
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goPage(-1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goPage])

  const onTouchStart = (e: TouchEvent) => {
    touchStart.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: TouchEvent) => {
    const diff = touchStart.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 48) goPage(diff > 0 ? 1 : -1)
  }

  return (
    <section className="section bible-section" id="word" ref={sectionRef}>
      <div className="section-inner">
        <p className="section-label">{m.bible.label}</p>
        <h2 className="section-title">{m.bible.title}</h2>
        <p className="body-text">{m.bible.intro}</p>

        <div className="bible-controls">
          <select
            className="bible-select"
            value={book}
            onChange={(e) => handleBookChange(e.target.value as BibleBook)}
            aria-label={m.bible.book}
          >
            <optgroup label={m.bible.old}>
              {OLD_TESTAMENT.map((b) => (
                <option key={b.name} value={b.name}>{b.name}</option>
              ))}
            </optgroup>
            <optgroup label={m.bible.new}>
              {NEW_TESTAMENT.map((b) => (
                <option key={b.name} value={b.name}>{b.name}</option>
              ))}
            </optgroup>
          </select>
          <div className="bible-chapter-step">
            <button
              type="button"
              className="bible-nav-btn"
              onClick={() => handleChapterChange(chapter - 1)}
              disabled={chapter <= 1 || loading}
              aria-label={m.bible.prevChapter}
            >
              ‹
            </button>
            <select
              className="bible-select bible-select-chapter"
              value={chapter}
              onChange={(e) => handleChapterChange(Number(e.target.value))}
              aria-label={m.bible.chapter}
            >
              {Array.from({ length: maxChapter }, (_, i) => i + 1).map((c) => (
                <option key={c} value={c}>{m.bible.chapter} {c}</option>
              ))}
            </select>
            <button
              type="button"
              className="bible-nav-btn"
              onClick={() => handleChapterChange(chapter + 1)}
              disabled={chapter >= maxChapter || loading}
              aria-label={m.bible.nextChapter}
            >
              ›
            </button>
          </div>
        </div>

        <div
          className={`bible-book ${turning ? `is-turning-${turning}` : ''} ${loading ? 'is-loading' : ''}`}
          data-cursor="TURN"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="bible-cover">
            <div className="bible-paper">
              {error && (
                <div className="bible-error">
                  <p>{error}</p>
                  <button
                    type="button"
                    className="bible-nav-btn"
                    onClick={() => setRetryTick((n) => n + 1)}
                  >
                    {m.bible.tryAgain}
                  </button>
                </div>
              )}
              {!error && (
                <>
                  <article
                    className="bible-page bible-page-left"
                    aria-label={`${data?.book ?? book} ${data?.chapter ?? chapter}, left page`}
                  >
                    <header className="bible-header">
                      <span className="bible-ref">{book} {chapter}</span>
                      {loading && <span className="bible-busy">{m.bible.loading}</span>}
                    </header>
                    <VerseList verses={left} />
                    {!twoPage && (
                      <p className="bible-folio">{currentSpread + 1} / {spreadCount}</p>
                    )}
                  </article>
                  {twoPage && (
                    <article
                      className="bible-page bible-page-right"
                      aria-label="Right page"
                    >
                      <header className="bible-header bible-header-right">
                        <span className="bible-page-num">
                          {currentSpread + 1} / {spreadCount}
                        </span>
                      </header>
                      <VerseList verses={right} />
                    </article>
                  )}
                </>
              )}
            </div>
          </div>

          <button
            type="button"
            className="bible-edge bible-edge-prev"
            onClick={() => goPage(-1)}
            disabled={atStart || loading}
            aria-label={m.bible.prevPage}
          >
            <span>‹</span>
          </button>
          <button
            type="button"
            className="bible-edge bible-edge-next"
            onClick={() => goPage(1)}
            disabled={atEnd || loading}
            aria-label={m.bible.nextPage}
          >
            <span>›</span>
          </button>
        </div>
        <p className="bible-hint">
          {twoPage ? m.bible.hintWide : m.bible.hintNarrow}
        </p>
        <p className="bible-credit">{NKJV_CREDIT}</p>
      </div>
    </section>
  )
}
