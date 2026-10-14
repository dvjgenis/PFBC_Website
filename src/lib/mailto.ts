import { CHURCH } from './constants'

export function buildContactMailto(name: string, email: string, message: string): string {
  const subject = encodeURIComponent('Message from Pillar of Faith Baptist Church website')
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
  return `mailto:${CHURCH.email}?subject=${subject}&body=${body}`
}
