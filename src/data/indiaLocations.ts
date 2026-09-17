/** India-specific location options for AgriNova login / listing forms (NCSC booth). */

export type IndiaState = 'West Bengal' | 'Punjab'

export interface WardOption {
  id: string
  label: string
  municipality: string
  district: string
}

export const INDIA_STATES: IndiaState[] = ['West Bengal', 'Punjab']

export const DISTRICTS_BY_STATE: Record<IndiaState, string[]> = {
  'West Bengal': ['North 24 Parganas', 'Hooghly', 'Nadia', 'Burdwan', 'Howrah'],
  Punjab: ['Patiala', 'Sangrur', 'Ludhiana', 'Fatehgarh Sahib'],
}

/** Peri-urban wards / neighbourhoods students can actually reach from Dum Dum */
export const WB_WARDS: WardOption[] = [
  { id: 'barasat-w21', label: 'Ward No. 21', municipality: 'Barasat Municipality', district: 'North 24 Parganas' },
  { id: 'barasat-hridaypur', label: 'Hridaypur (Ward edge)', municipality: 'Barasat Municipality', district: 'North 24 Parganas' },
  { id: 'barasat-nabapally', label: 'Nabapally', municipality: 'Barasat Municipality', district: 'North 24 Parganas' },
  { id: 'mg-doltala', label: 'Doltala', municipality: 'Madhyamgram Municipality', district: 'North 24 Parganas' },
  { id: 'mg-noapara', label: 'Noapara', municipality: 'Madhyamgram Municipality', district: 'North 24 Parganas' },
  { id: 'mg-michael', label: 'Michael Nagar', municipality: 'Madhyamgram Municipality', district: 'North 24 Parganas' },
  { id: 'mg-conservancy', label: 'Conservancy / compost pad zone', municipality: 'Madhyamgram Municipality', district: 'North 24 Parganas' },
]

export const PB_LOCALITIES: WardOption[] = [
  { id: 'pb-kharar', label: 'Kharar (phone)', municipality: 'Rural / peri-urban', district: 'Patiala' },
  { id: 'pb-nabha', label: 'Nabha (phone)', municipality: 'Rural', district: 'Patiala' },
  { id: 'pb-ghanaur', label: 'Ghanaur (phone)', municipality: 'Rural', district: 'Patiala' },
  { id: 'pb-rajpura', label: 'Rajpura rural (phone)', municipality: 'Rural', district: 'Patiala' },
]

export function localitiesFor(state: IndiaState, district: string): WardOption[] {
  if (state === 'West Bengal') {
    return WB_WARDS.filter((w) => w.district === district || district === 'North 24 Parganas')
  }
  return PB_LOCALITIES.filter((w) => w.district === district || true)
}

/** Working constants used across app + report (document accuracy). */
export const MATH = {
  strawPerAcreRice_t: 2.0,
  strawPerAcreWheat_t: 1.6,
  strawBandMin_t: 1.8,
  strawBandMax_t: 2.4,
  co2ePerTonneStraw: 1.5,
  gatePriceWorking_INR: 700,
  matchWeights: {
    distance: 22,
    rating: 22,
    demand: 18,
    moisture: 14,
    pathway: 12,
    price: 12,
  },
} as const

export function estimateStrawTonnes(acres: number, crop: 'Rice' | 'Wheat' = 'Rice') {
  const rate = crop === 'Wheat' ? MATH.strawPerAcreWheat_t : MATH.strawPerAcreRice_t
  return Math.round(acres * rate * 10) / 10
}

export function estimateAvoidedTco2e(tonnes: number) {
  return Math.round(tonnes * MATH.co2ePerTonneStraw * 10) / 10
}

export function estimateGateCashINR(tonnes: number, price = MATH.gatePriceWorking_INR) {
  return Math.round(tonnes * price)
}
