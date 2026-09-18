/** Judge-facing narratives tied to West Bengal demonstration personas */

export const punjabUseCase = {
  id: 'wb-ramesh',
  title: 'West Bengal — List leftover straw before it dumps',
  persona: 'Ramesh Das',
  village: 'Doltala, Madhyamgram',
  problem:
    'Ramesh has about 6 tonnes of wet paddy leftover after harvest. There is no pad number in the village. After rain the heap sits by the drain or mixes into municipal waste.',
  agrinovaSolution: [
    'Kisan Bandhu opens a 4-section farm decision (no markdown asterisks).',
    'Sell wizard writes moisture, acres, and 5-day pickup.',
    'Match Score prefers Madhyamgram compost pad for wet lots; paper desk for drier lots.',
    'Neighbourhood pool for 1.5–3 acre houses so one trolley fills.',
    'Buyer offer accepted → pickup → carbon ledger + MRV record.',
  ],
  impact: {
    incomeVsBurn: '₹3,540 net vs ₹0 dump',
    co2Avoided: '3.8 tCO₂e (model, not certified credit)',
    timeToComplete: 'Under 5 minutes in demo',
  },
  startPath: '/farmer/kisansathi',
  caseStudyPath: '/case-studies/west-bengal',
}

export const buyerUseCase = {
  id: 'buyer-compost',
  title: 'Buyer — Feed the Madhyamgram compost pad',
  persona: 'Biswajit Ghosh, Madhyamgram compost pad',
  problem:
    'Pad is short of clean feedstock. Mixed drain straw will not be taken. Wet lots need a moisture slip before the trolley leaves the lane.',
  agrinovaSolution: [
    'Post requirement: 40 t, 15 km radius, compost-first moisture.',
    'Discover Sukumar’s Ward 21 listing and competing lots.',
    'Send offer with AgriNova Match Score; track status through collection → delivered.',
  ],
  impact: {
    matchScore: '88% compost match (distance + moisture fit)',
    supplySecured: '3.2 t completed + open Ward 21 lot',
  },
  startPath: '/business',
}

export const governmentUseCase = {
  id: 'gov-n24pgs',
  title: 'Government — Ward utilised vs dumped',
  persona: 'Madhyamgram ULB desk (aggregate view)',
  problem:
    'Officers see mixed biodegradable lift. They do not see tonnes that left the ward as a specified lot.',
  agrinovaSolution: [
    'Filter North 24 Parganas / Madhyamgram / Barasat on the government dashboard.',
    'See dumped vs utilised trends and compost-pad clusters.',
    'Live demo transactions increment regional tCO₂e and income counters. No farmer phones.',
  ],
  impact: {
    utilisation: 'Demo utilised vs dumped on the ULB desk',
    hubsNeeded: 'Compost pad + paper desk — not a fire-count map',
  },
  startPath: '/government',
}

export const demoScript = [
  { step: 1, title: 'Meet the people', path: '/profiles', action: 'Ramesh, Biswajit, Sudip, Kavya — all West Bengal desks' },
  { step: 2, title: 'Ramesh’s farm', path: '/farmer', action: 'Doltala, 3 acres, leftover by the drain' },
  { step: 3, title: 'List with quality', path: '/farmer/sell', action: 'Moisture, acres — compost pad can lift' },
  { step: 4, title: 'Biswajit procures', path: '/business', action: 'Open listing; RFQ 40 t compost-first' },
  { step: 5, title: 'Credits', path: '/farmer/credits', action: 'Ramesh already redeemed urea after a completed lot' },
  { step: 6, title: 'ULB + ops', path: '/government', action: 'Dump/mix heatmap, then Kavya’s MRV queue' },
]
