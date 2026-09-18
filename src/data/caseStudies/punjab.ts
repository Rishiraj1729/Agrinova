import type { CaseStudyMeta, CropType, Farmer, Buyer, ResidueListing, ResidueType } from '../../types'
export {
  weatherEvents,
  cropRisks,
  marketPrices,
  transactions,
  impactRecords,
  logisticsJobs,
  platformStats,
  findBuyersForResidue,
  calculateCarbonImpact,
  parseVoiceInput,
  scienceSteps,
} from '../agrinovaData'

/** Optional comparison case only — live login desks do not use these personas. */
const villages = ['Kharar', 'Samana', 'Rajpura', 'Nabha', 'Patran', 'Dirba', 'Sunam', 'Sangrur', 'Barnala', 'Malerkotla']
const firstNames = ['Rajinder', 'Gurpreet', 'Harpreet', 'Balwinder', 'Manpreet', 'Jaswinder', 'Surinder', 'Kulwinder', 'Amarjit', 'Sukhwinder', 'Ranjit', 'Daljit', 'Paramjit', 'Bhupinder', 'Joginder', 'Avtar', 'Gurnam', 'Satnam', 'Harbhajan', 'Lakhwinder', 'Mandeep', 'Navdeep', 'Simran', 'Kiran', 'Pawan']
const lastNames = ['Singh', 'Kaur', 'Gill', 'Brar', 'Sandhu', 'Dhillon', 'Grewal', 'Bajwa', 'Cheema', 'Sidhu']
const crops: CropType[] = ['Rice', 'Wheat', 'Cotton', 'Sugarcane', 'Maize']

export const DEMO_FARMER_ID = 'farmer-001'

export const farmers: Farmer[] = firstNames.map((first, i) => ({
  id: `farmer-${String(i + 1).padStart(3, '0')}`,
  name: i === 0 ? 'Ramesh Singh' : i === 22 ? 'Simran Kaur' : `${first} ${lastNames[i % lastNames.length]}`,
  village: villages[i % villages.length],
  district: i === 22 ? 'Sangrur' : 'Patiala',
  state: 'Punjab',
  acres: i === 0 ? 6 : 2 + (i % 8),
  crops: [crops[i % crops.length], crops[(i + 2) % crops.length]],
  phone: `+91 9876${String(10000 + i).slice(1)}`,
  lat: 30.2 + i * 0.02,
  lng: 76.3 + i * 0.015,
}))

export const currentFarmer = farmers[0]

export const buyers: Buyer[] = [
  { id: 'buy-001', name: 'GreenPower Biomass', type: 'Biomass Plant', location: 'Rajpura', distanceKm: 8.2, pricePerTon: 750, demandTonnes: 500, rating: 4.8, residueTypes: ['Rice Straw', 'Wheat Stubble'], contactName: 'Priya Malhotra', contactRole: 'Procurement lead', plantCapacityTpd: 15, moistureSpecMax: 15 },
  { id: 'buy-002', name: 'Punjab Paper Mills', type: 'Paper Mill', location: 'Barnala', distanceKm: 14.5, pricePerTon: 700, demandTonnes: 300, rating: 4.6, residueTypes: ['Rice Straw', 'Wheat Stubble'] },
  { id: 'buy-003', name: 'AgroFeed Cattle Unit', type: 'Cattle Feed', location: 'Sangrur', distanceKm: 6.1, pricePerTon: 650, demandTonnes: 200, rating: 4.5, residueTypes: ['Rice Straw', 'Maize Stover'] },
  { id: 'buy-004', name: 'CarbonEarth Biochar', type: 'Biochar', location: 'Ludhiana', distanceKm: 22.0, pricePerTon: 800, demandTonnes: 150, rating: 4.9, residueTypes: ['Rice Straw', 'Wheat Stubble', 'Cotton Stalks'] },
  { id: 'buy-005', name: 'EcoPack Industries', type: 'Packaging', location: 'Mohali', distanceKm: 18.0, pricePerTon: 720, demandTonnes: 100, rating: 4.4, residueTypes: ['Rice Straw'] },
  { id: 'buy-006', name: 'VerdeCompost', type: 'Compost Unit', location: 'Patiala', distanceKm: 5.5, pricePerTon: 600, demandTonnes: 250, rating: 4.3, residueTypes: ['Wheat Stubble', 'Maize Stover', 'Sugarcane Tops'] },
  { id: 'buy-007', name: 'NorthBio Energy', type: 'Biomass Plant', location: 'Ambala', distanceKm: 35.0, pricePerTon: 680, demandTonnes: 400, rating: 4.7, residueTypes: ['Rice Straw', 'Cotton Stalks'] },
  { id: 'buy-008', name: 'Haryana Feed Co.', type: 'Cattle Feed', location: 'Karnal', distanceKm: 42.0, pricePerTon: 630, demandTonnes: 180, rating: 4.2, residueTypes: ['Wheat Stubble', 'Maize Stover'] },
  { id: 'buy-009', name: 'Punjab Biochar Hub', type: 'Biochar', location: 'Bathinda', distanceKm: 55.0, pricePerTon: 820, demandTonnes: 120, rating: 4.8, residueTypes: ['Rice Straw', 'Cotton Stalks'] },
  { id: 'buy-010', name: 'AgriCircle Logistics', type: 'Paper Mill', location: 'Jalandhar', distanceKm: 48.0, pricePerTon: 710, demandTonnes: 220, rating: 4.5, residueTypes: ['Rice Straw', 'Wheat Stubble', 'Sugarcane Tops'] },
]

const residueTypes: ResidueType[] = ['Rice Straw', 'Wheat Stubble', 'Cotton Stalks', 'Maize Stover']

export const residueListings: ResidueListing[] = farmers.slice(0, 12).map((f, i) => ({
  id: `lst-${String(i + 1).padStart(3, '0')}`,
  farmerId: f.id,
  farmerName: f.name,
  residueType: residueTypes[i % residueTypes.length],
  crop: f.crops[0],
  quantityTonnes: 2 + (i % 6) * 1.5,
  location: `${f.village}, ${f.district}`,
  status: (['listed', 'matched', 'in_transit', 'delivered', 'paid'] as const)[i % 5],
  pricePerTon: 650 + (i % 5) * 30,
  matchedBuyerId: i > 0 ? buyers[i % buyers.length].id : undefined,
  createdAt: `2025-11-${String(1 + i).padStart(2, '0')}`,
  region: 'punjab',
}))

export const punjabCaseStudy: CaseStudyMeta = {
  region: 'punjab',
  title: 'Punjab — Rice Straw & Stubble Burning',
  problem:
    'Punjab produces millions of tonnes of rice straw annually. Narrow harvest-to-sowing windows push farmers toward field burning, causing air pollution and lost biomass value.',
  methodology:
    'Optional phone comparison only. Live AgriNova desks default to Kolkata / West Bengal Bengali personas.',
  observations: [
    'Peak burning aligns with late-October to mid-November harvest pressure.',
    'Biomass plants exist within 15–35 km but matching is informal.',
    'Farmers respond to net income after transport and baling costs.',
  ],
  limitations: [
    'All farmer and buyer records are fictional demonstration data.',
    'Carbon figures are model estimates, not certified credits.',
    'Logistics costs are illustrative.',
  ],
  provenance: 'DEMONSTRATION_DATA',
  baseline: {
    farmers: 25,
    buyers: 10,
    tonnesRescued: 482,
    co2Avoided: 964,
    totalIncome: 2840000,
  },
  districts: ['Patiala', 'Sangrur', 'Barnala', 'Malerkotla', 'Rajpura'],
}
