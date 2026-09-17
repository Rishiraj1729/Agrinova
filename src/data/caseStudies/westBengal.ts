import type { Buyer, CaseStudyMeta, Farmer, ResidueListing, ResidueType } from '../../types'

const wbVillages = ['Burdwan', 'Hooghly', 'Nadia', 'Murshidabad', 'Malda', 'Krishnanagar', 'Ranaghat']
const wbNames = [
  'Ramesh Das', 'Sukumar Roy', 'Anil Ghosh', 'Pradip Sen', 'Tapas Mondal',
  'Biplab Banerjee', 'Sanjay Mitra', 'Arun Bhattacharya', 'Debashis Sarkar', 'Kamal Haldar',
]

export const wbFarmers: Farmer[] = wbNames.map((name, i) => ({
  id: `wb-farmer-${String(i + 1).padStart(3, '0')}`,
  name,
  village: wbVillages[i % wbVillages.length],
  district: ['Burdwan', 'Hooghly', 'Nadia', 'Murshidabad'][i % 4],
  state: 'West Bengal',
  acres: 1.5 + (i % 5),
  crops: ['Rice', 'Wheat'],
  phone: `+91 9831${String(20000 + i).slice(1)}`,
  lat: 22.5 + i * 0.03,
  lng: 88.3 + i * 0.02,
}))

export const wbCurrentFarmer = wbFarmers[0]

export const wbBuyers: Buyer[] = [
  { id: 'wb-buy-001', name: 'Ganga Biomass Co-op', type: 'Biomass Plant', location: 'Burdwan', distanceKm: 12, pricePerTon: 680, demandTonnes: 400, rating: 4.6, residueTypes: ['Rice Straw'] },
  { id: 'wb-buy-002', name: 'Bengal Paper Works', type: 'Paper Mill', location: 'Hooghly', distanceKm: 18, pricePerTon: 640, demandTonnes: 250, rating: 4.4, residueTypes: ['Rice Straw', 'Wheat Stubble'] },
  { id: 'wb-buy-003', name: 'Delta Compost', type: 'Compost Unit', location: 'Nadia', distanceKm: 9, pricePerTon: 590, demandTonnes: 180, rating: 4.3, residueTypes: ['Rice Straw'] },
  { id: 'wb-buy-004', name: 'East Biochar', type: 'Biochar', location: 'Malda', distanceKm: 45, pricePerTon: 760, demandTonnes: 120, rating: 4.7, residueTypes: ['Rice Straw'] },
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
  title: 'West Bengal — residue, waste, and the missing marketplace',
  problem:
    'The Gangetic paddy belt generates a large straw surplus. Unlike Punjab, burning is not the only failure mode: straw is stacked wet, dumped in canals, or mixed into municipal biodegradable waste. Compost plants, paper mills, and biogas units exist, but smallholders cannot reach them in the post-kharif window.',
  methodology:
    'Public policy (SWM Rules 2016, NPMCR, WBPCB municipal-waste notes, CRM literature) sets the gap. An 80-respondent demonstration survey in Burdwan, Hooghly, Nadia, and Murshidabad scales the cluster. Named farmers and plants are fictional. Live counters update only from this browser.',
  observations: [
    'Monsoon moisture makes straw harder to bale than in northwest India; plants cap moisture near 16–18%.',
    'Shorter hauls to compost and paper units often beat biomass on net price.',
    'Jute–rice rotations create mixed residue streams that informal brokers refuse.',
    'Municipal compost plants report feedstock shortage while villages dump straw in drains.',
  ],
  limitations: [
    'Survey pack is a demonstration sample of 80, not a census of West Bengal.',
    'No live WBPCB or municipal SWM API.',
    'Carbon figures are model estimates, not certified credits.',
  ],
  provenance: 'DEMONSTRATION_DATA',
  baseline: {
    farmers: 10,
    buyers: 4,
    tonnesRescued: 156,
    co2Avoided: 312,
    totalIncome: 890000,
  },
  districts: ['Burdwan', 'Hooghly', 'Nadia', 'Murshidabad', 'Malda'],
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
