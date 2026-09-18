import type {
  Buyer, CropRisk, CropType, Farmer, ImpactRecord, LogisticsJob,
  MarketPrice, ResidueListing, ResidueType, Transaction, WeatherEvent,
} from '../types'

const villages = ['Dum Dum', 'Lake Town', 'Belgachia', 'Sinthi', 'Patipukur', 'Doltala', 'Noapara', 'Hridaypur', 'Nabapally', 'Barasat']
const firstNames = ['Ramesh', 'Sukumar', 'Anil', 'Tapas', 'Kamal', 'Arun', 'Biplab', 'Sanjay', 'Debashis', 'Pradip', 'Gopal', 'Nirmal', 'Ashok', 'Bikash', 'Chandan', 'Dipak', 'Goutam', 'Hari', 'Indrajit', 'Jayanta', 'Kalyan', 'Manas', 'Mita', 'Namita', 'Partha']
const lastNames = ['Das', 'Roy', 'Ghosh', 'Mondal', 'Sen', 'Banerjee', 'Chatterjee', 'Mukherjee', 'Bose', 'Dutta']

const crops: CropType[] = ['Rice', 'Wheat', 'Cotton', 'Sugarcane', 'Maize']

export const DEMO_FARMER_ID = 'farmer-001'

export const farmers: Farmer[] = firstNames.map((first, i) => ({
  id: `farmer-${String(i + 1).padStart(3, '0')}`,
  name: i === 0 ? 'Ramesh Das' : i === 22 ? 'Mita Banerjee' : `${first} ${lastNames[i % lastNames.length]}`,
  village: villages[i % villages.length],
  district: i < 5 ? 'Kolkata' : 'North 24 Parganas',
  state: 'West Bengal',
  acres: i === 0 ? 3 : 1.5 + (i % 5),
  crops: [crops[i % 2], crops[(i + 1) % 2]],
  phone: `+91 9831${String(20000 + i).slice(1)}`,
  lat: 22.57 + (i * 0.008),
  lng: 88.36 + (i * 0.006),
}))

export const currentFarmer = farmers[0]

export const buyers: Buyer[] = [
  { id: 'buy-001', name: 'Barasat paper / fibre desk', type: 'Paper Mill', location: 'Barasat', distanceKm: 8, pricePerTon: 640, demandTonnes: 120, rating: 4.4, residueTypes: ['Rice Straw'], contactName: 'Rekha Sen', contactRole: 'Procurement', plantCapacityTpd: 10, moistureSpecMax: 16 },
  { id: 'buy-002', name: 'North 24 Pgs biomass co-op', type: 'Biomass Plant', location: 'Barrackpore belt', distanceKm: 14, pricePerTon: 680, demandTonnes: 200, rating: 4.5, residueTypes: ['Rice Straw', 'Wheat Stubble'] },
  { id: 'buy-003', name: 'Dum Dum ward compost pad', type: 'Compost Unit', location: 'Kolkata', distanceKm: 4, pricePerTon: 590, demandTonnes: 90, rating: 4.6, residueTypes: ['Rice Straw'], contactName: 'Biswajit Ghosh', contactRole: 'Pad staff', plantCapacityTpd: 8, moistureSpecMax: 18 },
  { id: 'buy-004', name: 'Kolkata metro biogas trial', type: 'Biochar', location: 'Kolkata', distanceKm: 10, pricePerTon: 610, demandTonnes: 80, rating: 4.2, residueTypes: ['Rice Straw'] },
  { id: 'buy-005', name: 'Howrah fibre mill', type: 'Packaging', location: 'Howrah', distanceKm: 16, pricePerTon: 630, demandTonnes: 70, rating: 4.3, residueTypes: ['Rice Straw'] },
  { id: 'buy-006', name: 'Hooghly compost unit', type: 'Compost Unit', location: 'Hooghly', distanceKm: 22, pricePerTon: 580, demandTonnes: 85, rating: 4.1, residueTypes: ['Rice Straw', 'Wheat Stubble'] },
  { id: 'buy-007', name: 'Nadia paddy desk', type: 'Biomass Plant', location: 'Nadia', distanceKm: 35, pricePerTon: 650, demandTonnes: 110, rating: 4.4, residueTypes: ['Rice Straw'] },
  { id: 'buy-008', name: 'Barrackpore cattle feed', type: 'Cattle Feed', location: 'Barrackpore', distanceKm: 12, pricePerTon: 600, demandTonnes: 60, rating: 4.0, residueTypes: ['Rice Straw', 'Wheat Stubble'] },
  { id: 'buy-009', name: 'New Town biochar desk', type: 'Biochar', location: 'New Town', distanceKm: 18, pricePerTon: 700, demandTonnes: 50, rating: 4.5, residueTypes: ['Rice Straw'] },
  { id: 'buy-010', name: 'Madhyamgram Udayrajpur pad', type: 'Compost Unit', location: 'Madhyamgram', distanceKm: 7, pricePerTon: 590, demandTonnes: 75, rating: 4.6, residueTypes: ['Rice Straw'] },
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
}))

export const weatherEvents: WeatherEvent[] = [
  { id: 'wx-001', type: 'heavy_rain', severity: 'high', date: '2025-11-12', district: 'North 24 Parganas', confidence: 82, description: 'Rain expected — keep leftover straw off the drain; compost-first if the heap stays wet' },
  { id: 'wx-002', type: 'heatwave', severity: 'medium', date: '2025-11-15', district: 'Barasat', confidence: 71, description: 'Humid heat — scout rice leaves after fog; use Kisan Bandhu sample scan' },
  { id: 'wx-003', type: 'drought', severity: 'low', date: '2025-11-20', district: 'Hooghly', confidence: 58, description: 'Below-average rainfall trend — monitor soil moisture before next sowing' },
]

export const cropRisks: CropRisk[] = [
  { crop: 'Rice', riskLevel: 'high', confidence: 78, reason: 'Wet leftover + drain dump after rain around Madhyamgram–Barasat', recommendation: 'List moisture today, keep heap off the drain, prefer compost pad for wet lots', updatedAt: '2025-11-08' },
  { crop: 'Wheat', riskLevel: 'medium', confidence: 65, reason: 'Late rice leftover delays rabi prep on small peri-urban plots', recommendation: 'Remove residue as a listed lot; do not mix into household waste', updatedAt: '2025-11-08' },
  { crop: 'Cotton', riskLevel: 'low', confidence: 72, reason: 'Limited cotton in this cluster — demo only', recommendation: 'Continue standard IPM if grown', updatedAt: '2025-11-07' },
]

export const marketPrices: MarketPrice[] = crops.map((crop, i) => ({
  crop,
  msp: [2300, 2275, 7121, 3400, 2225][i],
  mandiAvg: [2280, 2250, 7050, 3350, 2180][i],
  demandIndex: [85, 78, 62, 55, 70][i],
  trend: (['up', 'stable', 'down', 'stable', 'up'] as const)[i],
  updatedAt: '2025-11-08',
}))

export const transactions: Transaction[] = residueListings
  .filter((l) => l.status === 'paid' || l.status === 'delivered')
  .map((l, i) => ({
    id: `txn-${String(i + 1).padStart(3, '0')}`,
    listingId: l.id,
    buyerId: l.matchedBuyerId ?? buyers[0].id,
    farmerId: l.farmerId,
    amount: l.quantityTonnes * l.pricePerTon,
    quantityTonnes: l.quantityTonnes,
    status: l.status === 'paid' ? 'completed' as const : 'pending' as const,
    date: l.createdAt,
  }))

export const impactRecords: ImpactRecord[] = [
  { id: 'imp-001', farmerId: DEMO_FARMER_ID, baselineEmissions: 4.5, alternativeEmissions: 0.8, avoidedEmissions: 3.7, residueType: 'Rice Straw', quantityTonnes: 3, note: 'Burning vs selling to biomass plant' },
  { id: 'imp-002', farmerId: 'farmer-002', baselineEmissions: 3.0, alternativeEmissions: 0.5, avoidedEmissions: 2.5, residueType: 'Wheat Stubble', quantityTonnes: 2, note: 'Burning vs composting pathway' },
  { id: 'imp-003', farmerId: 'farmer-003', baselineEmissions: 6.0, alternativeEmissions: 1.2, avoidedEmissions: 4.8, residueType: 'Rice Straw', quantityTonnes: 4, note: 'Burning vs biochar production' },
]

export const logisticsJobs: LogisticsJob[] = [
  { id: 'log-001', listingId: 'lst-002', from: 'Doltala, Madhyamgram', to: 'Madhyamgram compost pad', distanceKm: 4, eta: 'Nov 10, 2:00 PM', status: 'in_transit', vehicle: 'Trolley WB-26-4521' },
  { id: 'log-002', listingId: 'lst-003', from: 'Noapara, Madhyamgram', to: 'Barasat paper / fibre desk', distanceKm: 8, eta: 'Nov 11, 10:00 AM', status: 'scheduled', vehicle: 'Truck WB-24-8876' },
]

export const platformStats = {
  totalFarmers: 25,
  totalBuyers: 10,
  tonnesRescued: 482,
  co2Avoided: 964,
  totalIncome: 2840000,
  activeListings: 8,
}

export function findBuyersForResidue(residueType: ResidueType, quantity: number) {
  return buyers
    .filter((b) => b.residueTypes.includes(residueType))
    .map((b) => ({
      ...b,
      matchScore: Math.round(
        (b.rating / 5) * 40 +
        (1 - Math.min(b.distanceKm, 50) / 50) * 35 +
        (Math.min(b.demandTonnes, quantity) / quantity) * 25
      ),
      estimatedValue: quantity * b.pricePerTon,
    }))
    .sort((a, b) => b.matchScore - a.matchScore)
}

export function calculateCarbonImpact(quantityTonnes: number, pathway: 'burn' | 'sell') {
  const baselinePerTonne = 1.5
  const baseline = quantityTonnes * baselinePerTonne
  const alternative = pathway === 'sell' ? quantityTonnes * 0.25 : 0
  return { baseline, alternative, avoided: baseline - alternative }
}

export function parseVoiceInput(text: string): { residueType: ResidueType; quantity: number } | null {
  const qtyMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:टन|ton|tonne)/i) || text.match(/(तीन|दो|चार|पांच|छह|एक|1|2|3|4|5|6)/)
  const hindiNums: Record<string, number> = { एक: 1, दो: 2, तीन: 3, चार: 4, पांच: 5, छह: 6 }
  let quantity = 3
  if (qtyMatch) {
    quantity = hindiNums[qtyMatch[1]] ?? parseFloat(qtyMatch[1])
  }
  if (/ধান|খড়|धान|राइस|rice|भूसा|straw/i.test(text)) return { residueType: 'Rice Straw', quantity }
  if (/গম|गेहूं|wheat|पराली|stubble/i.test(text)) return { residueType: 'Wheat Stubble', quantity }
  if (/कपास|cotton/i.test(text)) return { residueType: 'Cotton Stalks', quantity }
  return { residueType: 'Rice Straw', quantity }
}

export const scienceSteps = [
  { step: 'Problem', content: 'Peri-urban paddy leftover around Kolkata dumps, rots, or mixes into municipal waste — compost pads stay short of clean feedstock.' },
  { step: 'Observation', content: 'Small Bengali lots never become a listing. Wet heaps fail dry biomass specs; compost-first is the working path.' },
  { step: 'Research Question', content: 'Can an AI-powered platform predict risks, optimize decisions, and connect farmers to residue buyers to create income while reducing emissions?' },
  { step: 'Hypothesis', content: 'If farmers receive timely weather/risk alerts + market intelligence + automated buyer matching, they will choose selling over burning when net income > burning cost.' },
  { step: 'Data', content: 'Demo dataset: 25 farmers, 10 buyers, weather events, crop risks, market prices, residue listings, transactions (all fictional).' },
  { step: 'Model', content: 'Rule-based risk scoring + distance-weighted buyer matching + carbon impact estimation (baseline − alternative pathway).' },
  { step: 'Experiment', content: 'Simulate farmer listing 3 tonnes rice straw → platform matches buyers → logistics assigned → carbon impact calculated → income compared to burning (₹0).' },
  { step: 'Results', content: 'Estimated 3.7 t CO₂e avoided per 3t rice straw sold. Farmer earns ₹2,250 vs ₹0 from burning. Match confidence 87%.' },
  { step: 'Limitations', content: 'Demo uses fictional data. Carbon estimates are project-level, not certified credits. AI predictions show confidence intervals, not guarantees.' },
  { step: 'Conclusion', content: 'Agrinova demonstrates that integrated agricultural intelligence + circular economy can create measurable environmental and economic impact.' },
]
