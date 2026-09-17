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
  burdwan: { lat: 23.23, lng: 87.86 },
  hooghly: { lat: 22.89, lng: 88.39 },
  nadia: { lat: 23.47, lng: 88.56 },
  madhyamgram: { lat: 22.7, lng: 88.45 },
  barasat: { lat: 22.72, lng: 88.48 },
} as const

export const DISTRICT_COORDS: Record<string, { lat: number; lng: number }> = {
  Patiala: { lat: 30.34, lng: 76.38 },
  Sangrur: { lat: 30.25, lng: 75.84 },
  Barnala: { lat: 30.37, lng: 75.55 },
  Ludhiana: { lat: 30.9, lng: 75.85 },
  Fatehgarh: { lat: 30.68, lng: 76.4 },
  'North 24 Parganas': { lat: 22.72, lng: 88.48 },
  Madhyamgram: { lat: 22.7, lng: 88.45 },
  Barasat: { lat: 22.72, lng: 88.48 },
  Burdwan: { lat: 23.23, lng: 87.86 },
  Hooghly: { lat: 22.89, lng: 88.39 },
  Nadia: { lat: 23.47, lng: 88.56 },
  Murshidabad: { lat: 24.18, lng: 88.27 },
  Malda: { lat: 25.01, lng: 88.14 },
  Howrah: { lat: 22.59, lng: 88.31 },
  Kolkata: { lat: 22.57, lng: 88.36 },
}

export function defaultParcelAround(center: { lat: number; lng: number }) {
  const dLat = 0.0011
  const dLng = 0.0014
  return [
    { lat: center.lat - dLat, lng: center.lng - dLng },
    { lat: center.lat - dLat, lng: center.lng + dLng },
    { lat: center.lat + dLat, lng: center.lng + dLng },
    { lat: center.lat + dLat, lng: center.lng - dLng },
  ]
}

export function defaultKhararRiceParcel() {
  return defaultParcelAround(MAP_CENTERS.kharar)
}
