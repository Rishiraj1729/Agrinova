/**
 * Punjab air-quality + AgriNova operational demo data.
 * Episode PM2.5 shares from SAFAR/IITM-style public reporting (rounded).
 * Not a live CPCB feed — labelled PUBLIC_DATA / MODEL_ESTIMATE / DEMONSTRATION_DATA in UI.
 */

export const punjabBurningBaseline = {
  annualBurnedTonnes: 20_000_000,
  pm25ContributionPercent: 38,
  peakMonth: 'November',
}

export const punjabUtilisationScenario = {
  tonnesDivertedPer1000Farmers: 12_500,
  pm25ReductionPercentModel: 4.2,
  co2eAvoidedKt: 18.5,
}

export const districtUtilisation = [
  { district: 'Patiala', burned: 420, utilised: 180, pm25Index: 156, heat: 0.82 },
  { district: 'Sangrur', burned: 380, utilised: 145, pm25Index: 148, heat: 0.74 },
  { district: 'Barnala', burned: 290, utilised: 120, pm25Index: 132, heat: 0.58 },
  { district: 'Ludhiana', burned: 510, utilised: 210, pm25Index: 172, heat: 0.95 },
  { district: 'Fatehgarh', burned: 220, utilised: 95, pm25Index: 118, heat: 0.45 },
]

/** Soft heat cells around HQs for leaflet circle heatmap (demo intensity 0–1) */
export const pollutionHeatCells = [
  { id: 'h1', lat: 30.34, lng: 76.38, intensity: 0.9, label: 'Patiala belt' },
  { id: 'h2', lat: 30.42, lng: 76.25, intensity: 0.7, label: 'Nabha–Rajpura corridor' },
  { id: 'h3', lat: 30.25, lng: 75.84, intensity: 0.78, label: 'Sangrur–Sunam' },
  { id: 'h4', lat: 30.13, lng: 75.8, intensity: 0.65, label: 'Sunam south' },
  { id: 'h5', lat: 30.37, lng: 75.55, intensity: 0.55, label: 'Barnala' },
  { id: 'h6', lat: 30.9, lng: 75.85, intensity: 0.92, label: 'Ludhiana urban fringe' },
  { id: 'h7', lat: 30.78, lng: 75.72, intensity: 0.7, label: 'Ludhiana west' },
  { id: 'h8', lat: 30.68, lng: 76.4, intensity: 0.48, label: 'Fatehgarh Sahib' },
  { id: 'h9', lat: 30.74, lng: 76.65, intensity: 0.6, label: 'Kharar–Mohali edge' },
  { id: 'h10', lat: 30.5, lng: 76.0, intensity: 0.5, label: 'Malwa mid-belt' },
]

/** Villages / clusters where AgriNova demo operations are live */
export const agrinovaOperationalSites = [
  {
    id: 'ops-kharar',
    name: 'Kharar rice cluster',
    district: 'Patiala',
    lat: 30.74,
    lng: 76.65,
    farmers: 8,
    strawDivertedT: 42,
    burnedAvoidedT: 38,
    farmerIncomeInr: 315_000,
    co2eAvoidedT: 50,
    pm25IndexDrop: 12,
    status: 'operational' as const,
  },
  {
    id: 'ops-sunam',
    name: 'Sunam wheat–rice belt',
    district: 'Sangrur',
    lat: 30.13,
    lng: 75.8,
    farmers: 6,
    strawDivertedT: 28,
    burnedAvoidedT: 24,
    farmerIncomeInr: 210_000,
    co2eAvoidedT: 34,
    pm25IndexDrop: 9,
    status: 'operational' as const,
  },
  {
    id: 'ops-rajpura',
    name: 'Rajpura buyer corridor',
    district: 'Patiala',
    lat: 30.48,
    lng: 76.59,
    farmers: 5,
    strawDivertedT: 31,
    burnedAvoidedT: 27,
    farmerIncomeInr: 248_000,
    co2eAvoidedT: 37,
    pm25IndexDrop: 10,
    status: 'operational' as const,
  },
  {
    id: 'ops-barnala',
    name: 'Barnala pilot (scaling)',
    district: 'Barnala',
    lat: 30.37,
    lng: 75.55,
    farmers: 4,
    strawDivertedT: 18,
    burnedAvoidedT: 15,
    farmerIncomeInr: 126_000,
    co2eAvoidedT: 22,
    pm25IndexDrop: 6,
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

/** If AgriNova reaches X% of district straw — indicative savings (demo formula) */
export function projectDistrictSavings(district: string, utilisationPct: number) {
  const row = districtUtilisation.find((d) => d.district === district)
  if (!row) return null
  const total = row.burned + row.utilised
  const targetUtil = Math.round((total * utilisationPct) / 100)
  const additional = Math.max(0, targetUtil - row.utilised)
  const incomePerT = 7500
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
  regionLabel: 'Patiala–Sangrur belt (demo)',
  aqiBand: 'Very Poor',
  pm25ugm3: 218,
  fireCountLast48h: 412,
  strawBurnShareEpisodePercent: 36,
  sourceNote:
    'PM2.5 level illustrative for peak post-harvest week; fire counts stylised from CRM fire-spot reporting ranges. Episode straw-burn share ~30–40% of Delhi–NCR PM2.5 on peak days (SAFAR-style public literature).',
}

export const beforeAfterProjection = {
  clusterFarmers: 25,
  clusterStrawTonnes: 180,
  without: {
    burnedTonnes: 148,
    utilisedTonnes: 32,
    farmerIncomeInr: 0,
    indicativePm25Index: 172,
    greenTaxBaseInr: 0,
  },
  withAgrinova70pct: {
    burnedTonnes: 54,
    utilisedTonnes: 126,
    farmerIncomeInr: 945_000,
    indicativePm25Index: 138,
    co2eAvoidedT: 151,
    buyerTaxReliefInr: 181_200,
    farmerCredits: 151_000,
  },
  method:
    'If 70% of this 25-farm cluster’s straw is sold instead of burned, burn tonnes and a simple PM2.5 index fall. State-wide claims are not made from this sample.',
}
