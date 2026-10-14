import { CHURCH } from './constants'
import { buildContactMailto } from './mailto'

export type ContactSendResult =
  | { ok: true; method: 'email' }
  | { ok: true; method: 'activate' }
  | { ok: true; method: 'mailto' }
  | { ok: false; error: string }

export async function sendContactMessage(
  name: string,
  email: string,
  message: string,
): Promise<ContactSendResult> {
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${CHURCH.email}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        message,
        _replyto: email,
        _subject: 'Message from Pillar of Faith Baptist Church website',
        _template: 'table',
        _captcha: 'false',
      }),
    })
    const data = (await res.json().catch(() => null)) as {
      success?: string | boolean
      message?: string
    } | null
    if (data?.success === true || data?.success === 'true') {
      return { ok: true, method: 'email' }
    }
    if (typeof data?.message === 'string' && /activat/i.test(data.message)) {
      return { ok: true, method: 'activate' }
    }
    throw new Error('Form service declined the message')
  } catch {
    window.location.href = buildContactMailto(name, email, message)
    return { ok: true, method: 'mailto' }
  }
}
