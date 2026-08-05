import type { Buyer, EquipmentSlot, FarmerProfile, ResidueListing } from '../types'

export const farmer: FarmerProfile = {
  name: 'Rajinder Singh',
  village: 'Kharar',
  district: 'Patiala, Punjab',
  acres: 5,
  phone: '+91 98765 43210',
}

export const impactStats = {
  residueBurnedAnnually: '20 million tonnes',
  harvestWindow: '10–15 days',
  ngtFinePerAcre: 15000,
  residueValueMin: 1500,
  residueValueMax: 3000,
  pm25Multiplier: '15–20×',
}

export const initialListings: ResidueListing[] = [
  {
    id: 'lst-001',
    cropType: 'Wheat',
    quantity: 12,
    acres: 3,
    location: 'Kharar, Patiala',
    district: 'Patiala',
    status: 'paid',
    estimatedValue: 8400,
    matchedBuyer: 'GreenPower Biomass Plant',
    createdAt: '2025-10-28',
  },
  {
    id: 'lst-002',
    cropType: 'Rice',
    quantity: 8,
    acres: 2,
    location: 'Kharar, Patiala',
    district: 'Patiala',
    status: 'matched',
    estimatedValue: 5600,
    matchedBuyer: 'Punjab Paper Mills',
    createdAt: '2025-11-02',
  },
]

export const buyers: Buyer[] = [
  {
    id: 'buy-001',
    name: 'GreenPower Biomass Plant',
    type: 'Biomass Power',
    distance: 8.2,
    pricePerTon: 750,
    rating: 4.8,
  },
  {
    id: 'buy-002',
    name: 'Punjab Paper Mills',
    type: 'Paper Mill',
    distance: 14.5,
    pricePerTon: 700,
    rating: 4.6,
  },
  {
    id: 'buy-003',
    name: 'AgroFeed Cattle Unit',
    type: 'Cattle Feed',
    distance: 6.1,
    pricePerTon: 650,
    rating: 4.5,
  },
  {
    id: 'buy-004',
    name: 'CarbonEarth Biochar',
    type: 'Biochar Producer',
    distance: 22.0,
    pricePerTon: 800,
    rating: 4.9,
  },
]

export const equipmentSlots: EquipmentSlot[] = [
  { id: 'eq-001', equipment: 'Baler (Round)', date: 'Nov 8, 2025', time: '8:00 AM – 12:00 PM', available: true },
  { id: 'eq-002', equipment: 'Baler (Round)', date: 'Nov 8, 2025', time: '1:00 PM – 5:00 PM', available: false },
  { id: 'eq-003', equipment: 'Happy Seeder', date: 'Nov 9, 2025', time: '7:00 AM – 11:00 AM', available: true },
  { id: 'eq-004', equipment: 'Baler (Square)', date: 'Nov 9, 2025', time: '9:00 AM – 1:00 PM', available: true },
  { id: 'eq-005', equipment: 'Happy Seeder', date: 'Nov 10, 2025', time: '8:00 AM – 12:00 PM', available: true },
]

export const platformStats = {
  farmersHelped: 1247,
  tonnesRescued: 48200,
  co2Avoided: 96400,
  totalPaidOut: 28400000,
}

export function estimateValue(acres: number, cropType: string): number {
  const basePerAcre = cropType === 'Rice' ? 2800 : cropType === 'Wheat' ? 2400 : 2000
  return acres * basePerAcre
}

export function getBestBuyer(_quantity: number): Buyer {
  return [...buyers].sort((a, b) => b.pricePerTon - a.pricePerTon)[0]
}
