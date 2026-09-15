import type {
  BuyerRequirement,
  CarbonLedgerEntry,
  CreditRedemption,
  FarmerCreditWallet,
  MarketplaceTransaction,
  MrvRecord,
  Offer,
  ResidueListing,
} from '../types'
import { farmers, buyers } from './agrinovaData'
import { CREDITS_PER_TCO2E } from './redemptionCatalog'

export interface LivedInSeed {
  listings: ResidueListing[]
  offers: Offer[]
  requirements: BuyerRequirement[]
  transactions: MarketplaceTransaction[]
  ledger: CarbonLedgerEntry[]
  mrv: MrvRecord[]
  wallets: Record<string, FarmerCreditWallet>
  redemptions: CreditRedemption[]
}

const breakdown = (total: number) => ({
  rating: 16,
  distance: 18,
  demandFit: 16,
  priceFit: 10,
  pathwayFit: 10,
  moistureFit: 12,
  total,
})

/** Pre-populated cluster so the app looks used on first open */
export function buildLivedInSeed(): LivedInSeed {
  const ramesh = farmers[0]
  const simran = farmers.find((f) => f.id === 'farmer-023') ?? farmers[22]
  const harpreet = farmers[2]

  const listings: ResidueListing[] = [
    {
      id: 'lst-simran-done',
      farmerId: simran.id,
      farmerName: simran.name,
      residueType: 'Wheat Stubble',
      crop: 'Wheat',
      quantityTonnes: 3.2,
      location: `${simran.village}, ${simran.district}`,
      status: 'completed',
      pricePerTon: 650,
      matchedBuyerId: 'buy-003',
      createdAt: '2025-11-04',
      condition: 'Moisture 11%, baled, ash ~7%',
      availabilityWindow: 'Collected 6 Nov',
      pathway: 'cattle_feed',
      provenance: 'DEMONSTRATION_DATA',
      region: 'punjab',
      carbonCreditsIssued: 3840,
      details: {
        landAcres: 4,
        residueAcres: 2,
        moisturePercent: 11,
        isBaled: true,
        storageType: 'covered',
        harvestDate: '2025-10-28',
        ashPercent: 7,
        pickupNotes: 'Sunam feeder road, 2 km from AgroFeed gate.',
      },
    },
    {
      id: 'lst-harpreet-open',
      farmerId: harpreet.id,
      farmerName: harpreet.name,
      residueType: 'Rice Straw',
      crop: 'Rice',
      quantityTonnes: 8,
      location: `${harpreet.village}, ${harpreet.district}`,
      status: 'offer_received',
      pricePerTon: 760,
      createdAt: '2025-11-09',
      condition: 'Moisture 13%, loose stack, ash ~9%',
      availabilityWindow: '10 days',
      expectedPricePerTon: 760,
      pathway: 'biomass',
      provenance: 'DEMONSTRATION_DATA',
      region: 'punjab',
      details: {
        landAcres: 9,
        residueAcres: 4,
        moisturePercent: 13,
        isBaled: false,
        storageType: 'stacked',
        harvestDate: '2025-11-06',
        ashPercent: 9,
        pickupNotes: 'Needs baler before GreenPower will lift.',
      },
    },
    {
      id: 'lst-cluster-open',
      farmerId: farmers[5].id,
      farmerName: farmers[5].name,
      residueType: 'Rice Straw',
      crop: 'Rice',
      quantityTonnes: 4.5,
      location: `${farmers[5].village}, ${farmers[5].district}`,
      status: 'listed',
      pricePerTon: 720,
      createdAt: '2025-11-10',
      condition: 'Moisture 14%, baled',
      availabilityWindow: '6 days',
      pathway: 'biomass',
      provenance: 'DEMONSTRATION_DATA',
      region: 'punjab',
      details: {
        landAcres: 5,
        residueAcres: 2.2,
        moisturePercent: 14,
        isBaled: true,
        storageType: 'covered',
        harvestDate: '2025-11-07',
        ashPercent: 8,
        pickupNotes: 'Nabha–Patiala highway, tractor trolley OK.',
      },
    },
  ]

  const offers: Offer[] = [
    {
      id: 'off-harpreet-gp',
      listingId: 'lst-harpreet-open',
      buyerId: 'buy-001',
      buyerName: 'GreenPower Biomass',
      pricePerTon: 750,
      quantityTonnes: 8,
      validUntil: '2025-11-16',
      matchScore: 88,
      breakdown: breakdown(88),
      status: 'pending',
      message: 'Need baled. We can send contractor 11 Nov.',
    },
    {
      id: 'off-harpreet-paper',
      listingId: 'lst-harpreet-open',
      buyerId: 'buy-002',
      buyerName: 'Punjab Paper Mills',
      pricePerTon: 700,
      quantityTonnes: 8,
      validUntil: '2025-11-15',
      matchScore: 74,
      breakdown: breakdown(74),
      status: 'pending',
    },
  ]

  const requirements: BuyerRequirement[] = [
    {
      id: 'req-gp-nov',
      buyerId: 'buy-001',
      buyerName: 'GreenPower Biomass',
      residueTypes: ['Rice Straw'],
      quantityTonnes: 100,
      maxRadiusKm: 25,
      targetPricePerTon: 780,
      horizonDays: 14,
      region: 'punjab',
      createdAt: '2025-11-08',
    },
  ]

  const simranTxn: MarketplaceTransaction = {
    id: 'txn-simran-001',
    listingId: 'lst-simran-done',
    offerId: 'off-simran-hist',
    farmerId: simran.id,
    buyerId: 'buy-003',
    quantityTonnes: 3.2,
    amount: 3.2 * 650,
    status: 'completed',
    pathway: 'cattle_feed',
    region: 'punjab',
    logisticsMode: 'individual',
    updatedAt: '2025-11-06T14:00:00.000Z',
  }

  const avoided = 3.2 * 1.5 - 3.2 * 0.25 - 3.2 * 0.05
  const credits = Math.round(avoided * CREDITS_PER_TCO2E)

  const ledger: CarbonLedgerEntry[] = [
    {
      id: 'ledger-txn-simran-001',
      txnId: simranTxn.id,
      farmerId: simran.id,
      residueType: 'Wheat Stubble',
      quantityTonnes: 3.2,
      baselineTco2e: 3.2 * 1.5,
      alternativeTco2e: 3.2 * 0.25,
      transportTco2e: 3.2 * 0.05,
      avoidedTco2e: avoided,
      indicativeValueInr: Math.round(avoided * 850),
      pathway: 'cattle_feed',
      mrvStatus: 'mrv_ready',
      region: 'punjab',
      date: '2025-11-06',
    },
  ]

  const mrv: MrvRecord[] = [
    {
      id: 'mrv-ledger-txn-simran-001',
      ledgerEntryId: ledger[0].id,
      txnId: simranTxn.id,
      status: 'mrv_ready',
      evidence: [
        { item: 'Weighbridge slip (demo)', done: true },
        { item: 'Collection GPS timestamp', done: true },
        { item: 'Buyer receipt', done: true },
        { item: 'Pathway utilisation attestation', done: false },
      ],
      provenance: 'DEMONSTRATION_DATA',
    },
  ]

  const wallets: Record<string, FarmerCreditWallet> = {
    [simran.id]: {
      farmerId: simran.id,
      balance: credits - 180,
      lifetimeEarned: credits,
      lifetimeRedeemed: 180,
    },
    [ramesh.id]: {
      farmerId: ramesh.id,
      balance: 0,
      lifetimeEarned: 0,
      lifetimeRedeemed: 0,
    },
  }

  const redemptions: CreditRedemption[] = [
    {
      id: 'red-simran-urea',
      farmerId: simran.id,
      itemName: 'Urea (1 bag)',
      creditsSpent: 180,
      date: '2025-11-07',
    },
  ]

  return {
    listings,
    offers,
    requirements,
    transactions: [simranTxn],
    ledger,
    mrv,
    wallets,
    redemptions,
  }
}

export { buyers }
