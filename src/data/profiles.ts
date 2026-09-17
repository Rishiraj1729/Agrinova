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

/** Default booth personas — West Bengal first (KV Dum Dum field area), Punjab phone demos kept. */
export const demoProfiles: DemoProfile[] = [
  {
    id: 'ramesh',
    role: 'seller',
    name: 'Ramesh Das',
    title: 'Smallholder · 3 acres · Doltala',
    org: 'Doltala, Madhyamgram',
    location: 'North 24 Parganas, West Bengal',
    initials: 'RD',
    quote: 'Straw sits by the drain. Nobody has a pad number. If someone takes it as a lot, I will not dump it.',
    story: [
      'Peri-urban paddy leftover near Madhyamgram — wet stack / dump risk, not a dry burn sprint.',
      '3 acres → ~6 t straw at 2.0 t/acre working figure.',
      'Field book sheet: stacked; would list if pickup in five days.',
    ],
    startPath: '/farmer',
    farmerId: 'wb-farmer-001',
  },
  {
    id: 'sukumar',
    role: 'seller',
    name: 'Sukumar Roy',
    title: '2 acres · Ward 21 edge',
    org: 'Ward 21, Barasat',
    location: 'Barasat Municipality',
    initials: 'SR',
    quote: 'After rain we push it to the drain. Conservancy lifts mixed waste anyway.',
    story: [
      'Mixed into municipal biodegradable waste last season.',
      'Wants Bangla voice listing, not a scheme PDF.',
    ],
    startPath: '/farmer/sell',
    farmerId: 'wb-farmer-002',
  },
  {
    id: 'tapas',
    role: 'seller',
    name: 'Tapas Mondal',
    title: '1.5 acres · Hridaypur',
    org: 'Hridaypur, Barasat',
    location: 'September doorstep start',
    initials: 'TM',
    quote: 'Rain last week, still wet inside. Alone, nobody comes. Pool four houses.',
    story: [
      'First September sitting of the field book.',
      'Maybe on 5-day pickup — needs neighbourhood pool.',
    ],
    startPath: '/farmer',
    farmerId: 'wb-farmer-004',
  },
  {
    id: 'biswajit',
    role: 'buyer',
    name: 'Biswajit Ghosh',
    title: 'Conservancy pad staff',
    org: 'Madhyamgram compost pad',
    location: 'Madhyamgram Municipality',
    initials: 'BG',
    quote: 'We are short of clean feedstock. Mixed drain straw we will not take.',
    story: [
      'Moisture on a listing → can send one trolley.',
      'Compost-first for wet peri-urban lots.',
    ],
    startPath: '/business',
    buyerId: 'wb-buy-003',
  },
  {
    id: 'priya',
    role: 'buyer',
    name: 'Priya Malhotra',
    title: 'Procurement lead (Punjab phone demo)',
    org: 'GreenPower Biomass, Rajpura',
    location: 'Patiala belt — phone comparison',
    initials: 'PM',
    quote: 'Plant needs baled lots ≤15% moisture. Informal brokers skip 2-acre farms.',
    story: [
      'Kept as phone-comparison buyer for the burn belt.',
      'Shows the same desk serving two clocks.',
    ],
    startPath: '/business',
    buyerId: 'buy-001',
  },
  {
    id: 'anil',
    role: 'government',
    name: 'Sudip Biswas (demo desk)',
    title: 'Sanitary Inspector view · Madhyamgram',
    org: 'Madhyamgram Municipality',
    location: 'Aggregates only — no farmer phones',
    initials: 'SB',
    quote: 'I see mixed biodegradable lift. Farm straw is not a specified lot.',
    story: [
      'Ward / ULB utilisation vs dumped.',
      'Student conversation notes — not a ULB circular.',
    ],
    startPath: '/government',
  },
  {
    id: 'ward21',
    role: 'government',
    name: 'Ward 21 desk (demo)',
    title: 'Councillor view · Barasat Ward 21',
    org: 'Barasat Municipality',
    location: 'Complaints = drain / mixed waste',
    initials: 'W21',
    quote: 'I do not see tonnes that left the ward as a lot.',
    story: [
      'Public post used for student conversation framing.',
      'Aggregate utilised tonnes help the weekly note.',
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
    quote: 'If a weighbridge slip is missing, the credit stays Evidence pending.',
    story: [
      'Watches listings → offers → collection → ledger → MRV.',
      'Can reset the demonstration dataset for a clean judge run.',
    ],
    startPath: '/admin',
  },
  {
    id: 'simran',
    role: 'seller',
    name: 'Harpreet Kaur (phone)',
    title: '4.5 acres · Nabha phone',
    org: 'Nabha (phone)',
    location: 'Punjab comparison sheet',
    initials: 'HK',
    quote: 'Ten to twelve days. No plant number. We burned last year.',
    story: [
      'Punjab phone sheet in the field book.',
      'Burn clock — not the home Madhyamgram failure mode.',
    ],
    startPath: '/farmer',
    farmerId: 'farmer-023',
  },
]

export function enrichFarmer(f: Farmer): Farmer {
  if (f.id === 'wb-farmer-001') {
    return {
      ...f,
      name: 'Ramesh Das',
      village: 'Doltala',
      district: 'North 24 Parganas',
      state: 'West Bengal',
      acres: 3,
      crops: ['Rice', 'Wheat'],
      initials: 'RD',
      riceAcresThisSeason: 3,
      sowingWindowDays: 18,
      lastSeasonBurnedTonnes: 0,
      bio: 'Madhyamgram peri-urban. Last season straw stacked by the drain. Would list if pickup in five days.',
    }
  }
  if (f.id === 'wb-farmer-002') {
    return {
      ...f,
      name: 'Sukumar Roy',
      village: 'Ward 21',
      district: 'North 24 Parganas',
      state: 'West Bengal',
      acres: 2,
      initials: 'SR',
      riceAcresThisSeason: 2,
      sowingWindowDays: 20,
      lastSeasonBurnedTonnes: 0,
      bio: 'Barasat Ward 21 edge. Mixed leftover into municipal waste after rain.',
    }
  }
  if (f.id === 'wb-farmer-004') {
    return {
      ...f,
      name: 'Tapas Mondal',
      village: 'Hridaypur',
      district: 'North 24 Parganas',
      state: 'West Bengal',
      acres: 1.5,
      initials: 'TM',
      riceAcresThisSeason: 1.5,
      sowingWindowDays: 22,
      lastSeasonBurnedTonnes: 0,
      bio: 'September doorstep start. Wet heap; needs neighbourhood pool.',
    }
  }
  if (f.id === 'farmer-001') {
    return {
      ...f,
      name: 'Jaswinder Singh',
      village: 'Kharar',
      district: 'Patiala',
      acres: 6,
      crops: ['Rice', 'Wheat'],
      initials: 'JS',
      riceAcresThisSeason: 6,
      sowingWindowDays: 12,
      lastSeasonBurnedTonnes: 12,
      bio: 'Punjab phone comparison — burn window.',
    }
  }
  if (f.id === 'farmer-023') {
    return {
      ...f,
      name: 'Harpreet Kaur',
      village: 'Nabha',
      district: 'Patiala',
      initials: 'HK',
      riceAcresThisSeason: 4.5,
      sowingWindowDays: 10,
      lastSeasonBurnedTonnes: 9,
      bio: 'Punjab phone sheet — burned last season.',
    }
  }
  return { ...f, initials: f.name.split(' ').map((p) => p[0]).join('').slice(0, 2) }
}

export function enrichBuyer(b: Buyer): Buyer {
  if (b.id === 'wb-buy-003') {
    return {
      ...b,
      name: 'Madhyamgram conservancy compost',
      location: 'Madhyamgram Municipality',
      contactName: 'Biswajit Ghosh',
      contactRole: 'Pad staff',
      moistureSpecMax: 18,
      plantCapacityTpd: 8,
    }
  }
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
