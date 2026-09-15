import type { Buyer, CaseStudyMeta, Farmer, ResidueListing, ResidueType } from '../../types'

const wbVillages = ['Burdwan', 'Hooghly', 'Nadia', 'Murshidabad', 'Malda', 'Krishnanagar', 'Ranaghat']
const wbNames = [
  'Ramesh Das', 'Sukumar Roy', 'Anil Ghosh', 'Pradip Sen', 'Tapas Mondal',
  'Biplab Banerjee', 'Sanjay Mitra', 'Arun Bhattacharya', 'Debashis Sarkar', 'Kamal Haldar',
]

export const wbFarmers: Farmer[] = wbNames.map((name, i) => ({
  id: `wb-farmer-${String(i + 1).padStart(3, '0')}`,
  name,
  village: wbVillages[i % wbVillages.length],
  district: ['Burdwan', 'Hooghly', 'Nadia', 'Murshidabad'][i % 4],
  state: 'West Bengal',
  acres: 1.5 + (i % 5),
  crops: ['Rice', 'Wheat'],
  phone: `+91 9831${String(20000 + i).slice(1)}`,
  lat: 22.5 + i * 0.03,
  lng: 88.3 + i * 0.02,
}))

export const wbCurrentFarmer = wbFarmers[0]

export const wbBuyers: Buyer[] = [
  { id: 'wb-buy-001', name: 'Ganga Biomass Co-op', type: 'Biomass Plant', location: 'Burdwan', distanceKm: 12, pricePerTon: 680, demandTonnes: 400, rating: 4.6, residueTypes: ['Rice Straw'] },
  { id: 'wb-buy-002', name: 'Bengal Paper Works', type: 'Paper Mill', location: 'Hooghly', distanceKm: 18, pricePerTon: 640, demandTonnes: 250, rating: 4.4, residueTypes: ['Rice Straw', 'Wheat Stubble'] },
  { id: 'wb-buy-003', name: 'Delta Compost', type: 'Compost Unit', location: 'Nadia', distanceKm: 9, pricePerTon: 590, demandTonnes: 180, rating: 4.3, residueTypes: ['Rice Straw'] },
  { id: 'wb-buy-004', name: 'East Biochar', type: 'Biochar', location: 'Malda', distanceKm: 45, pricePerTon: 760, demandTonnes: 120, rating: 4.7, residueTypes: ['Rice Straw'] },
]

const residueTypes: ResidueType[] = ['Rice Straw', 'Wheat Stubble']

export const wbListings: ResidueListing[] = wbFarmers.slice(0, 8).map((f, i) => ({
  id: `wb-lst-${String(i + 1).padStart(3, '0')}`,
  farmerId: f.id,
  farmerName: f.name,
  residueType: residueTypes[i % 2],
  crop: 'Rice',
  quantityTonnes: 1.5 + (i % 4),
  location: `${f.village}, ${f.district}`,
  status: 'listed',
  pricePerTon: 620 + i * 15,
  createdAt: '2025-11-05',
  region: 'west-bengal',
  provenance: 'DEMONSTRATION_DATA',
}))

export const westBengalCaseStudy: CaseStudyMeta = {
  region: 'west-bengal',
  title: 'West Bengal — Paddy Residue Utilisation',
  problem:
    'High paddy intensity in eastern districts generates surplus straw with uneven buyer access compared to northwest India.',
  methodology:
    'Demonstration dataset of 10 farmers and 4 buyers across Burdwan, Hooghly, Nadia, and Murshidabad for comparative simulation.',
  observations: [
    'Moisture and monsoon timing affect straw stacking and transport.',
    'Shorter haul distances to compost units are competitive on net price.',
    'Jute-rice rotations create mixed residue streams.',
  ],
  limitations: [
    'Smaller demo sample than Punjab module.',
    'No live government API integration.',
  ],
  provenance: 'DEMONSTRATION_DATA',
  baseline: {
    farmers: 10,
    buyers: 4,
    tonnesRescued: 156,
    co2Avoided: 312,
    totalIncome: 890000,
  },
  districts: ['Burdwan', 'Hooghly', 'Nadia', 'Murshidabad', 'Malda'],
}

export const wbPlatformStats = westBengalCaseStudy.baseline
