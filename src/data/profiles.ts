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

/** Booth personas — West Bengal only across farmer, buyer, government, admin. */
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
      'Peri-urban paddy leftover near Madhyamgram — wet stack / dump risk.',
      '3 acres → ~6 t straw at 2.0 t/acre working figure.',
      'Would list if pickup comes in five days.',
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
    location: 'Barasat, North 24 Parganas',
    initials: 'SR',
    quote: 'After rain we push it to the drain. Conservancy lifts mixed waste anyway.',
    story: [
      'Mixed leftover into municipal biodegradable waste last season.',
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
    location: 'Barasat, North 24 Parganas',
    initials: 'TM',
    quote: 'Rain last week, still wet inside. Alone, nobody comes. Pool four houses.',
    story: [
      'Wet heap — needs a neighbourhood pool to fill a trolley.',
      'Maybe on 5-day pickup unless neighbours list together.',
    ],
    startPath: '/farmer',
    farmerId: 'wb-farmer-004',
  },
  {
    id: 'anilghosh',
    role: 'seller',
    name: 'Anil Ghosh',
    title: '4 acres · Noapara',
    org: 'Noapara, Madhyamgram',
    location: 'North 24 Parganas, West Bengal',
    initials: 'AG',
    quote: 'I sold once through a broker. Moisture fight at the gate. Put the slip on the lane first.',
    story: [
      'Sold last season via broker — still a matching problem.',
      'Wants moisture written before the truck leaves Noapara.',
    ],
    startPath: '/farmer',
    farmerId: 'wb-farmer-003',
  },
  {
    id: 'biswajit',
    role: 'buyer',
    name: 'Biswajit Ghosh',
    title: 'Compost pad staff',
    org: 'Madhyamgram compost pad',
    location: 'Madhyamgram, North 24 Parganas',
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
    id: 'rekha',
    role: 'buyer',
    name: 'Rekha Sen',
    title: 'Procurement · paper / fibre',
    org: 'Barasat paper / fibre desk',
    location: 'Barasat, North 24 Parganas',
    initials: 'RS',
    quote: 'We take drier lots. Wet Madhyamgram heaps belong at the compost pad, not here.',
    story: [
      'Paper furnish moisture cap — rejects mixed drain straw.',
      'Same AgriNova desk as the compost pad, different spec.',
    ],
    startPath: '/business',
    buyerId: 'wb-buy-001',
  },
  {
    id: 'anil',
    role: 'government',
    name: 'Sudip Biswas (demo desk)',
    title: 'Sanitary Inspector view · Madhyamgram',
    org: 'Madhyamgram ULB desk',
    location: 'North 24 Parganas, West Bengal',
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
    org: 'Barasat ULB desk',
    location: 'Barasat, North 24 Parganas',
    initials: 'W21',
    quote: 'I do not see tonnes that left the ward as a lot.',
    story: [
      'Complaints today are drain and mixed waste.',
      'Aggregate utilised tonnes help the weekly note.',
    ],
    startPath: '/government',
  },
  {
    id: 'kavya',
    role: 'admin',
    name: 'Kavya Sharma',
    title: 'Marketplace operations · Kolkata desk',
    org: 'AgriNova · KV Dum Dum booth',
    location: 'Kolkata / North 24 Parganas, West Bengal',
    initials: 'KS',
    quote: 'If a weighbridge slip is missing, the credit stays Evidence pending.',
    story: [
      'Watches Madhyamgram–Barasat listings → offers → collection → ledger.',
      'Can reset the demonstration dataset for a clean judge run.',
    ],
    startPath: '/admin',
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
  if (f.id === 'wb-farmer-003') {
    return {
      ...f,
      name: 'Anil Ghosh',
      village: 'Noapara',
      district: 'North 24 Parganas',
      state: 'West Bengal',
      acres: 4,
      initials: 'AG',
      riceAcresThisSeason: 4,
      sowingWindowDays: 18,
      lastSeasonBurnedTonnes: 0,
      bio: 'Sold once via broker. Wants moisture on the slip before the truck leaves.',
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
      bio: 'Wet heap; needs neighbourhood pool.',
    }
  }
  return { ...f, initials: f.name.split(' ').map((p) => p[0]).join('').slice(0, 2), state: f.state || 'West Bengal' }
}

export function enrichBuyer(b: Buyer): Buyer {
  if (b.id === 'wb-buy-003') {
    return {
      ...b,
      name: 'Madhyamgram compost pad',
      location: 'Madhyamgram',
      contactName: 'Biswajit Ghosh',
      contactRole: 'Pad staff',
      moistureSpecMax: 18,
      plantCapacityTpd: 8,
    }
  }
  if (b.id === 'wb-buy-001') {
    return {
      ...b,
      name: 'Barasat paper / fibre desk',
      location: 'Barasat',
      contactName: 'Rekha Sen',
      contactRole: 'Procurement',
      moistureSpecMax: 16,
      plantCapacityTpd: 10,
    }
  }
  return b
}
