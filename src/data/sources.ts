import type { DataProvenance } from '../types'

export interface DataSource {
  id: string
  label: string
  what: string
  provenance: DataProvenance
  note: string
}

/**
 * Public figures used as context (rounded). Farmer/buyer identities are fictional.
 * Judges should treat operational records as demonstration, regional numbers as public/model mix.
 */
export const dataSources: DataSource[] = [
  {
    id: 'straw-volume',
    label: 'Paddy straw surplus — Punjab',
    what: '~15–20 million tonnes of paddy straw generated each kharif; a large share is burned in a 10–20 day window before wheat sowing.',
    provenance: 'PUBLIC_DATA',
    note: 'Rounded from MoEFCC / Punjab CRM scheme literature and IARI residue-to-product ratios. Not a census of this demo sample.',
  },
  {
    id: 'pm25',
    label: 'Winter PM2.5 contribution',
    what: 'On peak post-harvest days, crop-residue fire can contribute ~30–40% of Delhi–NCR PM2.5 (episode-dependent).',
    provenance: 'PUBLIC_DATA',
    note: 'SAFAR / IITM and CPCB episode analyses. Applied as context for Punjab policy screens, not as a live sensor feed.',
  },
  {
    id: 'straw-yield',
    label: 'Straw yield factor',
    what: '~1.8–2.4 tonnes straw per acre of paddy (≈4.5–6 t/ha), moisture-dependent.',
    provenance: 'PUBLIC_DATA',
    note: 'IARI / PAU residue:grain ratios. Farmer listings use ~2.0 t/acre on rice acres as a conservative demo default.',
  },
  {
    id: 'msp',
    label: 'MSP (common paddy / wheat)',
    what: 'Common paddy MSP ₹2,300/q; wheat MSP ₹2,275/q (2024–25 marketing season figures used in market cards).',
    provenance: 'PUBLIC_DATA',
    note: 'Commission for Agricultural Costs & Prices / GoI MSP announcements. Mandi averages are illustrative ± MSP.',
  },
  {
    id: 'biomass-price',
    label: 'Straw gate price',
    what: 'Ex-farm / plant-gate paddy straw often ₹600–1,200/t depending on bale, moisture, and transport; demo cluster uses ₹650–820/t.',
    provenance: 'MODEL_ESTIMATE',
    note: 'Range from Punjab biomass-procurement tenders and CRM reports. Not a live mandi quote.',
  },
  {
    id: 'ef-burn',
    label: 'Burn emission factor',
    what: 'Open burning ≈ 1.5 tCO₂e per tonne straw (CH₄/N₂O + CO₂ convention used in this prototype).',
    provenance: 'MODEL_ESTIMATE',
    note: 'Order-of-magnitude IPCC crop-residue burning factors. Not a Verra / Gold Standard methodology. Not a tradable credit.',
  },
  {
    id: 'window',
    label: 'Harvest–sowing window',
    what: 'Farmers typically have 10–20 days between paddy harvest and wheat sowing — the operational reason burning persists.',
    provenance: 'PUBLIC_DATA',
    note: 'Widely cited in Punjab CRM and NGT filings. Demo persona Ramesh has 12 days remaining.',
  },
  {
    id: 'demo-people',
    label: 'People & plants in this app',
    what: 'All named farmers, buyers, officers, phones, and GST-style IDs are fictional demonstration profiles.',
    provenance: 'DEMONSTRATION_DATA',
    note: 'Built so judges can follow a story. Do not treat as survey respondents.',
  },
]
