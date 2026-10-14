import { CHURCH } from './constants'

/**
 * In-person windows in church local time (America/Chicago).
 * The first Thursday study is published as 7:00 PM; the window ends at 9:00 PM
 * so the indicator turns off the same evening.
 */
const WINDOWS = [
  {
    weekday: 'Sunday' as const,
    weekOfMonth: null,
    start: 15 * 60 + 30,
    end: 17 * 60,
    openLabel: 'Open for Sunday worship (3:30 – 5:00 PM)',
  },
  {
    weekday: 'Thursday' as const,
    weekOfMonth: 1,
    start: 19 * 60,
    end: 21 * 60,
    openLabel: 'Open for in-person Bible study (7:00 PM)',
  },
]

const CLOSED_LABEL =
  'Closed · Sunday worship 3:30 – 5:00 PM · 1st Thursday Bible study, 7:00 PM'

function chicagoTimeParts(at: Date) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: CHURCH.timezone,
    weekday: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(at)

  const weekday = parts.find((p) => p.type === 'weekday')?.value ?? ''
  const day = Number(parts.find((p) => p.type === 'day')?.value ?? 0)
  const hour = Number(parts.find((p) => p.type === 'hour')?.value ?? 0)
  const minute = Number(parts.find((p) => p.type === 'minute')?.value ?? 0)
  return { weekday, weekOfMonth: Math.floor((day - 1) / 7) + 1, minutes: hour * 60 + minute }
}

function activeWindow(at: Date) {
  const { weekday, weekOfMonth, minutes } = chicagoTimeParts(at)
  return WINDOWS.find(
    (window) =>
      window.weekday === weekday &&
      (window.weekOfMonth == null || window.weekOfMonth === weekOfMonth) &&
      minutes >= window.start &&
      minutes < window.end,
  )
}

export function isGatheringOpen(at: Date = new Date()): boolean {
  return activeWindow(at) != null
}

export function gatheringStatusLabel(open: boolean, at: Date = new Date()): string {
  if (!open) return CLOSED_LABEL
  return activeWindow(at)?.openLabel ?? CLOSED_LABEL
}
