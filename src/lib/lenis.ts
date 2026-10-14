import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenisInstance: Lenis | null = null
let lenisRaf: ((time: number) => void) | null = null

export function initLenis(reducedMotion: boolean): Lenis | null {
  if (reducedMotion) return null

  const lenis = new Lenis({
    duration: 1,
    easing: (t: number) => 1 - Math.pow(1 - t, 3),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    syncTouch: false,
    prevent: (node) => Boolean(node.closest('[data-lenis-prevent]')),
  })

  lenis.on('scroll', ScrollTrigger.update)
  lenisRaf = (time: number) => lenis.raf(time * 1000)
  gsap.ticker.add(lenisRaf)
  gsap.ticker.lagSmoothing(0)

  lenisInstance = lenis
  return lenis
}

export function destroyLenis(): void {
  if (lenisRaf) {
    gsap.ticker.remove(lenisRaf)
    lenisRaf = null
  }
  if (lenisInstance) {
    lenisInstance.destroy()
    lenisInstance = null
  }
  ScrollTrigger.getAll().forEach((t) => t.kill())
}

export function getLenis(): Lenis | null {
  return lenisInstance
}

function resolveTarget(target: string | number): HTMLElement | number | null {
  if (typeof target === 'number') return target
  const id = target.startsWith('#') ? target.slice(1) : target
  return document.getElementById(id)
}

export function scrollTo(target: string | number): void {
  const resolved = resolveTarget(target)

  if (lenisInstance) {
    lenisInstance.resize()
    if (resolved instanceof HTMLElement) {
      lenisInstance.scrollTo(resolved, { offset: -80, force: true })
    } else if (typeof resolved === 'number') {
      lenisInstance.scrollTo(resolved, { offset: -80, force: true })
    }
    return
  }

  if (resolved instanceof HTMLElement) {
    const top = resolved.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top, behavior: 'smooth' })
  } else if (typeof resolved === 'number') {
    window.scrollTo({ top: resolved, behavior: 'smooth' })
  }
}

export function scrollToHash(hash: string): void {
  const id = hash.startsWith('#') ? hash.slice(1) : hash
  const run = () => {
    if (!document.getElementById(id)) return false
    scrollTo(`#${id}`)
    return true
  }

  if (run()) {
    window.setTimeout(run, 250)
    window.setTimeout(run, 600)
    return
  }

  let tries = 0
  const timer = window.setInterval(() => {
    tries += 1
    if (run() || tries > 16) window.clearInterval(timer)
  }, 80)
}

export { gsap, ScrollTrigger }
