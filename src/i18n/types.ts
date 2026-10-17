export const LANGUAGE_GROUPS = [
  { id: 'filipino', label: 'Filipino' },
  { id: 'european', label: 'European' },
  { id: 'east-asian', label: 'East Asian' },
  { id: 'southeast-asian', label: 'Southeast Asian' },
  { id: 'south-asian', label: 'South Asian' },
  { id: 'middle-eastern', label: 'Middle Eastern' },
  { id: 'african', label: 'African' },
] as const

export const LANGUAGES = [
  { id: 'en', label: 'English', html: 'en', dir: 'ltr', flag: '🇺🇸', group: 'english' },
  { id: 'tl', label: 'Tagalog', html: 'tl', dir: 'ltr', flag: '🇵🇭', group: 'filipino' },
  { id: 'ceb', label: 'Cebuano', html: 'ceb', dir: 'ltr', flag: '🇵🇭', group: 'filipino' },
  { id: 'hil', label: 'Illonggo', html: 'hil', dir: 'ltr', flag: '🇵🇭', group: 'filipino' },
  { id: 'ilo', label: 'Illocano', html: 'ilo', dir: 'ltr', flag: '🇵🇭', group: 'filipino' },
  { id: 'war', label: 'Waray', html: 'war', dir: 'ltr', flag: '🇵🇭', group: 'filipino' },
  { id: 'bcl', label: 'Bikol', html: 'bcl', dir: 'ltr', flag: '🇵🇭', group: 'filipino' },
  { id: 'pam', label: 'Kapampangan', html: 'pam', dir: 'ltr', flag: '🇵🇭', group: 'filipino' },
  { id: 'pag', label: 'Pangasinan', html: 'pag', dir: 'ltr', flag: '🇵🇭', group: 'filipino' },
  { id: 'cbk', label: 'Chavacano', html: 'cbk', dir: 'ltr', flag: '🇵🇭', group: 'filipino' },
  { id: 'es', label: 'Spanish', html: 'es', dir: 'ltr', flag: '🇪🇸', group: 'european' },
  { id: 'pt', label: 'Portuguese', html: 'pt-BR', dir: 'ltr', flag: '🇧🇷', group: 'european' },
  { id: 'pl', label: 'Polish', html: 'pl', dir: 'ltr', flag: '🇵🇱', group: 'european' },
  { id: 'fr', label: 'French', html: 'fr', dir: 'ltr', flag: '🇫🇷', group: 'european' },
  { id: 'it', label: 'Italian', html: 'it', dir: 'ltr', flag: '🇮🇹', group: 'european' },
  { id: 'de', label: 'German', html: 'de', dir: 'ltr', flag: '🇩🇪', group: 'european' },
  { id: 'zh', label: 'Mandarin', html: 'zh-Hans', dir: 'ltr', flag: '🇨🇳', group: 'east-asian' },
  { id: 'ko', label: 'Korean', html: 'ko', dir: 'ltr', flag: '🇰🇷', group: 'east-asian' },
  { id: 'ja', label: 'Japanese', html: 'ja', dir: 'ltr', flag: '🇯🇵', group: 'east-asian' },
  { id: 'id', label: 'Indonesian', html: 'id', dir: 'ltr', flag: '🇮🇩', group: 'southeast-asian' },
  { id: 'ms', label: 'Malaysian', html: 'ms-MY', dir: 'ltr', flag: '🇲🇾', group: 'southeast-asian' },
  { id: 'sg', label: 'Singlish', html: 'en-SG', dir: 'ltr', flag: '🇸🇬', group: 'southeast-asian' },
  { id: 'hi', label: 'Hindi', html: 'hi', dir: 'ltr', flag: '🇮🇳', group: 'south-asian' },
  { id: 'pa', label: 'Punjabi', html: 'pa', dir: 'ltr', flag: '🇮🇳', group: 'south-asian' },
  { id: 'ur', label: 'Urdu', html: 'ur', dir: 'rtl', flag: '🇵🇰', group: 'south-asian' },
  { id: 'ml', label: 'Malayalam', html: 'ml', dir: 'ltr', flag: '🇮🇳', group: 'south-asian' },
  { id: 'ta', label: 'Tamil', html: 'ta', dir: 'ltr', flag: '🇮🇳', group: 'south-asian' },
  { id: 'te', label: 'Telugu', html: 'te', dir: 'ltr', flag: '🇮🇳', group: 'south-asian' },
  { id: 'ar', label: 'Arabic', html: 'ar', dir: 'rtl', flag: '🇸🇦', group: 'middle-eastern' },
  { id: 'fa', label: 'Farsi', html: 'fa', dir: 'rtl', flag: '🇮🇷', group: 'middle-eastern' },
  { id: 'he', label: 'Hebrew', html: 'he', dir: 'rtl', flag: '🇮🇱', group: 'middle-eastern' },
  { id: 'sw', label: 'Swahili', html: 'sw', dir: 'ltr', flag: '🇹🇿', group: 'african' },
  { id: 'ha', label: 'Hausa', html: 'ha', dir: 'ltr', flag: '🇳🇬', group: 'african' },
  { id: 'yo', label: 'Yoruba', html: 'yo', dir: 'ltr', flag: '🇳🇬', group: 'african' },
  { id: 'lg', label: 'Luganda', html: 'lg', dir: 'ltr', flag: '🇺🇬', group: 'african' },
  { id: 'zu', label: 'Zulu', html: 'zu', dir: 'ltr', flag: '🇿🇦', group: 'african' },
] as const

export function languageMenu() {
  return {
    english: LANGUAGES.filter((language) => language.group === 'english'),
    groups: LANGUAGE_GROUPS.map((group) => ({
      ...group,
      languages: LANGUAGES.filter((language) => language.group === group.id),
    })),
  }
}

export type LangId = (typeof LANGUAGES)[number]['id']

export type CardCopy = { label: string; title: string; time: string }
export type Titled = { title: string; text: string }

export type Messages = {
  meta: { description: string; homeTitle: string }
  nav: {
    menu: string
    close: string
    language: string
    imNew: string
    faith: string
    leadership: string
    word: string
    prayer: string
    contact: string
    give: string
    open: string
    closed: string
    skip: string
  }
  hours: { open: string; closed: string }
  hero: { meta: string; welcome: string; plan: string }
  visit: {
    label: string
    title: string
    body: string
    expect: string[]
    live: string
    directions: string
    fact: string
    services: string
    cards: CardCopy[]
  }
  times: string[]
  give: {
    label: string
    title: string
    teaser: string
    how: string
    intro: string
    zelleLabel: string
    zelleTitle: string
    zelleBody: string
    copy: string
    copied: string
    envelopeLabel: string
    envelopeTitle: string
    envelopeBody: string
  }
  about: {
    label: string
    title: string
    tagline: string
    missions: Titled[]
    ordinancesTitle: string
    ordinances: string[]
    affiliationsTitle: string
    affiliations: string[]
  }
  faith: { label: string; title: string; lead: string; read: string; points: Titled[] }
  life: { label: string; title: string; body: string; items: Titled[] }
  missions: {
    label: string
    title: string
    body: string
    withSpouse: string
    countries: Record<string, string>
  }
  bible: {
    label: string
    title: string
    intro: string
    old: string
    new: string
    book: string
    chapter: string
    prevChapter: string
    nextChapter: string
    prevPage: string
    nextPage: string
    loading: string
    tryAgain: string
    hintWide: string
    hintNarrow: string
  }
  prayer: {
    label: string
    title: string
    body: string
    write: string
    yourNote: string
    placeholder: string
    placing: string
    place: string
    gathering: string
    empty: string
    unavailable: string
    placeError: string
    removeError: string
    topics: Record<string, string>
  }
  contact: {
    heroLabel: string
    heroTitle: string
    pastorLabel: string
    intro: string
    reviewBefore: string
    reviewLink: string
    reviewAfter: string
    name: string
    email: string
    message: string
    send: string
    sending: string
    sent: string
    activate: string
    mailto: string
    error: string
    address: string
    times: string
    phone: string
    facebook: string
  }
  footer: {
    tagline: string
    visit: string
    contact: string
    write: string
    leadership: string
    faith: string
    give: string
    rights: string
    review: string
  }
  leadership: {
    heroLabel: string
    title: string
    lead: string
    assisting: string
    roles: Record<string, string>
    bios: string[]
  }
  history: { label: string; title: string; intro: string; hint: string; region: string }
  marquee: string
}
