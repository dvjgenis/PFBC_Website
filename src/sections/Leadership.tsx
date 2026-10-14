import { ChurchHistoryTimeline } from '../components/ChurchHistoryTimeline'
import { ASSISTING_PASTORS, CHURCH, type Leader } from '../lib/constants'
import './Leadership.css'

function initials(name: string) {
  return name
    .replace(/^Pastor\s+/i, '')
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function LeaderCard({ leader }: { leader: Leader }) {
  return (
    <article className="leader-card">
      <div className="leader-photo">
        {leader.photo ? (
          <img
            src={leader.photo}
            alt={leader.photoAlt ?? leader.name}
            style={leader.photoPosition ? { objectPosition: leader.photoPosition } : undefined}
          />
        ) : (
          <div className="leader-photo-empty" aria-hidden="true">
            {initials(leader.name)}
          </div>
        )}
      </div>
      <div className="leader-copy">
        <p className="leader-role">{leader.title}</p>
        <h2 className="leader-names">
          {leader.name}
          {leader.spouse ? <span> &amp; {leader.spouse}</span> : null}
        </h2>
        <p className="body-text">{leader.bio}</p>
      </div>
    </article>
  )
}

export function Leadership() {
  return (
    <section className="section" id="leadership">
      <div className="section-inner">
        <p className="body-text leadership-lead">
          Meet the shepherds who lead {CHURCH.name} — and the pastors who serve
          this family.
        </p>
        <div className="leadership-list">
          <LeaderCard leader={CHURCH.pastor} />
        </div>
        <h3 className="leadership-group-title">Assisting Pastors</h3>
        <div className="leadership-list">
          {ASSISTING_PASTORS.map((leader) => (
            <LeaderCard key={leader.name} leader={leader} />
          ))}
        </div>
        <ChurchHistoryTimeline />
      </div>
    </section>
  )
}
