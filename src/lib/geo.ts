/** Geodesic polygon area → acres (small agricultural parcels) */
export function polygonAreaAcresLatLng(points: { lat: number; lng: number }[]): number {
  if (points.length < 3) return 0
  const R = 6378137
  let area = 0
  for (let i = 0; i < points.length; i++) {
    const j = (i + 1) % points.length
    const lat1 = (points[i].lat * Math.PI) / 180
    const lat2 = (points[j].lat * Math.PI) / 180
    const lng1 = (points[i].lng * Math.PI) / 180
    const lng2 = (points[j].lng * Math.PI) / 180
    area += (lng2 - lng1) * (2 + Math.sin(lat1) + Math.sin(lat2))
  }
  const m2 = Math.abs((area * R * R) / 2)
  return Math.max(0.1, Math.round((m2 / 4046.8564224) * 10) / 10)
}

/** Kharar / Patiala farm belt defaults */
export const MAP_CENTERS = {
  kharar: { lat: 30.74, lng: 76.65 },
  sunam: { lat: 30.13, lng: 75.8 },
  rajpura: { lat: 30.48, lng: 76.59 },
  patiala: { lat: 30.34, lng: 76.38 },
} as const

export const DISTRICT_COORDS: Record<string, { lat: number; lng: number }> = {
  Patiala: { lat: 30.34, lng: 76.38 },
  Sangrur: { lat: 30.25, lng: 75.84 },
  Barnala: { lat: 30.37, lng: 75.55 },
  Ludhiana: { lat: 30.9, lng: 75.85 },
  Fatehgarh: { lat: 30.68, lng: 76.4 },
}

export function defaultKhararRiceParcel() {
  const c = MAP_CENTERS.kharar
  const dLat = 0.0011
  const dLng = 0.0014
  return [
    { lat: c.lat - dLat, lng: c.lng - dLng },
    { lat: c.lat - dLat, lng: c.lng + dLng },
    { lat: c.lat + dLat, lng: c.lng + dLng },
    { lat: c.lat + dLat, lng: c.lng - dLng },
  ]
}
