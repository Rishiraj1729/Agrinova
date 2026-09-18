/**
 * West Bengal dump / mix + winter AQI demo data for the government desk.
 * Heat cells are demonstration intensity, not a live CPCB feed.
 * Export names kept for existing dashboard imports.
 */

export const punjabBurningBaseline = {
  annualBurnedTonnes: 180_000,
  pm25ContributionPercent: 18,
  peakMonth: 'Nov–Jan (dump / mix + winter AQI)',
}

export const punjabUtilisationScenario = {
  tonnesDivertedPer1000Farmers: 4_200,
  pm25ReductionPercentModel: 2.1,
  co2eAvoidedKt: 6.3,
}

export const districtUtilisation = [
  { district: 'North 24 Parganas', burned: 210, utilised: 96, pm25Index: 128, heat: 0.78 },
  { district: 'Madhyamgram', burned: 86, utilised: 42, pm25Index: 122, heat: 0.7 },
  { district: 'Barasat', burned: 94, utilised: 38, pm25Index: 118, heat: 0.66 },
  { district: 'Hooghly', burned: 120, utilised: 51, pm25Index: 110, heat: 0.52 },
  { district: 'Nadia', burned: 102, utilised: 44, pm25Index: 108, heat: 0.48 },
  { district: 'Howrah', burned: 88, utilised: 36, pm25Index: 124, heat: 0.58 },
  { district: 'Kolkata', burned: 64, utilised: 28, pm25Index: 134, heat: 0.62 },
]

/** Soft heat cells around Madhyamgram–Barasat drains and compost pads (demo intensity 0–1) */
export const pollutionHeatCells = [
  { id: 'h1', lat: 22.7, lng: 88.45, intensity: 0.88, label: 'Madhyamgram drain / mixed waste' },
  { id: 'h2', lat: 22.695, lng: 88.442, intensity: 0.72, label: 'Doltala leftover stacks' },
  { id: 'h3', lat: 22.72, lng: 88.48, intensity: 0.8, label: 'Barasat Ward 21 edge' },
  { id: 'h4', lat: 22.725, lng: 88.49, intensity: 0.64, label: 'Hridaypur wet heaps' },
  { id: 'h5', lat: 22.71, lng: 88.46, intensity: 0.55, label: 'Noapara lane' },
  { id: 'h6', lat: 22.76, lng: 88.37, intensity: 0.5, label: 'Barrackpore belt' },
  { id: 'h7', lat: 22.89, lng: 88.39, intensity: 0.42, label: 'Hooghly peri-urban' },
  { id: 'h8', lat: 23.47, lng: 88.56, intensity: 0.38, label: 'Nadia paddy belt' },
  { id: 'h9', lat: 22.59, lng: 88.31, intensity: 0.48, label: 'Howrah municipal edge' },
  { id: 'h10', lat: 22.57, lng: 88.36, intensity: 0.6, label: 'Kolkata metro winter AQI' },
]

/** Clusters where AgriNova demo operations are live in North 24 Parganas */
export const agrinovaOperationalSites = [
  {
    id: 'ops-doltala',
    name: 'Doltala paddy cluster',
    district: 'North 24 Parganas',
    lat: 22.7,
    lng: 88.45,
    farmers: 8,
    strawDivertedT: 28,
    burnedAvoidedT: 22,
    farmerIncomeInr: 168_000,
    co2eAvoidedT: 34,
    pm25IndexDrop: 8,
    status: 'operational' as const,
  },
  {
    id: 'ops-ward21',
    name: 'Barasat Ward 21 compost feed',
    district: 'Barasat',
    lat: 22.72,
    lng: 88.48,
    farmers: 6,
    strawDivertedT: 18,
    burnedAvoidedT: 14,
    farmerIncomeInr: 108_000,
    co2eAvoidedT: 22,
    pm25IndexDrop: 6,
    status: 'operational' as const,
  },
  {
    id: 'ops-hridaypur',
    name: 'Hridaypur neighbourhood pool',
    district: 'Barasat',
    lat: 22.725,
    lng: 88.49,
    farmers: 5,
    strawDivertedT: 12,
    burnedAvoidedT: 9,
    farmerIncomeInr: 72_000,
    co2eAvoidedT: 14,
    pm25IndexDrop: 4,
    status: 'operational' as const,
  },
  {
    id: 'ops-noapara',
    name: 'Noapara paper-desk pilot',
    district: 'Madhyamgram',
    lat: 22.71,
    lng: 88.46,
    farmers: 4,
    strawDivertedT: 10,
    burnedAvoidedT: 7,
    farmerIncomeInr: 64_000,
    co2eAvoidedT: 12,
    pm25IndexDrop: 3,
    status: 'pilot' as const,
  },
]

export function operationalSavingsTotals() {
  return agrinovaOperationalSites.reduce(
    (acc, s) => ({
      farmers: acc.farmers + s.farmers,
      strawDivertedT: acc.strawDivertedT + s.strawDivertedT,
      burnedAvoidedT: acc.burnedAvoidedT + s.burnedAvoidedT,
      farmerIncomeInr: acc.farmerIncomeInr + s.farmerIncomeInr,
      co2eAvoidedT: acc.co2eAvoidedT + s.co2eAvoidedT,
    }),
    { farmers: 0, strawDivertedT: 0, burnedAvoidedT: 0, farmerIncomeInr: 0, co2eAvoidedT: 0 },
  )
}

/** If AgriNova reaches X% of district leftover — indicative savings (demo formula) */
export function projectDistrictSavings(district: string, utilisationPct: number) {
  const row = districtUtilisation.find((d) => d.district === district)
  if (!row) return null
  const total = row.burned + row.utilised
  const targetUtil = Math.round((total * utilisationPct) / 100)
  const additional = Math.max(0, targetUtil - row.utilised)
  const incomePerT = 6000
  const co2PerT = 1.2
  return {
    district,
    utilisationPct,
    additionalTonnes: additional,
    farmerIncomeInr: additional * incomePerT,
    co2eAvoidedT: Math.round(additional * co2PerT * 10) / 10,
    pm25IndexDrop: Math.round(row.pm25Index * (additional / total) * 0.35),
    burnedLeft: Math.max(0, total - targetUtil),
  }
}

export const livePollutionSnapshot = {
  asOf: '2025-11-10 (demo “today”)',
  regionLabel: 'Madhyamgram–Barasat belt (demo)',
  aqiBand: 'Poor',
  pm25ugm3: 142,
  fireCountLast48h: 18,
  strawBurnShareEpisodePercent: 12,
  sourceNote:
    'Winter PM2.5 around the Kolkata metro is mixed (traffic, brick kilns, waste). Drain dump / mixed straw is the AgriNova stream here — not a Punjab fire-count map. Heat blobs are demo intensity, not CPCB sensors.',
}

export const beforeAfterProjection = {
  clusterFarmers: 25,
  clusterStrawTonnes: 120,
  without: {
    burnedTonnes: 86,
    utilisedTonnes: 34,
    farmerIncomeInr: 0,
    indicativePm25Index: 134,
    greenTaxBaseInr: 0,
  },
  withAgrinova70pct: {
    burnedTonnes: 36,
    utilisedTonnes: 84,
    farmerIncomeInr: 504_000,
    indicativePm25Index: 118,
    co2eAvoidedT: 101,
    buyerTaxReliefInr: 121_200,
    farmerCredits: 101_000,
  },
  method:
    'If 70% of this 25-farm cluster’s leftover is listed instead of dumped or mixed, dump tonnes and a simple PM2.5 index fall. State-wide claims are not made from this sample.',
}
