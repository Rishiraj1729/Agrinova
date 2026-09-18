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

/** Booth personas — Bengali people, Kolkata metro, across farmer, buyer, government, admin. */
export const demoProfiles: DemoProfile[] = [
  {
    id: 'ramesh',
    role: 'seller',
    name: 'Ramesh Das',
    title: 'Smallholder · 3 acres · Dum Dum',
    org: 'Dum Dum, Kolkata',
    location: 'Kolkata, West Bengal',
    initials: 'RD',
    quote: 'Straw sits by the drain. Nobody has a pad number. If someone takes it as a lot, I will not dump it.',
    story: [
      'Peri-urban paddy leftover near Dum Dum — wet stack / dump risk.',
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
    title: '2 acres · Lake Town',
    org: 'Lake Town, Kolkata',
    location: 'Kolkata, West Bengal',
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
    title: '1.5 acres · Belgachia',
    org: 'Belgachia, Kolkata',
    location: 'Kolkata, West Bengal',
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
    title: '4 acres · Sinthi',
    org: 'Sinthi, Kolkata',
    location: 'Kolkata, West Bengal',
    initials: 'AG',
    quote: 'I sold once through a broker. Moisture fight at the gate. Put the slip on the lane first.',
    story: [
      'Sold last season via broker — still a matching problem.',
      'Wants moisture written before the truck leaves Sinthi.',
    ],
    startPath: '/farmer',
    farmerId: 'wb-farmer-003',
  },
  {
    id: 'biswajit',
    role: 'buyer',
    name: 'Biswajit Ghosh',
    title: 'Compost pad staff',
    org: 'Dum Dum ward compost pad',
    location: 'Kolkata, West Bengal',
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
    org: 'North Kolkata paper desk',
    location: 'Kolkata, West Bengal',
    initials: 'RS',
    quote: 'We take drier lots. Wet Dum Dum heaps belong at the compost pad, not here.',
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
    title: 'Sanitary Inspector view · Kolkata',
    org: 'KMC / Dum Dum desk',
    location: 'Kolkata, West Bengal',
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
    name: 'Borough desk (demo)',
    title: 'Councillor view · Dum Dum ward',
    org: 'Kolkata borough desk',
    location: 'Kolkata, West Bengal',
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
    name: 'Kavya Banerjee',
    title: 'Marketplace operations · Kolkata desk',
    org: 'AgriNova · KV Dum Dum booth',
    location: 'Kolkata, West Bengal',
    initials: 'KB',
    quote: 'If a weighbridge slip is missing, the credit stays Evidence pending.',
    story: [
      'Watches Kolkata–Dum Dum listings → offers → collection → ledger.',
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
      village: 'Dum Dum',
      district: 'Kolkata',
      state: 'West Bengal',
      acres: 3,
      crops: ['Rice', 'Wheat'],
      initials: 'RD',
      riceAcresThisSeason: 3,
      sowingWindowDays: 18,
      lastSeasonBurnedTonnes: 0,
      bio: 'Dum Dum peri-urban. Last season straw stacked by the drain. Would list if pickup in five days.',
    }
  }
  if (f.id === 'wb-farmer-002') {
    return {
      ...f,
      name: 'Sukumar Roy',
      village: 'Lake Town',
      district: 'Kolkata',
      state: 'West Bengal',
      acres: 2,
      initials: 'SR',
      riceAcresThisSeason: 2,
      sowingWindowDays: 20,
      lastSeasonBurnedTonnes: 0,
      bio: 'Lake Town. Mixed leftover into municipal waste after rain.',
    }
  }
  if (f.id === 'wb-farmer-003') {
    return {
      ...f,
      name: 'Anil Ghosh',
      village: 'Sinthi',
      district: 'Kolkata',
      state: 'West Bengal',
      acres: 4,
      initials: 'AG',
      riceAcresThisSeason: 4,
      sowingWindowDays: 18,
      lastSeasonBurnedTonnes: 0,
      bio: 'Sold once via broker. Wants moisture on the slip before the truck leaves Sinthi.',
    }
  }
  if (f.id === 'wb-farmer-004') {
    return {
      ...f,
      name: 'Tapas Mondal',
      village: 'Belgachia',
      district: 'Kolkata',
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
      name: 'Dum Dum ward compost pad',
      location: 'Kolkata',
      contactName: 'Biswajit Ghosh',
      contactRole: 'Pad staff',
      moistureSpecMax: 18,
      plantCapacityTpd: 8,
    }
  }
  if (b.id === 'wb-buy-001') {
    return {
      ...b,
      name: 'North Kolkata paper desk',
      location: 'Kolkata',
      contactName: 'Rekha Sen',
      contactRole: 'Procurement',
      moistureSpecMax: 16,
      plantCapacityTpd: 10,
    }
  }
  return b
}
