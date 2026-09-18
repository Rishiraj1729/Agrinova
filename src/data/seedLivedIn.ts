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
import { wbFarmers, wbBuyers } from './caseStudies/westBengal'
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

/** Pre-populated Madhyamgram–Barasat cluster so the booth looks used on first open */
export function buildLivedInSeed(): LivedInSeed {
  const ramesh = wbFarmers[0]
  const sukumar = wbFarmers[1]
  const tapas = wbFarmers[3]
  const compost = wbBuyers.find((b) => b.id === 'wb-buy-003') ?? wbBuyers[2]
  const paper = wbBuyers.find((b) => b.id === 'wb-buy-001') ?? wbBuyers[0]

  const listings: ResidueListing[] = [
    {
      id: 'lst-ramesh-done',
      farmerId: ramesh.id,
      farmerName: ramesh.name,
      residueType: 'Rice Straw',
      crop: 'Rice',
      quantityTonnes: 3.2,
      location: `${ramesh.village}, ${ramesh.district}`,
      status: 'completed',
      pricePerTon: 590,
      matchedBuyerId: compost.id,
      createdAt: '2025-11-04',
      condition: 'Moisture 16%, stacked, ash ~8%',
      availabilityWindow: 'Collected 6 Nov',
      pathway: 'compost',
      provenance: 'DEMONSTRATION_DATA',
      region: 'west-bengal',
      carbonCreditsIssued: 3840,
      details: {
        landAcres: 3,
        residueAcres: 1.6,
        moisturePercent: 16,
        isBaled: false,
        storageType: 'stacked',
        harvestDate: '2025-10-28',
        ashPercent: 8,
        pickupNotes: 'Doltala lane, 2 km from Madhyamgram compost pad.',
      },
    },
    {
      id: 'lst-sukumar-open',
      farmerId: sukumar.id,
      farmerName: sukumar.name,
      residueType: 'Rice Straw',
      crop: 'Rice',
      quantityTonnes: 4,
      location: `${sukumar.village}, ${sukumar.district}`,
      status: 'offer_received',
      pricePerTon: 620,
      createdAt: '2025-11-09',
      condition: 'Moisture 17%, loose stack, ash ~9%',
      availabilityWindow: '10 days',
      expectedPricePerTon: 620,
      pathway: 'compost',
      provenance: 'DEMONSTRATION_DATA',
      region: 'west-bengal',
      details: {
        landAcres: 2,
        residueAcres: 2,
        moisturePercent: 17,
        isBaled: false,
        storageType: 'stacked',
        harvestDate: '2025-11-06',
        ashPercent: 9,
        pickupNotes: 'Ward 21 edge — keep off the drain until trolley comes.',
      },
    },
    {
      id: 'lst-tapas-open',
      farmerId: tapas.id,
      farmerName: tapas.name,
      residueType: 'Rice Straw',
      crop: 'Rice',
      quantityTonnes: 3,
      location: `${tapas.village}, ${tapas.district}`,
      status: 'listed',
      pricePerTon: 600,
      createdAt: '2025-11-10',
      condition: 'Moisture 18%, wet heap — compost-first',
      availabilityWindow: '6 days',
      pathway: 'compost',
      provenance: 'DEMONSTRATION_DATA',
      region: 'west-bengal',
      details: {
        landAcres: 1.5,
        residueAcres: 1.5,
        moisturePercent: 18,
        isBaled: false,
        storageType: 'field',
        harvestDate: '2025-11-07',
        ashPercent: 10,
        pickupNotes: 'Hridaypur — pool with neighbours to fill one trolley.',
      },
    },
  ]

  const offers: Offer[] = [
    {
      id: 'off-sukumar-compost',
      listingId: 'lst-sukumar-open',
      buyerId: compost.id,
      buyerName: compost.name,
      pricePerTon: 590,
      quantityTonnes: 4,
      validUntil: '2025-11-16',
      matchScore: 88,
      breakdown: breakdown(88),
      status: 'pending',
      message: 'Clean lot only. We can send a trolley 11 Nov.',
    },
    {
      id: 'off-sukumar-paper',
      listingId: 'lst-sukumar-open',
      buyerId: paper.id,
      buyerName: paper.name,
      pricePerTon: 640,
      quantityTonnes: 4,
      validUntil: '2025-11-15',
      matchScore: 62,
      breakdown: breakdown(62),
      status: 'pending',
      message: 'Moisture 17% is high for paper. Dry two days or send to compost.',
    },
  ]

  const requirements: BuyerRequirement[] = [
    {
      id: 'req-compost-nov',
      buyerId: compost.id,
      buyerName: compost.name,
      residueTypes: ['Rice Straw'],
      quantityTonnes: 40,
      maxRadiusKm: 15,
      targetPricePerTon: 600,
      horizonDays: 14,
      region: 'west-bengal',
      createdAt: '2025-11-08',
    },
  ]

  const rameshTxn: MarketplaceTransaction = {
    id: 'txn-ramesh-001',
    listingId: 'lst-ramesh-done',
    offerId: 'off-ramesh-hist',
    farmerId: ramesh.id,
    buyerId: compost.id,
    quantityTonnes: 3.2,
    amount: 3.2 * 590,
    status: 'completed',
    pathway: 'compost',
    region: 'west-bengal',
    logisticsMode: 'individual',
    updatedAt: '2025-11-06T14:00:00.000Z',
  }

  const avoided = 3.2 * 1.5 - 3.2 * 0.25 - 3.2 * 0.05
  const credits = Math.round(avoided * CREDITS_PER_TCO2E)

  const ledger: CarbonLedgerEntry[] = [
    {
      id: 'ledger-txn-ramesh-001',
      txnId: rameshTxn.id,
      farmerId: ramesh.id,
      residueType: 'Rice Straw',
      quantityTonnes: 3.2,
      baselineTco2e: 3.2 * 1.5,
      alternativeTco2e: 3.2 * 0.25,
      transportTco2e: 3.2 * 0.05,
      avoidedTco2e: avoided,
      indicativeValueInr: Math.round(avoided * 850),
      pathway: 'compost',
      mrvStatus: 'mrv_ready',
      region: 'west-bengal',
      date: '2025-11-06',
    },
  ]

  const mrv: MrvRecord[] = [
    {
      id: 'mrv-ledger-txn-ramesh-001',
      ledgerEntryId: ledger[0].id,
      txnId: rameshTxn.id,
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
    [ramesh.id]: {
      farmerId: ramesh.id,
      balance: credits - 180,
      lifetimeEarned: credits,
      lifetimeRedeemed: 180,
    },
    [sukumar.id]: {
      farmerId: sukumar.id,
      balance: 0,
      lifetimeEarned: 0,
      lifetimeRedeemed: 0,
    },
  }

  const redemptions: CreditRedemption[] = [
    {
      id: 'red-ramesh-urea',
      farmerId: ramesh.id,
      itemName: 'Urea (1 bag)',
      creditsSpent: 180,
      date: '2025-11-07',
    },
  ]

  return {
    listings,
    offers,
    requirements,
    transactions: [rameshTxn],
    ledger,
    mrv,
    wallets,
    redemptions,
  }
}

export { wbBuyers as buyers }
