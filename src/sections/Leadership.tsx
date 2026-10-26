import { ChurchHistoryTimeline } from '../components/ChurchHistoryTimeline'
import { useI18n } from '../i18n/language'
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

function LeaderCard({ leader, role, bio }: { leader: Leader; role: string; bio: string }) {
  return (
    <article className="leader-card">
      <div className="leader-photo">
        {leader.photo ? (
          <img
            src={leader.photo}
            alt={leader.photoAlt ?? leader.name}
            style={{
              ...(leader.photoAspectRatio ? { aspectRatio: leader.photoAspectRatio } : {}),
              ...(leader.photoPosition ? { objectPosition: leader.photoPosition } : {}),
            }}
          />
        ) : (
          <div className="leader-photo-empty" aria-hidden="true">
            {initials(leader.name)}
          </div>
        )}
      </div>
      <div className="leader-copy">
        <p className="leader-role">{role}</p>
        <h2 className="leader-names">
          {leader.name}
          {leader.spouse ? <span> &amp; {leader.spouse}</span> : null}
        </h2>
        <p className="body-text">{bio}</p>
      </div>
    </article>
  )
}

export function Leadership() {
  const { m } = useI18n()
  return (
    <section className="section" id="leadership">
      <div className="section-inner">
        <p className="body-text leadership-lead">{m.leadership.lead}</p>
        <div className="leadership-list">
          <LeaderCard
            leader={CHURCH.pastor}
            role={m.leadership.roles[CHURCH.pastor.title] ?? CHURCH.pastor.title}
            bio={m.leadership.bios[0]}
          />
        </div>
        <h3 className="leadership-group-title">{m.leadership.assisting}</h3>
        <div className="leadership-list">
          {ASSISTING_PASTORS.map((leader, index) => (
            <LeaderCard
              key={leader.name}
              leader={leader}
              role={m.leadership.roles[leader.title] ?? leader.title}
              bio={m.leadership.bios[index + 1]}
            />
          ))}
        </div>
        <ChurchHistoryTimeline />
      </div>
    </section>
  )
}
