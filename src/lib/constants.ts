export const FABC = {
  name: 'Fil-American Baptist Church',
  shortName: 'FABC',
  label: 'Fil-American Baptist Church (FABC)',
  website: 'https://www.fabcchicago.org/',
} as const

export const CHURCH = {
  name: 'Pillar of Faith Baptist Church',
  shortName: 'PFBC',
  tagline:
    'We are a warm, welcoming community of believers dedicated to sharing God\'s love, growing in faith together, and serving our community.',
  address: '2012 Wicklow Rd, Naperville, IL 60564',
  mapsUrl:
    'https://www.google.com/maps/place/Pillar+of+Faith+Baptist+Church/@41.6897268,-88.1895103,17z/data=!4m8!3m7!1s0x880ef63f6fb5dd3d:0x609e33900e8455fc!8m2!3d41.6897228!4d-88.1869354!9m1!1b1!16s%2Fg%2F1tg2l7q8?entry=ttu',
  /** Opens Google’s write-a-review prompt for this Maps listing. */
  googleReviewUrl:
    'https://www.google.com/search?q=Pillar+of+Faith+Baptist+Church+Naperville&lrd=0x880ef63f6fb5dd3d:0x609e33900e8455fc,3,,,&hl=en-US',
  phone: '(630) 904-4900',
  email: 'info@pfbcnaperville.org',
  zelle: 'pillaroffaithbc@gmail.com',
  navWordmark: 'Pillar of Faith',
  facebook: 'https://www.facebook.com/pillaroffaithbc',
  facebookLabel: 'Pillar of Faith Baptist Church',
  pastor: {
    name: 'Pastor Kris Paolo Akut',
    spouse: 'Shekinah Akut',
    title: 'Lead Pastor',
    photo: '/photos/IMG_6964.jpg',
    photoAlt: 'Pastor Kris Paolo Akut and Shekinah Akut standing together outdoors',
    photoPosition: 'center 38%',
    bio: 'He is a faithful servant of the Lord, a graduate of Pensacola Christian College, Florida where he was equipped and prepared by God for His purpose. In February 2026, the Lord entrusted him with the sacred calling to serve as the pastor of Pillar of Faith Baptist Church in Naperville, leading His congregation with humility, love, and unwavering faith. Alongside his devoted wife Shekinah, a precious gift from God, he is blessed with two beautiful daughters, Kara and Emi.',
  },
  timezone: 'America/Chicago',
  city: 'Naperville',
  locationLabel: 'Naperville, IL',
  heroMeta: 'Sunday worship 3:30 – 5:00 PM · 1st–3rd Thursday 7:00 PM · Naperville, IL',
} as const

export const NAV_LINKS = [
  { label: "I'm New", to: '/', hash: '#visit' },
  { label: 'Faith', to: '/faith' },
  { label: 'Leadership', to: '/leadership' },
  { label: 'Word', to: '/', hash: '#word' },
  { label: 'Prayer Wall', to: '/', hash: '#pray' },
  { label: 'Contact', to: '/contact' },
  { label: 'Give', to: '/give' },
] as const

export const VISIT_SCHEDULE = [
  { label: 'Sunday', title: 'Worship Service', time: '3:30 – 5:00 PM', livestream: true },
  { label: '1st Thursday', title: 'Bible Study', time: '7:00 PM · In person at the church' },
  { label: '2nd Thursday', title: 'Bible Study', time: '7:00 PM · Zoom' },
  { label: '3rd Thursday', title: 'Prayer Meeting', time: '7:00 PM' },
] as const

export const SCHEDULE = [
  ...VISIT_SCHEDULE,
  { label: '2nd Saturday', title: 'Senior Living Ministries', time: 'Monthly' },
  { label: '2nd Sunday', title: 'Monthly Potluck', time: 'Monthly' },
  { label: 'Last Sunday', title: "Lord's Supper", time: 'Monthly' },
] as const

export type Leader = {
  name: string
  spouse?: string
  title: string
  photo?: string
  photoAlt?: string
  photoPosition?: string
  photoAspectRatio?: string
  bio: string
}

export const ASSISTING_PASTORS: Leader[] = [
  {
    name: 'Pastor Brad Blissett',
    spouse: 'Barb Blissett',
    title: 'Assisting Pastor',
    photo: '/photos/pastor-brad-barb.jpg',
    photoAlt: 'Pastor Brad Blissett and Barb Blissett standing together',
    photoAspectRatio: '1 / 1',
    photoPosition: 'center center',
    bio: 'Pastor Brad Blissett serves Pillar of Faith Baptist Church as Assisting Pastor.',
  },
  {
    name: 'Pastor Ruel Akut',
    spouse: 'Jocelyn Akut',
    title: 'Assisting Pastor',
    photo: '/photos/pastor-ruel-jocelyn.jpg',
    photoAlt: 'Pastor Ruel Akut and Jocelyn Akut seated together',
    photoPosition: 'center 28%',
    bio: 'Pastor Ruel Akut serves as Assisting Pastor at Pillar of Faith Baptist Church. He and his wife, Jocelyn, remain a beloved part of this church family.',
  },
]

export type Affiliation = {
  text: string
  href?: string
}

export const AFFILIATIONS: Affiliation[] = [
  { text: 'In fellowship with the General Association of Regular Baptist Churches (GARBC)' },
  { text: 'Member of the Illinois-Missouri Association of Regular Baptist Churches (IL-MO ARBC)' },
]

export const MISSION_POINTS = [
  {
    title: 'Worship & Ordinances',
    text: 'To worship God together as a unified body of believers and faithfully observe the ordinances ordained by Jesus Christ.',
  },
  {
    title: 'Proclaim the Gospel',
    text: 'To boldly share the Gospel of Christ—God\'s power unto salvation for everyone who believes—both in season and out of season (Romans 1:16; 2 Timothy 4:2).',
  },
  {
    title: 'Discipleship & Education',
    text: 'To instruct all generations, young and old alike, on the whole counsel of God, guiding their faith and daily conduct (Acts 20:27).',
  },
  {
    title: 'The Great Commission',
    text: 'To actively carry out the Great Commission of our Lord, spreading His word within our local community and to the very ends of the earth (Matthew 28:19-20; Acts 1:8).',
  },
  {
    title: 'Community & Ministry',
    text: 'To establish, maintain, and operate ministries and institutions necessary to fulfill our calling and serve others.',
  },
] as const

export const ORDINANCES = [
  'Baptism by immersion, administered to believers.',
  'The Lord\'s Supper observed on the last Sunday of each month, or at times designated by the Pastor or Board of Deacons.',
  'Child dedication services commended to believing parents (not recognized as an ordinance).',
] as const
