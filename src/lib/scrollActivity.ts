type Listener = (scrolling: boolean) => void

const listeners = new Set<Listener>()
let scrolling = false
let timer = 0
let bound = false

function setScrolling(next: boolean) {
  if (scrolling === next) return
  scrolling = next
  document.documentElement.classList.toggle('is-scrolling', next)
  listeners.forEach((listener) => listener(next))
}

export function bindScrollActivity() {
  if (bound) return
  bound = true

  const onScroll = () => {
    setScrolling(true)
    window.clearTimeout(timer)
    timer = window.setTimeout(() => setScrolling(false), 160)
  }

  window.addEventListener('scroll', onScroll, { passive: true })
}

export function subscribeScrolling(listener: Listener) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}
