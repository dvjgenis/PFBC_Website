import { supabase } from './supabase'

export const PRAYER_TOPICS = [
  { id: 'family', label: 'Family', tone: 'cream' },
  { id: 'healing', label: 'Healing', tone: 'rose' },
  { id: 'work', label: 'Work', tone: 'gold' },
  { id: 'peace', label: 'Peace', tone: 'sage' },
  { id: 'guidance', label: 'Guidance', tone: 'ink' },
  { id: 'gratitude', label: 'Gratitude', tone: 'cream' },
  { id: 'city', label: 'This city', tone: 'rose' },
  { id: 'church', label: 'Our church', tone: 'gold' },
] as const

export type PrayerTopic = (typeof PRAYER_TOPICS)[number]
export type PrayerTone = PrayerTopic['tone'] | 'lilac'

export const CUSTOM_LIMIT = 50
export const MAX_STICKERS = 20
export const TTL_MS = 24 * 60 * 60 * 1000

export interface PrayerSticker {
  id: string
  topicId: string
  label: string
  tone: PrayerTone
  x: number
  y: number
  rotate: number
  createdAt: number
}

interface PrayerStickerRow {
  id: string
  topic_id: string
  label: string
  tone: string
  x: number
  y: number
  rotate: number
  created_at: string
}

function randomIn(min: number, max: number): number {
  return min + Math.random() * (max - min)
}

function fromRow(row: PrayerStickerRow): PrayerSticker {
  return {
    id: row.id,
    topicId: row.topic_id,
    label: row.label,
    tone: row.tone as PrayerTone,
    x: row.x,
    y: row.y,
    rotate: row.rotate,
    createdAt: new Date(row.created_at).getTime(),
  }
}

function liveSince(): string {
  return new Date(Date.now() - TTL_MS).toISOString()
}

export async function fetchStickers(): Promise<PrayerSticker[]> {
  if (!supabase) return []

  const { data, error } = await supabase
    .from('prayer_stickers')
    .select('id, topic_id, label, tone, x, y, rotate, created_at')
    .gt('created_at', liveSince())
    .order('created_at', { ascending: true })
    .limit(MAX_STICKERS)

  if (error) throw error
  return ((data ?? []) as PrayerStickerRow[]).map(fromRow)
}

function nextPlacement() {
  return {
    x: randomIn(8, 72),
    y: randomIn(14, 70),
    rotate: randomIn(-11, 11),
  }
}

async function placeNote(topicId: string, label: string, tone: PrayerTone): Promise<void> {
  if (!supabase) throw new Error('Prayer wall is not configured')

  const { x, y, rotate } = nextPlacement()
  const { error } = await supabase.from('prayer_stickers').insert({
    topic_id: topicId,
    label,
    tone,
    x,
    y,
    rotate,
  })

  if (error) throw error
}

export async function addSticker(topic: PrayerTopic): Promise<void> {
  await placeNote(topic.id, topic.label, topic.tone)
}

export async function addCustomSticker(label: string): Promise<boolean> {
  const clean = label.trim().replace(/\s+/g, ' ').slice(0, CUSTOM_LIMIT)
  if (!clean) return false
  await placeNote('custom', clean, 'lilac')
  return true
}

export async function removeSticker(id: string): Promise<void> {
  if (!supabase) throw new Error('Prayer wall is not configured')

  const { error } = await supabase.from('prayer_stickers').delete().eq('id', id)
  if (error) throw error
}

export function subscribeStickers(onChange: () => void): () => void {
  const client = supabase
  if (!client) return () => {}

  const channel = client
    .channel('prayer-wall')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'prayer_stickers' },
      onChange,
    )
    .subscribe()

  return () => {
    void client.removeChannel(channel)
  }
}
