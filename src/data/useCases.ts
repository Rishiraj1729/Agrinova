/** Judge-facing narratives tied to demonstration personas */
export const punjabUseCase = {
  id: 'punjab-ramesh',
  title: 'Punjab — Avoid burning, earn from 5t rice straw',
  persona: 'Ramesh Singh',
  village: 'Kharar, Patiala',
  problem:
    'Ramesh must clear 5 tonnes of rice straw in 12 days before wheat sowing. Open burning is illegal and earns ₹0, but baling + transport costs feel uncertain.',
  agrinovaSolution: [
    'KisanSathi parses “5 tonne dhan ka para” and opens the sell journey.',
    'AI classification confirms rice straw; farmer can override.',
    'Valuation shows gross ₹3,750/t vs transport & collection deductions — net ~₹2,900/t (model).',
    'Pathway engine ranks biomass (89) and matches GreenPower Biomass 8 km away.',
    'Buyer offer accepted → consolidated hub logistics → carbon ledger + MRV record.',
  ],
  impact: {
    incomeVsBurn: '₹14,500 net vs ₹0 burn',
    co2Avoided: '6.1 tCO₂e (model, not certified credit)',
    timeToComplete: 'Under 5 minutes in demo',
  },
  startPath: '/farmer/kisansathi',
  caseStudyPath: '/case-studies/punjab',
}

export const buyerUseCase = {
  id: 'buyer-greenpower',
  title: 'Buyer — Fulfil 500t rice straw procurement',
  persona: 'GreenPower Biomass, Rajpura',
  problem:
    'Plant needs steady rice straw feedstock within 25 km during peak season; informal sourcing misses smallholders.',
  agrinovaSolution: [
    'Post requirement: 100t, 75 km radius, ₹3,000/t target.',
    'Discover Ramesh’s listing and competing supply on the map-style list.',
    'Send offer with AgriNova Match Score; track status through collection → delivered.',
  ],
  impact: {
    matchScore: '87% top match (distance + rating + demand)',
    supplySecured: '5t immediate + pipeline from 25 demo farmers',
  },
  startPath: '/business',
}

export const governmentUseCase = {
  id: 'gov-patiala',
  title: 'Government — District utilisation & collection gaps',
  persona: 'Punjab Agriculture Dept (aggregate view)',
  problem:
    'Policy makers need district-level supply, demand, and gap maps without exposing farmer PII.',
  agrinovaSolution: [
    'Filter Patiala / Sangrur districts on the government dashboard.',
    'See burning vs sold trends and simulated collection hub gaps.',
    'Live demo transactions increment regional tCO₂e and income counters.',
  ],
  impact: {
    utilisation: '34% demo utilisation vs baseline burning',
    hubsNeeded: '12 collection gaps flagged (model)',
  },
  startPath: '/government',
}

export const demoScript = [
  { step: 1, title: 'Meet the people', path: '/profiles', action: 'Ramesh, Priya, Dr. Bedi — and what is public vs demo' },
  { step: 2, title: 'Ramesh’s farm', path: '/farmer', action: '12-day window, 5 t straw from 2.5 rice acres' },
  { step: 3, title: 'List with quality', path: '/farmer/sell', action: 'Moisture, bales, land — then accept GreenPower' },
  { step: 4, title: 'Priya procures', path: '/business', action: 'Open listing detail; RFQ 100 t / 15% moisture' },
  { step: 5, title: 'Credits', path: '/farmer/credits', action: 'Simran already redeemed urea — Ramesh earns after sale' },
  { step: 6, title: 'DAO + ops', path: '/government', action: 'PM2.5 context, then Kavya’s MRV queue' },
]
