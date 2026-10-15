import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { MESSAGES } from './messages'
import { LANGUAGES, type LangId, type Messages } from './types'

const STORAGE_KEY = 'church-language'

function readLang(): LangId {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (LANGUAGES.some((language) => language.id === stored)) return stored as LangId
  } catch {
    /* Private browsing can block storage. */
  }
  return 'en'
}

type I18nValue = {
  lang: LangId
  m: Messages
  setLang: (lang: LangId) => void
}

const I18nContext = createContext<I18nValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangId>(readLang)
  const m = MESSAGES[lang]

  const setLang = (next: LangId) => {
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* Ignore storage failures. */
    }
  }

  useEffect(() => {
    const selected = LANGUAGES.find((language) => language.id === lang)
    document.documentElement.lang = selected?.html ?? 'en'
    document.documentElement.dir = selected?.dir ?? 'ltr'
    const description = document.querySelector('meta[name="description"]')
    if (description) description.setAttribute('content', m.meta.description)
  }, [lang, m])

  const value = useMemo(() => ({ lang, m, setLang }), [lang, m])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function fill(template: string, values: Record<string, string>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? '')
}

export function useI18n() {
  const value = useContext(I18nContext)
  if (!value) throw new Error('useI18n must be used within LanguageProvider')
  return value
}

export function usePageTitle(title: string) {
  const { lang, m } = useI18n()
  useEffect(() => {
    document.title = title
    return () => {
      document.title = m.meta.homeTitle
    }
  }, [title, lang, m.meta.homeTitle])
}
