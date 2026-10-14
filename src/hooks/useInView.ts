import { useEffect, useRef, useState } from 'react'

type UseInViewOptions = {
  rootMargin?: string
  threshold?: number
  /** Keep observing after first intersection (default: stay visible once seen). */
  once?: boolean
}

export function useInView<T extends Element = HTMLDivElement>({
  rootMargin = '120px',
  threshold = 0,
  once = true,
}: UseInViewOptions = {}) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { rootMargin, threshold },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin, threshold, once])

  return { ref, inView }
}
