import type { Buyer, Farmer } from '../types'

export interface DemoProfile {
  id: string
  role: 'seller' | 'buyer' | 'government' | 'admin'
  name: string
  title: string
  org: string
  location: string
  initials: string
  quote: string
  story: string[]
  startPath: string
  farmerId?: string
  buyerId?: string
}

/** Named people judges meet — all fictional, grounded in Punjab CRM reality */
export const demoProfiles: DemoProfile[] = [
  {
    id: 'ramesh',
    role: 'seller',
    name: 'Ramesh Singh',
    title: 'Smallholder · 6 acres',
    org: 'Kharar, Patiala',
    location: '30.74°N, 76.65°E',
    initials: 'RS',
    quote: '12 days left for wheat. Last year I burned. This year I want the money and no notice from the thana.',
    story: [
      'Rice–wheat rotation. 2.5 acres of paddy just harvested → ~5 t straw at 2 t/acre.',
      'Cannot afford a baler alone; neighbours already stacking at the Kharar hub.',
      'KCC ending 4821. Happy Seeder booked for 18 Nov if residue is gone.',
    ],
    startPath: '/farmer',
    farmerId: 'farmer-001',
  },
  {
    id: 'simran',
    role: 'seller',
    name: 'Simran Kaur',
    title: '4 acres · already sold once',
    org: 'Sangrur',
    location: 'Sangrur district',
    initials: 'SK',
    quote: 'First lot went to AgroFeed. Credits bought urea. I will not burn the second lot.',
    story: [
      'Completed 3.2 t wheat-stubble sale last week (demo history).',
      'Wallet already holds credits from that sale — shows redemption working.',
    ],
    startPath: '/farmer/credits',
    farmerId: 'farmer-023',
  },
  {
    id: 'priya',
    role: 'buyer',
    name: 'Priya Malhotra',
    title: 'Procurement lead',
    org: 'GreenPower Biomass, Rajpura',
    location: '8 km from Kharar cluster',
    initials: 'PM',
    quote: 'Plant needs 500 t this fortnight. Moisture under 15%. Informal brokers skip 2-acre farms.',
    story: [
      '15 TPD boiler. Spec: rice straw / wheat stubble, max 15% moisture, baled preferred.',
      'Uses AgriNova to send offers to smallholders the mill never had on WhatsApp groups.',
    ],
    startPath: '/business',
    buyerId: 'buy-001',
  },
  {
    id: 'anil',
    role: 'government',
    name: 'Dr. Anil Bedi',
    title: 'District Agriculture Officer (demo)',
    org: 'Patiala',
    location: 'Aggregates only — no farmer PII on this desk',
    initials: 'AB',
    quote: 'I need utilised vs burned by block, not another Excel of names.',
    story: [
      'Sees district PM2.5 context + tonnes diverted + credits issued.',
      'Policy AI summarises CRM gaps without exposing phones or KCC numbers.',
    ],
    startPath: '/government',
  },
  {
    id: 'kavya',
    role: 'admin',
    name: 'Kavya Sharma',
    title: 'Marketplace operations',
    org: 'AgriNova',
    location: 'Platform cockpit',
    initials: 'KS',
    quote: 'If a weighbridge slip is missing, the credit stays in Evidence pending — not in the farmer wallet as cash.',
    story: [
      'Watches listings → offers → collection → ledger → MRV.',
      'Can reset the demonstration dataset for a clean judge run.',
    ],
    startPath: '/admin',
  },
]

export function enrichFarmer(f: Farmer): Farmer {
  if (f.id === 'farmer-001') {
    return {
      ...f,
      name: 'Ramesh Singh',
      village: 'Kharar',
      district: 'Patiala',
      acres: 6,
      crops: ['Rice', 'Wheat'],
      initials: 'RS',
      riceAcresThisSeason: 2.5,
      sowingWindowDays: 12,
      lastSeasonBurnedTonnes: 4.8,
      kccLast4: '4821',
      bio: 'Rice–wheat farmer. Burned last kharif under time pressure. This season listing 5 t straw.',
    }
  }
  if (f.id === 'farmer-023') {
    return {
      ...f,
      name: 'Simran Kaur',
      village: 'Sunam',
      district: 'Sangrur',
      initials: 'SK',
      riceAcresThisSeason: 2,
      sowingWindowDays: 9,
      lastSeasonBurnedTonnes: 0,
      bio: 'Sold stubble once; redeeming credits for urea.',
    }
  }
  return { ...f, initials: f.name.split(' ').map((p) => p[0]).join('').slice(0, 2) }
}

export function enrichBuyer(b: Buyer): Buyer {
  if (b.id === 'buy-001') {
    return {
      ...b,
      contactName: 'Priya Malhotra',
      contactRole: 'Procurement lead',
      plantCapacityTpd: 15,
      moistureSpecMax: 15,
    }
  }
  if (b.id === 'buy-003') {
    return { ...b, contactName: 'Harbhajan Lal', contactRole: 'Plant manager', moistureSpecMax: 18 }
  }
  return b
}
