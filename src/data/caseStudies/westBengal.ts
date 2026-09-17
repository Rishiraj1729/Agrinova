import type { Buyer, CaseStudyMeta, Farmer, ResidueListing, ResidueType } from '../../types'

const wbVillages = ['Doltala', 'Hridaypur', 'Noapara', 'Michael Nagar', 'Nabapally', 'Ward 21', 'Madhyamgram', 'Barasat']
const wbNames = [
  'Ramesh Das', 'Sukumar Roy', 'Anil Ghosh', 'Tapas Mondal', 'Kamal Haldar',
  'Arun Bhattacharya', 'Biplab Banerjee', 'Sanjay Mitra', 'Debashis Sarkar', 'Pradip Sen',
]

export const wbFarmers: Farmer[] = wbNames.map((name, i) => ({
  id: `wb-farmer-${String(i + 1).padStart(3, '0')}`,
  name,
  village: wbVillages[i % wbVillages.length],
  district: 'North 24 Parganas',
  state: 'West Bengal',
  acres: [3, 2, 4, 1.5, 3.5, 5, 2.5, 3, 2, 4][i],
  crops: ['Rice', 'Wheat'],
  phone: `+91 9831${String(20000 + i).slice(1)}`,
  lat: 22.68 + i * 0.008,
  lng: 88.44 + i * 0.006,
}))

export const wbCurrentFarmer = wbFarmers[0]

export const wbBuyers: Buyer[] = [
  { id: 'wb-buy-001', name: 'Barasat paper / fibre desk', type: 'Paper Mill', location: 'Barasat', distanceKm: 6, pricePerTon: 640, demandTonnes: 120, rating: 4.4, residueTypes: ['Rice Straw'] },
  { id: 'wb-buy-002', name: 'North 24 Pgs biomass co-op', type: 'Biomass Plant', location: 'Barrackpore belt', distanceKm: 14, pricePerTon: 680, demandTonnes: 200, rating: 4.5, residueTypes: ['Rice Straw'] },
  { id: 'wb-buy-003', name: 'Madhyamgram conservancy compost', type: 'Compost Unit', location: 'Madhyamgram', distanceKm: 4, pricePerTon: 590, demandTonnes: 90, rating: 4.6, residueTypes: ['Rice Straw'] },
  { id: 'wb-buy-004', name: 'Kolkata metro biogas trial', type: 'Biochar', location: 'Kolkata metro edge', distanceKm: 18, pricePerTon: 610, demandTonnes: 80, rating: 4.2, residueTypes: ['Rice Straw'] },
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
  title: 'West Bengal — Madhyamgram & Barasat residue-to-waste gap',
  problem:
    'From Kendriya Vidyalaya Dum Dum, the stream we can walk to is peri-urban paddy leftover in Madhyamgram and Barasat: straw stacked wet, dumped in drains, or mixed into municipal biodegradable waste. Compost pads exist, but small lots never become a listing. Punjab enters only as a phone comparison (burn clock).',
  methodology:
    'NCSC field book (September 2025): 6 nearby Madhyamgram–Barasat sheets + 4 Punjab phone sheets (n=10), 2 plant-floor calls, 2 civic conversations (Ward 21 Barasat; Madhyamgram SI). Platform cluster below is labelled demonstration data. Live counters update only from this browser.',
  observations: [
    'Monsoon moisture makes straw harder to bale; compost-first beats dry biomass specs for wet heaps.',
    'Shorter hauls to Madhyamgram conservancy pad often beat distant mills on net price.',
    'Municipal compost reports feedstock shortage while lanes dump mixed straw.',
    'Ward notes show drain complaints, not utilised tonnes.',
  ],
  limitations: [
    'Field claim is n=10 nearby + phone — not a census of West Bengal.',
    'Larger in-app cluster is demonstration data.',
    'Carbon figures are model estimates (~1.5 tCO₂e/t), not certified credits.',
  ],
  provenance: 'DEMONSTRATION_DATA',
  baseline: {
    farmers: 10,
    buyers: 4,
    tonnesRescued: 72,
    co2Avoided: 108,
    totalIncome: 50000,
  },
  districts: ['North 24 Parganas', 'Madhyamgram', 'Barasat'],
}

export const wbPlatformStats = westBengalCaseStudy.baseline

/** Government and policy instruments the WB case is designed against */
export const wbGovernmentStudies = [
  {
    id: 'swm-2016',
    title: 'Solid Waste Management Rules, 2016 (MoEFCC)',
    body: 'Requires segregation and processing of biodegradable waste, including agricultural residue that enters the municipal stream. Cities must identify processing facilities — compost, biomethanation — rather than dump mixed waste.',
    provenance: 'PUBLIC_DATA' as const,
    gap: 'Rules sit with urban local bodies. Farm straw never enters a listing, so ULBs see shortage at the compost plant and overflow at the drain.',
  },
  {
    id: 'npmcr',
    title: 'National Policy for Management of Crop Residue (NPMCR)',
    body: 'Asks states to map residue, promote in-situ management, and divert surplus to industry. CRM machinery and biomass tenders concentrated in Punjab–Haryana. Eastern India received far less matching infrastructure.',
    provenance: 'PUBLIC_DATA' as const,
    gap: 'West Bengal has paddy intensity without a residue desk. AgriNova is that desk: map, moisture, buyer, pickup.',
  },
  {
    id: 'wbpcb',
    title: 'West Bengal PCB / municipal waste processing',
    body: 'Kolkata, Howrah, and district ULBs have compost and biomethanation plants that routinely report mixed, wet, or insufficient feedstock. Agricultural leftover is a parallel stream that never reaches those gates in specification.',
    provenance: 'PUBLIC_DATA' as const,
    gap: 'A moisture-aware marketplace can feed ULB composters and paper mills from villages 10–20 km out — without putting farmer phones on a government desk.',
  },
  {
    id: 'crm-east',
    title: 'Crop Residue Management scheme (GoI) — eastern gap',
    body: 'Happy Seeders, balers, and custom-hiring centres were scaled first in the northwest burn belt. Burdwan–Nadia farmers still share one baler across many villages, so straw is dumped or burned on wet days.',
    provenance: 'PUBLIC_DATA' as const,
    gap: 'Consolidated pickup on AgriNova lets one baler serve listed lots instead of WhatsApp rumours.',
  },
]

/** Demonstration field survey — 10 West Bengal farmers inside the 21-farmer pack. */
export const wbSurvey = {
  n: 10,
  season: 'Kharif 2025 (demonstration pack)',
  provenance: 'FIELD_SURVEY' as const,
  note: '10 West Bengal farmers from the 21-farmer AgriNova field pack (plus 11 Punjab). Not a census.',
  findings: [
    { label: 'Sold or gifted straw last season', pct: 18 },
    { label: 'Stacked and left to rot / dump', pct: 41 },
    { label: 'Burned on a dry window', pct: 22 },
    { label: 'Mixed into household / municipal waste', pct: 19 },
  ],
  barriers: [
    { label: 'No buyer phone in the village', pct: 64 },
    { label: 'Straw too wet to bale', pct: 51 },
    { label: 'Transport cost eats the gate price', pct: 47 },
    { label: 'Do not know compost / paper mill exists', pct: 39 },
  ],
  want: [
    { label: 'Would list if pickup is guaranteed in 5 days', pct: 71 },
    { label: 'Would keep moisture card if it raised price', pct: 58 },
    { label: 'Prefer Bangla voice advice over a PDF', pct: 82 },
  ],
}

export const wbWasteBridge = [
  {
    from: 'Field straw',
    to: 'ULB compost / biomethanation',
    how: 'List lot with moisture. Delta Compost-style units take short-haul straw that SWM plants currently buy as mixed wet waste.',
  },
  {
    from: 'Canal / roadside dump',
    to: 'Paper mill furnish',
    how: 'Bengal Paper Works needs a specification, not a pile. Match Score rejects lots above plant moisture so the mill is not a dump.',
  },
  {
    from: 'Jute–rice mixed leftover',
    to: 'Biochar / biogas',
    how: 'Brokers skip mixed streams. Pathway ranking sends them to East Biochar or a biogas co-op instead of a drain.',
  },
  {
    from: 'Officer Excel of names',
    to: 'Utilised vs dumped by district',
    how: 'Government desk shows aggregates and operational clusters. No farmer PII. Same honesty labels as Punjab.',
  },
]

export const wbFlow = [
  { name: 'Straw on field', t: 180 },
  { name: 'Dumped / mixed', t: 74 },
  { name: 'Burned', t: 40 },
  { name: 'Sold / lifted', t: 32 },
  { name: 'Rot / unused', t: 34 },
]

export const wbScopeIfUtilised = [
  { utilisation: 20, divertedT: 45, incomeLakh: 2.8, tco2e: 54, dumpCutPct: 12 },
  { utilisation: 40, divertedT: 90, incomeLakh: 5.6, tco2e: 108, dumpCutPct: 24 },
  { utilisation: 60, divertedT: 134, incomeLakh: 8.3, tco2e: 161, dumpCutPct: 36 },
  { utilisation: 80, divertedT: 178, incomeLakh: 11.1, tco2e: 214, dumpCutPct: 48 },
]

export const wbVsPunjab = [
  { axis: 'Failure mode', punjab: 'Open burning in 10–15 days', bengal: 'Dump, rot, mix into municipal waste, some burn' },
  { axis: 'Moisture', punjab: 'Dry window, plants at ~15%', bengal: 'Wet straw, plants at ~16–18%' },
  { axis: 'Buyers', punjab: 'Biomass plants, dense CRM kit', bengal: 'Compost, paper, biogas — thinner CRM kit' },
  { axis: 'Language', punjab: 'Punjabi / Hindi / English', bengal: 'Bangla / Hindi / English' },
  { axis: 'AgriNova job', punjab: 'Beat the burn default', bengal: 'Bridge farm leftover to SWM & industry' },
]
