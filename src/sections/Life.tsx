import { ImageCarousel } from '../components/ImageCarousel'
import { MissionMap } from '../components/MissionMap'
import { CHURCH } from '../lib/constants'
import { MINISTRIES } from '../lib/life'
import './Life.css'

export function Life() {
  return (
    <section className="section" id="life">
      <div className="section-inner">
        <p className="section-label">Life together</p>
        <h2 className="section-title">Our Community</h2>
        <p className="body-text">
          From worship to outreach, from kids to seniors — and the missionaries
          we send and support. This is what life at {CHURCH.shortName} looks like.
        </p>
        <div className="life-grid">
          {MINISTRIES.map((item) => (
            <article key={item.title} className="life-card">
              <div className="life-card-image">
                <ImageCarousel slides={item.images} label={item.title} />
              </div>
              <div className="life-card-text">
                <h3 className="life-card-title">{item.title}</h3>
                <p className="life-card-desc">{item.desc}</p>
              </div>
            </article>
          ))}
        </div>
        <MissionMap />
      </div>
    </section>
  )
}
