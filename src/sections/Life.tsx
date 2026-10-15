import { ImageCarousel } from '../components/ImageCarousel'
import { MissionMap } from '../components/MissionMap'
import { useI18n } from '../i18n/language'
import { MINISTRIES } from '../lib/life'
import './Life.css'

export function Life() {
  const { m } = useI18n()
  return (
    <section className="section" id="life">
      <div className="section-inner">
        <p className="section-label">{m.life.label}</p>
        <h2 className="section-title">{m.life.title}</h2>
        <p className="body-text">{m.life.body}</p>
        <div className="life-grid">
          {MINISTRIES.map((item, index) => (
            <article key={item.title} className="life-card">
              <div className="life-card-image">
                <ImageCarousel slides={item.images} label={m.life.items[index].title} />
              </div>
              <div className="life-card-text">
                <h3 className="life-card-title">{m.life.items[index].title}</h3>
                <p className="life-card-desc">{m.life.items[index].text}</p>
              </div>
            </article>
          ))}
        </div>
        <MissionMap />
      </div>
    </section>
  )
}
