import type { CaseStudyMeta } from '../../types'
export {
  farmers,
  currentFarmer,
  buyers,
  residueListings,
  weatherEvents,
  cropRisks,
  marketPrices,
  transactions,
  impactRecords,
  logisticsJobs,
  platformStats,
  findBuyersForResidue,
  calculateCarbonImpact,
  parseVoiceInput,
  scienceSteps,
  DEMO_FARMER_ID,
} from '../agrinovaData'

export const punjabCaseStudy: CaseStudyMeta = {
  region: 'punjab',
  title: 'Punjab — Rice Straw & Stubble Burning',
  problem:
    'Punjab produces millions of tonnes of rice straw annually. Narrow harvest-to-sowing windows push farmers toward field burning, causing air pollution and lost biomass value.',
  methodology:
    'Regional context uses published CRM / MSP / PM2.5 episode literature (see Data authenticity). The 25 farmers and 10 buyers are fictional personas in the Patiala–Sangrur belt so a judge can complete a sale. Live counters update only from transactions you run in this browser.',
  observations: [
    'Peak burning aligns with late-October to mid-November harvest pressure.',
    'Biomass plants exist within 15–35 km but matching is informal.',
    'Farmers respond to net income after transport and baling costs.',
  ],
  limitations: [
    'All farmer and buyer records are fictional demonstration data.',
    'Carbon figures are model estimates, not certified credits.',
    'Logistics costs are illustrative.',
  ],
  provenance: 'DEMONSTRATION_DATA',
  baseline: {
    farmers: 25,
    buyers: 10,
    tonnesRescued: 482,
    co2Avoided: 964,
    totalIncome: 2840000,
  },
  districts: ['Patiala', 'Sangrur', 'Barnala', 'Malerkotla', 'Rajpura'],
}
