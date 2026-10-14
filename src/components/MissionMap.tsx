import { useEffect, useMemo, useRef, useState } from 'react'
import L from 'leaflet'
import { useInView } from '../hooks/useInView'
import { MISSIONS, missionName, type Mission } from '../lib/missions'
import { getLenis } from '../lib/lenis'
import 'leaflet/dist/leaflet.css'
import './MissionMap.css'

function resumePageScroll() {
  getLenis()?.start()
}

function countryPoints(missions: Mission[]): Record<string, [number, number]> {
  const points: Record<string, [number, number]> = {}
  for (const mission of missions) {
    points[mission.country] ??= [mission.latitude, mission.longitude]
  }
  return points
}

function makePin(active: boolean) {
  return L.divIcon({
    className: `mission-pin${active ? ' is-active' : ''}`,
    html: '<span></span>',
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, -10],
  })
}

export function MissionMap() {
  const { ref: mapSectionRef, inView } = useInView<HTMLDivElement>({ rootMargin: '280px' })
  const frameRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const markersRef = useRef<Record<string, L.Marker>>({})
  const [activeId, setActiveId] = useState<string | null>(null)
  const points = useMemo(() => countryPoints(MISSIONS), [])
  const active = MISSIONS.find((mission) => mission.id === activeId) ?? null
  const activeCountry = active?.country ?? null

  useEffect(() => {
    if (!inView) return
    const el = frameRef.current
    if (!el || mapRef.current) return

    const coarse = window.matchMedia('(pointer: coarse)').matches
    const map = L.map(el, {
      dragging: !coarse,
      scrollWheelZoom: !coarse,
      zoomControl: true,
      attributionControl: true,
      worldCopyJump: false,
      maxBounds: [[-85, -180], [85, 180]],
      maxBoundsViscosity: 0.8,
    })

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
      noWrap: true,
    }).addTo(map)

    const bounds = L.latLngBounds([])
    for (const [country, latlng] of Object.entries(points)) {
      bounds.extend(latlng)
      const marker = L.marker(latlng, { icon: makePin(false), title: country })
        .addTo(map)
        .on('click', () => {
          resumePageScroll()
          setActiveId((current) => {
            const selected = MISSIONS.find((mission) => mission.id === current)
            if (selected?.country === country) return current
            return MISSIONS.find((mission) => mission.country === country)?.id ?? null
          })
        })
      markersRef.current[country] = marker
    }
    map.fitBounds(bounds.pad(0.18))
    map.on('click dragend zoomend', resumePageScroll)
    mapRef.current = map

    const resize = () => map.invalidateSize()
    window.addEventListener('resize', resize)
    const ready = window.setTimeout(resize, 200)

    return () => {
      window.clearTimeout(ready)
      window.removeEventListener('resize', resize)
      resumePageScroll()
      map.remove()
      mapRef.current = null
      markersRef.current = {}
    }
  }, [points, inView])

  useEffect(() => {
    for (const country of Object.keys(points)) {
      markersRef.current[country]?.setIcon(makePin(country === activeCountry))
    }
    if (!activeCountry || !mapRef.current) return
    const latlng = points[activeCountry]
    mapRef.current.flyTo(latlng, 4, { duration: 0.7 })
  }, [activeCountry, points])

  const focus = (mission: Mission) => {
    resumePageScroll()
    setActiveId((current) => (current === mission.id ? null : mission.id))
  }

  return (
    <div className="missions" id="missions" ref={mapSectionRef}>
      <div className="missions-copy">
        <p className="section-label">Sent and supported</p>
        <h3 className="missions-title">Partners in Missions</h3>
        <p className="body-text">
          These are the workers and ministries we walk with. Choose a name to
          find their country on the map.
        </p>
      </div>

      <div className="missions-layout">
        <div className="missions-frame" ref={frameRef} data-lenis-prevent />
        <div className="missions-panel">
          <ul className="missions-list" data-lenis-prevent>
            {MISSIONS.map((mission) => (
              <li key={mission.id}>
                <button
                  type="button"
                  className={`missions-item${mission.id === activeId ? ' is-active' : ''}`}
                  onClick={() => focus(mission)}
                >
                  <span className="missions-item-name">{missionName(mission)}</span>
                  {mission.ministry && mission.ministry !== missionName(mission) && (
                    <span className="missions-item-ministry">{mission.ministry}</span>
                  )}
                  <span className="missions-item-place">{mission.address}</span>
                </button>
              </li>
            ))}
          </ul>
          {active && (
            <div className="missions-detail" aria-live="polite">
              <p className="missions-detail-name">{missionName(active)}</p>
              {active.ministry && active.ministry !== missionName(active) && (
                <p>{active.ministry}</p>
              )}
              {active.spouse && <p>With {active.spouse}</p>}
              <p>{active.address}</p>
              {active.phone && (
                <p>
                  <a href={`tel:${active.phone.replace(/\D/g, '')}`}>{active.phone}</a>
                </p>
              )}
              {active.email && (
                <p>
                  <a href={`mailto:${active.email}`}>{active.email}</a>
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
