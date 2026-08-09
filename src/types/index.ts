export type Lang = 'en' | 'hi' | 'bn'

export type CropType = 'Rice' | 'Wheat' | 'Cotton' | 'Sugarcane' | 'Maize'
export type ResidueType = 'Rice Straw' | 'Wheat Stubble' | 'Cotton Stalks' | 'Sugarcane Tops' | 'Maize Stover'

export interface Farmer {
  id: string
  name: string
  village: string
  district: string
  state: string
  acres: number
  crops: CropType[]
  phone: string
  lat: number
  lng: number
}

export interface Buyer {
  id: string
  name: string
  type: 'Biomass Plant' | 'Paper Mill' | 'Cattle Feed' | 'Biochar' | 'Packaging' | 'Compost Unit'
  location: string
  distanceKm: number
  pricePerTon: number
  demandTonnes: number
  rating: number
  residueTypes: ResidueType[]
}

export interface ResidueListing {
  id: string
  farmerId: string
  farmerName: string
  residueType: ResidueType
  crop: CropType
  quantityTonnes: number
  location: string
  status: 'listed' | 'matched' | 'in_transit' | 'delivered' | 'paid'
  pricePerTon: number
  matchedBuyerId?: string
  createdAt: string
}

export interface WeatherEvent {
  id: string
  type: 'heatwave' | 'heavy_rain' | 'drought' | 'frost' | 'cyclone'
  severity: 'low' | 'medium' | 'high'
  date: string
  district: string
  confidence: number
  description: string
}

export interface CropRisk {
  crop: CropType
  riskLevel: 'low' | 'medium' | 'high'
  confidence: number
  reason: string
  recommendation: string
  updatedAt: string
}

export interface MarketPrice {
  crop: CropType
  msp: number
  mandiAvg: number
  demandIndex: number
  trend: 'up' | 'down' | 'stable'
  updatedAt: string
}

export interface Transaction {
  id: string
  listingId: string
  buyerId: string
  farmerId: string
  amount: number
  quantityTonnes: number
  status: 'completed' | 'pending'
  date: string
}

export interface ImpactRecord {
  id: string
  farmerId: string
  baselineEmissions: number
  alternativeEmissions: number
  avoidedEmissions: number
  residueType: ResidueType
  quantityTonnes: number
  note: string
}

export interface LogisticsJob {
  id: string
  listingId: string
  from: string
  to: string
  distanceKm: number
  eta: string
  status: 'scheduled' | 'in_transit' | 'delivered'
  vehicle: string
}
