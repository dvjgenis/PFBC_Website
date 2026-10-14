import { Marquee } from '../components/Marquee'
import { Hero } from '../sections/Hero'
import { Visit } from '../sections/Visit'
import { About } from '../sections/About'
import { FaithTeaser } from '../sections/FaithTeaser'
import { Life } from '../sections/Life'
import { GiveTeaser } from '../sections/Give'
import { Bible } from '../sections/Bible'
import { PrayerWall } from '../sections/PrayerWall'

export function Home() {
  return (
    <>
      <Hero />
      <Visit />
      <GiveTeaser />
      <About />
      <Marquee />
      <FaithTeaser />
      <Life />
      <Bible />
      <PrayerWall />
    </>
  )
}
