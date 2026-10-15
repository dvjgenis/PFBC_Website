export const LANGUAGES = [
  { id: 'en', label: 'English', html: 'en' },
  { id: 'tl', label: 'Tagalog', html: 'tl' },
  { id: 'ceb', label: 'Cebuano', html: 'ceb' },
  { id: 'hil', label: 'Illonggo', html: 'hil' },
  { id: 'ilo', label: 'Illocano', html: 'ilo' },
  { id: 'es', label: 'Spanish', html: 'es' },
] as const

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
