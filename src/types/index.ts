export type Lang = 'en' | 'hi' | 'bn' | 'pa'

export type DataProvenance =
  | 'DEMONSTRATION_DATA'
  | 'MODEL_ESTIMATE'
  | 'AI_OUTPUT'
  | 'PUBLIC_DATA'
  | 'FIELD_SURVEY'

export type CaseStudyRegion = 'punjab' | 'west-bengal'

export type CropType = 'Rice' | 'Wheat' | 'Cotton' | 'Sugarcane' | 'Maize'
export type ResidueType = 'Rice Straw' | 'Wheat Stubble' | 'Cotton Stalks' | 'Sugarcane Tops' | 'Maize Stover'

export type ListingStatus =
  | 'listed'
  | 'matched'
  | 'offer_received'
  | 'accepted'
  | 'collection_scheduled'
  | 'collected'
  | 'delivered'
  | 'completed'

export type MrvStatus =
  | 'recorded'
  | 'evidence_pending'
  | 'mrv_ready'
  | 'verification_pending'

export type PathwayId = 'biomass' | 'biochar' | 'compost' | 'biogas' | 'cattle_feed'

export interface Farmer {
  id: string
  name: string
  village: string
  district: string
  state: string
  acres: number
  crops: CropType[]
  phone: string
  lat: number
  lng: number
  bio?: string
  initials?: string
  riceAcresThisSeason?: number
  sowingWindowDays?: number
  lastSeasonBurnedTonnes?: number
  kccLast4?: string
}

export interface Buyer {
  id: string
  name: string
  type: 'Biomass Plant' | 'Paper Mill' | 'Cattle Feed' | 'Biochar' | 'Packaging' | 'Compost Unit'
  location: string
  distanceKm: number
  pricePerTon: number
  demandTonnes: number
  rating: number
  residueTypes: ResidueType[]
  contactName?: string
  contactRole?: string
  plantCapacityTpd?: number
  moistureSpecMax?: number
}

export interface Processor {
  id: string
  name: string
  location: string
  capacityTonnes: number
  acceptedResidues: ResidueType[]
  radiusKm: number
  priceMin: number
  priceMax: number
}

export type StorageType = 'field' | 'stacked' | 'covered' | 'silo'

export interface ResidueListingDetails {
  landAcres: number
  residueAcres: number
  moisturePercent: number
  isBaled: boolean
  storageType: StorageType
  harvestDate: string
  ashPercent?: number
  pickupNotes?: string
}

export interface ResidueListing {
  id: string
  farmerId: string
  farmerName: string
  residueType: ResidueType
  crop: CropType
  quantityTonnes: number
  location: string
  status: ListingStatus | 'in_transit' | 'delivered' | 'paid'
  pricePerTon: number
  matchedBuyerId?: string
  createdAt: string
  condition?: string
  availabilityWindow?: string
  expectedPricePerTon?: number
  pathway?: PathwayId
  provenance?: DataProvenance
  imageUrl?: string
  region?: CaseStudyRegion
  details?: ResidueListingDetails
  carbonCreditsIssued?: number
}

export interface FarmerCreditWallet {
  farmerId: string
  balance: number
  lifetimeEarned: number
  lifetimeRedeemed: number
}

export interface CreditRedemption {
  id: string
  farmerId: string
  itemName: string
  creditsSpent: number
  date: string
}

export interface BuyerRequirement {
  id: string
  buyerId: string
  buyerName: string
  residueTypes: ResidueType[]
  quantityTonnes: number
  maxRadiusKm: number
  targetPricePerTon: number
  horizonDays: number
  region: CaseStudyRegion
  createdAt: string
}

export interface MatchFactorBreakdown {
  rating: number
  distance: number
  demandFit: number
  priceFit: number
  pathwayFit: number
  moistureFit: number
  total: number
}

export interface Offer {
  id: string
  listingId: string
  buyerId: string
  buyerName: string
  pricePerTon: number
  quantityTonnes: number
  validUntil: string
  message?: string
  matchScore: number
  breakdown: MatchFactorBreakdown
  status: 'pending' | 'accepted' | 'rejected'
}

export interface MarketplaceTransaction {
  id: string
  listingId: string
  offerId: string
  farmerId: string
  buyerId: string
  quantityTonnes: number
  amount: number
  status: ListingStatus
  pathway: PathwayId
  region: CaseStudyRegion
  logisticsMode: 'individual' | 'consolidated'
  updatedAt: string
}

export interface ClassificationResult {
  residueType: ResidueType
  confidence: number
  alternatives: { type: ResidueType; confidence: number }[]
  userOverride?: ResidueType
  provenance: DataProvenance
}

export interface ValuationResult {
  gross: number
  transport: number
  collection: number
  net: number
  pricePerTonLow: number
  pricePerTonHigh: number
  disclaimer: string
  provenance: DataProvenance
}

export interface PathwayRecommendation {
  id: PathwayId
  label: string
  score: number
  rationale: string
}

export interface CarbonLedgerEntry {
  id: string
  txnId: string
  farmerId: string
  residueType: ResidueType
  quantityTonnes: number
  baselineTco2e: number
  alternativeTco2e: number
  transportTco2e: number
  avoidedTco2e: number
  indicativeValueInr: number
  pathway: PathwayId
  mrvStatus: MrvStatus
  region: CaseStudyRegion
  date: string
}

export interface MrvRecord {
  id: string
  ledgerEntryId: string
  txnId: string
  status: MrvStatus
  evidence: { item: string; done: boolean }[]
  provenance: DataProvenance
}

export interface CaseStudyMeta {
  region: CaseStudyRegion
  title: string
  problem: string
  methodology: string
  observations: string[]
  limitations: string[]
  provenance: DataProvenance
  baseline: {
    farmers: number
    buyers: number
    tonnesRescued: number
    co2Avoided: number
    totalIncome: number
  }
  districts: string[]
}

export interface WeatherEvent {
  id: string
  type: 'heatwave' | 'heavy_rain' | 'drought' | 'frost' | 'cyclone'
  severity: 'low' | 'medium' | 'high'
  date: string
  district: string
  confidence: number
  description: string
}

export interface CropRisk {
  crop: CropType
  riskLevel: 'low' | 'medium' | 'high'
  confidence: number
  reason: string
  recommendation: string
  updatedAt: string
}

export interface MarketPrice {
  crop: CropType
  msp: number
  mandiAvg: number
  demandIndex: number
  trend: 'up' | 'down' | 'stable'
  updatedAt: string
}

export interface Transaction {
  id: string
  listingId: string
  buyerId: string
  farmerId: string
  amount: number
  quantityTonnes: number
  status: 'completed' | 'pending'
  date: string
}

export interface ImpactRecord {
  id: string
  farmerId: string
  baselineEmissions: number
  alternativeEmissions: number
  avoidedEmissions: number
  residueType: ResidueType
  quantityTonnes: number
  note: string
}

export interface LogisticsJob {
  id: string
  listingId: string
  from: string
  to: string
  distanceKm: number
  eta: string
  status: 'scheduled' | 'in_transit' | 'delivered'
  vehicle: string
}

export interface DemandInsight {
  residueType: ResidueType
  level: 'high' | 'medium' | 'low'
  trend: string
  provenance: DataProvenance
}
