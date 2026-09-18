import { MapContainer, TileLayer, CircleMarker, Circle, Popup, useMap } from 'react-leaflet'
import { useEffect, useState } from 'react'
import {
  agrinovaOperationalSites,
  districtUtilisation,
  livePollutionSnapshot,
  pollutionHeatCells,
} from '../data/punjabPollution'
import { DISTRICT_COORDS } from '../lib/geo'
import { SourceNote } from './SourceNote'
import { formatINR } from '../lib/utils'
import 'leaflet/dist/leaflet.css'

function colorFor(pm: number) {
  if (pm >= 160) return '#dc2626'
  if (pm >= 140) return '#ea580c'
  if (pm >= 120) return '#ca8a04'
  return '#2563eb'
}

function heatColor(intensity: number) {
  if (intensity >= 0.85) return '#b91c1c'
  if (intensity >= 0.65) return '#ea580c'
  if (intensity >= 0.45) return '#ca8a04'
  return '#65a30d'
}

function FlyToSelected({ selected }: { selected?: string }) {
  const map = useMap()
  useEffect(() => {
    if (!selected || !DISTRICT_COORDS[selected]) return
    const c = DISTRICT_COORDS[selected]
    map.flyTo([c.lat, c.lng], 10, { duration: 0.8 })
  }, [selected, map])
  return null
}

export function PunjabPollutionMap({
  selected,
  onSelect,
  showOps = true,
}: {
  selected?: string
  onSelect?: (d: string) => void
  showOps?: boolean
}) {
  const [layer, setLayer] = useState<'heat' | 'ops' | 'both'>('both')

  return (
    <div className="overflow-hidden rounded-sm border border-[#c5cad3] bg-white text-slate-900 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-2 border-b border-[#e2e5eb] bg-[#f7f8fa] px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-[#0b3d91]">West Bengal leftover heatmap</p>
          <p className="text-xs text-slate-600">
            {livePollutionSnapshot.asOf} · AQI {livePollutionSnapshot.aqiBand}
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-red-700">{livePollutionSnapshot.pm25ugm3}</p>
          <p className="text-[11px] text-slate-500">µg/m³ PM2.5 (demo)</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 border-b border-[#e2e5eb] px-3 py-2">
        {(
          [
            ['heat', 'Pollution heat'],
            ['ops', 'AgriNova sites'],
            ['both', 'Both layers'],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setLayer(id)}
            className={`rounded-sm px-2.5 py-1 text-[11px] font-medium ${
              layer === id ? 'bg-[#0b3d91] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="relative z-0 h-80">
        <MapContainer center={[22.71, 88.46]} zoom={11} className="h-full w-full" scrollWheelZoom>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FlyToSelected selected={selected} />

          {(layer === 'heat' || layer === 'both') &&
            pollutionHeatCells.map((cell) => (
              <Circle
                key={cell.id}
                center={[cell.lat, cell.lng]}
                radius={6000 + cell.intensity * 9000}
                pathOptions={{
                  color: heatColor(cell.intensity),
                  weight: 0,
                  fillColor: heatColor(cell.intensity),
                  fillOpacity: 0.18 + cell.intensity * 0.28,
                }}
              >
                <Popup>
                  <strong>{cell.label}</strong>
                  <br />
                  Heat intensity {(cell.intensity * 100).toFixed(0)}% (demo model)
                </Popup>
              </Circle>
            ))}

          {(layer === 'heat' || layer === 'both') &&
            districtUtilisation.map((d) => {
              const c = DISTRICT_COORDS[d.district]
              if (!c) return null
              const active = selected === d.district
              return (
                <CircleMarker
                  key={d.district}
                  center={[c.lat, c.lng]}
                  radius={active ? 14 : 10}
                  pathOptions={{
                    color: '#fff',
                    weight: active ? 2 : 1,
                    fillColor: colorFor(d.pm25Index),
                    fillOpacity: 0.9,
                  }}
                  eventHandlers={{ click: () => onSelect?.(d.district) }}
                >
                  <Popup>
                    <strong>{d.district}</strong>
                    <br />
                    PM2.5 index: {d.pm25Index}
                    <br />
                    Burned / dumped: {d.burned}t · Utilised: {d.utilised}t
                  </Popup>
                </CircleMarker>
              )
            })}

          {showOps &&
            (layer === 'ops' || layer === 'both') &&
            agrinovaOperationalSites.map((site) => (
              <CircleMarker
                key={site.id}
                center={[site.lat, site.lng]}
                radius={9}
                pathOptions={{
                  color: '#fff',
                  weight: 2,
                  fillColor: site.status === 'operational' ? '#138808' : '#0b3d91',
                  fillOpacity: 1,
                }}
                eventHandlers={{ click: () => onSelect?.(site.district) }}
              >
                <Popup>
                  <strong>{site.name}</strong>
                  <br />
                  Status: {site.status}
                  <br />
                  Straw diverted: {site.strawDivertedT} t
                  <br />
                  Farmer income: {formatINR(site.farmerIncomeInr)}
                  <br />
                  tCO₂e avoided: {site.co2eAvoidedT}
                </Popup>
              </CircleMarker>
            ))}
        </MapContainer>
      </div>

      <div className="flex flex-wrap gap-3 border-t border-[#e2e5eb] bg-[#f7f8fa] px-4 py-2 text-[10px] text-slate-600">
        <span className="inline-flex items-center gap-1">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-red-700" /> High dump / mix heat
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#138808]" /> AgriNova operational
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#0b3d91]" /> Pilot scaling
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5 px-3 py-2">
        {districtUtilisation.map((d) => (
          <button
            key={d.district}
            type="button"
            onClick={() => onSelect?.(d.district)}
            className={`rounded-sm border px-2 py-1 text-[11px] ${
              selected === d.district
                ? 'border-[#0b3d91] bg-[#0b3d91]/10 font-semibold text-[#0b3d91]'
                : 'border-slate-200 text-slate-600'
            }`}
          >
            {d.district}
          </button>
        ))}
      </div>
      <div className="px-4 pb-3">
        <SourceNote provenance="PUBLIC_DATA">
          OSM basemap. Heat blobs are demo dump/mix intensity, not CPCB sensors. Green markers =
          AgriNova operational demo clusters around Madhyamgram–Barasat.
        </SourceNote>
      </div>
    </div>
  )
}
