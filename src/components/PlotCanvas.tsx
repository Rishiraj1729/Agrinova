import { useMemo, useState } from 'react'
import { MapContainer, TileLayer, Polygon, Polyline, CircleMarker, useMapEvents } from 'react-leaflet'
import type { CropType } from '../types'
import type { PlotParcel } from '../contexts/AuthContext'
import { estimateStrawFromParcels } from '../contexts/AuthContext'
import { Button } from './ui/Button'
import { Label, Select } from './ui/Input'
import { recommendPathways } from '../services/recommendPathways'
import { PathwayList } from './marketplace/PathwayList'
import { MAP_CENTERS, polygonAreaAcresLatLng } from '../lib/geo'
import 'leaflet/dist/leaflet.css'

function ClickCapture({ onClick }: { onClick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onClick(e.latlng.lat, e.latlng.lng)
    },
  })
  return null
}

export function PlotCanvas({
  parcels,
  onChange,
  center = MAP_CENTERS.madhyamgram,
}: {
  parcels: PlotParcel[]
  onChange: (parcels: PlotParcel[]) => void
  center?: { lat: number; lng: number }
}) {
  const [drawing, setDrawing] = useState<{ lat: number; lng: number }[]>([])
  const [crop, setCrop] = useState<CropType>('Rice')
  const [forSale, setForSale] = useState(true)

  const strawT = estimateStrawFromParcels(parcels)
  const pathways = recommendPathways(crop === 'Wheat' ? 'Wheat Stubble' : 'Rice Straw', Math.max(1, strawT))

  const mapCenter = useMemo((): [number, number] => {
    if (parcels[0]?.points?.[0]?.lat) {
      return [parcels[0].points[0].lat, parcels[0].points[0].lng]
    }
    return [center.lat, center.lng]
  }, [parcels, center])

  function finishParcel() {
    if (drawing.length < 3) return
    const acres = polygonAreaAcresLatLng(drawing)
    onChange([
      ...parcels,
      {
        id: `p-${Date.now()}`,
        label: `${crop} block`,
        crop,
        acres,
        forSale,
        points: drawing,
      },
    ])
    setDrawing([])
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-end">
        <div>
          <Label>Crop for next draw</Label>
          <Select value={crop} onChange={(e) => setCrop(e.target.value as CropType)}>
            <option>Rice</option>
            <option>Wheat</option>
            <option>Cotton</option>
            <option>Maize</option>
          </Select>
        </div>
        <label className="flex items-center gap-2 text-sm text-nv-muted pb-2">
          <input type="checkbox" checked={forSale} onChange={(e) => setForSale(e.target.checked)} className="accent-nv-green" />
          Mark parcel for sale
        </label>
        <Button size="sm" variant="outline" onClick={() => setDrawing([])}>Clear stroke</Button>
        <Button size="sm" onClick={finishParcel} disabled={drawing.length < 3}>Save parcel</Button>
        <Button size="sm" variant="ghost" onClick={() => onChange([])}>Reset parcels</Button>
      </div>

      <p className="text-xs text-nv-muted">
        OpenStreetMap · click field corners on the real map around Madhyamgram / Barasat. Acres from geodesic area.
      </p>

      <div className="relative rounded-xl border border-nv-border overflow-hidden z-0">
        <MapContainer
          center={mapCenter}
          zoom={15}
          className="h-80 w-full"
          scrollWheelZoom
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ClickCapture
            onClick={(lat, lng) => setDrawing((d) => [...d, { lat, lng }])}
          />
          {parcels.map((p) => (
            <Polygon
              key={p.id}
              positions={p.points.map((pt) => [pt.lat, pt.lng] as [number, number])}
              pathOptions={{
                color: p.forSale ? '#138808' : '#9aab9e',
                fillColor: p.forSale ? '#138808' : '#9aab9e',
                fillOpacity: 0.35,
                weight: 2,
              }}
            />
          ))}
          {drawing.length > 0 && (
            <Polyline
              positions={drawing.map((pt) => [pt.lat, pt.lng] as [number, number])}
              pathOptions={{ color: '#f0a54a', dashArray: '6 6', weight: 2 }}
            />
          )}
          {drawing.map((pt, i) => (
            <CircleMarker
              key={`${pt.lat}-${pt.lng}-${i}`}
              center={[pt.lat, pt.lng]}
              radius={5}
              pathOptions={{ color: '#f0a54a', fillColor: '#f0a54a', fillOpacity: 1 }}
            />
          ))}
        </MapContainer>
        <div className="absolute bottom-3 right-3 z-[1000] rounded-lg bg-nv-dark/95 border border-nv-border px-3 py-2 text-xs shadow-lg">
          <p className="text-nv-muted">Sale parcels → straw</p>
          <p className="text-lg font-semibold text-nv-green">{strawT.toFixed(1)} t</p>
        </div>
      </div>

      {parcels.length > 0 && (
        <ul className="text-sm space-y-1 text-nv-muted">
          {parcels.map((p) => (
            <li key={p.id}>
              {p.label}: {p.acres} ac · {p.crop} · {p.forSale ? 'for sale' : 'keep'} · ~
              {(p.acres * (p.crop === 'Rice' ? 2 : 1.6)).toFixed(1)} t
              <span className="text-[10px] ml-2">
                ({p.points[0]?.lat.toFixed(4)}, {p.points[0]?.lng.toFixed(4)})
              </span>
            </li>
          ))}
        </ul>
      )}

      {strawT > 0 && (
        <div>
          <p className="text-sm font-medium mb-2">Best use pathways for ~{strawT.toFixed(1)} t</p>
          <PathwayList pathways={pathways} />
        </div>
      )}
    </div>
  )
}
