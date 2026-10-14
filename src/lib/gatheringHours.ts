import { CHURCH } from './constants'

/** Sunday worship window in church local time (America/Chicago). */
export const GATHERING_HOURS = {
  weekday: 'Sunday' as const,
  startHour: 15,
  startMinute: 0,
  endHour: 18,
  endMinute: 0,
  label: '3:00 – 6:00 PM',
} as const

function chicagoTimeParts(at: Date) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: CHURCH.timezone,
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(at)

  const weekday = parts.find((p) => p.type === 'weekday')?.value ?? ''
  const hour = Number(parts.find((p) => p.type === 'hour')?.value ?? 0)
  const minute = Number(parts.find((p) => p.type === 'minute')?.value ?? 0)
  return { weekday, minutes: hour * 60 + minute }
}

export function isGatheringOpen(at: Date = new Date()): boolean {
  const { weekday, minutes } = chicagoTimeParts(at)
  if (weekday !== GATHERING_HOURS.weekday) return false

  const start = GATHERING_HOURS.startHour * 60 + GATHERING_HOURS.startMinute
  const end = GATHERING_HOURS.endHour * 60 + GATHERING_HOURS.endMinute
  return minutes >= start && minutes <= end
}

export function gatheringStatusLabel(open: boolean): string {
  return open
    ? `Open for Sunday worship (${GATHERING_HOURS.label})`
    : `Closed · Sunday worship ${GATHERING_HOURS.label}`
}
