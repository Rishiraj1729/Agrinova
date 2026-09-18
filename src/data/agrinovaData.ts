import type {
  Buyer, CropRisk, CropType, Farmer, ImpactRecord, LogisticsJob,
  MarketPrice, ResidueListing, ResidueType, Transaction, WeatherEvent,
} from '../types'

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
  lat: 30.2 + (i * 0.02),
  lng: 76.3 + (i * 0.015),
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
  if (/धान|राइस|rice|भूसा|straw/i.test(text)) return { residueType: 'Rice Straw', quantity }
  if (/गेहूं|wheat|पराली|stubble/i.test(text)) return { residueType: 'Wheat Stubble', quantity }
  if (/कपास|cotton/i.test(text)) return { residueType: 'Cotton Stalks', quantity }
  return { residueType: 'Rice Straw', quantity }
}

export const scienceSteps = [
  { step: 'Problem', content: '20M tonnes of crop residue burned annually in North India — causing air pollution, soil degradation, and zero farmer income.' },
  { step: 'Observation', content: 'Farmers burn residue due to 10–15 day harvest-sowing window and lack of affordable alternatives. Buyers exist but matching is inefficient.' },
  { step: 'Research Question', content: 'Can an AI-powered platform predict risks, optimize decisions, and connect farmers to residue buyers to create income while reducing emissions?' },
  { step: 'Hypothesis', content: 'If farmers receive timely weather/risk alerts + market intelligence + automated buyer matching, they will choose selling over burning when net income > burning cost.' },
  { step: 'Data', content: 'Demo dataset: 25 farmers, 10 buyers, weather events, crop risks, market prices, residue listings, transactions (all fictional).' },
  { step: 'Model', content: 'Rule-based risk scoring + distance-weighted buyer matching + carbon impact estimation (baseline − alternative pathway).' },
  { step: 'Experiment', content: 'Simulate farmer listing 3 tonnes rice straw → platform matches buyers → logistics assigned → carbon impact calculated → income compared to burning (₹0).' },
  { step: 'Results', content: 'Estimated 3.7 t CO₂e avoided per 3t rice straw sold. Farmer earns ₹2,250 vs ₹0 from burning. Match confidence 87%.' },
  { step: 'Limitations', content: 'Demo uses fictional data. Carbon estimates are project-level, not certified credits. AI predictions show confidence intervals, not guarantees.' },
  { step: 'Conclusion', content: 'Agrinova demonstrates that integrated agricultural intelligence + circular economy can create measurable environmental and economic impact.' },
]
